import { UsuarioService } from './usuario.service';
import { Injectable } from '@angular/core';
import { LoginEmailRequest } from '../../features/login/interfaces/loginemail.request';
import { Observable } from 'rxjs';
import { LoginEmailResponse } from '../../features/login/interfaces/loginemail.response';
import { environment } from '../../../enviroment';
import { HttpClient } from '@angular/common/http';
import { Token } from '../../core/models/token';
import { JWT_Token } from '../../core/models/jwttoken';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly baseUrl: string;

  constructor(private http : HttpClient, private usuarioService : UsuarioService) {
    this.baseUrl = environment.apiServer;
  }

  loginEmail(loginEmailRequest : LoginEmailRequest):Observable<LoginEmailResponse>{
    return this.http.post<LoginEmailResponse>(this.baseUrl+'auth/login_email', loginEmailRequest)
  }

  private gerarToken(email:string):Observable<Token>{
    var aleatorio = Math.random().toString(36).substring(2);
    var token = new Token(aleatorio,email)
    return this.http.post<Token>(this.baseUrl + 'token/', JSON.stringify(token))
  }

  getTokenByEmail(email:string):Observable<Token>{
    return this.http.get<Token>(this.baseUrl+'token?email='+email)
  }

  loginToken(token:Token):Observable<JWT_Token>{
    return this.http.post<JWT_Token>(this.baseUrl+'auth/login_token', token)
  }

  verificarJWTToken(jwt:JWT_Token):Observable<Boolean>{
    return this.http.post<Boolean>(this.baseUrl+'auth/check_jwt',jwt)
  }

  logout(){
    sessionStorage.removeItem('jwt');
    this.usuarioService.endUsuarioAutenticado();
  }

}
