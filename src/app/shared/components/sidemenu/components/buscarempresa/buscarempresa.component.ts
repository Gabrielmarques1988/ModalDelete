import { Empresa } from './../../../../../core/models/empresa';
import { Component, EventEmitter, Inject, Input, OnInit, Output, inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { EmpresaService } from '../../../../services/empresa.service';
import { initFlowbite } from 'flowbite/lib/esm/components';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-buscarempresa',
  standalone: true,
  imports: [],
  templateUrl: './buscarempresa.component.html',
  styleUrl: './buscarempresa.component.css'
})
export class BuscarempresaComponent implements OnInit{
  @Input() usuario!: any;
  private router = inject(Router)
  private breadcrumbService = inject(BreadcrumbService)
  @Output() empresaSelecionada = new EventEmitter<number>()
  private empresaService = inject(EmpresaService)
  token: string | null | undefined;
  decodedToken: any;
  helper = new JwtHelperService();
  dropMenuBusca = false;
  empresas: Empresa[]=[];
  idEmpresa?: number
  empresaSelecinaButton = false;
  empresaNomeselecionada: string = '';
  empresasRecentes: string[] = [];


  ngOnInit(): void {
    if(sessionStorage.getItem("jwt")){
      this.token = sessionStorage.getItem("jwt")
      if (this.token)
        this.decodeToken(this.token)
    }

    initFlowbite()
    this.getEmpresa()
    const empresaNome = sessionStorage.getItem('empresaNomeselecionada');
    const idEmpresa = sessionStorage.getItem('idEmpresa');
    if (empresaNome) {
      this.empresaNomeselecionada = empresaNome;
      this.empresaSelecinaButton = true;
    }
    if (idEmpresa) {
      this.idEmpresa = +idEmpresa;
    }

    this.empresasRecentes = this.obterEmpresasRecentes();
  }
  abrirDropBuscarEmpresa(){
    const dropdown = document.getElementById('dropdownDelay');
  dropdown?.classList.toggle('hidden');
  }

  getEmpresa(){
    this.empresaService.getEmpresa().subscribe({
      next: (response) =>
         {
        this.empresas = response;
      }
    })
  }
  removerEmpresaSelecionada() {
    this.empresaNomeselecionada = '';
    this.empresaSelecinaButton = false;
    this.idEmpresa = undefined;
    sessionStorage.removeItem('empresaNomeselecionada');
    sessionStorage.removeItem('idEmpresa');
    this.empresaSelecionada.emit(undefined);
    this.router.navigate(['empresa']).then(() => {
      window.location.reload();
    });;

  }

  selecionarEmpresa(idEmpresa: number,nomeEmpresa: string) {
    this.idEmpresa = idEmpresa;
    sessionStorage.setItem('idEmpresa', idEmpresa.toString());
    this.empresaSelecionada.emit(this.idEmpresa);
    this.empresaNomeselecionada = nomeEmpresa;
    this.empresaSelecinaButton = true
    sessionStorage.setItem('empresaNomeselecionada', nomeEmpresa);
    this.adicionarEmpresaRecentementeVisitada(nomeEmpresa);
    this.empresasRecentes = this.obterEmpresasRecentes();
    //this.breadcrumbService.set('@projeto-usuario',nomeEmpresa);
    this.router.navigate([`projeto-usuario`]);
  }


  decodeToken(tkn: string): void {
    if(tkn) {
    this.token = tkn;
    this.decodedToken = this.helper.decodeToken(tkn);
    }
  }
  private adicionarEmpresaRecentementeVisitada(nomeEmpresa: string): void {
    let empresasRecentes = this.obterEmpresasRecentes();
    empresasRecentes = empresasRecentes.filter(e => e !== nomeEmpresa);
    empresasRecentes.unshift(nomeEmpresa);
    if (empresasRecentes.length > 3) {
      empresasRecentes.pop();
    }
    sessionStorage.setItem('empresasRecentes', JSON.stringify(empresasRecentes));
  }
  private obterEmpresasRecentes(): string[] {
    const empresasRecentesString = sessionStorage.getItem('empresasRecentes');
    return empresasRecentesString ? JSON.parse(empresasRecentesString) : [];
  }
}
