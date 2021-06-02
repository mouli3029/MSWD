const express = require('express')
const morgan = require('morgan');
const app = express();

app.use(express.json())
app.use(morgan())
let persons = [{
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
]

app.get('/',(req,res)=>{
    res.send('<h1> Phone Book  </h1>')
})

// GET ALL
app.get('/api/persons',(req,res)=>{
    res.json(persons);
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
  if(!newEntry.name){
    return res.status(400).json({error : "Name is missing"})
  }
  if(!newEntry.number){
    return res.status(400).json({error : "Number is missing"})
  }
  isAdded = persons.filter(person => person.name.toLowerCase() === newEntry.name.toLowerCase())
  if(isAdded){
    return res.status(400).json({error : "Name must be unique"});
  }

  if(newEntry){
    newEntry.id = Math.floor(Math.random() * 1000000000)
    res.status(201).json(newEntry);
    persons.push(newEntry);
  }
  else{
    return res.status(500).end();
  }
  
})

app.get('/info',(req,res)=>{
  const date = new Date();
  res.send(`<p> Phonebook has info for ${persons.length} people</p> <p> ${date} </p>`)
})
const PORT = 3001
app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}/`);
})