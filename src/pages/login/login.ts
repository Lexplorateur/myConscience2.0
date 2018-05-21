import { Component } from '@angular/core';
import {App, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import { LoginModel } from '../../models/user/login'
import { AngularFireAuth } from 'angularfire2/auth'
import * as $ from "jquery";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {


  user: LoginModel = {
    email: '',
    password: ''
  };

  emailRegister: string;
  passRegister: string;

  constructor(
    public navCtrl: NavController,
    public navParam: NavParams,
    public loadingCtrl: LoadingController,
    public afAuth: AngularFireAuth,
    public app: App
  ) {

  }


  async login(user: LoginModel) {
    let loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Mise en phase...',
      duration: 3000
    });

    try {
      let controle = true;
      this.afAuth.auth
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
        loading.onDidDismiss(() => {
          this.navCtrl.setRoot('DashboardPage');
        });
        loading.present();
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
