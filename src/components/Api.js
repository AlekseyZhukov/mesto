export default class Api {
    constructor(config, loading) {
        this.mainUrl = config.mainUrl;
        this.headers = config.headers;
    }

    getInitialCards(url) {
        return fetch(this.mainUrl + url,
            { headers: this.headers })
            .then(this._getResponseData)
    }

    getAvatarUserInfo(url) {
        return fetch(this.mainUrl + url, {
            headers: this.headers
        })
        .then(this._getResponseData)

    }

    changeUserName(url, data, button) {
        return fetch(this.mainUrl + url, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
        .then(this._getResponseData)
    }

    changeUserAvatar(url, data) {
        return fetch(this.mainUrl + url, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: data.avatar,

            })
        })
        .then(this._getResponseData)
    }

    newCardAdd(url, data) {
        return fetch(this.mainUrl + url, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
        .then(this._getResponseData)

    }

    deleteCard(url) {
        return fetch(this.mainUrl + url, {
            method: 'DELETE',
            headers: this.headers,
        })
        .then(this._getResponseData)
    }

    likeAdd(url) {
        return fetch(this.mainUrl + url, {
            method: 'PUT',
            headers: this.headers
        })
        .then(this._getResponseData)
    }

    likeRemove(url) {
        return fetch(this.mainUrl + url, {
            method: 'DELETE',
            headers: this.headers
        })
        .then(this._getResponseData)      
    }
    
    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }

}






