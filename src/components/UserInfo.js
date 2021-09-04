
export default class UserInfo {
    constructor (profileNameSelector, profileJobSelector, avatarSelector) {
        this.name = document.querySelector(profileNameSelector);
        this.about = document.querySelector(profileJobSelector);
        this.avatar = document.querySelector(avatarSelector)
    }        

    getUserInfo() {
        const userInfo = {
            name: this.name.textContent,
            about: this.about.textContent,
        }
        return userInfo;
        
    }
    setUserInfo(data) {
        this.name.textContent = data.name;
        this.about.textContent = data.about;
        this.avatar.src = data.avatar
    }
}

