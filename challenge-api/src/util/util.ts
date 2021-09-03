

export class Util{

    public static addDaysDate(date:Date, days: number):Date{
        date.setDate(date.getDate() + days)

        return date
    }
}