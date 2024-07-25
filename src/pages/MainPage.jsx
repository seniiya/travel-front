import React from 'react';
import styled from 'styled-components';
import MainBack from '../pic/MainBack.png';
import logo2 from '../pic/logo2.png';
import folder from '../pic/folder.png';

const MainContainer = styled.div`
  position: relative;
  max-width: 1920px;
  height: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: 600px) {
    padding: 1em;
  }
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  max-width: 1920px;
  height: 1136px;
  width: 100%;
  z-index: -1;
`;

const Logo = styled.img`
  position: absolute;
  top: 200px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0.5;
  z-index: 1; 
`;

const Heading = styled.h2`
  font-size: 18px;
  font-weight: 700;
  position: absolute;
  color: #005CF9;
  margin: 0px;
  z-index: 2;
  text-align: center;
  @media (max-width: 600px) {
    color: #005CF9;
  }
`;

const FolderContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  justify-content: center;
  position: absolute;
  top: 500px;
  bottom: 1px;
  max-width: 1920px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const FolderCard = styled.div`
  position: relative;
  width: 210px;
  height: 160px;
  background: url(${folder}) no-repeat center center;
  background-size: 120% 120%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #B6CEF7;
  font-weight: bold;

  div {
    position: absolute;
    top: 30px;
    left: 25px;
    text-align: center;
  }
`;

const createFolder = (text) => (
  <FolderCard key={text}>
    <div>{text}</div>
  </FolderCard>
);

const MainPage = () => {
  return (
    <MainContainer>
      <BackgroundImage src={MainBack} alt="배경" />
      <Logo src={logo2} alt="로고" />
      <Heading style={{ top: '350px' }}>여행가들의 기록을 따라 떠나보세요</Heading>
      <Heading style={{ top: '380px' }}>기록을 통해 나만의 (memoir)를 완성해 보세요</Heading>
      <FolderContainer>
        {createFolder('• 모든 여행가')}
        {createFolder('• 신규 여행가')}
        {createFolder('• 쌓인 기록')}
        {createFolder('• 총 기록일')}
      </FolderContainer>
    </MainContainer>
  );
};

export default MainPage;