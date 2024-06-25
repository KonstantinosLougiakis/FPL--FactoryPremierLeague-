export interface Person {
    // username: string;
    givenName: string;
    surName: string;
    age: number;
    email: string;
    // password: string;
}

export interface UserPerson {
    username: string;
    givenName: string;
    surName: string;
    email: string;
    password: string;
    confirmPassword: string;
}