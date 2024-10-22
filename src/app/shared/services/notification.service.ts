import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../enviroment';
import { Notificacao } from '../../core/models/notificacao';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private readonly baseUrl: string;


  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiServer + 'notificacao';
  }

  findAll(): Observable<Notificacao[]> {
    return this.http.get<Notificacao[]>(this.baseUrl);
  }

  getNotification(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getNotificationUserId(usuario_id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/naolidas/${usuario_id}`);
  }

  getNotificationRead(usuario_id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/updateciente/${usuario_id}`);
  }

  getNotificationId(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  create(notificationData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, notificationData);
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
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
