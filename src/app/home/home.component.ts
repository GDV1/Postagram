import { Component, OnInit, ViewChild } from '@angular/core';
import { Auth } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('publicacoes') public publicacoes: any;

  constructor(private auth: Auth) { }

  ngOnInit(): void {
  }

  public sair(): void {
    this.auth.sair();
  }

  public atualizarTimeline(): void {
    this.publicacoes.atualizarTimeline();
  }

}
