import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "../../../enviroment";
import { Logs } from "../../core/models/logs";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})

export class logsService{
  private baseUrl: string;

  constructor(private httpClient: HttpClient){
    this.baseUrl = 'http://localhost:3000/logs/'; // Mudar a Url quando estiver no BackEnd
  }

  getLogs(): Observable<any>{
    return this.httpClient.get<any>(`${this.baseUrl}`).pipe(
      catchError(this.handleError)
    )
  }

  getAllLogs(): Observable<Logs[]>{
    return this.httpClient.get<Logs[]>(this.baseUrl, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  postLogs(logs: Logs): Observable<Logs> {
    return this.httpClient.post<Logs>(this.baseUrl, logs, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any){
    console.error('Erro:', error);
    return throwError(() => new Error('Algo deu errado;'))
  }
}
