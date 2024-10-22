import { Subject, Subscription, takeUntil } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { ArquivoService } from '../../../../../shared/services/arquivo.service';
import { TagService } from '../../../../../shared/services/tag.service';
import { ArquivoTagDto } from '../../../interfaces/arquivo_tag_dto';
import { Arquivo } from '../../../../../core/models/arquivo';

@Component({
  selector: 'app-deletar-arquivo-tag',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './deletar-arquivo-tag.component.html',
  styleUrls: ['./deletar-arquivo-tag.component.css']
})
export class DeletarArquivoTagComponent implements OnDestroy, OnInit {
  arquivoSelecionado: Arquivo | null = null;
  private arquivoSubscription!: Subscription;
  private readonly destroy$: Subject<void> = new Subject();

  listaTagsArquivo: ArquivoTagDto[] = [];
  tagsParaDeletar: number[] = [];

  constructor(private arquivoService: ArquivoService, private tagService: TagService) {}

  ngOnInit(): void {
    this.arquivoSubscription = this.arquivoService.arquivoSelecionado$.pipe(takeUntil(this.destroy$)).subscribe(
      arquivo => {
        this.arquivoSelecionado = arquivo;
        this.todasAsTagsDoArquivo(this.arquivoSelecionado?.arquivo_id!);
      }
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  todasAsTagsDoArquivo(arquivoId: string): void {
    this.tagService.getTagsByArquivo(arquivoId).pipe(takeUntil(this.destroy$)).subscribe({
      next: (data) => {
        this.listaTagsArquivo = data;
      },
      error: (err) => {
        console.error('Erro ao buscar tags:', err);
      }
    });
  }

  toggleTagSelection(tag: ArquivoTagDto) {
    const index = this.tagsParaDeletar.indexOf(tag.arquivo_tag_id!);
    if (index > -1) {
      this.tagsParaDeletar.splice(index, 1);
    } else {
      this.tagsParaDeletar.push(tag.arquivo_tag_id!);
    }
  }

  submitDeletarTags() {
    if (this.tagsParaDeletar.length > 0) {
      this.tagService.deleteArquivoTags(this.tagsParaDeletar).pipe(takeUntil(this.destroy$)).subscribe({
        next: () => {
          console.log('Tags deletadas com sucesso!');
          this.listaTagsArquivo = this.listaTagsArquivo.filter(tag => !this.tagsParaDeletar.includes(tag.arquivo_tag_id!));
          this.tagsParaDeletar = [];
        },
        error: (err) => {
          console.error('Erro ao deletar tags:', err);
        }
      });
    } else {
      console.warn('Nenhuma tag selecionada para deletar.');
    }
  }
}
