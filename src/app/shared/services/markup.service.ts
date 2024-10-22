import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../enviroment";
import { Observable } from "rxjs";
// import { Markup } from '../interface/markup';
import { ComentarioMarkup } from "../../features/arquivo/interfaces/comentario_markup";
import { RequestPutMarkupS3 } from "../../features/arquivo/interfaces/request-put-s3-markup.dto";
import { ResponsePutMarkupS3 } from "../../features/arquivo/interfaces/response-put-s3-markup.dto";
import { CreateMarkUpDto } from "../../features/arquivo/interfaces/create-mark-up.dto";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root',
})
export class MarkupService {
  private readonly baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.apiServer}markup`;
  }

  // post(markup: Markup): Observable<Markup> {
  //   return this.http.post<Markup>(this.baseUrl, markup, httpOptions);
  // }

  findAll(idArquivo:string): Observable<ComentarioMarkup[]> {
    return this.http.get<ComentarioMarkup[]>(this.baseUrl+'/'+idArquivo);
  }

  // findOne(id: number): Observable<Markup> {
  //   return this.http.get<Markup>(`${this.baseUrl}/${id}`);
  // }

  // remove(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.baseUrl}/${id}`);
  // }

  getPutS3Link(request:RequestPutMarkupS3):Observable<ResponsePutMarkupS3>{
    return this.http.post<ResponsePutMarkupS3>(this.baseUrl+'/GetPutPreSignedUrl',request,httpOptions)
  }

  putImg(file:File, marklink:string){
    return this.http.put(marklink,file,{observe: 'response'})
  }

  salvaNoBanco(markup:CreateMarkUpDto){
   return this.http.post(this.baseUrl,markup)
  }
}
