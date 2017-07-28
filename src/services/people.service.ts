import {BOT_DATA} from "../bot-data";

export class PeopleService {
  constructor () {

  }

  getPeopleData() {
    return BOT_DATA.people;
  }

  getStudentsData() {
    return this.getPeopleData().filter((person:any) => {
      return person.roles.indexOf('student') > -1;
    });
  }

  getPartymakersData() {
    return this.getPeopleData().filter((person:any) => {
      return person.roles.indexOf('student') === -1;
    });
  }

  getCurrentPerson(name:string) {
    const personData:any = this.getPeopleData().filter((person:any) => {
      return person.name === name;
    });
    return personData.length > 0 ? personData[0] : null;
  }

}
