import React, { Component } from 'react';
import axios from 'axios';

class Card extends Component{
  state = {
    superHeroes: []
  }

  componentDidMount() {
    const url = 'http://localhost:3001/users/foods';
    axios.get(url).then((resp)=>{
      console.log('resp :', resp);
      this.setState({
        superHeroes: resp.data
      })
    });
  }

  render(){
    return(
      <div className="container">
        <h1>Super Heroes</h1>
      </div>
    )
  }
  
}

export default Card;