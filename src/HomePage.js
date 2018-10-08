import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import priceStrip from "./Images/pricestrip.jpg";
import sizeStrip from "./Images/sizeStrip.jpg";
import kitchenStrip from "./Images/kitchenStrip.jpg";
import distanceStrip from "./Images/distanceStrip.jpg";
import screenshot from "./Images/HomeCompScreenshot.png";
import House from "./House";
import uuid from "uuid";
import { withStyles } from "@material-ui/core";
const HomeDiv = styled.div`
  padding: 2rem;
`;

const HomeStyle = styled.span`
  font-size: 1.5rem;
  font-weight: 500;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  line-height: 1.35417em;
`;
const CompStyle = styled.span`
  font-size: 1.5rem;
  font-weight: 100;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  line-height: 1.35417em;
`;
const CenterDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const ImgStyle = styled.img`
  max-width: 90%;
  margin-bottom: 1.5rem;
`;

const styles = {
  card: {
    width: "80%",
    padding: "1rem",
    margin: "2rem .5rem",
    textAlign: "center"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  }
};

const attrNames = [
  { slug: "price", pretty: "Price", type: "price", id: uuid() }
  // { slug: "square_ft", pretty: "Square Ft", type: "number", id: uuid() },
  // { slug: "bedrooms", pretty: "Bedrooms", type: "number", id: uuid() },
  // {
  //   slug: "to_work",
  //   pretty: "To Work",
  //   type: "map",
  //   address: "1234 Something Street",
  //   lat: 36.155165,
  //   lng: -86.782559,
  //   id: uuid()
  // },
  // { slug: "kitchen", pretty: "Kitchen", type: "image", id: uuid() }
];

const HomePage = props => {
  const { classes } = props;
  const bull = <span className={classes.bullet}>•</span>;
  return (
    <HomeDiv>
      <CenterDiv>
        <Card className={classes.card}>
          <CenterDiv>
            <HomeStyle>HOME</HomeStyle>
            <CompStyle>COMP</CompStyle>
          </CenterDiv>
          <Typography variant="body1" color="textSecondary">
            {bull} helps you organize your favorite homes by making 'apples to
            apples' comparisons <br />
            {bull} sorts your home candidates by any attribute <br />
            {bull} helps clarify your decision-making process
          </Typography>
        </Card>
      </CenterDiv>
      <div style={{ textAlign: "center" }}>
        <img src={screenshot} style={{ width: "100%", maxWidth: "600px" }} />
      </div>

      <CenterDiv>
        <Card className={classes.card}>
          <div style={{ width: "100%", textAlign: "center" }}>
            <HomeStyle>HOME</HomeStyle>
            <CompStyle>COMP</CompStyle>
          </div>
          <Typography gutterBottom color="textSecondary">
            {bull} allows you to think through your own priorities <br />
            {bull} helps you make a more informed decision
          </Typography>
        </Card>
      </CenterDiv>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center"
        }}
      >
        <Link to="/signin">
          <Button variant="outlined" color="primary" style={{ margin: "4px" }}>
            Sign IN
          </Button>
        </Link>
        <Link to="/signup">
          <Button variant="outlined" color="primary" style={{ margin: "4px" }}>
            Sign UP
          </Button>
        </Link>
      </div>
    </HomeDiv>
  );
};

export default withStyles(styles)(HomePage);
