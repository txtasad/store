/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tab, Tabs } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
import { loadStripe } from "@stripe/stripe-js";
import { getToken } from "../../../helper/Session";
import PropTypes from "prop-types";
import {
  packageList,
  orderPackageReq,
  getAllAssistantUserReq,
  postPaymentReq,
  getStripeClientKey,
} from "../../../API/Api";
import getBaseUrl from "../../../helper/BackendConnect";
import { topLogo } from "../../../assets/index";


//frontend & backend connect function
const BASE_URL = getBaseUrl();
const token = getToken();
const PlanItem = ({ plan, key, setSelectedPlanId, setDataResponse }) => {
  const navigate = useNavigate();
  const [showPaymentButtons, setShowPaymentButtons] = useState(false);
  const handelPaymentButton = () => {
    setShowPaymentButtons(!showPaymentButtons);
    // setSelectedPlanId(plan._id);
    console.log("hi", key, plan._id);
  };
  const [selectedTagLabels, setSelectedTagLabels] = useState([]);
  const [selectedTagPremiumAssistant, setSelectedTagPremiumAssistant] =
    useState([]);
  const selectedKye = useSelector((state) => state.OrderList.clientKey);
  useEffect(() => {
    getStripeClientKey();
  }, []);

  const sanitizeImageUrl = (url) => {
    return url.replace(/\\/g, "/");
  };
  
  const addedCart = useSelector((state) => state.myCart);
  
  console.log('mem cart',addedCart);


  useEffect(() => {
    if (plan && plan.selectedVIP && plan.selectedVIP.length > 0) {
      const iconsAndNames = plan.selectedVIP.map((tag) => ({
        icon: tag.assistantIcon,
        name: tag.assistantName,
      }));
      setSelectedTagLabels(iconsAndNames);
    }
    console.log('mem cart',addedCart);
  }, [plan]);

  useEffect(() => {
    if (plan && plan.selectedPremium && plan.selectedPremium.length > 0) {
      const iconsAndNames = plan.selectedPremium.map((tag) => ({
        icon: tag.assistantIcon,
        name: tag.assistantName,
      }));
      setSelectedTagPremiumAssistant(iconsAndNames);
    }
  }, [plan]);

  const makePayment = async () => {
    if (!token) {
      navigate("/login/item");
      return;
    }
    const stripe = await loadStripe(selectedKye?.[0]?.stripeClientKey);
    const body = {
      price: plan.price,
      packageDuration: plan.packageDuration,
      packageType: plan.packageType,
      paymentMethod: "Stripe",
      stripeIcon: 'http://localhost:5173/src/assets/AllImage/HomeImage/HeroImage/Logo.png',
      // stripeIcon: '<i class="fa-brands fa-stripe-s"></i>',
    };

    const headers = {
      "Content-Type": "application/json",
    };

    try {
      console.log("connecting to stripe...")
      const response = await fetch(`${BASE_URL}payment-checkout-stripe`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });

      console.log("result from stripe--", response)

      const session = await response.json();

      console.log("result from stripe ses--", session)

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error);
      }
    } catch (error) {
      console.error("Error making payment:", error);
    }
  };


  const makePaymentPayu = async () => {
    if (!token) {
      navigate("/login/item");
      return;
    }


    const txnid = `TA${Date.now()}`;
    const email= "user@user.com";
    const body = {
      txnid: txnid,
      amount: 1,
      productinfo: "DEMO TA product for payu transaction",
      currency: "INR",
      firstname: "demo custo",
      email: email,
      phone: "9999999999",
      lastname: "lastname of customer",
      surl: `${BASE_URL}verifyPayuPayment/${txnid}`,
      furl: `${BASE_URL}verifyPayuPayment/${txnid}`,
      isAmountFilledByCustomer: false,
      udf1: "productId 26356722##1",
      udf2: "Sale Item",
      udf3: email,
      udf4: "",
      udf5: "",
      paymentMethod: "payu",
    };


    const headers = {
      "Content-Type": "application/json",
    };

    try {
      console.log("connecting to payu...")
      const response = await fetch(`${BASE_URL}getPayuClient`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });


      const session = await response.json();
      // const payuClient=session?.data?.client;
      // body.payuClient=payuClient;

      const responsePayment = await fetch(`${BASE_URL}initPayuPayment`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });
      console.log("result from payu ses--", session?.data, responsePayment);

      setDataResponse(await responsePayment.json());


      // const result = await stripe.redirectToCheckout({
      //   sessionId: session.id,
      // });

      // if (result.error) {
      //   console.error(result.error);
      // }
    } catch (error) {
      console.error("Error making payment:", error);
    }
  };

  const payPalPayment = async () => {
    if (!token) {
      navigate("/login/item");
      return;
    }
    try {
      const body = {
        price: plan.price,
        packageDuration: plan.packageDuration,
        packageType: plan.packageType,
        paymentMethod: "Stripe",
        stripeIcon: '<i class="fa-brands fa-stripe-s"></i>',
      };

      const paymentResponse = await postPaymentReq(body);

      if (paymentResponse && paymentResponse.paymentOfData) {
        console.log("Payment success:", paymentResponse);

        // Redirect to PayPal URL within the same tab
        window.location.href = paymentResponse.paymentOfData;
      } else {
        throw new Error("Invalid payment response");
      }
    } catch (paymentError) {
      toast.error("Payment failed. Please try again.");
      console.error("Payment error:", paymentError);
    }
  };
  return (
    <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 price-item mb-5">
      <div className="price-element">
        <div className="price-header-section-dashboard">
          <h5>{plan.packageType} plan</h5>
          <h1>
            {plan.packageCurrency}
            {plan.price}
            <span className="package-duration-title">
              /{plan.packageDuration == "Life-Time" ? "3 Years" : plan.packageDuration}
            </span>
          </h1>
        </div>

        <div className="price-body-section">
          <p>
            <FiCheckCircle />
            50$ Coupons : {plan.textToImage}
          </p>
          <p>
            <FiCheckCircle />
            100$ Coupons : {plan.imagination}
          </p>
          <p>
            <FiCheckCircle />
            150$ Coupons : {plan.imageCaption}
          </p>
          <p>
            <FiCheckCircle />
            <b> Validity :</b> {plan.packageDuration == "Life-Time" ? "3 Years"
              : plan.packageDuration == "Yearly" ? "1 Year"
                : plan.packageDuration == "Monthly" ? "1 Month"
                  : null}
          </p>
          <p>
            <FiCheckCircle />
            Additional <b>{plan.packageDuration == "Life-Time" ? "5% "
              : plan.packageDuration == "Yearly" ? "3% "
                : plan.packageDuration == "Monthly" ? "1% "
                  : null}</b> OFF - All Products
          </p>
        </div>
        <div className="price-icon-section">
          {/*           
          {selectedTagPremiumAssistant &&
            selectedTagPremiumAssistant.length > 0 && (
              <div>
                <h2>Premium Assistant</h2>
                {selectedTagPremiumAssistant.map((tag, index) => (
                  <span key={index}>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: tag.icon,
                      }}
                    />
                  </span>
                ))}
              </div>
            )} */}
        </div>
        {showPaymentButtons && (
          <div className="payment-button-area">
            <button className="btn-price" onClick={makePayment} type="button">
              Stripe
            </button>
            <button className="btn-price" onClick={makePaymentPayu} type="button">
              Payu
            </button>
          </div>
        )}
        <button onClick={handelPaymentButton}>Choose Plan</button>
      </div>
    </div>
  );
};

// Prop types validation for PlanItem component
PlanItem.propTypes = {
  plan: PropTypes.shape({
    packageType: PropTypes.string.isRequired,
    packageCurrency: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    packageDuration: PropTypes.string.isRequired,
    codeGenerate: PropTypes.number.isRequired,
    textToImage: PropTypes.number.isRequired,
    aiChatImage: PropTypes.number.isRequired,
    selectedTags: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        assistantIcon: PropTypes.string.isRequired,
        assistantName: PropTypes.string.isRequired,

        _id: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  setSelectedPlanId: PropTypes.func.isRequired,
  setDataResponse: PropTypes.func.isRequired,
  key: PropTypes.string.isRequired
};

const MemberShip = () => {
  const [selectedPlanId, setSelectedPlanId] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getAllAssistantUserReq();
    packageList("Monthly");
    packageList("Life-Time");
    packageList("Yearly");
  }, [dispatch]);

  const monthlyPackage = useSelector((state) => state.packageSlice.monthly);
  const yearlyPackage = useSelector((state) => state.packageSlice.yearly);
  const lifetimePackage = useSelector((state) => state.packageSlice.lifTime);
  const [dataResponse, setDataResponse] = useState({});
  const handleSocialDefault = (planId) => {
    console.log('select plan', planId)
    setSelectedPlanId(planId);
  };

  useEffect(() => {
    if (selectedPlanId) {
      console.log('selected plan', selectedPlanId)

      orderPackageReq(selectedPlanId);
      navigate(`/post/OrderPage?_id=${selectedPlanId}`);
    }
  }, [selectedPlanId, navigate]);

  useEffect(() => {
    if (dataResponse && typeof dataResponse === "string") {
      const formWrapper = document.getElementById("paymentData");
      formWrapper.innerHTML = dataResponse;
      const formElement = formWrapper.querySelector("form");
      if (formElement) {
        formElement.submit();
      }
    }
  }, [dataResponse]);

  return (
    <>
      <div
        id="paymentData"
        style={{ 'display':'none' }}
        type="hidden"
        className="hidden"
        dangerouslySetInnerHTML={{
          __html: dataResponse,
        }}></div>
      <div className="container">
        <div className="subscription-plan pt-5 mb-5">
          <div className="text-center title-price">
            <h2>Choose a plan for yourself</h2>
            <p>For the variety of needs of our clients.</p>
          </div>

          <Tabs
            defaultActiveKey="Monthly"
            transition={false}
            id="Naomi-tab-example"
            className="price-membership"
          >
            <Tab eventKey="Monthly" title="Monthly">
              <div className="row">
                {monthlyPackage?.map((item) => (
                  <PlanItem
                    key={item._id}
                    plan={item}
                    setSelectedPlanId={setSelectedPlanId}
                    setDataResponse={setDataResponse}
                    onClick={() => handleSocialDefault(item._id)}
                  />
                ))}
              </div>
            </Tab>
            <Tab eventKey="Yearly" title="Yearly">
              <div className="row">
                {yearlyPackage?.map((item) => (
                  <PlanItem
                    key={item._id}
                    plan={item}
                    onClick={() => handleSocialDefault(item._id)}
                  />
                ))}
              </div>
            </Tab>
            <Tab eventKey="Lifetime" title="Lifetime">
              <div className="row">
                {lifetimePackage?.map((item) => (
                  <PlanItem
                    key={item._id}
                    plan={item}
                    onClick={() => handleSocialDefault(item._id)}
                  />
                ))}
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default MemberShip;
