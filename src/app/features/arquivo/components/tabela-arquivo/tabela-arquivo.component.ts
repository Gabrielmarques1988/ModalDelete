import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Arquivo } from '../../../../core/models/arquivo';
import { Subject, takeUntil } from 'rxjs';
import { ArquivoService } from '../../../../shared/services/arquivo.service';
import { FiltroService } from '../../../../shared/services/filtro.service';
import { ListaCompartilhadaService } from '../../../../shared/services/listaCompartilhada.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TiposVisualizacaoArquivoComponent } from '../tipos-visualizacao-arquivo/tipos-visualizacao-arquivo.component';

@Component({
  selector: 'app-tabela-arquivo',
  standalone: true,
  imports: [CommonModule, TiposVisualizacaoArquivoComponent],
  templateUrl: './tabela-arquivo.component.html',
  styleUrl: './tabela-arquivo.component.css'
})
export class TabelaArquivoComponent implements OnInit, OnDestroy{
  listaArquivos: Arquivo[] = [];
  listaFiltrada: Arquivo[] = [];
  termoPesquisa: string = '';
  criterioOrdenacao: string = '';
  usuarioId!: number;
  statusSelecionado: number[] = [];
  ultimaModificacao: string = '';
  tiposArquivoSelecionados: string[] = [];
  arquivo!: Arquivo;
  etapaId!: number;

  private onDestroy$ = new Subject<boolean>();

  @Output() testeChange = new EventEmitter<Arquivo[]>();

  listaArquivosMarcados: Arquivo[] = [];

  constructor(private arquivoService: ArquivoService, private filtroService: FiltroService, private listaCompartilhadaService: ListaCompartilhadaService, private router: ActivatedRoute,) {
    this.filtroService.obterTermoPesquisa().pipe(takeUntil(this.onDestroy$)).subscribe(termo => {
      this.onPesquisaChange(termo);
    });
    this.filtroService.obterCriterioOrdenacao().pipe(takeUntil(this.onDestroy$)).subscribe(criterio => {
      this.onOrdenacaoChange(criterio);
    });
    this.filtroService.atualizarStatusSelecionado(this.statusSelecionado);
    this.filtroService.obterUltimaModificacao().pipe(takeUntil(this.onDestroy$)).subscribe(ultimaModificacao => {
      this.onUltimaModificacaoChange(ultimaModificacao);
    });
    this.filtroService.obterTiposArquivoSelecionados().pipe(takeUntil(this.onDestroy$)).subscribe(tipos => {
      this.onTiposArquivoChange(tipos);
    });
  }

  ngOnInit() {
    this.router.params.pipe(takeUntil(this.onDestroy$)).subscribe(params => {
      this.etapaId = params['id'];
      console.log('etapaid',this.etapaId);
    });
    this.router.queryParamMap.pipe(takeUntil(this.onDestroy$)).subscribe((params: ParamMap) => {
      if (params.has('listaId')) {
        const id = params.get('listaId');
        this.listaCompartilhadaService
          .getArquivosListaCompartilhada(id)
          .subscribe((data) => {
            const seenIds = new Set();
            const uniqueItems = data.filter((item: any) => {
              if (seenIds.has(item.arquivo_id)) {
                return false;
              } else {
                seenIds.add(item.arquivo_id);
                return true;
              }
            });
            this.listaArquivos = uniqueItems;
          });
      } else {
        // this.arquivoService.findByEtapaId(this.etapaId).pipe(takeUntil(this.onDestroy$)).subscribe((data) => {
        this.arquivoService.findByEtapaId(1).pipe(takeUntil(this.onDestroy$)).subscribe((data) => {
          this.listaArquivos = data
          this.listaFiltrada = data;
          console.log(this.listaArquivos);
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
    this.arquivoService.apagarArquivoSelecionado();
  }

  toggleDropdown(id: string) {
    const dropdown = document.getElementById('dropdownDivider-' + id);
    if (dropdown) {
      dropdown.classList.toggle('hidden');
    }
  }

  deletarArquivo(arquivo: any) {
    // Sua lógica para deletar o arquivo
  }

  editarArquivo(arquivo: any) {
    // Sua lógica para editar o arquivo
  }


  detalharArquivo(arquivo: Arquivo) {
    console.log("setando o arquivo ", arquivo);
    // this.arquivoService.getVersaoRecente(4, arquivo.arquivo_descricao).subscribe(data => {
    //  console.log("setando o recente:", data)
    //  this.arquivoService.setArquivoRecente(data)
    // })

    this.arquivoService.setArquivoSelecionado(arquivo);

  }

  stringToDate(stringDate: string | Date): Date {
    return new Date(stringDate);
  }



  atualizarFiltro() {
    let arquivosFiltrados = this.listaArquivos;
    if (this.termoPesquisa) {
      arquivosFiltrados = arquivosFiltrados.filter(arquivo =>
        arquivo.arquivo_descricao?.toLowerCase().includes(this.termoPesquisa.toLowerCase()));
    }
    //if (this.statusSelecionado.length > 0) {
      //arquivosFiltrados = arquivosFiltrados.filter(arquivo =>
        //this.statusSelecionado.includes(arquivo.arquivo_status!));
    //}

    if (this.ultimaModificacao) {
      arquivosFiltrados = this.filtrarPorUltimaModificacao(arquivosFiltrados, this.ultimaModificacao);
    }

    if (this.tiposArquivoSelecionados.length > 0) {
      arquivosFiltrados = arquivosFiltrados.filter(arquivo =>
        this.tiposArquivoSelecionados.includes(arquivo.arquivo_extensao!));
    }
    this.listaFiltrada = this.ordenarArquivos(arquivosFiltrados, this.criterioOrdenacao);
  }

  onPesquisaChange(novoValor: string) {
    this.termoPesquisa = novoValor;
    this.atualizarFiltro();
  }

  onOrdenacaoChange(criterio: string) {
    this.listaFiltrada = this.ordenarArquivos(this.listaFiltrada, criterio);
  }

  onStatusChange(status: number[]) {
    this.statusSelecionado = status;
    this.atualizarFiltro();
  }

  onUltimaModificacaoChange(ultimaModificacao: string) {
    this.ultimaModificacao = ultimaModificacao;
    this.atualizarFiltro();
  }

  onTiposArquivoChange(tipos: string[]) {
    this.tiposArquivoSelecionados = tipos;
    this.atualizarFiltro();
  }

  filtrarPorUltimaModificacao(lista: Arquivo[], criterio: string): Arquivo[] {
    const agora = new Date();
    return lista.filter(arquivo => {
      const dataArquivo = new Date(arquivo.arquivo_data!);
      switch (criterio) {
        case 'Hoje':
          return dataArquivo.toDateString() === agora.toDateString();
        case 'Últimos 7 dias':
          return (agora.getTime() - dataArquivo.getTime()) / (1000 * 3600 * 24) <= 7;
        case 'Últimos 30 dias':
          return (agora.getTime() - dataArquivo.getTime()) / (1000 * 3600 * 24) <= 30;
        case 'Este ano':
          return dataArquivo.getFullYear() === agora.getFullYear();
        default:
          return true;
      }
    });
  }

  ordenarArquivos(lista: Arquivo[], criterio?: string): Arquivo[] {
    if (!criterio) return lista;

    switch (criterio) {
      case 'Última modificação':
        return lista.sort((a, b) => new Date(b.arquivo_data!).getTime() - new Date(a.arquivo_data!).getTime());
      case 'Maior tamanho':
        //return lista.sort((a, b) => b.arquivo_tamanho! - a.arquivo_tamanho!);
      case 'Menor tamanho':
        //return lista.sort((a, b) => a.arquivo_tamanho! - b.arquivo_tamanho!);
      case 'A-Z':
        return lista.sort((a, b) => a.arquivo_descricao!.localeCompare(b.arquivo_descricao!));
      case 'Z-A':
        return lista.sort((a, b) => b.arquivo_descricao!.localeCompare(a.arquivo_descricao!));
      default:
        return lista;
    }
  }

  arquivoMarcado(event: Event, arquivo: any) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.checkboxChecked(arquivo);
    } else {
      this.checkboxUnchecked(arquivo);
    }
    this.testeChange.emit(this.listaArquivosMarcados);
  }

  checkboxChecked(arquivo: any) {
    this.listaArquivosMarcados.push(arquivo);
  }

  checkboxUnchecked(arquivo: any) {
    const indice = this.listaArquivosMarcados.findIndex(
      (a) => a.arquivo_id === arquivo.arquivo_id
    );
    if (indice !== -1) {
      this.listaArquivosMarcados.splice(indice, 1);
    }
  }

}
