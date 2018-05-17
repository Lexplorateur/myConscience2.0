import { Component } from '@angular/core';
import {AlertController, App, LoadingController, IonicPage, NavController} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginForm: any;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public app: App
  ) { }

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

  goToSignup() {
    // this.navCtrl.push(SignupPage);
    this.navCtrl.setRoot('DashboardPage');
  }

  goToResetPassword() {
    // this.navCtrl.push(ResetPasswordPage);
  }
}
