
class User {
    constructor() {
        this.role = 'normal';
        this.adminLevel=1;
    }
}

class HostUser extends User {
    constructor() {
        super();
        this.role = 'host';
        this.adminLevel=2;
    }
}

export {User, HostUser};