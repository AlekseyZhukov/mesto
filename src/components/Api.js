export default class Api {
    constructor(config) {
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
            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен');
            });
    }
    getAvatarUserInfo(url) {
        return fetch(this.mainUrl + url, {
            headers: this.headers
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                return data;
            })
            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен');
            })
    }
    changeUserName(url, data, button) {
        this._loading(button, true);
        return fetch(this.mainUrl + url, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
            .then((res) => {
                return res.json();
            })
            .then((res) => console.log(res))

            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен');
            })
            .finally(() => {
                this._loading(button, false);
            });
    }
    changeUserAvatar(url, data, button) {
        this._loading(button, true);
        return fetch(this.mainUrl + url, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: data.avatar,

            })
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);

            })

            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен');
            })
            .finally(() => {
                this._loading(button, false);
            });
    }
    newCardAdd(url, data, button) {
        this._loading(button, true);
        return fetch(this.mainUrl + url, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                return data;

            })

            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен');
            })
            .finally(() => {
                this._loading(button, false);
            });
    }
    deleteCard (url) {
        return fetch(this.mainUrl + url, {
            method: 'DELETE',
            headers: this.headers,
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен');
            })      
    }
    likeAdd(url) {
        return fetch(this.mainUrl + url, {
            method: 'PUT',
            headers: this.headers

        })
            .then((res) => {

                return res.json();
            })
            .then((data) => {
                return data;

            })

            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен');
            })
    }
    likeRemove(url) {
        return fetch(this.mainUrl + url, {
            method: 'DELETE',
            headers: this.headers

        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                return data;

            })

            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен');
            })
    }
    _loading(button, isLoading) {
        if (isLoading == true) {
            button.textContent = "Сохранение...";
        } else {
            button.textContent = "Сохранить";
        }
    }

}






