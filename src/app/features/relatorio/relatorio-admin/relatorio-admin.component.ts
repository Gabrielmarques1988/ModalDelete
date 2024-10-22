import { Component } from '@angular/core';
import {GraficoComponent } from '../components/graficoadmin/graficoadmin.component';
import { CardsadminComponent } from '../components/cardsadmin/cardsadmin.component';

@Component({
  selector: 'app-relatorio-admin',
  standalone: true,
  imports: [GraficoComponent, CardsadminComponent],
  templateUrl: './relatorio-admin.component.html',
  styleUrl: './relatorio-admin.component.css'
})
export class RelatorioAdminComponent {

}
