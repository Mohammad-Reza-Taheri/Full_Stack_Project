import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import productRoutes from './routes/products'
// import cardRoutes from './routes/cards'
// import categoryRoutes from './routes/categories'
import cardRoutes_postger from './routes/cards_postger'
import categoriesRoutes_postger from './routes/categories_postger'
import 'dotenv/config'

// import { ICard } from './types/card'


const app = express();

//the PORT must be declared in .env
const PORT = 5000;

//Middlewares
app.use(cors());
app.use(bodyParser.json());


//Routes
// app.use('/api/categories', categoryRoutes)
app.use('/api/categories', categoriesRoutes_postger)
app.use('/api/products', productRoutes)
app.use('/api/', cardRoutes_postger)

//Error handling
// app.use((err:any,req:Request,res:Response,next:NextFunction)=>{
//     console.log(err.stack)
//     res.status(500).send('something broke!')
// })

app.use((err: any, res: Response) => {
    console.log(err.stack)
    res.status(500).send('something broke!')
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})