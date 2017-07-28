import {BOT_DATA} from "../bot-data";

export class ScheduleService {
  constructor () {

  }

  getScheduleData() {
    return BOT_DATA.schedule;
  }

  getCurrentLecture(title:string) {
    const lectureData:any = this.getScheduleData().filter((lecture:any) => {
      return lecture.title === title;
    });
    return lectureData.length > 0 ? lectureData[0] : null;
  }

}
