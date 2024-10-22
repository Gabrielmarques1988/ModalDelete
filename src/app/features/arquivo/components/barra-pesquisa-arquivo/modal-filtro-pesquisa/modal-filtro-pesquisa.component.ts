import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FiltroService } from '../../../../../shared/services/filtro.service';
import { Dropdown } from 'flowbite';

@Component({
  selector: 'app-modal-filtro-pesquisa',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './modal-filtro-pesquisa.component.html',
  styleUrl: './modal-filtro-pesquisa.component.css'
})
export class ModalFiltroPesquisaComponent implements OnInit{
  formulario: FormGroup;
  currentDropdown: string | null = null;
  selectedOrdenacao: string = 'Última modificação';
  statusSelecionado: number[] = [];
  tiposArquivoSelecionados: string[] = [];
  selectedUltimaModificacao: string = 'Selecione a opção';

  constructor(private fb: FormBuilder, private filtroService: FiltroService) {
    this.formulario = this.fb.group({
      ordenacao: ['Última modificação'],
      status: [''],
      ultimaModificacao: ['']
    });
  }

  tipoArquivo: string[] = ['jpg', 'pdf', 'dwg'];
  statusMap: { [key: string]: number } = {
    'Cancelado': -1,
    'Inativo': 0,
    'Ativo': 1,
    'Aprovado': 2,
    'Finalizado': 3
  };
  ultimaModificacao: string[] = ['Hoje', 'Últimos 7 dias', 'Últimos 30 dias', 'Este ano'];
  itensOrdenar: string[] = ['Última modificação', 'Maior tamanho', 'Menor tamanho', 'A-Z', 'Z-A'];
  statusKeys = Object.keys(this.statusMap);

  getKeyByValue(object: { [key: string]: number }, value: number): string {
    return Object.keys(object).find(key => object[key] === value) || '';
  }

  setOrdenacao(event: Event, item: string) {
    event.preventDefault();
    this.formulario.get('ordenacao')?.setValue(item);
    this.selectedOrdenacao = item;
    this.currentDropdown = null;
  }

  setUltimaModificacao(event: Event, data: string) {
    event.preventDefault();
    this.formulario.get('ultimaModificacao')?.setValue(data);
    this.selectedUltimaModificacao = data;
    this.currentDropdown = null;
  }

  onStatusChange(event: any) {
    const checkbox = event.target;
    const statusValue = this.statusMap[checkbox.value];
    if (checkbox.checked) {
      this.statusSelecionado.push(statusValue);
    } else {
      const index = this.statusSelecionado.indexOf(statusValue);
      if (index > -1) {
        this.statusSelecionado.splice(index, 1);
      }
    }
  }

  onTipoArquivoChange(event: any) {
    const checkbox = event.target;
    if (checkbox.checked) {
      this.tiposArquivoSelecionados.push(checkbox.value);
    } else {
      const index = this.tiposArquivoSelecionados.indexOf(checkbox.value);
      if (index > -1) {
        this.tiposArquivoSelecionados.splice(index, 1);
      }
    }
  }

  toggleDropdown(dropdownId: string) {
    if (this.currentDropdown === dropdownId) {
      this.currentDropdown = null;
    } else {
      this.currentDropdown = dropdownId;
    }
  }

  ngOnInit(): void {
    new Dropdown(document.getElementById('dropdownDefaultButton'));
    new Dropdown(document.getElementById('dropdownDataButton'));
  }

  onSubmit() {
    const criterioOrdenacao = this.formulario.get('ordenacao')?.value;
    this.filtroService.atualizarCriterioOrdenacao(criterioOrdenacao);

    this.filtroService.atualizarStatusSelecionado(this.statusSelecionado);

    const ultimaModificacao = this.formulario.get('ultimaModificacao')?.value;
    this.filtroService.atualizarUltimaModificacao(ultimaModificacao);

    this.filtroService.atualizarTiposArquivoSelecionados(this.tiposArquivoSelecionados);

    this.closeModal();
  }

  closeModal() {
    const modal = document.querySelector('.modal') as HTMLElement;
    if (modal) {
      modal.classList.add('hidden');
    }
  }
}
