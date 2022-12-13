import React from 'react';
import brkfasta from "../brkfast.jpg";
import luncha from "../lunch.jpg";
import dinnera from "../dinner.jpg";
import "./Order.css";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from './Spinner';
import "./td.css"
axios.defaults.withCredentials = true;

export default function View() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [breakfast, setBreakfast] = useState(Boolean);
  const [lunch, setLunch] = useState(Boolean)
  const [dinner, setDinner] = useState(Boolean);
  const [order, setOrder] = useState({});

  const today = new Date(Date.now()).toLocaleDateString("en-US");
  const tomorrow = new Date();
  tomorrow.setDate(new Date().getDate() + 1)
  const nextdate = tomorrow.toLocaleDateString('en-US');

  const today1 = new Date(); const yyyy = today1.getFullYear(); let mm = today1.getMonth() + 1; // Months start at 0! 
  let dd = today1.getDate();
  let dn = today1.getDate() + 1;
  if (dd < 10) dd = '0' + dd;
  if (dn < 10) dn = '0' + dn;
  if (mm < 10) mm = '0' + mm;
  const formattedToday = dd + '-' + mm + '-' + yyyy;
  const formattedNext = dn + '-' + mm + '-' + yyyy;

  let lunchnextdateonly = new Date(order.date).toLocaleDateString("en-US") === nextdate
  let dinnernextdateonly = new Date(order.date).toLocaleDateString("en-US") === nextdate

  useEffect(() => {
    axios.get(`http://172.16.0.137:3001/getoneorderedfood/${id}`).then(res => setOrder(res.data))
  })


  function submitbreakfast(id) {
    if (new Date(Date.now()).toLocaleTimeString('en-US', { hour12: false }) >= '22:00:00') { // change as per the time
      window.location.reload(false)
    }
    else {
      axios.patch(`http://172.16.0.137:3001/updatefood/${id}`, { breakfast: breakfast, lunch: order.lunch, dinner: order.dinner })
    }    
    navigate(`/user/${id}`)
    alert('Updated Breakfast')
  }



  function submitlunch(id) {
    if (new Date(Date.now()).toLocaleTimeString('en-US', { hour12: false }) >= '22:00:00') { // change as per the time
      window.location.reload(false)
    }
    else {
      axios.patch(`http://172.16.0.137:3001/updatefood/${id}`, { breakfast: order.breakfast, lunch: lunch, dinner: order.dinner })
    }   
    navigate(`/user/${id}`) 
    alert('Updated Lunch')
  }


  function submitdinner(id) {
    if (new Date(Date.now()).toLocaleTimeString('en-US', { hour12: false }) >= '22:00:00') { // change as per the time
      window.location.reload(false)
    }
    else {
      axios.patch(`http://172.16.0.137:3001/updatefood/${id}`, { breakfast: order.breakfast, lunch: order.lunch, dinner: dinner })
    } 
    navigate(`/user/${id}`)
    alert('Updated Dinner')
  }

  function logout() {
    axios.get(`http://172.16.0.137:3001/logout`).then(res => res.data.message === "Successfully Logout" ? navigate('/') : alert('Invalid'))
    //  navigate('/Login')
  }

  return (
    <>
      {order ? <div className="container-xxl bg-white p-0">
        <div className="container-xxl py-0">
          <div className="container-xxl py-1 bg-dark hero-header">
            <div className="container text-center my-5 pt-0 pb-1">
              <h5 className="section-title ff-secondary text-center text-primary fw-normal">Food Menu</h5>
              <h2 className="mb-5" style={{ color: "white" }}>Your Orders</h2>
              <div className="row g-5 mb-3">
                <div className="col-3 px-0">
                  <button className="btn btn-primary " style={{ width: "100px" }} type="button" onClick={() => { navigate('/user') }}>Back</button>
                </div>
                <div className="col-6  ff-secondary text-center text-primary fw-normal ">
                  <h5 className='ff-secondary text-primary'>Date<h5 className=' text-light my-2'>{order.date === today ? formattedToday : formattedNext}</h5></h5>
                </div>
                <div className="col-3 px-0">
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
                  {order.breakfast === "true" ? <h5 className='ff-secondary text-center text-dark fw-normal'>✅BreakFast</h5> : <h5 className='ff-secondary text-center text-dark fw-normal'>❌BreakFast</h5>}
                </div>
                <div className="col-4 ">
                  {order.lunch === "true" ? <h5 className='ff-secondary text-center text-dark fw-normal'>✅Lunch</h5> : <h5 className='ff-secondary text-center text-dark fw-normal'>❌Lunch</h5>}
                </div>
                <div className="col-4 ">
                  {order.dinner === 'true' ? <h5 className='ff-secondary text-center text-dark fw-normal'>✅Dinner</h5> : <h5 className='ff-secondary text-center text-dark fw-normal'>❌Dinner</h5>}
                </div>
              </div>
            </div>
            <form className="row g-5">

              {new Date(Date.now()).toLocaleDateString("en-US") === order.date ?
                <div className="col-lg-4   wow fadeInUp" data-wow-delay="0.1s">
                  <label id="hey" className=" service-item team-item text-center rounded overflow-hidden">
                    <div className="rounded-circle overflow-hidden m-4">
                      <img className="img-fluid" src={brkfasta} alt="No pic" />
                    </div>
                    <i className="fa fa-coffee fa-2x text-primary" />
                    <h5 className="mb-0">Breakfast</h5>
                    <div className="d-flex justify-content-center">
                      <h5 style={{ color: "red" }}>Time Out!! Book Yesterday</h5>
                    </div>
                  </label>
                </div>
                :
                <div className="col-lg-4   wow fadeInUp" data-wow-delay="0.1s">
                  <label id="hey" className=" service-item team-item text-center rounded overflow-hidden">
                    <div className="rounded-circle overflow-hidden m-5">
                      <img className="img-fluid" src={brkfasta} alt="No pic" />
                    </div>
                    <i className="fa fa-coffee fa-2x text-primary" />

                    <h5 className="mb-0">Breakfast</h5>
                    <div className="d-flex justify-content-center">
                      <input type='checkbox' className="form-check-input btn-square my-2" onChange={(e) => setBreakfast(e.target.checked)}></input>
                    </div>
                  </label>
                </div>}

              {new Date(Date.now()).toLocaleTimeString('en-US', { hour12: false }) >= '10:00:00' || order.date > new Date().toLocaleDateString("en-US") ?
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

              {new Date(Date.now()).toLocaleTimeString('en-US', { hour12: false }) >= '16:00:00' || order.date > new Date().toLocaleDateString("en-US") ?
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



              <div className="row g-3">
                <div className="col-4 my-2 mx-auto">
                  <button className="btn btn-warning w-100 " type="button" onClick={() => submitbreakfast(order._id)} disabled={new Date(Date.now()).toLocaleDateString("en-US") === order.date}>edit breakfast</button>
                </div>
                <div className="col-4 my-2 mx-auto">
                  <button className="btn btn-warning w-100 " type="button" onClick={() => submitlunch(order._id)} disabled={new Date(Date.now()).toLocaleTimeString('en-US', { hour12: false }) >= '10:00:00' && new Date(Date.now()).toLocaleDateString("en-US") === order.date}>Edit lunch</button>
                </div>
                <div className="col-4 my-2 mx-auto">
                  <button className="btn btn-warning w-100 " type="button" onClick={() => submitdinner(order._id)} disabled={new Date(Date.now()).toLocaleTimeString('en-US', { hour12: false }) >= '16:00:00' && new Date(Date.now()).toLocaleDateString("en-US") === order.date}>edit dinner</button>
                </div>
              </div>

            </form>
          </div>
        </div>
      </div> : <Spinner></Spinner>}
    </>
  );
}
