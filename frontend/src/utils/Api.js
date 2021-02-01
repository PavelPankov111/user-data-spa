class Api {
    constructor() {
        this.url = 'http://localhost:3000'
    }

    _handleResponse(response) {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response.statusText)
        }
    }

    _handleResponseError(err) {
        return Promise.reject(err.message)
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

    getContacts() {
        return fetch(`${this.url}/posts`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(this._handleResponse)
            .catch(this._handleResponseError)
    }

    postContacts(name, telephone) {
        return fetch(`${this.url}/posts`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, telephone: telephone })
        })
            .then(this._handleResponse)
            .catch(this._handleResponseError)
    }

    changeContacts(name, telephone, id) {
        return fetch(`${this.url}/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, telephone: telephone })
        })
            .then(this._handleResponse)
            .catch(this._handleResponseError)
    }

    deleteContact(id) {
        return fetch(`${this.url}/posts/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(this._handleResponse)
            .catch(this._handleResponseError)
    }

    searchContact(keyword){
        return fetch(`${this.url}/posts/?q=${keyword}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(this._handleResponse)
            .catch(this._handleResponseError)
    }
}

export const api = new Api()