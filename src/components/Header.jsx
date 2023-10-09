import React from 'react';
import ReactModal from 'react-modal';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../stylesheet/header.css';
import { useState } from 'react';


const defaultTheme = createTheme();

function Header({ empdata, setEmpdata, search, query, setQuery, newempdata, setnewempdata }) {

    const [isOpen, setIsOpen] = useState(false);
    const [image, setImage] = useState('');
    
    function handleImage(e) {
        console.log(e.target.files);
        setImage(e.target.files[0]);
    }

// Validators-----------------------------------------------------------------------

    function emailValidator(email) {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
       
    }
    
    function phoneValidator(phone) {
        const phonePattern = /^\d{10}$/;
       return phonePattern.test(phone);
        // setIsvalidphone(isvalidphone);

      }

      function eidValidator(eid) {
        const pattern = /^AV\/\d{2}\/\d{3}$/;
        return pattern.test(eid);
        // setIsvalideid(isvalideid);
      }

      function salaryValidator(salary) {
        return (salary>0);
      }

// Submit function--------------------------------------------------------------------

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const fname = data.get('fname');
        const lname = data.get('lname');
        const email = data.get('email');
        const phone = data.get('phone');
        const address = data.get('address');
        const designation = data.get('designation');
        const eid = data.get('eid');
        const salary = data.get('salary');

        if(fname=='' || email=='' || phone=='' || address=='' || designation=='' || eid=='' || salary=='')
        {
           alert("enter all required details");
        }
        else{
            if(!emailValidator(email) ) {
                alert("enter valid email");
            }
             if(!phoneValidator(phone) )
            {
                alert("enter valid mobile number");
            }
            if(!eidValidator(eid)){
                alert("enter valid employee Id");
            }
            if(!salaryValidator(salary))
            {
                alert("salary cannot be less than 0");
            }
            if(fname && address && designation && emailValidator(email) && phoneValidator(phone) && eidValidator(eid) && salaryValidator(salary)){
                setEmpdata([...empdata, { fname: fname, lname: lname, email: email, phone: phone, eid: eid, address:address, designation: designation,  salary:salary  }]);
                // console.log(fname);
                setIsOpen(false);
            }
        }
        
    };

//Search function in App.js ---------------------------------------------------------

    const submitSearch = (e) => {
        search(query);
    }

// Sort function---------------------------------------------------------------------

    function sort(id) {
       
        if(id==1)
        {
            let temp=[...empdata].sort((a, b) => a.fname.localeCompare(b.fname));
            setEmpdata(temp); 
        }
        
         if(id==2)
        {
            let temp=[...empdata].sort((a, b) => b.fname.localeCompare(a.fname));
            setEmpdata(temp); 
        }
        if(id==3)
        {
            let temp=[...empdata].sort((a, b) => a.salary-b.salary);
            setEmpdata(temp); 
        }
        if(id==4)
        {
            let temp=[...empdata].sort((a, b) => b.salary-a.salary);
            setEmpdata(temp); 
        }
        
    }

    return (
        <div className="mainheader">
            <div className='heading'><h1>Employee Management Portal</h1></div>
            <div className="searchbar">
            <TextField id="outlined-basic" type="text" variant="outlined" placeholder="Search.." className='search' onChange={(e)=>setQuery(e.target.value)} style={{width: '37rem'}}></TextField>
               {/* onChange={e => { setQuery(e.target.value); } */}
                <Button variant="outlined" onClick={submitSearch} style={{height:'3.37rem'}}>Search</Button>
               
            </div>
            
            <div>
                <div className='sortBar'>
                    <span style={{marginRight:'7px', fontSize: '1.2rem'}}>Sort</span>
                    <select name="sort" id="sort" onClick={(event)=>sort(event.target.value)} style={{height:'3.37rem', fontSize:'1rem', paddingLeft:'0.2rem'}}>
                        <option value="1">A-Z</option>
                        <option value="2">Z-A</option>
                        <option value="3">salary ascending</option>
                        <option value="4">salary descending</option>
                    </select>
                </div>
            </div>
            <div className='add'>
                
                <Button variant="contained" onClick={ setIsOpen }   
                style={{height:'3.37rem', borderRadius: '50%', fontSize:'2rem', fontWeight:'700'}}>+</Button>
 {/* Pop Up window*/}
                <ReactModal
                    isOpen={isOpen}
                    contentLabel="Add Employee">
                    <ThemeProvider theme={defaultTheme}  >
                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <Box
                                sx={{
                                    marginTop: 8,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >

                                <div className="adminlogin">
                                    <h1>Add New Employee</h1>
                                </div>
                                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} >
                                    <TextField
                                        required
                                        fullWidth
                                        name="fname"
                                        label="FirstName"
                                        type="name"
                                        id="fname"
                                        placeholder='Enter First Name'
                                        style={{ marginBottom: '0.5rem', marginTop: '1rem' }}
                                        
                                    />
                                    <TextField
                                        
                                        fullWidth
                                        name="lname"
                                        label="LastName"
                                        type="name"
                                        id="lname"
                                        placeholder='Enter Last Name'
                                        style={{ marginBottom: '0.5rem', marginTop: '1rem' }}
                                    />

                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        // autoComplete="email"
                                        autoFocus
                                        placeholder='Enter Email'
                                        // onKeyDown={(event)=>emailValidator(event.target.value)}
                                        style={{ marginBottom: '1rem', marginTop: '1rem' }}
                                    />
                                    <TextField
                                        required
                                        fullWidth
                                        name="phone"
                                        label="Mobile Number"
                                        type="phone"
                                        // onKeyDown={(event)=>phoneValidator(event.target.value)}
                                        id="phone"
                                        placeholder='Enter Mobile Number'
                                        style={{ marginBottom: '0.5rem', marginTop: '1rem' }}
                                    />
                                     <TextField
                                    required
                                    fullWidth
                                    name="eid"
                                    label="Employee ID"
                                    type="text"
                                    placeholder='Enter Employee Id'
                                    // onKeyDown={(event)=>eidValidator(event.target.value)}
                                    id="eid"
                                    style={{ marginBottom: '0.5rem', marginTop: '1rem' }}
                                />
                                 
                                <TextField
                                    required
                                    fullWidth
                                    name="address"
                                    label="Address"
                                    type="text"
                                    id="address"
                                    placeholder='Enter Address'
                                    style={{ marginBottom: '0.5rem', marginTop: '1rem' }}
                                />
                                <TextField
                                    required
                                    fullWidth
                                    name="designation"
                                    label="Designation"
                                    type="text"
                                    placeholder='Enter Designation'
                                    id="designation"
                                    style={{ marginBottom: '0.5rem', marginTop: '1rem' }}
                                />
                               
                                <TextField
                                    required
                                    fullWidth
                                    name="salary"
                                    label=" Salary"
                                    type="salary"
                                    placeholder='Enter Salary'
                                    id="salary"
                                    // onKeyDown={(event)=>salaryValidator(event.target.value)}
                                    style={{ marginBottom: '0.5rem', marginTop: '1rem' }}
                                />
                            
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        component="label"
                                        style={{ marginTop: '1rem', marginBottom: '1rem'}}
                                    >
                                        Upload Image
                                        <input
                                            type="file"
                                            onChange={handleImage}
                                            hidden
                                        />
                                    </Button>
                                    <div style={{display:'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        className='button'
                                        style={{width:'48%'}}
                                    >
                                        Add
                                    </Button>
                                    <Button variant="contained"  style={{width:'48%'}} onClick={()=>setIsOpen(false)}>Cancel</Button>
                                    </div>
                                </Box>\
                                
                            </Box>
                        </Container>
                    </ThemeProvider >
                </ReactModal>
            </div>
        </div>
    )
}

export default Header;