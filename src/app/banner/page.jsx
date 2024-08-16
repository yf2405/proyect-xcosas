import React from 'react';

import '../../styles/Banner.css'
const Banner = () => {
    return (
      <>
        <style>
          {`
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              background-color: #D2D2D2;
              background-image:
                repeating-linear-gradient(
                  to right, transparent 0 100px,
                  #25283b22 100px 101px
                ),
                repeating-linear-gradient(
                  to bottom, transparent 0 100px,
                  #25283b22 100px 101px
                );
            }
            
            body::before {
              position: absolute;
              width: min(1400px, 90vw);
              top: 10%;
              left: 50%;
              height: 90%;
              transform: translateX(-50%);
              content: '';
              background-image: url(../../images/bg.png);
              background-size: 100%;
              background-repeat: no-repeat;
              background-position: top center;
              pointer-events: none;
            }
          `}
        </style>
  
        <div className="banner">
          <div className="slider" style={{ '--quantity': 10 }}>
            <div className="item" style={{ '--position': 1 }}>
            <img src="images/dragon_1.jpg" alt="" />
            </div>
            <div className="item" style={{ '--position': 2 }}>
              <img src="images/dragon_2.jpg" alt="" />
            </div>
            <div className="item" style={{ '--position': 3 }}>
              <img src="images/dragon_3.jpg" alt="" />
            </div>
            <div className="item" style={{ '--position': 4 }}>
              <img src="images/dragon_4.jpg" alt="" />
            </div>
            <div className="item" style={{ '--position': 5 }}>
              <img src="images/dragon_5.jpg" alt="" />
            </div>
            <div className="item" style={{ '--position': 6 }}>
              <img src="images/dragon_6.jpg" alt="" />
            </div>
            <div className="item" style={{ '--position': 7 }}>
              <img src="images/dragon_7.jpg" alt="" />
            </div>
            <div className="item" style={{ '--position': 8 }}>
              <img src="images/dragon_8.jpg" alt="" />
            </div>
            <div className="item" style={{ '--position': 9 }}>
              <img src="images/dragon_9.jpg" alt="" />
            </div>
            <div className="item" style={{ '--position': 10 }}>
              <img src="images/dragon_10.jpg" alt="" />
            </div>
          </div>
          <div className="content">
            <h1 data-content="XCOSAS">XCOSAS</h1>
            <div className="author">
              <h2>YER DEV</h2>
              <p><b>Web Design</b></p>
              <p>
               Contactanos si quieres una web como esta
              </p>
            </div>
            <div className="model"></div>
          </div>
        </div>
      </>
    );
  };
  
  export default Banner;