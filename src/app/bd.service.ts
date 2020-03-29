import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Progresso } from './progresso.service';

@Injectable()
export class BD {

    constructor(private progresso: Progresso) {}

    public publicar(publicacao: any): void {
        console.log(publicacao);

        let nomeImagem = Date.now();

        firebase.storage().ref().child(`imagens/${nomeImagem}`)
        .put(publicacao.imagem)
        .on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot: any) => {
                this.progresso.status = 'andamento';
                this.progresso.estado = snapshot;
            },
            (error) => {
                this.progresso.status = 'erro';
            },
            () => {
                this.progresso.status = 'concluído';
            },
        );

        /*firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
            .push({ titulo: publicacao.titulo, });*/
    }
}