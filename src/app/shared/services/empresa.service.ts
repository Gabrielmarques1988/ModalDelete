import { CreateEmpresaRequest } from '../../features/empresa/interfaces/createempresa.request';
import { Empresa } from './../../core/models/empresa';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../enviroment";
import { BehaviorSubject, catchError, Observable, throwError } from "rxjs";
import { Usuario } from "../../core/models/usuario";


@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private readonly baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = environment.apiServer + 'empresa';
  }

  private usuarioAutenticadoSubject = new BehaviorSubject<Usuario | null>(null);
  usuarioAutenticado$ = this.usuarioAutenticadoSubject.asObservable();

  empresaSelecionadaSubject$ = new BehaviorSubject<Empresa | null>(null);


  findAll() : Observable<Empresa[]> {
    return this.http.get<Empresa[]>(this.baseUrl)
  }

  findOne() :Observable<Empresa>{
    return this.http.get<Empresa>(this.baseUrl+"/2")
  }

  contarProjetos(empresaId: number): Observable<number> {
    const url = `${this.baseUrl}/contador/projetos/${empresaId}`;
    return this.http.get<number>(url);
  }

  contarUsuarios(empresaId: number): Observable<number> {
    const url = `${this.baseUrl}/contador/usuarios/${empresaId}`;
    return this.http.get<number>(url);
  }

  contarArquivos(empresaId: number): Observable<number> {
    const url = `${this.baseUrl}/contador/arquivos/${empresaId}`;
    return this.http.get<number>(url);
  }

  create(createEmpresaRequest: CreateEmpresaRequest): Observable<Empresa> {
    return this.http.post<Empresa>(this.baseUrl, createEmpresaRequest)
  }

  deleteEmpresa(empresaId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${empresaId}`);
  }

  updateEmpresa(empresaId: number, data: CreateEmpresaRequest): Observable<Empresa> {
    return this.http.patch<Empresa>(`${this.baseUrl}/${empresaId}`, data);
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

  //V2
 getEmpresa(): Observable<any>{
   return this.http.get<any[]>(this.baseUrl).pipe(catchError(this.handleError))
  }


     //V2
     GetEmpresaByIdAllData(id: number): Observable<Empresa> {
      return this.http.get<Empresa>(`${this.baseUrl}/EmpresaByIdAllData/${id}`).pipe(
        catchError(this.handleError) // Handle potential errors
      );
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
