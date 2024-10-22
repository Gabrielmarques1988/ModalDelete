import { Component } from '@angular/core';
import { GraficoComponent } from '../components/grafico/grafico.component';
import { CardsComponent } from '../components/cards/cards.component';

@Component({
  selector: 'app-relatorio-superadmin',
  standalone: true,
  imports: [GraficoComponent, CardsComponent],
  templateUrl: './relatorio-superadmin.component.html',
  styleUrl: './relatorio-superadmin.component.css'
})
export class RelatorioSuperadminComponent {

}
