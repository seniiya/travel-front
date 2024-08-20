import React, { useState } from "react";
import styled from "styled-components";
import backgroundImage from '../../components/pic/MainBack.png';
import union from '../../components/pic/Union.png';
import union2 from '../../components/pic/Union2.png';
import union3 from '../../components/pic/Union3.png';
import union4 from '../../components/pic/Union4.png';

import APage from './APage.jsx';
import BPage from './BPage.jsx';
import CPage from './CPage.jsx';
import DPage from './DPage.jsx';

const MyPageContainer = styled.div`
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 120px;

  @media (max-width: 768px) {
    padding-top: 80px;
  }
`;

const Tabs = styled.div`
  position: relative;
  top: 75px;
  right: 60px;
  z-index: 5;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 768px) {
    top: 50px;
    right: 0;
    width: 100%;
  }
`;

const Tab = styled.div`
  background-color: none;
  color: #75797D;
  cursor: pointer;
  width: 270px;
  height: 75px;
  text-align: center;
  justify-content: center;
  line-height: 75px;
  z-index: 6;

  @media (max-width: 768px) {
    width: 50%;
    height: 60px;
    line-height: 60px;
  }

  @media (max-width: 480px) {
    width: 100%;
    height: 50px;
    line-height: 50px;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 1200px;
  height: 500px;
  overflow: visible;

  @media (max-width: 1200px) {
    width: 90%;
    height: auto;
  }
`;

const StyledImage = styled.img`
  position: absolute;
  top: 0;
  left: ${({ isUnion3, isUnion4 }) => {
    if (isUnion3) return '90px';
    if (isUnion4) return '50px';
    return '0';
  }};
  max-width: 100%;
  height: auto;
  transition: transform 0.3s ease, z-index 0.3s ease, filter 0.3s ease;
  z-index: ${({ zIndex }) => zIndex};
  filter: ${({ isSelected }) => (isSelected ? 'none' : 'grayscale(80%)')};
  transform: ${({ isSelected }) => (isSelected ? 'translateY(-10px)' : 'translateY(0)')};

  @media (max-width: 768px) {
    left: ${({ isUnion3, isUnion4 }) => {
      if (isUnion3) return '30px';
      if (isUnion4) return '20px';
      return '0';
    }};
  }

  @media (max-width: 480px) {
    left: 0;
    width: 100%;
    height: auto;
    position: relative;
    transform: ${({ isSelected }) => (isSelected ? 'translateY(-5px)' : 'translateY(0)')};
  }
`;

const PageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  pointer-events: none;
`;

const MyPage = () => {
  const [selectedUnion, setSelectedUnion] = useState(1);

  const handleUnionClick = (id) => {
    setSelectedUnion(id);
  };

  return (
    <MyPageContainer>
      <Tabs>
        <Tab active={selectedUnion === 1} onClick={() => handleUnionClick(1)}>여행가 프로필</Tab>
        <Tab active={selectedUnion === 2} onClick={() => handleUnionClick(2)}>여행 기록</Tab>
        <Tab active={selectedUnion === 3} onClick={() => handleUnionClick(3)}>스크랩 파일</Tab>
        <Tab active={selectedUnion === 4} onClick={() => handleUnionClick(4)}>여행 지도</Tab>
      </Tabs>

      <ImageContainer>
        <StyledImage
          src={union}
          alt="Union"
          zIndex={selectedUnion === 1 ? 4 : 1}
          isSelected={selectedUnion === 1}
          onClick={() => handleUnionClick(1)}
        />
        <StyledImage
          src={union2}
          alt="Union2"
          zIndex={selectedUnion === 2 ? 4 : 2}
          isSelected={selectedUnion === 2}
          onClick={() => handleUnionClick(2)}
        />
        <StyledImage
          src={union3}
          alt="Union3"
          zIndex={selectedUnion === 3 ? 4 : 3}
          isSelected={selectedUnion === 3}
          isUnion3={true}
          onClick={() => handleUnionClick(3)}
        />
        <StyledImage
          src={union4}
          alt="Union4"
          zIndex={selectedUnion === 4 ? 4 : 4}
          isSelected={selectedUnion === 4}
          isUnion4={true}
          onClick={() => handleUnionClick(4)}
        />

        {selectedUnion === 1 && (
          <PageOverlay>
            <APage />
          </PageOverlay>
        )}
        {selectedUnion === 2 && (
          <PageOverlay>
            <BPage />
          </PageOverlay>
        )}
        {selectedUnion === 3 && (
          <PageOverlay>
            <CPage />
          </PageOverlay>
        )}
        {selectedUnion === 4 && (
          <PageOverlay>
            <DPage />
          </PageOverlay>
        )}
      </ImageContainer>
    </MyPageContainer>
  );
};

export default MyPage;
