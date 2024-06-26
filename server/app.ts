import express, {Application} from 'express'
import routerPlaces from './routes/restaurant.routes'
import routerSecurity from './routes/security.routes'
import morgan from 'morgan'
import cors from 'cors'
import routerPreferences from "./routes/preferences.routes";

class App {
    public app: Application

    constructor() {
        this.app = express()
        this.config()
        this.routes()
    }

    private config(): void {
        const whitelist = ['http://localhost:4200', 'http://localhost:3000']

        const corsOptions = {
            origin: function (origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void) {
                if (whitelist.includes(origin as string) || (origin == null)) {
                    callback(null, true)
                } else {
                    callback(new Error('Not allowed by CORS'), false)
                }
            }
        }

        this.app.use(express.json())
        this.app.use(cors(corsOptions))
        this.app.use(morgan('dev'))
        //this.app.use(express.static(process.cwd()+"/client/dist/client"))
        this.app.use(express.urlencoded({extended: false}))
    }

    private routes(): void {
        this.app.use('/api', routerPlaces)
        this.app.use(routerPreferences)
        this.app.use(routerSecurity)
    }
}

export default new App().app
