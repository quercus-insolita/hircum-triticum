import { createLogger, transports, format as winstonFormat } from 'winston'

import { COMBINED_LOGS_FILE_PATH } from '../constants'

const fileLogsFormat = winstonFormat.combine(
    winstonFormat.timestamp(),
    winstonFormat.simple()
)
const consoleLogsFormat = winstonFormat.combine(
    winstonFormat.colorize({
        level: true,
        colors: {
            error: 'red',
            info: 'green',
            debug: 'purple'
        }
    }),
    winstonFormat.timestamp(),
    winstonFormat.simple()
)

const logger = createLogger({
    level: 'debug',
    format: fileLogsFormat,
    transports: [
        new transports.File({ filename: COMBINED_LOGS_FILE_PATH })
    ]
})
if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({ format: consoleLogsFormat }))
}

export { logger }