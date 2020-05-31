import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme = false;
  loading = false;
  error = false;

  constructor( private auth: AuthService,
               private router: Router ) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
    if ( localStorage.getItem('email') ) {
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }

  login(form: NgForm) {
    if ( form.invalid ) { return; }
    this.loading =  true;
    this.error = false;
    this.auth.signIn$( this.usuario ).subscribe(
      (resp: any) => {
        console.log(resp);
        if ( this.recordarme === true ) {
          localStorage.setItem('email', this.usuario.email);
        }
        this.loading =  false;
        this.router.navigateByUrl('/home');
      },
      (err: any) => {
        // TODO: Mostrar error en panalla
        this.loading =  false;
        this.error = true;
        console.log(err.error.error.message);
      });
  }

}
