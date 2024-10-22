import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../enviroment';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { Projeto } from '../../core/models/projeto';
import { CreateProjetoRequest } from '../../features/projeto-usuario/interfaces/createempresa.resquest';

@Injectable({
  providedIn: 'root'
})
export class ProjetoService {
  private readonly baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiServer + 'projeto';
  }
  create(createProjetoRequest: CreateProjetoRequest): Observable<Projeto>{
    return this.http.post<Projeto>(this.baseUrl, createProjetoRequest)
  }
  GetProjetosdoUsuario(id: number): Observable<Projeto> {
    return this.http.get<Projeto>(`${this.baseUrl}/projetosdoUsuarioouempresa/${id}`).pipe(
      catchError(this.handleError)
    );
  }
  GetProjetosdaEmpresa(id: string): Observable<Projeto[]>{
    return this.http.get<Projeto[]>(`${this.baseUrl}/empresa/${id}`).pipe(
      catchError(this.handleError)
    )
  }
  private handleError(error: any): Observable<never> {
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      errorMessage = 'Ocorreu um erro: ' + error.error.message;
    } else {
      errorMessage = `O backend retornou o código ${error.status}: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
  projetoSelecionadaSubject$ = new BehaviorSubject<Projeto | null>(null);
}
