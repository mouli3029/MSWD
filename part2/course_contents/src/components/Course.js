import React from 'react'

const Content = ({parts}) =>{
    return (
      <div>
        {parts.map(part => (
          <Part key={part.id} part={part} />
        ))}
      </div>
    )
}
const Header = (props) => {
    return(
      <h2>{props.course}</h2>
    )
}
const Part = (props) => {
    return( 
      <p>{props.part.name} {props.part.exercises}</p>
    )
}

const Total = ({parts}) => {

    const reducer = (accumlator,currentVal) => accumlator + currentVal.exercises
    const total = parts.reduce(reducer,0)

    console.log(total)
    return(
      <h4>total of {total} exercises</h4>
    )
}



function Course({course}) {
    return (
        <>
            <Header course={course.name}/>
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    )
}

export default Course
