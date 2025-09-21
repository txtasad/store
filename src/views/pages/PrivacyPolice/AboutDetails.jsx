import React from "react";
import NavBarNew from "../../../components/NavbarNew";
import Footer from "../../../components/Footer";
import { getToken } from "../../../helper/Session";
import { topLogoTor } from "../../../assets/index";


const featuredEnabled = false;
const AboutDetails = () => {
  const isLoggedIn = getToken();
  const featuredLogos = [
    { img: "src/assets/AllImage/ProductsandSales/Products/logo-business-standard.png", name: "Business Standard", link: "https://www.business-standard.com/article/news-ians/use-app-to-avoid-landslide-blocked-roads-in-sikkim-darjeeling-116041800259_1.html" },
    { img: "src/assets/AllImage/ProductsandSales/Products/logo-outlook.png", name: "Outlook India", link: "https://www.outlookindia.com/business-spotlight/revolutionizing-indian-economy-upi-s-rise-in-india-s-financial-landscape-insights-from-mohammad-asad-s-iit-kanpur-research-news-341104" },
    { img: "src/assets/AllImage/ProductsandSales/Products/IIMA.png", name: "IIM Ahmedabad", link: "https://alumni.iima.ac.in/" },
    { img: "src/assets/AllImage/ProductsandSales/Products/logo-HTTech.webp", name: "Hindustan Times Tech", link: "https://tech.hindustantimes.com/tech/news/use-app-to-avoid-landslide-blocked-roads-in-sikkim-darjeeling-story-mMClbb9cuN0a5zip1mUTmK.html" },
    { img: "src/assets/AllImage/ProductsandSales/Products/logo-net.png", name: "New Edge Times", link: "https://www.newedgetimes.com/tech-maverick-mohammad-asad-a-trailblazing-odyssey-from-humbles-beginnings-to-global-impact/" },
    { img: "src/assets/AllImage/ProductsandSales/Products/logo-TechBullion.png", name: "Tech Bullion", link: "https://techbullion.com/a-conversation-unraveling-the-indian-economy-with-mohammad-asad-an-emerging-financial-prodigy-and-a-brilliant-researcher/" },
  ]
  return (
    <>
      {<NavBarNew />}
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 col-xxl-10 trams-condition-page">
            <h2>About</h2>
            <p className="trams-title">TXTVIEWS</p>
            <p className="text-center"><img src={topLogoTor} alt="Logo TXTVIEWS" width={155} /></p>

            <div className="trams-condition-text-area">
              <div>
                <p><strong>TXTVIEWS Store</strong></p>

                <p>
                  🛒 Our secure digital storefront offers a curated range of digital products and services designed to meet the evolving needs of modern consumers.
                  Operating on a transparent, pay-per-product model, we ensure fast and reliable delivery through secure digital channels.
                  With plans to expand our offerings to include licensed digital content such as eBooks and online courses,
                  we strive to provide a versatile, trustworthy marketplace for a broad spectrum of digital assets and experiences.
                </p>

                <hr />


                <section id="company-overview">

                  <div>
                    <p><strong>Business Description - TXTVIEWS (txtviews.com)</strong></p>
                    <p><em>Innovating the Future: Empowering Content, AI, and Digital Commerce.</em></p>
                  </div>

                  <div>
                    <p><strong>TXTVIEWS</strong> is a multi-platform digital technology company at the forefront of innovation across content, artificial intelligence, and e-commerce. We serve a diverse global audience of creators, consumers, and innovators through three complementary business verticals:</p>
                  </div>

                  <div>
                    <p><strong>TXTVIEWS News - Media & Insights</strong><br />
                      📰 Our flagship news platform delivers timely, expert coverage and in-depth analysis of technology, artificial intelligence, and finance. Through a dynamic mix of daily news, featured blogs, and sponsored content, we empower professionals, researchers, and enthusiasts with the knowledge and insights needed to navigate an ever-evolving digital landscape.</p>
                  </div>

                  <div>
                    <p><strong>TXTVIEWS AI</strong><br />
                      🤖 TXTVIEWS AI is a cutting-edge content creation platform that enables users to effortlessly generate high-quality voiceovers, images, written materials, and chatbot interactions. Powered by leading AI models such as GPT-4, DALL·E, and Whisper and driven by our proprietary CEMAFusion Engine, TXTVIEWS AI offers unparalleled model flexibility and seamless multi-model comparisons  -  all accessible within a single, intuitive dashboard. Designed to streamline content production for creators, marketers, educators, and businesses, this platform lowers barriers and accelerates AI-driven creativity at scale.</p>
                  </div>

                  <div>
                    <p><strong>TXTVIEWS Store - Digital Commerce</strong><br />
                      🛒 Our secure digital storefront offers a curated range of digital products and services designed to meet the evolving needs of modern consumers. Operating on a transparent, pay-per-product model, we ensure fast and reliable delivery through secure digital channels. With plans to expand our offerings to include licensed digital content such as eBooks and online courses, we strive to provide a versatile, trustworthy marketplace for a broad spectrum of digital assets and experiences.</p>
                  </div>
                </section>

                <footer>
                  <p>© 2025 TXTVIEWS. All rights reserved.</p>
                </footer>

                <hr />

                <section>
                  <div>
                    <p><strong>Intellectual Property and Copyright Disclaimers</strong><br />
                      ⚠️ Any trademarks, service marks, logos, or brand names mentioned or displayed on our platforms are the property of their respective owners.
                      These trademarks are used solely for informational and identification purposes, and no infringement or endorsement is intended or implied by TXTVIEWS NEWS, TXTVIEWS.com, or TXTVIEWS AI.
                    </p>

                    <p>
                      📜 The digital products and services offered through our platforms respect all applicable copyright, trademark, and licensing agreements.
                      We take necessary steps to ensure that our offerings comply with rights holders’ policies if any concerns are brought to our attention.
                    </p>

                    <p>
                      🛠️ Our AI content generation tools operate within the scope of fair use and applicable AI content guidelines.
                      Users are responsible for ensuring that their use of generated content complies with all relevant intellectual property rights and legal standards.
                    </p>
                  </div>
                </section>
              </div>


              <button>Thanks for visiting txtviews.com</button>
            </div>
          </div>
        </div>

        <div className="row">
          {featuredEnabled && featuredLogos.map((val, i) => (
            <div
              className="col-sm-12 col-md-6 col-lg-4 m-15px-tb"
              key={i}
              data-aos="fade-right"
              data-aos-duration="1200"
              data-aos-delay={val.delayAnimation}
            >
              <div className="feature-box-featured d-flex row">
                <div className="iconfs col-7">
                  <a href={val.link} target="_blank">
                    <img
                      width={155}
                      height={65}
                      style={{ height: "fit-content", backgroundColor: i == 5 ? "rgba(176, 180, 205, 0.6)" : "" }}
                      src={`${val.img}`}
                      alt="media logo"
                    />
                  </a>
                </div>
                <div className="col-1"></div>
                <div className="media-body col-4">
                  <p>{val.name}</p>
                </div>
              </div>

            </div>
            // End .col
          ))}
        </div>

      </div>
      <section className="home-footer-section ">
        <Footer />
      </section>
    </>
  );
};

export default AboutDetails;
