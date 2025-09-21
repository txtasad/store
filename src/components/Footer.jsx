// eslint-disable-next-line
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { topLogo } from "../assets/index";
import { FaTwitter } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { getAllSocialMediaReq } from "../API/Api";

const Footer = ({ packageCurrency = "$", setPackageCurrency = () => { } } = {}) => {
  useEffect(() => {
    getAllSocialMediaReq();
  }, []);

  const socialMediaData = useSelector(
    (state) => state.SocialMediaData.getAllMedia
  );

  const locate = useLocation();
  return (
    <>
      <div className="footer-section">
        <div className="container footer-contain">
          <div className="row justify-content-md-center">
            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-8 footer-text">
              <h1>TXTVIEWS STORE</h1>
              <h5>
                Innovating the Future: <br />Empowering Content, AI, and Digital Commerce.
              </h5>
              <img src={topLogo} alt="Logo TXTVIEWS" />
            </div>
            <div className="d-flex justify-content-around footer-contact-menu">
              <div className="row">
                <div className="col-md-6 col-sm-12 text-center">
                  <Link to="/Contact">Contact US</Link>
                  <Link to="/TermsAndCondition">Terms & Condition</Link>
                </div>
                <div className="col-md-6 col-sm-12 text-center">
                  <Link to="/PrivacyPolicy">Privacy Policy</Link>
                  <Link to="/RefundPolicy">Refund Policy</Link>
                </div>
                <div className="col-md-12 col-sm-12 text-center">
                  <Link to="/AboutDetails">About TXTVIEWS</Link>
                  {locate.pathname == "/" && <span>
                    <select
                      id="currencyRef"
                      className="currencySelector"
                      value={packageCurrency}
                      onChange={(e) => setPackageCurrency(e.target.value)}
                    >
                      <option value="$">$ - USD</option>
                      <option value="₹">₹ - INR</option>
                    </select>
                  </span>}
                </div>
              </div>
            </div>
            
          </div>
        </div>
        <div className="footer-copy-right-section">
          <div className="container">

            <div className="row">
              <div className="col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5">
                <div className="">
                  <div className="footer-copy-right-text">
                    <Link to="">TXTVIEWS Store | © txtviews.com</Link>
                  </div>
                </div>
              </div>

              <div className="col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2">
                <ul className="social-media-icon">
                  <li key={"sm-linkedin"} className="social-icon">
                    <Link to={"https://www.x.com/txtviewsai"} target="_blank" rel="noopener noreferrer" >
                      <FaTwitter />
                    </Link>
                  </li>
                </ul>
              </div>
              

              <div className="col-12 col-sm-12 col-md-5 col-lg-5 col-xl-5">
                <a className="text-copy-right"> All rights reserved. © 2025</a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
