import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Usuario } from '../usuario.model';
import { Auth } from 'src/app/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>();
  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null),
    'nomeCompleto': new FormControl(null),
    'nomeUsuario': new FormControl(null),
    'senha': new FormControl(null),
  });

  constructor(private auth: Auth) { }

  ngOnInit(): void {
  }

  public exibirPainelLogin(): void {
    this.exibirPainel.emit('login');
  }

  public cadastrarUsuario(): void {
    let usuario: Usuario = new Usuario(
      this.formulario.value.email,
      this.formulario.value.nomeCompleto,
      this.formulario.value.nomeUsuario,
      this.formulario.value.senha,
    );

    this.auth.cadastrarUsuario(usuario);
  }

}
