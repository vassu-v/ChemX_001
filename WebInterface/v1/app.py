from flask import Flask, render_template, jsonify, request
import json

app = Flask(__name__)

# Load chemicals from the JSON file
def load_chemicals():
    with open('solutionColors.json', 'r') as f:
        data = json.load(f)
    return data['chemicals']

# Save chemicals to the JSON file
def save_chemicals(chemicals):
    with open('solutionColors.json', 'w') as f:
        json.dump({'chemicals': chemicals}, f, indent=2)

# Load reactions from the JSON file
def load_reactions():
    with open('reactions.json', 'r') as f:
        data = json.load(f)
    return data['reactions']

# Save reactions to the JSON file
def save_reactions(reactions):
    with open('reactions.json', 'w') as f:
        json.dump({'reactions': reactions}, f, indent=2)

@app.route('/')
def index():
    return render_template('colors.html')

@app.route('/r')  # This route must have a function
def r():  # Updated: provide a function name for this route
    return render_template('reaction.html')

@app.route('/solutionColors', methods=['GET'])
def get_solution_colors():
    chemicals = load_chemicals()
    return jsonify(chemicals)

@app.route('/solutionColors', methods=['POST'])
def update_solution_colors():
    chemicals = request.json.get('chemicals', [])
    save_chemicals(chemicals)
    return 'File updated successfully', 200

@app.route('/reactions', methods=['GET'])
def get_reactions():
    reactions = load_reactions()
    return jsonify(reactions)

@app.route('/reactions', methods=['POST'])
def update_reactions():
    reactions = request.json.get('reactions', [])
    save_reactions(reactions)
    return 'Reactions updated successfully', 200

@app.route('/reactions')  # Duplicate route for reactions
def reactions():
    return render_template('reaction.html')

if __name__ == '__main__':
    app.run(debug=True)
