import { CreateListaCompartilhadaRequest } from './../../features/lista-compartilhada/interfaces/createListaCompartilhada.request';
import { listaCompartilhada } from './../../features/lista-compartilhada/interfaces/listaCompartilhada';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../enviroment';
import { map } from 'rxjs';
import { Usuario } from "../../core/models/usuario";

@Injectable({
  providedIn: 'root'
})

export class ListaCompartilhadaService {
  private readonly baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiServer + 'lista-compartilhada';
  }

  private usuarioAutenticadoSubject = new BehaviorSubject<Usuario | null>(null);
  usuarioAutenticado$ = this.usuarioAutenticadoSubject.asObservable();

  listaCompartilhadaSubject$ = new BehaviorSubject< listaCompartilhada| null>(null);

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getAllListaCompartilhada(): Observable<any> {
    return this.http.get(`${this.baseUrl}`, { headers: this.getHeaders() });
  }

  getListaCompartilhadaTabela(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/lista-compartilhada-tabela`, { headers: this.getHeaders() }).pipe(
      map((response: any[]) => {
        return response.map(item => ({
          ...item,
          quantidade_usuarios: item['quantidade_usuarios'],
          quantidade_arquivos: item['quantidade_arquivos']
        }));
      })
    );
  }

  create(data: CreateListaCompartilhadaRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}`, data, { headers: this.getHeaders() });
  }

  findAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}`, { headers: this.getHeaders() });
  }

  findByUser(usuarioId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${usuarioId}`, { headers: this.getHeaders() });
  }

  findByListId(usuarioId: number, listaCompartilhadaId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/arquivosListaCompartilhada${usuarioId}/${listaCompartilhadaId}`, { headers: this.getHeaders() });
  }

  update(listaCompartilhadaId: number, data: CreateListaCompartilhadaRequest): Observable<listaCompartilhada> {
    return this.http.patch<listaCompartilhada>(`${this.baseUrl}/${listaCompartilhadaId}`, data, { headers: this.getHeaders() });
  }

  addArquivoToListaCompartilhada(usuarioId: number, listaCompartilhadaId: number, arquivoIds: Array<string>): Observable<any> {
    return this.http.post(`${this.baseUrl}/addArquivoToListaCompartilhada/${usuarioId}/${listaCompartilhadaId}`, arquivoIds, { headers: this.getHeaders() });
  }

  remove(listaCompartilhadaId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${listaCompartilhadaId}`, { headers: this.getHeaders() });
  }

  getArquivosListaCompartilhada(lista_compartilhada_id: string | null): Observable<any>{
    const usuarioIdLogado = String(sessionStorage.getItem('id'));
    return this.http.get<any>(`${this.baseUrl}/arquivosListaCompartilhada${usuarioIdLogado}/${lista_compartilhada_id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError('Something bad happened; please try again later.');
  }
}
