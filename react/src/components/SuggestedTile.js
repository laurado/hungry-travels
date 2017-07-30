import React from 'react';

const SuggestedTile = props => {

  let handleAddClick = (event) => {
    let payload = {
      name: props.name
    };
    props.addSuggested(payload)
  };

  return(
    <div className="small-6 medium-4 large-2 columns end">
      <div className="callout">

        <div className="circle">
          <img src={props.restaurant.image_url} alt={props.restaurant.name} />
        </div>

        <h6>{props.restaurant.name}</h6>

        <button type="button" onClick={handleAddClick}>Add</button>

      </div>
    </div>

  )
}

export default SuggestedTile;
