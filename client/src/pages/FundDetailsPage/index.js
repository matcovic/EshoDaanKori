import React from "react";
import "./fundDetails.css";

const FundDetailsPage = () => {
  return (
    <section id="fund-details-section">
      <div className="white-container">
        <h2>Need money for party</h2>
        <div class="container-fluid">
          <div class="row">
            <div className="col-lg-8">
              <div
                id="carouselExampleControls"
                class="carousel slide"
                data-bs-ride="carousel"
                data-bs-interval="false"
              >
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <img
                      src="https://c4.wallpaperflare.com/wallpaper/787/854/424/jujutsu-kaisen-satoru-gojo-anime-boys-anime-girls-hd-wallpaper-preview.jpg"
                      class="d-block w-100"
                      alt="..."
                    />
                  </div>
                  <div class="carousel-item">
                    <img
                      src="https://c4.wallpaperflare.com/wallpaper/787/854/424/jujutsu-kaisen-satoru-gojo-anime-boys-anime-girls-hd-wallpaper-preview.jpg"
                      class="d-block w-100"
                      alt="..."
                    />
                  </div>
                  <div class="carousel-item">
                    <img
                      src="https://www.xtrafondos.com/wallpapers/resized/satoru-gojo-jujutsu-kaisen-6852.jpg?s=large"
                      class="d-block w-100"
                      alt="..."
                    />
                  </div>
                </div>
                <button
                  class="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleControls"
                  data-bs-slide="prev"
                >
                  <span
                    class="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button
                  class="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleControls"
                  data-bs-slide="next"
                >
                  <span
                    class="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
              <h3 className="post-time-text">Posted 4 days ago</h3>
              <div className="row fund-tags-container">
                <ul>
                  <li>
                    <div className="fund-tags">
                      <img
                        src="https://www.pngjoy.com/pngl/777/9240233_facebook-logo-png-logo-fb-instagram-png-transparent.png"
                        alt="..."
                      />
                      <h4>Medical</h4>
                    </div>
                  </li>
                  <li>
                    <div className="fund-tags">
                      <img
                        src="https://www.pngjoy.com/pngl/777/9240233_facebook-logo-png-logo-fb-instagram-png-transparent.png"
                        alt="..."
                      />
                      <h4>Medical</h4>
                    </div>
                  </li>
                  <li>
                    <div className="fund-tags">
                      <img
                        src="https://www.pngjoy.com/pngl/777/9240233_facebook-logo-png-logo-fb-instagram-png-transparent.png"
                        alt="..."
                      />
                      <h4>Kalabagan, Dhaka</h4>
                    </div>
                  </li>
                  <li>
                    <div className="fund-tags">
                      <img
                        src="https://www.pngjoy.com/pngl/777/9240233_facebook-logo-png-logo-fb-instagram-png-transparent.png"
                        alt="..."
                      />
                      <h4>Medical</h4>
                    </div>
                  </li>
                  <li>
                    <div className="fund-tags">
                      <img
                        src="https://www.pngjoy.com/pngl/777/9240233_facebook-logo-png-logo-fb-instagram-png-transparent.png"
                        alt="..."
                      />
                      <h4>Medical</h4>
                    </div>
                  </li>
                  <li>
                    <div className="fund-tags">
                      <img
                        src="https://www.pngjoy.com/pngl/777/9240233_facebook-logo-png-logo-fb-instagram-png-transparent.png"
                        alt="..."
                      />
                      <h4>Medical</h4>
                    </div>
                  </li>
                  <li>
                    <div className="fund-tags">
                      <img
                        src="https://www.pngjoy.com/pngl/777/9240233_facebook-logo-png-logo-fb-instagram-png-transparent.png"
                        alt="..."
                      />
                      <h4>Medical</h4>
                    </div>
                  </li>
                  <li>
                    <div className="fund-tags">
                      <img
                        src="https://www.pngjoy.com/pngl/777/9240233_facebook-logo-png-logo-fb-instagram-png-transparent.png"
                        alt="..."
                      />
                      <h4>Medical</h4>
                    </div>
                  </li>
                </ul>
              </div>
              {/* progress in percentage */}
              <div className="donation-statistics">
                <div className="row">
                  <div className="col-sm-6 amount-box">
                    <h3>DONATION RECEIVED:</h3>
                    <h3 className="amount-text">100tk</h3>
                  </div>
                  <div className="col-sm-6 amount-box amount-goal-box">
                    <h3>GOAL:</h3>
                    <h3 className="amount-text">1000tk</h3>
                  </div>
                </div>
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: "25%", backgroundColor: "#00AD7C" }}
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>

              <h3>STORY</h3>
              <p>
                Lorem ipsum dt. Pretium in diam accumsan, pellentesque quam
                mauris, vulputate cursus euismodvenenatis, ultrices interdum.
                Pretium mi nibh mi eget sit integer. Fringilla adipiscing ma
                uris venenatis turpis quam purus quis. Suscipit vivamus ante mi
                mi viverra. Lobortis nisl dolor, integer elit, pellentesque
                tincidunt nullam. Morbi dictumst nunc, mollis interdum neque
                placerat consectetur aliquet nisi. Mauris, nec vitae lectus
                scelerisque ridiculus sollicitudin morbi. Lorem ipsum dt.
                Pretium in diam accumsan, pellentesque quam mauris, vulputate
                cursus euismodvenenatis, ultrices interdum. Pretium mi nibh mi
                eget sit integer. Fringilla adipiscing ma uris venenatis turpis
                quam purus quis. Suscipit vivamus ante mi mi viverra. Lobortis
                nisl dolor, integer elit, pellentesque tincidunt nullam. Morbi
                dictumst nunc, mollis interdum neque placerat consectetur
                aliquet nisi. Mauris, nec vitae lectus scelerisque ridiculus
                sollicitudin morbi. Lorem ipsum dt. Pretium in diam accumsan,
                pellentesque quam mauris, vulputate cursus euismodvenenatis,
                ultrices interdum. Pretium mi nibh mi eget sit integer.
                Fringilla adipiscing ma uris venenatis turpis quam purus quis.
                Suscipit vivamus ante mi mi viverra. Lobortis nisl dolor,
                integer elit, pellentesque tincidunt nullam. Morbi dictumst
                nunc, mollis interdum neque placerat consectetur aliquet nisi.
                Mauris, nec vitae lectus scelerisque ridiculus sollicitudin
                morbi.sque ridiculus sollicitudin morbi. Lorem ipsum dt. Pretium
                in diam accumsan, pellentesque quam mauris, vulputate cursus
                euismodvenenatis, ultrices interdum. Pretium mi nibh mi eget sit
                integer.
              </p>

              <div className="fund-btn-group">
                <a href="#" className="btn btn-type1">
                  CONTACT
                </a>
                <a href="#" className="btn btn-type4">
                  SHARE
                </a>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="availlable-payment-sidebar">
                <div className="payment-list">
                  <ul>
                    <li>
                      <img
                        src="https://www.pngjoy.com/pngl/777/9240233_facebook-logo-png-logo-fb-instagram-png-transparent.png"
                        alt=".."
                      />
                      <h3 className="phone-text">+8801966184892</h3>
                    </li>
                    <li>
                      <img
                        src="https://www.pngjoy.com/pngl/777/9240233_facebook-logo-png-logo-fb-instagram-png-transparent.png"
                        alt=".."
                      />
                      <h3 className="phone-text">+8801966184892</h3>
                    </li>
                    <li>
                      <img
                        src="https://www.pngjoy.com/pngl/777/9240233_facebook-logo-png-logo-fb-instagram-png-transparent.png"
                        alt=".."
                      />
                      <h3 className="phone-text">+8801966184892</h3>
                    </li>
                  </ul>
                </div>
                <button className="btn btn-type1 payment-list-btn" disabled>
                  AVAILABLE PAYMENT OPTIONS
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FundDetailsPage;
