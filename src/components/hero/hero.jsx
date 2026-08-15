import React from "react";
import {ChevronsDown} from "lucide-react";
import "./heroStyle.css";
function Hero({ title, bgImage, nextID }) {

  const isVideo = bgImage && bgImage.endsWith('.mp4');
  const isNext = nextID;
  return ( 
    
    <div className="hero">
    {isVideo ? (
      <video autoPlay muted loop playsInline className="heroBackground heroVideo">
        <source src={bgImage} type="video/mp4"/>
      </video>
      ) 
      : 
      (
      <div className="heroBackground heroImage" style={{ backgroundImage: `url(${bgImage})` }}></div>
      )
    }
      <div className="heroContent">
        <h1 className="heroTitle">{title}</h1>
        {isNext && (
        <a href={nextID} className="heroButton"><ChevronsDown size={48} /></a>
        )}
      </div>
    </div>
  )
}

export default Hero;
