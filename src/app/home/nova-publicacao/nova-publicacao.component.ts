import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BD } from 'src/app/bd.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-nova-publicacao',
  templateUrl: './nova-publicacao.component.html',
  styleUrls: ['./nova-publicacao.component.css']
})
export class NovaPublicacaoComponent implements OnInit {

  public email;
  private imagem;

  public formulario: FormGroup = new FormGroup({
    'titulo': new FormControl(null),
  });

  constructor(private bd: BD) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email;
    });
  }

  public publicar(): void {
    if (this.imagem === undefined) {
      alert('Selecione uma imagem para continuar');
    }

    this.bd.publicar({
      email: this.email,
      titulo: this.formulario.value.titulo,
      imagem: this.imagem[0]
    });
  }

  public preparaImagemUpload(event: Event): void {
    this.imagem = (<HTMLInputElement>event.target).files;
  }

}
