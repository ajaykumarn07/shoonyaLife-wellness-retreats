import React from "react";
import { convertToIST } from "../../utils/convertToIST";
import "./RetreatList.css";

const RetreatList = ({ retreat }) => {
  return (
    <div className="retreat-card">
      <img src={retreat.image} alt={retreat.title} />
      <h3>{retreat.title}</h3>
      <p>{retreat.description}</p>
      <p>Location: {retreat.location}</p>
      <p>Type: {retreat.type}</p>
      <p>Date: {convertToIST(retreat.date)}</p>
      <p>Price: ₹{retreat.price}</p>
    </div>
  );
};

export default RetreatList;
