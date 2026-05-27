// app/javascript/components/Home.jsx

import React from "react";
import { Link } from "react-router-dom";
// import { handleImageClick } from "components/image-click.jsx";
import { CharacterCard } from "./CharacterCard.jsx";

export default () => (
  <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
    <img
      src="/images/waldo_beach.jpeg" // Just a placeholder landscape image to test with
      alt="Waldo Board"
      // onClick={handleImageClick}
      style={{
        // width: "800px",
        cursor: "crosshair",
        border: "3px solid black",
      }}
    />
    <hr className="my-4" />
    <div className="portrait-container">
      <div>
        <img src="/images/waldo.webp" alt="waldo" style={{ width: "100px" }} />
        <p>Waldo</p>
        <div>Found? Time it took to find</div>
      </div>
      <div>
        <img src="/images/wenda.webp" alt="wenda" style={{ width: "100px" }} />
        <p>Walgirl</p>
        <div>Found? Time it took to find</div>
      </div>
      <div>
        <img
          src="/images/wizard.webp"
          alt="wizard"
          style={{ width: "100px" }}
        />
        <p>Wizardo</p>
        <div>Found? Time it took to find</div>
      </div>
      <div>
        <img src="/images/odlaw.webp" alt="odlaw" style={{ width: "100px" }} />
        <p>Waspdo</p>
        <div>Found? Time it took to find</div>
      </div>
      <div>
        <img src="/images/woof.webp" alt="woof" style={{ width: "100px" }} />
        <div>Found? Time it took to find</div>
      </div>
      <div>Total Time</div>
    </div>
    <footer></footer>
  </div>
);
