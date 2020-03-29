import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BD } from 'src/app/bd.service';

@Component({
  selector: 'app-nova-publicacao',
  templateUrl: './nova-publicacao.component.html',
  styleUrls: ['./nova-publicacao.component.css']
})
export class NovaPublicacaoComponent implements OnInit {

  public formulario: FormGroup = new FormGroup({
    'titulo': new FormControl(null),
  });

  constructor(private bd: BD) { }

  ngOnInit(): void {
  }

  public publicar(): void {
    this.bd.publicar();
  }

}
