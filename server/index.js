import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import {mongooseConnect} from "./connectDB/connectDB.js"
import router from "./router/router.js"

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use(express.json())
app.use(cookieParser())

mongooseConnect()
app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`listening on port ${PORT}`)
})

app.use('/api', router)
