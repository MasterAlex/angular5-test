import { Component, OnInit }            from '@angular/core';
import { HttpClient}                    from "@angular/common/http";

import { User }                         from '../models/user';
import { TableSettings }                from '../models/tableSettings';

import {FormControl}                    from '@angular/forms';
import {UsersTableService}              from "./users-table.service";
import {ActivatedRoute, Router}         from "@angular/router";

import { operators }                    from "rxjs/Rx";
import {Observable}                     from "rxjs/Observable";

@Component({
    selector: 'users-table',
    templateUrl: './users-table.component.html',
    styleUrls: ['./users-table.component.scss']
})

export class UsersTableComponent implements OnInit {
    selectedUser: User;
    user: User[];
    userFormControl: FormControl;
    cellsWidth: Array<string>;
    users: User[] = [];
    searchUsers: User[] = [];
    tableSettings: TableSettings[] = [];

    constructor(
            private router: Router,
            private route: ActivatedRoute,
            private httpClient: HttpClient,
            private userTableService: UsersTableService) {
        this.userFormControl = new FormControl();
        this.userTableService.getUsers()
            .subscribe((users: Array<User>) => {
                this.users = users;
                this.searchUsers = this.users;

                this.userFormControl.valueChanges
                    .startWith(null)
                    .map(value => this.filterUsers(value))
                    .subscribe(usersFiltered => {
                        this.users = usersFiltered;
                    });
            });
    };

    ngOnInit() {
        this.getTableSettings();
    }

    filterUsers(val: string): User[] {
        return val ? this.searchUsers.filter(user => user.name.toLowerCase().indexOf(val.toLowerCase()) === 0)
            : this.searchUsers;
    }

    createUser() {
        this.userTableService.createUser().subscribe((newUser) => {
            this.users.push(newUser);
        });
    }

    deleteUser(userToRemove: User): void {
        this.userTableService.deleteUser(userToRemove.id).subscribe(() => {
            this.users = this.searchUsers = this.users.filter(user => user.id !== userToRemove.id)
        });
    }

    onSelect(user: User): void {
        this.selectedUser = user;
    }

    getTableSettings(): void {
        this.httpClient.get('http://localhost:3004/tableSettings')
            .subscribe((res) => {
                this.tableSettings = res as TableSettings[];
                this.getCellsWidth(this.tableSettings);
                }
            );
    }

    getCellsWidth(data: any): void {
        let cellsWidth = [];
        data.forEach((value) =>
            cellsWidth[value.key] = value.width
        );
        this.cellsWidth = cellsWidth;
    }

    getTableSettingsWidth(field: string): void {
        if(this.cellsWidth) {
            return this.cellsWidth[field];
        }
    }
}