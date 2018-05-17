import { Component } from '@angular/core';
import {AlertController, App, LoadingController, IonicPage, NavController, NavParams} from 'ionic-angular';
import { UserModel } from '../../models/user/user'

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

  // registerEmail: string = '';
  // registerPassword: string = '';

  constructor(
    public navCtrl: NavController,
    public navParam: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public app: App
  ) {

  }

  login():void {
    const loading = this.loadingCtrl.create({
      duration: 500
    });

    loading.onDidDismiss(() => {
      const alert = this.alertCtrl.create({
        title: 'Invalide',
        subTitle: 'Veuillez rentrer un Pseudo et un mot de passe valide',
        buttons: ['OK']
      });
      alert.present();

      // if (this.user.isValid()) {
      //   this.nav.setRoot(AllEventPage);
      // }
    });
    loading.present();
  }

  goToResetPassword() {
    // this.navCtrl.push(ResetPasswordPage);
  }
}
