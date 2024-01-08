import express from 'express'
import { createPool } from 'mysql2/promise'
import { config } from 'dotenv'

config()
const app = express()
// const pool = createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '123456',
//     port: 3307
// })

const pool = createPool({ // se debe cambiar el host porque ya son 2 maquinas distintas
    host: process.env.MYSQLDB_HOST,
    user: 'root',
    password: process.env.MYSQLDB_PASSWORD,
    port: process.env.MYSQLDB_PORT,
})

app.get('/',(req,res) => {
    res.send('Hello World')
})
app.get('/hour', async(req,res) => {
    const result = await pool.query('SELECT NOW()')
    res.json(result[0])
})

app.listen(3000)
console.log("Server on port", 3000)