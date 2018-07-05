import React, { Component } from "react";
import { connect } from "react-redux";
import FlipMove from "react-flip-move";
import styled from "styled-components";
import House from "./House";
import { getMyHomes } from "./actions/houseActions";
import Spinner from "./UIElements/Spinner";
import AddNewHouseButton from "./AddNewHouseButton";
import ControlHouse from "./ControlHouse";
class HomeLister extends Component {
  getMyStuff = () => {
    this.props.dispatch(getMyHomes());
  };
  componentDidMount() {
    this.props.user ? this.getMyStuff() : console.log("no user yet");
  }
  render() {
    const { homes, attrNames, loading } = this.props;
    if (loading) {
      return <Spinner />;
    }
    return (
      <HomeListerGrid>
        <ControlHouse />
        <HouseDiv>
          <FlipMove style={listStyle}>
            {homes.map((home, i) => (
              <div key={home._id}>
                <House
                  home={home}
                  attrNames={attrNames}
                  // customAttrNames={customAttrNames}
                  index={i}
                />
              </div>
            ))}
            <AddNewHouseButton />
          </FlipMove>
        </HouseDiv>
      </HomeListerGrid>
    );
  }
}

const HomeListerGrid = styled.section`
  display: grid;
  grid-template-columns: max-content 1fr;
`;

const HouseDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  overflow: scroll;
  padding: 10px 5px 1.5rem;
  justify-content: center;
`;

const listStyle = {
  display: "flex",
  flexDirection: "row",
  overflow: "scroll",
  justifyContent: "safe",
  padding: ".5rem 5px 0"
};

const mapStateToProps = state => ({
  attrNames: state.house.attrNames,
  homes: state.house.homes,
  user: state.auth.user,
  loading: state.house.loading
});
export default connect(mapStateToProps)(HomeLister);
