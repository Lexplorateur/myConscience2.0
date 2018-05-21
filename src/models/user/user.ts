import {ItemModel} from "../item/item.model";

export interface UserModel {
  key?: string;
  username: string;
  firstname: string;
  lastname: string;
  birthDate: string;
  email: string;
  password: string;
  events: ItemModel;
}
