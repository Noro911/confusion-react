import React from "react";
import Menu from "./MenuComponent";
import DishDetail from "./DishdetailComponent";
import { DISHES } from "../shared/dishes";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import { COMMENTS } from "../shared/comments";
import { PROMOTIONS } from "../shared/promotions";
import { LEADERS } from "../shared/leaders";
import About from "./AboutComponent";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};

function Main({ dishes, comments, promotions, leaders }) {
  // const [state, setState] = React.useState({
  //   dishes: DISHES,
  //   comments: COMMENTS,
  //   promotions: PROMOTIONS,
  //   leaders: LEADERS,
  // });
  const [selectedDish, setSelectedDish] = React.useState(null);

  const onDishSelect = (dish) => {
    setSelectedDish(dish);
  };

  const HomePage = () => {
    return (
      <Home
        dish={dishes.filter((dish) => dish.featured)[0]}
        promotion={promotions.filter((promo) => promo.featured)[0]}
        leader={leaders.filter((leader) => leader.featured)[0]}
      />
    );
  };

  const DishWithId = () => {
    const { dishId } = useParams();
    return (
      <DishDetail
        dish={dishes.filter((dish) => dish.id === parseInt(dishId, 10))[0]}
        comments={comments.filter(
          (comment) => comment.dishId === parseInt(dishId, 10)
        )}
      />
    );
  };

  return (
    <>
      <div>
        <Header />
        <Routes>
          <Route path="/home" element={HomePage()} />
          <Route
            path="/menu"
            element={
              <>
                <Menu dishes={dishes} onClick={(dish) => onDishSelect(dish)} />
                {selectedDish && <DishDetail dish={selectedDish} />}
              </>
            }
          />
          <Route path="/contactus" element={<Contact />} />
          <Route path="/menu/:dishId" element={<DishWithId />} />
          <Route path="/aboutus" element={<About leaders={leaders} />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default withRouter(connect(mapStateToProps)(Main));
