import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Error404() {
const navigate = useNavigate();
  function backtohome() {
    navigate(`/`)
  }
  return (
<div className="container-xxl py-6 wow fadeInUp" data-wow-delay="0.1s">
    <div className="container text-center">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <i className="bi bi-exclamation-triangle display-1 text-primary"></i>
          <h1 className="display-1">404</h1>
          <h1 className="mb-4">Page Not Found</h1>
          <p className="mb-4">We’re sorry, Previous Session hasn't been Expired! Logout the Previous Session and try again?</p>
          <button className="btn btn-primary rounded-pill py-3 px-5" type="button" onClick={backtohome}>Go Back To Home</button>
           {/* <iframe src="https://chromedino.com/" frameBorder={0} scrolling="no" width="100%" height="100%" loading="lazy" /> */}
        </div>
      </div>
    </div>


  </div>
  )
}
