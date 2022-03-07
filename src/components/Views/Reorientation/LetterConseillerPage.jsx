import React from "react";
import { useState, useEffect } from "react";

const LettreConseillerPage =  (name) => {

    const [styleBox, setStyleBox] = useState(null);

    useEffect(() => {
        const randomBorderRadius = (min, max) => {
            return (
                (
                    Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) +1)) + Math.ceil(min) 
                  ).toString() + "px"
                );
              };
        setStyleBox ({
            borderTopRightRadius: randomBorderRadius(20, 100),
            borderBottomRightRadius: randomBorderRadius(20, 100)
        })
    }, [])
    
    return (
        <>
            <div className="boxStyle" style={styleBox}></div>
            {name}
        </>
    )
}

export default LettreConseillerPage;