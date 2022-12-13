import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dates from './Dates';
import Foodss from './Foodss';
import Tbody2 from './Tbody2';
import "./td.css"


export default function Singleview() {
  const navigate = useNavigate();
  const [data, setData] = useState([])
  const [datas, setDatas] = useState([])
  const [order, setOrder] = useState([])
  const tomorrow = new Date();
  tomorrow.setDate(new Date().getDate() + 1)
  const nextdate = tomorrow.toLocaleDateString('en-US');
  const [filter, setFilter] = useState(new Date().toLocaleDateString())
  const time = new Date(Date.now()).toLocaleTimeString('en-US', { hour12: false }) >= '21:00:00'

  const todayss = new Date(Date.now());
  const todays = new Date(Date.now()).toLocaleDateString("en-US");
  const today1 = new Date(); const yyyy = today1.getFullYear(); let mm = today1.getMonth() + 1; // Months start at 0! 
  var monthcurrent = todayss.getFullYear() + '-' + (todayss.getMonth() + 1)
  const [currentmth,setCurrentmth]=useState(monthcurrent)

  let dd = today1.getDate();
  let dn = today1.getDate() + 1;
  if (dd < 10) dd = '0' + dd;
  if (dn < 10) dn = '0' + dn;
  if (mm < 10) mm = '0' + mm;
  const formattedToday = dd + '-' + mm + '-' + yyyy;
  const formattedNext = dn + '-' + mm + '-' + yyyy;

  function changedates(e) {
    setFilter(e.target.value);
    setCurrentmth(e.target.value)
  }

  function logout() {
    axios.get(`http://172.16.0.137:3001/logout`).then(res => res.data.message === "Successfully Logout" ? navigate('/') : alert('Invalid'))
  }

  useEffect(() => {
    axios.get(`http://172.16.0.137:3001/getorderedfood`).then(res => setOrder(res.data))
  }, [])

  useEffect(() => {
    axios.get(`http://172.16.0.137:3001/user`, { withCredentials: true }).then(res => setData(res.data))
  }, [])
  useEffect(() => {
    axios.get(`http://172.16.0.137:3001/aggregate`).then(res => setDatas(res.data))
  }, [])
  let username = order.filter((dat) => {
    return (dat.empid === data.password && dat.date === new Date(Date.now()).toLocaleDateString('en-US')) || (dat.empid === data.password && dat.date === nextdate)
  })

  return (

    <div className="container-xxl bg-white p-0">
      <div className="container-xxl py-0">
        <div className="container-xxl py-1 bg-dark hero-header">
          <div className="container text-center my-5 pt-0 pb-1">
            <h5 className="section-title ff-secondary text-center text-primary fw-normal">Food Menu</h5>
            <h2 className="mb-5" style={{ color: "white" }}>Your Orders</h2>
            <div className="row g-5 mb-3">
              <div className="col-4">
                <button className="btn btn-secondary" type="button" style={{ width: "100px" }} onClick={() => { navigate('/user') }}>Back</button>
              </div>
              <label className="col-4 ff-secondary text-center text-primary fw-normal ">
                <input type="month" className="btn btn-primary w-100 mx-3" onChange={changedates} />
              </label>
              <div className="col-4 ">
                <button className="btn btn-secondary" type="button" onClick={logout}>Logout</button>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div className="container-xxl pt-0 pb-0">
        <div className="container">
          {time ?
            <div className="container-xxl py-6 wow fadeInUp" data-wow-delay="0.1s">
              <div className="container text-center">
                <div className="row justify-content-center">
                  <div className="col-lg-6">
                    <i className="bi bi-exclamation-triangle display-1 text-primary"></i>
                    <h1 className="display-1">404</h1>
                    <h1 className="mb-4">Page Not Found</h1>
                    <p className="mb-4">Time Out!! ☹️ Sorry Contact Your Respective Admin </p>
                    <button className="btn btn-primary rounded-pill py-3 px-5 my-3" type="button" onClick={logout}>Go Back To Home</button>
                  </div>
                </div>
              </div>
            </div> :

            <div className="container-fluid pt-4 ">
              <div className="row g-4">
                <div className="col-12">
                  <div className="bg-light h-100 p-4">
                    {
                      username.map((get, index) => <>
                        <div key={index}>
                          <div className=" text-center h-50 p-1">
                            <h5 className="ff-secondary text-center text-dark fw-normal mb-3" style={{ color: "white" }}>{get.date === todays ? formattedToday : formattedNext}</h5>
                          </div>
                          <div className='row mb-4'>
                            <div className="col-5 text-center text-primary fw-normal">
                              {get.breakfast === "true" ? <h5 className="ff-secondary fw-normal">✅BreakFast</h5> : <h5 className="ff-secondary fw-normal">❌BreakFast</h5 >}
                            </div>
                            <div className="col-3 text-center text-primary fw-normal">
                              {get.lunch === "true" ? <h5 className="ff-secondary fw-normal">✅Lunch</h5> : <h5 className="ff-secondary fw-normal">❌Lunch</h5 >}
                            </div>
                            <div className="col-4  text-center text-primary fw-normal">
                              {get.dinner === "true" ? <h5 className="ff-secondary fw-normal">✅Dinner</h5> : <h5 className="ff-secondary fw-normal">❌Dinner</h5 >}
                            </div>
                          </div>
                        </div>
                      </>
                      )
                    }
                    <div className="table-responsive" style={{ borderTop: "1px solid black", borderRadius: "3px 3px 3px 3px" }}>
                      <table className="table">
                        <thead>
                          <tr>
                            <th className="text-center text-dark fw-bold" style={{ borderRight: "1px solid black", borderBottom: "1px solid black", borderLeft: "1px solid Black", backgroundColor: "lightblue" }} scope="col" rowSpan="2">Employee <br /><br /> </th>
                            <th className="text-center text-dark fw-bold" style={{ borderRight: "1px solid black", borderBottom: "1px solid black", backgroundColor: "lightblue" }} scope="col" rowSpan="2">ID <br /><br /></th>
                            <th className='text-center text-dark fw-bold' style={{ borderRight: "1px solid black", borderBottom: "1px solid black", backgroundColor: "lightblue" }} colSpan="3" >Month's Total Count<br></br></th>
                            <th className='text-center text-dark fw-bold' style={{ borderBottom: "1px solid black", borderRight: "1px solid black", backgroundColor: "lightblue" }} colSpan="3" >Month's Total Amount<br></br></th>
                            <Dates filter={filter}></Dates>
                          </tr>
                          <tr>
                            <Foodss filter={filter}></Foodss>
                          </tr>

                        </thead>
                        <Tbody2 filter={filter} data={data} datas={datas}></Tbody2>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

