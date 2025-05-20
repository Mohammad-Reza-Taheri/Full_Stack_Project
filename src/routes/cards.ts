import { Router, Request, Response } from "express";
// import { ICard } from "../types/card";
import connectDB from '../utils/myDb'

const router = Router();

//Get all cards
// router.get('/:category', async (req: Request, res: Response) => {
//     try {
//         // const db = await connectDB()
//         // const  {category} = req.params;

//          console.log('this is params'+ req.params)
//         // console.log(category)
//         // const [cards] = await db.query('SELECT title,description FROM card_table WHERE card_category_id =?',[category]);
//         // res.json(cards);

// res.send('it works')
//         // const [cards] = await db.query('SELECT * FROM cards_table WHERE category = ?', [category]);
//         // res.json(cards);

//     } catch (err: any) {
//         console.log(err)
//         res.status(500).send('failed to sending data in routes/cards.ts')
//     }
// })

router.get('/:category/cards', async (req: Request, res: Response) => {
    try {
        // const { category } = req.params; // Extract category from URL
        const category = req.params.category;
        console.log('Received Category:', String(category)); // Debugging
        // if (!category) {
        //     return res.status(400).json({ message: "Category is required" });
        // }
        const db = await connectDB();
        const [cards] = await db.query('SELECT * FROM card_table WHERE card_category_id = ?', [category]);
        // const {cards} = await pool.query('SELECT * FROM card_table WHERE card_category_id = ?', [category]);
        res.json(cards);
    } catch (err: any) {
        console.log(err);
        res.status(500).send('Failed to fetch cards');
    }
});

router.post('/:category/cards', async (req: Request, res: Response) => {
    try {
        const db = await connectDB()
        await db.query('INSERT INTO night_review_category_table (card_count, createAt) SELECT 0, CURRENT_DATE WHERE NOT EXISTS (SELECT 1 FROM night_review_category_table WHERE createAt = CURRENT_DATE);');
        await db.query('insert into card_table (title,description,createdAt,card_category_id,night_review_category_id) values(?,?,now(1),?,(select night_review_cat_id from night_review_category_table where createAt = CURRENT_DATE));', [req.body.title,req.body.description ,req.params.category]);
        await db.query('SET @night_cat_id =(SELECT night_review_cat_id FROM night_review_category_table WHERE createAt = CURRENT_DATE); ')
        await db.query('UPDATE night_review_category_table  SET card_count = card_count + 1 WHERE night_review_cat_id =@night_cat_id; ')



        //   const [night_cat_id] = await db.query('SELECT night_review_cat_id FROM night_review_category_table WHERE createAt = CURRENT_DATE');
        //   console.log("this is rows",night_cat_id[0].night_review_cat_id);
        //   await db.query('UPDATE night_review_category_table SET card_count = card_count + 1 WHERE night_review_cat_id = ?', [night_cat_id]);

        // if (rows.length > 0) {
        //     await db.query('UPDATE night_review_category_table SET card_count = card_count + 1 WHERE night_review_cat_id = ?', [rows[0].night_review_cat_id]);
        // }

        // await db.query('INSERT INTO card_table (title,description,,createdAt,card_category_id,night_review_category_id) VALUES(?,?,now(1),?,?)',[]);
        res.status(200).json("Card Added");
    } catch (err: any) {
        console.log(err)
        res.status(500).send('failed to sending data in routes/cards.ts')
    }
})


//Add a new card
// router.post('/',(req:Request,res:Response)=>{
//   const product:ICard={
//     id:Date.now().toString(),
//     ...req.body
//   }

//   res.status(201).json(product);
// })

//Delete card
// router.delete('/:id',(req:Request,res:any)=>{

//     res.json(card)

// })

export default router;