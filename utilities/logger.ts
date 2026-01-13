import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
    transports: [
        new transports.Console({
            level: 'info',
            format: format.combine(
                format.colorize({ level: true }),
                format.simple(),
                format.timestamp({
                    format: 'DD-MM-YYYY HH:mm:ss'
                }),
                format.printf( info => `[${info.timestamp}] ${info.level}: ${info.message}`)
            )
        }),
    ],
});
