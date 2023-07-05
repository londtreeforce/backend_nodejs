import express from 'express';
import authRoutes from './app/auth/auth.routes.js';//Важно . js
import 'colors'
import morgan from 'morgan';
import { prisma } from './app/prisma.js'
import { errorHandler, notFound } from './app/middleware/error.middleware.js';

const app = express();

async function main(){
    if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

    app.use(express.json())
    app.use('/api/auth', authRoutes)


    app.use(notFound)
    app.use(errorHandler)

    const PORT = process.env.PORT || 5000


    app.listen(
        PORT, 
        console.log(`Server listening on ${PORT} .`.magenta .bold) 
    )
}


main().then(async () =>{
    await prisma.$disconnect()
})
.catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
}) 