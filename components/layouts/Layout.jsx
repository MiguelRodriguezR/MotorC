import React from "react";
import styled from "@emotion/styled";
import TopMenu from "./TopMenu";

const Container = styled.div`
  /* margin-left: 70px; */
  margin-top: 80px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content:center;
  align-items: center;
  main {
    width: 100%;
    display: flex;
    justify-content:center;
    align-items: center;
  }
`;

const Layout = (props) => {
  return (
    <Container>
      <TopMenu></TopMenu>
      <main>{props.children}</main>
    </Container>
  );
};

export default Layout;