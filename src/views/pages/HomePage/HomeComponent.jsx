/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { getToken } from "../../../helper/Session";
import NavBar from "../../../components/NavbarNew";
import Footer from "../../../components/Footer";
import cookies from "js-cookie";
import { Link } from "react-router-dom";
import { Accordion } from "react-bootstrap";
import ProductsList from "./ProductsList";
import { IoMdCloseCircle } from "react-icons/io";
import { TiSocialInstagram } from "react-icons/ti";
import {
  service5,
  ssl,
  crypto,
  txtviewsaiFeature01,
  creditcards,
} from "../../../assets/index";
import { useTranslation } from "react-i18next";
import { languages, pageTitle } from "../../../constant/Form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  readPlatformNewsReq,
  getFaqDataUserReq,
  readProductReq,
} from "../../../API/Api";
import { setAffiliate } from "../../../helper/Session";
import "swiper/css/effect-fade";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import getBaseUrl from "../../../helper/BackendConnect";
import { FaArrowTrendUp, FaCartShopping } from "react-icons/fa6";
import { FaChevronCircleUp, FaFreeCodeCamp } from "react-icons/fa";
// import { Helmet } from 'react-helmet';


const BASE_URL = getBaseUrl();
const token = getToken();

const HomeComponent = () => {
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const checkIfNewUser = () => {
      if (!localStorage.getItem("visitedBefore")) {
        localStorage.setItem("visitedBefore", true);
        const currentDate = new Date().toISOString();
        localStorage.setItem("firstVisitDate", currentDate);
        const newUserCount =
          parseInt(localStorage.getItem("newUserCount")) || 0;
        localStorage.setItem("newUserCount", newUserCount + 1);

        console.log("New user visited the website on", currentDate);
      }
    };

    checkIfNewUser();
  }, []);

  const sanitizeImageUrl = (url) => {
    return url.replace(/\\/g, "/");
  };

  let params = new URLSearchParams(window.location.search);
  let ref = params.get("ref");
  useEffect(() => {
    readPlatformNewsReq();
    readProductReq();
  }, []);
  useEffect(() => {
    getFaqDataUserReq();
  }, []);
  const blogItem = useSelector((state) => state.blog.List);
  const productFeaturedItems = useSelector((state) => state.product.featured);
  const productItems = useSelector((state) => state.product.list);
  const faqAllData = useSelector((state) => state.faqData.faqAllData);
  const commonAssistant = useSelector(
    (state) => state.assistantStore.commonAssistant
  );
  const articleAssistant = useSelector(
    (state) => state.assistantStore.articleAssistant
  );
  const socialMediaAssistant = useSelector(
    (state) => state.assistantStore.socialMediaAssistant
  );
  const economicsAssistant = useSelector(
    (state) => state.assistantStore.economicsAssistant
  );
  const emailAssistant = useSelector(
    (state) => state.assistantStore.emailAssistant
  );
  const websiteAssistant = useSelector(
    (state) => state.assistantStore.websiteAssistant
  );

  const handleSeeMore = () => {
    setShowAll(!showAll);
  };

  const allAssistants = [
    ...(commonAssistant || []),
    ...(articleAssistant || []),
    ...(socialMediaAssistant || []),
    ...(economicsAssistant || []),
    ...(emailAssistant || []),
    ...(websiteAssistant || []),
  ];

  const sortedAssistants = allAssistants.sort(
    (a, b) => parseInt(a.position) - parseInt(b.position)
  );

  const displayedAssistants = showAll
    ? sortedAssistants
    : sortedAssistants.slice(0, 8);
  const navigate = useNavigate();
  const currentLanguageCode = cookies.get("i18next") || "en";
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
  const [flagName, setFlagName] = useState(
    localStorage.getItem("language") || "en"
  );
  const { t } = useTranslation();
  useEffect(() => {
    localStorage.setItem("language", flagName);
  }, [flagName]);

  useEffect(() => {
    document.body.dir = currentLanguage.dir || "ltr";
    document.title = pageTitle;
  }, [currentLanguage, t]);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const sentences = [
    "AI",
    "Books",
    "Softwares",
    "Media"
  ];

  const [currentSentence, setCurrentSentence] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSentence(
        (prevSentence) => (prevSentence + 1) % sentences.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  function postTitleLimit(title, words) {
    const descriptionWords = title.split(" ");
    if (descriptionWords.length <= words) {
      return title;
    } else {
      const truncatedDescription = descriptionWords.slice(0, words).join(" ");
      return `${truncatedDescription} ...`;
    }
  }
  function truncateDescription(description, words) {
    const descriptionWords = description.split(" ");
    if (descriptionWords.length <= words) {
      return description;
    } else {
      const truncatedDescription = descriptionWords.slice(0, words).join(" ");
      return `${truncatedDescription} ...`;
    }
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }
  // text slider
  const scrollContainerRef = useRef(null);
  const [autoScrollInterval, setAutoScrollInterval] = useState(null);
  const [cursorOnSlider, setCursorOnSlider] = useState(false);
  const stopAutoScroll = () => {
    clearInterval(autoScrollInterval);
  };

  useEffect(() => {
    if (!cursorOnSlider) {
      startAutoScroll();
    } else {
      stopAutoScroll();
    }
    return stopAutoScroll;
  }, [cursorOnSlider]);

  const startAutoScroll = () => {
    if (scrollContainerRef.current) {
      setAutoScrollInterval(
        setInterval(() => {
          if (
            scrollContainerRef.current &&
            scrollContainerRef.current.scrollLeft +
            scrollContainerRef.current.offsetWidth >=
            scrollContainerRef.current.scrollWidth
          ) {
            scrollContainerRef.current.scrollLeft = 0;
          } else if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft += 1;
          }
        }, 30)
      );
    }
  };
  const onClickHandler = () => {
    if (!token) {
      navigate("/login/item");
      return;
    }
  };
  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }

  }, []);

  const [showPopup, setShowPopup] = useState(false);
  const [packageCurrency, setPackageCurrency] = useState("$");

  const onClickHandlerPlay = () => {
    setShowPopup(true);
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    <>
      <NavBar className={scrolled ? "scrolled" : ""} />
      <section className="hero-section" id="Home">
        <div className="container-fluid">
          <div className="row justify-content-md-center">
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
              <div className="hero-text-section">
                <h1>TXTVIEWS STORE</h1>
                <h5 className="hero-text">
                  Easy, Secure, & Money Back Guarantee!
                </h5>
              </div>
            </div>
          </div>
        </div>
      </section>
      {showPopup && (
        <div className="popup-overlay" onClick={handleClose}>
          <div
            className="popup-content-video"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-button-video" onClick={handleClose}>
              <IoMdCloseCircle />
            </button>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/HXkEccYqASo?si=pCKUwfbonaJTbbln"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      )}
      {/* (parseFloat(priceItem?.net) * 90).toFixed(2) */}
      <section className="home-page-section-02">
        <div className="container">
          <div className="home-page-section-title">
            <h2>Featured</h2>
          </div>
          <div className="row justify-content-md-center">
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-10">
              <div className="row">
                {productFeaturedItems.map((item, i) => {
                  const price = packageCurrency == "₹" ? item.priceINR : packageCurrency == "$" && item.priceCurrency == "$" ? item.price : item.price;
                  const priceDiscounted = (price * (100 - item.off) / 100);
                  return (
                    <div key={"featuredlist" + i} className="col-sm-12 col-md-12 col-lg-4 col-xl-4">
                      <Link to={`/productDetailsPage/${item._id}`} className={item.soldout ? "click-not" : null}>
                        <div className={item.soldout ? " section-02-cart-area soldcard" : "section-02-cart-area text-center"}>
                          <div className="row text-center">

                            <div className="sec-02-card">
                              {(item.soldout || item.newListing) && (<div className={item.soldout ? "product-tag sold" : "product-tag"}>
                                {item.soldout ? "SOLD" : item.newListing ? "NEW" : ""} {item.newListing && !item.soldout ? (<FaChevronCircleUp />) : null}
                              </div>)}
                              <img src={sanitizeImageUrl(BASE_URL + item.thumbnail)} />
                            </div>
                            <div className="align-self-end sec-02-card-body text-center">
                              <h2>{item.title}</h2>
                              <p>
                                <del>{item.off > 0.0 ? packageCurrency + price : ""}</del> {packageCurrency + (priceDiscounted)}
                                {item.off > 0.0 && <b className="off">  &nbsp;{item.off}% OFF <FaArrowTrendUp /></b>}
                              </p>
                            </div>
                            <div className="nave-join-popup text-center" onClick={() => console.log("")}>
                              BUY &nbsp;<FaCartShopping /> &nbsp;({packageCurrency + (priceDiscounted)} Only)
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  )
                }
                )}

              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="price">
        <ProductsList
          packageCurrency={packageCurrency}
          setPackageCurrency={setPackageCurrency}
        />
      </section>


      <section className="faq-section" id="FAQs">
        <div className="container">
          <div className="common-home-page-section-title">
            <h2>Have a Query ?</h2>
            <p>
              We hope to address some of the most commonly asked questions you
              may have concerning our product below.{" "}
            </p>
          </div>
          <div className="row justify-content-md-center">
            {faqAllData.map((item, i) => (
              <div className="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-10" key={"faqs" + i}>
                <Accordion>
                  <Accordion.Item eventKey={"faqs" + i} className="mb-4">
                    <Accordion.Header>{item.faqQuestion}</Accordion.Header>
                    <Accordion.Body>{item.faqAnswer}</Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="blog-section" id="Blog">
        <div className="container" id="#section1">
          <div className="common-home-page-section-title">
            <h2 className="mb-5">TXTVIEWS News</h2>
          </div>
          <div className="row">
            {blogItem.slice(0, 3).map((item, i) => (
              <div
                className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4"
                key={i}
              >
                <div className="home-page-blog-item">
                  <Link to={`/article/${item._id}`}>
                    <div className="blog-image-section">
                      <div className="blog-image">
                        <img
                          src={sanitizeImageUrl(BASE_URL + item.thumbnail)}
                          alt={item.title}
                        />
                      </div>
                      <div className="blog-image-text">
                        <div className="blog-date">
                          <p>{item.publisher}</p>{" "}
                          <p>{formatDate(item.createDate)}</p>
                        </div>
                        <h2>{postTitleLimit(item.title, 10)}</h2>
                        <p className="blog-text">
                          <div dangerouslySetInnerHTML={{ __html: truncateDescription(item.description, 24) }}></div>
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-page-more-section-05 ">
        <div className="container">
          <div className="more-section-body">
            <h2>We have got you covered!</h2>

            <div className="row more-section">
              <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
                <div className="d-flex justify-content-between more-section-item first-child">
                  <div className="text-section">
                    <h3>Customer Support</h3>
                    <p>For any inconvenience or query we have you covered.</p>
                  </div>
                  <div className="home-image-section">
                    <img
                      src={service5}
                      className="home-img-fluid"
                      width={160}
                      height={120}
                      alt="Contact us & Customer Support graphics"
                    />
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
                <div className="d-flex justify-content-between more-section-item">
                  <div className="text-section">
                    <h3>Security & Encryption!</h3>
                    <p><img
                      src={ssl}
                      alt="SSL Secured"
                      width={128}
                      height={64}
                    /></p>
                  </div>
                  <div className="home-image-section">
                    <img
                      src={txtviewsaiFeature01}
                      className="home-img-fluid"
                      width={160}
                      height={120}
                      alt="enhanced security graphics"
                    />
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
                <div className="d-flex justify-content-between more-section-item last-child">
                  <div className="text-section">
                    <h3>Payment Methods</h3>
                    <p>
                      {/* <img
                        src={crypto}
                        alt="payment gateways"
                        width={"128px"}
                        height={"64px"}
                      /> */}
                    </p>
                  </div>
                  <div className="home-image-section">
                    <img
                      src={creditcards}
                      className="home-img-fluid"
                      alt="payment gateways graphics"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="home-footer-section">
        <Footer
          packageCurrency={packageCurrency}
          setPackageCurrency={setPackageCurrency}
        />
      </section>

    </>
  );
};

export default HomeComponent;
