const express = require("express");
const app = express(); //express require
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override"); //for use put and delete method 

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true })); //for parse the req.body data for post request
app.use(methodOverride("_method"));

main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err)); ///mongodb  main to aysnc database

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

//index route for show the data in the server
app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
//   console.log(chats);
  res.render("index.ejs", { chats });
});

//new chat route
app.get("/chats/new", (req, res) => {   
  res.render("new.ejs");
});

//create route
app.post("/chats", (req, res) => {
  let { from, message, to } = req.body;
  let newChat = new Chat({
    from: from,
    message: message,
    to: to,
    create_at: new Date(),
  });
  newChat
    .save()
    .then((result) => {
      console.log("chat was saved");
    })
    .catch((err) => {
      console.log("chat is not saved");
    });
  res.redirect("/chats");
});

//Edit the message
app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", { chat });
});

//update message
app.put("/chats/:id", async(req, res) => {
    let { id } = req.params;
    let { message: newmsg } = req.body;
    console.log(newmsg);
    let updatedmsg = await Chat.findByIdAndUpdate(
      id,
      { message: newmsg },
      { runValidators: true, new: true }
    );
    console.log(updatedmsg);
    res.redirect("/chats");
  });

  //delete route
  app.delete("/chats/:id",async (req,res)=>{
    let {id}=req.params;
    let deletechat=await Chat.findByIdAndDelete(id);
    console.log(deletechat);
    res.redirect("/chats");
  })
//route server
app.get("/", (req, res) => {
  res.send("root working");
});
app.listen(8080, () => {
  console.log("server is listening on port 8080"); //server on
});
