const mongoose = require('mongoose');

const argLength = process.argv.length
if(argLength <= 2){
    console.log('Please provide your password : node mongo.js <password>');
    process.exit(1);
}
const password = process.argv[2];

const mongoUrl = `mongodb+srv://mouli3029:${password}@cluster0.dvfew.mongodb.net/phone-book`

mongoose.connect(mongoUrl,{useUnifiedTopology :true,useCreateIndex:true,useFindAndModify:false,useNewUrlParser:true},()=>{
    console.log("DB Connected Successfully !")
})

const  PersonSchema = mongoose.Schema({
    name : String,
    number : Number,
})

const Person = mongoose.model('Person',PersonSchema);

if(argLength === 5){
    const person = new Person({
        name : process.argv[3].toString(),
        number : Number(process.argv[4])
    })

    person.save((err,result)=>{
        if(!err){
            console.log(`added ${result.name} number ${result.number} to phonebook`)
            mongoose.connection.close();
        }
    })

}

if(argLength === 3){
    Person.find({})
    .then((persons)=>{
        persons.forEach(person => console.log(`${person.name}  ${person.number}`));
        mongoose.connection.close()
    })
    .catch(err => console.log(err))
}
