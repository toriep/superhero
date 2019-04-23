import React, { Component } from 'react';
import axios from 'axios';
import '../bootstrap/css/bootstrap.min.css';
import Card from './Card.js';

class App extends Component {
  state = {
    superHeroes: [],
    hero_name: '',
    first_name: '',
    last_name: '',
    favorite_food: '',
    emptyInput: false
  }

  componentDidMount() {
    axios.get('http://localhost:3001/users/foods').then((resp)=>{
      this.setState({
        superHeroes: resp.data
      })
    });
  }

  handleAddItem = async event => {
    event.preventDefault();
    const { hero_name, first_name, last_name, favorite_food } = this.state;
    //Show info box if any input field is empty when submitting
    if(!hero_name || !first_name || !last_name || !favorite_food){
      this.setState({
        //a value of true will display the info box on the screen
        emptyInput: true,
      })
      return;
    }
    await axios.post('http://localhost:3001/users/food', 
    { hero_name, first_name, last_name, favorite_food }).then((resp) => {
      this.setState({
        superHeroes: resp.data.usersCopy,
        emptyInput: false,
      })
    });
  }

  deleteItem = id => {
    axios.patch('http://localhost:3001/users/food',
    { id }).then((resp)=>{
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
      <Card key={ index.id } hero={ index } thanosDeletes={()=>this.deleteItem(index.id)} />
      )
    });

    return(
      <div className="container mt-4">
        <h1 className="text-center">Avengers</h1>
        <form onSubmit={this.handleAddItem}>
          <div className="form-group col-md-6 mx-auto">
            <label>Hero</label>
            <input onChange={({target})=>this.setState({hero_name:target.value})}
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
          <div className="col-md-6 mx-auto text-right">
            <p>
              {this.state.emptyInput ? <span className="text-danger">Please fill out all fields to add a superhero</span> : null}
            </p>
        <button type="submit" className="btn btn-primary">Add</button>
          </div>
        </form>
        <div className="spaceBetween">
          <div className="row m-3">
            { heroesList }
          </div>
        </div>
      </div>
    )
  }
}

export default App;
