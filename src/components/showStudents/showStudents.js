import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



export default function ShowStudents() {
const [students, setStudents] = useState([]);

function deleteStudent(id)
{
axios.delete(`http://localhost:5000/students/${id}`).then(()=>{
  window.location.reload(false);
})
}


useEffect(()=>{
  axios.get("http://localhost:5000/students").then((allStudents)=>{
        setStudents(allStudents.data);
  })
}, [])




  return (
      <>
      <h2>All Students</h2>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>REGISTRATION ID</StyledTableCell>
            <StyledTableCell align="right">NAME</StyledTableCell>
            <StyledTableCell align="right">GRADE</StyledTableCell>
            <StyledTableCell align="right">SECTION</StyledTableCell>
            <StyledTableCell align="right">ACTION</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((row, key) => (
            <StyledTableRow key={key} >
              <StyledTableCell component="th" scope="row">
                {row.registrationNumber}
              </StyledTableCell>
              <StyledTableCell align="right">{row.name}</StyledTableCell>
              <StyledTableCell align="right">{row.grade}</StyledTableCell>
              <StyledTableCell align="right">{row.section}</StyledTableCell>
              <StyledTableCell align="right" >
              <IconButton aria-label="delete" onClick={() =>{deleteStudent(row.registrationNumber)}}><DeleteIcon /></IconButton>
              </StyledTableCell>
              </StyledTableRow>
              
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>

  );
}
