import {BOT_DATA} from "../bot-data";

export class MainService {
  constructor () {

  }

  getSchools() {
    return BOT_DATA.schools;
  }

  getRoles() {
    return BOT_DATA.roles;
  }

}
