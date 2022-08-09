import React from "react";
import { Link } from "react-router-dom";
import "./DashboardCard.scss";

const DashboardCard = (props) => {
  const { heading } = props;

  return (
    <div className="dashboard-card">
      <h4 className="heading-1 heading-1--sm">{heading}</h4>
      <div className="dashboard-card__details">
        <div className="dashboard-card__details-row">
          <span>Total {heading}:</span>
          <span>99</span>
        </div>
      </div>
      <Link
        to="#"
        className="text-link-primary--white text-link-primary--white--sm text-center"
      >
        Edit {heading}
      </Link>
    </div>
  );
};

export default DashboardCard;
