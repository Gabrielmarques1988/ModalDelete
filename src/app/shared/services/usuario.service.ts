import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../enviroment';
import { Usuario } from '../../core/models/usuario';
import { CreateUsuarioRequest } from '../../features/login/interfaces/createusuario.request';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly baseUrl: string;

  private autorSelecionadoSubject = new BehaviorSubject<Usuario | null>(null);
  autor$ = this.autorSelecionadoSubject.asObservable();

  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiServer + 'usuario';
  }

  private usuarioAutenticadoSubject = new BehaviorSubject<Usuario | null>(null);
  usuarioAutenticado$ = this.usuarioAutenticadoSubject.asObservable();

  findAll() : Observable<Usuario[]>  {
    return this.http.get<Usuario[]>(this.baseUrl)
  }

  findByid(id: number | undefined): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseUrl}/${id}`)
  }

  getUsuariosPorEmpresaId(idEmpresa: number){
    return this.http.get<Usuario[]>(`${this.baseUrl}/usuarioByEmpresaId/${idEmpresa}`)
  }

  getUsuarioPorEmail(email: string | null){
    return this.http.get<Usuario>(`${this.baseUrl}/usuarioByEmail/${email}`)
  }

  /* ======================== Service para comunicação entre componentes =========== */

  getUsuarioAutenticado(): Observable<Usuario | null> {
    return this.usuarioAutenticado$;
  }

  setUsuarioAutenticado(usuario: Usuario | null) {
    this.usuarioAutenticadoSubject.next(usuario);
  }

  endUsuarioAutenticado(){
    this.usuarioAutenticadoSubject.complete();
  }

  setAutor(usuario: Usuario | null) {
    this.autorSelecionadoSubject.next(usuario);
  }

  /* =========================================================================== */
  criarUsuario(usuario: CreateUsuarioRequest): Observable<Usuario> {
    return this.http.post<Usuario>(this.baseUrl, usuario)
  }

  deletarUsuario(id:number){
    return this.http.delete(this.baseUrl+ "/"+id)
  }

  editarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.baseUrl}/${usuario.usuario_id}`, usuario);
  }

  //private autorSelecionadoSubject = new BehaviorSubject<Usuario | null>(null);
  //autor$ = this.autorSelecionadoSubject.asObservable();

  //private revisorSelecionadoSubject = new BehaviorSubject<Usuario | null>(null);
  //revisor$ = this.revisorSelecionadoSubject.asObservable();

  //setAutor(usuario: Usuario | null) {
  //  this.autorSelecionadoSubject.next(usuario);
  //}

  //setRevisor(usuario: Usuario | null) {
  //  this.revisorSelecionadoSubject.next(usuario);
  //}

}
