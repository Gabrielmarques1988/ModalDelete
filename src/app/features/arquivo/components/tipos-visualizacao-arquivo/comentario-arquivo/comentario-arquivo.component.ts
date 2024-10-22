import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Comentario } from '../../../../../core/models/comentario';
import { ComentarioService } from '../../../../../shared/services/comentario.service';

@Component({
  selector: 'app-comentario-arquivo',
  standalone: true,
  imports: [],
  templateUrl: './comentario-arquivo.component.html',
  styleUrl: './comentario-arquivo.component.css'
})
export class ComentarioArquivoComponent implements OnInit {

  constructor(private comentarioService: ComentarioService) {}

  comentarios: Comentario[] = [];
  @ViewChild('novoComentario') novoComentarioInput!: ElementRef;

  comentario: Comentario = {
    arquivo_comentario_descricao: 'Teste',
    arquivo_id: '1',
    arquivo_comentario_nivel: 1,
  };

  postarComentario() {
    this.comentarioService.post(this.comentario).subscribe((comentario) => {
      this.comentarios.push(comentario);
    });
  }

  ngOnInit(): void {
    this.carregarComentarios();
  }

  carregarComentarios(): void {
    this.comentarioService.findAll().subscribe((comentarios) => {
      this.comentarios = comentarios;
    });
  }

  adicionarComentario(): void {
    const novoComentario = this.novoComentarioInput.nativeElement.value.trim();
    if (novoComentario) {
      const comentario: Comentario = {
        arquivo_comentario_id: 0,
        arquivo_comentario_descricao: novoComentario,
        arquivo_comentario_markup: null,
        arquivo_id: '01',
        arquivo_comentario_id_pai: null,
        arquivo_comentario_nivel: 1,
        arquivo_comentario_data: null,
        arquivo_comentario_status: 1,
      };
      this.comentarioService.post(comentario).subscribe((novoComentario) => {
        this.comentarios.push(novoComentario);
        this.novoComentarioInput.nativeElement.value = '';
      });
    }
  }

  deletarComentario(comentarioId: number): void {
    this.comentarioService.remove(comentarioId).subscribe(() => {
      this.comentarios = this.comentarios.filter(
        (c) => c.arquivo_comentario_id !== comentarioId
      );
    });
  }
}
