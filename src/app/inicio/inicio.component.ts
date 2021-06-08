import { Component, OnInit } from '@angular/core';
import {environment} from './../../environments/environment.prod'
import { Router } from '@angular/router';
import { Postagem } from '../model/Postagem';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';
import { Tema } from '../model/Tema';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  postagem: Postagem = new Postagem()
  listaPostagem : Postagem[]
  tema: Tema =new Tema()
  listaTemas: Tema[]
  idTema:number

  user: User= new User()
  idUser = environment.id

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authService: AuthService
  ) { }

  ngOnInit(){

    if (environment.token == ''){
      alert('Sua secão expirou, faça o login novamente.')
      this.router.navigate(['/entrar'])
    }
    this.getAllTemas()
    this.getAllPostegens()
  }
  getAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[])=>{
      this.listaTemas = resp
    })
  }
  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) =>{
      this.tema = resp
    })
  }
  getAllPostegens(){
    this.postagemService.getAllPostagem().subscribe((resp: Postagem[])=>{
      this.listaPostagem = resp

    })
  }
    findByIdUser(){
       this.authService.getByIdUser(this.idUser).subscribe((resp: User)=>{
         this.user = resp 
       })
    }
  
publicar(){
this.tema.id = this.idTema
this.postagem.tema =this.tema
this.user.id = this.idUser
this.postagem.usuario =this.user
this.postagemService.postPostagem(this.postagem).subscribe((resp:Postagem) =>{
  this.postagem = resp
  alert('Postagem realizada com sucesso!')
  this.postagem = new Postagem() 
  this.getAllPostegens()
})
}

}
