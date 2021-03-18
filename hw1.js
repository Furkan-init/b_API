const mongoose=require('mongoose');
const express=require('express');
const app = express();


mongoose.connect('mongodb://localhost/computing')
    .then(() => console.log('Connected ...'))
    .catch(err => console.error('Could not', err));

/*
mongoose.connect(
    'mongodb+srv://furkan:ymzYaEvmdnCifrPF@cluster0.7uyyg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    { useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true},
    (err) => {
        if (err) return console.log("Error: ", err);
        console.log("MongoDB Connection -- Ready state is:", mongoose.connection.readyState);
    }
);
*/
const userSchema = new mongoose.Schema({
    id: {type : Number, required: true},
    name: {type : String, required: true},
    surname: {type : String, required: true},
    email: String,
    age: Number
});

const User = mongoose.model('User', userSchema);


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

async function initFirst(){
    const users = await User
    .find();
    if(users.length===0){
     createUser(1,'Nandor','Relentless','impenetrablefortress@gmail.com',35);
    createUser(2,'Guillermo','De La Cruz','mosquitoHR@yahoo.com',24);
    createUser(3,'Baron','Afanas','brafanas@outlook.com',75);
    }
}
initFirst();  
//To use req.body
app.use(express.json());


app.get("/api/user", (req,res) => {
    async function getUsers(){
        const users = await User
        .find();
        res.send(users);
    }
    getUsers();
});

app.get("/api/user/:id", (req,res) => {
    if(isNaN(req.params.id)){
        res.status(400).send(`HTTP 400 -- Bad Request`);
    }else {
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
app.post("/api/user", (req,res) => {   

    async function ctrl(){
        const users = await User
            .find({id:req.body.id});
            if(users.length===0){
                addNew();
            } else
            res.status(400).send(`HTTP 400 -- Bad Request ~Same User in DB`);
    }
    ctrl();
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
app.put("/api/user/:id", (req,res) => {
    if(isNaN(req.params.id)){
        res.status(400).send(`HTTP 400 -- Bad Request`);
    }
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
    async function deleteUser(){
        const user = await User
        .deleteOne({id:req.params.id});
    }
    res.send(req.body);
   deleteUser();
});

app.listen(process.env.PORT || 3000,() => console.log('Listening on port 3000...'));