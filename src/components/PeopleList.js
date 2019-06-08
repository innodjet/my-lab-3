import React from "react";
import PropTypes from "prop-types";
import Person from "./Person";
import PeopleContext from "../context";

const PeopleList = ({ people , 
                      getHomeWorldForUser, 
                      peopleListDataLoadingStatus, 
                      isPeopleListDataReady }) => (
  <div>
    <div className="people-list">
      <div className="spinner-border text-primary" style={ peopleListDataLoadingStatus } role="status">
        <span className="sr-only"></span> 
      </div>
        { people.map((person ,index) => (
          <Person key={person.name} 
                  isPeopleListDataReady={ isPeopleListDataReady  }
                  person={person} 
                  getHomeWorldForUser={ getHomeWorldForUser } />
        ))}
      </div>
  </div>
);

PeopleList.propTypes = {
  people: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      height: PropTypes.string.isRequired,
      mass: PropTypes.string.isRequired,
      gender: PropTypes.string.isRequired
    })
  ).isRequired
};

export default () => (
  <PeopleContext.Consumer>
    {({ people , 
        getHomeWorldForUser , 
        peopleListDataLoadingStatus,
        isPeopleListDataReady }) => <PeopleList people={ people }
                                                isPeopleListDataReady={ isPeopleListDataReady }
                                                getHomeWorldForUser={ getHomeWorldForUser }
                                                peopleListDataLoadingStatus={ peopleListDataLoadingStatus }
     />}
  </PeopleContext.Consumer>
);
