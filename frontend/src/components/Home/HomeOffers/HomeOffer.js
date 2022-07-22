import React from "react";
import "./HomeOffer.scss";
import { Link } from "react-router-dom";

const arr = [10, 25, 50, 45, 20, 60, 70, 90];

const HomeOffer = () => {
  return (
    <div className="home-element home-offer">
      {arr.map((e) => (
        <Link to="/" className="home-offer__box">
          <img
            src="https://img.freepik.com/free-vector/weekend-discount-sale-banner-template_1017-33873.jpg?t=st=1648199197~exp=1648199797~hmac=6391265bc104d393cc8cf839e9d62bb55279dae3e1910cab017a1f29e525fa29&w=740"
            alt="offer-specss-99"
          />
          <span>{e}% Off</span>
        </Link>
      ))}
    </div>
  );
};

export default HomeOffer;
