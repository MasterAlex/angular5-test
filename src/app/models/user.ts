export class User {
    id: number;
    name: string;
    login: string;
    email: string;
    roleName: string;

    constructor (id: number, name: string, login: string, email: string) {
        this.id = id;
        this.name = name;
        this.login = login;
        this.email = email;
        this.roleName = 'Пользователь';
    }
}
