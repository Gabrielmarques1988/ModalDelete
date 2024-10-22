import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Notificacao } from '../../../core/models/notificacao';
import { NotificationService } from '../../services/notification.service';
@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit {

  constructor(private notificationService: NotificationService){}

 notificacoes: Notificacao[] = [];

  ngOnInit(): void {
    this.notificationService.getNotificationUserId(5).subscribe((notifica) => {
      this.notificacoes = notifica;
    });
  }



}
