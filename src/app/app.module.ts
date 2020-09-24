import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemperaturaComponent } from './component/temperatura/temperatura.component';
import { TemperaturaService } from './services/temperatura.service';
import { HttpClientModule } from '@angular/common/http';
import { from } from 'rxjs';
import { DatePipe, DecimalPipe } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    TemperaturaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [
    TemperaturaService,
    DatePipe,
    DecimalPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
