import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../../shared/services/usuario.service';
import { ArquivoService } from '../../../../../shared/services/arquivo.service';
import { Arquivo } from '../../../../../core/models/arquivo';
import { Subscription } from 'rxjs';
import { Usuario } from '../../../../../core/models/usuario';
import { RequestGetArquivoS3 } from '../../../interfaces/request_get_arquivo_s3';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-versoes-arquivo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './versoes-arquivo.component.html',
  styleUrl: './versoes-arquivo.component.css'
})
export class VersoesArquivoComponent implements  OnInit,OnChanges, OnDestroy{

  arquivoSelecionado: Arquivo | null = null;
  arquivoSubscription!: Subscription;
  autorSubscription!: Subscription;
  versoes!: Arquivo[];
  versoesFiltradas!: Arquivo[];
  autor: Usuario | null = null;
  extensoes! : string [];

  constructor(private arquivoService: ArquivoService, private usuarioService: UsuarioService) {
  }
  ngOnInit(): void {
    this.arquivoSubscription = this.arquivoService.arquivoSelecionado$.subscribe(
      arquivo => {
        this.arquivoSelecionado = arquivo;
        if (arquivo) {
          this.buscarVersoes(arquivo.arquivo_id); // Chame a função para buscar o autor quando um novo arquivo for selecionado
        }
      }
    );
    this.autorSubscription = this.usuarioService.autor$.subscribe(
      (usuario: Usuario | null) => {
        this.autor = usuario
      }
    )
  }

  ngOnChanges(): void {
    // this.arquivoService.getVersoesPorId(this.arquivoSelecionado!.arquivo_id).subscribe((data) => {
    //   this.versoes = data
    //   console.log()    })
  }

  ngOnDestroy(): void {
    this.versoes = []
    this.arquivoSubscription.unsubscribe()
  }

  buscarVersoes(arquivoId: string) {
    this.arquivoService.getVersoesPorId(arquivoId).subscribe(
      (data) => {
        console.log("id do arquivo",arquivoId)
        this.versoes = data;
        this.versoesFiltradas = data;
        this.identificarExtensoes(this.versoes)
        console.log("versoes:",data); // Certifique-se de que o autor foi buscado com sucesso
      }
    );

  }



  identificarExtensoes(versoes : Arquivo[]){
    var lookup: string[] = [];
    var items = versoes;
    var result = [];

    let name:string|undefined ;
    versoes.forEach(item => {
      name = item.arquivo_extensao;
      if (name){
        if (!(lookup.includes(name))){
          lookup.push(name);
        }
      }

    });
    this.extensoes = lookup;
  }



  filtarArquivos(tipoExtensao: String){
    console.log(tipoExtensao)

    this.versoesFiltradas = this.versoes.filter((arquivo)=> arquivo.arquivo_extensao==tipoExtensao)

    console.log(this.versoesFiltradas)

  }

  stringToDate(dateString: string | Date): Date {
    return new Date(dateString);
  }

  getExtensao(descricao: string): string {
    let partes = descricao.split('.');
    return partes[partes.length - 1];
  }

  downloadFile(arquivo:Arquivo){
    console.log(arquivo?.arquivo_link)
    let req = new RequestGetArquivoS3()
    if(arquivo?.arquivo_descricao && arquivo.arquivo_link){
      req.arquivo_descricao = arquivo?.arquivo_descricao
      req.arquivo_link = arquivo.arquivo_link
    }
    this.arquivoService.getArquivoS3(req).subscribe((res)=>{
      this.arquivoService.getArquivoFromS3(res.s3_pre_signed_link).subscribe((response)=>{
        console.log(response)
        if(response.body){
          const newBlob = new Blob([response.body], { type: response.body.type})
          const data = window.URL.createObjectURL(newBlob);
          const link = document.createElement("a");
          link.href = data;
          if(this.arquivoSelecionado)
            link.download = this.arquivoSelecionado.arquivo_descricao;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

        }
      })
    })
  }

}
