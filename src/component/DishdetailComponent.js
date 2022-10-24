import React, { Component } from "react";
import { Link } from 'react-router-dom'
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";

function DishDetail({ dish, comments }) {
  const renderDish = (dish) => {
    return (
      <div className="col-12 col-md-5 m-1">
        <Card>
          <CardImg top src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  };

  const renderComments = (comments) => {
    return comments.map((comment) => (
      <div key={comment.id}>
        <p>{comment.comment}</p>
        <p>
          -- {comment.author},{" "}
          {new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          }).format(new Date(Date.parse(comment.date)))}
        </p>
      </div>
    ));
  };

  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/menu">Menu</Link>
          </BreadcrumbItem>

          <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
        </Breadcrumb>

        <div className="col-12">
          <h3>{dish.name}</h3>

          <hr />
        </div>
      </div>
      <div className="row">
        {renderDish(dish)}
        <div className="col-12 col-md-5 m-1">
          <h4>Comments</h4>
          {renderComments(comments)}
        </div>
      </div>
    </div>
  );
}

export default DishDetail;
