import {Component, OnInit} from '@angular/core';
import {ScheduleService} from "../../services/schedule.service";
import {ModalController, Platform, ViewController} from "ionic-angular";
import {PersonDetailModal} from "../person-detail/person-detail.modal";

@Component({
  selector: 'lecture-detail.modal',
  templateUrl: 'lecture-detail.modal.html',
  providers: [ScheduleService]
})

export class LectureDetailModal implements OnInit {
  platformName:string;
  params:any;
  lectureData:any = [];

  constructor(private viewCtrl: ViewController,
              private modalCtrl: ModalController,
              private scheduleService: ScheduleService,
              private platform: Platform) {
    this.params = this.viewCtrl.getNavParams().data;
    this.platformName = this.platform.is('ios') ? 'ios' : 'android';
  }

  getLectureData() {
    this.lectureData = this.scheduleService.getCurrentLecture(this.params.title);
  }

  presentPersonDetail(name:string) {
    let modal = this.modalCtrl.create(PersonDetailModal, {name: name});
    modal.present();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }


  ngOnInit() {
    this.getLectureData();
  }
}
