import React from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";

const HeroSection = () => {
  const details = [
    
  ];
  return (
    <>
      <div className="heroSection">
        <div className="container">
          <div className="title">
            <h1>We rise by</h1>
            <h2>lifting others</h2>
            <p>
             
            </p>
          </div>
          <div className="image">
            <img src="/home.jpg" alt="hero" />
          </div>
        </div>
        <div className="details">
          {details.map((element) => {
            return (
              <div className="card" key={element.id}>
                <div className="icon">{element.icon}</div>
                <div className="content">
                  <p>{element.title}</p>
                  <p>{element.subTitle}</p>
                </div>
              </div>
            );
          })}
        </div>
        
      </div>
      <div className="about">
    <div className="imgcontanner">
        <div className="aboutimg"></div>
    </div>
    <div className="aboutcontent">
        <h5>_</h5>
        <h1>Why Donate?</h1>
        <p>We know that students are looking for a platform to seek financial assistance
            for their education.
            So we connect students with potential donors, scholarships, and
            other funding opportunities
            and empower students to overcome financial barriers and
            succeed academically.</p>

        <br />
        <br />
        <h5>_</h5>
    </div>
</div>

    </>
  );
};

export default HeroSection;
