
export default class UserInfo {
    constructor (profileNameSelector, profileJobSelector) {
        this._name = document.querySelector(profileNameSelector);
        this._job = document.querySelector(profileJobSelector);
    }        

    getUserInfo() {
        const userInfo = {
            nameInfo: this._name.textContent,
            jobInfo: this._job.textContent,
        }
        return userInfo;
        
    }
    setUserInfo(data) {
        console.log(data);
        this._name.textContent = data.name;
        this._job.textContent = data.job;
    }
}

