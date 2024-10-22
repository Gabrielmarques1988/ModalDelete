import { Component, OnInit, inject, OnDestroy, TemplateRef } from '@angular/core';
import { ProjetoService } from '../../../../shared/services/projeto.service';
import { Projeto } from '../../../../core/models/projeto';
import { Subject} from 'rxjs';
import { Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { ModalEditarProjetoComponent } from '../modal-editar-projeto/modal-editar-projeto.component';

@Component({
  selector: 'app-projeto',
  standalone: true,
  imports: [ModalEditarProjetoComponent],
  templateUrl: './projeto.component.html',
  styleUrl: './projeto.component.css'
})
export class ProjetoComponent implements OnInit,OnDestroy {

  private readonly destroy$: Subject<void> = new Subject();
  private projetoService = inject(ProjetoService)
  listaProjeto: Projeto []=[]
  idEmpresa: string | null = null;
  projetos:Projeto []=[]
  idProjeto?: number | null = null;
  contagemArquivosMap: { [projetoId: number]: number } = {};
  pageSize: number = 10;
  currentPage: number = 1;
  totalProjetos: number = 0;
  paginatedProjeto: Projeto[] = [];
  private router = inject(Router)


  ngOnInit(): void {
    initFlowbite()
    const idEmpresa = sessionStorage.getItem('idEmpresa');
    if (idEmpresa) {
      this.idEmpresa = idEmpresa;
    }
    this.listarProjetos(idEmpresa!);
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  listarProjetos(idEmpresa: string): void{
    this.projetoService.GetProjetosdaEmpresa(idEmpresa).subscribe({
      next: (projetos: Projeto[])=>{
        this.listaProjeto = projetos;
        this.totalProjetos = projetos.length;
        this.updatePaginatedProjetos()
      }
    })
  }
  updatePaginatedProjetos(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedProjeto = this.listaProjeto.slice(start, end);
  }
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedProjetos();
    }
  }
  nextPage(): void {
    if (this.currentPage * this.pageSize < this.totalProjetos) {
      this.currentPage++;
      this.updatePaginatedProjetos();
    }
  }
  get startItem(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }
  get endItem(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalProjetos);
  }

  selecionarProjetoEditar(projeto: Projeto){
    this.projetoService.projetoSelecionadaSubject$.next(projeto);
    console.log(projeto)
  }




  selecionarProjeto(idProjeto: number, NomeProjeto: string){
    this.idProjeto = idProjeto;
    sessionStorage.setItem('idProjeto', idProjeto.toString());
    sessionStorage.setItem('NomeProjeto', NomeProjeto);
    //this.breadcrumbService.set('@projeto-usuario',NomeProjeto);
    this.router.navigate([`/disciplina`]).then(() => {
      window.location.reload();
    });
  }
}
