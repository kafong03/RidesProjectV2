class AccountClass{
    constructor(id, email, accountId, accountType){
        this._id = id;
        this.auth0Email = email;
        this.accountId = accountId;
        this.accountType = accountType;
    }   
}

export default AccountClass;