from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/process', methods=['POST'])
def process_current_vendors():
    data = request.json
    input_data = data.get('input', None)
    if input_data:
        print(f"Received data: {input_data}")
        # Add your logic to process the input here
        return jsonify({'message': f'Processed data: {input_data}'})
    return jsonify({'error': 'No input provided'}), 400

if __name__ == '__main__':
    app.run(port=5002)
