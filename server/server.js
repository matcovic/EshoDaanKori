import express from 'express'
import { config } from 'dotenv'

config()
const PORT = process.env.PORT || 5000
const app = express()

app.get('/api/products', (req, res)=>{
    console.log("hello sucker")
    res.json({status: "OKAY SUCKER"})
})

app.listen(PORT, (err)=>{
    console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})