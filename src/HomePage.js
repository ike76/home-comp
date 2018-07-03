import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";

import priceStrip from "./Images/pricestrip.jpg";
import sizeStrip from "./Images/sizeStrip.jpg";
import kitchenStrip from "./Images/kitchenStrip.jpg";
import distanceStrip from "./Images/distanceStrip.jpg";

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

const Pstyle = styled.p`
  font-family: "Roboto", "Helvetica", sans-serif;
  font-weight: 100;
  // margin: 0 3px;
`;
const LiStyle = styled.li`
  font-family: "Roboto", "Helvetica", sans-serif;
  font-weight: 100;
`;
const ImgStyle = styled.img`
  max-width: 90%;
`;

export default () => {
  return (
    <HomeDiv>
      <HomeStyle>HOME</HomeStyle>
      <CompStyle>COMP</CompStyle>
      <Pstyle>House Hunting can be overwhelming</Pstyle>
      <Pstyle>Each house has its own unique array of pros and cons</Pstyle>
      <Pstyle>
        Comparing prices is easy, but other considerations are often more
        important;
      </Pstyle>
      <ul>
        <LiStyle>how far is it from work?</LiStyle>
        <LiStyle>does it have a garage?</LiStyle>
        <LiStyle>is the yard big enough for the dog?</LiStyle>
        <LiStyle>how nice is the kitchen?</LiStyle>
      </ul>
      <Pstyle>
        HOMECOMP helps you organize your new home candidates by making 'apples
        to apples' comparisons.
      </Pstyle>
      <hr />
      <h3>Sort your top candidates:</h3>
      <Pstyle>...by price:</Pstyle>
      <ImgStyle src={priceStrip} alt="sort houses by price" />
      <Pstyle>...or size:</Pstyle>
      <ImgStyle src={sizeStrip} alt="sort houses by size" />
      <Pstyle>
        ...or sort by distance to any address (work? family members?)
      </Pstyle>
      <ImgStyle src={distanceStrip} alt="sort houses by price" />
      <Pstyle>...or sort by non-numerical attributes, such as </Pstyle>
      <Pstyle>
        'How nice is the kitchen?' (give each house its own rating)
      </Pstyle>
      <ImgStyle src={kitchenStrip} alt="sort houses by price" />
      <Pstyle>
        This allows you to think through your own unique priorities and
        trade-offs to make a more informed decision
      </Pstyle>
      <Link to="/signin">
        <Button variant="outlined" color="primary">
          Sign IN
        </Button>
      </Link>
      <Link to="/signup">
        <Button variant="outlined" color="primary">
          Sign UP
        </Button>
      </Link>
    </HomeDiv>
  );
};
