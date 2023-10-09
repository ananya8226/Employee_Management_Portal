import React from 'react';
import ReactModal from 'react-modal';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../stylesheet/body.css';
import { useState } from 'react';

const defaultTheme = createTheme();

function Body({ empdata, setEmpdata, search }) {

    const [isopenedit, setIsopenedit] = useState(false);
    const [image, setImage] = useState('');

//delete function------------------------------------------------------
    const handleDelete = (eid) => {
        var newList = empdata;
        empdata.splice(eid, 1);
        setEmpdata([...newList]);
    }

    function handleImage(e) {
        console.log(e.target.files);
        setImage(e.target.files[0]);
    }

// validators-------------------------------------------------------------

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
        return (salary > 0);
    }

// update function--------------------------------------------------------
    const handleEdit = (event, index) => {

        event.preventDefault();
        // console.log(event.currentTarget);
        const data = new FormData(event.currentTarget);
        const fname = data.get('fname');
        const lname = data.get('lname');
        const email = data.get('email');
        const phone = data.get('phone');
        const address = data.get('address');
        const designation = data.get('designation');
        const eid = data.get('eid');
        const salary = data.get('salary');

        const obj = { fname: fname, lname: lname, email: email, phone: phone, eid: eid, address: address, designation: designation, salary: salary }
        console.log(index);

        if (fname == '' || email == '' || phone == '' || address == '' || designation == '' || eid == '' || salary == '') {
            alert("enter all required details");
        }
        else{
            if (!emailValidator(email)) {
                alert("enter valid email");
            }
            if (!phoneValidator(phone)) {
                alert("enter valid mobile number");
            }
            if (!eidValidator(eid)) {
                alert("enter valid employee Id");
            }
            if (!salaryValidator(salary)) {
                alert("salary cannot be less than 0");
            }
            if (fname && address && designation && emailValidator(email) && phoneValidator(phone) && eidValidator(eid) && salaryValidator(salary)) {
                empdata.splice(index, 1, obj);
                setIsopenedit(false);
            }
    
        }
        
        console.log(empdata);
    }

    return (
        <>
            <div className='mainbody'>
                {empdata.map((employee, index) => (
                    
                    <div className='empcard'>
                        <div>
                            <img src="assets/emp1.jpg" className='empimg'></img>
                            <div className='empname'><span>Name:&nbsp;{employee.fname}</span><span>&nbsp;{employee.lname}</span></div>
                            <div className='empdesignation'>Designation:&nbsp;{employee.designation}</div>
                        </div>
                        <div className='btnhandle'>
                            <Button variant="contained" onClick={setIsopenedit}>Edit</Button>
                            {/* POP UP Window*/}
                            <ReactModal
                                isOpen={isopenedit}
                                contentLabel="Update Employee">
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
                                                <h1>Update Employee</h1>
                                            </div>
                                            <Box component="form" onSubmit={(e) => handleEdit(e, index)} noValidate sx={{ mt: 1 }} >
                                                <TextField
                                                    required
                                                    fullWidth
                                                    autoFocus
                                                    name="fname"
                                                    label="First Name"
                                                    type="name"
                                                    id="fname"
                                                    placeholder={employee.fname}
                                                    style={{ marginBottom: '0.5rem', marginTop: '1rem' }}
                                                />
                                                <TextField

                                                    fullWidth
                                                    name="lname"
                                                    label="Last Name"
                                                    type="name"
                                                    id="lname"
                                                    placeholder={employee.lname}

                                                    style={{ marginBottom: '0.5rem', marginTop: '1rem' }}
                                                />

                                                <TextField
                                                    required
                                                    fullWidth
                                                    id="email"
                                                    label="Email Address"
                                                    name="email"
                                                    placeholder={employee.email}
                                                    // autoComplete="email"
                                                    style={{ marginBottom: '1rem', marginTop: '1rem' }}
                                                />
                                                <TextField
                                                    required
                                                    fullWidth
                                                    name="phone"
                                                    label="Mobile Number"
                                                    type="phone"
                                                    id="phone"
                                                    placeholder={employee.phone}

                                                    style={{ marginBottom: '0.5rem', marginTop: '1rem' }}
                                                />
                                                <TextField
                                                    required
                                                    fullWidth
                                                    name="eid"
                                                    label="Employee Id"
                                                    type="text"
                                                    placeholder={employee.eid}
 
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
                                                    placeholder={employee.address}
                                                  

                                                    style={{ marginBottom: '0.5rem', marginTop: '1rem' }}
                                                />
                                                <TextField
                                                    required
                                                    fullWidth
                                                    name="designation"
                                                    label="Designation"
                                                    type="text"
                                                    placeholder={employee.designation}

                                                    id="designation"
                                                    
                                                    style={{ marginBottom: '0.5rem', marginTop: '1rem' }}
                                                />

                                                <TextField
                                                    required
                                                    fullWidth
                                                    name="salary"
                                                    label="Salary"
                                                    type="salary"
                                                    id="salary"
                                                    placeholder={employee.salary}
                                                    style={{ marginBottom: '0.5rem', marginTop: '1rem' }}
                                                />

                                                <Button
                                                    variant="contained"
                                                    component="label"
                                                    fullWidth
                                                    style={{ marginTop: '1rem', marginBottom: '1rem' }}
                                                >
                                                    Upload Image
                                                    <input
                                                        type="file"
                                                        onChange={handleImage}
                                                        hidden
                                                    />

                                                </Button>
                                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                                    <Button
                                                        type="submit"
                                                        variant="contained"
                                                        className='button'
                                                        style={{ width: '48%' }}
                                                    >
                                                        Add
                                                    </Button>
                                                    <Button variant="contained" style={{ width: '48%' }} onClick={() => setIsopenedit(false)}>Cancel</Button>
                                                </div>

                                            </Box>
                                        </Box>

                                    </Container>
                                </ThemeProvider >
                            </ReactModal>
                            <Button variant="contained" onClick={() => handleDelete(employee.eid)}>Delete</Button>

                        </div>

                    </div>
                )
                )}
            </div>
        </>
    )
}

export default Body;