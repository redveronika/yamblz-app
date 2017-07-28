import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { AppComponent } from './app.component';
import { HomePage } from '../pages/home/home.page';
import { SchedulePage} from '../pages/schedule/schedule.page';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Calendar } from "@ionic-native/calendar";
import { StudentsPage } from "../pages/students/students.page";
import {LectureDetailModal} from "../modals/lecture-detail/lecture-detail.modal";
import {PersonDetailModal} from "../modals/person-detail/person-detail.modal";
import {PartymakersPage} from "../pages/partymakers/partymakers.page";

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    SchedulePage,
    StudentsPage,
    LectureDetailModal,
    PersonDetailModal,
    PartymakersPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(AppComponent),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AppComponent,
    HomePage,
    SchedulePage,
    StudentsPage,
    LectureDetailModal,
    PersonDetailModal,
    PartymakersPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Calendar,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
