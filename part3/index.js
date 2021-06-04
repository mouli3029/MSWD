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
app.delete('/api/persons/:id',(req,res,next)=>{
  Person.findByIdAndRemove(req.params.id)
  .then(result => {
    res.status(204).end();
    console.log(result);
  })
  .catch(error => next(error))
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

const errorHandler = (error,req,res,next) => {
  console.error(error.message);
  if(error.name === 'CastError'){
    return res.status(400).send({error : "malformatted id"})
  }
  next(error)
}
app.use(errorHandler)
const PORT = process.env.PORT || 3001
app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}/`);
})