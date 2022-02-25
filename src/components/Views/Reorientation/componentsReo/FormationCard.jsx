import React from "react";
import { Link } from "react-router-dom";

class FormationCard extends React.Component {
  state = {
    titre: this.props.titre
  };

  render() {
    return (
      <>
        <div className="annonce">
          <div className="puce"></div>
          <p>{this.props.titre}</p>
        </div>
      </>
    );
  }
}

export default FormationCard;
