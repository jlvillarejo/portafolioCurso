import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';
import { InfoEquipo } from '../interfaces/info-equipo.interface';

@Injectable({
  providedIn: 'root'
})

export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;

  equipo: InfoEquipo[] = [];

  constructor( private http: HttpClient ) { 
    
    this.cargarInfo();
    this.cargarEquipo();

  }
  
  private cargarInfo() {

    this.http.get('assets/data/data-pagina.json')
      .subscribe( (resp: InfoPagina) => {
  
        this.cargada = true;
        this.info = resp;
        //console.log(resp);
  
      });
  }

  private cargarEquipo() {

    this.http.get('https://angular-html-b51e3.firebaseio.com/equipo.json')
      .subscribe( ( resp: InfoEquipo[] ) => {
        this.equipo = resp;
        //console.log(this.equipo);
      })

  }

}
