import React from 'react';
import metamaskIcon from '../image-551.png';

function togglePotato() {
    var potato = document.getElementById("pot");
    if(potato){
        if (potato.style.display === "none") {
            potato.style.display = "block";
          } else {
            potato.style.display = "none";
          }
    }
}

function Photo() {
  return (
      <div id="potato-photo">
        <img src={metamaskIcon} className="Potato-img" id="pot" alt="nft" />
        <button onClick={togglePotato}>
            Hide potato
        </button>
    </div>
  );
}

export default Photo;
