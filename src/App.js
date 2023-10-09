import './App.css';
import Header from './components/Header';
import Body from './components/Body';
import { useEffect, useState } from 'react';
// import _ from 'lodash';

function App() {

  const [query, setQuery] = useState("");
  const [empdata, setEmpdata] = useState([]);
  const [newempdata, setnewempdata] = useState([]);
  
  useEffect(() => {
    
    setnewempdata(empdata);
  }, [query]);

  //Search function---------------------------------------------------
  // function search(emps) {
  //   setnewempdata(empdata);
  //   setEmpdata(prevEmpdata => {
  //      return prevEmpdata.filter((item) => {
  //       let itemdata = (item.fname+item.lname+item.email+item.phone).toLowerCase();
  //        return itemdata.includes(emps);
  //      })
  //   })
  //   if(query=="")
  //   {
  //     setEmpdata(newempdata);
  //   }
  // }

  function search(searchValue){
    setQuery(searchValue);
   
    setnewempdata(empdata);
      setEmpdata(prevEmpdata => {
         return prevEmpdata.filter((item) => {
          let itemdata = (item.fname+item.lname+item.email+item.phone).toLowerCase();
           return itemdata.includes(searchValue);
         })
    })
    if(query=="")
      {
        setEmpdata(newempdata);
      }
  }

return (
  <>
    <Header empdata={empdata} setEmpdata={setEmpdata} search={search} query={query} setQuery={setQuery} newempdata={newempdata} setnewempdata={setnewempdata} />
    <Body empdata={empdata} setEmpdata={setEmpdata} search={search} query={query} setQuery={setQuery}  />
  </>
);
}

export default App;
