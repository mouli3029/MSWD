const express = require('express')
const morgan = require('morgan');
const cors = require('cors')

const Person = require('./models/person')

const app = express();

// MiddleWares 
app.use(express.json())
app.use(cors())
app.use(express.static('build'))
morgan.token('postData', function (req){
	if(req.method === 'POST')
		return JSON.stringify({name : req.body.name ,number : req.body.number})
	else
		return ''
})
morgan.format('format',':method :url :status :res[content-length] - :response-time ms :postData')
app.use(morgan('format'))

/* let persons = [{
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
] */

// Routes
app.get('/',(req,res)=>{
    res.send('<h1> Phone Book  </h1>')
})

// GET ALL
app.get('/api/persons',(req,res)=>{
  Person.find({})
  .then((persons)=>{
    res.json(persons);
    console.log(persons)
  })
})

// GET BY ID
app.get('/api/persons/:id',(req,res)=>{
  const id = req.params.id;
  const person = persons.find(person => person.id === parseInt(id))
  if(person){
    res.status(200).json(person);
  }
  else{
    res.status(404).end();
  }
})

// DELETE
app.delete('/api/persons/:id',(req,res)=>{
  const id = parseInt(req.params.id)
  persons = persons.filter(person => person.id !== id)
  
  res.status(204).end();
})

app.post('/api/persons',(req,res)=>{
  const newEntry = req.body;
/*  if(!newEntry.name){
    return res.status(400).json({error : "Name is missing"})
  }
  if(!newEntry.number){
    return res.status(400).json({error : "Number is missing"})
  } 
  isAdded = persons.filter(person => person.name.toLowerCase() === newEntry.name.toLowerCase())
  if(isAdded.length !== 0){
    return res.status(400).json({error : "Name must be unique"});
  }
  */
 if(newEntry.name !== undefined && newEntry.number !== undefined){
   const person = new Person({
     name : newEntry.name,
     number : newEntry.number,
   })
   person.save()
   .then(result => {
     console.log(result);
   })
   .catch(err => {
     console.log(err)
   })
 }
  else{
    return res.status(500).end();
  }
  
})

app.get('/info',(req,res)=>{
  const date = new Date();
  res.send(`<p> Phonebook has info for ${persons.length} people</p> <p> ${date} </p>`)
})
const PORT = process.env.PORT || 3001
app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}/`);
})