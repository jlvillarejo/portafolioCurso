import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoInterface } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: ProductoInterface[] = [];
  productosFiltrados: ProductoInterface[] = [];

  constructor( private http: HttpClient ) {

    this.cargarProductos();

   }

  private cargarProductos() {

    return new Promise( ( resolve, reject ) => {

      this.http.get('https://angular-html-b51e3.firebaseio.com/productos_idx.json')
        .subscribe( (resp: ProductoInterface[]) => {
          this.productos = resp;
          this.cargando = false;
          resolve();
        });

    });

  }

  getProducto( id: string ) {

    return this.http.get(`https://angular-html-b51e3.firebaseio.com/productos/${ id }.json`)

  }

  buscarProducto( termino: string) {

    if ( this.productos.length === 0) {
      // cargar productos
      this.cargarProductos().then( () => {
        // Se ejecuta despues de obtener los productos
        // Aplicar el filtro
        this.filtrarProductos( termino );
      });
    } else {
      // aplicar el filtro
      this.filtrarProductos( termino );     
    }
      
  }

  private filtrarProductos( termino: string) {

    this.productosFiltrados = [];

    // Pasamos a minúscula el termino de búsqueda
    termino = termino.toLocaleLowerCase();

    this.productos.forEach( prod => {
      const categoriaLower = prod.categoria.toLocaleLowerCase();
      const tituloLower = prod.titulo.toLocaleLowerCase();

      if ( categoriaLower.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0 ){
        this.productosFiltrados.push( prod );
      }
    });
  }
}
