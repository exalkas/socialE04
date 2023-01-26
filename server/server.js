import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'
import db from './config/db.js'
import cookieParser from 'cookie-parser'
import path from 'path';

dotenv.config()
const app = express()

db()
app.use(cookieParser())
app.use(express.json())
app.use('/users', userRoutes)
app.use('/posts', postRoutes)

const port = process.env.PORT || 4001
app.listen(port, () => console.log('Server is up and running at port', port))

app.use(express.static('client/build'));

if( process.env.NODE_ENV === 'production' ) {

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}