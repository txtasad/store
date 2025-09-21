/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { isEmpty, isEmail } from "../../../helper/Validation";
import { topLogo, favicon2 } from "../../../assets/index";
import getBaseUrl from "../../../helper/BackendConnect";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { BiCheck } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { FaBitcoin } from "react-icons/fa";
const BASE_URL = getBaseUrl();

const OrderPage = () => {
  const clienturl = "https://store.txtviews.com/";
  const queryParams = new URLSearchParams(window.location.search);
  const ID = queryParams.get("_id");
  const addedCart = useSelector((state) => state.myCart);
  const [dataResponse, setDataResponse] = useState({});
  const [couponValid, setCouponValid] = useState("");
  const getUser = useSelector((state) => state.profile.userData);
  const [priceItem, setPriceItem] = useState({ discount: 0, net: 0, coupon: 0, mrp: 0 });
  const navigate = useNavigate();
  const Name = useRef(null);
  const Mobile = useRef(null);
  const Email = useRef(null);
  const Address = useRef(null);
  const Coupon = useRef("");
  const Country = useRef(null);
  const City = useRef(null);
  const State = useRef(null);
  const Zip = useRef(null);
  const [newListing, setNewListing] = useState(false);
  const [osdOrder, setOSDOrder] = useState(false);
  const [processingPay, setProcessingPay] = useState(false);


  useEffect(() => {
    if (dataResponse && typeof dataResponse === "string") {
      const formWrapper = document.getElementById("paymentData");
      formWrapper.innerHTML = dataResponse;
      const formElement = formWrapper.querySelector("form");
      if (formElement) {
        console.log('logging & redirecting to payment gateway!');
        formElement.submit();
      }
    }
  }, [dataResponse]);

  const sanitizeImageUrl = (url) => {
    return url.replace(/\\/g, "/");
  };

  const clearInputFields = () => {
    Name.current.value = "";
    Mobile.current.value = "";
    Address.current.value = "";
    Country.current.value = "";
    City.current.value = "";
    State.current.value = "";
    Zip.current.value = "";
  };


  return (
    <>
      <div className="container">
        <div className="order-page mt-2 mb-2">
          <div className="row justify-content-md-center">
            <div className="col-md-12 col-lg-6 order-page-data">
              <h3>Billing Details</h3>
              <label className="form-label">
                <i> Do NOT Refresh this page!</i>
              </label>
              <form className="row g-3">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                  <label htmlFor="inputName" className="form-label">
                    Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    ref={Name}
                    id="inputName"
                    defaultValue={addedCart?.cartUser?.name}
                  />
                </div>
                <label htmlFor="inputName" className="form-label">
                    *** ADD YOUR PAYMENT GATEWAY CODE & WEB HOOKS HERE ***
                  </label>
                </form>
            </div>


          </div>
        </div>
        <div className="row mb-4">
          <p className="text-center">
            TXTVIEWS | www.txtviews.com
          </p>
        </div>
      </div>
    </>
  );
};

export default OrderPage;
