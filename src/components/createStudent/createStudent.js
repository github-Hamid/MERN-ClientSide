import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';



export default function Create() {
    const [student, setStudent] = useState({
      registrationNumber: 0,
        name: "",
        grade: "",
        section: "" 
    });

    function createStudent()
    {
      console.log("st: ",student);
      axios.post("http://localhost:5000/students", student).then(()=>{
        window.location.reload(false);
      });
    }

    function change(e)
    {
      
      switch(e.target.id)
      {
          case "Registration number" : 
          if(e.target.value.length != 0)
          setStudent(prev => {return {...prev, registrationNumber: parseInt(e.target.value)}});
          else
          setStudent(prev => {return {...prev, registrationNumber: 0}});
          break;
          case "Name" :
          setStudent(prev => {return {...prev, name: e.target.value}});
          break;
          case "Grade" : 
          setStudent(prev => {return {...prev, grade: e.target.value}});
          break;
          case "Class Section" : 
          setStudent(prev => {return {...prev, section: e.target.value}});
          break;
          default:{}
      }
     
    }
  return (
      <>
      <h2>Create Student</h2>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="Registration number" label="Registration number" variant="outlined" value={student.registrationNumber} onChange={change} />
      <TextField id="Name" label="Name" variant="outlined" value={student.name} onChange={change}/>
      <TextField id="Grade" label="Grade" variant="outlined" value={student.grade} onChange={change}/>
      <TextField id="Class Section" label="Class Section" variant="outlined" value={student.section} onChange={change}/>
      <Button variant="contained" color="success" onClick={createStudent}>
        Create
      </Button>
    </Box>
    </>
  );
}
