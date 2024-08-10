import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #B6CEF7;
  font-weight: bold;

  div {
    text-align: center;
  }

  .text {
    position: absolute;
    top: 30px;
    left: 28px;
    font-size: 14px;
    color: #446BAE;
    font-weight: 400;
  }

  .number {
    font-size: 20px;
    font-weight: 500;
    margin-top: 20px;
    color: #446BAE;
  }

  &:hover .number {
    color: #005CF9;
  }
`;

const createFolder = (text, number) => (
  <FolderCard key={text}>
    <div className="text">{text}</div>
    <div className="number">{number}명</div>
  </FolderCard>
);

const MainPage = () => {
  const [allTravelers, setAllTravelers] = useState(0);
  const [newTravelers, setNewTravelers] = useState(0);
  const [records, setRecords] = useState(0);
  const [totalDays, setTotalDays] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allTravelersResponse = await fetch('/api/allTravelers');
        const newTravelersResponse = await fetch('/api/newTravelers');
        const recordsResponse = await fetch('/api/records');
        const totalDaysResponse = await fetch('/api/totalDays');

        const allTravelersData = await allTravelersResponse.json();
        const newTravelersData = await newTravelersResponse.json();
        const recordsData = await recordsResponse.json();
        const totalDaysData = await totalDaysResponse.json();

        setAllTravelers(allTravelersData.count);
        setNewTravelers(newTravelersData.count);
        setRecords(recordsData.count);
        setTotalDays(totalDaysData.days);

      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchData();
  }, []);

  return (
    <MainContainer>
      <BackgroundImage src={MainBack} alt="배경" />
      <Logo src={logo2} alt="로고" />
      <Heading style={{ top: '350px' }}>여행가들의 기록을 따라 떠나보세요</Heading>
      <Heading style={{ top: '380px' }}>기록을 통해 나만의 (memoir)를 완성해 보세요</Heading>
      <FolderContainer>
        {createFolder('• 모든 여행가', allTravelers)}
        {createFolder('• 신규 여행가', newTravelers)}
        {createFolder('• 쌓인 기록', records)}
        {createFolder('• 총 기록일', totalDays)}
      </FolderContainer>
    </MainContainer>
  );
};

export default MainPage;