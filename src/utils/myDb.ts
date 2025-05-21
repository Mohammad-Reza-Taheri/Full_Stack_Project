// // const mysql = require('mysql2');
// import mysql from 'mysql2/promise'

// // تنظیمات اتصال
// const connection = mysql.createConnection({
//   host: 'localhost',      // آدرس سرور دیتابیس
//   user: 'root',           // نام کاربری
//   password: '@Hossin2017',   // رمز عبور
//   database: 'my_db'        // نام دیتابیس
// });

// // برقراری اتصال
// connection.connect((err:any) => {
//   if (err) {
//     console.error('خطا در اتصال به دیتابیس:', err.stack);
//     return;
//   }
//   console.log('اتصال به دیتابیس موفقیت‌آمیز بود. ID:', connection.threadId);
// });

// export default connection;

///////////////////////////////////////////

import mysql from 'mysql2/promise';
import 'dotenv/config'

// تنظیمات اتصال
const connectDB = async () => {
    try {
        // const connection = await mysql.createConnection({
        //     host: 'localhost',      // آدرس سرور دیتابیس
        //     user: 'root',           // نام کاربری
        //     password: '@Hossin2017', // رمز عبور
        //     database: 'my_db'       // نام دیتابیس
        // });

        // const connection = await mysql.createConnection({
        //     host:process.env.HOST ,      // آدرس سرور دیتابیس
        //     user: process.env.USER,           // نام کاربری
        //     password: process.env.PASSWORD, // رمز عبور
        //     database: process.env.DATABASE       // نام دیتابیس
        // });

        //with publick key
        //   const connection = await mysql.createConnection({
        //     host:'annapurna.liara.cloud' ,      // آدرس سرور دیتابیس
        //     user: 'root',           // نام کاربری
        //     password: 'fBs7FEyb7gd7eoQOBFMA6FEZ', // رمز عبور
        //     database: 'serene_shaw',       // نام دیتابیس
        //     port:34111
        // });


        //private key
        const connection = await mysql.createConnection({
                host:'db-master' ,      // آدرس سرور دیتابیس
                user: 'root',           // نام کاربری
                password: 'fBs7FEyb7gd7eoQOBFMA6FEZ', // رمز عبور
                database: 'serene_shaw',       // نام دیتابیس
                port:3306
            });


            console.log('successfully connected. ID:', connection.threadId);
            return connection;
        } catch (err) {
            console.error('خطا در اتصال به دیتابیس:', err);
            throw err;
        }
    };

    export default connectDB;