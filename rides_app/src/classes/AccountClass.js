class AccountClass{
    constructor(id, email, accountId, accountType){
        this._id = id;
        this.auth0Email = email;
        this.accountId = accountId;
        this.accountType = accountType;
    }   

    FromJSON(json){
        this._id = json._id;
        this.auth0Email = json.auth0Email;
        this.accountId = json.accountId;
        this.accountType = json.accountType;
    }
}

export default AccountClass;