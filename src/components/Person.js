import React from "react";
import PropTypes from "prop-types";

const Person = ({ person: { name, height, mass, gender , homeworld } ,
                  isPeopleListDataReady , getHomeWorldForUser }) => (
  <div className="person" style={isPeopleListDataReady}>
    <div className="title">{name}</div>
    <span className="text">{`${height}m`}</span>
    {" | "}
    <span className="text">{`${mass}kg`}</span>
    {" | "}
    <span className="text">{gender}</span>
    <button onClick ={ () => getHomeWorldForUser(homeworld) } > HomeWorld </button>
  </div>
);

Person.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    mass: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired
  }).isRequired
};

export default Person;
