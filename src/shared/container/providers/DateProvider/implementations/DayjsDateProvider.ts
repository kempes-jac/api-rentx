import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';



import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";


class DayjsDateProvider implements IDateProvider{

  constructor(){
    dayjs.extend(utc);
    dayjs.utc();
    dayjs.extend(timezone);
    dayjs.locale('pt-br');
    dayjs.tz.setDefault('America/Maceio');
  }


  async compareIsBefore(start_date: Date, end_date: Date): Promise<boolean> {
    return dayjs(start_date).isBefore(end_date);
  }
  

  async addDays(days: number): Promise<Date> {
    return dayjs().add(days,"days").toDate();
  }

  async date(): Promise<Date> {
    return new Date(dayjs().toDate().toDateString());
  }
  async compareInDays(startDate: Date, endDate: Date): Promise<number> {
    const startDateFormatted = await this.convertToUTC(startDate);
    const endDateFormatted = await this.convertToUTC(endDate);
    return dayjs( startDateFormatted ).diff( endDateFormatted ,"days");
  }

  async convertToUTC(date: Date): Promise<string> {
    return dayjs(date).utc().local().format();
  }
  
  async compareInHours(start_date: Date, end_date: Date): Promise<number> {
    const startDateFormatted = await this.convertToUTC(start_date);
    const endDateFormatted = await this.convertToUTC(end_date);
    return dayjs( startDateFormatted ).diff( endDateFormatted ,"hour");
  }

  async addHours(hours: number): Promise<Date> {
    return dayjs().add(hours,"hours").toDate();
  }

}

export { DayjsDateProvider }