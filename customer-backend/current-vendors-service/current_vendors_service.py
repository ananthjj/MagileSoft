from flask import Flask, request, jsonify  # Import request from Flask
import threading

app = Flask(__name__)

UPLOAD_FOLDER = '/path/to/upload/folder'

@app.route('/process-currentvendors', methods=['POST'])
def process_current_vendors_endpoint():
    try:
        print("In process_current_vendors endpoint")
        
        # Check if the 'file' is present in the request
        if 'file' not in request.files:
            return jsonify({'error': 'No file part in the request'}), 400
        
        current_vendors_file = request.files['file']
        companyName = request.form.get('companyName')
        userId = request.form.get('userId')
        role = request.form.get('role')

        # Check for missing form data
        if not companyName or not userId or not role:
            return jsonify({'error': 'Missing form data (companyName, userId, or role)'}), 400

        print(f"Received company name: {companyName}, UserId: {userId}, Role: {role}")

        # Save the file
        filepath = save_file(current_vendors_file, UPLOAD_FOLDER)

        # Start the asynchronous process
        print("Starting a new thread and calling process_current_vendors method")
        thread = threading.Thread(target=async_process, args=(filepath, companyName, userId, role))
        thread.start()
        print("Started a new thread and called process_current_vendors method")

        return jsonify({'status': 'Processing', 'task_id': id(thread)}), 202

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': 'An error occurred while processing the request', 'details': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5002)
