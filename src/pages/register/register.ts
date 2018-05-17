import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth'

import {UserModel} from "../../models/user/user";
import {first} from "rxjs/operator/first";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user: UserModel = {
    email: '',
    password: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  async goToSignup(user: UserModel) {
    try {
      let controle = true;
      const result = await this.afAuth.auth
        .createUserWithEmailAndPassword(user.email, user.password)
        .catch(function(error) {
          // Handle Errors here.
          let errorCode = error.code;
          let errorMessage = error.message;
          if (errorCode === 'auth/email-already-in-use') {
              document.getElementById('email-register')
                .insertAdjacentHTML('afterbegin', '<p class="p-error">CE COMPTE EXISTE DEJA</p>');
              document.getElementById('email-register')
                .setAttribute('style', 'border-bottom: 3px solid red');
          } else {
            alert(errorMessage);
          }
          console.log(error);
          controle = false;
        });
      if (controle) {
        this.navCtrl.pop({});
      }

    }
    catch (e) {
      console.error(e)
    }
  }
}
