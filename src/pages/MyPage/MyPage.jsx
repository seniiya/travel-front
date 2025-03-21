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
  min-height: ${props => props.minHeight}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;

  @media (max-width: 768px) {
    padding-top: 80px;
  }
`;

const Tabs = styled.div`
  position: relative;
  top: 120px;
  left: -6%;
  display: flex;
  justify-content: center;
  z-index: 10;

  @media (max-width: 768px) {
    top: 50px;
    width: 100%;
  }
`;

const Tab = styled.div`
  padding-top: 30px;
  color: #75797D;
  cursor: pointer;
  width: 295px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 18px;
  background-color: none;
  border: none;

  ${props => props.index === 0 && `
      position: relative;
      left: 10px;
  `}

  @media (max-width: 768px) {
    width: 50%;
    height: 40px;
    line-height: 40px;
    ${props => props.index === 0 && `
      left: 5px; // Adjust for mobile if needed
    `}
  }
  }

  @media (max-width: 480px) {
    width: 100%;
    height: 40px;
    line-height: 40px;
    ${props => props.index === 0 && `
      left: 0; // Remove left positioning on very small screens
    `}
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1200px;
  height: 500px;
  overflow: visible;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    height: auto;
  }
`;

const StyledImage = styled.img`
  position: absolute;
  width: ${({ width }) => width || '100px'};
  height: ${({ height }) => height || '100px'};
  top: ${({ top }) => top || '0'};
  left: ${({ left }) => left || '0'};
  transition: transform 0.3s ease, filter 0.3s ease;
  z-index: ${({ isSelected }) => (isSelected ? 2 : 1)};
  filter: ${({ isSelected }) => (isSelected ? 'none' : 'grayscale(80%)')};
  transform: ${({ isSelected, translateY }) => 
    isSelected ? `translateY(${translateY || '-10px'})` : 'translateY(0)'};
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
`;

const ScrollToTopButton = styled.button`
  position: fixed;
  bottom: 350px;
  right: 100px;
  background-color: #ffffff;
  color: #005cf9;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 16px;
  z-index: 1000;
  width: 30px;
  height: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #ffffff;
  }

  @media (max-width: 768px) {
    bottom: 100px;
    right: 20px;
  }
`;


const MyPage = () => {
  const [selectedUnion, setSelectedUnion] = useState(1);

  const handleUnionClick = (id) => {
    setSelectedUnion(id);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <MyPageContainer>
        <Tabs>
          <Tab index={0} active={selectedUnion === 1} onClick={() => handleUnionClick(1)}>여행가 프로필</Tab>
          <Tab active={selectedUnion === 2} onClick={() => handleUnionClick(2)}>여행 기록</Tab>
          <Tab active={selectedUnion === 3} onClick={() => handleUnionClick(3)}>스크랩 파일</Tab>
          <Tab active={selectedUnion === 4} onClick={() => handleUnionClick(4)}>여행 지도</Tab>
        </Tabs>

        <ImageContainer>
          <StyledImage
            src={union}
            alt="Union"
            isSelected={selectedUnion === 1}
            width="1300px"
            height="803px"
            top="10%"
            left="-4.4%"
            onClick={() => handleUnionClick(1)}
          />
          <StyledImage
            src={union2}
            alt="Union2"
            isSelected={selectedUnion === 2}
            width="1300px"
            height="2000px"
            top="10%"
            left="-4.5%"
            onClick={() => handleUnionClick(2)}
          />
          <StyledImage
            src={union3}
            alt="Union3"
            isSelected={selectedUnion === 3}
            width="1300px"
            height="2000px"
            top="10%"
            left="4.5%"
            translateY="-15px"
            onClick={() => handleUnionClick(3)}
          />
          <StyledImage
            src={union4}
            alt="Union4"
            isSelected={selectedUnion === 4}
            width="1300px"
            height="900px"
            top="10%"
            left="3.5%"
            translateY="-15px"
            onClick={() => handleUnionClick(4)}
          />

          <PageOverlay>
            {selectedUnion === 1 && <APage />}
            {selectedUnion === 2 && <BPage />}
            {selectedUnion === 3 && <CPage />}
            {selectedUnion === 4 && <DPage />}
          </PageOverlay>
        </ImageContainer>

        <ScrollToTopButton onClick={scrollToTop}>↑</ScrollToTopButton>
      </MyPageContainer>
    </>
  );
};

export default MyPage;