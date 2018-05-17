import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import { ItemModel } from '../../models/item/item.model';
// import * as $ from 'jquery';
import {EventListProvider} from "../../providers/event-list/event-list";

/**
 * Generated class for the AddNewEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-new-event',
  templateUrl: 'add-new-event.html',
})
export class AddNewEventPage {

  item: ItemModel = {
    title: '',
    description: '',
    period: '',
    date: '',
    theme: '',
    difficulty: ''
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              private EventListService: EventListProvider,
              public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddNewEventPage');
  }

  addItem (item: ItemModel) {
    const loading = this.loadingCtrl.create({
      duration: 500
    });
    this.EventListService.addItem(item).then(ref => {
      this.navCtrl.setRoot('DashboardPage', {key: ref.key})
    });

    loading.onDidDismiss(() => {
      const alert = this.alertCtrl.create({
        title: 'PARFAIT',
        subTitle: 'Notre nouvelle tache à bien été ajouté',
        buttons: ['OK']
      });
      alert.present();

    });
    loading.present();

    this.navCtrl.pop();
  }

}
