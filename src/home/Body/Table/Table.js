import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

const Table = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState(null);
  const [id, setId] = useState(0);
  const [address, setAddress] = useState(null);
  const [age, setAge] = useState(0);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  const handleUpdate = () => {
    axios
      .put("http://localhost:9090/student/updateStudent", {
        student: {
          id: parseInt(id),
          fullName: name,
          age: parseInt(age),
          address: address
        }
      })
      .then(response => {
        console.log(response);
      })
      .catch();
  };

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

    const handleEdit = (id, fullName, age, address) => {
      setName(fullName);
      setId(id);
      setAddress(address);
      setAge(age);
    };

    const values = studentData.map((item, key) => {
      return (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.fullName}</td>
          <td>{item.age}</td>
          <td>{item.address}</td>
          <td>
            <button
              type="button"
              className="btn btn-info"
              onClick={() => {
                handleEdit(item.id, item.fullName, item.age, item.address);
                handleOpen();
              }}
            >
              Edit
            </button>
          </td>
          <td>
            <button
              type="button"
              className="btn btn-danger"
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

  return (
    <Fragment>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <h2 id="transition-modal-title">{name}</h2>
              <p id="transition-modal-description">Edit details</p>
              <form>
                <p>Edit students name:</p>
                <input
                  type="text"
                  name="name"
                  value={name}
                  required
                  onChange={event => setName(event.target.value)}
                />
                <p>Enter students age:</p>
                <input
                  type="number"
                  name="age"
                  value={age}
                  required
                  onChange={event => setAge(event.target.value)}
                />
                <p>Enter students address:</p>
                <input
                  type="text"
                  name="address"
                  value={address}
                  required
                  onChange={event => setAddress(event.target.value)}
                />
                <br />
                <br />
                <button type="submit" onClick={() => handleUpdate()}>
                  Submit
                </button>
              </form>
            </div>
          </Fade>
        </Modal>
      </div>
      {data ? getData() : <p>hi</p>}
    </Fragment>
  );
};

export default Table;
