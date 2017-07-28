import {Component, OnInit} from '@angular/core';
import {Platform, ViewController} from "ionic-angular";
import {PeopleService} from "../../services/people.service";
import {GET_ROLES_RU, GET_SCHOOL_RU} from "../../shared/supporting.function";

@Component({
  selector: 'person-detail.modal',
  templateUrl: 'person-detail.modal.html',
  providers: [PeopleService]
})

export class PersonDetailModal implements OnInit {
  platformName:string;
  params:any;
  personData:any;
  noPersonData:boolean = false;

  constructor(private viewCtrl: ViewController,
              private peopleService: PeopleService,
              private platform: Platform) {
    this.params = this.viewCtrl.getNavParams().data;
    this.platformName = this.platform.is('ios') ? 'ios' : 'android';
  }

  getPersonData() {
    this.personData = this.peopleService.getCurrentPerson(this.params.name);
  }

  setPersonData() {
    this.personData.schools_RU = [];
    this.personData.schools.forEach((school:string) => {
      this.personData.schools_RU.push(GET_SCHOOL_RU(school));
    });

    this.personData.roles_RU = [];
    this.personData.roles.forEach((role:string) => {
      this.personData.roles_RU.push(GET_ROLES_RU(role));
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }


  ngOnInit() {
    this.getPersonData();
    if(this.personData !== null) {
      this.setPersonData();
    } else {
      this.noPersonData = true;
    }
  }
}
