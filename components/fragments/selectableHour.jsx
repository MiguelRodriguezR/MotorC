import React from "react";
import styled from "@emotion/styled";
import CONSTANTS from "../../helpers/constants";

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
  .hour {
    transition: all 0.2s ease-in-out;
    width: 15%;
    text-align: center;
    font-size: 1.5em;
    border-radius: 3px;
    margin-right: 5px;
    height: 40px;
    background-color: ${(props) =>
      props.bgcolor == "#FFFFFF" ? "#FFFFFF" : "transparent"};
    color: ${(props) => (props.bgcolor == "#FFFFFF" ? "#0F0F1E" : "#FFFFFF")};
  }
  .available {
    transition: all 0.2s ease-in-out;
    width: ${(props) => props.width};
    height: 40px;
    background-color: ${(props) => props.bgcolor};
    color: ${(props) => (props.bgcolor == "#FFFFFF" ? "#0F0F1E" : "white")};
    border-radius: 3px;
    text-align: center;
    font-size: 1.5em;
  }

  @media (max-width: 768px) {
    .hour {
      height: 20px;
      font-size: 0.8em;
    }
    .available {
      height: 20px;
      font-size: 0.8em;
    }
  }
`;

function SelectableHour({ section }) {
  const getWidth = (num) => {
    return "calc(" + (num / CONSTANTS.maxMotorbikes) * 85 + "%)";
  };

  return (
    <>
      <Container
        bgcolor={
          section.selected
            ? "#FFFFFF"
            : section.available > 0
            ? "#097B76"
            : "#0F0F1E"
        }
        width={
          section.selected
            ? "calc(85%)"
            : section.available > 0
            ? getWidth(section.available)
            : "calc(85%)"
        }
      >
        <div className="hour">{section.hour}</div>
        <div className="available">
          {section.selected
            ? "Selected" 
            : section.available > 0
            ? section.available + " Left"
            : "No Motorcycles left" }
        </div>
      </Container>
    </>
  );
}

export default SelectableHour;
