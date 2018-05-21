import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth'
import {AngularFireDatabase} from "angularfire2/database";
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

  formRegister: FormGroup;
  userRegister: UserModel = {
    username: '',
    firstname: '',
    lastname: '',
    birthDate: '',
    email: '',
    password: '',
    events: null
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase)
  {
    this.formRegister = this.formBuilder.group({
      'username': ['', [Validators.required, Validators.minLength(1)]],
      'firstname': ['', [Validators.required, Validators.minLength(1)]],
      'lastname': ['', [Validators.required, Validators.minLength(1)]],
      'birthDate': ['', [Validators.required, Validators.minLength(10)]],
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  isValid(field: string) {
    let formField = this.formRegister.get(field);
    return formField.valid || formField.pristine;
  }

  async goToSignup(userRegister: UserModel){

    let loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Mise en phase...',
      duration: 3000
    });

    console.log('submit');

    try {

      let controle = true;
      // Vérification de l'existance du compte et enregistrement en base
      await this.afAuth.auth
        .createUserWithEmailAndPassword(userRegister.email, userRegister.password)
        .catch(function(error) {
          // Traitement des erreur email ici
          let errorCode = error.code;
          let emailRegisterId = document.getElementById('email-register');
          let messEmailInvalid = '<p class="p-error">L\'EMAIL EST INCORRECT</p>';
          let messAccountExist = '<p class="p-error">CE COMPTE EXISTE DEJA</p>';
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
          controle = false;
        });

      if (controle && this.formRegister.valid) {
          loading.onDidDismiss(() => {
            this.afAuth.auth.signInWithEmailAndPassword(userRegister.email, userRegister.password);
            this.afAuth.authState.subscribe(auth => {
              console.log(`${auth.uid}`);
              this.db.list(`profile/${auth.uid}`).push(this.userRegister)
                .then(() =>
                  this.navCtrl.setRoot('DashboardPage', {username: userRegister.username})
                )
            });
        });
        loading.present();
      }
    }
    catch (e) {
      console.error(e)
    }

  }
}
