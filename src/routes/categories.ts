import { Router, Request, Response } from "express";
import connectDB from '../utils/myDb'
const router = Router();

//Get all categories
router.get('/', async (req: Request, res: Response) => {
    try {
        const db = await connectDB()
        const [categories] =await db.query('SELECT * FROM category_table;');
         res.json(categories);
    } catch (err: any) {
        console.log(err)
        res.status(500).send('failed to fetching data in routes/categories.ts')
    }
})

router.post('/',async(req: Request, res: Response) => {
    try {
        // console.log(req.body)
        const db = await connectDB()
         await db.query('INSERT INTO category_table (cat_name,createdAt) values(?,now(1));',[req.body.cat_name]);
        res.json('category added')
       
    } catch (err: any) {
        console.log(err)
        res.status(500).send('failed to sending data in routes/categories.ts')
    }
})



export default router;