const express = require('express')
const app = express();

app.use(express.json())
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

app.get('/info',(req,res)=>{
  const date = new Date();
  res.send(`<p> Phonebook has info for ${persons.length} people</p> <p> ${date} </p>`)
})
const PORT = 3001
app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}/`);
})