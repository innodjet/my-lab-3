import React from "react";
import PeopleContext from "../context";

const  inputStyle = {
  width: "100%",
  height: "47px",
  border: "1px #000000 solid",
  padding: "10px"
}

const SearchBar = ( { handleInputEvent , searchValue } ) => (
  <div className="search-bar">
    <span className="add-on"><i className="fa fa-search"></i></span> 
    <input  className="search" 
            name ="searchValue"
            value={ searchValue }
            onChange = { handleInputEvent }
            style={ inputStyle }
            type="text" 
            placeholder="Search" />
  </div>
);

export default () => (
  <PeopleContext.Consumer>
    {({ handleInputEvent , 
        searchValue }) => <SearchBar  handleInputEvent={ handleInputEvent } 
                                      searchValue={ searchValue }
     />}
  </PeopleContext.Consumer>
);
