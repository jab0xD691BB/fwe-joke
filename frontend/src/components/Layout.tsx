import React from "react";
import styled, { css } from "styled-components/macro";

export const Layout: React.FC = ({ children }) => {
  const headerHeight = "85px";
  const footerHeight = "50px";

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
    ${MaxWidth}
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
          <NavigationItem>Home</NavigationItem>
        </NavigationList>
      </Header>
      <Main>{children}</Main>
      <Footer>Footer</Footer>
    </>
  );
};
