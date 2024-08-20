import React from 'react';
import styled from 'styled-components';

const BPageContainer = styled.div`
  position: absolute;
  top: 110px; /* MyPage의 StyledImage 위에서의 위치 */
  width: 1100px;
  height: 1780px;
  background-color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BPageContent = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
`;

const BPage = () => {
  return (
    <BPageContainer>
      <BPageContent>여행 기록</BPageContent>
    </BPageContainer>
  );
};

export default BPage;
