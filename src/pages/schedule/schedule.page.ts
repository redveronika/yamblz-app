import {Component, OnInit} from '@angular/core';
import {AlertController, ModalController, ToastController} from 'ionic-angular';
import { ScheduleService } from "../../services/schedule.service";
import { GET_MONTH_FULL_NAME, GET_DAY_FULL_NAME, GET_DATE_OBJECT, LOCAL_STORAGE } from "../../shared/supporting.function";
import {Calendar} from "@ionic-native/calendar";
import {LectureDetailModal} from "../../modals/lecture-detail/lecture-detail.modal";

declare const cordova:any;

@Component({
  selector: 'schedule.page',
  templateUrl: 'schedule.page.html',
  providers: [ScheduleService, Calendar]
})

export class SchedulePage implements OnInit {

  scheduleData:any = [];
  filterData:any = [];
  selectOptions:any = {};
  teachers: any = [];
  school: any;
  calendarName:string = 'Мобилизация';

  constructor(private modalCtrl: ModalController,
              private scheduleService: ScheduleService,
              private calendar: Calendar,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController) {
    this.scheduleData = this.scheduleService.getScheduleData();
    this.selectOptions = {
      title: 'Выбери школу'
    };
  }

  presentToast(message:string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  showConfirm(title: string, message: string, agreeText:string, callback:any) {
    let confirm = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'Отмена',
          handler: () => {
            return;
          }
        },
        {
          text: agreeText,
          handler: () => {
            callback();
          }
        }
      ]
    });
    confirm.present();
  }

  presentLectureDetail(title:string) {
    let modal = this.modalCtrl.create(LectureDetailModal, {title: title});
    modal.present();
  }

  parseLectureTime() {
    this.scheduleData.forEach((lecture:any) => {
      const time = GET_DATE_OBJECT(lecture.time);
      lecture.date = time.getDate();
      lecture.month = GET_MONTH_FULL_NAME(time.getMonth());
      lecture.dayOfWeek = GET_DAY_FULL_NAME(time.getDay());
      lecture.hours = time.getHours().toString();
      lecture.hours = lecture.hours.length > 1 ? lecture.hours : '0' + lecture.hours;
      lecture.minutes = time.getMinutes().toString();
      lecture.minutes = lecture.minutes.length > 1 ? lecture.minutes : '0' + lecture.minutes;
    });
  }

  filterSchedule() {
    LOCAL_STORAGE.set('filter_schedule_schoolName', this.school)
    if(this.school === 'all') {
      this.filterData = this.scheduleData;
    } else {
      this.filterData = this.scheduleData.filter((lecture:any) => {
        return lecture.schools.indexOf(this.school) > -1;
      });
    }
  }

  addEvent(lecture:any, calendarId:any) {
    return new Promise((resolve, reject) => {
      const startDate:any = GET_DATE_OBJECT(lecture.time);
      const startTime:number = startDate.getTime();
      let endDate:any = startDate;
      const endTime:number = startTime + lecture.duration*60*60000;
      endDate = new Date(endDate.setTime(endTime));
      const calendarOptions:any = cordova.platformId === 'ios' ?
        {calendarName: this.calendarName} :
        {calendarId: JSON.parse(calendarId)};
      this.calendar.createEventWithOptions(lecture.title, lecture.location, 'notes', GET_DATE_OBJECT(lecture.time),
        endDate, calendarOptions).then((res) => {
        resolve(res)
      }, (error:any) => {
        console.error('Error in createEventWithOptions ' + error);
        reject(error)
      });
    });
  }

  createCalendar() {
    this.calendar.createCalendar(this.calendarName).then((calendarId:any) => {
      const addEventRecursive = (index) => {
        if(index < this.filterData.length) {
          this.addEvent(this.filterData[index], calendarId).then((result:any) => {
            addEventRecursive(++index);
          }, error => {
            console.error('Error addEvent ' + error);
          })
        } else {
          this.presentToast('Расписание успешно экспортировано в ваш календарь');
        }
      };
      addEventRecursive(0);
    }, (error:any) => {
      console.error('Error in createCalendar ' + error);
      this.presentToast('Ошибка при создании календаря');
    });
  }

  updateCalendar() {
    this.calendar.deleteCalendar(this.calendarName).then(() => {
      this.createCalendar();
    }, error => {
      console.error('Error deleteCalendar ' + error);
      this.presentToast('Ошибка при создании календаря');
    });
  }

  exportToCalendar() {
    this.calendar.listCalendars().then((calendars:any) => {
      for (let calendar of calendars) {
        if(calendar.name === this.calendarName) {
          this.showConfirm('Обновить календарь?', 'Календарь с таким именем уже существует, хотите обновить его?', 'Обновить', this.updateCalendar.bind(this))
          return;
        }
      }

      this.createCalendar();

    }, (error:any) => {
      console.error('Error in listCalendars ' + error);
      this.presentToast('Ошибка при создании календаря');
    });

  }

  ngOnInit() {
    this.parseLectureTime();
    this.school = LOCAL_STORAGE.get('filter_schedule_schoolName') || LOCAL_STORAGE.get('schoolName') ;
    this.filterSchedule();
  }

}
