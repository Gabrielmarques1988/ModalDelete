import { NgClass } from '@angular/common';
import { ProjetoComponent } from '../../../projeto/components/projeto/projeto.component';

import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ModalCriarProjetoComponent } from '../modal-criar-projeto/modal-criar-projeto.component';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-projeto-usuario',
  standalone: true,
  imports: [ProjetoComponent,NgClass,ModalCriarProjetoComponent],
  templateUrl: './projeto-usuario.component.html',
  styleUrl: './projeto-usuario.component.css'
})
export class ProjetoUsuarioComponent implements OnInit {
  tabAtiva: string = 'projetos';
  empresaNomeselecionada: string = '';
  helper = new JwtHelperService();
  token: string | null | undefined;
  decodedToken: any;

  ngOnInit(): void {
    initFlowbite()
    if(sessionStorage.getItem("jwt")){
      this.token = sessionStorage.getItem("jwt")
      if (this.token)
        this.decodeToken(this.token)
    }
    const empresaNome = sessionStorage.getItem('empresaNomeselecionada');
    if (empresaNome) {
      this.empresaNomeselecionada = empresaNome;
    }
  }
  decodeToken(tkn: string): void {
    if(tkn) {
    this.token = tkn;
    this.decodedToken = this.helper.decodeToken(tkn);
    }
  }

}
