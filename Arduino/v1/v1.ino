#include <Adafruit_NeoPixel.h>

// Pin definitions
#define PIN 6              // Pin where the NeoPixel data line is connected
#define NUMPIXELS 3        // Total number of NeoPixels in the strip
#define ELECTROMAGNET_PIN 7 // Pin connected to the electromagnet


// Number of LEDs to change per color input (you can adjust this value)
int ledsToChange = 1;

// Define a structure to hold color information
struct Color {
    const char* name;  // Color name
    uint8_t r;         // Red value (0-255)
    uint8_t g;         // Green value (0-255)
    uint8_t b;         // Blue value (0-255)
};

// Array to hold available colors and their RGB values
Color colors[] = {
    {"Brown", 165, 42, 42},      // Brown
    {"White", 255, 255, 255},    // White
    {"Colorless", 0, 0, 0},      // Colorless (off)
    {"Blue", 0, 0, 255},         // Blue
    {"Yellow", 255, 255, 0},     // Yellow
    {"Silver", 192, 192, 192},   // Silver
    {"Green", 0, 128, 0}         // Green
};

// Initialize the NeoPixel strip
Adafruit_NeoPixel strip(NUMPIXELS, PIN, NEO_GRB + NEO_KHZ800);

void setup() {
    Serial.begin(115200);               // Initialize serial communication for user input
    strip.begin();                      // Initialize NeoPixel strip
    strip.show();                       // Turn off all pixels initially

    pinMode(ELECTROMAGNET_PIN, OUTPUT); // Set electromagnet pin as output
    digitalWrite(ELECTROMAGNET_PIN, LOW); // Ensure electromagnet is off initially

    // Ask for color input for each group of LEDs (depending on ledsToChange variable)
    for (int i = 0; i < NUMPIXELS; i += ledsToChange) {
        Serial.print("Enter the color for LEDs ");
        Serial.print(i + 1);
        Serial.print(" to ");
        Serial.print(min(i + ledsToChange, NUMPIXELS));  // Print LED range
        Serial.println(" (Available: Brown, White, Colorless, Blue, Yellow, Silver, Green): ");

        // Wait for user input
        while (!Serial.available()) {
            // Do nothing until input is available
        }

        String colorInput = Serial.readString();  // Read the user input
        colorInput.trim();                        // Trim whitespace from input

        // Find the corresponding color in the color array
        bool colorFound = false;
        for (int j = 0; j < sizeof(colors) / sizeof(colors[0]); j++) {
            if (colorInput.equalsIgnoreCase(colors[j].name)) {
                // Set the chosen color for the next ledsToChange LEDs
                for (int k = i; k < min(i + ledsToChange, NUMPIXELS); k++) {
                    strip.setPixelColor(k, strip.Color(colors[j].r, colors[j].g, colors[j].b));
                }
                colorFound = true;
                break;
            }
        }

        // If the color is not found, turn the LEDs off
        if (!colorFound) {
            Serial.println("Color not recognized, LEDs will be turned off.");
            for (int k = i; k < min(i + ledsToChange, NUMPIXELS); k++) {
                strip.setPixelColor(k, strip.Color(0, 0, 0)); // Set LEDs to off
            }
        }

        strip.show();     // Update the strip to display the changes
        delay(1000);      // Wait for a second before proceeding
    }

    // Ask the user if the electromagnet should be turned on
    Serial.print("Should the electromagnet be turned on? (yes/no): ");
    
    // Wait for user input for the electromagnet
    while (!Serial.available()) {
        // Do nothing until input is available
    }

    String magnetInput = Serial.readString();  // Read the user input
    magnetInput.trim();                        // Trim whitespace

    // Turn the electromagnet on or off based on user input
    if (magnetInput.equalsIgnoreCase("yes")) {
        digitalWrite(ELECTROMAGNET_PIN, HIGH); // Turn electromagnet ON
        Serial.println("Electromagnet is ON.");
    } else {
        digitalWrite(ELECTROMAGNET_PIN, LOW);  // Turn electromagnet OFF
        Serial.println("Electromagnet is OFF.");
    }
}

void loop() {
    // The main loop is left empty since the logic is handled in setup
}
