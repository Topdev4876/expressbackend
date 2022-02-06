const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
// const fs = require('fs');
// const readline = require('readline');
const app = express()
// Model 
const Address = require('./schema/Address')
app.use(express.json())
app.use(cors())

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// DB Connection
try {
    mongoose.connect('mongodb+srv://Admin:kwon4876@cluster0.abgq4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
    console.log("connection success!")
} catch(err){
    console.log(err)
}

app.get('/read',async (req,res)=>{
    try{
        const address = await Address.find();
        res.send(address)
    } catch(err) {
        console.log(err)
    }
})
app.get('/readonebyone',async (req,res)=>{
    try{
        // const address = await Address.find();
        const address = await Address.findOneAndUpdate({chk_flg:'1'}, { chk_flg: '2' });
        res.send(address)
    } catch(err) {
        console.log(err)
    }
})

app.post("/insert", async (req,res)=>{
    const {public_code , chk_flg} = req.body
   for(var i = 0 ; i < public_code.length ; i ++){
    try{
        const address = new Address({public_code:public_code[i] , chk_flg:chk_flg})
        await address.save()
        res.send("Data inserter!")
    } catch(err){
        console.log(err)
    }
   }
})
// app.post("/insert_by_file", async (req,res)=>{
//     const {chk_flg}   = req.body 
//     // async function processLineByLine() {
//         const fileStream = fs.createReadStream('../db/1.txt');
//         const rl = readline.createInterface({
//           input: fileStream,
//           crlfDelay: Infinity
//         });
//         // res.send(rl) ;
//         for await (const line of rl) {
//             console.log(line) ;
//             try{
//                 const address = new Address({public_code:line , chk_flg:chk_flg})
//                 await address.save()
//                 res.send("successfully inserted by txt !")
//             } catch(err){
//                 console.log(err)
//             }
//         }
// })

app.delete('/delete', async (req,res)=>{
    const {pharse_id} = req.body
    try{
        const findbyID = await Address.findById(pharse_id)
        await findbyID.deleteOne()
        res.send("one data deleted by tom!")
    } catch(err){
        console.log(err)
    }
})
app.delete('/delete_all', async (req,res)=>{
    try{
        const result = await Address.deleteMany() 
        res.send("All data deleted by tom!")
    } catch(err){
        console.log(err)
    }
})



app.listen(10001,()=>console.log("Listening 10001"))