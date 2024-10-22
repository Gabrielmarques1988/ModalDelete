import { ProjetoService } from './../../../../shared/services/projeto.service';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { initFlowbite } from 'flowbite';
import { ProjetoComponent } from '../../../projeto/components/projeto/projeto.component';

@Component({
  selector: 'app-modal-criar-projeto',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './modal-criar-projeto.component.html',
  styleUrl: './modal-criar-projeto.component.css'
})
export class ModalCriarProjetoComponent implements OnInit,OnDestroy{
modal: any = {};
@ViewChild('crudModal') crudModal!: ElementRef;


private readonly destroy$: Subject<void> = new Subject();
private projetoService = inject(ProjetoService);


ngOnInit(): void {
  initFlowbite()
}
ngOnDestroy(): void {
  this.destroy$.next();
  this.destroy$.complete();
}


cadastroProjeto(){
  const idEmpresa = sessionStorage.getItem('idEmpresa');
  if ('idEmpresa') {
    this.modal.empresa_id = Number(idEmpresa);
  }
  this.projetoService.create(this.modal).pipe(takeUntil(this.destroy$)).subscribe({
    next: _ =>{
      window.location.reload();
      this.closeModal();
    }
  })
}
closeModal() {
  const modalElement = this.crudModal.nativeElement;
  modalElement.classList.add('hidden');
}
limpaForm(){
  this.modal.reset()
}
}
