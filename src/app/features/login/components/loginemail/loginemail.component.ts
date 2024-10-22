import { Component, OnDestroy, OnInit } from '@angular/core';
import {  FormsModule, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginEmailRequest } from '../../interfaces/loginemail.request';
import { LoginEmailResponse } from '../../interfaces/loginemail.response';
import { LoginService } from '../../../../shared/services/login.service';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-loginemail',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, ReactiveFormsModule],
  templateUrl: './loginemail.component.html',
  styleUrl: './loginemail.component.css'
})
export class LoginemailComponent implements OnInit, OnDestroy {

  private readonly destroy$:Subject<void> = new Subject();

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  credenciais = false;
  formEnviado = false;
  processado = false;
  msgErro = ""

  constructor(private router: Router, private readonly loginService: LoginService) { }

  ngOnInit(): void {
  }

  submitApp() {
    this.formEnviado = true;
    if (this.emailFormControl.valid) {
      this.processado = true;
      this.msgErro=''
      this.emailFormControl.setErrors(null)

      const email = new LoginEmailRequest(this.emailFormControl.value);

      this.loginService.loginEmail(email)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next:(email: LoginEmailResponse) => {
          if (email) {
            if(email.usuario_email && email.usuario_token){
              sessionStorage.setItem('email', email.usuario_email);
              sessionStorage.setItem('token', email.usuario_token);
              this.router.navigate(['logintoken']);
            }
          }
        },
        error:(error) => {
          this.processado = false;
          this.msgErro = error.error.message
          this.emailFormControl.setErrors({
            credenciais:true
          })
        }
    })
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
