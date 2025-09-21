import React, { useEffect, useState, useRef } from "react";
import Nave from "../../../components/NavbarNew";
import CarouselProducts from "../../../components/CarouselProducts";
import Footer from "../../../components/Footer";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { readPlatformNewsReq, readProductReq, addToCart } from "../../../API/Api";
import NavBar from "../../../components/NavbarNew";
import getBaseUrl from "../../../helper/BackendConnect";
import { useParams } from "react-router-dom";
import { getToken } from "../../../helper/Session";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaArrowTrendUp, FaCartShopping, FaShield, FaSquareShareNodes } from "react-icons/fa6";
import { FaRobot, FaSearchengin, FaImage } from "react-icons/fa6";
import { FaTags } from "react-icons/fa";
import { Button, Badge, InputGroup } from 'react-bootstrap';
import { LuCircleArrowRight } from "react-icons/lu";
import { topLogo, separator } from "../../../assets/index";
import { pageTitle, app, languages } from "../../../constant/Form";

const BASE_URL = getBaseUrl();


const ProductDetailsPage = () => {

  const { id } = useParams();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupOpenSales, setIsPopupOpenSales] = useState(false);
  const navigate = useNavigate();
  const BlogItem = useSelector((state) => state.blog.List);
  const aichat = useRef(null);


  const productFeaturedItems = useSelector((state) => state.product.featured);
  const addedCart = useSelector((state) => state.myCart);
  const productItem = useSelector((state) => state.product.list);
  const getUser = useSelector((state) => state.profile.userData);
  const [itemPrice, setItemPrice] = useState({ mrp: 0, discount: 0, net: 0 });


  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success(`Link Copied!`);
  }

  const [activeProduct, setActiveProduct] = useState([]);
  const [featuredProduct, setFeaturedProduct] = useState([]);

  useEffect(() => {
    if (BlogItem.length <= 0)
      readPlatformNewsReq();
    if (productItem.length <= 0) {
      readProductReq().then(console.log("endpoint read: success!"));
    }
  }, []);

  useEffect(() => {
    const mrp = activeProduct.price;
    const discount = activeProduct.price * (activeProduct.off / 100);
    const net = activeProduct.price * ((100 - activeProduct.off) / 100);
    setItemPrice({ mrp, discount, net })
  }, [addedCart, activeProduct]);



  useEffect(() => {
    if (productFeaturedItems.length > 0) {
      const active = productItem.find((data) => data._id == id);
      const featured = productFeaturedItems.filter((data) => data._id != id);
      setActiveProduct(active);
      setFeaturedProduct(featured)
    }
  }, [productFeaturedItems, productItem, id]);


  const setActiveProductByClick = (item) => {
    setActiveProduct(item);
    const featured = productFeaturedItems.filter((data) => data._id != item._id);
    setFeaturedProduct(featured)
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

  const closePopupSales = () => {
    setIsPopupOpenSales(false);
  };

  const handleBuyNow = () => {
    console.log('.buy now');
    const cart = { cartUser: getUser?.[0] || {}, cartOrder: activeProduct, cartTotalBD: itemPrice.mrp, cartTotalDisc: itemPrice.discount, cartNetTotal: itemPrice.net }
    addToCart(cart);
    navigate("/checkout/orderPage");
    // navigate(`/post/OrderPage?_id=${"67f9d64d7c5f9ddaf9fbbe34"}`)

  }
  const isLoggedIn = getToken();
  return (
    <>
      {isLoggedIn ? <Nave /> : <NavBar />}
      <section className="blog-section-area">
        <div className="container">
          <div className="row">
            <div className=" col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 col-xx-8 blog-right-side-show-read">
              <h2>{activeProduct && activeProduct.title}</h2>
              <p>
                <span className="value-diff">
                  {activeProduct.newListing ? "Premium Listing" : null}
                  {activeProduct.newListing && activeProduct.off > 0.0 ? " | NEW - Sales Discount Applicable" : ""} {activeProduct.newListing && (<FaArrowTrendUp />)}
                  {activeProduct.preorder && activeProduct.releaseDate ? " | Releasing " + formatDate(activeProduct.releaseDate) : null}
                </span>
                {(activeProduct.newListing || activeProduct.preorder) && <br />}
                <FaShield /> Safe & Secure Payments. Unique & Authentic products.
              </p>
              <div className="blog-reading-section">

                {activeProduct.productImages && (
                  <CarouselProducts slides={activeProduct.productImages} />
                )}

                <div className="blog-reading-text-section">
                  <h2>{activeProduct.title}</h2>
                  <div dangerouslySetInnerHTML={{ __html: activeProduct.description }}></div>
                </div>
              </div>
              <div className="row blog-footer-section">

                <div className="col-12 col-sm-12 col-md-12 col-lg-12 mt-n5">
                  <h2 className="list-price"><span className="list-price">Special Price <del>{activeProduct.off && activeProduct.off > 0.0 ? activeProduct.priceCurrency + (activeProduct.price).toFixed() : ""}</del> </span>{activeProduct.priceCurrency + (itemPrice.net)}</h2>
                  <h2><b className="off">{activeProduct.off && activeProduct.off > 0.0 ? activeProduct.off : "0"}% OFF  <FaArrowTrendUp /></b></h2>
                  <div className="nave-join-popup text-center" onClick={() => handleBuyNow()}>
                    {activeProduct.preorder ? "Pre Order" : "BUY"} &nbsp;<FaCartShopping /> &nbsp;( {activeProduct.priceCurrency + (itemPrice.net)} Only&nbsp;)
                  </div>
                  {activeProduct.preorder ? <p><i>You will be notified on your {app} account and email as soon as pre-order products are released!</i></p> : <br />}
                </div>
                <hr />
                <div className="row blog-social-media">
                  <div className="col-8 text-start">
                    <FaTags />&nbsp; &nbsp; {activeProduct.tags && activeProduct.tags.toString()}
                  </div>
                  <div className="col-4 text-center">
                    <Link><h2 onClick={copyLink}>share  <FaSquareShareNodes /></h2></Link>
                  </div>
                </div>
              </div>
            </div>

            {/* sidebar */}
            <div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xx-4 blog-left-category">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                  <div className="side-category-section">
                    <h2>Specifications</h2>
                    {activeProduct.descriptionMarkers && activeProduct.descriptionMarkers.map((item, i) =>
                    (<div className="Category-list" key={"specifications" + i}>
                      <h2>{item.category}</h2>
                      <h2 className="value-diff">{item.value}</h2>
                    </div>
                    ))
                    }
                  </div>
                </div>

                {/* BUY button - sidebar */}
                <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                  <h2 className="list-price">
                    <span className="list-price">Special Price <del>{activeProduct.off && activeProduct.off > 0.0 ? activeProduct.priceCurrency + (activeProduct.price).toFixed() : ""}</del>
                      {" " + activeProduct.priceCurrency + (activeProduct.price * (100 - activeProduct.off) / 100)}
                    </span></h2>
                  <h2><b className="off">
                    {activeProduct.off && activeProduct.off > 0.0 ? activeProduct.off.toString() + " % OFF" : ""}
                    {activeProduct.off && activeProduct.off > 0 ? <FaArrowTrendUp /> : null}
                  </b></h2>
                  <div className="nave-join-popup text-center" onClick={() => handleBuyNow()}>
                    {activeProduct.preorder ? "Pre Order" : "BUY"} &nbsp;<FaCartShopping /> &nbsp;( {activeProduct.priceCurrency + (itemPrice.net)} Only )
                  </div>
                </div>

                {/* Featured Products - Sidebar */}
                <div className="col-12 col-sm-12  col-md-12 col-lg-12 blog-short-list">
                  <h2>Featured Products</h2>
                  {featuredProduct.length > 0 && featuredProduct.map((item) => {
                    const price = item.priceCurrency == "₹" ? product.priceINR : item.priceCurrency == "$" && item.priceCurrency == "$" ? item.price : item.price;
                    const priceDiscounted = (price * (100 - item.off) / 100);
                    return (
                      <div
                        onClick={() => setActiveProductByClick(item)}
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
                                <p dangerouslySetInnerHTML={{ __html: truncateDescription(item.description, 20) }}></p>
                                <div className="blog-list-page-date">
                                  <h2>
                                    {item.off > 0 ? item.off + "% OFF | " : ""}
                                    <span className="off">
                                      Price <del>{item.off && item.off > 0.0 ? (item.priceCurrency + price) : ""}</del>
                                      {" " + item.priceCurrency + priceDiscounted}  <span className={item.soldout ? "admin" : "value-diff"}> | {item.soldout ? "SOLD" : "BUY NOW"} </span>
                                    </span>
                                  </h2>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Recent News - Sidebar */}
                <div className="col-12 col-sm-12  col-md-12 col-lg-12 blog-short-list">
                  <h2>Recent News</h2>
                  {BlogItem && BlogItem.slice(0, 3).map((item) => (
                    <Link to={`/article/${item._id}`} key={item._id}>
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
                              <p dangerouslySetInnerHTML={{ __html: truncateDescription(item.description, 12) }}></p>
                              <div className="blog-list-page-date">
                                <h2>
                                  by
                                  <span className="admin">
                                    {item.publisher}
                                  </span> |&nbsp;
                                  {formatDate(item.createDate)}</h2>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
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

      <section className="fab-insta text-center">
        <span onClick={() => handleBuyNow()}>
          {activeProduct.preorder ? "Pre Order" : "BUY"} &nbsp;<FaCartShopping /> &nbsp;( {activeProduct.priceCurrency + (itemPrice.net)} Only )
        </span>
      </section>
    </>
  );
};

export default ProductDetailsPage;
