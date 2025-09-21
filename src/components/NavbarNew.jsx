// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import { Container, Navbar, Dropdown, Nav } from "react-bootstrap";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import i18next from "i18next";
import cookies from "js-cookie";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { useTranslation } from "react-i18next";
import { languages, pageTitle } from "../constant/Form";
import { Link } from "react-router-dom";
import { topLogo, sales15, favicon } from "../assets/index";
import Popup from "./Popup";
import { getToken } from "../helper/Session";

import { CHeaderNav } from "@coreui/react";

import AppHeaderDropdown from "./header/AppHeaderDropdown";
import { FaArrowTurnUp, FaClipboardQuestion, FaHandHoldingDollar, FaHeadset, FaBrain, FaNewspaper, FaPercent } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { FaGamepad, FaHome } from "react-icons/fa";
const token = getToken();

const NavBar = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupOpenSales, setIsPopupOpenSales] = useState(false);
  const savedTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState(savedTheme || "light-theme");

  const toggle = () => {
    const newTheme = theme === "light-theme" ? "dark-theme" : "light-theme";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const openPopup = () => {
    setIsPopupOpen(true);
  };
  const closePopup = () => {
    setIsPopupOpen(false);
  };
  const openPopupSales = () => {
    setIsPopupOpenSales(true);
  };
  const closePopupSales = () => {
    setIsPopupOpenSales(false);
  };
  const [flagName, setFlagName] = useState(
    localStorage.getItem("language") || "en"
  );
  const currentLanguageCode = cookies.get("i18next") || "en";
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();

  useEffect(() => {
    document.body.dir = currentLanguage.dir || "ltr";
    document.title = pageTitle;
    var link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = favicon;
  }, [currentLanguage, t]);

  useEffect(() => {
    localStorage.setItem("language", flagName);
  }, [flagName]);

  const handelChange = (code) => {
    i18next.changeLanguage(code);
    setFlagName(code);
  };
  const [isSticky, setIsSticky] = useState(false);
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const locate = useLocation();
  return (
    <>
      <Navbar
        expand={"md"}
        className={`navbar-body p-1 ${isSticky ? "sticky" : ""}`}
      >
        <Container>
          <Navbar.Brand>
            {locate.pathname == "/" ? (<ScrollLink to="Home" smooth={true} duration={500}>
              <img src={topLogo} alt="Logo" style={{ minHeight: "64px", maxWidth: "96px", maxHeight: "96px" }} />
            </ScrollLink>) : (
              <Link to="/" smooth={true} duration={500}>
                <img src={topLogo} alt="Logo" style={{ minHeight: "64px", maxWidth: "96px", maxHeight: "96px" }} />
              </Link>
            )}
          </Navbar.Brand>

          <Nav className="nave-item-top nave-item-home">
            {locate.pathname == "/" ? (<ScrollLink to="Home" smooth={true} duration={500}>
              Store <FaArrowTurnUp />
            </ScrollLink>) : (
              <Link to="/" smooth={true} duration={500}>
                Store <FaHome />
              </Link>)}

            <Link to="/Contact" smooth={true} duration={500}>
              Support <FaHeadset />
            </Link>
            {locate.pathname == "/" && (<ScrollLink to="FAQs" smooth={true} duration={500}>
              FAQs <FaClipboardQuestion />
            </ScrollLink>)}
            <Link to="https://ai.txtviews.com" smooth={true} duration={500}>
              AI <FaBrain />
            </Link>
            <Link to="https://txtviews.com" smooth={true} duration={500}>
              News <FaNewspaper />
            </Link>

          </Nav>

          <div className="Nave-right-item-dropdown">



            {token ? (
              <CHeaderNav className="ms-3">
                <AppHeaderDropdown />
              </CHeaderNav>
            ) : (
              <div>
                <div className="nave-join-popup" onClick={openPopup}>
                  Login &nbsp; <i class="fa-solid fa-circle-user"></i>
                </div>
                {isPopupOpen && (
                  <Popup isPopupOpen={isPopupOpen} onClose={closePopup} />
                )}
              </div>
            )}
          </div>

        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
