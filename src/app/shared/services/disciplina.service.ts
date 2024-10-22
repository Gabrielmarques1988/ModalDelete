import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../enviroment';
import { Observable, catchError, throwError } from 'rxjs';
import { Disciplina } from '../../core/models/disciplina';

@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {
  private readonly baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiServer + 'disciplina';
  }
  GetDisciplinadaProjeto(id: string): Observable<Disciplina[]>{
    return this.http.get<Disciplina[]>(`${this.baseUrl}/projeto/${id}`).pipe(
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
}
