import {Component, OnInit} from '@angular/core';
import {AlertController, ModalController} from 'ionic-angular';
import {GET_DATE_OBJECT, GET_MONTH_FULL_NAME, LOCAL_STORAGE} from "../../shared/supporting.function";
import {PeopleService} from "../../services/people.service";
import {ScheduleService} from "../../services/schedule.service";
import {PersonDetailModal} from "../../modals/person-detail/person-detail.modal";
import {LectureDetailModal} from "../../modals/lecture-detail/lecture-detail.modal";

@Component({
  selector: 'page-home',
  templateUrl: 'home.page.html',
  providers: [PeopleService, ScheduleService]
})

export class HomePage implements OnInit {

  peopleData:any = [];
  studentsData:any = [];
  birthdayPersons:any = [];
  scheduleData:any = [];
  schoolName:string;
  currentDate:any = {};
  today:any;

  constructor(public alertCtrl: AlertController,
              private peopleService: PeopleService,
              private scheduleService: ScheduleService,
              private modalCtrl: ModalController) {
    this.currentDate = new Date();
  }

  getPeopleData() {
    this.peopleData = this.peopleService.getPeopleData();
  }

  getScheduleData() {
    this.scheduleData = this.scheduleService.getScheduleData();
  }

  getStudentsData() {
    this.studentsData = this.peopleService.getStudentsData();
  }

  showBirthday() {
    this.getPeopleData();
    let currentMonth:string = (this.currentDate.getMonth() + 1).toString().length === 2 ?
        (this.currentDate.getMonth() +1).toString() :
        '0' + (this.currentDate.getMonth() + 1).toString(),
      currentDay:string = (this.currentDate.getDate()).toString().length === 2 ?
        (this.currentDate.getDate()).toString() :
        '0' + (this.currentDate.getDate()).toString();
    const today:string = currentMonth + '-' + currentDay;
    this.birthdayPersons = this.peopleData.filter((person:any) => {
      return person.birthday == today;
    });
  }

  parseLectureTime(lecture:any) {
    const time = GET_DATE_OBJECT(lecture.time);
    lecture.hours = time.getHours().toString();
    lecture.hours = lecture.hours.length > 1 ? lecture.hours : '0' + lecture.hours;
    lecture.minutes = time.getMinutes().toString();
    lecture.minutes = lecture.minutes.length > 1 ? lecture.minutes : '0' + lecture.minutes;
  }

  showSchedule() {
    this.getScheduleData();
    this.scheduleData = this.scheduleData.filter((lecture:any) => {
      this.parseLectureTime(lecture);
      return lecture.schools.indexOf(this.schoolName) > -1 &&
        (GET_DATE_OBJECT(lecture.time)).toDateString() === this.currentDate.toDateString();
    });
  }

  getTodayData() {
    this.today = {
      date: this.currentDate.getDate(),
      monthName: GET_MONTH_FULL_NAME(this.currentDate.getMonth())
    }
  }

  showSelectSchoolAlert() {
    const alert = this.alertCtrl.create({
      title: 'Выбери школу',
      message: 'Привет! Укажи свою школу, пожалуйста',
      enableBackdropDismiss: false,
      inputs : [
        {
          type:'radio',
          label:'Разработка интерфейсов',
          value:'shri'
        },
        {
          type:'radio',
          label:'Мобильная разработка',
          value:'shnr'
        },
        {
          type:'radio',
          label:'Менеджмент Яндекса',
          value:'shm'
        },
        {
          type:'radio',
          label:'Мобильный дизайн',
          value:'shmd'
        }

      ],
      buttons : [
        {
          text: "ОК",
          handler: data => {
            this.schoolName = data;
            LOCAL_STORAGE.set('schoolName', data)
            this.showSchedule();
          }
        }
      ]
    });
    alert.present();
  }

  presentPersonDetail(name:string) {
    let modal = this.modalCtrl.create(PersonDetailModal, {name: name});
    modal.present();
  }

  presentLectureDetail(title:string) {
    let modal = this.modalCtrl.create(LectureDetailModal, {title: title});
    modal.present();
  }

  ngOnInit() {

    if(LOCAL_STORAGE.get('schoolName')) {
      this.schoolName = LOCAL_STORAGE.get('schoolName');
      this.showSchedule();
    } else {
      this.showSelectSchoolAlert();
    }
    this.getTodayData();
    this.showBirthday();
  }

}
