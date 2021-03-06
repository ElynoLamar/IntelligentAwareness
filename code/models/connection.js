const util = require('util')
const mysql = require('mysql')
const pool = mysql.createPool({
    /**
Here below is where you should set your database information
    */
    connectionLimit: 10,
    host: 'remotemysql.com',
    port: 3306,
    user: 'yoP9oIXnRG',
    password: 'COip73bLeK',
    database: 'yoP9oIXnRG'
})


// Ping database to check for common exception errors.
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }

    if (connection) connection.release()

    return
})

// Promisify for Node.js async/await.
pool.query = util.promisify(pool.query)

module.exports = pool