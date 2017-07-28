import {Component, OnInit} from '@angular/core';
import {ModalController} from 'ionic-angular';
import {PeopleService} from "../../services/people.service";
import {GET_MONTH_FULL_NAME} from "../../shared/supporting.function";
import {PersonDetailModal} from "../../modals/person-detail/person-detail.modal";

@Component({
  selector: 'partymakers.page',
  templateUrl: 'partymakers.page.html',
  providers: [PeopleService]
})

export class PartymakersPage implements OnInit {
  partymakersData:any = [];
  filterData:any = [];
  searchBarModel: any = '';

  constructor(private modalCtrl: ModalController,
              private peopleService: PeopleService) {
    this.partymakersData = this.peopleService.getPartymakersData();
    this.parseBirthday();
  }

  presentPersonDetail(name:string) {
    let modal = this.modalCtrl.create(PersonDetailModal, {name: name});
    modal.present();
  }

  searchPeople() {
    this.filterData = this.partymakersData.filter((person:any) => {
      return person.name.toLowerCase().indexOf(this.searchBarModel.toLowerCase()) > -1;
    });
  }

  parseBirthday() {
    this.partymakersData.forEach((person:any) => {
      if(person.birthday !== null) {
        const birthdaySplit:any = person.birthday.split('-');
        person.birthDate = birthdaySplit[1];
        person.birthMonth = birthdaySplit[0];
        person.birthMonthName = GET_MONTH_FULL_NAME(birthdaySplit[0] - 1);
      }
    });
  }

  sortPeople() {
    this.filterData = this.partymakersData;
    this.filterData.sort((a,b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });
  }

  ngOnInit() {
    this.sortPeople();
  }

}
