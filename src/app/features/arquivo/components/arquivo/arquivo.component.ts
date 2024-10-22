import { Component } from '@angular/core';
import { TiposVisualizacaoArquivoComponent } from './../tipos-visualizacao-arquivo/tipos-visualizacao-arquivo.component';
import { ArquivoTagComponent } from '../arquivo-tag/arquivo-tag.component';
import { BarraPesquisaArquivoComponent } from '../barra-pesquisa-arquivo/barra-pesquisa-arquivo.component';
import { BotaoEnviarArquivoComponent } from '../botao-enviar-arquivo/botao-enviar-arquivo.component';
import { TabelaArquivoComponent } from '../tabela-arquivo/tabela-arquivo.component';

@Component({
  selector: 'app-arquivo',
  standalone: true,
  imports: [TiposVisualizacaoArquivoComponent, ArquivoTagComponent, BarraPesquisaArquivoComponent, BotaoEnviarArquivoComponent, TabelaArquivoComponent],
  templateUrl: './arquivo.component.html',
  styleUrl: './arquivo.component.css'
})
export class ArquivoComponent {

}
