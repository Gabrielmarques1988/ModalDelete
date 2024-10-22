import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../enviroment";
import { ArquivoTagDto } from '../../features/arquivo/interfaces/arquivo_tag_dto';

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

export class TagService {
  private readonly baseUrl = `${API}tag`

  constructor(private http: HttpClient,private handler: HttpBackend) { }

  createTag(tag: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, tag);
  }

  getTagsByProject(projectId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/projeto/${projectId}`);
  }

  setTagToFile(tagId: number, arquivoId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/atribuir/${tagId}/${arquivoId}`, {});
  }

  getTagsByArquivo(arquivoId: string): Observable<ArquivoTagDto[]> {
    return this.http.get<ArquivoTagDto[]>(`${this.baseUrl}/arquivo/${arquivoId}`);
  }

  deleteArquivoTags(tagArquivoIds: number[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/deletar`, { tagArquivoIds });
  }

}
