@app.route('/process-currentvendors', methods=['POST'])
def process_current_vendors_endpoint():
print("In process_current_vendors endpoint")
current_vendors_file = request.files['file']
companyName = request.form.get('companyName')
userId = request.form.get('userId')
role = request.form.get('role')
print('Received company name is: ', companyName, " UserId is: ", userId, " Role: ", role)
filepath = save_file(current_vendors_file, UPLOAD_FOLDER)
print("Starting a new thread and calling process_current_vendors method")
thread = threading.Thread(target=async_process,args=(filepath,companyName,userId, role,))
thread.start()
print("Started a new thread and called process_current_vendors method")
return jsonify({'status': 'Processing', 'task_id': id(thread)}), 202

if __name__ == '__main__':
app.run(port=5211)