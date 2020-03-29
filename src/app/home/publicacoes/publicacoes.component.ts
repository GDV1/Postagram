import { Component, OnInit } from '@angular/core';
import { BD } from 'src/app/bd.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit {

  constructor(private bd: BD) { }

  public email;

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email;
      this.atualizarTimeline();
    })
  }

  public atualizarTimeline(): void {
    this.bd.consultaPublicacoes(this.email);
  }
}
