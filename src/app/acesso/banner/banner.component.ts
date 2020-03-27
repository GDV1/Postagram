import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { Imagem } from './imagem.model';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  animations: [
    trigger('banner', [
      state('escondido', style({
        opacity: 0
      })),
      state('visivel', style({
        opacity: 1
      })),
      transition('escondido <=> visivel', animate('1s ease-in'))
    ])
  ]
})
export class BannerComponent implements OnInit {

  public estado = 'escondido';

  public imagens: Imagem[] = [
    {estado: 'visivel', url: '/assets/banner-acesso/img_1.png'},
    {estado: 'escondido', url: '/assets/banner-acesso/img_2.png'},
    {estado: 'escondido', url: '/assets/banner-acesso/img_3.png'},
    {estado: 'escondido', url: '/assets/banner-acesso/img_4.png'},
    {estado: 'escondido', url: '/assets/banner-acesso/img_5.png'}
  ];

  constructor() { }

  public toggleEstado(): void {
    this.estado = this.estado === 'visivel' ? 'escondido' : 'visivel';
  }

  ngOnInit(): void {
    setTimeout(() => this.logicaRotacao(), 3000);
  }

  public logicaRotacao() {
    // Auxilia na exibição da imagem seguinte
    let idx: number;

    // Oculta uma imagem
    for (let i = 0; i <= 4; i++) {
      if (this.imagens[i].estado === 'visivel') {
        this.imagens[i].estado = 'escondido';

        idx = i === 4 ? 0 : i + 1;

        break;
      }
    }

    // Exibe outra imagem do array
    this.imagens[idx].estado = 'visivel';

    setTimeout(() => this.logicaRotacao(), 3000);
  }
}
