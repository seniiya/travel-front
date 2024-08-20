import React from 'react';
import styled from 'styled-components';

const CPageContainer = styled.div`
  position: absolute;
  top: 110px; /* MyPage의 StyledImage 위에서의 위치 */
  width: 1100px;
  height: 1780px;
  background-color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CPageContent = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #ffffff;
`;

const CPage = () => {
  return (
    <CPageContainer>
      <CPageContent>스크랩 파일</CPageContent>
    </CPageContainer>
  );
};

export default CPage;
