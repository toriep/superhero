import React, { Component } from 'react';
import axios from 'axios';
import Card from './Card';

class AddHero extends Component{
  state = {
    hero_name: '',
    first_name: '',
    last_name: '',
    'favorite_food': ''
  }

  handleAddItem = async (event) => {
    event.preventDefault();
    const { hero_name, first_name, last_name } = this.state;
    await axios.post('http://localhost:3001/users/food', { hero_name, first_name, last_name });//you don't use .then bc you already use async await. It's like the code pauses right here
    return(
      <Card hero = {{hero_name, first_name, last_name }} />
    )
  }

  render(){
    const { hero_name, first_name, last_name, favorite_food } = this.state;

    console.log('Add Props: ',this.props);

    return(
      <div>
        <form onSubmit={this.handleAddItem}>
          <div className="row">
            <div className="col s6 offset-s3">
              <label>Hero</label>
              <input onChange={(e)=>this.setState({hero_name: e.target.value})} 
              type="text" 
              value={hero_name}/>
            </div>
          </div>
          <div className="row">
            <div className="col s6 offset-s3">
              <label>First Name</label>
              <input onChange={({target})=>this.setState({first_name:target.value})}//you can destructure stuff in your paramter
              type="text" 
              value={first_name}/>
            </div>
          </div>
          <div className="row">
            <div className="col s6 offset-s3">
              <label>Last Name</label>
              <input onChange={({target})=>this.setState({last_name:target.value})}//you can destructure stuff in your paramter
              type="text" 
              value={last_name}/>
            </div>
          </div>
          <div className="row">
            <div className="col s6 offset-s3">
              <label>Favorite Food</label>
              <input onChange={({target})=>this.setState({favorite_food:target.value})}//you can destructure stuff in your paramter
              type="text" 
              value={favorite_food}/>
            </div>
          </div>
          <div className="row">
            <div className="col s6 offset-s3 right-align">
              <button className="btn teal lighten-2">Add Hero</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default AddHero;

