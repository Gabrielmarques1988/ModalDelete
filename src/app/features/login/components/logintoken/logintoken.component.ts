import { Usuario } from './../../../../core/models/usuario';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginService } from '../../../../shared/services/login.service';
import { UsuarioService } from '../../../../shared/services/usuario.service';
import { Token } from '../../../../core/models/token';
import { JWT_Token } from '../../../../core/models/jwttoken';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-logintoken',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './logintoken.component.html',
  styleUrl: './logintoken.component.css'
})

export class LogintokenComponent implements OnInit, OnDestroy{

  private readonly destroy$:Subject<void> = new Subject();

  tokenFormControl = new FormControl('', [Validators.required]);

  usuario = new Usuario();
  formEnviado = false;
  processado = false;

  constructor(private jwtHelper:JwtHelperService, private router:Router, private loginService:LoginService, private usuarioService:UsuarioService){}

  ngOnInit(): void {
    if (typeof sessionStorage !== 'undefined') {
      const jwt = sessionStorage.getItem("jwt");
      if (jwt) {
        this.router.navigate(['dashboard']);
      }
    }
  }

  submitToken(){
    this.formEnviado = true;
    if(this.tokenFormControl.value){
      if (typeof sessionStorage !== 'undefined') {
        this.tokenFormControl.setErrors(null);

        const token = new Token(sessionStorage.getItem('email'), this.tokenFormControl.value);
        this.processado = true;
        this.loginService.loginToken(token)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (jwt: JWT_Token) => {
              if (jwt) {
                sessionStorage.setItem('jwt', jwt.accessToken);
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('email');

                //setando valores decodificados do tokem em variavel "global" em usuarioService.getUsuarioAutenticado()
                let usuariotoken = this.jwtHelper.decodeToken(jwt.accessToken);
                this.usuario.usuario_id = usuariotoken.sub;
                this.usuario.empresa_id = usuariotoken.usuario_empresa_id;
                this.usuario.usuario_cargo = usuariotoken.usuario_cargo;
                this.usuario.usuario_nome = usuariotoken.usuario_nome;
                this.usuario.usuario_email = usuariotoken.usuario_email;
                this.usuario.usuario_tipo = usuariotoken.usuario_tipo
                this.usuarioService.setUsuarioAutenticado(this.usuario);

                this.router.navigate(['/dashboard']);
              }
            },
            error: (erro) => {
              this.processado = false;
              this.tokenFormControl.setErrors({ tokeninvalido: true });
            }
          });
      } else {
        console.error("sessionStorage não está definido. Certifique-se de que está executando este código em um navegador.");
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

