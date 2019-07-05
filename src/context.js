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
    peopleCp: [], // keep initial people data on initial fetch 
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
  };

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
    let result =  data.results.map( (el) => {
      return {  name: el.name , 
                height: el.height,
                mass: el.mass,
                gender: el.gender,
                homeworld: el.homeworld
              };
    });
    // We have count which is the total number of result for the API
    // We know that the API return 10 result per request 
    // let's calculate the number of page we have in total
    const totalPage = (parseInt(data.count%10)) === 0 ? parseInt(data.count/10):(parseInt(data.count/10)) + 1;
    // let 's grab the next page URL to perform a new API call to get the data
    let nextUrl = data.next;
    if ( nextUrl !== null ) {
      for ( let i=1; i < totalPage; i++ ) {
          const rep1 = await fetch(nextUrl);
          const data1 = await rep1.json();
          const result1 =  data1.results.map( (el) => {
            return {  name: el.name , 
                      height: el.height,
                      mass: el.mass,
                      gender: el.gender,
                      homeworld: el.homeworld
                    };
          });
          nextUrl = data1.next;
          result = [ ...result, ...result1 ];
      }
    }
    this.setState({
      people: result,
      peopleCp: result,
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
    const result = this.state.peopleCp.filter( (el) => {
      const outName = el.name.split(' ').join('');
      return inName.toLocaleLowerCase() === outName.toLocaleLowerCase() || 
             el.name.toLocaleLowerCase().indexOf(name.toLocaleLowerCase()) !== -1;
    });    
    // This means we find a matching element
    if ( result.length !== 0 ) { 
      this.setState({
        people: result 
      });
    }
    // Reload our initial data 
    if ( name === '' ) {
      this.setState({
        people: this.state.peopleCp 
      });
    }
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
