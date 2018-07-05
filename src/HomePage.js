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
import compHouses from "./Images/compHouses.png";
import { withStyles } from "@material-ui/core";
const HomeDiv = styled.div`
  margin: 1rem auto;
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

const HomePage = props => {
  const { classes } = props;
  const bull = <span className={classes.bullet}>•</span>;
  return (
    <HomeDiv>
      <Typography variant="display1" gutterBottom>
        House Hunting can be overwhelming
      </Typography>

      <Typography gutterBottom>
        Each house has its own unique array of pros and cons
      </Typography>
      <Typography>
        Comparing <em>"prices"</em> or <em>"number of bedrooms"</em> is easy,
        but after seeing a few houses, it can be hard to remember (and even
        harder to
        <em> compare</em>) the other less-obvious attributes.
      </Typography>

      <div style={{ width: "100%", textAlign: "center", marginTop: "2rem" }}>
        <img
          src={compHouses}
          alt=""
          style={{ maxWidth: "85%", maxHeight: "300px" }}
        />
      </div>
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

      <Typography gutterBottom>Sort by price:</Typography>
      <ImgStyle src={priceStrip} alt="sort houses by price" />
      <Typography gutterBottom>Sort by size:</Typography>
      <ImgStyle src={sizeStrip} alt="sort houses by size" />
      <Typography gutterBottom>
        Sort by <em>driving time</em> to any address (work? school? family
        members?)
      </Typography>
      <ImgStyle src={distanceStrip} alt="sort houses by price" />
      <Typography gutterBottom>
        You can even sort by non-numerical qualities, such as{" "}
        <em>"Kitchen quality" </em>
        or <em>"Neighborhood vibe"</em>
        <br /> (Upload a photo and rate each house on a 7-star scale)
      </Typography>
      <ImgStyle src={kitchenStrip} alt="sort houses by price" />
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
