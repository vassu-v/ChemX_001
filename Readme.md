
---

# ⚗️ ChemX: An Arduino-Based Chemical Reaction Simulator

ChemX is an exciting **physical chemical reaction simulator** that combines Arduino and web technologies to provide an interactive experience of chemical reactions. With its web interface and real-time control of chemical simulations, you can visualize various reactions in a fun and educational way!

### 🌟 Features:
- Real-time simulation of chemical reactions 🧪
- Interactive web interface 💻
- Arduino-controlled LEDs and electromagnet for visual effects 🔬

---

## 🚀 Tech Stack

**Client:**  
- HTML  
- Python  
- Flask  
- CSS  
- JavaScript

**Microcontroller:**  
- Arduino (C++/C#)

---

## 🛠️ Installation Guide

Follow these steps to get started with ChemX:

### 1. Python Setup
You'll need Python **v2.X.X** or higher. [Download Python here](https://www.python.org/downloads/).

Once Python is installed, install Flask:
```bash
pip install flask
```

### 2. Arduino IDE
Install the Arduino IDE (recommended version **1.8.16**). [Download it here](https://www.arduino.cc/en/software).

### 3. Running the Web Interface

**Option 1: Use the web interface for chemical reactions search:**

Go to:
```bash
WebInterface > v1 > CMD >
```
Run the server:
```bash
python -m http.server 8000
```

**Option 2: Edit the database (to add/remove chemicals or reactions):**

Run:
```bash
python app.py
```

**Option 3: Full web interface with serial communication:**

Go to:
```bash
WebInterface > v2-Serial > CMD >
```
Run:
```bash
python -m http.server 8000
```

### 🔄 **Syncing Database:**

If you update the database in **v1** and want to use it in **v2**, make sure to copy and paste all `.json` files from `v1` to `v2`.

---

## ⚙️ Hardware Setup

Here’s what you’ll need for the hardware part:

### Components:
- **Arduino** (or compatible microcontroller)
- **3 addressable LEDs** (NeoPixels recommended)
- **Electromagnet**  
- **3 beakers**
- **Iron fillings**

### Steps:

1. **Prepare the beakers:**
   - Mix **iron fillings** with water in the beakers.
   - Tape an LED under each beaker. 💡
   - Place the electromagnet under the **third** beaker.

2. **Set up Arduino:**
   - Open **Arduino IDE** and go to:
     ```
     Tools > Manage Libraries > Adafruit_NeoPixel
     ```
     Install the **Adafruit NeoPixel** library.

3. **Configure the code:**
   - Modify the number of LEDs per beaker:
     ```cpp
     int ledsToChange = 1; // Adjust the number of LEDs to change per color
     ```
   - Set the total number of LEDs (multiply by 3 for three beakers):
     ```cpp
     #define NUMPIXELS 3
     ```

4. **Upload the code** to your Arduino and watch your chemical reaction come to life!

---

## 📖 How It Works

Here’s a brief explanation of how the ChemX setup simulates chemical reactions:

- The **solution of iron fillings** in water behaves like a suspension. When light passes through it (simulated by the LEDs), it shows the path of light.
- When **deposition occurs**, the electromagnet is activated. This attracts the iron fillings, causing them to deposit at the bottom of the beaker, simulating the reaction. 🧲

The web interface communicates with the Arduino via **serial**, allowing you to control the hardware from your browser.

---

## 🌐 Demo

Want to see it in action?  
[Check out a simple simulation of the ChemX project here!](https://wokwi.com/projects/411270808226922497) 🎉
[Check out a simple WebInterface No-Serial of the ChemX project here!](https://chemx.freewebhostmost.com/) 🎉

---

### 📚 Documentation

Feel free to explore the project, and if you're interested in more details, dive into the code and web interface to get a deeper understanding of how the Arduino and Flask communicate to create a live, physical chemical reaction simulation.

---

## 🤝 Contributing

Want to improve ChemX or add more chemical reactions? Contributions are always welcome! Feel free to fork this project, make improvements, and submit a pull request. Let's build something amazing together!

This is the first stable version so a development branch is there please give a pull request there
[Development Branch](https://github.com/vassu-v/ChemX_001/tree/Development) 
---

Enjoy simulating and experimenting with ChemX! 👩‍🔬👨‍🔬
                       --Shoryavardhaan