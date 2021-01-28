class Api {
    constructor() {
        this.url = 'http://localhost:3004'
    }

    _handleResponse(response) {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response.statusText)
        }
    }

    auth() {
        return fetch(`${this.url}/users`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(this._handleResponse)
    }
}

export default Api;