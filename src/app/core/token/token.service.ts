import { Injectable } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

const KEY = 'authToken'
@Injectable({providedIn: 'root'})
export class TokenService {
  hasToken(){
    return !!this.getToken();
  }
  setToken(token){
      window.localStorage.setItem(KEY, token);
  }

  getToken(){
      return window.localStorage.getItem(KEY);
  }

  removeToken(){
      window.localStorage.removeItem(KEY);
  }
}