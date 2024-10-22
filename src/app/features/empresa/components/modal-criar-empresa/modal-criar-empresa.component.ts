import { EmpresaService } from './../../../../shared/services/empresa.service';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { initFlowbite } from 'flowbite';
import { CreateEmpresaRequest } from '../../interfaces/createempresa.request';
import { EmpresaComponent } from '../empresa/empresa.component';

@Component({
  selector: 'app-modal-criar-empresa',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, EmpresaComponent],
  templateUrl: './modal-criar-empresa.component.html',
  styleUrl: './modal-criar-empresa.component.css'
})
export class ModalCriarEmpresaComponent implements OnInit, OnDestroy{

  private readonly destroy$: Subject<void> = new Subject();
  formulario: FormGroup;

  @ViewChild('crudModal') crudModal!: ElementRef;

  constructor(private empresaService: EmpresaService, private formB: FormBuilder, private attEmpresas: EmpresaComponent) {
    this.formulario = this.formB.group({
      empresa_nome: ['', Validators.required],
      empresa_cnpj: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]]
    })
  }

  ngOnInit(): void {
    initFlowbite()
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  limpaForm(){
    this.formulario.reset()
  }

  submitEmpresa(){
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched(); // Marca todos os campos como tocados para exibir mensagens de erro
      return;
    }
    let nome = this.formulario.get('empresa_nome')?.value
    let cnpj = this.formulario.get('empresa_cnpj')?.value
    // let status = this.formulario.get('empresa_status')?.value
    if (this.formulario.get('empresa_nome') && this.formulario.get('empresa_cnpj')){
      var novaEmpresa: CreateEmpresaRequest={empresa_cnpj: cnpj ,empresa_nome: nome, empresa_status: 1 }
      this.empresaService.create(novaEmpresa).pipe(takeUntil(this.destroy$)).subscribe({
        next: (response) => {
          console.log('Empresa criada com sucesso', response);
          this.attEmpresas.listarEmpresas()
          this.closeModal();
        },
        error: (err) => {
          console.log('Deu merda', err)
        }
      })
    }
    this.limpaForm();
  }

  private closeModal() {
    const modalElement = this.crudModal.nativeElement;
    modalElement.classList.add('hidden');
  }
}
