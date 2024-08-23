import React from 'react';
import styled from 'styled-components';

const APageContainer = styled.div`
  position: absolute;
  top: 150px; /* MyPage의 StyledImage 위에서의 위치 */
  left: 100px; /* 왼쪽에서의 위치 */
  width: 1000px;
  height: 660px;
  background-color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const APageContent = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
`;

const APage = () => {
  return (
    <APageContainer>
      <APageContent>여행가 프로필</APageContent>
    </APageContainer>
  );
};

export default APage;