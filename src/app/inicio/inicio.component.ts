import { Component, OnInit } from '@angular/core';
import {environment} from './../../environments/environment.prod'
import { Router } from '@angular/router';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(){

    if (environment.token == ''){
      alert('Sua secão expirou, faça o login novamente.')
      this.router.navigate(['/entrar'])
    }
  }

}
