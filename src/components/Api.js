export default class Api {
    constructor(config, loading) {
        this.mainUrl = config.mainUrl;
        this.headers = config.headers;
    }

    getInitialCards(url) {
        return fetch(this.mainUrl + url,
            { headers: this.headers })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
    }
    
    getAvatarUserInfo(url) {
        return fetch(this.mainUrl + url, {
            headers: this.headers
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
            .then((data) => {
                return data;
            })
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
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
    }

    changeUserAvatar(url, data) {
        return fetch(this.mainUrl + url, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: data.avatar,

            })
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
            .then((data) => {
                return data;
            })
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
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
            .then((data) => {
                return data;
            })
    }

    deleteCard(url) {
        return fetch(this.mainUrl + url, {
            method: 'DELETE',
            headers: this.headers,
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
    }

    likeAdd(url) {
        return fetch(this.mainUrl + url, {
            method: 'PUT',
            headers: this.headers
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
            .then((data) => {
                return data;
            })
    }

    likeRemove(url) {
        return fetch(this.mainUrl + url, {
            method: 'DELETE',
            headers: this.headers
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                else {
                    return Promise.reject(`Ошибка: ${res.status}`);
                }
            })
            .then((data) => {
                return data;
            })
    }
}






