//------------------------------------------------
//Title: hw1
//Author: Furkan Erkan
//Description: This project defines REST Api for cloud app
//------------------------------------------------

//Adds mongoose package to connect mongoDB
const mongoose=require('mongoose');
//Adds express package to use CRUD methods in backend
const express=require('express');
const app = express();

//MongoDB connection for localhost
//Left for test purposes
/*
mongoose.connect('mongodb://localhost/computing')
    .then(() => console.log('Connected ...'))
    .catch(err => console.error('Could not', err));
*/

//MongoDB connection for MongoDB Atlas
mongoose.connect(
    'mongodb+srv://furkan:ymzYaEvmdnCifrPF@cluster0.7uyyg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    { useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true},
    (err) => {
        if (err) return console.log("Error: ", err);
        console.log("MongoDB Connection -- Ready state is:", mongoose.connection.readyState);
    }
);


//Declares schema for database
const userSchema = new mongoose.Schema({
    id: {type : Number, required: true},
    name: {type : String, required: true},
    surname: {type : String, required: true},
    email: String,
    age: Number
});
//Initializes User table which based on schema that has already created
const User = mongoose.model('User', userSchema);

//Creates user object by using given parameters
async function createUser(id,name, surname, email, age){
    const user = new User({
        id:id,
        name: name,
        surname: surname,
        email: email,
        age: age
    });
    const result = await user.save();
}
//Creates 3 initial users if there is no user in database
//Mainly used for if every user delete from the database initialize from scracth for testing
async function initFirst(){
    const users = await User
    .find();
    if(users.length===0){
     createUser(1,'Nandor','Relentless','impenetrablefortress@gmail.com',35);
    createUser(2,'Guillermo','De La Cruz','mosquitoHR@yahoo.com',24);
    createUser(3,'Baron','Afanas','brafanas@outlook.com',75);
    }
}
//Calls initFirst function
initFirst();  

//To use req.body and req.params
app.use(express.json());

//Gets all users from database and sends as response
app.get("/api/user", (req,res) => {
    async function getUsers(){
        const users = await User
        .find();
        res.send(users);
    }
    getUsers();
});
//Gets all users with specific from database and sends as response
app.get("/api/user/:id", (req,res) => {
    //Controls if parameter of request is integer or not
    //If it is not then sends HTTP 400 error
    if(isNaN(req.params.id)){
        res.status(400).send(`HTTP 400 -- Bad Request`);
    }else {
        //Controls if there is a user that hasn't already exist sends HTTP 404 error
        async function getSpecific(){
            const users = await User
            .find({id:req.params.id});
            if(users.length===0){
                res.status(404).send(`HTTP 404 -- Not Found`);
            } else
            res.send(users);
            console.log(cap);
        }
        getSpecific();
    }
});
//Adds user by using given parameters
app.post("/api/user", (req,res) => {   
//Controls if there is a user that has already exist sends HTTP 400 error
    async function ctrl(){
        const users = await User
            .find({id:req.body.id});
            if(users.length===0){
                addNew();
            } else
            res.status(400).send(`HTTP 400 -- Bad Request ~Same User in DB`);
    }
    ctrl();
    //Controls if there is a request that has missing parameters sends HTTP 400 error
    //Adds users
    async function addNew(){
        try {
            const users = await createUser(req.body.id,req.body.name,
                req.body.surname,req.body.email,req.body.age);
                res.send(req.body);
        } catch (error) {
            res.status(400).send(`HTTP 400 -- Bad Request ~Missing Parameters`);
        }
        
    }
    
});
//Updates user by using given parameters
app.put("/api/user/:id", (req,res) => {
    //Controls if parameter of request is integer or not
    //If it is not then sends HTTP 400 error
    if(isNaN(req.params.id)){
        res.status(400).send(`HTTP 400 -- Bad Request`);
    }
    //Controls if there is a user that has already exist sends HTTP 404 error
    //Updates user
        async function updateUser(){
            const user = await User
            .updateOne({id:req.params.id},{$set: req.body });
            if(user.nModified > 0 ) 
                res.send(req.body);
                else
                res.status(404).send(`HTTP 404 -- Not Found`);
        
    }
    updateUser();
});
app.delete("/api/user/:id", (req,res) => {
    //Controls if parameter of request is integer or not
    //If it is not then sends HTTP 400 error
    if(isNaN(req.params.id)){
        res.status(400).send(`HTTP 400 -- Bad Request`);
    }else {
         //Controls if there is a user that has already exist sends HTTP 404 error
        async function ctrl2(){
            const users = await User
            .find({id:req.params.id});
            if(users.length===0){
                res.status(404).send(`HTTP 404 -- Not Found`);
            } else{
                deleteUser();
                res.send(req.body);
            }
            
        }
        ctrl2();
    }
     //Deletes user
    async function deleteUser(){
        const user = await User
        .deleteOne({id:req.params.id});
    }
});
//Listens if there is a environmental port
//If not, listens on port 3000 locally
app.listen(process.env.PORT || 3000,() => console.log('Listening on port 3000...'));