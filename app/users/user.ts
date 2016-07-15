 
/**

export class User {
    id: number;
    name: string;
    phone: string;
    email: string; 
    password: string;
    firstName: string;
    lastName: string;
    address = new Address();
}
*/
export class User {
    constructor(
        public id: number,
        public email: string,
        public password: string,
        public firstName?: string,
        public lastName?: string,
        public phone?: string,
        public addressLine1?: string,
        public addressLine2?: string,
        public addressLine3?: string,
        public addressLine4?: string  ) { }
}

export class Login {
    constructor(public email: string, public password: string) { }
}

