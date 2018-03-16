import { Injectable }                   from '@angular/core';
import { HttpClient, HttpHeaders }      from "@angular/common/http";

import { Observable }                   from 'rxjs/Observable';
import { of }                           from 'rxjs/observable/of';
import { User }                         from '../models/user';
import 'rxjs/Rx';

@Injectable()

export class UsersTableService {
    API_URL: string = 'http://localhost:3004/';
    headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    users: User[];

    constructor(private httpClient: HttpClient) {}

    getUsers(): Observable<User[]> {
        return this.httpClient.get(this.API_URL + 'users', {headers: this.headers})
            .map( res => res)
            .catch(error => this.handleError(error));
    }

    handleError(error: any) {
        if (error instanceof Response) {
            return Observable.throw(error.json()['error'] || 'backend server error');
        }
        return Observable.throw(error || 'backend server error');
    }

    createUser(): Observable<User> {
        return this.httpClient
            .post(this.API_URL + 'users', JSON.stringify({
                name: 'New User',
                login: 'new_user',
                email: 'new_user@test.test',
                roleName: 'Пользователь'
            }), {headers: this.headers})
            .map(response => {
                return response;
            })
            .catch(error => this.handleError(error));
    }

    deleteUser(id: number): Observable<Array<User>> {
        const url = `${this.API_URL}users/${id}`;
        return this.httpClient.delete(url, {headers: this.headers})
            .map((response) => {
                return response;
            })
            .catch(error => this.handleError(error));
    }
}