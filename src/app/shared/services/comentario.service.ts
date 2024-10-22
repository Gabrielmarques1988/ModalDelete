import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../enviroment';
import { Comentario } from '../../core/models/comentario';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    //Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root',
})
export class ComentarioService {
  private readonly baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiServer + 'comentario';
  }

  post(comentario: Comentario): Observable<Comentario> {
    return this.http.post<Comentario>(this.baseUrl, comentario,httpOptions).pipe(
      catchError(this.handleError) // Handle potential errors
    );
  }

  findAll(): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(this.baseUrl).pipe(
      catchError(this.handleError) // Handle potential errors
    );
  }

  findOne(id: number): Observable<Comentario> {
    return this.http.get<Comentario>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError) // Handle potential errors
    );
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError) // Handle potential errors
    );
  }

  findOneWithChildren(id: number): Observable<ComentarioWithChildren> {
    return this.http
      .get<ComentarioWithChildren>(`${this.baseUrl}/${id}/children`)
      .pipe(
        catchError(this.handleError) // Handle potential errors
      );
  }

  private handleError(error: any): Observable<never> {
    // Use 'never' instead of 'void' for error handling
    let errorMessage: string;
    if (error.error instanceof ErrorEvent) {
      // Erro do lado do cliente ou da rede. Trate de acordo com a necessidade.
      errorMessage = 'Ocorreu um erro: ' + error.error.message;
    } else {
      // O backend retornou um código de resposta sem sucesso.
      // O corpo da resposta pode conter pistas sobre o que deu errado.
      errorMessage = `O backend retornou o código ${error.status}: ${error.message}`;
    }
    console.error(errorMessage); // Registra o erro no console
    return throwError(errorMessage); // Dispara um novo erro como um observável
  }
}

// (Optional) Interface for ComentarioWithChildren (if not already defined)
interface ComentarioWithChildren extends Comentario {
  children: Comentario[]; // Assuming a nested 'children' array
}
