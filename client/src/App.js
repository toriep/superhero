import React, { Component } from 'react';
import axios from 'axios';
import './bootstrap/css/bootstrap.min.css';
import './style.css';
import Card from './Card.js';

class App extends Component {
  state = {
    superHeroes: [],
    hero_name: '',
    first_name: '',
    last_name: '',
    favorite_food: ''
  }

  componentDidMount() {
    axios.get('http://localhost:3001/users/foods').then((resp)=>{
      this.setState({
        superHeroes: resp.data
      })
    });
  }

  handleAddItem = async (event) => {
    event.preventDefault();
    const { hero_name, first_name, last_name, favorite_food } = this.state;
    if(!hero_name || !first_name || !last_name || !favorite_food){
      console.log('Fill out all forms');
      return;
    }
    await axios.post('http://localhost:3001/users/food', { hero_name, first_name, last_name, favorite_food }).then((resp)=>{
      this.setState({
        superHeroes: resp.data.usersCopy
      })
    });
  }

  render(){
    const { superHeroes } = this.state;
    const { hero_name, first_name, last_name, favorite_food } = this.state;
    const heroesList = superHeroes.map(index => {
        return (
        <Card key={ index.id } hero={ index } />
        )
    });

    return(
      <div className="container mt-4 p-3">
        <h1 className="text-center">Super Heroes</h1>
        <form className="" onSubmit={this.handleAddItem}>
          <div className="form-group col-md-6 mx-auto">
            <label>Hero</label>
            <input onChange={(e)=>this.setState({hero_name: e.target.value})} 
            type="text" 
            value={hero_name} 
            className="form-control"/>
          </div>
          <div className="form-group col-md-6 mx-auto">
            <label>First Name</label>
            <input onChange={({target})=>this.setState({first_name:target.value})}
            type="text" 
            value={first_name}
            className="form-control"/>
          </div>
          <div className="form-group col-md-6 mx-auto">
            <label>Last Name</label>
            <input onChange={({target})=>this.setState({last_name:target.value})}
            type="text" 
            value={last_name}
            className="form-control"/>
          </div>
          <div className="form-group col-md-6 mx-auto">
            <label>Favorite Food</label>
            <input onChange={({target})=>this.setState({favorite_food:target.value})}
            type="text" 
            value={favorite_food}
            className="form-control"/>
          </div>
          <button type="submit" className="btn btn-primary">Add Hero</button>
        </form>
        <div className="row m-3">
          { heroesList }
        </div>
      </div>
    )
  }
}

export default App;
