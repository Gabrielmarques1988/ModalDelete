import { Component, Input, OnInit, input } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-modal-editar-projeto',
  standalone: true,
  imports: [],
  templateUrl: './modal-editar-projeto.component.html',
  styleUrl: './modal-editar-projeto.component.css'
})
export class ModalEditarProjetoComponent implements OnInit {
  //@Input() membro!: any;

  ngOnInit(): void {
    initFlowbite();

  }
}
