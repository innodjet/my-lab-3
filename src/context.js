import React, { Component } from "react";
import PropTypes from "prop-types";

const Context = React.createContext();

class PeopleContextProvider extends Component {
  state = {
    people: [
      {
        name: "Example Person",
        height: "132",
        mass: "67",
        gender: "male",
        homeworld: "https://swapi.co/api/planets/1/"
      }
    ],
    homeworld: {},
    searchValue: "",
    homeWorldDataLoadingStatus: {
        display: "none",
        marginTop: "10px"
    },
    peopleListDataLoadingStatus: {
      display: "none",
      marginTop: "10px"
    },
    isPeopleListDataReady: { 
      display: "none"
    }
  };

  componentWillMount() {
    this.getPeoplesData();
  }

  getPeoplesData = async () => {
    this.setState({
      peopleListDataLoadingStatus: {
        display: "block",
        marginTop: "10px"
      },
      homeworld: {},
      isPeopleListDataReady: { 
        display: "none"
      }
    });
    const rep = await fetch('https://swapi.co/api/people');
    const data = await rep.json();
    const result =  data.results.map( (el) => {
      return {  name: el.name , 
                height: el.height,
                mass: el.mass,
                gender: el.gender,
                homeworld: el.homeworld
              };
    });
    this.setState({
      people: result,
      peopleListDataLoadingStatus: {
        display: "none",
        marginTop: "10px"
      },
      isPeopleListDataReady: { 
        display: "block"
      }
    });
  }

  getHomeWorldForUser = async url => {
    // Clear homeworld state to prepare for new incoming data
    this.setState({
      homeworld: {},
      homeWorldDataLoadingStatus: {
        display: "block",
        marginTop: "10px"
      }
    });
    const rep = await fetch(url);
    const result = await rep.json();
    this.setState({
      homeworld: {
        name: result.name,
        climate: result.climate,
        gravity: result.gravity
      },
      homeWorldDataLoadingStatus: {
        display: "none",
        marginTop: "10px"
      }
    });
  } // eslint-disable-line no-unused-vars

  filterPeopleByName = name => {
    // re-initialize homeworld state.
    this.setState({
      homeworld: {}
    });
    // Properly trim incoming data from the imputBox to remove white space
    const inName = name.split(' ').join('');
    const result = this.state.people.filter( (el) => {
      const outName = el.name.split(' ').join('');
      return inName.toLocaleLowerCase() === outName.toLocaleLowerCase();
    });    
    // Get a new fresh data before checking the result of our match operation
    this.getPeoplesData().then ( () => {
      if ( result.length !== 0 ) { // This means we find a matching element
        this.setState({
          people: result 
        });
      }
    });
  }; // eslint-disable-line no-unused-vars

  // Handle input changes in the form. 
  handleInputEvent = (event) => {
    const target  = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
        [name] : value
    });
    this.filterPeopleByName(value);
  }

  render() {
    const { children } = this.props;
    return (
      <Context.Provider
        value={{
          ...this.state,
          filterPeopleByName: this.filterPeopleByName,
          getHomeWorldForUser: this.getHomeWorldForUser,
          handleInputEvent: this.handleInputEvent
        }}
      >
        {children}
      </Context.Provider>
    );
  }
}
PeopleContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default { Provider: PeopleContextProvider, Consumer: Context.Consumer };
