import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-graficodash',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective],
  templateUrl: './graficodash.component.html',
  styleUrls: ['./graficodash.component.css'],
  providers: [
    provideEcharts(),
  ]
})
export class GraficodashComponent {

  chartOption: EChartsOption = {
    grid: {
      left: '0%',
      right: '0%',
      top: '3%',
      bottom: '0%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'],
      axisLabel: {
      interval: 0
      },
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130, 220, 190, 300, 400, 450],
        type: 'bar',
        itemStyle: {
          borderRadius: [5, 5, 0, 0]},
        showBackground: true,
         barWidth: '30%',
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ],
    color: ['#318CE7']
  }

}
