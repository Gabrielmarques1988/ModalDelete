import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Empresa } from '../../../../core/models/empresa';
import { EmpresaService } from '../../../../shared/services/empresa.service';
import { Subject, takeUntil } from 'rxjs';
import { CreateEmpresaRequest } from '../../interfaces/createempresa.request';
import { EmpresaComponent } from '../empresa/empresa.component';

@Component({
  selector: 'app-modal-editar-empresa',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, EmpresaComponent],
  templateUrl: './modal-editar-empresa.component.html',
  styleUrl: './modal-editar-empresa.component.css'
})
export class ModalEditarEmpresaComponent implements OnInit, OnDestroy {

  private readonly destroy$:Subject<void> = new Subject();

  formulario: FormGroup;
  empresa: Empresa | null = null;

  constructor(private empresaService: EmpresaService, private FormBuilder: FormBuilder, private attEmpresas: EmpresaComponent) {
    this.formulario = this.FormBuilder.group({
      empresa_nome: ['', Validators.required],
      empresa_cnpj: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      empresa_status: [ , Validators.required]
    });
  }

  ngOnInit(): void {
    initFlowbite()
    this.empresaService.empresaSelecionadaSubject$.pipe(takeUntil(this.destroy$)).subscribe({
      next:(empresa) => {
        this.empresa = empresa;
        if(this.empresa) {
          this.formulario.patchValue({
            empresa_nome: this.empresa.empresa_nome,
            empresa_cnpj: this.empresa.empresa_cnpj,
            empresa_status: this.empresa.empresa_status
          });
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  limpaForm(){
    this.formulario.reset()
  }

  updateEmpresa(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    let nome = this.formulario.get('empresa_nome')?.value
    let cnpj = this.formulario.get('empresa_cnpj')?.value
    let status = parseInt(this.formulario.get('empresa_status')?.value)

    if (this.formulario.get('empresa_nome') && this.formulario.get('empresa_cnpj') && this.formulario.get('empresa_status')){
      var empresaAtualizada: CreateEmpresaRequest = {empresa_nome: nome, empresa_cnpj: cnpj, empresa_status: status}
      this.empresaService.updateEmpresa(this.empresa?.empresa_id, empresaAtualizada).pipe(takeUntil(this.destroy$)).subscribe({
        next: (response) => {
          console.log('Empresa atualizada com sucesso', response);
          this.attEmpresas.listarEmpresas()
        },
        error: (err) => {
          console.log('Erro ao atualizar a Empresa', err)
        }
      })
    }
    // this.limpaForm();
  }

  deletarEmpresa(): void {
    if (this.empresa?.empresa_id != null) {
      this.empresaService.deleteEmpresa(this.empresa.empresa_id).pipe(takeUntil(this.destroy$)).subscribe({
        next: (response) => {
          console.log("Empresa deletada com sucesso", response);
          this.attEmpresas.listarEmpresas();
        },
        error: (err) => {
          console.error('Erro ao deletar a Empresa', err);
          console.log(this.empresa?.empresa_id)

        }
      });
    } else {
      console.error('ID da empresa não está definido');
    }
  }
}
