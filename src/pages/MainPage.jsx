import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MainPage = () => {
  return (
    <div>
      <h1>Main Page</h1>
      <p>Welcome to the main page!</p>
        <GoLogin to='/login'> 로그인 </GoLogin>
    </div>
  );
};

export default MainPage;

const GoLogin = styled(Link)`
  color: black;
  cursor: pointer;
  text-decoration: none;
`;
