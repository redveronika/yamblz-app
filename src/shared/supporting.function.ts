export const GET_MONTH_FULL_NAME = (month:number) => {
  const monthNames = ["января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря"];
  return monthNames[month];
};

export const GET_DAY_FULL_NAME = (day:number) => {
  const dayNames = [ "воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"];
  return dayNames[day];
};

export const GET_DATE_OBJECT = (time:string) => {
  let splitTime:any = time.split(/[:\s]/),
    date:any = new Date(splitTime[0]);
    date.setHours(splitTime[1]);
    date.setMinutes(splitTime[2]);
    return date;
};

export const LOCAL_STORAGE = {
  get: (name:string) => {
    const value:any = localStorage.getItem(name);
    if(value) {
      return JSON.parse(value);
    } else {
      return null;
    }
  },

  set: (name:string, value:any) => {
    localStorage.setItem(name, JSON.stringify(value));
    return true;
  }
};

export const GET_SCHOOL_RU = (name:string) => {
  const schools:any = {
    'shri': {
      short: 'ШРИ',
      full: 'Школа разработки интерфесов'
    },
    'shnr': {
      short:'ШМР',
      full: 'Школа мобильной разработки'
    },
    'shmd': {
      short: 'ШМД',
      full: 'Школа мобильного дизайна'
    },
    'shm': {
      short: 'ШМЯ',
      full: 'Школа менеджеров Яндекса'
    }
  };
  return schools[name];
};

export const GET_ROLES_RU = (role:string) => {
  const roles:any = {
    'student': 'студент',
    'manager': 'менеджер',
    'teacher': 'преподаватель',
    'administrator': 'администратор',
    'mentor': 'куратор',
    'junior-mentor': 'младший куратор',
    'boss': 'руководитель',
    'principal': 'организатор'
  };
  return roles[role];
};
