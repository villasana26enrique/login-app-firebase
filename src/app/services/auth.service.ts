import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apiKey = 'AIzaSyD9bmrgAkKYar3B5WM5XVLNiVje4PzBjfE';

  /*
    Crear Nuevos Usuarios:
    signUp?key=[API_KEY]
  */

  /**
   * Ingresar con Usuario y Contraseña
   * signInWithPassword?key=[API_KEY]
   */

  constructor( private http: HttpClient ) { }

  logout() {

  }

  signIn$(usuario: UsuarioModel) {

  }

  signUp$(usuario: UsuarioModel) {
    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${ this.url }signUp?key=${ this.apiKey }`,
      authData
    );
  }
}
