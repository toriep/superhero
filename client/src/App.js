import React, { Component } from 'react';
import axios from 'axios';
import './bootstrap/css/bootstrap.min.css';
import Card from './Card';

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
    const { hero_name, first_name, last_name, favorite_food, superHeroes } = this.state;
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
      const { favorite_food, first_name, hero_name, last_name } = index;
        return (
        <Card key={ index.id } hero={ index } />
        )
    });

    return(
      <div className="container text-center mt-4 p-3">
        <h1>Super Heroes</h1>
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
        <div className="row m-3">
          { heroesList }
        </div>
      </div>
    )
  }
}

export default App;
