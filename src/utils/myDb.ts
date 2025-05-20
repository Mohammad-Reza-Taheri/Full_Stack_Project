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

// تنظیمات اتصال
const connectDB = async () => {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',      // آدرس سرور دیتابیس
            user: 'root',           // نام کاربری
            password: '@Hossin2017', // رمز عبور
            database: 'my_db'       // نام دیتابیس
        });

        console.log('successfully connected. ID:', connection.threadId);
        return connection;
    } catch (err) {
        console.error('خطا در اتصال به دیتابیس:', err);
        throw err;
    }
};

export default connectDB;