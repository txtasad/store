import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  createStripeSettingDataReq,
  createPaypalSettingDataReq,
} from "../../API/Api";
import { Link, useNavigate } from "react-router-dom";
import { rootUser, editUser } from "../../constant/Form";

const ProjectSetting = () => {
  const navigate=useNavigate();
  const getUser = useSelector((state) => state.profile.userData);
  if(getUser?.[0]?.auth!="admin" || !(getUser?.[0]?.email==rootUser || getUser?.[0]?.email == editUser))
  {
    navigate("/homepage");
    return (<><span>"Error"</span></>);
  }
  const openAiAPIRef = useRef();
  // Refs for input fields
  const stripeClientKeyRef = useRef();
  const stripeSignatureRef = useRef();
  const stripeSecretKeyRef = useRef();
  const stripeSuccessURLRef = useRef();
  const stripeCancelURLRef = useRef();

  // Refs for input fields
  const paypalClientKeyRef = useRef();
  const paypalSignatureRef = useRef();
  const paypalSecretKeyRef = useRef();
  const paypalModeRef = useRef();
  const paypalSuccessURLRef = useRef();
  const paypalCancelURLRef = useRef();


  const handleSubmitStripeData = async (e) => {
    e.preventDefault();
    const stripeClientKey = stripeClientKeyRef.current.value;
    const stripeSignature = stripeSignatureRef.current.value;
    const stripeSecretKey = stripeSecretKeyRef.current.value;
    const stripeSuccessURL = stripeSuccessURLRef.current.value;
    const stripeCancelURL = stripeCancelURLRef.current.value;

    if (
      !stripeClientKey ||
      !stripeSignature ||
      !stripeSecretKey ||
      !stripeSuccessURL ||
      !stripeCancelURL
    ) {
      toast.error("All Stripe settings are required");
      return;
    }

    const formData = {
      stripeClientKey,
      stripeSignature,
      stripeSecretKey,
      stripeSuccessURL,
      stripeCancelURL,
    };
    try {
      const response = await createStripeSettingDataReq(formData);
      if (response) {
        stripeClientKeyRef.current.value = "";
        stripeSignatureRef.current.value = "";
        stripeSecretKeyRef.current.value = "";
        stripeSuccessURLRef.current.value = "";
        stripeCancelURLRef.current.value = "";
        toast.success("Stripe information updated successfully");
      } else {
        toast.error("Failed to update Stripe information");
      }
    } catch (error) {
      console.error("Error updating Stripe information:", error);
      toast.error("An error occurred while updating Stripe information");
    }
  };

  const handleSubmitPaypalData = async (e) => {
    e.preventDefault();
    const paypalClientKey = paypalClientKeyRef.current.value;
    const paypalSignature = paypalSignatureRef.current.value;
    const paypalSecretKey = paypalSecretKeyRef.current.value;
    const paypalMode = paypalModeRef.current.value;
    const paypalSuccessURL = paypalSuccessURLRef.current.value;
    const paypalCancelURL = paypalCancelURLRef.current.value;

    // Check if any required field is empty
    if (
      !paypalClientKey ||
      !paypalSignature ||
      !paypalSecretKey ||
      !paypalMode ||
      !paypalSuccessURL ||
      !paypalCancelURL
    ) {
      toast.error("All PayPal settings are required");
      return;
    }

    const formData = {
      paypalClientKey,
      paypalSignature,
      paypalSecretKey,
      paypalMode,
      paypalSuccessURL,
      paypalCancelURL,
    };

    try {
      const response = await createPaypalSettingDataReq(formData);
      if (response) {
        paypalClientKeyRef.current.value = "";
        paypalSignatureRef.current.value = "";
        paypalSecretKeyRef.current.value = "";
        paypalModeRef.current.value = "";
        paypalSuccessURLRef.current.value = "";
        paypalCancelURLRef.current.value = "";
        toast.success("PayPal information updated successfully");
      } else {
        toast.error("Failed to update PayPal information");
      }
    } catch (error) {
      console.error("Error updating PayPal information:", error);
      toast.error("An error occurred while updating PayPal information");
    }
  };

  return (
    <>
      <div className="admin-page-main-title pt-5">
        <h2>Update your API Keys</h2>
        <p style={{color:"red"}}>
        This section isn't activated yet. Please don't create any Listing yet! 
        </p>
      </div>

      <div className="admin-page-main-title mt-2">
        <h2>Update Your Stripe Payment Information</h2>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
      </div>
      <div className="row pt-3 justify-content-md-center">
        <div className="col-sm-12 col-md-12 col-lg-10 col-xl-6 blog-page-field">
          <div className="col-sm-12 pt-4">
            <label htmlFor="stripeClientKey" className="form-label">
              Stripe Client key
            </label>
            <div className="input-group">
              <input
                type="text"
                name="stripeClientKey"
                ref={stripeClientKeyRef}
                className="form-control"
                id="stripeClientKey"
              />
            </div>
          </div>
          <div className="col-sm-12 pt-4">
            <label htmlFor="stripeSignature" className="form-label">
              Stripe Signature
            </label>
            <div className="input-group">
              <input
                type="text"
                name="stripeSignature"
                ref={stripeSignatureRef}
                className="form-control"
                id="stripeSignature"
              />
            </div>
          </div>
          <div className="col-sm-12 pt-4">
            <label htmlFor="stripeSecreteKey" className="form-label">
              Stripe Secrete Key
            </label>
            <div className="input-group">
              <input
                type="text"
                name="stripeSecreteKey"
                ref={stripeSecretKeyRef}
                className="form-control"
                id="stripeSecreteKey"
              />
            </div>
          </div>
          <div className="col-sm-12 pt-4">
            <label htmlFor="stripeSuccess" className="form-label">
              Stripe Success redirect page URL
            </label>
            <div className="input-group">
              <input
                type="text"
                name="stripeSuccess"
                ref={stripeSuccessURLRef}
                className="form-control"
                id="stripeSuccess"
              />
            </div>
          </div>
          <div className="col-sm-12 pt-4">
            <label htmlFor="stripeCancelURL" className="form-label">
              Stripe Cancel redirect page URL
            </label>
            <div className="input-group">
              <input
                type="text"
                name="stripeCancelURL"
                ref={stripeCancelURLRef}
                className="form-control"
                id="stripeCancelURL"
              />
            </div>
          </div>
          <button
            onClick={handleSubmitStripeData}
            className="admin-plan-button mt-5 pt-3 pb-3"
            type="submit"
          >
            Save Change
          </button>
        </div>
      </div>
      <div className="admin-page-main-title mt-2">
        <h2>Update Project setting Information</h2>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
      </div>
      <div className="row pt-3 mb-5 justify-content-md-center">
        <div className="col-sm-12 col-md-12 col-lg-10 col-xl-6 blog-page-field">
          <div className="col-sm-12 pt-4">
            <label htmlFor="paypalClientKey" className="form-label">
              Paypal Client key
            </label>
            <div className="input-group">
              <input
                type="text"
                name="paypalClientKey"
                ref={paypalClientKeyRef}
                className="form-control"
                id="paypalClientKey"
              />
            </div>
          </div>
          <div className="col-sm-12 pt-4">
            <label htmlFor="paypalSignature" className="form-label">
              paypal Signature
            </label>
            <div className="input-group">
              <input
                type="text"
                name="paypalSignature"
                ref={paypalSignatureRef}
                className="form-control"
                id="paypalSignature"
              />
            </div>
          </div>
          <div className="col-sm-12 pt-4">
            <label htmlFor="paypalSecreteKey" className="form-label">
              Paypal Secrete Key
            </label>
            <div className="input-group">
              <input
                type="text"
                name="paypalSecreteKey"
                ref={paypalSecretKeyRef}
                className="form-control"
                id="paypalSecreteKey"
              />
            </div>
          </div>
          <div className="col-sm-12 pt-4">
            <label htmlFor="paypalMode" className="form-label">
              Paypal Mode
            </label>
            <div className="input-group">
              <input
                type="text"
                name="paypalMode"
                ref={paypalModeRef}
                className="form-control"
                id="paypalMode"
              />
            </div>
          </div>
          <div className="col-sm-12 pt-4">
            <label htmlFor="paypalSuccessURL" className="form-label">
              Paypal Success redirect page URL
            </label>
            <div className="input-group">
              <input
                type="text"
                name="paypalSuccessURL"
                ref={paypalSuccessURLRef}
                className="form-control"
                id="paypalSuccessURL"
              />
            </div>
          </div>
          <div className="col-sm-12 pt-4">
            <label htmlFor="paypalCancelURL" className="form-label">
              Paypal Cancel redirect page URL
            </label>
            <div className="input-group">
              <input
                type="text"
                name="paypalCancelURL"
                ref={paypalCancelURLRef}
                className="form-control"
                id="paypalCancelURL"
              />
            </div>
          </div>
          <button
            onClick={handleSubmitPaypalData}
            className="admin-plan-button mt-5 pt-3 pb-3"
            type="submit"
          >
            Save Change
          </button>
        </div>
      </div>
    </>
  );
};

export default ProjectSetting;
