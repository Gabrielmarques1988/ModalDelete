import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importação do CommonModule
import { logsService } from '../../../../shared/services/logs.service';
import { Logs } from '../../../../core/models/logs';

@Component({
  selector: 'app-tab-geral',
  standalone: true,
  imports: [CommonModule], // Adicione CommonModule aqui
  templateUrl: './tab-geral.component.html',
  styleUrls: ['./tab-geral.component.css']
})
export class TabGeralComponent implements OnInit {
  logs: Logs[] = [];
  errorMessage: string = '';

  constructor(private logsService: logsService) {}

  ngOnInit() {
    this.getLogs();
  }

  getLogs() {
    this.logsService.getAllLogs().subscribe({
      next: (data: Logs[]) => this.logs = data,
      error: (error) => this.errorMessage = error.message
    });
  }
}
