import React from "react";
import PropTypes from "prop-types";
import PeopleContext from "../context";

const HomeWorld = ({ homeworld , homeWorldDataLoadingStatus }) => (
  <div className="homeworld">
    <div className="title">HomeWorld</div>
    <div className="spinner-border text-primary" style={ homeWorldDataLoadingStatus } role="status">
      <span className="sr-only"></span>
    </div>
    <div className="text">{homeworld.name}</div>
    {homeworld.climate && (
      <div className="text">{`Climate: ${homeworld.climate}`}</div>
    )}
    {homeworld.gravity && (
      <div className="text">{`Gravity: ${homeworld.gravity}`}</div>
    )}
  </div>
);

HomeWorld.propTypes = {
  homeworld: PropTypes.shape({
    name: PropTypes.string,
    climate: PropTypes.string,
    gravity: PropTypes.string
  }).isRequired
};

export default () => (
  <PeopleContext.Consumer>
    {({ homeworld , homeWorldDataLoadingStatus }) => <HomeWorld homeworld={homeworld} 
                                                                homeWorldDataLoadingStatus={ homeWorldDataLoadingStatus }
    />}
  </PeopleContext.Consumer>
);
