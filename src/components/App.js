import React from "react";
import SearchBar from "./SearchBar";
import PeopleList from "./PeopleList";
import HomeWorld from "./HomeWorld";
import PeopleContext from "../context";

const App = () => (
  <PeopleContext.Provider>
    <SearchBar />
    <div className="content">
      <PeopleList />
      <HomeWorld />
    </div>
  </PeopleContext.Provider>
);

export default App;
