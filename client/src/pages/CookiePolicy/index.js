import React from "react";
import "../TermsAndConditions/policy.css";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

function Cookie() {
  return (
    <div className="background-signup">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Cookie Policy</title>
      </Helmet>
      <section id="policy">
        <div className="sample">
          <div className="signIn-box signIn-box-medium signIn-box-small">
            <h1>COOKIE POLICY</h1>
            <h2>Last updated May 08, 2021</h2>

            <p>
              This Cookie Policy explains how we use cookies and similar technologies to recognize you
              when you visit our websites at{" "}
              <a href="http://www.eshodaankori.com">
                http://www.eshodaankori.com
              </a>
              . It explains what these technologies are and why we
              use them, as well as your rights to control our use of them.
            </p>
            <p>
              In some cases we may use cookies to collect personal information,
              or that becomes personal information if we combine it with other
              information.
            </p>

            <h2>What are cookies?</h2>
            <p>
              Cookies are small data files that are placed on your computer or
              mobile device when you visit a website. Cookies are widely used by
              website owners in order to make their websites work, or to work
              more efficiently, as well as to provide reporting information.
            </p>
            <p>
              Cookies set by the website owner (in this case, us) are
              called "first party cookies". Cookies set by parties other than
              the website owner are called "third party cookies". Third party
              cookies enable third party features or functionality to be
              provided on or through the website (e.g. like advertising,
              interactive content and analytics). The parties that set these
              third party cookies can recognize your computer both when it
              visits the website in question and also when it visits certain
              other websites.
            </p>

            <h2>Why do we use cookies?</h2>
            <p>
              We use first and third party cookies for several reasons. Some
              cookies are required for technical reasons in order for our
              Websites to operate, and we refer to these as "essential" or
              "strictly necessary" cookies. Other cookies also enable us to
              track and target the interests of our users to enhance the
              experience on our Online Properties. Third parties serve cookies
              through our Websites for advertising, analytics and other
              purposes.
            </p>

            <h2>Performance and functionality cookies:</h2>
            <p>
              These cookies are used to enhance the performance and
              functionality of our Websites but are non-essential to their use.
              However, without these cookies, certain functionality (like
              videos) may become unavailable.
            </p>
            <p>
              Name:hsb;;#
              <br></br>Purpose:It ensures that a site functions correctly. It is
              a session cookie that gets deleted once the browser is closed
              <br></br>Provider:www.google.com
              <br></br>Service:helgelandsparebank View{" "}
              <a href="https://www.hsb.no/informasjon-om-bankens-personvernregler">
                Service Privacy Policy
              </a>
              <br></br>Country:United States
              <br></br>Type:html_session_storage
              <br></br>Expires in:session
            </p>


            <h2>Do you use Flash cookies or Local Shared Objects?</h2>
            <p>
              Websites may also use so-called "Flash Cookies" (also known as
              Local Shared Objects or "LSOs") to, among other things, collect
              and store information about your use of our services, fraud
              prevention and for other site operations.
            </p>
            <p>
              If you do not want Flash Cookies stored on your computer, you can
              adjust the settings of your Flash player to block Flash Cookies
              storage using the tools contained in the Website Storage Settings
              Panel. You can also control Flash Cookies by going to the Global
              Storage Settings Panel and following the instructions (which may
              include instructions that explain, for example, how to delete
              existing Flash Cookies (referred to "information" on the
              Macromedia site), how to prevent Flash LSOs from being placed on
              your computer without your being asked, and (for Flash Player 8
              and later) how to block Flash Cookies that are not being delivered
              by the operator of the page you are on at the time).
            </p>
            <p>
              Please note that setting the Flash Player to restrict or limit
              acceptance of Flash Cookies may reduce or impede the functionality
              of some Flash applications, including, potentially, Flash
              applications used in connection with our services or online
              content.
            </p>

            <h2>Do you serve targeted advertising?</h2>
            <p>
              Third parties may serve cookies on your computer or mobile device
              to serve advertising through our Websites. These companies may use
              information about your visits to this and other websites in order
              to provide relevant advertisements about goods and services that
              you may be interested in. They may also employ technology that is
              used to measure the effectiveness of advertisements. This can be
              accomplished by them using cookies or web beacons to collect
              information about your visits to this and other sites in order to
              provide relevant advertisements about goods and services of
              potential interest to you. The information collected through this
              process does not enable us or them to identify your name, contact
              details or other details that directly identify you unless you
              choose to provide these.
            </p>
            <h2>How often will you update this Cookie Policy?</h2>
            <p>
              We may update this Cookie Policy from time to time in order to
              reflect, for example, changes to the cookies we use or for other
              operational, legal or regulatory reasons. Please therefore
              re-visit this Cookie Policy regularly to stay informed about our
              use of cookies and related technologies.
            </p>
            <p>
              The date at the top of this Cookie Policy indicates when it was
              last updated.
            </p>

            <h2>Where can I get further information?</h2>
            <p>
              If you have any questions about our use of cookies or other
              technologies, please email us at eshodaankori.bd@gmail.com
            </p>

            <Link to="/" className="btn btn-type1 input-length">
              HOME
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Cookie;
