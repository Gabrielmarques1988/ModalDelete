import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../shared/services/usuario.service';
import { Subject, takeUntil } from 'rxjs';
import { Usuario } from '../../../../core/models/usuario';
import { CommonModule } from '@angular/common';
import { BreadcrumbService } from 'xng-breadcrumb';
import { Router } from '@angular/router';
import { TabelaUsuariosComponent } from '../tabela-usuarios/tabela-usuarios.component';
import { CriacaoUsuarioModalComponent } from '../modal-criacao-usuario/criacao-usuario-modal.component';
import { NavbarComponent } from "../../../../shared/components/navbar/navbar.component";
import { SidemenuComponent } from "../../../../shared/components/sidemenu/sidemenu.component";
import { BarraPesquisaArquivoComponent } from "../../../arquivo/components/barra-pesquisa-arquivo/barra-pesquisa-arquivo.component";


@Component({
  selector: 'app-gerenciamento-usuario',
  standalone: true,
  imports: [CommonModule, CriacaoUsuarioModalComponent, TabelaUsuariosComponent, NavbarComponent, SidemenuComponent, BarraPesquisaArquivoComponent],
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class GerenciamentoUsuarioComponent implements OnInit, OnDestroy {

  private readonly destroy$: Subject<void> = new Subject();
  listaUsuario: Usuario[] = [];
  contagemProjetosMap: { [usuarioId: number]: number } = {};  // Mapeia a contagem de projetos para cada usuário
  contagemEmpresasMap: { [usuarioId: number]: number } = {};  // Mapeia a contagem de Empresas para cada usuário
  contagemArquivosMap: { [usuarioId: number]: number } = {};  // Mapeia a contagem de Arquivos para cada usuário
  // Paginação da tabela de Usuários
  pageSize: number = 10;
  currentPage: number = 1;
  totalItems: number = 0;
  paginatedUsuarios: Usuario[] = [];

  // Navegação
  idUsuario?: number;
  private router = inject(Router);
  private breadcrumbService = inject(BreadcrumbService);

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.listarUsuarios();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Método para listar os Usuários
  listarUsuarios(): void {
    this.usuarioService.findAll().pipe(takeUntil(this.destroy$)).subscribe({
      next: (usuarios: Usuario[]) => {
        this.listaUsuario = usuarios;
        this.totalItems = usuarios.length;
        this.updatePaginatedUsuarios();
      },
      error: (err) => {
        console.error('Erro ao buscar usuários', err);
      }
    });
  }

  // Métodos de Paginação
  updatePaginatedUsuarios(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedUsuarios = this.listaUsuario.slice(start, end);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedUsuarios();
    }
  }

  nextPage(): void {
    if (this.currentPage * this.pageSize < this.totalItems) {
      this.currentPage++;
      this.updatePaginatedUsuarios();
    }
  }

  get startItem(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get endItem(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalItems);
  }

  selecionarUsuarioNavegacao(idUsuario: number, nomeUsuario: string) {
    this.idUsuario = idUsuario;
    sessionStorage.setItem('idUsuario', idUsuario.toString());
    sessionStorage.setItem('usuarioNomeSelecionado', nomeUsuario);
    //this.breadcrumbService.set('@projeto-usuario', nomeUsuario);
    this.router.navigate([`/projeto-usuario`]).then(() => {
      window.location.reload();
    });
  }
}
