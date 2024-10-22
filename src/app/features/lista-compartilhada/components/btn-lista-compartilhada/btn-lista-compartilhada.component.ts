import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ListaCompartilhadaService } from '../../../../shared/services/listaCompartilhada.service';
import { listaCompartilhadaDto } from './../../interfaces/listaCompartilhada.dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-btn-lista-compartilhada',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './btn-lista-compartilhada.component.html',
  styleUrls: ['./btn-lista-compartilhada.component.css']
})

export class BtnListaCompartilhadaComponent {
  modalOpen = false;
  listaForm: FormGroup;
  alertVisible = false;
  alertMessage = '';
  alertType = '';

  @ViewChild('modalTemplate')
  modalTemplate!: TemplateRef<any>;

  constructor(
    private formBuilder: FormBuilder,
    private listaCompartilhadaService: ListaCompartilhadaService
  ) {
    this.listaForm = this.formBuilder.group({
      lista_compartilhada_descricao: ['', Validators.required],
      usuario_id: [null, Validators.required],
      projeto_id: [null, Validators.required]
    });
  }

  openModal() {
    console.log('Abrindo modal');
    this.modalOpen = true;
  }

  closeModal() {
    console.log('Fechando modal');
    this.modalOpen = false;
  }


  submitForm() {
    console.log('Tentando enviar o formulário');
    if (this.listaForm.valid) {
      const listaCompartilhadaData: listaCompartilhadaDto = {
        lista_compartilhada_descricao: this.listaForm.get("lista_compartilhada_descricao")?.value,
        lista_compartilhada_data: new Date(Date.now()),
        lista_compartilhada_status: 1,
        usuario_id: this.listaForm.get("usuario_id")?.value, // Obtenha o valor do campo de usuário
        projeto_id: this.listaForm.get("projeto_id")?.value  // Obtenha o valor do campo de projeto
      };

      console.log('Dados do formulário:', listaCompartilhadaData);
      console.log('Dados a serem enviados para o backend:', listaCompartilhadaData);

      this.listaCompartilhadaService.create(listaCompartilhadaData).subscribe(
        (response) => {
          console.log('Dados enviados com sucesso:', response);
          this.alertMessage = 'Lista compartilhada criada com sucesso!';
          this.alertType = 'success';
          this.alertVisible = true;
          console.log('Alerta visível:', this.alertVisible);
          this.closeModal();
          setTimeout(() => {
            window.location.reload();
          }, 800);
        },
        (error) => {
          console.error('Erro ao enviar dados:', error);
          this.alertMessage = 'Erro ao criar lista compartilhada.';
          this.alertType = 'error';
          this.alertVisible = true;
          console.log('Alerta visível:', this.alertVisible);
          if (error.error) {
            console.error('Detalhes do erro:', error.error);
          }
        }
      );
    } else {
      console.log('Formulário inválido. Por favor, corrija os campos.');
    }
  }

  closeAlert() {
    this.alertVisible = false;
  }
}
