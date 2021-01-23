import { AppContext } from './context'

declare global {
    namespace Express {
        export interface Request extends AppContext {}
        }
}