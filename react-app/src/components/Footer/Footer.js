import React from "react";
import "./Footer.css"

function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <div>Check out my socials!</div>
        <ul className="social-icons">
           <a href="https://github.com/tohknee" target="blank"> <i className="fab fa-github"></i><span class="label">GitHub</span></a>
            <a href="www.linkedin.com/in/tonyhedev" target="blank"><i className="fab fa-linkedin"></i><span class="label">LinkedIn</span></a>
            <a href="https://wellfound.com/u/tonyhe" target="blank"><i className="fab fa-angellist">AngelList/Wellfound</i></a>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
