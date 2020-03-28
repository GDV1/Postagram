import { Usuario } from './acesso/usuario.model';
import * as firebase from 'firebase';

export class Auth {

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
                console.log(this.token_id);
            });
        })
        .catch((erro: any) => {
            console.log(erro);
        });
    }
}
