import { Usuario } from './acesso/usuario.model';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class Auth {

    constructor(private router: Router) {}

    public token_id: string;

    public cadastrarUsuario(usuario: Usuario): Promise<any> {
        return firebase.auth().createUserWithEmailAndPassword(
            usuario.email,
            usuario.senha
        ).then((resposta: any) => {

            // Remove do usuário para que não seja inserida no BD
            delete usuario.senha;

            // Registra dados complementares do usuário no path email na base64
            firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
                .set(usuario);
        })
        .catch((error: any) => {
            console.log(error);
        });
    }

    public autenticar(email: string, senha: string): void {
        firebase.auth().signInWithEmailAndPassword(email, senha)
        .then((resposta: any) => {
           firebase.auth().currentUser.getIdToken()
            .then((idToken: string) => {
                this.token_id = idToken;
                localStorage.setItem('idToken', idToken);
                this.router.navigate(['/home']);
            });
        })
        .catch((erro: any) => {
            console.log(erro);
        });
    }

    public autenticado(): boolean {

        if (this.token_id === undefined && localStorage.getItem('idToken') != null) {
            this.token_id = localStorage.getItem('idToken');
        }

        if (this.token_id === undefined) {
            this.router.navigate(['/']);
        }

        return this.token_id !== undefined ? true : false;
    }

    public sair(): void {
        firebase.auth().signOut()
        .then(() => {
            localStorage.removeItem('idToken');
            this.token_id = undefined;
            this.router.navigate(['/']);
        });
    }
}
