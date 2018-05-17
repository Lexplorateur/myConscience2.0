import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { EventListProvider } from "../../providers/event-list/event-list";
import {ItemModel} from "../../models/item/item.model";
import {Observable} from "rxjs/Observable";

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  items: Observable<ItemModel[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private EventListService: EventListProvider) {
    this.items = this.EventListService.getItemList().snapshotChanges().map(snapshots => {
      return snapshots.map(snapshot => ({
          key: snapshot.payload.key,
        ...snapshot.payload.val(),
        }));
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  getColorBorder(theme): string {
    switch (theme) {
      case 'sport':
        return '5px solid yellow';
      case 'job':
        return '5px solid blueviolet';
      case 'leasure':
        return '5px solid coral';
      case 'household':
        return '5px solid darkslateblue';
      case 'health':
        return '5px solid limegreen';
      case 'learning':
        return '5px solid palevioletred';
      case 'altruism':
        return '5px solid dodgerblue';
      case 'other':
        return '5px solid grey';
    }
  }

}
