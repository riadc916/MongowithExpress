const mongoose = require('mongoose');


const chatSchema=new mongoose.Schema({
    from:{
        type:String,
        require:true
    },
    message:{
        type:String,
        maxLength:50
    },
    to:{
        type:String,
        require:true
    },
    create_at:{
        type:Date,
        require:true
    }
})

const Chat=mongoose.model("Chat",chatSchema);

module.exports=Chat;