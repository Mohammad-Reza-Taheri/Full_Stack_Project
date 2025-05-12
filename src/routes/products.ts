import { Router,Request,Response } from "express";
import {IProduct} from "../types/product"

const router = Router();
let products: IProduct[] = [
    {
        id: '1',
        name: 'book',
        description: 'this is a book',
        price: 29,
    },
]


//Get all products
router.get('/',(req:Request,res:Response)=>{
    res.json(products)
})


//Add a new product
router.post('/',(req:Request,res:Response)=>{
  const product:IProduct={
    id:Date.now().toString(),
    ...req.body
  }
  products.push(product);
  res.status(201).json(product);
})

export default router;
////////////////////////////////////////////////

// import { Router } from 'express';
// import { pool, poolConnect, sql } from '../utils/db';

// const router = Router();

// // Get all products
// router.get('/', async (req, res) => {
//   try {
//     await poolConnect;
//     const result = await pool.request().query('SELECT * FROM Products');
//     res.json(result.recordset);
//   } catch (err) {
//     console.error('SQL error', err);
//     res.status(500).json({ error: 'Database error' });
//   }
// });

// // Add a new product
// router.post('/', async (req, res) => {
//   try {
//     const { name, description, price } = req.body;
    
//     await poolConnect;
//     const result = await pool.request()
//       .input('name', sql.NVarChar, name)
//       .input('description', sql.NVarChar, description)
//       .input('price', sql.Decimal(10, 2), price)
//       .query(`
//         INSERT INTO Products (name, description, price)
//         VALUES (@name, @description, @price);
//         SELECT SCOPE_IDENTITY() AS id;
//       `);

//     const newProduct = {
//       id: result.recordset[0].id,
//       name,
//       description,
//       price,
//     };

//     res.status(201).json(newProduct);
//   } catch (err) {
//     console.error('SQL error', err);
//     res.status(500).json({ error: 'Database error' });
//   }
// });

// export default router;