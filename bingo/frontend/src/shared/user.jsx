
class User {
    constructor(name=null, sid=null) {
        this.role = 'normal';
        this.adminLevel=1;
        this.name=name;
        this.sid=sid
        this.team={"name": null, "color": null};
    }
}

class HostUser extends User {
    constructor(name=null, sid=null) {
        super();
        this.role = 'host';
        this.adminLevel=2;
        this.name=name;
        this.sid=sid
        this.team={"name": null, "color": null};
    }
}

export {User, HostUser};