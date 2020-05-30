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

  constructor( private auth: AuthService,
               private router: Router ) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }

  login(form: NgForm) {
    if ( form.invalid ) { return; }
    // TODO: Debo Mostrar un Alerta o Algo que indique que esta "Cargando" o Debe esperar
    this.auth.signIn$( this.usuario ).subscribe(
      (resp: any) => {
        // TODO: Cerrar el Cargando o el Alerta
        this.router.navigateByUrl('/home');
      },
      (err: any) => {
        // TODO: Mostrar error en panalla
        console.log(err.error.error.message);
      });
  }

}
