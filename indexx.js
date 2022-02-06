const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
// Model 
const Food = require('./schema/Food')
app.use(express.json())
app.use(cors())

// DB Connection
try {
    mongoose.connect('mongodb://localhost/food')
    console.log("connection success!")
} catch(err){
    console.log(err)
}

app.get('/read',async (req,res)=>{
    try{
        const food = await Food.find()
        res.send(food)
    } catch(err) {
        console.log(err)
    }
})

app.post("/insert", async (req,res)=>{
    const {foodName,days} = req.body
    try{
        const food = new Food({foodname:foodName,sinceiate:days})
        await food.save()
        res.send("Data inserter!")
    } catch(err){
        console.log(err)
    }
})

app.delete('/delete', async (req,res)=>{
    try{
        const findbyID = await Food.findById(req.body)
        await findbyID.deleteOne()
        console.log(findbyID)
    } catch(err){
        console.log(err)
    }
})

app.put('/update',async (req,res)=>{
    const {id,foodname} = req.body
    try{
        const findWithId = await Food.findById(id)
        findWithId.foodname = foodname
        await findWithId.save()
        console.log(findWithId)
        res.send("Data Updated!")
    } catch(err){
        console.log(err)
    }
})

app.listen(2000,()=>console.log("Listening 2000"))