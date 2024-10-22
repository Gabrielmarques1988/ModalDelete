import { EmpresaService } from './../../services/empresa.service';
import { Component, OnInit, inject } from '@angular/core';
import { Usuario } from '../../../core/models/usuario';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup} from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Projeto } from '../../../core/models/projeto';
import { Empresa } from '../../../core/models/empresa';
import { ModalCriacaodeempresaComponent } from "./components/modal-criacaodeempresa/modal-criacaodeempresa.component";
import { BuscarempresaComponent } from "./components/buscarempresa/buscarempresa.component";
import { MenuadminComponent } from "./components/menuadmin/menuadmin.component";
import { initFlowbite } from 'flowbite';
import { TitleEmpresaComponent } from './components/title-empresa/title-empresa.component';

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [RouterLinkActive,RouterLink,ModalCriacaodeempresaComponent, BuscarempresaComponent, MenuadminComponent,TitleEmpresaComponent],
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.scss'
})
export class SidemenuComponent implements OnInit {
  private empresaService = inject(EmpresaService)
  private router = inject(Router);
  usuarioAutenticado: Usuario | null = null;
  usuarioAutenticadoSubscription!: Subscription;
  userPayload: any;
  initialCityName = 'Buscar Empresas';
  placeholderText: string = 'Buscar Empresas';
  projetos!: Projeto[];
  empresas!: Empresa;
  formBusca = new FormGroup({empresa_nome: new FormControl(''),});
  ButtonDrop: boolean = false;
  ativebotaoarquivos: Set<number> = new Set<number>();
  ativebotaoetapas: Set<number> = new Set<number>();
  activeButtonIds: Set<number> = new Set<number>();
  idEmpresaSelecionada!: number;
  decodedToken: any;
  expirationDate: Date | undefined;
  isExpired:boolean | undefined;
  helper = new JwtHelperService();
  token: string | null | undefined;
  IdEmpresa: number | undefined;
  empresaSelecionada?: number


  empresaAdmin: boolean = false;
  empresaSelected: boolean = false;

  ngOnInit(): void {
    if(sessionStorage.getItem("jwt")){
      this.token = sessionStorage.getItem("jwt")
      if (this.token)
        this.decodeToken(this.token)
    }
    initFlowbite();
    this.tipodoUsuario();
    const idEmpresa = sessionStorage.getItem('idEmpresa');
    if (idEmpresa) {
      this.IdEmpresa = +idEmpresa;
      this.receberEmpresa(+idEmpresa)
    }

  }
  getEmpresaAll(idEmpresa: number){
    this.empresaService.GetEmpresaByIdAllData(idEmpresa).subscribe({
     next: (response) => {
       this.empresas = response;
       this.empresaSelected = true
     }
   })
  }
  receberEmpresa(idEmpresa: number){
    this.empresaSelecionada = idEmpresa;
    this.empresaAdmin = true
    this.tipodoUsuario()
   }
  tipodoUsuario(){
    if(this.decodedToken.usuario_tipo == 3){
      this.getEmpresaAll(this.decodedToken.usuario_empresa_id)
      this.empresaSelected = true
    }
    if((this.decodedToken.usuario_tipo == 2 || this.decodedToken.usuario_tipo == 1) && this.empresaAdmin == true){
      this.getEmpresaAll(this.empresaSelecionada!)
      this.empresaSelected = true
    }
  }
  onButtonClickDisciplinas(id: number) {
    if (this.activeButtonIds.has(id)) {
      this.activeButtonIds.delete(id);
    } else {
      this.activeButtonIds.add(id);
    }
  }
  onButtonClickEtapas(id: number) {
    if (this.ativebotaoetapas.has(id)) {
      this.ativebotaoetapas.delete(id);
    } else {
      this.ativebotaoetapas.add(id);
    }
  }
  onButtonClickArquivos(id: number) {
    if (this.ativebotaoarquivos.has(id)) {
      this.ativebotaoarquivos.delete(id);
    } else {
      this.ativebotaoarquivos.add(id);
    }
  }
  isButtonActiveDisciplinas(id: number): boolean {
    return this.activeButtonIds.has(id);
  }
  isButtonActiveEtapas(id: number): boolean {
    return this.ativebotaoetapas.has(id);
  }
  isButtonActiveArquivos(id: number): boolean {
    return this.ativebotaoarquivos.has(id);
  }
  decodeToken(tkn: string): void {
    if(tkn) {
    this.token = tkn;
    this.decodedToken = this.helper.decodeToken(tkn);
    }
  }
  listaCompartilhada() {
    this.router.navigate(['/listaCompartilhada']);
  }
  usuarios() {
    this.router.navigate(['/usuarios']);
  }
  dashboard() {
    this.router.navigate(['/dashboard']);
  }
  empresasrota() {
    this.router.navigate(['/']);
  }
  disciplinas() {
    this.router.navigate(['/disciplinas/:id']);
  }
  etapas() {
    this.router.navigate(['/etapas/:id']);
  }
  arquivos() {
    this.router.navigate(['/arquivos']);
  }

}
