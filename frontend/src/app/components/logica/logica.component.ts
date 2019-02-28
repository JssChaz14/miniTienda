import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logica',
  templateUrl: './logica.component.html',
  styleUrls: ['./logica.component.scss']
})
export class LogicaComponent implements OnInit {
  title = 'Calcular el área';
  resultado;

  public area = { calcular: null };

  constructor() { }

  ngOnInit() {
  }

  calcular() {
    let num = Number(this.area.calcular);
    let total = 0;
    let limit = ( num + num -1);
    let result = '';
    let cont = 0;

    for ( var i = 1; i <= limit; i++) {
      let sub = 0;
      if ( i <= num ) {
        sub = (i * 2) -1;
      } else {
        cont++;
        sub = limit - ( cont * 2 );
      }

      console.log(sub);
      total += sub;
      result += '+';
    }

    console.log(total);
    console.log(result);

    this.resultado = total;
  }

}
