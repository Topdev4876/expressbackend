const mongoose = require('mongoose')

// const foodSchema = new mongoose.Schema({
//     foodname:{
//         type: String,
//         required: true,
//     },
//     sinceiate: {
//         type:Number,
//         required: true
//     }
// })

// module.exports = mongoose.model("food",foodSchema)

//-----------------------------------------------------------------

const addressSchema = new mongoose.Schema({
    public_code:{
        type: String,
        required: true,
    },
    chk_flg: {
        type:Number,
        required: true
    }
})


module.exports = mongoose.model("address",addressSchema)