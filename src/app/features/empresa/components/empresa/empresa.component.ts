import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ModalCriarEmpresaComponent } from "../modal-criar-empresa/modal-criar-empresa.component";
import { ModalEditarEmpresaComponent } from "../modal-editar-empresa/modal-editar-empresa.component";
import { EmpresaService } from '../../../../shared/services/empresa.service';
import { Subject, takeUntil } from 'rxjs';
import { Empresa } from '../../../../core/models/empresa';
import { CommonModule } from '@angular/common';
import { BreadcrumbService } from 'xng-breadcrumb';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empresa',
  standalone: true,
  imports: [ModalCriarEmpresaComponent, ModalEditarEmpresaComponent,CommonModule],
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit, OnDestroy {

  private readonly destroy$: Subject<void> = new Subject();
  listaEmpresa: Empresa[] = [];
  contagemProjetosMap: { [empresaId: number]: number } = {};  // Mapeia a contagem de projetos para cada empresa
  contagemUsuariosMap: { [empresaId: number]: number } = {};  // Mapeia a contagem de Usuarios para cada empresa
  contagemArquivosMap: { [empresaId: number]: number } = {};  // Mapeia a contagem de Arquivos para cada empresa
  // Paginação da tabela de Empresas
  pageSize: number = 10;
  currentPage: number = 1;
  totalItems: number = 0;
  paginatedEmpresas: Empresa[] = [];

  //Navegação
  idEmpresa?: number
  private router = inject(Router)
  private breadcrumbService = inject(BreadcrumbService)
  constructor(private empresaService: EmpresaService) {}

  ngOnInit(): void {
    this.listarEmpresas();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  // Método para listar as Empresas
  listarEmpresas(): void {
    this.empresaService.findAll().pipe(takeUntil(this.destroy$)).subscribe({
      next: (empresas: Empresa[]) => {
        this.listaEmpresa = empresas;
        this.totalItems = empresas.length;
        this.carregarContagemArquivos();
        this.carregarContagemProjetos();
        this.carregarContagemUsuarios();
        this.updatePaginatedEmpresas();
      },
      error: (err) => {
        console.error('Erro ao buscar empresas', err);
      }
    });
  }
  // Métodos de contagem de Projetos, Usuário e Arquivos.
  carregarContagemProjetos(): void {
    this.listaEmpresa.forEach(empresa => {
      this.empresaService.contarProjetos(empresa.empresa_id).subscribe({
        next: (contagem) => {
          this.contagemProjetosMap[empresa.empresa_id] = contagem;
        },
        error: (error) => {
          console.error(`Erro ao obter contagem de projetos para a empresa ${empresa.empresa_id}:`, error);
        }
      });
    });
  }
  carregarContagemUsuarios(): void {
    this.listaEmpresa.forEach(empresa => {
      this.empresaService.contarUsuarios(empresa.empresa_id).subscribe({
        next: (contagem) => {
          this.contagemUsuariosMap[empresa.empresa_id] = contagem;
        },
        error: (error) => {
          console.error(`Erro ao obter contagem de projetos para a empresa ${empresa.empresa_id}:`, error);
        }
      });
    });
  }
  carregarContagemArquivos(): void {
    this.listaEmpresa.forEach(empresa => {
      this.empresaService.contarArquivos(empresa.empresa_id).subscribe({
        next: (contagem) => {
          this.contagemArquivosMap[empresa.empresa_id] = contagem;
        },
        error: (error) => {
          console.error(`Erro ao obter contagem de projetos para a empresa ${empresa.empresa_id}:`, error);
        }
      });
    });
  }
  // Método de seleção de Empresa
  selecionarEmpresa(empresa: Empresa): void {
    this.empresaService.empresaSelecionadaSubject$.next(empresa);
  }
  // Métodos de Paginação
  updatePaginatedEmpresas(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedEmpresas = this.listaEmpresa.slice(start, end);
  }
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedEmpresas();
    }
  }
  nextPage(): void {
    if (this.currentPage * this.pageSize < this.totalItems) {
      this.currentPage++;
      this.updatePaginatedEmpresas();
    }
  }
  get startItem(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }
  get endItem(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalItems);
  }
  selecionarEmpresaNavegacao(idEmpresa: number,nomeEmpresa: string) {
    this.idEmpresa = idEmpresa;
    sessionStorage.setItem('idEmpresa', idEmpresa.toString());
    sessionStorage.setItem('empresaNomeselecionada', nomeEmpresa);
    //this.breadcrumbService.set('@projeto-usuario',nomeEmpresa);
    this.router.navigate([`/projeto-usuario`]).then(() => {
      window.location.reload();
    });
  }

}

