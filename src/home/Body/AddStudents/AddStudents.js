import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import "./AddStudents.css";
import axios from "axios";

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

const AddStudents = () => {
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

  const formHandler = event => {
    axios
      .post("http://localhost:9090/student/insertStudent", {
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

  return (
    <Fragment>
      <div>
        <button
          type="button"
          class="btn btn-primary basics"
          onClick={handleOpen}
        >
          Add students
        </button>
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
              <h2 id="transition-modal-title">Student Information</h2>
              <p id="transition-modal-description">Please insert values</p>
              <form onSubmit={() => formHandler()}>
                <p>Enter students name:</p>
                <input
                  type="text"
                  name="name"
                  required
                  onChange={event => setName(event.target.value)}
                />
                <p>Enter students id:</p>
                <input
                  type="number"
                  name="id"
                  required
                  onChange={event => setId(event.target.value)}
                />
                <p>Enter students age:</p>
                <input
                  type="number"
                  name="age"
                  required
                  onChange={event => setAge(event.target.value)}
                />
                <p>Enter students address:</p>
                <input
                  type="text"
                  name="address"
                  required
                  onChange={event => setAddress(event.target.value)}
                />
                <br />
                <br />
                <button type="submit" onClick={() => formHandler()}>
                  Submit
                </button>
              </form>
            </div>
          </Fade>
        </Modal>
      </div>
    </Fragment>
  );
};

export default AddStudents;
