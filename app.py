from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# In-memory "database" for the example
todos = []

@app.route('/todos', methods=['POST'])
def create_todo():
    data = request.json
    new_todo = {'id': len(todos) + 1, 'task': data['task'], 'completed': False}
    todos.append(new_todo)
    return jsonify(new_todo), 201

@app.route('/todos', methods=['GET'])
def get_todos():
    return jsonify(todos)

@app.route('/todos/<int:todo_id>', methods=['PUT'])
def update_todo(todo_id):
    data = request.json
    todo = next((todo for todo in todos if todo['id'] == todo_id), None)
    if todo:
        todo.update(data)
        return jsonify(todo)
    return jsonify({'error': 'Todo not found'}), 404

@app.route('/todos/<int:todo_id>', methods=['DELETE'])
def delete_todo(todo_id):
    global todos
    todos = [todo for todo in todos if todo['id'] != todo_id]
    return jsonify({'message': 'Todo deleted'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)