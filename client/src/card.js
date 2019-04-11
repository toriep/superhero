import React from 'react';

//capitalize first letter of each word
//The O notation is O(n^2) due to nested arrays (.slice inside .map)
//My attempt to write O(n) resulted in long codes
const capitalize = (str) => {
  return str.split(' ')
  .map(item => item[0].toUpperCase() + item.slice(1))
  .join(' ');
};

//descontruct props in the parameters
const Card = ({ hero:{ favorite_food, first_name, hero_name, last_name }, thanosDeletes }) => (
  <div className="col-md-6 col-lg-4 p-3">
    <div className="card">
      <div className="card-body">
        <h3 className="card-title">{capitalize(hero_name)}</h3>
        <hr/>
        <p className="card-text ml-6">
          <i className="fas fa-user"></i>
          {capitalize(`${first_name} ${last_name}`)}
        </p>
        <p className="card-text">
          <i className="fas fa-heart"></i>
          {favorite_food ? capitalize(favorite_food) : 'None'}
        </p>
        <hr/>
        <div className="text-right">
          <button onClick={thanosDeletes} className="btn btn-danger">Delete</button>
        </div>
      </div>
    </div>
  </div>
);

export default Card;