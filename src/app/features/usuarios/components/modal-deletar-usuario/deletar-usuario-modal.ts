import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-deletar-usuario-modal',
  templateUrl: './deletar-usuario-modal.component.html',
  styleUrls: ['./Deletar-Usuario-Modal.css']

})
export class DeletarUsuarioModalComponent {
  @Input() isVisible: boolean = false;
  @Output() onDeleteConfirmed = new EventEmitter<void>();
  @Output() onClose = new EventEmitter<void>();

  confirmDelete() {
    this.onDeleteConfirmed.emit();
    this.closeModal();
  }

  closeModal() {
    this.onClose.emit();
  }
}

