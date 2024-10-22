import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { Etapa } from '../../../../core/models/etapa';
import { Router } from '@angular/router';
import { EtapaService } from '../../../../shared/services/etapa.service';

@Component({
  selector: 'app-etapas',
  standalone: true,
  imports: [],
  templateUrl: './etapas.component.html',
  styleUrl: './etapas.component.css'
})
export class EtapasComponent implements OnInit,OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  DisciplinaNomeselecionada: string = '';
  idDisciplina: string | null = null;
  listaEtapas: Etapa[]=[]
  pageSize: number = 10;
  currentPage: number = 1;
  totalEtapa: number = 0;
  paginatedEtapa: Etapa[] = [];
  private router = inject(Router)
  private etapaService = inject(EtapaService)

  ngOnInit(): void {
    const DisciplinaNome = sessionStorage.getItem('NomeDisciplina');
    const idDisciplina = sessionStorage.getItem('idDisciplina');
    if (DisciplinaNome) {
      this.DisciplinaNomeselecionada = DisciplinaNome;
    }
    if(idDisciplina){
      this.idDisciplina = idDisciplina
    }
    this.listarEtapas(idDisciplina!);
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  listarEtapas(idDisciplina: string): void{
    this.etapaService.GetEtapasdeDisciplina(idDisciplina).subscribe({
      next: (etapas: Etapa[])=>{
        this.listaEtapas = etapas;
         //this.carregarContagemArquivos();
        this.totalEtapa = etapas.length;
        this.updatePaginatedDisciplina()
      }
    })
  }
  updatePaginatedDisciplina(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedEtapa = this.listaEtapas.slice(start, end);
  }
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedDisciplina();
    }
  }
  nextPage(): void {
    if (this.currentPage * this.pageSize < this.totalEtapa) {
      this.currentPage++;
      this.updatePaginatedDisciplina();
    }
  }
  get startItem(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }
  get endItem(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalEtapa);
  }
  disciplina() {
    this.router.navigate(['/disciplina']);
  }
  arquivos(){
    this.router.navigate(['/arquivo'])
  }
}
