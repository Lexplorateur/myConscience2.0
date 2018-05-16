import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemModel } from "../../models/item/item.model";
import {AngularFireDatabase} from "angularfire2/database";

/*
  Generated class for the ItemListProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ItemListProvider {

  private itemListRef = this.db.list<ItemModel>('item-list');
  constructor(private db: AngularFireDatabase) {

  }

  getItemList() {
    return this.itemListRef;
  }

  addItem(item: ItemModel) {
    return this.itemListRef.push(item);
  }
}
