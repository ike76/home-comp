import React from "react";
import styled from "styled-components";
export default props => {
  const Roof = styled.div`
    background: lightgrey;
    background-image: url(${props.roofImage});
    background-size: 200px 70px;
    -webkit-clip-path: polygon(7% 0, 93% 0, 100% 100%, 0% 100%);
    clip-path: polygon(7% 0, 93% 0, 100% 100%, 0% 100%);
    margin: -4px -10px;
    text-align: center;
    padding: 0 1rem;
    grid-area: 1 / ${props.colNumber} / 2 / ${props.colNumber};
    display: flex;
    align-items: flex-end;
    justify-content: center;
    height: 2.5rem;
  `;
  const RoofAddress = styled.div`
    color: white;
    background: #00000082;
    display: inline;
    padding: 3px;
  `;
  return (
    <Roof>
      <RoofAddress>{props.addy}</RoofAddress>
    </Roof>
  );
};
