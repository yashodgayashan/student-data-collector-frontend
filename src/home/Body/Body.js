import React, { Fragment } from "react";

import "./Body.css";
import Header from "./Header/Header";
import Table from "./Table/Table";
import AddStudent from "./AddStudents/AddStudents";

const Body = () => {
  return (
    <Fragment>
      <div className="body">
        <Header />
        <AddStudent />
        <Table />
      </div>
    </Fragment>
  );
};

export default Body;
