import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Auth } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>();

  constructor(private auth: Auth) { }

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(),
    'senha': new FormControl(),
  });

  ngOnInit(): void {
  }

  public exibirPainelCadastro(): void {
    this.exibirPainel.emit('cadastro');
  }

  public autenticar(): void {
    this.auth.autenticar(
      this.formulario.value.email,
      this.formulario.value.senha
    );
  }

}
