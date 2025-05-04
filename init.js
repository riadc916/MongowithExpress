const mongoose = require('mongoose');
const Chat=require("./models/chat.js")








main().then(()=>{
    console.log("connection successful")
})
.catch(err => console.log(err));          ///mongodb  main to aysnc database

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}




let allchats=[
    {
        from:"x",
        message:"hello x,y", 
        to:"y",
        create_at:new Date(),
    },
    {
        from:"p",
        message:"hello p,q",
        to:"q",
        create_at:new Date(),
    },
    {
        from:"s",
        message:"hello s,t", 
        to:"t",
        create_at:new Date(),
    }
]

Chat.insertMany(allchats);





