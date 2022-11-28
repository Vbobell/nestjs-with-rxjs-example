import { Logger } from '@nestjs/common';
import { MonoTypeOperatorFunction } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface LoggerProps {
  message: string;
  params?: Record<string, unknown>;
}

export interface LoggerMessages {
  initLog: LoggerProps;
  endLog: LoggerProps;
  errorLog: LoggerProps;
}

export function formatLog(loggerTypeProps: LoggerProps) {
  return `${loggerTypeProps.message} ${
    loggerTypeProps.params ? ' | ' + JSON.stringify(loggerTypeProps.params) : ''
  }`;
}

export function loggerOperator<T>(
  logger: Logger,
  loggerMessages: LoggerMessages,
): MonoTypeOperatorFunction<T> {
  return (stream) => {
    logger.log(formatLog(loggerMessages.initLog));

    return stream.pipe(
      tap(() => {
        logger.log(formatLog(loggerMessages.endLog));
      }),
      catchError((error: unknown) => {
        logger.error(formatLog(loggerMessages.errorLog));

        throw error;
      }),
    );
  };
}
