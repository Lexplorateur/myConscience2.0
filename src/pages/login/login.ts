import { Component } from '@angular/core';
import {AlertController, App, LoadingController, IonicPage, NavController, NavParams} from 'ionic-angular';
import { UserModel } from '../../models/user/user'
import { AngularFireAuth } from 'angularfire2/auth'
import * as $ from "jquery";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user: UserModel = {
    email: '',
    password: ''
  };

  emailRegister: string;
  passRegister: string;

  constructor(
    public navCtrl: NavController,
    public navParam: NavParams,
    public afAuth: AngularFireAuth,
    public app: App
  ) {
      this.emailRegister = navParam.get('emailRegister');
      this.passRegister = navParam.get('passRegister');
  }


  async login(user: UserModel):void {
    try {
      let controle = true;
      await this.afAuth.auth
        .signInWithEmailAndPassword(user.email, user.password)
        .catch(function(error) {
          // Handle Errors here.
          let errorCode = error.code;
          let emailLoginId = document.getElementById('email-login');
          let messEmailInvalid = '<p class="email-error">EMAIL OU MOT DE PASSE INVALIDE</p>';
          let borderError = 'border-bottom: 3px solid red';
          if (errorCode === 'auth/invalid-email') {
            $('.email-error').remove();
            emailLoginId.insertAdjacentHTML('afterbegin', messEmailInvalid);
            emailLoginId.setAttribute('style', borderError);
          }
          console.log(error);
          controle = false;
        });
      if (controle) {
        this.navCtrl.setRoot('DashboardPage');
      }

    }
    catch (e) {
      console.error(e)
    }
  }

  goToResetPassword() {
    // this.navCtrl.push(ResetPasswordPage);
  }
}
