import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { TemperaturaService } from '../../services/temperatura.service';
import * as $ from 'jquery';
import { ChartDataSets } from 'chart.js'
import { DatePipe, DecimalPipe } from '@angular/common';
import { Color, Label } from 'ng2-charts';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
window['$'] = $;
window['jQuery'] = $;

@Component({
  selector: 'app-temperatura',
  templateUrl: './temperatura.component.html',
  styleUrls: ['./temperatura.component.css']
})

export class TemperaturaComponent implements OnInit {
  dataChart: any[] = [];
  dateChart: any[] = [];
  datos: any[] = [];

  /* AQUÍ COMIENZAN LOS SETTINGS PARA LA GRÁFICA */
  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Humedad' },
    { data: [], label: 'Temperatura' },
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions = {
    responsive: true,
    legend: {
      labels: {
        fontColor: '#2870aa',
        fontFamily: 'system-ui',
        fontSize: 20,
      }
    },
    elements:{
      line: {
        borderWidth: 5,
        fill: false,
      },
      point: {
        radius: 5,
        borderWidth: 2,
        hoverRadius: 7,
        hoverBorderWidth: 2,
      }
    },
    tooltips: {
      backgrounColor: '#2870aa',
      titleFontSize: 15
    },
    scales: {
      xAxes: [{
        gridlines:{
          display: false,
        }
      }]
    }
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'blue',
      backgroundColor: 'rgba(66,62,224,0.3)',
    },
    {
      borderColor: 'red',
      backgroundColor: 'rgba(224,66,66,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  /* AQUÍ TERMINAN */

  constructor( private _temperaturaService: TemperaturaService, private datePipe: DatePipe, private decimalPipe: DecimalPipe) {
  }

  ngOnInit(): void {
    
    $('#date1').attr('readonly', true);
    $('#time1').attr('readonly', true);
    $('#date2').attr('readonly', true);
    $('#time2').attr('readonly', true); 
    $('#tablaPromedio').css('display', 'none');
    $('#graf').css('display', 'none');

    $('#valor').change(function(){
      let sel = $('#valor').val();
      if( sel === 'ultimos'){
        $('#date1').attr('readonly', true);
        $('#time1').attr('readonly', true);
        $('#date2').attr('readonly', true);
        $('#time2').attr('readonly', true);
      }
      if( (sel === 'fechas') || (sel === 'maximo') || (sel === 'minimo') || (sel === 'promedio')){
        $('#date1').attr('readonly', false);
        $('#time1').attr('readonly', true);
        $('#date2').attr('readonly', false);
        $('#time2').attr('readonly', true);
      }
      if( sel === 'tiempo'){
        $('#date1').attr('readonly', false);
        $('#time1').attr('readonly', false);
        $('#date2').attr('readonly', true);
        $('#time2').attr('readonly', false);
      }
    });
  } 
  
  /* CON ESTA FUNCIÓN SE IMPRIMEN LOS DATOS EN LA TABLA Y LA GRÁFICA */
  obtener():void{
    let date1 = $('#date1').val();
    let time1 = $('#time1').val();
    let date2 = $('#date2').val();
    let time2 = $('#time2').val();
    let sel = $('#valor').val();
  
    if(sel === 'ultimos'){
      $('#tablaPromedio').css('display', 'none');
      $('#tablaDatos').css('display', 'block');
      this.graficar(sel, date1, date2, time1, time2);
      $('#graf').css('display', 'block');
    }
    if(sel === 'fechas'){
      $('#tablaPromedio').css('display', 'none');
      $('#tablaDatos').css('display', 'block');
      $('#graf').css('display', 'block');
      if( (date1 === '') || (date2 === '')){
        alert('- ¡Datos incompletos! Una o varias fechas están vacías.')
      } else if(Date.parse(date1) > Date.parse(date2)){
        alert('- La segunda fecha no puede ser menor a la primera.')
      } else{
        this.graficar(sel, date1, date2, time1, time2);
      }
    }
    if(sel === 'maximo'){
      $('#tablaPromedio').css('display', 'none');
      $('#tablaDatos').css('display', 'block');
      $('#graf').css('display', 'none');
      if( (date1 === '') || (date2 === '')){
        alert('- ¡Datos incompletos! Una o varias fechas están vacías.')
      } else if(Date.parse(date1) > Date.parse(date2)){
        alert('- La segunda fecha no puede ser menor a la primera.')
      } else{
        this._temperaturaService.getMax(date1, date2)
        .subscribe( (dataHumedad: any) => {
          this.datos = dataHumedad;
        });
      }
    }
    if(sel === 'minimo'){
      $('#tablaPromedio').css('display', 'none');
      $('#tablaDatos').css('display', 'block');
      $('#graf').css('display', 'none');
      if( (date1 === '') || (date2 === '')){
        alert('- ¡Datos incompletos! Una o varias fechas están vacías.')
      } else if(Date.parse(date1) > Date.parse(date2)){
        alert('- La segunda fecha no puede ser menor a la primera.')
      } else{
        this._temperaturaService.getMin(date1, date2)
        .subscribe( (dataHumedad: any) => {
          this.datos = dataHumedad;
        });
      }
    }
    if(sel === 'promedio'){
      $('#tablaPromedio').css('display', 'block');
      $('#tablaDatos').css('display', 'none');
      $('#graf').css('display', 'none');
      if( (date1 === '') || (date2 === '')){
        alert('- ¡Datos incompletos! Una o varias fechas están vacías.')
      } else if(Date.parse(date1) > Date.parse(date2)){
        alert('- La segunda fecha no puede ser menor a la primera.')
      } else{
        this._temperaturaService.getProm(date1, date2)
        .subscribe( (dataHumedad: any) => {
          this.datos = dataHumedad;
        });
      }
    }
    if(sel === 'tiempo'){
      $('#tablaPromedio').css('display', 'none');
      $('#tablaDatos').css('display', 'block');
      $('#graf').css('display', 'block');
      if( (date1 === '') || (time1 === '') || (time2 === '')){
        alert('- ¡Datos incompletos! Una o varias fechas están vacías.')
      } else if(Date.parse(date1) > Date.parse(date2)){
        alert('- La segunda fecha no puede ser menor a la primera.')
      } else{
        this.graficar(sel, date1, date2, time1, time2);
      }
    }
    $('#date1').val('');
    $('#time1').val('');
    $('#date2').val('');
    $('#time2').val('');
  }

  /* CON ESTA FUNCIÓN SE GRAFICA */
  graficar(sel, date1, date2, time1, time2):void{
    if(sel === 'ultimos'){
      this._temperaturaService.getUltimos()
      .subscribe( (dataHumedad: any) => {
        this.datos = dataHumedad;
      });
      forkJoin([
        /* Este es para la temperatura */
        this._temperaturaService.getUltimos().pipe( map( data => data.map(val => (val.temperatura)))),
        /* Este es para la humedad */
        this._temperaturaService.getUltimos().pipe( map( data => data.map(val => val.valor/10.23))),
        /* Este es para las fechas */
        this._temperaturaService.getUltimos()
        .pipe( map( data => data.map(val => this.datePipe.transform(val.fechaHora, 'medium')))),
      ]).subscribe((
        [data0, data1, data2]
      ) => {
        this.lineChartData[0].data= data1;
        this.lineChartData[1].data= data0;
        this.lineChartLabels = data2;
      });
    } else if(sel === 'fechas'){
      this._temperaturaService.getFechas(date1, date2)
      .subscribe( (dataHumedad: any) => {
        this.datos = dataHumedad;
        console.log(dataHumedad);
      });
      forkJoin([
        /* Este es para la temperatura */
        this._temperaturaService.getFechas(date1, date2).pipe( map( data => data.map(val => val.temperatura))),
        /* Este es para la humedad */
        this._temperaturaService.getFechas(date1, date2).pipe( map( data => data.map(val => val.valor/10.23))),
        /* Este es para las fechas */
        this._temperaturaService.getFechas(date1, date2)
        .pipe( map( data => data.map(val => this.datePipe.transform(val.fechaHora, 'medium')))),
      ]).subscribe((
        [data0, data1, data2]
      ) => {
        this.lineChartData[0].data= data1;
        this.lineChartData[1].data= data0;
        this.lineChartLabels = data2;
      });
    } else if(sel === 'tiempo'){
      this._temperaturaService.getTimes(date1, time1, time2)
      .subscribe( (dataHumedad: any) => {
        this.datos = dataHumedad;
        console.log(dataHumedad);
      });
      forkJoin([
        /* Este es para la temperatura */
        this._temperaturaService.getTimes(date1, time1, time2).pipe( map( data => data.map(val => val.valor))),
        /* Este es para la humedad */
        this._temperaturaService.getTimes(date1, time1, time2).pipe( map( data => data.map(val => val.humedad/10.23))),
        /* Este es para las fechas */
        this._temperaturaService.getTimes(date1, time1, time2)
        .pipe( map( data => data.map(val => this.datePipe.transform(val.fechaHora, 'medium')))),
      ]).subscribe((
        [data0, data1, data2]
      ) => {
        this.lineChartData[0].data= data1;
        this.lineChartData[1].data= data0;
        this.lineChartLabels = data2;
      });
    }
  }

}



