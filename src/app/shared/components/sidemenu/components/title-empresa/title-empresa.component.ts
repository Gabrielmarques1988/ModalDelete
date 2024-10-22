import { Component, inject, Input, OnInit } from '@angular/core';
import { EmpresaService } from '../../../../services/empresa.service';
import { Empresa } from '../../../../../core/models/empresa';

@Component({
  selector: 'app-title-empresa',
  standalone: true,
  imports: [],
  templateUrl: './title-empresa.component.html',
  styleUrl: './title-empresa.component.css'
})
export class TitleEmpresaComponent implements OnInit {
  @Input() usuario!: any;
  private empresaService = inject(EmpresaService)
  empresas!: Empresa;
  empresaNomeselecionada: string = '';
  ngOnInit(): void {

    this.getEmpresaAll(this.usuario.empresa_i)
  }

  getEmpresaAll(idEmpresa: number){
    this.empresaService.GetEmpresaByIdAllData(this.usuario.usuario_empresa_id).subscribe({
     next: (response) => {
       this.empresas = response;
       this.empresaNomeselecionada = this.empresas.empresa_nome


     }
   })
  }
}
