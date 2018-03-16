import { BrowserModule }            from '@angular/platform-browser';
import { NgModule }                 from '@angular/core';
import { HttpClientModule}          from "@angular/common/http";


import { AppComponent }             from './app.component';
import { UsersTableComponent }      from "./users-table/users-table.component";
import {UsersTableService}          from "./users-table/users-table.service";
import {AppRoutingModule}           from "./app.routes";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        UsersTableComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [UsersTableService],
    bootstrap: [AppComponent]
})
export class AppModule { }
