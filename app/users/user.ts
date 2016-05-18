/**
export class Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;    
}

 

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
    constructor(public email: string, public password: string, public firstName?: string, public lastName?: string) { }
  
}