const axios = require('axios');

class AuthAPI {
  constructor() {
    this._url = 'http://localhost:5000/auth';
  }

  async login(infoUser) {
    let token = await axios
      .post(`${this._url}/signin`, infoUser)
      .then(({ data }) => data.token);

    return token;
  }

  async signUp(infoUser) {
    return await axios.post(`${this._url}/signup`, infoUser);
  }
}

module.exports = AuthAPI;
