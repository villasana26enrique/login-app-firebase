import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme = false;
  loading = false;
  error = false;

  constructor( private auth: AuthService,
               private router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }

  onSubmit(form: NgForm) {
    // Si el formulario es Invalido, se ejecuta el return y no imprime los console.log
    if (form.invalid) { return; }
    this.loading = true;
    this.error = false;
    this.auth.signUp$( this.usuario ).subscribe(
      (resp: any) => {
        if ( this.recordarme === true ) {
          localStorage.setItem('email', this.usuario.email);
        }
        this.loading = false;
        this.router.navigateByUrl('/home');
      },
      (err) => {
        // TODO: Mostrar error en panalla
        this.loading = false;
        this.error = true;
        console.log(err.error.error.message);
      });
  }


}
