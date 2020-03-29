import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BD } from 'src/app/bd.service';
import * as firebase from 'firebase';
import { Progresso } from 'src/app/progresso.service';
import { Observable } from 'rxjs-compat/Observable';
import 'rxjs-compat/Rx';
import { Subject } from 'rxjs-compat/Rx';

@Component({
  selector: 'app-nova-publicacao',
  templateUrl: './nova-publicacao.component.html',
  styleUrls: ['./nova-publicacao.component.css']
})
export class NovaPublicacaoComponent implements OnInit {

  public email;
  private imagem;

  public progressoPublicacao = 'Pendente';
  public porcentagemUpload;

  public formulario: FormGroup = new FormGroup({
    'titulo': new FormControl(null),
  });

  constructor(
    private bd: BD,
    private progresso: Progresso
  ) { }

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

    let acompanharUpload = Observable.interval(1000);

    let continua = new Subject();
    continua.next(true);

    acompanharUpload
    .takeUntil(continua)
    .subscribe(() => {
      this.progressoPublicacao = 'Andamento';
      this.porcentagemUpload = Math.round((this.progresso.estado.bytesTransferred / this.progresso.estado.totalBytes) * 100);

      if (this.progresso.status === 'Concluido') {
        this.progressoPublicacao = 'Concluido';
        continua.next(false);
      }
    });
  }

  public preparaImagemUpload(event: Event): void {
    this.imagem = (<HTMLInputElement>event.target).files;
  }
}
