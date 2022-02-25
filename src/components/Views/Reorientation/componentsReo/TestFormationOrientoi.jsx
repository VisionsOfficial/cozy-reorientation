// react
import React, { useState } from "react";

export default function CardFormation() {
  // react Hook For State Handler
  const [data, setData] = useState(null);

  // Fetch Function
  fetch("../../../datas/orientoi.json")
    .then(function(res) {
      return res.json();
    })
    .then(function(data) {
      // store Data in State Data Variable
      setData(data);
    })
    .catch(function(err) {
      console.log(err, " error");
    });

  return (
    <div className="test">
      {// use data State Variable For Get Data Use JavaScript Map Mathod
      data
        ? data.map(function(data) {
            return (
              <div className="card">
                <h4> {data.name}</h4>
              </div>
            );
          })
        : ""}
    </div>
  );
}
