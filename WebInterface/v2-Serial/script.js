let solutionColors = {};
let chemicals = [];
let reactions = []; // Declare reactions globally
let port; // Declare port globally
let serialInitialized = false; // Track if serial is initialized

// Load solution colors and chemicals
fetch('solutionColors.json')
    .then(response => response.json())
    .then(data => {
        chemicals = data.chemicals;
        loadChemicals(chemicals);
        solutionColors = Object.fromEntries(chemicals.map(c => [c.name, { displayName: c.displayName, color: c.color }]));
    })
    .catch(error => console.error('Error loading the solution colors JSON file:', error));

// Load reactions
fetch('reactions.json')
    .then(response => response.json())
    .then(data => {
        reactions = data.reactions; // Store reactions globally
    })
    .catch(error => console.error('Error loading the reactions JSON file:', error));

// Function to load chemicals into dropdowns
function loadChemicals(chemicals) {
    const dropdown1 = document.getElementById('dropdown1');
    const dropdown2 = document.getElementById('dropdown2');
    
    chemicals.forEach(chemical => {
        const option1 = document.createElement('option');
        option1.value = chemical.name;
        option1.textContent = chemical.displayName;
        dropdown1.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = chemical.name;
        option2.textContent = chemical.displayName;
        dropdown2.appendChild(option2);
    });
}

// Initialize Serial Communication
async function initSerial() {
    if (!serialInitialized) { // Initialize only if not done yet
        try {
            port = await navigator.serial.requestPort(); // User gesture required
            await port.open({ baudRate: 115200 });
            console.log("Serial port opened");
            serialInitialized = true; // Set to true after successful initialization
        } catch (err) {
            console.error("Error opening serial port: ", err);
        }
    }
}

// Function to write data to the serial port
async function writeToSerial(data) {
    if (port) {
        const writer = port.writable.getWriter();
        const encoder = new TextEncoder(); // Create an encoder for writing strings
        await writer.write(encoder.encode(data));
        writer.releaseLock();
    }
}

// Sleep function to pause execution
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Event listener for port button
document.getElementById('port').addEventListener('click', async function () {
    await initSerial();
});

// Event listener for print button
document.getElementById('printButton').addEventListener('click', async function () {
    await initSerial(); // Ensure the serial is initialized

    const value1 = document.getElementById('dropdown1').value;
    const value2 = document.getElementById('dropdown2').value;

    const color1 = value1 && solutionColors[value1] ? solutionColors[value1].color : 'N/A';
    const color2 = value2 && solutionColors[value2] ? solutionColors[value2].color : 'N/A';

    const resultDisplay = document.getElementById('resultDisplay');
    resultDisplay.innerHTML = `
        <p>Chemical 1: ${value1 || 'N/A'} - Color: ${color1}</p>
        <p>Chemical 2: ${value2 || 'N/A'} - Color: ${color2}</p>
    `;

    // Send colors to serial
    await writeToSerial(`${color1}`);
    await sleep(3000); // Wait for 3 seconds
    await writeToSerial(`${color2}`);
});

// Event listener for start reaction button
document.getElementById('startReactionButton').addEventListener('click', async function () {
    await initSerial(); // Ensure the serial is initialized

    const value1 = document.getElementById('dropdown1').value;
    const value2 = document.getElementById('dropdown2').value;

    const reaction = reactions.find(r => r.reactants.includes(value1) && r.reactants.includes(value2));
    const resultDisplay = document.getElementById('resultDisplay');

    if (reaction) {
        // Filter for aqueous products
        const aqueousProducts = reaction.products.filter(product => product.state === 'aqueous');
        const aqueousColors = aqueousProducts.map(product => product.color).join(', ') || 'N/A';
        const depositionOccurs = reaction.deposition.occurs;

        // Send the aqueous colors to serial
        await writeToSerial(`${aqueousColors}`);
        await sleep(3000); // Wait for 3 seconds
        await writeToSerial(`${depositionOccurs ? 'Yes' : 'No'}`);

        const productsList = reaction.products.map(product =>
            `<li>${product.chemical} (State: ${product.state}, Color: ${product.color})</li>`
        ).join('');

        resultDisplay.innerHTML = `
            <h3>Reaction Type: ${reaction.reactionType}</h3>
            <div class="equation">Balanced Equation: ${reaction.balancedEquation}</div>
            <p>Products:</p>
            <ul>${productsList}</ul>
        `;

        if (reaction.deposition.occurs) {
            resultDisplay.innerHTML += `<p>Deposition Occurs: ${reaction.deposition.details}</p>`;
        } else {
            resultDisplay.innerHTML += `<p>No Deposition Occurs.</p>`;
        }
    } else {
        resultDisplay.innerHTML = "<p>No valid reaction found for the selected chemicals.</p>";
    }
});
