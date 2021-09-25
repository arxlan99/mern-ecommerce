import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <ul>
        <a href="/">
          <li>CA Privacy Rights</li>
        </a>
        <a href="/">
          <li> Do Not Sell My Personal Information</li>
        </a>
        <a href="/">
          <li>Request My Personal Information</li>
        </a>
        <a href="/">
          <li> Help</li>
        </a>
        <a href="/">
          <li> Terms of Use</li>
        </a>
        <a href="/">
          <li>All Departments</li>
        </a>
        <a href="/">
          {" "}
          <li>Store Directory</li>
        </a>
      </ul>
      <span>© 2021 XalMarket. All Rights Reserved.</span>
    </div>
  );
};

export default Footer;
