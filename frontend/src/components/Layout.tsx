import React from "react";
import { Link, Redirect } from "react-router-dom";
import styled, { css } from "styled-components/macro";

export const headerHeight = "85px";
export const footerHeight = "50px";

const MaxWidth = css`
  max-width: 860px;
  margin: auto;
`;

const Header = styled.header`
  height: ${headerHeight};
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 25px;
`;

const Main = styled.main`
  min-height: calc(100vh - ${headerHeight} - ${footerHeight});
  ${MaxWidth}//height: calc(100vh - ${headerHeight} - ${footerHeight});
  //height: calc(100vh - ${headerHeight} - ${footerHeight});
`;

const Footer = styled.footer`
  height: ${footerHeight};
  ${MaxWidth}
`;

const NavigationList = styled.ul`
  list-style: none;
`;
const NavigationItem = styled.li`
  color: ${(props) => props.theme.colors.primary};
  text-decoration: none;
  margin-right: 15px;
`;

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header>
        <div
          css={`
            font-size: 25px;
            letter-spacing: 2.3px;
            flex: 1;
          `}
        >
          <span
            css={`
              text-decoration: underline overline;
            `}
          >
            JOKE
          </span>
        </div>
        <NavigationList>
          <Link
            css={`
              text-decoration: none;
            `}
            to="/dashboard"
          >
            <NavigationItem>Home</NavigationItem>
          </Link>
          <Link
            css={`
              text-decoration: none;
            `}
            to="/random"
          >
            <NavigationItem>Random</NavigationItem>
          </Link>
        </NavigationList>
      </Header>
      <Main>{children}</Main>
      <Footer>Jo FWE Hausaufgabe</Footer>
    </>
  );
};
