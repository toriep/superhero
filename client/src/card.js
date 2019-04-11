import React, { Component, Fragment } from 'react';

class Card extends Component{

  capitalize = () => {
    console.log('this.props.hero :', this.props.hero);
  }

  render(){
    const { favorite_food, first_name, hero_name, last_name} = this.props.hero;
    return(
      <Fragment>
        <div className="row m-4">
          <div className="col-md-6 p-3">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">{hero_name}</h2>
                <p className="card-text">PLAYED BY: {`${first_name} ${last_name}`}</p>
                <p className="card-text">FAVORITE FOOD: {favorite_food || null}</p>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Card;