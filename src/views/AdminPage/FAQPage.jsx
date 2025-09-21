// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useRef } from "react";
import { MdDelete } from "react-icons/md";
import {
  faqDataCreateReq,
  getFaqDataAdminReq,
  faqUpdateReq,
  onOffFaqDataReq,
  deleteFaqDataReq,
} from "../../API/Api";
import { isEmpty } from "../../helper/Validation";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import ScaleLoader from "react-spinners/ScaleLoader";
import { AiFillEye } from "react-icons/ai";
import { HiEyeOff } from "react-icons/hi";
import { TbEdit } from "react-icons/tb";
import { Accordion } from "react-bootstrap";
import { MdDragIndicator } from "react-icons/md";
import { DeleteAlert } from "../../helper/PopupAlert";
import { Link, useNavigate } from "react-router-dom";
import { rootUser, editUser } from "../../constant/Form";


const FAQPage = () => {
  const getUser = useSelector((state) => state.profile.userData);
  const navigate = useNavigate();
  if (getUser?.[0]?.auth != "admin" || !(getUser?.[0]?.email == rootUser || getUser?.[0]?.email == editUser)) {
    navigate("/homepage");
    return (<><span>"Error"</span></>);
  }
  const faqQuestionRef = useRef();
  const faqAnswerRef = useRef();
  const [faqAnswer, setFaqAnswer] = useState(null);
  const [faqQuestion, setFaqQuestion] = useState(null);
  const [ide, setIde] = useState(null);

  useState(() => {
    getFaqDataAdminReq();
  }, []);
  const [loading, setLoading] = useState(false);
  const faqAllData = useSelector((state) => state.faqData.faqAllData);

  const handleEditClick = (id) => {
    const findMedia = faqAllData.find((item) => item._id === id);
    if (findMedia) {
      setFaqAnswer(findMedia.faqAnswer);
      setFaqQuestion(findMedia.faqQuestion);
      setIde(findMedia._id);
    } else {
      console.log(`Assistant with id ${id} not found.`);
    }
  };
  const handleUpdateFaq = (id) => {
    const updatedFaqQuestion = faqQuestionRef.current.value;
    const updatedFaqAnswer = faqAnswerRef.current.value;
    if (!updatedFaqQuestion) {
      toast.error("Social Media Link is required");
      return;
    }
    if (!updatedFaqAnswer) {
      toast.error("Social Media Icon is required");
      return;
    }

    setLoading(true);
    const updatedFaq = { updatedFaqQuestion, updatedFaqAnswer, id };

    faqUpdateReq(updatedFaq)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Faq Updated Successfully");
          faqUpdateReq();
        }
      })
      .catch((error) => {
        toast.error("An error occurred. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
    setTimeout(() => {
      setLoading(false);
      toast.success("Faq Updated Successfully");
    }, 1500);
  };

  const handleCreateFaq = () => {
    const faqQuestion = faqQuestionRef.current.value;
    const faqAnswer = faqAnswerRef.current.value;
    if (isEmpty(faqQuestion)) {
      toast.error("Question is required");
    } else if (isEmpty(faqAnswer)) {
      toast.error("Answer is required");
    } else {
      setLoading(true);
      const inputValue = { faqQuestion, faqAnswer };

      faqDataCreateReq(inputValue)
        .then((res) => {
          if (res.status === 200) {
            toast.success("Faq create successfully");
            setLoading(false);
            faqDataCreateReq();
          }
        })
        .catch((error) => {
          setLoading(false);
          toast.error("An error occurred. Please try again.");
          console.log(error);
        });
    }
  };

  const handleToggleClick = async (id, bullionData) => {
    try {
      const res = await onOffFaqDataReq({ id, bullionData });
      if (res && res.status === 200) {
        getFaqDataAdminReq();
        toast.success("Updated successfully");
      } else {
        getFaqDataAdminReq();
        toast.success("Update successfully");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error("Failed to update blog");
    }
  };

  const deleteItem = async (id) => {
    const Result = await DeleteAlert();
    if (Result.isConfirmed) {
      const DeleteResult = await deleteFaqDataReq(id);
      if (DeleteResult) {
        getFaqDataAdminReq();
      }
    }
  };

  return (
    <>
      <div className="admin-page-main-title pt-5">
        <div className=" ">
          <h2>Add your FAQs for your project</h2>
          <p>
            This will be displayed on FAQs section of your website.
          </p>
        </div>
      </div>

      <div className="row justify-content-md-center pt-4">
        <div className="col-sm-12 col-md-8 col-lg-8 col-xl-8 text-to-content-input">
          <Accordion>
            <Accordion.Item eventKey="0" className="mb-4">
              <Accordion.Header defaultValue={"false"}>
                Add Frequently Asked Questions (FAQs)
              </Accordion.Header>
              <Accordion.Body>
                <div className="row">
                  <div className="col-12 col-sm-6 col-md-6 col-lg-12 col-xl-12 social-media-setting">
                    <label>Question - FAQ</label>
                    <input defaultValue={faqQuestion} ref={faqQuestionRef} />
                  </div>

                  <div className="col-12 col-sm-6 col-md-6 col-lg-12 col-xl-12 social-media-setting mt-3">
                    <label>Answer - FAQ</label>
                    <input defaultValue={faqAnswer} ref={faqAnswerRef} />
                  </div>
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12  ">
                    <button
                      className="admin-plan-button mt-4 pt-3 pb-3"
                      onClick={() => {
                        if (ide) {
                          handleUpdateFaq(ide);
                        } else {
                          handleCreateFaq();
                        }
                      }}
                      disabled={loading}
                    >
                      {ide ? "Update F A Q" : "Create FAQ"}
                    </button>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>

      <div className="row mb-4 mt-5 justify-content-md-center">
        <div className="col-xl-9">
          {faqAllData.map((item, i) => (
            <div className="faq-page-admin-css">
              <div className="row">
                <div className="col-md-9 faq-text-section">
                  <p key={i}>
                    <b>Question:</b> {item.faqQuestion}
                  </p>
                  <p key={i}>
                    <b>Answer:</b> {item.faqAnswer}
                  </p>
                </div>
                <div className="col-md-3 faq-admin-icon">
                  <ul>
                    <li>
                      {item.active === "true" ? (
                        <AiFillEye
                          className="open-button"
                          onClick={() => handleToggleClick(item._id, "false")}
                        />
                      ) : (
                        <HiEyeOff
                          className="off-button"
                          onClick={() => handleToggleClick(item._id, "true")}
                        />
                      )}
                    </li>
                    <li>
                      <TbEdit onClick={handleEditClick.bind(this, item._id)} />
                    </li>
                    <li>
                      <MdDelete onClick={deleteItem.bind(this, item._id)} />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FAQPage;
