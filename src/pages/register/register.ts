import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth'
import * as $ from 'jquery';

import {UserModel} from "../../models/user/user";

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

  userRegister: UserModel = {
    email: '',
    password: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  async goToSignup(userRegister: UserModel) {
    try {
      let controle = true;
      await this.afAuth.auth
        .createUserWithEmailAndPassword(userRegister.email, userRegister.password)
        .catch(function(error) {
          // Handle Errors here.
          let errorCode = error.code;
          let emailRegisterId = document.getElementById('email-register');
          let messEmailInvalid = '<p class="email-error">L\'EMAIL EST INCORRECT</p>';
          let messAccountExist = '<p class="email-error">CE COMPTE EXISTE DEJA</p>';
          let passRegisterId = document.getElementById('pass-register');
          let messPassInvalid = '<p class="pass-error">6 CARACTERES MINIMUM</p>';
          let borderError = 'border-bottom: 3px solid red';
          if (errorCode === 'auth/email-already-in-use') {
            $('.email-error').remove();
            emailRegisterId.insertAdjacentHTML('afterbegin', messAccountExist);
            emailRegisterId.setAttribute('style', borderError);
          } else {
            $('.email-error').remove();
            emailRegisterId.insertAdjacentHTML('afterbegin', messEmailInvalid);
            emailRegisterId.setAttribute('style', borderError);
          }
          if (errorCode === 'auth/weak-password') {
            $('.pass-error').remove();
            passRegisterId.insertAdjacentHTML('afterbegin', messPassInvalid);
            passRegisterId.setAttribute('style', borderError);
          }
          console.log(error);
          controle = false;
        });
      if (controle) {
        this.navCtrl.setRoot('LoginPage', {emailRegister: userRegister.email, passRegister: userRegister.password});
      }

    }
    catch (e) {
      console.error(e)
    }
  }
}
