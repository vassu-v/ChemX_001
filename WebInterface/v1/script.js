let solutionColors = {};
let chemicals = [];

// Load solution colors and chemicals
fetch('solutionColors.json')
    .then(response => response.json())
    .then(data => {
        chemicals = data.chemicals;
        loadChemicals(chemicals);
        solutionColors = Object.fromEntries(chemicals.map(c => [c.name, { displayName: c.displayName, color: c.color }]));
    })
    .catch(error => console.error('Error loading the solution colors JSON file:', error));

// Load chemicals into dropdowns
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

// Load reactions
let reactions = [];
fetch('reactions.json')
    .then(response => response.json())
    .then(data => {
        reactions = data.reactions;
    })
    .catch(error => console.error('Error loading the reactions JSON file:', error));

document.getElementById('printButton').addEventListener('click', function () {
    const value1 = document.getElementById('dropdown1').value;
    const value2 = document.getElementById('dropdown2').value;

    const color1 = value1 && solutionColors[value1] ? solutionColors[value1].color : 'N/A';
    const color2 = value2 && solutionColors[value2] ? solutionColors[value2].color : 'N/A';

    const resultDisplay = document.getElementById('resultDisplay');
    resultDisplay.innerHTML = `
        <p>Chemical 1: ${value1 || 'N/A'} - Color: ${color1}</p>
        <p>Chemical 2: ${value2 || 'N/A'} - Color: ${color2}</p>
    `;
});

document.getElementById('startReactionButton').addEventListener('click', function () {
    const value1 = document.getElementById('dropdown1').value;
    const value2 = document.getElementById('dropdown2').value;

    const reaction = reactions.find(r => r.reactants.includes(value1) && r.reactants.includes(value2));
    const resultDisplay = document.getElementById('resultDisplay');

    if (reaction) {
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
