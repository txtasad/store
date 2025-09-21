import React, { useEffect, useState, useRef } from "react";
import Footer from "../../../components/Footer";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { readPlatformNewsReq, readProductReq, getPostbyID } from "../../../API/Api";
import NavBarNew from "../../../components/NavbarNew";
import getBaseUrl from "../../../helper/BackendConnect";
import { useParams } from "react-router-dom";
import { getToken } from "../../../helper/Session";
import { FaArrowTrendUp, FaRobot, FaSearchengin, FaImage, FaSquareShareNodes } from "react-icons/fa6";
import { FaTags } from "react-icons/fa";
import { toast } from "react-toastify";
import { Button, Badge, InputGroup } from 'react-bootstrap';
import { LuCircleArrowRight } from "react-icons/lu";
import { topLogo, separator } from "../../../assets/index";

const BASE_URL = getBaseUrl();
const BlogPage = () => {
  const [activeUser, setActiveUser] = useState(0);

  const { id } = useParams();
  const blogItem = useSelector((state) => state.blog.currentBlogData);
  const productFeaturedItems = useSelector((state) => state.product.featured);
  const platformNewsList = useSelector((state) => state.blog.List);
  const webAdminList = useSelector((state) => state.blog.webAdminData);
  const editorialList = useSelector((state) => state.blog.editorialData);
  const deskList = useSelector((state) => state.blog.deskData);
  const aichat = useRef(null);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success(`Link Copied!`);
  }
  useEffect(() => {
    getPostbyID({ id: id })
    readPlatformNewsReq();
    if (productFeaturedItems.length <= 0)
      readProductReq();
  }, []);

  useEffect(() => {
    if (platformNewsList.length > 0 || webAdminList.length > 0 || editorialList.length > 0) {
      const userActive =
        platformNewsList.find((data) => data._id === id) ||
        webAdminList.find((data) => data._id === id) ||
        editorialList.find((data) => data._id === id) ||
        deskList.find((data) => data._id === id);
      setActiveUser(userActive);
    }
    else {
      if (blogItem._id == id)
        setActiveUser(blogItem);
    }
  }, [blogItem]);

  const setActiveUserByClick = (item) => {
    setActiveUser(item);
  };

  function postTitleLimit(title, words) {
    const descriptionWords = title.split(" ");
    if (descriptionWords.length <= words) {
      return title;
    } else {
      const truncatedDescription = descriptionWords.slice(0, words).join(" ");
      return `${truncatedDescription} ...`;
    }
  }

  const sanitizeImageUrl = (url) => {
    return url.replace(/\\/g, "/");
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }
  function wordWrap(str, maxWidth) {
    if (!str) return [];
    const words = str.split(" ");
    let currentLine = words[0];
    const lines = [];
    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const testLine = `${currentLine} ${word}`;
      if (testLine.length <= maxWidth) {
        currentLine = testLine;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    return lines;
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
  const isLoggedIn = getToken();
  return (
    <>
      {isLoggedIn ? <Nave /> : <NavBarNew />}
      <section className="blog-section-area">
        <div className="container">
          <div className="row">
            <div className=" col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 col-xx-8 blog-right-side-show-read">
              <h2>{activeUser.title}</h2>
              <p>
                {activeUser.publisher} | Published {formatDate(activeUser.createDate) + " "}
                {activeUser.updateDate != null && <span>
                  | Last Updated {formatDate(activeUser.updateDate)}
                </span>}
              </p>
              <div className="blog-reading-section">
                <img
                  src={sanitizeImageUrl(BASE_URL + activeUser.coverImage)}
                />
                <div className="blog-reading-text-section">
                  <h2>{activeUser.title}</h2>
                  {
                    activeUser?.publisher?.toLowerCase() == "txtviews editor" ?
                      <div dangerouslySetInnerHTML={{ __html: activeUser.description }}></div> :
                      wordWrap(activeUser.description, 440).map((line, index) => (
                        <React.Fragment key={index}>
                          <p>{line}</p>
                          {index + 1 !==
                            wordWrap(activeUser.description, 40).length && <br />}
                        </React.Fragment>
                      ))
                  }
                </div>
              </div>

              {activeUser?.video == true && activeUser?.externalURL?.length > 0 && <div>
                <iframe width="95%" height="380"
                  src={activeUser?.externalURL}
                  title="YouTube video player" frameborder="1"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen></iframe>
              </div>}
              <hr />
              <div className="row blog-footer-section">
                <div className="row blog-social-media">
                  <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 text-start">
                    <FaTags />&nbsp; &nbsp; {activeUser.tag && activeUser.tag.toString()}
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 text-center">
                    <Link><h2 onClick={copyLink}>share  <FaSquareShareNodes /></h2></Link>
                  </div>
                </div>

                <div className="col-12 blog-tag-area">
                  <p>{activeUser?.author?.name?.length > 0 && activeUser?.author?.editorType == "PREMIUM" && <span>Author: {activeUser.author.name} <br />
                    This article has been written by, {activeUser.author.name}, a TXTVIEWS premium contributor.  <br /></span>}
                    {activeUser?.sourced?.length > 0 && <span>This article has been sourced from {activeUser.sourced}.</span>}</p>
                </div>
              </div>
            </div>

            {/* Sidebar */}

            <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xx-4 blog-left-category">
              <div className="row">

                {/* Recent News -  Sidebar */}
                <div className="col-12 col-sm-12  col-md-12 col-lg-12 blog-short-list">
                  <h2>Recent News</h2>
                  {platformNewsList.slice(0, 4).map((item, i) => activeUser._id != item._id && (
                    <div
                      onClick={() => setActiveUserByClick(item)}
                      key={item._id}
                    >
                      <div className="blog-image-side">
                        <div className="row">

                          <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                            <div className="blog-image-thumbnail">
                              <img
                                src={sanitizeImageUrl(
                                  BASE_URL + item.thumbnail
                                )}
                              />
                            </div>
                          </div>
                          <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 col-xxl-8">
                            <div className="blog-image-side-text">
                              <h2>{postTitleLimit(item.title, 7)}</h2>
                              <p dangerouslySetInnerHTML={{ __html: truncateDescription(item.description, 18) }}></p>
                              <div className="blog-list-page-date">
                                <h2>
                                  by &nbsp;
                                  <span className="text-info">
                                    {item.publisher} |
                                  </span>
                                  {" " + formatDate(item.createDate)}
                                </h2>
                              </div>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  ))}
                </div>




                {/* Featured Products - Sidebar */}
                <div className="col-12 col-sm-12  col-md-12 col-lg-12 blog-short-list">
                  <h2>Featured Products</h2>
                  {productFeaturedItems && productFeaturedItems.map((item) => {
                    const price = item.priceCurrency == "₹" ? product.priceINR : item.priceCurrency == "$" && item.priceCurrency == "$" ? item.price : item.price;
                    const priceDiscounted = (price * (100 - item.off) / 100);
                    return (
                      <Link to={`/productDetailsPage/${item._id}`} key={item._id}
                      >
                        <div className="blog-image-side">
                          <div className="row">
                            <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4">
                              <div className="blog-image-thumbnail">
                                <img
                                  src={sanitizeImageUrl(
                                    BASE_URL + item.thumbnail
                                  )}
                                />
                              </div>
                            </div>
                            <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8 col-xxl-8">
                              <div className="blog-image-side-text">
                                <h2>{postTitleLimit(item.title, 7)}</h2>
                                <p dangerouslySetInnerHTML={{ __html: truncateDescription(item.description, 20) }}></p>
                                <div className="blog-list-page-date">
                                  <h2>
                                    {item.off > 0 ? item.off + "% OFF | " : ""}
                                    <span className="off">
                                      Price <del>{item.off && item.off > 0.0 ? price : ""}</del>
                                      {" " + item.priceCurrency + priceDiscounted} <span className={item.soldout ? "admin" : "value-diff"}> | {item.soldout ? "SOLD" : "BUY NOW"} </span>
                                    </span>
                                  </h2>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>

                {/* ai div */}
                <div className="col-12 col-sm-12 col-md-12 blog-short-list">
                  <div className="row">
                    {/* Chat txtviews AI -  Left Sidebar */}
                    <div className="col-12 col-sm-12  col-md-12 col-lg-12 blog-short-list">
                      <h2>TXTVIEWS AI</h2>
                      <InputGroup className="ms-1">
                        <input
                          type="text"
                          className="form-control"
                          ref={aichat}
                          placeholder={" Lets chat or create an image "}
                        />
                        <Button variant="outline-dark" onClick={() => {
                          console.log("chat", aichat.current.value);
                          window.location = "https://ai.txtviews.com/";
                        }}>
                          <Badge bg="dark">
                            <LuCircleArrowRight />

                            <img src={topLogo} alt="Logo" width={24} height={24} />
                          </Badge>
                        </Button>
                      </InputGroup>

                      <div className="blog-image-side-text mt-2">
                        <p><i>
                          <FaImage style={{ color: '#0d6efd', marginRight: '6px' }} />
                          Let’s <strong>create an image</strong>,{' '}
                          <FaSearchengin style={{ color: '#198754', margin: '0 6px' }} />
                          <strong>research a topic</strong>, or simply{' '}
                          <FaRobot style={{ color: '#6f42c1', margin: '0 6px' }} />
                          <strong>chat with TXTVIEWS AI</strong> - your all-in-one platform for creativity and insight.

                        </i></p>
                      </div>
                    </div>

                  </div>


                </div>


              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home-footer-section ">
        <Footer />
      </section>
    </>
  );
};

export default BlogPage;
