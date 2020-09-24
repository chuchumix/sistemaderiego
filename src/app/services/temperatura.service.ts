import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class TemperaturaService {

    constructor(private http: HttpClient){
        console.log("Service ready");
    }

    getQuery(query: String){
        const url = `http://34.204.78.208:3000/${ query }`;
        return this.http.get(url);
    }
    /* Consulta de los últimos 10 valores capturados */
    getUltimos():Observable<any>{
        return this.getQuery("ultimos");
    }
    /* Consulta entre dos fechas */
    getFechas(date1: any, date2: any):Observable<any>{
        return this.getQuery(`fechas/${ date1 }/${ date2 }`)
    }
    /* Maximo entre dos fechas */
    getMax(date1: any, date2: any){
        return this.getQuery(`fechas/maximo/${ date1 }/${ date2 }`)
    }
    /* Minimo entre dos fechas */
    getMin(date1: any, date2: any){
        return this.getQuery(`fechas/minimo/${ date1 }/${ date2 }`)
    }
    /* Promedio entre dos fechas */
    getProm(date1: any, date2: any){
        return this.getQuery(`fechas/promedio/${ date1 }/${ date2 }`)
    }
    /* Consulta un rango de tiempo de una fecha específica */
    getTimes(date1: any, time1: any, time2: any):Observable<any>{
        return this.getQuery(`${ date1 }/${ time1 }/${ time2 }`)
    }
}