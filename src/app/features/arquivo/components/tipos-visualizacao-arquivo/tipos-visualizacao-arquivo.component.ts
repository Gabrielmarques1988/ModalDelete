import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { DetalhesVisualizacaoComponent } from './detalhes-visualizacao/detalhes-visualizacao.component';
import { MarkupComponent } from './markup/markup.component';
import { VersoesArquivoComponent } from './versoes-arquivo/versoes-arquivo.component';
import { ComentarioArquivoComponent } from './comentario-arquivo/comentario-arquivo.component';
import { TabConvidadosComponent } from '../../../lista-compartilhada/components/tab-convidados/tab-convidados.component';
import { TabVisualizacaoComponent } from '../../../lista-compartilhada/components/tab-visualizacao/tab-visualizacao.component';
import { TabGeralComponent } from '../../../lista-compartilhada/components/tab-geral/tab-geral.component';

@Component({
  selector: 'app-tipos-visualizacao-arquivo',
  standalone: true,
  imports: [DetalhesVisualizacaoComponent, MarkupComponent, ComentarioArquivoComponent, VersoesArquivoComponent, TabConvidadosComponent, TabGeralComponent, TabVisualizacaoComponent],
  templateUrl: './tipos-visualizacao-arquivo.component.html',
  styleUrl: './tipos-visualizacao-arquivo.component.css'
})
export class TiposVisualizacaoArquivoComponent implements OnInit, OnDestroy , AfterViewInit {

  private onDestroy$ = new Subject<boolean>();

  constructor(private router: ActivatedRoute){}

  teste: boolean= true;

  ngOnInit(): void {
    this.router.queryParamMap.pipe(takeUntil(this.onDestroy$)).subscribe((params: ParamMap) => {
      if (params.has('listaId')) {
        this.teste = false;
      }
  });
  }

  ngAfterViewInit(): void {
    this.inicializarAbas();
  }

  inicializarAbas() {
    const tabs = document.querySelectorAll('[data-tabs-target]');
    const tabContents = document.querySelectorAll('[role="tabpanel"]');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabContents.forEach(content => {
          content.classList.add('hidden');
        });
        const target = document.querySelector(tab.getAttribute('data-tabs-target')!);
        target!.classList.remove('hidden');
      });
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }
}
