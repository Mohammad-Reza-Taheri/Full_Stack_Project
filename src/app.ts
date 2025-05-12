import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import productRoutes from './routes/products'
import 'dotenv/config'


const app = express();
const PORT=5000;

//Middlewares
app.use(cors());
app.use(bodyParser.json());


//Routes
app.use('/api/products',productRoutes)

//Error handling
// app.use((err:any,req:Request,res:Response,next:NextFunction)=>{
//     console.log(err.stack)
//     res.status(500).send('something broke!')
// })

app.use((err:any,res:Response)=>{
    console.log(err.stack)
    res.status(500).send('something broke!')
})

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})