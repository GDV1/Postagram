import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Progresso } from './progresso.service';

@Injectable()
export class BD {

    constructor(private progresso: Progresso) { }

    public publicar(publicacao: any): void {

        firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
            .push({ titulo: publicacao.titulo })
            .then((resposta: any) => {
                let nomeImagem = resposta.key;

                firebase.storage().ref().child(`imagens/${nomeImagem}`)
                    .put(publicacao.imagem)
                    .on(firebase.storage.TaskEvent.STATE_CHANGED,
                        (snapshot: any) => {
                            this.progresso.status = 'Andamento';
                            this.progresso.estado = snapshot;
                        },
                        (error) => {
                            this.progresso.status = 'Erro';
                        },
                        () => {
                            this.progresso.status = 'Concluido';
                        },
                    );
            });
    }

    public consultaPublicacoes(emailUser: string): Promise<any> {

        return new Promise((resolve, reject) => {
            firebase.database().ref(`publicacoes/${btoa(emailUser)}`)
                .once('value')
                .then((snapshot: any) => {
                    console.log(snapshot.val());

                    let publicacoes: Array<any> = [];

                    snapshot.forEach((childSnapshot: any) => {

                        let publicacao = childSnapshot.val();

                        firebase.storage().ref().child(`imagens/${childSnapshot.key}`)
                            .getDownloadURL()
                            .then((url: string) => {
                                publicacao.urlImagem = url;
                                firebase.database().ref(`usuario_detalhe/${btoa(emailUser)}`)
                                    .once('value')
                                    .then((snapshot: any) => {
                                        publicacao.nomeUsuario = snapshot.val().nomeUsuario;
                                        publicacoes.push(publicacao);
                                    });
                            });
                    });
                    resolve(publicacoes);
                });

        });


    }
}
