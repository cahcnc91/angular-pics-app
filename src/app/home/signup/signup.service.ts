import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewUser } from './new-user';
import { environment } from '../../../environments/environment'

const API = environment.ApiURL;

@Injectable()

export class SignUpService {
    constructor(private http: HttpClient){

    }

    checkUserNameTaken(userName: string){
        console.log(this.http.get(API + '/user/exists/' + userName))
        return this.http.get(API + '/user/exists/' + userName)
    }

    signup(newUser: NewUser){
        return this.http.post(API + "/user/signup", newUser)
    }

}