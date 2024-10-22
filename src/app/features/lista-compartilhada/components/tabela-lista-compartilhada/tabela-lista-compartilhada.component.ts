import { Component, inject, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { listaCompartilhada } from './../../interfaces/listaCompartilhada';
import { ListaCompartilhadaService } from '../../../../shared/services/listaCompartilhada.service';
import { BtnListaCompartilhadaComponent } from '../../components/btn-lista-compartilhada/btn-lista-compartilhada.component';
import { ModalEditarListaCompartilhadaComponent } from '../modal-editar-lista-compartilhada/modal-editar-lista-compartilhada.component';
import { Subject } from 'rxjs';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'tabela-app-lista-compartilhada',
  standalone: true,
  imports: [CommonModule, ModalEditarListaCompartilhadaComponent, BtnListaCompartilhadaComponent],
  templateUrl: './tabela-lista-compartilhada.component.html',
  styleUrls: ['./tabela-lista-compartilhada.component.css'],
})
export class TabelaListaCompartilhadaComponent implements OnInit, OnDestroy {
  @ViewChild('modalTemplate') modalTemplate!: TemplateRef<any>;

  private readonly destroy$: Subject<void> = new Subject();
  listaCompartilhada: listaCompartilhada[] = [];

  // Navegação Lista-Compartilhada para arquivos
  listaCompartilhadaId?: number
  private router = inject(Router)
  private breadcrumbService = inject(BreadcrumbService)

  constructor(private listaCompartilhadaService: ListaCompartilhadaService,) {}

  ngOnInit(): void {
    this.getListaCompartilhada();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  getListaCompartilhada(): void {
    this.listaCompartilhadaService.getListaCompartilhadaTabela().subscribe({
      next: (response: listaCompartilhada[]) => {
        console.log('Resposta da API:', response);
        if (response) {
          this.listaCompartilhada = response;
          console.log('Dados atribuídos:', this.listaCompartilhada);
        }
      },
      error: (error: any) => {
        console.log('Erro ao carregar dados:', error);
      },
    });
  }

  getStatusDescription(status: number | undefined): string {
    if (status === undefined) {
      return 'Status não definido';
    } else if (status === -1) {
      return 'Deletado';
    } else if (status === 0) {
      return 'Inativo';
    } else if (status === 1) {
      return 'Ativo';
    } else {
      return 'Não definido';
    }
  }

  selecionarListaCompartilhada(listaCompartilhada : listaCompartilhada) : void{
    this.listaCompartilhadaService.listaCompartilhadaSubject$.next(listaCompartilhada)
  }


  listaCompartilhadaNavegacao(listaCompartilhadaId: number){
    this.listaCompartilhadaId = listaCompartilhadaId;
    sessionStorage.setItem('listaCompartilhadaId', listaCompartilhadaId.toString());
    this.router.navigate([`/arquivo`]).then(() => {
      window.location.reload();
    });
  }
}
