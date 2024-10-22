import { HttpBackend, HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { Arquivo } from '../../core/models/arquivo';
import { environment } from '../../../enviroment';
import { ProjetoS3 } from '../../features/arquivo/interfaces/projetos3';
import { ResponsePutArquivoS3 } from '../../features/arquivo/interfaces/reponseoutarquivos3';
import { RequestGetArquivoS3 } from '../../features/arquivo/interfaces/request_get_arquivo_s3';
import { ResponseGetArquivoS3 } from '../../features/arquivo/interfaces/response-get-arquivo-s3';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    //Authorization: 'my-auth-token'
  })
};

const API = environment.apiServer

@Injectable({
  providedIn: 'root'
})
export class ArquivoService {

  private readonly baseUrl = `${API}arquivo`
  private arquivoSelecionadoSubject = new BehaviorSubject<Arquivo | null>(null);
  arquivoSelecionado$ = this.arquivoSelecionadoSubject.asObservable();
  private arquivoRecenteSubject = new BehaviorSubject<Arquivo | null>(null);
  arquivoRecente$ = this.arquivoRecenteSubject.asObservable();

  constructor(private http: HttpClient,private handler: HttpBackend) { }

  findAll() : Observable<Arquivo[]>  {
    return this.http.get<Arquivo[]>(this.baseUrl, httpOptions)
  }

  findByEtapaId(etapaId: number): Observable<Arquivo[]> {
    return this.http.get<Arquivo[]>(`${this.baseUrl}/ArquivosEtapa/${etapaId}`)
  }

  getVersoesPorId(arquivoId: string) : Observable<Arquivo[]> {
    return this.http.get<Arquivo[]>(`${this.baseUrl}/versoes/${arquivoId}`)
  }

  getVersaoRecente(projetoId: number, arquivoDescricao: string) : Observable<Arquivo[]> {
    return this.http.get<Arquivo[]>(`${this.baseUrl}/ArquivoUltimaVersao/${projetoId}/${arquivoDescricao}`)
  }

  getArquivosPais(): Observable<Arquivo[]> {
    return this.http.get<Arquivo[]>(`${this.baseUrl}/ListaArquivosPais/1`)
  }

  postArquivo(arquivo: Arquivo) {
    return this.http.post<Arquivo>(this.baseUrl, arquivo, httpOptions)
  }

  setArquivoSelecionado(arquivo: Arquivo | null) {
    this.arquivoSelecionadoSubject.next(arquivo);
  }

  setArquivoRecente(arquivo: Arquivo | null) {
    this.arquivoRecenteSubject.next(arquivo);
  }

  postPutArquivoS3(projeto:ProjetoS3){
    return this.http.post<ResponsePutArquivoS3>('http://localhost:3000/arquivo/GetPutPreSignedUrl/',projeto,httpOptions)
  }

  putArquivoInS3(file:any,link:string,file_type:string){
    return this.http.put(link,file,{  headers: new HttpHeaders({
      'Content-Type':  file_type,
      //Authorization: 'my-auth-token'
    }),observe: 'response' ,responseType:'text'})
  }

  getArquivoS3(request:RequestGetArquivoS3){
      return this.http.post<ResponseGetArquivoS3>('http://localhost:3000/arquivo/GetGetPreSignedUrl/',request,httpOptions)
  }

  getArquivoFromS3(link:string){
    return this.http.get(link,{responseType:'blob',observe:'response'})
  }

  apagarArquivoSelecionado() {
    this.arquivoSelecionadoSubject.next(null);
  }

  getArquivosSizeByProjetoId(projetoId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/size-by-projeto/${projetoId}`);
  }

}



