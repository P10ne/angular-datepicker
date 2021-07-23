interface IInitConfig {
  dateFormat: string;
}
interface IPartialConfig {
  allowTime: boolean;
  timeFormat: string;
}
type TConfig = IInitConfig & IPartialConfig;

const defaultDatepickerConfig: IPartialConfig = {
  allowTime: false,
  timeFormat: 'HH:mm:ss'
}

export class DatepickerConfig {
  private _allowTime: boolean;
  private _dateFormat: string;
  private _timeFormat: string;

  public get allowTime(): boolean {
    return this._allowTime;
  }
  public set allowTime(v: boolean) {
    this._allowTime = v;
  }

  public get dateFormat(): string {
    return this._dateFormat;
  }
  public set dateFormat(v: string) {
    this._dateFormat = v;
  }

  public get timeFormat(): string {
    return this._timeFormat;
  }
  public set timeFormat(v: string) {
    this._timeFormat = v;
  }


  constructor(
    config: IInitConfig
  ) {
    const datepickerConfig: TConfig = {
      ...defaultDatepickerConfig,
      ...config
    };
    this._allowTime = datepickerConfig.allowTime;
    this._dateFormat = datepickerConfig.dateFormat;
    this._timeFormat = datepickerConfig.timeFormat;
  }
}
