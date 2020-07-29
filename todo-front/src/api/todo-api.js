const axios = require('axios');
class TodoAPI {
  constructor() {
    this.todos = [];
    this._url = 'http://localhost:5000/api';
    this._token = null;
  }

  async getTodos(token) {
    this._token = token;
    await this.fetchTodos();

    return this.todos;
  }

  async fetchTodos() {
    const todos = await axios.get(`${this._url}/todos?token=${this._token}`);

    this.todos = Array.isArray(todos.data) ? todos.data : [];
  }

  async addTodo(title) {
    await axios.post(`${this._url}/todos?token=${this._token}`, { title });
  }

  async removeTodo(id) {
    await axios.delete(`${this._url}/todos/remove/${id}?token=${this._token}`);
  }

  async editTodo(todoOptions) {
    await axios.patch(
      `${this._url}/todos/edit/${todoOptions.id}?token=${this._token}`,
      todoOptions
    );
  }
}

module.exports = TodoAPI;
