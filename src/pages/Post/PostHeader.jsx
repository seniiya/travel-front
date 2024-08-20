import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
  text-align: left;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  margin: 0;
`;

const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  color: #888;
`;

const PostHeader = ({ title, author, date }) => {
  return (
    <Header>
      <Title>{title}</Title>
      <Meta>
        <span>{author}</span>
        <span>{date}</span>
      </Meta>
    </Header>
  );
};

export default PostHeader;
