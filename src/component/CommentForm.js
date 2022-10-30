import React from "react";
import { Button, Modal } from "react-bootstrap";
import { Row, Col, Label } from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";

function CommentForm({dishId, addComment}) {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [lengthError, setLengthError] = React.useState(null)
  const [state, setState] = React.useState({
    rating: "1",
    name: "",
    comment: "",
    touched: {
      rating: false,
      name: false,
      comment: false,
    },
  });
  
  const {rating, name, comment, touched} = state

  const handleSubmit = (values) => {
    // console.log(addComment)
    addComment(dishId, values.rating, values.author, values.comment)
    handleClose()
    // setState({
    //   rating: values.rating,
    //   name: values.name,
    //   comment: values.comment
    // });
  };
  
  const handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setState({
      ...state,
      [name]: value,
    });
  };

  
  const validate = (name) => {
    if (touched.name && name.length < 3)
       return "Must be greater than 2 characters";
    else if (touched.name && name.length > 15)
      return "Must be less than 16 characters";
    return null
  };
  
  const handleBlur = (event) => {
    setState({
      ...state,
      touched: {
        ...touched,
        [event.target.name]: true,
      }
    });
    if (event.target.name === 'name'){
      setLengthError(validate(event.target.value))
    }
    
  };

  return (
    <>
      <Button
        style={{
          color: "gray",
          backgroundColor: "white",
          border: "2px solid gray",
        }}
        onClick={handleShow}
      >
        Submit Comment
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Submit Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LocalForm
            className="px-3"
            onSubmit={(values) => handleSubmit(values)}
          >
            <Row className="form-group mb-3">
              <Label htmlFor="rating">Rating</Label>
              <Control.select
                model=".rating"
                name="rating"
                className="form-control"
                onChange={e => handleInputChange(e)}
                onBlur={e => handleBlur(e)}
              >
                {[0, 1, 2, 3, 4].map((point) => (
                  <option key={point}>{point + 1}</option>
                ))}
              </Control.select>
            </Row>
            <Row className="form-group mb-3">
              <Label htmlFor="name">Your Name</Label>
              <Control.text
                model=".name"
                id="name"
                name="name"
                placeholder="Your Name"
                className="form-control"
                onChange={e => handleInputChange(e)}
                onBlur={e => handleBlur(e)}
              />
              <div style={{ color: 'red'}}>{lengthError ? lengthError : "" }</div>
            </Row>
            <Row className="form-group mb-3">
              <Label htmlFor="comment">Comment</Label>
              <Control.textarea
                model=".comment"
                id="comment"
                name="comment"
                rows="6"
                className="form-control"
                onChange={e => handleInputChange(e)}
                onBlur={e => handleBlur(e)}
              />
            </Row>
            <Row>
              <Button type="submit" color="primary" className="w-25">
                Submit
              </Button>
            </Row>
          </LocalForm>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}

export default CommentForm;
