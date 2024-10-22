import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../../../shared/services/usuario.service';
import { CreateUsuarioRequest } from '../../../login/interfaces/createusuario.request';
import { initFlowbite } from 'flowbite'; // Import do Flowbite para inicialização

@Component({
  selector: 'app-criacao-usuario-modal',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './criacao-usuario-modal.component.html',
  styleUrls: ['./criacao-usuario-modal.component.css']  // Estilo adaptado para Flowbite
})
export class CriacaoUsuarioModalComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  usuarioForm!: FormGroup;

  @ViewChild('crudModal') crudModal!: ElementRef;  // Controle do modal via template

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) {
    this.usuarioForm = this.fb.group({
      usuario_nome: ['', Validators.required],
      usuario_email: ['', [Validators.required, Validators.email]],
      usuario_cpf: ['', Validators.required],
      usuario_cnpj: [''],
      usuario_endereco: ['', Validators.required],
      usuario_status: [0, Validators.required],
      usuario_cargo: ['', Validators.required],
      empresa_id: [0, Validators.required],
      usuario_tipo: [0, Validators.required],
    });
  }

  ngOnInit(): void {
    initFlowbite();  // Inicializa os componentes Flowbite
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();  // Evita memory leaks
  }

  limpaForm(): void {
    this.usuarioForm.reset();  // Limpa o formulário
  }

  submitUsuario(): void {
    if (this.usuarioForm.invalid) {
      this.usuarioForm.markAllAsTouched();  // Marca todos os campos como tocados
      return;
    }

    const usuario: CreateUsuarioRequest = {
      usuario_nome: this.usuarioForm.get('usuario_nome')?.value,
      usuario_email: this.usuarioForm.get('usuario_email')?.value,
      usuario_cpf: this.usuarioForm.get('usuario_cpf')?.value,
      usuario_cnpj: this.usuarioForm.get('usuario_cnpj')?.value,
      usuario_endereco: this.usuarioForm.get('usuario_endereco')?.value,
      usuario_status: this.usuarioForm.get('usuario_status')?.value,
      usuario_cargo: this.usuarioForm.get('usuario_cargo')?.value,
      empresa_id: this.usuarioForm.get('empresa_id')?.value,
      usuario_tipo: this.usuarioForm.get('usuario_tipo')?.value,
    };

    this.usuarioService.criarUsuario(usuario)
      .pipe(takeUntil(this.destroy$))  // Limpa a subscrição ao destruir o componente
      .subscribe({
        next: (response) => {
          console.log('Usuário criado com sucesso', response);
          this.closeModal();
        },
        error: (error) => {
          console.error('Erro ao criar usuário', error);
        }
      });

    this.limpaForm();  // Limpa o formulário após o envio
  }

  private closeModal(): void {
    const modalElement = this.crudModal.nativeElement;
    modalElement.classList.add('hidden');  // Esconde o modal ao fechar
  }
}
