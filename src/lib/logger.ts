export enum LogLevel {
  Silent = 0,
  Error = 1,
  Warn = 2,
  Info = 3,
  Debug = 4,
}

type LogMethod = (...message: any[]) => void;

export interface LoggerSetupOptions {
  verbose?: boolean;
  silent?: boolean;
  logLevel?: number;
  // onMessage?: LogMethod;
}

class Logger {

  public error: LogMethod;
  public warn: LogMethod;
  public info: LogMethod;
  public debug: LogMethod;

  private level: LogLevel;
  // private onMessage?: LogMethod;

  constructor() {
    this.level = LogLevel.Info;

    const logMethod = (level: LogLevel, channel: 'log' | 'error') => {
      return (...message: any[]) => {
        if (this.level >= level) {
          // FIXME: Log to this.onMessage
          console[channel].call(console, ...message);
        }
      };
    };

    this.debug = logMethod(LogLevel.Debug, 'log');
    this.info = logMethod(LogLevel.Info, 'log');
    this.warn = logMethod(LogLevel.Info, 'log');
    this.error = logMethod(LogLevel.Info, 'error');
  }

  public setup({ verbose, silent, logLevel }: LoggerSetupOptions) {
    if ([verbose, silent, logLevel !== undefined]
      .reduce((a, c) => (c ? a + 1 : a), 0) > 1) {
      throw new Error(`Only one of 'verbose', 'silent' or 'logLevel' can be provided`);
    }

    if (verbose) { this.level = LogLevel.Debug; }
    if (silent) { this.level = LogLevel.Silent; }
    if (logLevel !== undefined) { this.level = logLevel; }
  }

}

export default new Logger();
