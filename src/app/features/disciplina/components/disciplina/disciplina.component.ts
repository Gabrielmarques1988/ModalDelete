import { Disciplina } from './../../../../core/models/disciplina';
import { Router } from '@angular/router';
import { Projeto } from './../../../../core/models/projeto';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { DisciplinaService } from '../../../../shared/services/disciplina.service';


@Component({
  selector: 'app-disciplina',
  standalone: true,
  imports: [],
  templateUrl: './disciplina.component.html',
  styleUrl: './disciplina.component.css'
})
export class DisciplinaComponent implements OnInit,OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  projetoNomeselecionada: string = '';
  DisciplinaNomeselecionada: string = '';
  idProjeto: string | null = null;
  idDisciplina!: number;
  listaDisciplina: Disciplina[]=[]
  pageSize: number = 10;
  currentPage: number = 1;
  totalDisciplina: number = 0;
  paginatedDisciplina: Disciplina[] = [];
  private router = inject(Router)
  private disciplinaService = inject(DisciplinaService)

  ngOnInit(): void {
    const projetoNome = sessionStorage.getItem('NomeProjeto');
    const idProjeto = sessionStorage.getItem('idProjeto');
    if (projetoNome) {
      this.projetoNomeselecionada = projetoNome;
    }
    if(idProjeto){
      this.idProjeto = idProjeto
    }
    this.listarDisciplinas(idProjeto!);
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  listarDisciplinas(idProjeto: string): void{
    this.disciplinaService.GetDisciplinadaProjeto(idProjeto).subscribe({
      next: (disciplinas: Disciplina[])=>{
        this.listaDisciplina = disciplinas;
         //this.carregarContagemArquivos();
        this.totalDisciplina = disciplinas.length;
        this.updatePaginatedDisciplina()
      }
    })
  }
  updatePaginatedDisciplina(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedDisciplina = this.listaDisciplina.slice(start, end);
  }
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedDisciplina();
    }
  }
  nextPage(): void {
    if (this.currentPage * this.pageSize < this.totalDisciplina) {
      this.currentPage++;
      this.updatePaginatedDisciplina();
    }
  }
  get startItem(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }
  get endItem(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalDisciplina);
  }
  // carregarContagemArquivos(): void {
  //   this.listaProjeto.forEach(projeto => {
  //     this.projetoService.ContarArquivosdoProjeto(projeto.projeto_id!).subscribe({
  //       next: (contagem) => {
  //         this.contagemArquivosMap[projeto.projeto_id!] = contagem;
  //       },
  //       error: (error) => {
  //         console.error(`Erro ao obter contagem de projetos para a empresa ${projeto.empresa_id}:`, error);
  //       }
  //     });
  //   });
  // }
  projeto() {
    this.router.navigate(['/projeto-usuario']);
  }
  selecionarDisciplina(idDisciplina: number, NomeDisciplina: string){
    this.idDisciplina = idDisciplina;
    sessionStorage.setItem('idDisciplina', idDisciplina.toString());
    sessionStorage.setItem('NomeDisciplina', NomeDisciplina);
    //this.breadcrumbService.set('@projeto-usuario',NomeProjeto);
    this.router.navigate([`/etapa`]).then(() => {
      window.location.reload();
    });
  }
}
