import { Router, Request, Response } from "express";


// import pool from '../utils/db'
const router = Router();



// router.get('/:category/cards', async (req: Request, res: Response) => {
//     try {
//         const category = req.params.category;
//         console.log('Received Category:', category);




//         // Ensure database connection is available
//         const [cards] = await pool.query('SELECT * FROM card_table WHERE card_category_id = ?', [category]);

//         res.json(cards);
//     } catch (err: any) {
//         console.error('Database Query Error:', err);
//         res.status(500).send('Failed to fetch cards');
//     }
// });



// export default router;



import { Pool } from "pg";

// const pool = new Pool({
//     // user: "your_user",
//     // host: "your_host",
//     // database: "your_database",
//     // password: "your_password",
//     // port: 5432,
// });

const pool = new Pool({
  connectionString: "postgresql://neondb_owner:npg_z9RybopZV1Cf@ep-weathered-bush-a59yf7oa-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require",
  ssl: {
    rejectUnauthorized: false // برای اتصال SSL
  }
});

router.get('/:category/cards', async (req: Request, res: Response) => {
  try {
    const category = req.params.category;
    // Run the query and type the result correctly
    const { rows } = await pool.query('SELECT * FROM card_table WHERE card_category_id = $1', [category]);
    // const { rows } = await pool.query('SELECT * FROM users');

    res.json(rows);
  } catch (err: any) {
    console.error('Database Query Error:', err);
    res.status(500).send('Failed to fetch cards');
  }
});

router.post('/:category/cards', async (req: Request, res: Response) => {
  try {

    // await pool.query('INSERT INTO night_review_category_table (card_count, createAt) SELECT 0, CURRENT_DATE WHERE NOT EXISTS (SELECT 1 FROM night_review_category_table WHERE createAt = CURRENT_DATE);');
    // await pool.query('insert into card_table (title,description,createdAt,card_category_id,night_review_category_id) values($1,$2,now(1),$3,(select night_review_cat_id from night_review_category_table where createAt = CURRENT_DATE));', [req.body.title, req.body.description, req.params.category]);
    // await pool.query('SET @night_cat_id =(SELECT night_review_cat_id FROM night_review_category_table WHERE createAt = CURRENT_DATE); ')
    // await pool.query('UPDATE night_review_category_table  SET card_count = card_count + 1 WHERE night_review_cat_id =@night_cat_id; ')

    await pool.query(`
    INSERT INTO night_review_category_table (card_count, createAt) 
    SELECT 0, CURRENT_DATE 
    WHERE NOT EXISTS (
        SELECT 1 FROM night_review_category_table WHERE createAt = CURRENT_DATE
    );
`);

    await pool.query(`
    INSERT INTO card_table (title, description, createdAt, card_category_id, night_review_category_id) 
    VALUES ($1, $2, NOW(), $3, 
        (SELECT night_review_cat_id FROM night_review_category_table WHERE createAt = CURRENT_DATE)
    );
`, [req.body.title, req.body.description, req.params.category]);

    // Declare a variable for tracking night category ID (PostgreSQL doesn't support session variables like MySQL)
    const { rows } = await pool.query(`
    SELECT night_review_cat_id FROM night_review_category_table WHERE createAt = CURRENT_DATE
`);
    const night_cat_id = rows[0]?.night_review_cat_id;

    if (night_cat_id) {
      await pool.query(`
        UPDATE night_review_category_table 
        SET card_count = card_count + 1 
        WHERE night_review_cat_id = $1;
    `, [night_cat_id]);
    }




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



export default router;