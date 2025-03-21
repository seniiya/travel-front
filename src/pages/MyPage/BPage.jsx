import React, { useState } from 'react';
import styled from 'styled-components';
import sampleDefault from '../../components/pic/default.png';
import imageDefault from '../../components/pic/default.png';
import like from '../../components/pic/grayLike.png';
import scrap from '../../components/pic/grayScrap.png';
import write from '../../components/pic/write.png';

const BPageContainer = styled.div`
  position: absolute;
  top: 150px;
  width: 1100px;
  height: auto;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  z-index: 9;
`;

const WriteButton = styled.button`
  position: absolute;
  bottom: 50px;
  right: 30px;
  width: 100px;
  height: 60px;
  background-color: #ffffff;
  border: none;
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  z-index: 10;
  font-size: 16px;
  color: #75797D;

  img {
    width: 20px;
    height: 20px;
  }
`;

const FlexContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  font-size: 20px;
  color: ${({ isActive }) => (isActive ? '#005CF9' : '#B4B7B9')};
  background-color: #ffffff;
  cursor: pointer;
  display: flex;
  border: none;
  align-items: center;

  &:hover {
    background-color: #f0f0f0;
  }

  input {
    margin-right: 10px;
  }
`;

const SortingContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const SortOptions = styled.div`
  display: flex;
  gap: 10px;

  span {
    cursor: pointer;

    &.active {
      color: #005CF9;
      font-weight: bold;
    }
  }

  .separator {
    color: #ccc;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: ${({ isDestination }) => (isDestination ? '30px 30px 80px 30px' : '50px 20px 80px 20px')};
  gap: ${({ isDestination }) => (isDestination ? '20px' : '30px')};
  z-index: 8;
`;

const Card = styled.div`
  position: relative;
  border-radius: ${({ isDestination }) => (isDestination ? '8px' : '12px')};
  width: 250px;
  height: ${({ isDestination }) => (isDestination ? '320px' : '400px')};
  background-color: #ffffff;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  }
`;

const ImageWrapper = styled.div`
  width: ${({ isDestination }) => (isDestination ? '250px' : '230px')};
  height: ${({ isDestination }) => (isDestination ? '190px' : '240px')};
  overflow: hidden;
  margin: ${({ isDestination }) => (isDestination ? 'none' : '10px')};
  margin-bottom: 12px;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
`;

const Title = styled.h3`
  font-size: 18px;
  margin: 0 0 0 13px;
  font-weight: 500;
  color: black;
  margin-bottom: 12px;
`;

const Content = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0 13px 0 13px;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const TagsContainer = styled.div`
  position: absolute;
  bottom: 150px;
  left: 6px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  background-color: none;
  border-radius: 4px;
  padding: 4px;

  span {
    background-color: #ffffff;
    color: #005CF9;
    padding: 2px 6px;
    font-size: 10px;
    height: 18px;
    border-radius: 4px;
    border: 0.5px solid #A8C5F6;
  }
`;

const SmallTextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 10px 10px 13px;
`;

const SmallText = styled.small`
  font-size: 12px;
  color: #999;
  display: flex;
  align-items: center;

  img {
    margin-right: 5px;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  button {
    margin: 0 5px;
    padding: 8px 12px;
    border: none;
    border-radius: 20px;
    font-size: 15px;
    background-color: #F7F7F7;
    cursor: pointer;
  }

  span {
    background-color: none;
    border: none;
    padding: 8px 12px;
    margin: 0 9px;
  }

  .active {
    color: #005CF9;
    background-color: none;
  }
`;

const FixedButtonLeft = styled.button`
  position: fixed;
  bottom: 400px;
  left: 100px;
  background-color: #ffffff;
  color: #75797d;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  z-index: 1000;
  width: 30px;
  height: 30px;

  &:disabled {
    color: #ddd;
  }

`;

const FixedButtonRight = styled.button`
  position: fixed;
  bottom: 400px;
  right: 100px;
  background-color: #ffffff;
  color: #75797d;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  z-index: 1000;
  width: 30px;
  height: 30px;

  &:disabled {
    color: #ddd;
`;

const destinations = [
  { id: 1, title: '여행지 1', image: sampleDefault, content: '여행지 1 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다', nickname: '김태엽', date: '2021-08-20', views: '998', likes: 54, scraps: 12, dest: '대한민국 - 서울 · 경기' },
  { id: 2, title: '여행지 2', image: sampleDefault, content: '여행지 2 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다', nickname: '김태엽', date: '2021-08-21', views: '999', likes: 65, scraps: 15, dest: '북아메리카 - 미국 · 서부' },
  { id: 3, title: '여행지 3', image: sampleDefault, content: '여행지 3 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다', nickname: '김태엽', date: '2021-08-22', views: '912', likes: 66, scraps: 8, dest: '유럽 - 동유럽' },
  { id: 4, title: '여행지 4', image: sampleDefault, content: '여행지 4 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다', nickname: '김태엽', date: '2021-08-23', views: '91', likes: 67, scraps: 5, dest: '아시아 - 일본' },
  { id: 5, title: '여행지 5', image: sampleDefault, content: '여행지 5 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다', nickname: '김태엽', date: '2021-08-24', views: '9', likes: 68, scraps: 7, dest: '아프리카 - 모로코' },
  { id: 6, title: '여행지 6', image: sampleDefault, content: '여행지 6 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다', nickname: '김태엽', date: '2021-08-25', views: '99999', likes: 69, scraps: 21, dest: '유럽 - 북유럽' },
  { id: 7, title: '여행지 7', image: sampleDefault, content: '여행지 7 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다', nickname: '김태엽', date: '2021-08-26', views: '999999', likes: 70, scraps: 33, dest: '북아메리카 - 미국 · 동부' },
  { id: 8, title: '여행지 8', image: sampleDefault, content: '여행지 8 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다', nickname: '김태엽', date: '2021-08-27', views: '99999', likes: 71, scraps: 14, dest: '대한민국 - 제주' },
  { id: 9, title: '여행지 9', image: sampleDefault, content: '여행지 9 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다', nickname: '김태엽', date: '2021-08-28', views: '99999', likes: 72, scraps: 25, dest: '중동 - 터키' },
  { id: 10, title: '여행지 10', image: sampleDefault, content: '여행지 10 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다', nickname: '김태엽', date: '2022-08-20', views: '999', likes: 73, scraps: 16, dest: '대한민국 - 경남' },
  { id: 11, title: '여행지 11', image: sampleDefault, content: '여행지 11 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다', nickname: '김태엽', date: '2022-08-21', views: '99999', likes: 74, scraps: 20, dest: '남아메리카 - 아르헨티나' },
  { id: 12, title: '여행지 12', image: sampleDefault, content: '여행지 12 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다', nickname: '김태엽', date: '2022-08-22', views: '99999', likes: 75, scraps: 22, dest: '호주 - 호주' },
  { id: 13, title: '여행지 13', image: sampleDefault, content: '여행지 13 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다', nickname: '김태엽', date: '2022-08-23', views: '99999', likes: 76, scraps: 18, dest: '대한민국 - 강원' },
  { id: 14, title: '여행지 14', image: sampleDefault, content: '여행지 14 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다', nickname: '김태엽', date: '2022-08-24', views: '99999', likes: 77, scraps: 17, dest: '북아메리카 - 캐나다' },
  { id: 15, title: '여행지 15', image: sampleDefault, content: '여행지 15 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다', nickname: '김태엽', date: '2022-08-25', views: '99999', likes: 78, scraps: 13, dest: '아시아 - 베트남' },
  { id: 16, title: '여행지 16', image: sampleDefault, content: '여행지 16 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다', nickname: '김태엽', date: '2022-08-26', views: '99999', likes: 79, scraps: 11, dest: '남아메리카 - 칠레' },
  { id: 17, title: '여행지 17', image: sampleDefault, content: '여행지 17 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다', nickname: '김태엽', date: '2022-08-27', views: '99999', likes: 80, scraps: 19, dest: '유럽 - 서유럽' },
  { id: 18, title: '여행지 18', image: sampleDefault, content: '여행지 18 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다', nickname: '김태엽', date: '2022-08-28', views: '99999', likes: 81, scraps: 26, dest: '남아메리카 - 페루' },
  { id: 19, title: '여행지 19', image: sampleDefault, content: '여행지 19 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다', nickname: '김태엽', date: '2022-08-29', views: '99999', likes: 82, scraps: 23, dest: '북아메리카 - 멕시코' },
  { id: 20, title: '여행지 20', image: sampleDefault, content: '여행지 20 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다', nickname: '김태엽', date: '2023-08-20', views: '999', likes: 83, scraps: 15, dest: '대한민국 - 충남' },
  { id: 21, title: '여행지 21', image: sampleDefault, content: '여행지 21 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다', nickname: '김태엽', date: '2023-08-21', views: '999', likes: 84, scraps: 10, dest: '중동 - 기타' },
  { id: 22, title: '여행지 22', image: sampleDefault, content: '여행지 22 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다', nickname: '김태엽', date: '2023-08-22', views: '999', likes: 85, scraps: 12, dest: '유럽 - 기타' },
  { id: 23, title: '여행지 23', image: sampleDefault, content: '여행지 23 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다', nickname: '김태엽', date: '2023-08-23', views: '999', likes: 86, scraps: 8, dest: '아프리카 - 기타' },
  { id: 24, title: '여행지 24', image: sampleDefault, content: '여행지 24 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다', nickname: '김태엽', date: '2023-08-24', views: '999', likes: 87, scraps: 9, dest: '아시아 - 기타' },
  { id: 25, title: '여행지 25', image: sampleDefault, content: '여행지 25 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다', nickname: '김태엽', date: '2023-08-25', views: '999', likes: 88, scraps: 13, dest: '호주 - 기타' },
  { id: 26, title: '여행지 26', image: sampleDefault, content: '여행지 26 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다', nickname: '김태엽', date: '2023-08-26', views: '999', likes: 89, scraps: 6, dest: '대한민국 - 경북' },
  { id: 27, title: '여행지 27', image: sampleDefault, content: '여행지 27 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다', nickname: '김태엽', date: '2023-08-27', views: '999', likes: 90, scraps: 20, dest: '남아메리카 - 브라질' },
  { id: 28, title: '여행지 28', image: sampleDefault, content: '여행지 28 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다', nickname: '김태엽', date: '2023-08-28', views: '999', likes: 91, scraps: 14, dest: '대한민국 - 경기' },
  { id: 29, title: '여행지 29', image: sampleDefault, content: '여행지 29 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다', nickname: '김태엽', date: '2023-08-29', views: '999', likes: 92, scraps: 18, dest: '아프리카 - 이집트' },
  { id: 30, title: '여행지 30', image: sampleDefault, content: '여행지 30 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다', nickname: '김태엽', date: '2024-08-20', views: '999', likes: 93, scraps: 22, dest: '아시아 - 중국' },
  { id: 31, title: '여행지 31', image: sampleDefault, content: '여행지 31 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다', nickname: '김태엽', date: '2024-08-21', views: '999', likes: 94, scraps: 7, dest: '호주 - 하와이' },
  { id: 32, title: '여행지 32', image: sampleDefault, content: '여행지 32 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다', nickname: '김태엽', date: '2024-08-22', views: '999', likes: 95, scraps: 15, dest: '대한민국 - 전남' },
  { id: 33, title: '여행지 33', image: sampleDefault, content: '여행지 33 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다', nickname: '김태엽', date: '2024-08-23', views: '999', likes: 96, scraps: 13, dest: '대한민국 - 충북' },
  { id: 34, title: '여행지 34', image: sampleDefault, content: '여행지 34 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다', nickname: '김태엽', date: '2024-08-24', views: '999', likes: 97, scraps: 16, dest: '북아메리카 - 기타' },
  { id: 35, title: '여행지 35', image: sampleDefault, content: '여행지 35 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다', nickname: '김태엽', date: '2024-08-25', views: '999', likes: 98, scraps: 19, dest: '남아메리카 - 기타' },
  { id: 36, title: '여행지 36', image: sampleDefault, content: '여행지 36 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다', nickname: '김태엽', date: '2024-08-26', views: '999', likes: 99, scraps: 11, dest: '아시아 - 필리핀' },
  { id: 37, title: '여행지 37', image: sampleDefault, content: '여행지 37 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다 내용입니다', nickname: '김태엽', date: '2024-08-27', views: '999', likes: 100, scraps: 9, dest: '중동 - 사우디' },
  // 나머지 여행지 데이터 이후에 추가
];


const travelbags = [
  { id: 1, imgSrc: imageDefault, title: '제목1입니다', content: '내용입니다', likes: 3200, views: 1310, date: '2024.08.11', tags: ['공항', '공항', '공항', '공항', '공항'], scraps: 3000 },
  { id: 2, imgSrc: imageDefault, title: '제목2입니다', content: '내용입니다', likes: 3201, views: 1311, date: '2024.08.12', tags: ['공항', '가방·캐리어', '공항', '공항', '공항'], scraps: 3000 },
  { id: 3, imgSrc: imageDefault, title: '제목3입니다', content: '내용입니다', likes: 3202, views: 1312, date: '2024.08.13', tags: ['공항', '공항', '공항', '공항', '공항'], scraps: 3000 },
  { id: 4, imgSrc: imageDefault, title: '제목4입니다', content: '내용입니다', likes: 3203, views: 1313, date: '2024.08.14', tags: ['공항', '공항', '유아', '공항', '공항'], scraps: 3000 },
  { id: 5, imgSrc: imageDefault, title: '제목5입니다', content: '내용입니다', likes: 3204, views: 1314, date: '2024.08.15', tags: ['공항', '공항', '공항', '공항', '공항'], scraps: 3000 },
  { id: 6, imgSrc: imageDefault, title: '제목6입니다', content: '내용입니다', likes: 3205, views: 1315, date: '2024.08.16', tags: ['공항', '공항', '공항', '공항', '공항'], scraps: 3000 },
  { id: 7, imgSrc: imageDefault, title: '제목7입니다', content: '내용입니다', likes: 3206, views: 1316, date: '2024.08.17', tags: ['공항', '유아', '공항', '공항', '공항'], scraps: 3000 },
  { id: 8, imgSrc: imageDefault, title: '제목8입니다', content: '내용입니다', likes: 3207, views: 1317, date: '2024.08.18', tags: ['티켓', '공항', '공항', '공항', '공항'], scraps: 3000 },
  { id: 9, imgSrc: imageDefault, title: '제목9입니다', content: '내용입니다', likes: 3208, views: 1318, date: '2024.08.19', tags: ['웹·앱', '웹·앱', '공항', '공항', '공항'], scraps: 3000 },
  { id: 10, imgSrc: imageDefault, title: '제목10입니다', content: '내용입니다', likes: 3209, views: 1319, date: '2024.08.20', tags: ['공항', '공항', '공항', '공항', '공항'], scraps: 3000 },
  { id: 11, imgSrc: imageDefault, title: '제목11입니다', content: '내용입니다', likes: 3210, views: 1320, date: '2024.08.21', tags: ['공항', '공항', '공항', '공항', '공항'], scraps: 3000 },
  { id: 12, imgSrc: imageDefault, title: '제목12입니다', content: '내용입니다', likes: 3211, views: 1321, date: '2024.08.22', tags: ['공항', '공항', '공항', '공항', '공항'], scraps: 3000 },
  { id: 13, imgSrc: imageDefault, title: '제목13입니다', content: '내용입니다', likes: 3212, views: 1322, date: '2024.08.23', tags: ['공항', '공항', '공항', '공항', '공항'], scraps: 3000 },
  { id: 14, imgSrc: imageDefault, title: '제목14입니다', content: '내용입니다', likes: 3213, views: 1323, date: '2024.08.24', tags: ['의류·신발', '의류·신발', '의류·신발', '공항', '공항'], scraps: 3000 },
  { id: 15, imgSrc: imageDefault, title: '제목15입니다', content: '내용입니다', likes: 3214, views: 1324, date: '2024.08.25', tags: ['패션 소품', '패션 소품', '패션 소품', '공항', '공항'], scraps: 3000 },
  { id: 16, imgSrc: imageDefault, title: '제목16입니다', content: '내용입니다', likes: 3215, views: 1325, date: '2024.08.26', tags: ['유아', '유아', '유아', '공항', '공항'], scraps: 3000 },
  { id: 17, imgSrc: imageDefault, title: '제목17입니다', content: '내용입니다', likes: 3216, views: 1326, date: '2024.08.27', tags: ['유아', '유아', '유아', '공항', '공항'], scraps: 3000 },

];

const BPage = () => {
  const [selectedOption, setSelectedOption] = useState('destinations');
  const [sortCriteria, setSortCriteria] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  const handleButtonClick = (option) => {
    setSelectedOption(option);
    setCurrentPage(1);
  };

  const handleSortChange = (criteria) => {
    setSortCriteria(criteria);
    setCurrentPage(1);
  };

  const sortedItems = (items) => {
    return [...items].sort((a, b) => {
      switch (sortCriteria) {
        case 'latest':
          return b.id - a.id;
        case 'oldest':
          return a.id - b.id;
        case 'views':
          return b.views - a.views;
        case 'likes':
          return b.likes - a.likes;
        case 'name':
          return a.title.localeCompare(b.title);
        case 'scraps':
          return b.scraps - a.scraps;
        default:
          return 0;
      }
    });
  };

  const itemsToShow = selectedOption === 'destinations' ? sortedItems(destinations) : sortedItems(travelbags);
  const maxPageIdx = Math.ceil(itemsToShow.length / itemsPerPage);
  const currentItems = itemsToShow.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < maxPageIdx) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <BPageContainer>
      <FlexContainer>
        <ButtonContainer>
          <Button
            onClick={() => handleButtonClick('destinations')}
            isActive={selectedOption === 'destinations'}
          >
            <input
              type="checkbox"
              checked={selectedOption === 'destinations'}
              readOnly
            />
            여행지
          </Button>
          <Button
            onClick={() => handleButtonClick('travelbags')}
            isActive={selectedOption === 'travelbags'}
          >
            <input
              type="checkbox"
              checked={selectedOption === 'travelbags'}
              readOnly
            />
            여행 가방
          </Button>
        </ButtonContainer>

        <SortingContainer>
          <SortOptions>
            {['latest', 'oldest', 'name', 'likes', 'scraps', 'views'].map((criteria) => (
              <React.Fragment key={criteria}>
                <span
                  className={sortCriteria === criteria ? 'active' : ''}
                  onClick={() => handleSortChange(criteria)}
                >
                  {criteria === 'latest' ? '최신순' : 
                   criteria === 'oldest' ? '오래된순' : 
                   criteria === 'name' ? '제목순' : 
                   criteria === 'likes' ? '좋아요순' : 
                   criteria === 'scraps' ? '스크랩순' : '조회수순'}
                </span>
                {criteria !== 'views' && <span className="separator">|</span>}
              </React.Fragment>
            ))}
          </SortOptions>
        </SortingContainer>
      </FlexContainer>

      {selectedOption === 'destinations' && (
        <GridContainer className="dst" isDestination={true}>
          {currentItems.map((destination) => (
            <Card key={destination.id} isDestination={true}>
              <ImageWrapper isDestination={true}>
                <StyledImage src={destination.image} alt={destination.title} />
              </ImageWrapper>
              <Title>{destination.title}</Title>
              <Content>{destination.content}</Content>
              <SmallTextContainer>
                <SmallText>{destination.nickname} | {destination.date}</SmallText>
                <SmallText>조회수 {destination.views}</SmallText>
              </SmallTextContainer>
            </Card>
          ))}
        </GridContainer>
      )}

      {selectedOption === 'travelbags' && (
        <GridContainer className="bag" isDestination={false}>
          {currentItems.map((bag) => (
            <Card key={bag.id} isDestination={false}>
              <ImageWrapper isDestination={false}>
                <StyledImage src={bag.imgSrc} alt={bag.title} />
              </ImageWrapper>
              <TagsContainer>
                {bag.tags.slice(0, 3).map((tag, index) => (
                  <span key={index}># {tag}</span>
                ))}
                {bag.tags.length > 3 && (
                  <span>+{bag.tags.length - 3}</span>
                )}
              </TagsContainer>
              <Title>{bag.title}</Title>
              <Content>{bag.content}</Content>
              <SmallTextContainer>
                <SmallText>
                  <img src={like} alt="like" /> {bag.likes}&ensp;
                  <img src={scrap} alt="scrap" /> {bag.scraps}
                </SmallText>
                <SmallText>조회수 {bag.views}</SmallText>
              </SmallTextContainer>
            </Card>
          ))}
        </GridContainer>
      )}

      <Pagination>
        <button onClick={() => handlePageChange(1)} disabled={currentPage === 1}>&lt;&lt;</button>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>&lt;</button>
        {Array.from({ length: maxPageIdx }, (_, index) => (
          <span
            key={index + 1}
            className={currentPage === index + 1 ? 'active' : ''}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </span>
        ))}
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === maxPageIdx}>&gt;</button>
        <button onClick={() => handlePageChange(maxPageIdx)} disabled={currentPage === maxPageIdx}>&gt;&gt;</button>
      </Pagination>

      <FixedButtonLeft onClick={handlePreviousPage} disabled={currentPage === 1}>
        &lt;
      </FixedButtonLeft>
      <FixedButtonRight onClick={handleNextPage} disabled={currentPage === maxPageIdx}>
        &gt;
      </FixedButtonRight>

      <WriteButton onClick={() => console.log('글쓰기 버튼 클릭')}>
        글쓰기 <img src={write} alt="글쓰기" />
      </WriteButton>
    </BPageContainer>
  );
};

export default BPage;