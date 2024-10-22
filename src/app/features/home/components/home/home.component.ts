import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { SidemenuComponent } from '../../../../shared/components/sidemenu/sidemenu.component';
import { UsuarioService } from '../../../../shared/services/usuario.service';
import { Usuario } from '../../../../core/models/usuario';
import { EmpresaComponent } from "../../../empresa/components/empresa/empresa.component";
import { TabelaListaCompartilhadaComponent } from '../../../lista-compartilhada/components/tabela-lista-compartilhada/tabela-lista-compartilhada.component';
import { listaCompartilhadaDto } from '../../../lista-compartilhada/interfaces/listaCompartilhada.dto';
import { RouterOutlet } from '@angular/router';
import { PesquisaComponent } from '../../../../shared/components/pesquisa/pesquisa.component';
import { BreadcrumbComponent, BreadcrumbItemDirective } from 'xng-breadcrumb';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BreadcrumbComponent, BreadcrumbItemDirective,
    PesquisaComponent,
    RouterOutlet,
    NavbarComponent,
    SidemenuComponent,
    EmpresaComponent,
    TabelaListaCompartilhadaComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  usuario: Usuario | null | undefined;

  constructor (private usuarioService : UsuarioService){
    //comando para obter informação do usuario logado
    this.usuarioService.getUsuarioAutenticado().subscribe({ next: (usuario) => { this.usuario = usuario; } });
  }

  ngOnInit(): void {
    console.log(this.usuario);
  }

}
