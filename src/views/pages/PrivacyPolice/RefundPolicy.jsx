import React from "react";
import NavBarNew from "../../../components/NavbarNew";
import Footer from "../../../components/Footer";
import { getToken } from "../../../helper/Session";

const RefundPolicy = () => {
  const isLoggedIn = getToken();
  return (
    <>
      {<NavBarNew />}
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 col-xxl-10 trams-condition-page">
            <h2>Refund Policy</h2>
            <p className="trams-title">TXTVIEWS</p>
            <div className="trams-condition-text-area">


              <h3>Refund & Cancellation Policy for Digital Products</h3>

              <p><strong>Effective Date:</strong> 15 August, 2025</p>
              <p><strong>Applies To:</strong> All digital products sold via store.txtviews.com, including but not limited to AI subscriptions, downloadable software, and eBooks.</p>

              <h3>1. Non-Refundable – All Digital Purchases</h3>
              <p>
                All digital purchases are <strong>non-refundable</strong>. This includes one-time purchases and time-limited access (e.g., monthly or annual plans).
                Refunds are not offered for:
              </p>
              <ul>
                <li>Unused digital items</li>
                <li>Partially used subscriptions or products</li>
                <li>Early cancellations of fixed-period services</li>
              </ul>

              <h3>2. Exceptions – When Refunds May Be Considered</h3>
              <p>Refunds may be approved <strong>only under the following conditions</strong>:</p>

              <h3>2.A. Technical Issues</h3>
              <p>
                If you experience <strong>significant technical issues</strong> that prevent you from accessing or using your purchased product or service via store.txtviews.com,
                and the issue is not resolved within <strong>48 hours</strong> of reporting it, you may be eligible for a refund.
              </p>
              <p><strong>To qualify:</strong></p>
              <ul>
                <li>Report the issue <strong>within 24 hours</strong> of product delivery</li>
                <li>Email <a href="mailto:contact@txtviews.com">contact@txtviews.com</a> and use the contact form</li>
                <li>Provide detailed information and supporting evidence (screenshots, error messages, etc.)</li>
              </ul>
              <p><strong>Note:</strong> Issues caused by third-party platforms, external tools, or user error are not covered under this policy. Delays due to incorrect customer information may also extend resolution times.</p>

              <h3>2.B. Misrepresentation</h3>
              <p>
                If a digital product or service <strong>significantly differs</strong> from its description at the time of purchase, and you notify us 
                <strong> within 24 hours</strong> of delivery, you may request a refund.
              </p>
              <ul>
                <li>Minor differences or additional bonus features do <strong>not</strong> count as misrepresentation.</li>
                <li>Upon verification, we will issue a <strong>full refund</strong>.</li>
              </ul>

              <h3>2.C. Non-Delivery</h3>
              <p>
                If a digital product or service is <strong>not delivered</strong> within <strong>3 business days</strong> of purchase, you may request a refund.
              </p>
              <p><strong>Exceptions include delays due to:</strong></p>
              <ul>
                <li>National/regional holidays</li>
                <li>Force majeure events (natural disasters, strikes, etc.)</li>
                <li>Incomplete or inaccurate customer information</li>
              </ul>
              <p>We will inform you of any known or expected delays.</p>

              <h3>3. Refund Request Process</h3>
              <p>To request a refund:</p>
              <ol>
                <li><strong>Contact Support:</strong> Email <a href="mailto:contact@txtviews.com">contact@txtviews.com</a> or use our contact form</li>
                <li><strong>Provide:</strong> Order number, a description of the issue, and any relevant documentation/screenshots</li>
                <li><strong>Review:</strong> We’ll verify your claim within <strong>7 business days</strong></li>
                <li><strong>Resolution:</strong> Approved refunds will be returned to the original payment method. Processing times may vary by payment provider.</li>
              </ol>

              <h3>4. Subscription & Renewal Policy</h3>

              <strong>Pay-Per-Product Subscription Model</strong>
              <p>
                We operate on a <strong>pay-per-product or pay-per-service subscription model</strong>, which provides access to specific digital products
                (e.g., AI tools, software licenses, eBooks) for a <strong>fixed service period</strong> (e.g., 30 days, 90 days, or one year).
              </p>
              <ul>
                <li><strong>Auto-Renew Enabled:</strong> These subscriptions <strong>may auto-renew</strong> at the end of each service period unless canceled prior to renewal.</li>
                <li><strong>Auto-Cancellation:</strong> If auto-renew is not enabled or payment is not received, access is automatically discontinued at the end of the service period — no manual cancellation required.</li>
                <li><strong>No long-term commitment:</strong> Each subscription is tied to a single product or service, making the billing cycle transparent and predictable.</li>
              </ul>
              <p>To <strong>cancel</strong> auto-renewal, log in to your account settings or contact <a href="mailto:contact@txtviews.com">contact@txtviews.com</a> before your billing cycle ends.</p>

              <h3>5. Returns for Digital Products</h3>
              <p>
                All digital sales are final. Returns or exchanges are not accepted unless the product meets refund eligibility under Sections 2.A or 2.B.
              </p>

              <h3>6. Damaged or Corrupted Files</h3>
              <p>
                If a downloaded file (eBook, software) is <strong>incomplete, corrupted, or inaccessible</strong>, contact us within
                <strong>24 hours</strong> of delivery. After verifying the issue, we may:
              </p>
              <ul>
                <li>Reissue or replace the file</li>
                <li>Provide alternative access</li>
                <li>Offer a refund if the issue is unresolved within 7 business days</li>
              </ul>

              <h3>7. Contact Us</h3>
              <p>If you have any issues or questions, please contact us:</p>
              <ul>
                <li><strong>Email:</strong> <a href="mailto:contact@txtviews.com">contact@txtviews.com</a></li>
                <li><strong>Website:</strong> <a href="https://store.txtviews.com/#/Contact">https://store.txtviews.com/#/Contact</a></li>
              </ul>

              <p>
                8. CHANGES TO THIS REFUND POLICY:

                We reserve the right to change this Policy at our sole discretion at any time. Any material changes to this Policy will be posted on this page. We encourage you to review this Policy regularly for such changes. The updated Refund Policy will take effect as soon as it has been updated.

              </p><p>This Policy was last updated as of <span>15 August, 2025</span>
              </p>
              <button>I agree</button>
            </div>
          </div>
        </div>
      </div>
      <section className="home-footer-section ">
        <Footer />
      </section>
    </>
  );
};

export default RefundPolicy;
