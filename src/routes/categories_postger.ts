import { Router, Request, Response } from "express";
import { Pool } from "pg";
import { ICategory } from "../types/category";
// import pool from "../utils/db";
const router = Router();

const pool = new Pool({
    connectionString: "postgresql://neondb_owner:npg_z9RybopZV1Cf@ep-weathered-bush-a59yf7oa-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require",
    ssl: {
        rejectUnauthorized: false // برای اتصال SSL
    }
});

//Get all categories
router.get('/', async (req: Request, res: Response) => {
    try {
        const result = await pool.query<ICategory>("SELECT * FROM category_table");
        const categories: ICategory[] = result.rows; // ✅ Correct way to extract rows

        // const [categories] =await pool.query<ICategory[]>('SELECT * FROM category_table');
          res.json(categories);
    } catch (err: any) {
        console.log(err)
        res.status(500).send('failed to fetching data in routes/categories.ts')
    }
})

router.post('/', async (req: Request, res: Response) => {
    try {
        // console.log(req.body)
console.log("cat name is : "+req.body.cat_name)
        await pool.query('INSERT INTO category_table (cat_name, createdAt) VALUES ($1, NOW());', [req.body.cat_name]);
        res.json('category added')

    } catch (err: any) {
        console.log(err)
        res.status(500).send('failed to sending data in routes/categories.ts')
    }
})



export default router;