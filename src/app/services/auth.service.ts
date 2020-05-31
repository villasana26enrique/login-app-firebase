import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apiKey = environment.apiKey;
  private userToken: string;

  /*
  * Crear Nuevos Usuarios:
  * signUp?key=[API_KEY]
  */

  /**
   * Ingresar con Usuario y Contraseña
   * signInWithPassword?key=[API_KEY]
   */

  constructor( private http: HttpClient ) {
    this.readToken();
  }

  logout() {
    localStorage.removeItem('token');
  }

  signIn$(usuario: UsuarioModel) {
    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${ this.url }signInWithPassword?key=${ this.apiKey }`,
      authData
    ).pipe(
      map( (resp: any) => {
        this.saveToken(resp.idToken);
        return resp;
      })
    );
  }

  signUp$(usuario: UsuarioModel) {
    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${ this.url }signUp?key=${ this.apiKey }`,
      authData
    ).pipe(
      map( (resp: any) => {
        this.saveToken(resp.idToken);
        return resp;
      })
    );
  }

  private saveToken( idToken: string ) {
    this.userToken = idToken;
    localStorage.setItem( 'token', idToken );

    let today = new Date();
    today.setSeconds( 3600 );
    localStorage.setItem( 'expira_en', today.getTime().toString() );
  }

  readToken() {
    if ( localStorage.getItem('token') ) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }

  isAuthenticated(): boolean {
    if ( this.userToken.length < 2 ) {
      return false;
    } else {
      const expira = Number(localStorage.getItem('expira_en'));
      const expiraDate = new Date();
      expiraDate.setTime( expira );
      if ( expiraDate > new Date() ) {
        return true;
      } else {
        return false;
      }
    }
  }
}
