import { ListaCompartilhadaService } from './../../../../shared/services/listaCompartilhada.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { listaCompartilhada } from '../../interfaces/listaCompartilhada';
import { initFlowbite } from 'flowbite';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CreateListaCompartilhadaRequest } from '../../interfaces/createListaCompartilhada.request';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-editar-lista-compartilhada',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './modal-editar-lista-compartilhada.component.html',
  styleUrls: ['./modal-editar-lista-compartilhada.component.css']
})
export class ModalEditarListaCompartilhadaComponent implements OnInit, OnDestroy {

  alertVisible = false;
  alertMessage = '';
  alertType = '';

  private readonly destroy$: Subject<void> = new Subject();
  formulario: FormGroup;
  listaCompartilhada: listaCompartilhada | null = null;

  constructor(private ListaCompartilhadaService: ListaCompartilhadaService, private FormBuilder: FormBuilder) {
    this.formulario = this.FormBuilder.group({
      lista_compartilhada_descricao: ['', Validators.required],
      lista_compartilhada_data: ['', Validators.required],
      lista_compartilhada_status: ['', Validators.required],
      usuario_id: ['', Validators.required],
      projeto_id: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    initFlowbite();
    this.ListaCompartilhadaService.listaCompartilhadaSubject$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (listaCompartilhada) => {
          this.listaCompartilhada = listaCompartilhada;
          if (this.listaCompartilhada) {
            this.formulario.patchValue({
              lista_compartilhada_descricao: this.listaCompartilhada.lista_compartilhada_descricao,
              lista_compartilhada_data: this.listaCompartilhada.lista_compartilhada_data,
              lista_compartilhada_status: this.listaCompartilhada.lista_compartilhada_status,
              usuario_id: this.listaCompartilhada.usuario_id,
              projeto_id: this.listaCompartilhada.projeto_id,
            });
          }
        },
        error: (err) => console.error('Erro ao carregar a lista compartilhada', err)
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Atualiza a lista compartilhada
  updateListaCompartilhada(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    let descricao = this.formulario.get('lista_compartilhada_descricao')?.value;
    let data = new Date(this.formulario.get('lista_compartilhada_data')?.value);
    let status = parseInt(this.formulario.get('lista_compartilhada_status')?.value);
    let usuario = parseInt(this.formulario.get('usuario_id')?.value);
    let projeto = parseInt(this.formulario.get('projeto_id')?.value);

    if (this.listaCompartilhada?.lista_compartilhada_id != null) {
      var listaCompartilhadaAtualizada: CreateListaCompartilhadaRequest = {
        lista_compartilhada_descricao: descricao,
        lista_compartilhada_data: data,
        lista_compartilhada_status: status,
        usuario_id: usuario,
        projeto_id: projeto
      };

      this.ListaCompartilhadaService.update(this.listaCompartilhada.lista_compartilhada_id, listaCompartilhadaAtualizada)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            console.log('Lista compartilhada atualizada com sucesso', response);
            this.alertMessage = 'Lista compartilhada atualizada com sucesso!';
            this.alertType = 'success';
            this.alertVisible = true;
            setTimeout(() => {
              window.location.reload();
            }, 800);
            this.closeModal();
          },
          error: (err) => {
            console.error('Erro ao atualizar a lista compartilhada', err);
            this.alertMessage = 'Erro ao atualizar lista compartilhada.';
            this.alertType = 'error';
            this.alertVisible = true;
          }
        });
    } else {
      console.error('ID da lista compartilhada não está definido');
    }
  }

  // Deleta a lista compartilhada
  deletarListaCompartilhada(): void {
    if (this.listaCompartilhada?.lista_compartilhada_id != null) {
      this.ListaCompartilhadaService.remove(this.listaCompartilhada.lista_compartilhada_id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            console.log('Lista compartilhada deletada com sucesso', response);
            this.alertMessage = 'Lista compartilhada deletada com sucesso!';
            this.alertType = 'success';
            this.alertVisible = true;
            const modal = document.getElementById('popup-modal');
            if (modal) {
              modal.classList.add('hidden');
            }
            setTimeout(() => {
              window.location.reload();
            }, 800);
          },
          error: (err) => {
            console.error('Erro ao deletar a lista compartilhada', err);
            this.alertMessage = 'Erro ao deletar lista compartilhada.';
            this.alertType = 'error';
            this.alertVisible = true;
          }
        });
    } else {
      console.error('ID da lista compartilhada não está definido');
    }
  }

  // Fecha o modal
  closeModal(): void {
    const modalElement = document.getElementById('editar-modal');
    if (modalElement) {
      modalElement.classList.add('hidden');
    }
  }

  // Fecha o alerta
  closeAlert(): void {
    this.alertVisible = false;
  }
}
