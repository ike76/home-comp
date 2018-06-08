import React from "react";

export default props => {
  let icon;
  switch (props.type) {
    case "up":
      props.selected ? (icon = <span>▲</span>) : (icon = <span>△</span>);
      break;
    case "down":
      props.selected ? (icon = <span>▼</span>) : (icon = <span>▽</span>);
      break;
    default:
      return null;
  }
  return <span onClick={props.click}>{icon}</span>;
};
