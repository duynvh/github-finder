import React from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import './App.css';
import axios from 'axios';

class App extends React.Component {

  state = {
    users: [],
    loading: false,
  }

  async componentDidMount() {
    this.setState({
      loading: true
    });

    const res = await axios.get(`https://api.github.com/users?client_id=853e9fb025a8ada733ba&secret_id=5f7d87fcf5de1992e9e26eeb5ab93d8ab10c6ae3`);
    
    this.setState({
      loading: false,
      users: res.data
    })
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="container">
         <Users loading={this.state.loading} users={this.state.users}/>
        </div>
      </div>
      
    );
  }
  
}

export default App;
