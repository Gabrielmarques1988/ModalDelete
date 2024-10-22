import { ArquivoTagDto } from './../../interfaces/arquivo_tag_dto';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ArquivoService } from '../../../../shared/services/arquivo.service';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Tag } from '../../../../core/models/tag';
import { TagService } from '../../../../shared/services/tag.service';
import { Arquivo } from '../../../../core/models/arquivo';
import { DeletarArquivoTagComponent } from './deletar-arquivo-tag/deletar-arquivo-tag.component';

@Component({
  selector: 'app-arquivo-tag',
  standalone: true,
  imports: [ReactiveFormsModule, DeletarArquivoTagComponent],
  templateUrl: './arquivo-tag.component.html',
  styleUrls: ['./arquivo-tag.component.css']
})
export class ArquivoTagComponent implements OnInit, OnDestroy {

  private readonly destroy$: Subject<void> = new Subject();

  arquivoSelecionado: Arquivo | null = null;
  private arquivoSubscription!: Subscription;

  tagForm: FormGroup;
  todasAsTags: Tag[] = [];
  tagsSelecionadas: Tag[] = [];
  listaTagsArquivo: ArquivoTagDto[] = [];

  constructor(private tagService: TagService, private arquivoService: ArquivoService, private fb: FormBuilder) {
    this.tagForm = this.fb.group({
      nova_tag: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.arquivoSubscription = this.arquivoService.arquivoSelecionado$.pipe(takeUntil(this.destroy$)).subscribe(
      arquivo => {
        this.arquivoSelecionado = arquivo;
        if (arquivo) {
          this.todasAsTagsDoArquivo(arquivo.arquivo_id!);
        }
      }
    );
    // this.listaDeTagsPorProjeto(4); // Mock para buscar as Tags do Projeto 4
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  submitTag() {
    const novaTagNome = this.tagForm.get('nova_tag')?.value;
    const projetoId = 4; // Mock do ID do projeto

    // Se uma nova tag foi inserida, cria e atribui ao arquivo
    if (novaTagNome) {
      const novaTag = { tag_nome: novaTagNome, projeto_id: projetoId };
      this.tagService.createTag(novaTag).pipe(takeUntil(this.destroy$)).subscribe(response => {
        console.log('Nova tag criada com sucesso', response);
        this.atribuirTagsAoArquivo(response.tag_id);
        this.tagForm.reset();
      }, error => {
        console.error('Erro ao criar tag', error);
      });
    }

    // Atribuir também as tags já selecionadas
    this.tagsSelecionadas.forEach(tag => {
      this.atribuirTagsAoArquivo(tag.tag_id!);
    });

    // Limpa a seleção de tags
    this.limparTags();
    this.listaDeTagsPorProjeto(4);

  }

  // listaDeTagsProProjeto(projectId: number) {
  //   this.tagService.getTagsByProject(projectId).pipe(takeUntil(this.destroy$)).subscribe({
  //     next: (tags: Tag[]) => {
  //       this.todasAsTags = tags;
  //     },
  //     error: (err) => {
  //       console.error('Erro ao buscar as Tags', err);
  //     }
  //   });
  // }

  todasAsTagsDoArquivo(arquivoId: string): void {
    this.tagService.getTagsByArquivo(arquivoId).subscribe({
      next: (data) => {
        this.listaTagsArquivo = data;
        this.listaDeTagsPorProjeto(4); // Chame essa função depois de obter as tags do arquivo
      },
      error: (err) => {
        console.error('Erro ao buscar tags:', err);
      }
    });
  }
  
  listaDeTagsPorProjeto(projectId: number) {
    this.tagService.getTagsByProject(projectId).pipe(takeUntil(this.destroy$)).subscribe({
      next: (tags: Tag[]) => {
        this.todasAsTags = tags.filter(tag => 
          !this.listaTagsArquivo.some(t => t.tag_id === tag.tag_id)
        );
      },
      error: (err) => {
        console.error('Erro ao buscar as Tags', err);
      }
    });
  }

  toggleTagSelection(tag: Tag) {
    const index = this.tagsSelecionadas.indexOf(tag);
    if (index > -1) {
      this.tagsSelecionadas.splice(index, 1);
    } else {
      this.tagsSelecionadas.push(tag);
    }
  }

  atribuirTagsAoArquivo(tagId: number) {
    const arquivoId = this.arquivoSelecionado?.arquivo_id; // ID real do arquivo
    if (arquivoId) {
      this.tagService.setTagToFile(tagId, arquivoId).pipe(takeUntil(this.destroy$)).subscribe(response => {
        console.log('Tag atribuída ao arquivo', response);
      }, error => {
        console.error('Erro ao atribuir tag ao arquivo', error);
      });
    } else {
      console.error('Arquivo não selecionado para atribuição de tags.');
    }
  }

  limparTags() {
    this.tagsSelecionadas = [];
    this.tagForm.reset();
  }
}
