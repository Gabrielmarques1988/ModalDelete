import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RequestGetArquivoS3 } from '../../../interfaces/request_get_arquivo_s3';
import { ArquivoService } from '../../../../../shared/services/arquivo.service';
import { UsuarioService } from '../../../../../shared/services/usuario.service';
import { Arquivo } from '../../../../../core/models/arquivo';
import { Subscription } from 'rxjs';
import { Usuario } from '../../../../../core/models/usuario';
import { ArquivoTagDto } from '../../../interfaces/arquivo_tag_dto';
import { TagService } from '../../../../../shared/services/tag.service';
import { ArquivoTagComponent } from '../../arquivo-tag/arquivo-tag.component';
import { DeletarArquivoTagComponent } from '../../arquivo-tag/deletar-arquivo-tag/deletar-arquivo-tag.component';

@Component({
  selector: 'app-detalhes-visualizacao',
  standalone: true,
  imports: [CommonModule, ArquivoTagComponent, DeletarArquivoTagComponent],
  templateUrl: './detalhes-visualizacao.component.html',
  styleUrl: './detalhes-visualizacao.component.css'
})
export class DetalhesVisualizacaoComponent implements OnInit,OnDestroy{
  arquivoSelecionado: Arquivo | null = null;
  private arquivoSubscription!: Subscription;
  autor: Usuario | null = null;
  arquivoRecente!: Arquivo;
  extensao: string = '';

  listaTagsArquivo: ArquivoTagDto[] = [];

  constructor(private arquivoService: ArquivoService, private usuarioService: UsuarioService, private tagService: TagService) {
  }

  ngOnInit(): void {
    this.arquivoSubscription = this.arquivoService.arquivoSelecionado$.subscribe(
    arquivo => {
      this.arquivoSelecionado = arquivo;
      console.log('Arquivo selecionado: ', this.arquivoSelecionado);
      if (arquivo) {
        this.buscarAutor(arquivo.usuario_id);
        this.todasAsTagsDoArquivo(this.arquivoSelecionado?.arquivo_id!)
        this.arquivoService.getVersaoRecente(4, this.arquivoSelecionado!.arquivo_descricao).subscribe(data => {
          this.arquivoRecente = data[0]
          console.log('arquivo recente', this.arquivoRecente);
          this.extensao = this.getFileExtension(this.arquivoRecente.arquivo_descricao)!.toUpperCase()
          console.log('extensao:',this.extensao)
        })
      }
    });

  }

  ngOnDestroy() {
    this.arquivoSubscription.unsubscribe();
    if (this.autor) {
      this.autor = null
    }
  }

  buscarAutor(usuarioId: number) {
    this.usuarioService.findByid(usuarioId).subscribe(
      data => {
        this.autor = data;
        console.log('autor', this.autor);
        this.usuarioService.setAutor(this.autor)
      }
    );
  }

  getFileExtension(filename: string) {
    const parts = filename.split('.');
    return parts.length > 1 ? parts.pop() : '';
  }


  stringToDate(dateString: string | Date): Date {
    return new Date(dateString);
  }

  downloadFile(){
    console.log(this.arquivoSelecionado?.arquivo_link)
    let req = new RequestGetArquivoS3()
    if(this.arquivoSelecionado?.arquivo_descricao && this.arquivoSelecionado.arquivo_link){
      req.arquivo_descricao = this.arquivoSelecionado?.arquivo_descricao
      req.arquivo_link = this.arquivoSelecionado.arquivo_link
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

  todasAsTagsDoArquivo(arquivoId : string): void {
    console.log("Olha as tags aqui!!")
    this.tagService.getTagsByArquivo(arquivoId).subscribe({
      next: (data) => {
        this.listaTagsArquivo = data;
      },
      error: (err) => {
        console.error('Erro ao buscar tags:', err);
      }
    });
  }


}
