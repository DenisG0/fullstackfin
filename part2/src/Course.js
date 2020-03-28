import React from 'react';

function Course({course}) {

  return (
   <div>
    <h1>{course.name}</h1>
    <ul>
      {course.parts.map((course)=>
        <p key={course.id}>
          {course.name} {course.exercises}
        </p>
        )
      }
    </ul>
    <b>
      Total of { course.parts.reduce((a,b) => { console.log(a.exercises,b.exercises);return a + b.exercises},0) } exercises
    </b>
   </div>
  );
}

export default Course;
