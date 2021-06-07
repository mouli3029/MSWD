const express = require('express')
const morgan = require('morgan');
const cors = require('cors')

const Person = require('./models/person');

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
  })
})

// GET BY ID
app.get('/api/persons/:id',(req,res,next)=>{
  Person.findById(req.params.id)
  .then(person => {
    if(person){
      res.status(200).json(person);
    }
    res.status(400).end();
  })
  .catch(error => next(error))
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
// PUT
app.put('/api/persons/:id',(req,res,next)=>{
  const body = req.body;
  const person = {
    name : body.name,
    number : body.number,
  }
  Person.findByIdAndUpdate(req.params.id,person,{runValidators : true},{new : true})
  .then(result => {
    res.json(result)
  })
  .catch(error => next(error))
})

// POST
app.post('/api/persons',(req,res,next)=>{
  const newEntry = req.body;
 if(newEntry.name !== undefined && newEntry.number !== undefined){
   const person = new Person({
     name : newEntry.name,
     number : newEntry.number,
   })
   person.save()
   .then(result => {
     res.json(result)
   })
   .catch(error => {
     next(error)
   })
 }
  else{
    return res.status(500).end();
  }
})

app.get('/info',(req,res)=>{
  const date = new Date();
  Person.find({}).then(persons => {
    res.send(`<p> Phonebook has info for ${persons.length} people</p> <p> ${date} </p>`)
  })
})

// Error handler
const errorHandler = (error,req,res,next) => {
  if(error.name === 'CastError'){
    return res.status(400).send({error : "malformatted id"})
  }
  else if(error.name === 'ValidationError'){
    console.log(error.message)
    return res.status(400).send({error : error.message})
  }
  else if(error.name === 'MongooseError'){
    return res.status(400).send({error : "Update should have min 3 characters of name and 8 characters of number"})
  }
  next(error)
}
app.use(errorHandler)

// Connection
const PORT = process.env.PORT || 3001
app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}/`);
})