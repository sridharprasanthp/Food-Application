import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import hero from "../hero.png";
import ruru from "../RURUTEK - Logo Original.svg";
import { Icon } from 'react-icons-kit'
import { eye } from 'react-icons-kit/feather/eye'
import { eyeOff } from 'react-icons-kit/feather/eyeOff'

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);
  const navigate = useNavigate();


  const handleToggle = () => {
    if (type === 'password') {
      setIcon(eye);
      setType('text');
    }
    else {
      setIcon(eyeOff);
      setType('password');
    }
  }

  function submit(e) {
    e.preventDefault();
    if (email.length === 0 || password.length === 0) {
      alert('input field empty')
    }
    else {
      const data = {
        email: email,
        password: password
      }
      axios.post('http://172.16.0.137:3001/login', data).then((res) => { res.data.message === "Successfully Login" ? navigate('/user') : alert('Wrong Credential') })
      // props.falses()

    }
  }

  return (
    <div className="container-fluid position-relative d-flex">
      <div className="content">
        <div className="container-xxl position-relative p-0">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-2 px-lg-5 py-3 py-lg-1">
            <h1 className="text-primary m-0 " ><img src={ruru} width="190px" height="70px" alt="No pic"></img></h1>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <div className="navbar-nav ms-auto py-0 pe-4">
                <h1 className="text-primary m-0 " ><i className="fa fa-utensils me-3"></i></h1>
              </div>
            </div>
          </nav>
          <div className="content py-5 bg-dark hero-header">

            <div className="row align-items-center g-5">
              <div className="col-lg-6 text-center text-lg-start">
                <div className="p-5 wow fadeInUp" data-wow-delay="0.2s">
                  <h5 className="section-title ff-secondary text-start text-primary fw-normal">Reservation</h5>
                  <h1 className="text-white mb-4">Book Your Meal</h1>
                  <form onSubmit={submit}>
                    <div className="row g-3">

                      <div className="col-sm-12">
                        <div className=" input-group form-floating">
                          <input type="email" onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" placeholder="Email" />
                          <label htmlFor="email">Email</label>
                          <span ></span>
                        </div>
                      </div>

                      <div className="col-sm-12">
                        <div className=" input-group form-floating">
                          <input type={type} onChange={(e) => setPassword(e.target.value)} className="form-control" id="name" placeholder="Password" />
                          <label htmlFor="name" >Password</label>
                          <span className="input-group-text" onClick={handleToggle}><Icon icon={icon} className="far"></Icon></span>
                        </div>
                      </div>

                      <div className="col-12">
                        <button className="btn btn-primary w-100 py-3" type="submit">Login</button>
                      </div>
                    </div>
                  </form>
                </div>
                {/* "img/hero.png" */}
              </div>
              <div className="col-lg-6 text-center text-lg-end overflow-hidden ">
                <img className="img-fluid" src={hero} alt="No pic" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
