import {
    createLogger as createWinstonLogger,
    transports,
    format as winstonFormat
} from 'winston'
import type { Logger } from 'winston'

import { COMBINED_LOGS_FILE_PATH } from '../constants'

export type { Logger } from 'winston'

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

type CreateLoggerParams = {
    tenantId?: string
    [key: string]: any
}
export const createLogger = (metadata: CreateLoggerParams = {}): Logger => {
    const logger = createWinstonLogger({
        level: 'debug',
        format: fileLogsFormat,
        transports: [
            new transports.File({ filename: COMBINED_LOGS_FILE_PATH })
        ],
        exceptionHandlers: [
            new transports.File({ filename: COMBINED_LOGS_FILE_PATH })
        ],
        exitOnError: false,
        defaultMeta: metadata
    })
    if (process.env.NODE_ENV !== 'production') {
        logger.add(new transports.Console({ format: consoleLogsFormat }))
    }

    return logger
}

export const logger = createLogger()
