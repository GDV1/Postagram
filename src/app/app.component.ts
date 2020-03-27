import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Postagram';

  ngOnInit(): void {
    var firebaseConfig = {
      apiKey: 'AIzaSyBHXUmgqWGYQulRaRdR6HxmLsHyeDHbjXY',
      authDomain: 'postagram-2a4d1.firebaseapp.com',
      databaseURL: 'https://postagram-2a4d1.firebaseio.com',
      projectId: 'postagram-2a4d1',
      storageBucket: 'postagram-2a4d1.appspot.com',
      messagingSenderId: '252459044719',
      appId: '1:252459044719:web:f93f4903ba23d0b19a229a'
    };

    firebase.initializeApp(firebaseConfig);
  }
}
