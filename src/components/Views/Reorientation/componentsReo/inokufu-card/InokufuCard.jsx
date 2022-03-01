import React from "react";

const InokufuCard = ({ title, picture, name, address, description, url }) => {
  return (
    <div className="detail-formation-card">
      <h2>{title}</h2>
      <div className="content-formation-detail">
        <a target="#" className="picture-detail">
          <img src={picture} alt={name} />
        </a>

        <h2>Adresse</h2>
        <p>{address}</p>
        <h2>Durée</h2>
        <h2>Description</h2>
        <p>{description}</p>
        <h2> Aller en lire plus</h2>
        <p>
          <a href={url}>{url}</a>{" "}
        </p>
      </div>
    </div>
  );
};

export default InokufuCard;
