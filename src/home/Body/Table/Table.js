import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";

const Table = () => {
  const [studentData, setStudentData] = useState(false);
  const [data, setdata] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:9090/student/getAllStudents")
      .then(response => {
        setStudentData(response.data);
        console.log(response.data);
      })
      .catch();
  }, [isLoaded]);

  useEffect(() => {
    if (studentData) {
      setdata(true);
    }
  }, [studentData]);

  const getData = () => {
    const handleClick = val => {
      console.log(val);
      axios
        .delete("http://localhost:9090/student/deleteStudent/" + val)
        .then(response => {
          console.log(response);
          setIsLoaded(true);
          setdata(false);
        })
        .catch();
    };

    const values = studentData.map((item, key) => {
      return (
        <tr>
          <td>{item.id}</td>
          <td>{item.fullName}</td>
          <td>{item.age}</td>
          <td>{item.address}</td>
          <td>
            <button type="button" class="btn btn-info">
              Edit
            </button>
          </td>
          <td>
            <button
              type="button"
              class="btn btn-danger"
              onClick={() => {
                handleClick(item.id);
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });

    return (
      <table className="table table-hover table-bordered ">
        <thead className="thead-light">
          <tr>
            <th>Id</th>
            <th>Full Name</th>
            <th>Age</th>
            <th>Address</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{values}</tbody>
      </table>
    );
  };
  return <Fragment> {data ? getData() : <p>hi</p>}</Fragment>;
};

export default Table;
