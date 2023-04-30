const express = require("express");
const routes = require("./routes");
const handlebars = require("express-handlebars");
const mongoose = require("mongoose");
const cookierParse = require("cookie-parser");
const {authentication} = require('./middlewares/authMiddleware');
const app  = express();

app.engine("hbs",handlebars.engine({
    extname:"hbs"
}));
app.set("view engine","hbs");
app.use('/static',express.static("public"));
app.use(express.urlencoded({extended:false}));
app.use(cookierParse());
app.use(authentication);
app.use(routes);


//TODO change DB name
mongoose.set('strictQuery',false);
mongoose.connect("mongodb://127.0.0.1:27017/petsagram")


app.listen(3000,()=>{
    console.log("Server is running on port 3000...");
});

