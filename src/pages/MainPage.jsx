import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import MainBack from '../components/pic/MainBack.png';
import logo2 from '../components/pic/logo2.png';
import folder from '../components/pic/folder.png';

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
  opacity: 0.8;
  z-index: 1; 
  filter: brightness(1.5) contrast(0.9) saturate(1) hue-rotate(-180deg);
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
  height: 180px;
  background: url(${folder}) no-repeat center center;
  background-size: 120% 120%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #B6CEF7;
  font-size: 15px;
  font-weight: bold;

  div {
    position: absolute;
    top: 30px;
    left: 25px;
    text-align: center;
  }

  span {
    position: absolute;
    bottom: 68px;
    left: 83px;
    font-size: 24px;
    font-weight: 500;
    color: #B6CEF7;
    transition: color 0.3s ease;
  }

  &:hover span {
    color: #005CF9;
  }
`;

const MainPage = () => {
  const [serverLogs, setServerLogs] = useState({
    allUsers: 0,
    recentSignupUsers: 0,
    allPosts: 0,
    runningDays: 0,
  });

  useEffect(() => {
    const fetchServerLogs = async () => {
      try {
        const response = await axios.get('https://81bc-203-255-3-239.ngrok-free.app/api/v1/main/serverLogs');
        if (response.data.isSuccess) {
          setServerLogs(response.data.result);
        } else {
          console.error('API 요청 실패:', response.data.message);
        }
      } catch (error) {
        console.error('서버 로그를 가져오는 중 오류가 발생했습니다:', error);
      }
    };

    fetchServerLogs();
  }, []);

  return (
    <MainContainer>
      <BackgroundImage src={MainBack} alt="배경" />
      <Logo src={logo2} alt="로고" />
      <Heading style={{ top: '350px' }}>여행가들의 기록을 따라 떠나보세요</Heading>
      <Heading style={{ top: '380px' }}>기록을 통해 나만의 (memoir)를 완성해 보세요</Heading>
      <FolderContainer>
        <FolderCard>
          <div>• 모든 여행가</div>
          <span>{serverLogs.allUsers}명</span>
        </FolderCard>
        <FolderCard>
          <div>• 신규 여행가</div>
          <span>{serverLogs.recentSignupUsers}명</span>
        </FolderCard>
        <FolderCard>
          <div>• 쌓인 기록</div>
          <span>{serverLogs.allPosts}명</span>
        </FolderCard>
        <FolderCard>
          <div>• 총 기록일</div>
          <span>{serverLogs.runningDays}일</span>
        </FolderCard>
      </FolderContainer>
    </MainContainer>
  );
};

export default MainPage;
