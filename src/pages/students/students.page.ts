import {Component, OnInit} from '@angular/core';
import {ModalController} from 'ionic-angular';
import {PeopleService} from "../../services/people.service";
import {GET_MONTH_FULL_NAME, LOCAL_STORAGE} from "../../shared/supporting.function";
import {PersonDetailModal} from "../../modals/person-detail/person-detail.modal";

@Component({
  selector: 'students.page',
  templateUrl: 'students.page.html',
  providers: [PeopleService]
})

export class StudentsPage implements OnInit {

  studentsData:any = [];
  filterData:any = [];
  school:string = 'all';
  selectOptions:any = {};

  constructor(private modalCtrl: ModalController,
              private peopleService: PeopleService) {
    this.studentsData = this.peopleService.getStudentsData();
    this.parseBirthday();
    this.selectOptions = {
      title: 'Выбери школу'
    };
  }

  presentPersonDetail(name:string) {
    let modal = this.modalCtrl.create(PersonDetailModal, {name: name});
    modal.present();
  }

  parseBirthday() {
    this.studentsData.forEach((person:any) => {
      if(person.birthday !== null) {
        const birthdaySplit: any = person.birthday.split('-');
        person.birthDate = birthdaySplit[1];
        person.birthMonth = birthdaySplit[0];
        person.birthMonthName = GET_MONTH_FULL_NAME(birthdaySplit[0] - 1);
      }
    });
  }

  filterPeople() {
    LOCAL_STORAGE.set('filter_students_schoolName', this.school)
    if(this.school === 'all') {
      this.filterData = this.studentsData;
    } else {
      this.filterData = this.studentsData.filter((student:any) => {
        return student.schools.indexOf(this.school) > -1;
      });
    }
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
    this.school = LOCAL_STORAGE.get('filter_students_schoolName') || LOCAL_STORAGE.get('schoolName') ;
    this.filterPeople();
  }

}
