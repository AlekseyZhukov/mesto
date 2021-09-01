
export default class UserInfo {
    constructor (profileNameSelector, profileJobSelector) {
        this.name = document.querySelector(profileNameSelector);
        this.about = document.querySelector(profileJobSelector);
    }        

    getUserInfo() {
        const userInfo = {
            name: this.name.textContent,
            about: this.about.textContent,
        }
        return userInfo;
        
    }
    setUserInfo(data) {
        console.log(data);
        this.name.textContent = data.name;
        this.about.textContent = data.about;
    }
}

