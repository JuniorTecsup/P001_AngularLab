import { Component } from '@angular/core';
import { ProductosService } from './services/productos.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular10';
  lista = null
  prod: any = {
    _id: null,
    descripcion: null,
    precio: null
  }

  constructor(private service: ProductosService) { }

  ngOnInit(): void {
    this.recuperarTodos()
  }

  recuperarTodos() {
    this.service.listar().subscribe((data) => {
      this.lista = data
    })
  }

  nuevo() {
    this.service.nuevo(this.prod).subscribe(result => {
      if (result == 'ok') {
        this.limpiar();
        this.recuperarTodos();
      }
    });
  }

  eliminar(codigo) {
    if (!confirm("Esta seguro que desea eliminar este registro?"))
      return;
    this.service.eliminar(codigo).subscribe(result => {
      this.recuperarTodos();
    });
  }

  actualizar() {
    this.service.actualizar(this.prod).subscribe(result => {
      this.limpiar();
      this.recuperarTodos();
    });
  }

  mostrar(codigo) {
    this.service.mostrar(codigo).subscribe(result => {
      this.prod = result
    });
  }

  hayRegistros() {
    return true;
  }

  limpiar() {
    this.prod = {
      _id: null,
      descripcion: null,
      precio: null
    };
  }

}