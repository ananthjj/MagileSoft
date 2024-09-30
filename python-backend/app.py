from flask import Flask, request, jsonify
from flask_cors import CORS


app = Flask(__name__)

CORS(app)  # Enable CORS for all routes


# Route to process data sent from the Node.js backend
@app.route('/process', methods=['POST'])
def process_data():
    # Retrieve the data sent in the request
    data = request.json.get('input')

    # Simulate processing (replace this with any Python logic you need)
    result = f"Processed data: {data}"

    # Return the processed result as a JSON response
    return jsonify({'message': result})

if __name__ == "__main__":
    app.run(port=5002)
