

interface IDateProvider {
  compareInHours(start_date: Date, end_date: Date): Promise<number>;
  convertToUTC(date: Date): Promise<string>;
  compareInDays(startDate: Date, endDate: Date ): Promise<number>;
  date(): Promise<Date>;
  addDays(days: number): Promise<Date>;
  addHours(hours: number): Promise<Date>;
  compareIsBefore(start_date: Date, end_date: Date): Promise<boolean>;
}

export { IDateProvider }