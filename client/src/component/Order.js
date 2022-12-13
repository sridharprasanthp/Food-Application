import React from 'react';
import brkfasta from "../brkfast.jpg";
import luncha from "../lunch.jpg";
import dinnera from "../dinner.jpg";
import "./Order.css";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import Dates from './Dates';
import Foodss from './Foodss';
import Tbody from './Tbody';
import Spinner from './Spinner';
import Error404 from './Error404';
import Tbody5 from './Tbody5';
import Dates5 from './Dates5';
import Foodss5 from './Foodss5';
import Tbody25 from './Tbody25';
import Foodss25 from './Foodss25';
import Dates25 from './Date25';
import {useCookies} from "react-cookie";
import "./td.css";
axios.defaults.withCredentials = true;


export default function Order() {
  const [breakfast, setBreakfast] = useState(Boolean);
  const [lunch, setLunch] = useState(Boolean)
  const [dinner, setDinner] = useState(Boolean);
  const [data, setData] = useState([])
  const [datas, setDatas] = useState([])
  const [order, setOrder] = useState([])
  const [search, setSearch] = useState('');
  const [datenew, setDateNew] = useState(new Date().toISOString().substring(0, 10));
  const [message, setMessage] = useState("")
  const cookiee = useCookies();
  
  const tomorrow = new Date();
  tomorrow.setDate(new Date().getDate() + 1)
  const nextdate = tomorrow.toLocaleDateString('en-US');
  const time = new Date(Date.now()).toLocaleTimeString('en-US', { hour12: false }) >= '22:00:00'
  const navigate = useNavigate();
  const tableRef = useRef(null);
  const tableRef25 = useRef(null);
  const tableRef5 = useRef(null);
  const [filter, setFilter] = useState(new Date().toLocaleDateString())
  var todayss = new Date(Date.now());
  var monthcurrent = todayss.getFullYear() + '-' + (todayss.getMonth() + 1)
  const [currentmth,setCurrentmth]=useState(monthcurrent)
    // const [isLoading,setIsLoading] = useState(false)

  let breakfastcurrentdate = new Date(datenew).toLocaleDateString("en-US") < new Date(Date.now()).toLocaleDateString("en-US")
  let breakfastgtnextdate = new Date(Date.now()).toLocaleTimeString('en-US', { hour12: false }) >= '00:00:00'
  let breakfastltcurrentdate = new Date(datenew).toLocaleDateString("en-US") >= nextdate
  

  let lunchltcurrentdate = new Date(datenew).toLocaleDateString("en-US") < new Date(Date.now()).toLocaleDateString("en-US")
  let lunchtime11 = new Date(Date.now()).toLocaleTimeString('en-US', { hour12: false }) >= '10:00:00'
  let lunchgteqtonextdate = new Date(datenew).toLocaleDateString("en-US") >= nextdate


  let dinnerltcurrentdate = new Date(datenew).toLocaleDateString("en-US") < new Date(Date.now()).toLocaleDateString("en-US")
  let dinnertime05 = new Date(Date.now()).toLocaleTimeString('en-US', { hour12: false }) >= '16:00:00'
  let dinnergteqtonextdate = new Date(datenew).toLocaleDateString("en-US") >= nextdate



  let breakfastnextdateonly=new Date(datenew).toLocaleDateString("en-US") === nextdate

  let lunchnextdateonly = new Date(datenew).toLocaleDateString("en-US") === nextdate

  let dinnernextdateonly = new Date(datenew).toLocaleDateString("en-US") === nextdate

  function edit(id) {
    navigate(`/user/${id}`)
  }
  function view() {
    navigate(`/singleview`)
  }


  function submit(e) {
    e.preventDefault()
    if (new Date(Date.now()).toLocaleTimeString('en-US', { hour12: false }) >= '22:00:00') { // change as per the time
      window.location.reload(false)
    }
    else {
      const datas = {
        empid: data.password,
        date: new Date(datenew).toLocaleDateString("en-US"),
        breakfast: breakfast,
        lunch: lunch,
        dinner: dinner
      }
      axios.post(`http://172.16.0.137:3001/orderfood`, datas).then(res => alert(res.data.message)).then(() =>{ window.location.reload(true)})
    }
  }
  
  useEffect(() => {
    axios.get(`http://172.16.0.137:3001/user`, { withCredentials: true }).then(res => {setData(res.data);})
  }, [])

  function logout() {
    axios.get(`http://172.16.0.137:3001/logout`).then(res => res.data.message === "Successfully Logout" ? navigate('/') : alert('Invalid'))
    //  navigate('/Login')
  }

  useEffect(() => {
    axios.get(`http://172.16.0.137:3001/aggregate`).then(res => {setDatas(res.data)})
  }, [])


  //update
  useEffect(() => {
    axios.get(`http://172.16.0.137:3001/getorderedfood`).then(res => setOrder(res.data))
  }, [])

  let username = order.filter((dat) => {
    return (dat.empid === data.password && dat.date === new Date(Date.now()).toLocaleDateString('en-US')) || (dat.empid === data.password && dat.date === nextdate)
  })
  //update

  //Tables

  const searches = (data) => {
    return data.filter((us) => us.password.toLowerCase().includes(search) || us.name.toLowerCase().includes(search) || us.name.includes(search) || us.name.toUpperCase().includes(search))
  }
  console.log(cookiee)
  function changedates(e) {
    setFilter(e.target.value);
    setCurrentmth(e.target.value)
  }
  //Tables
  const date11 = new Date(Date.now()).toLocaleDateString("en-US");
  const today1 = new Date();
  const yyyy = today1.getFullYear();
  let mm = today1.getMonth() + 1; // Months start at 0! 
  let dd = today1.getDate();
  let dn = today1.getDate() + 1;
  if (dd < 10) dd = '0' + dd;
  if (dn < 10) dn = '0' + dn;
  if (mm < 10) mm = '0' + mm;
  const formattedToday = dd + '-' + mm + '-' + yyyy;
  const formattedNext = dn + '-' + mm + '-' + yyyy;



  if (!data.password){
    return (
    <Error404></Error404>
    // <Spinner></Spinner>
    );
  }


  else if (data.password === "admin") {
    return (
      <>
        {data ? <div className="container-fluid position-relative d-flex" style={{ backgroundColor: "white" }}>
          <div className="content mx-auto">
            <div className="container-fluid py-0">
              <div className="container-fluid py-1 bg-dark hero-header">
                <div className="container text-center my-5 pt-0 pb-1">
                  <h2 className="section-title ff-secondary text-center text-primary fw-normal">Food Attendees</h2>
                </div>
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", padding: "1em" }}>


                <label>
                  <input type="month" value={currentmth} onChange={changedates} className='p-1' /> </label>
                <div className="row g-4">
                  <div className="col-12 mx-auto">
                    <input className="form-control form-control-sm search-input fuzzy-search" type="text" placeholder="Search..." aria-label="Search" onChange={(e) => { setSearch(e.target.value) }}></input>
                  </div>
                </div>
               

                <button onClick={logout} className="btn btn-primary me-3 ">Logout</button>
              </div>
            </div>


            <div className="container-fluid pt-4 ">
              <div className="row g-4">
                <div className="col-12">
                  <div className="bg-light rounded h-100 p-4">
                  <DownloadTableExcel
                  filename="Food Ordered"
                  sheet="Food"
                  currentTableRef={tableRef.current}
                >
                  <button className="btn btn-success mx-3"> Download Excel</button>
                </DownloadTableExcel>
                    <h6 style={{textAlign:"center"}} className="mb-4">Whole Month Table</h6>
                    <div className="table-responsive" style={{ border: "2px solid black", borderRadius: "6px 6px 6px 6px" }}>
                      <table ref={tableRef} className="table">
                        <thead>
                          <tr>
                            <th className="text-center text-dark fw-bold" style={{ backgroundColor: "lightblue", borderRight: "1px solid black", borderBottom: "1px solid black" }} scope="col" rowSpan="2">Employee <br /><br /> </th>
                            <th className="text-center text-dark fw-bold" style={{ backgroundColor: "lightblue", borderRight: "1px solid black", borderBottom: "1px solid black" }} scope="col" rowSpan="2">ID <br /><br /></th>
                            <th className='text-center text-dark fw-bold' style={{ backgroundColor: "lightblue", borderRight: "1px solid black", borderBottom: "1px solid black" }} colSpan="3" >Count<br></br></th>
                            <th className='text-center text-dark fw-bold' style={{ backgroundColor: "lightblue", borderRight: "1px solid black", borderBottom: "1px solid black" }} colSpan="3" >Amount<br></br></th>
                            <Dates filter={filter}></Dates>
                          </tr>
                          <tr>
                            <Foodss filter={filter}></Foodss>
                          </tr>
                        </thead>
                        <Tbody datas={searches(datas)} search={search} filter={filter}></Tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br></br><br></br>
           

            <div className="container-fluid pt-4 ">
              <div className="row g-4">
                <div className="col-12">
                  <div className="bg-light rounded h-100 p-4">
                     <DownloadTableExcel
                  filename="Food Ordered"
                  sheet="Food"
                  currentTableRef={tableRef25.current}
                >
                  <button className="btn btn-success mx-3"> Download Excel</button>
                </DownloadTableExcel>
                    <h6 style={{textAlign:"center"}} className="mb-4">25 Days Table</h6>
                    <div className="table-responsive" style={{ border: "2px solid black", borderRadius: "6px 6px 6px 6px" }}>
                      <table ref={tableRef25} className="table">
                        <thead>
                          <tr>
                            <th className="text-center text-dark fw-bold" style={{ backgroundColor: "lightblue", borderRight: "1px solid black", borderBottom: "1px solid black" }} scope="col" rowSpan="2">Employee <br /><br /> </th>
                            <th className="text-center text-dark fw-bold" style={{ backgroundColor: "lightblue", borderRight: "1px solid black", borderBottom: "1px solid black" }} scope="col" rowSpan="2">ID <br /><br /></th>
                            <th className='text-center text-dark fw-bold' style={{ backgroundColor: "lightblue", borderRight: "1px solid black", borderBottom: "1px solid black" }} colSpan="3" >Count<br></br></th>
                            <th className='text-center text-dark fw-bold' style={{ backgroundColor: "lightblue", borderRight: "1px solid black", borderBottom: "1px solid black" }} colSpan="3" >Amount<br></br></th>
                            <Dates25 filter={filter}></Dates25>
                          </tr>
                          <tr>
                            <Foodss25 filter={filter}></Foodss25>
                          </tr>
                        </thead>
                        <Tbody25 datas={searches(datas)} search={search} filter={filter}></Tbody25>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br></br><br></br>
            

            <div className="container-fluid pt-4 ">
              <div className="row g-4">
                <div className="col-12">
                  <div className="bg-light rounded h-100 p-4">
                  <DownloadTableExcel
                  filename="Food Ordered"
                  sheet="Food"
                  currentTableRef={tableRef5.current}
                >
                  <button className="btn btn-success mx-3"> Download Excel</button>
                </DownloadTableExcel>
                    <h6 style={{textAlign:"center"}} className="mb-4">End of Month Table</h6>
                    <div className="table-responsive" style={{ border: "2px solid black", borderRadius: "6px 6px 6px 6px" }}>
                      <table ref={tableRef5} className="table">
                        <thead>
                          <tr>
                            <th className="text-center text-dark fw-bold" style={{ backgroundColor: "lightblue", borderRight: "1px solid black", borderBottom: "1px solid black" }} scope="col" rowSpan="2">Employee <br /><br /> </th>
                            <th className="text-center text-dark fw-bold" style={{ backgroundColor: "lightblue", borderRight: "1px solid black", borderBottom: "1px solid black" }} scope="col" rowSpan="2">ID <br /><br /></th>
                            <th className='text-center text-dark fw-bold' style={{ backgroundColor: "lightblue", borderRight: "1px solid black", borderBottom: "1px solid black" }} colSpan="3" >Count<br></br></th>
                            <th className='text-center text-dark fw-bold' style={{ backgroundColor: "lightblue", borderRight: "1px solid black", borderBottom: "1px solid black" }} colSpan="3" >Amount<br></br></th>
                            <Dates5 filter={filter}></Dates5>
                          </tr>
                          <tr>
                            <Foodss5 filter={filter}></Foodss5>
                          </tr>
                        </thead>
                        <Tbody5 datas={searches(datas)} search={search} filter={filter}></Tbody5>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> : <Spinner></Spinner>}
      </>
    );
  }


  else if (data.password===data.password) {
    return (
      <>
        {data ? <form className="container-xxl bg-white p-0" onSubmit={submit}>
          <div className="container-xxl py-0">
            <div className="container-xxl py-1 bg-dark hero-header">
              <div className="container text-center my-5 pt-0 pb-1">
                <h5 className="section-title ff-secondary text-center text-primary fw-normal">Food Menu</h5>
                <div className="container text-center my-4 pt-0 pb-0">
                <h3 className=" ff-secondary text-center text-light fw-normal">Hey {data.name} !</h3>
                </div>
                <div className="row g-5">
                <h3 className="mb-0" style={{ color: "white" }}>Check Your Meal Today</h3>
                  <label className="ff-secondary text-center text-primary fw-normal col-3 px-0 ">
                    <input type="date" className="btn btn-primary w-75" value={datenew} onChange={(e) => setDateNew(e.target.value)} />
                  </label>
                  <div className="col-6">
                    <button className="btn btn-primary " type="button" onClick={() => { view() }}>ViewOrdered</button>
                  </div>
                  <div className="col-3 px-0 ">
                    <button className="btn btn-secondary " type="button" onClick={logout}>Logout</button>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="container-xxl pt-0 pb-0">
            <div className="container">
            <div className='my-3'>
              <div className='row mb-4'>
                <div className="col-4 ">
                 <h5 className="text-center">₹25</h5> 
                </div>
                <div className="col-4 ">
                  <h5 className="text-center">₹50</h5> 
                </div>
                <div className="col-4 ">
                 <h5 className="text-center">₹35</h5> 
                </div>
              </div>
            </div>
              {time ?
                <div className="container-xxl py-6 wow fadeInUp" data-wow-delay="0.1s">
                  <div className="container text-center">
                    <div className="row justify-content-center">
                      <div className="col-lg-6">
                        <i className="bi bi-exclamation-triangle display-1 text-primary"></i>
                        <h1 className="display-1">404</h1>
                        <h1 className="mb-4">Page Not Found</h1>
                        <p className="mb-4" style={{fontWeight:"bold"}}>Time Out!! ☹️ Sorry Contact Your Respective Admin... Book Before 10.00 PM </p>
                        <button className="btn btn-primary rounded-pill py-3 px-5 my-3" type="button" onClick={logout}>Go Back To Home</button>
                      </div>
                    </div>
                  </div>
                </div> :
                <div className="row g-5" >

                  {(breakfastcurrentdate || breakfastgtnextdate || breakfastltcurrentdate) ?
                    <div className="col-lg-4   wow fadeInUp" data-wow-delay="0.1s">
                      {breakfastnextdateonly?
                       <label id="hey" className=" service-item team-item text-center rounded overflow-hidden">
                       <div className="rounded-circle overflow-hidden m-5">
                         <img className="img-fluid" src={brkfasta} alt="No pic" />
                       </div>
                       <i className="fa fa-coffee fa-2x text-primary" />
                       <h5 className="mb-0">Breakfast</h5>
                       <div className="d-flex justify-content-center">
                         <input type='checkbox' className="form-check-input btn-square my-2" onChange={(e) => setBreakfast(e.target.checked)} ></input>
                       </div>
                     </label>:
                      
                      
                      
                      <label id="hey" className=" service-item team-item text-center rounded overflow-hidden">
                        <div className="rounded-circle overflow-hidden m-4">
                          <img className="img-fluid" src={brkfasta} alt="No pic" />
                        </div>
                        <i className="fa fa-coffee fa-2x text-primary" />
                        <h5 className="mb-0">Breakfast</h5>
                        <div className="justify-content-center">
                          <h5 style={{ color: "red" }}>Time Out!! Book Yesterday</h5>
                        </div>
                      </label>}</div>
                    :
                    <div className="col-lg-4   wow fadeInUp" data-wow-delay="0.1s">
                      <label id="hey" className=" service-item team-item text-center rounded overflow-hidden">
                        <div className="rounded-circle overflow-hidden m-5">
                          <img className="img-fluid" src={brkfasta} alt="No pic" />
                        </div>
                        <i className="fa fa-coffee fa-2x text-primary" />
                        <h5 className="mb-0">Breakfast</h5>
                        <div className="d-flex justify-content-center">
                          <input type='checkbox' className="form-check-input btn-square my-2" onChange={(e) => setBreakfast(e.target.checked)} ></input>
                        </div>
                      </label>
                    </div>}
                    {/* (lunchltcurrentdate || lunchgteqtonextdate || lunchtime11 ) &&  */}
                  {(lunchltcurrentdate || lunchgteqtonextdate || lunchtime11)? 
                  <div className="col-lg-4  wow fadeInUp" data-wow-delay="0.2s">
                     {lunchnextdateonly ? <label id="hey" className="service-item team-item text-center rounded overflow-hidden">
                      <div className="rounded-circle overflow-hidden m-5">
                        <img className="img-fluid" src={luncha} alt="No pic" />
                      </div>
                      <i className="fa fa-hamburger fa-2x text-primary" />
                      <h5 className="mb-0">Lunch</h5>
                      <div className="d-flex justify-content-center">
                       <input type='checkbox' className="form-check-input btn-square my-2" onChange={(e) => setLunch(e.target.checked)} ></input> 
                       </div>
                       </label>
                       : 
                       <label id="hey" className="service-item team-item text-center rounded overflow-hidden">
                      <div className="rounded-circle overflow-hidden m-4">
                        <img className="img-fluid" src={luncha} alt="No pic" />
                      </div>
                      <i className="fa fa-hamburger fa-2x text-primary" />
                      <h5 className="mb-0">Lunch</h5>
                      <div className="d-flex justify-content-center">
                       <h5 style={{ color: "red" }}>Time Out!! Book before 10.00AM</h5>
                       </div>
                       </label>}
                  </div>
                    :
                    <div className="col-lg-4  wow fadeInUp" data-wow-delay="0.2s">
                      <label id="hey" className="service-item team-item text-center rounded overflow-hidden">
                        <div className="rounded-circle overflow-hidden m-5">
                          <img className="img-fluid" src={luncha} alt="No pic" />
                        </div>
                        <i className="fa fa-hamburger fa-2x text-primary" />
                        <h5 className="mb-0">Lunch</h5>
                        <div className="d-flex justify-content-center">
                          <input type='checkbox' className="form-check-input btn-square my-2" onChange={(e) => setLunch(e.target.checked)} ></input>
                        </div>
                      </label>
                    </div>}
                    {/* (dinnerltcurrentdate || dinnergteqtonextdate || dinnertime05)  &&  */}
                  {( dinnerltcurrentdate || dinnergteqtonextdate || dinnertime05)?
                    <div className="col-lg-4 wow fadeInUp" data-wow-delay="0.1s">
                        {dinnernextdateonly ? <label id="hey" className="service-item team-item text-center rounded overflow-hidden">
                      <div className="rounded-circle overflow-hidden m-5">
                        <img className="img-fluid" src={dinnera} alt="No pic" />
                      </div>
                      <i className="fa fa-hamburger fa-2x text-primary" />
                      <h5 className="mb-0">Dinner</h5>
                      <div className="d-flex justify-content-center">
                       <input type='checkbox' className="form-check-input btn-square my-2" onChange={(e) => setDinner(e.target.checked)} ></input> 
                       </div>
                       </label>
                       : 
                       <label id="hey" className="service-item team-item text-center rounded overflow-hidden">
                      <div className="rounded-circle overflow-hidden m-4">
                        <img className="img-fluid" src={dinnera} alt="No pic" />
                      </div>
                      <i className="fa fa-hamburger fa-2x text-primary" />
                      <h5 className="mb-0">Dinner</h5>
                      <div className="d-flex justify-content-center">
                       <h5 style={{ color: "red" }}>Time Out!! Book before 04.00PM</h5>
                       </div>
                       </label>}
                    </div>
                    :
                    <div className="col-lg-4 wow fadeInUp" data-wow-delay="0.1s">
                      <label id="hey" className="service-item team-item text-center rounded overflow-hidden">
                        <div className="rounded-circle overflow-hidden m-5">

                          <img className="img-fluid" src={dinnera} alt="No pic" />
                        </div>
                        <i className="fa fa-utensils fa-2x text-primary" />
                        <h5 className="mb-0">Dinner</h5>
                        <div className="d-flex justify-content-center">
                          <input type="checkbox" className="form-check-input btn-square my-2" onChange={(e) => setDinner(e.target.checked)} />
                        </div>
                      </label>
                    </div>}
                  <div className="row g-4">
                    <div className="col-6 my-2 mx-auto">
                      <button className="btn btn-primary w-100 " type="submit">Submit</button>
                    </div>
                    {username.map((get, index) =>
                      <div className="col-6 my-2 mx-auto" key={index}>
                        <button className="btn btn-warning w-100 " type="button" onClick={() => edit(get._id)}>  {get.date !== date11 ? formattedNext : formattedToday}  EDIT</button>
                      </div>)}
                  </div>
                </div>
              }
            </div>
          </div>
        </form> : <Spinner></Spinner>}
      </>
    );
  }
}
