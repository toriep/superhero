import React, { Component } from 'react';
import axios from 'axios';
import './bootstrap/css/bootstrap.min.css';
import Card from './Card';

class App extends Component {
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
    const { superHeroes } = this.state;
    const heroesList = superHeroes.map( index => {
      const { favorite_food, first_name, hero_name, last_name } = index;
      //only display entries that have truthy values for all of these fields
      if(favorite_food && first_name && hero_name && last_name){
        return (
        <Card key={ index.id } hero={ index } />
        )
      }
    });
    return(
      <div className="container text-center mt-4 p-3">
        <h1>Super Heroes</h1>
        { heroesList }
      </div>
    )
  }
}

export default App;
