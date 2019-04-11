import React, { Component, Fragment } from 'react';

class Card extends Component{

  capitalize = (str) => {
    return str.split(' ').map(item => item[0].toUpperCase() + item.slice(1)).join(' ');
  }

  render(){
    const { id, favorite_food, first_name, hero_name, last_name} = this.props.hero;
    return(
      <Fragment>
        <div className="col-md-6 col-lg-4 p-3">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">{this.capitalize(hero_name)}</h2>
              <hr/>
              <p className="card-text ml-6"><i className="fas fa-user"></i> {this.capitalize(`${first_name} ${last_name}`)}</p>
              <p className="card-text"><i class="fas fa-heart"></i> {favorite_food ? this.capitalize(favorite_food) : null}</p>
              <hr/>
              <div className="text-right">
                <button onClick={()=>this.props.delete(id)} className="btn btn-danger">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Card;