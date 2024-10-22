import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../enviroment';
import { Observable, catchError, throwError } from 'rxjs';
import { Etapa } from '../../core/models/etapa';

@Injectable({
  providedIn: 'root'
})
export class EtapaService {
  private readonly baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiServer + 'etapa';
  }
  GetEtapasdeDisciplina(id: string): Observable<Etapa[]>{
    return this.http.get<Etapa[]>(`${this.baseUrl}/disciplina/${id}`).pipe(
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
