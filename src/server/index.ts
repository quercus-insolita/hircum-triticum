import { app } from './app'
import { APP_PORT } from './constants'

app.listen(APP_PORT, () => {
    console.log(`Server is listening on ${APP_PORT}`)
})