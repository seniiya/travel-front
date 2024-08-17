import React, { useState } from 'react';
import styled from 'styled-components';
import mark2 from '../components/pic/mark1.png';
import dropdownIcon from '../components/pic/화살표.png';

const HeaderWrapper = styled.header`
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  width: 1290px;
  height: 100px;
  gap: 10px;
  margin-top: 80px;
  margin-bottom: 20px;
  margin-left: 120px;

  img {
    width: 80px;
    height: 80px;
  }

  h2 {
    font-size: 23px;
    margin: 0;
  }

  p {
    font-size: 20px;
    margin: 0;
    color: gray;
  }
`;

const MainNav = styled.nav`
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  width: 1292px;
  max-width: 1200px;
  margin-top: 10px;
  margin-left: 60px;
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
`;

const MainNavLink = styled.a`
  color: #000;
  text-decoration: none;
  font-size: 1em;
`;

const MainNavLinkDropdown = styled.div`
  position: relative;
  display: inline-block;
  height: 25px;
  border-bottom: ${({ isOpen }) => (isOpen ? '3px solid blue' : 'none')};

  & > a {
    color: #000;
    text-decoration: none;
    font-size: 1em;
    display: flex;
    align-items: center;
    cursor: pointer;

    img {
      width: 14px;
      height: 14px;
      margin-left: 5px;
      transition: transform 0.3s ease;
      transform: ${({ isOpen }) => (isOpen ? 'rotate(90deg)' : 'rotate(0deg)')};
    }
  }
`;

const DropdownContent = styled.div`
  display: ${({ show }) => (show ? 'block' : 'none')};
  top: 30px;
  position: absolute;
  background-color: #fff;
  min-width: 130px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  border: 1px solid #ddd;

  a {
    color: black;
    width: 110px;
    height: 20px;
    padding: 10px;
    text-decoration: none;
    display: block;

    &:hover {
      background-color: #f1f1f1;
    }
  }
`;

const getMainCategory = (dest) => {
  const splitDest = dest.split(' - ');
  return splitDest.length > 1 ? splitDest[0] : '여행지';
};

const getSubCategory = (dest) => {
  const splitDest = dest.split(' - ');
  return splitDest.length > 1 ? splitDest[1] : dest;
};

function Header({ selectedDest, setSelectedDest }) {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (index) => {
    setActiveDropdown(prevIndex => (prevIndex === index ? null : index));
  };

  const handleSelectDest = (dest) => {
    const displayDest = dest === '전체' ? `여행지 - 전체` : dest;
    setSelectedDest(displayDest);
    setActiveDropdown(null); 
  };

  return (
    <HeaderWrapper>
      <SectionHeader>
        <img src={mark2} alt="마크" />
        <div>
          <h2>{getMainCategory(selectedDest)} - {getSubCategory(selectedDest)}</h2>
          <p>올 여름 어디로 떠나 볼까요?</p>
        </div>
      </SectionHeader>
      <MainNav>
        <MainNavLink href="/travel-destinations" onClick={() => handleSelectDest('여행지 - 전체')}>전체</MainNavLink>
        <MainNavLinkDropdown isOpen={activeDropdown === 0}>
          <a onClick={() => toggleDropdown(0)}>
            대한민국 <img src={dropdownIcon} alt="드롭다운 아이콘" />
          </a>
          <DropdownContent show={activeDropdown === 0}>
            <a href="#" onClick={() => handleSelectDest('대한민국 - 전체')}>전체</a>
            <a href="#" onClick={() => handleSelectDest('대한민국 - 서울 · 경기')}>서울 · 경기</a>
            <a href="#" onClick={() => handleSelectDest('대한민국 - 강원도')}>강원도</a>
            <a href="#" onClick={() => handleSelectDest('대한민국 - 경상북도')}>경상북도</a>
            <a href="#" onClick={() => handleSelectDest('대한민국 - 경상남도')}>경상남도</a>
            <a href="#" onClick={() => handleSelectDest('대한민국 - 전라북도')}>전라북도</a>
            <a href="#" onClick={() => handleSelectDest('대한민국 - 전라남도')}>전라남도</a>
            <a href="#" onClick={() => handleSelectDest('대한민국 - 제주도')}>제주도</a>
            <a href="#" onClick={() => handleSelectDest('대한민국 - 충청북도')}>충청북도</a>
            <a href="#" onClick={() => handleSelectDest('대한민국 - 충청남도')}>충청남도</a>
          </DropdownContent>
        </MainNavLinkDropdown>
        <MainNavLinkDropdown isOpen={activeDropdown === 1}>
          <a onClick={() => toggleDropdown(1)}>
            남아메리카 <img src={dropdownIcon} alt="드롭다운 아이콘" />
          </a>
          <DropdownContent show={activeDropdown === 1}>
            <a href="#" onClick={() => handleSelectDest('남아메리카 - 전체')}>전체</a>
            <a href="#" onClick={() => handleSelectDest('남아메리카 - 브라질')}>브라질</a>
            <a href="#" onClick={() => handleSelectDest('남아메리카 - 볼리비아')}>볼리비아</a>
            <a href="#" onClick={() => handleSelectDest('남아메리카 - 아르헨티나')}>아르헨티나</a>
            <a href="#" onClick={() => handleSelectDest('남아메리카 - 칠레')}>칠레</a>
            <a href="#" onClick={() => handleSelectDest('남아메리카 - 페루')}>페루</a>
            <a href="#" onClick={() => handleSelectDest('남아메리카 - 기타')}>기타</a>
          </DropdownContent>
        </MainNavLinkDropdown>
        <MainNavLinkDropdown isOpen={activeDropdown === 2}>
          <a onClick={() => toggleDropdown(2)}>
            북아메리카 <img src={dropdownIcon} alt="드롭다운 아이콘" />
          </a>
          <DropdownContent show={activeDropdown === 2}>
            <a href="#" onClick={() => handleSelectDest('북아메리카 - 전체')}>전체</a>
            <a href="#" onClick={() => handleSelectDest('북아메리카 - 미국 · 동부')}>미국 · 동부</a>
            <a href="#" onClick={() => handleSelectDest('북아메리카 - 미국 · 서부')}>미국 · 서부</a>
            <a href="#" onClick={() => handleSelectDest('북아메리카 - 멕시코')}>멕시코</a>
            <a href="#" onClick={() => handleSelectDest('북아메리카 - 캐나다')}>캐나다</a>
            <a href="#" onClick={() => handleSelectDest('북아메리카 - 기타')}>기타</a>
          </DropdownContent>
        </MainNavLinkDropdown>
        <MainNavLinkDropdown isOpen={activeDropdown === 3}>
          <a onClick={() => toggleDropdown(3)}>
            아시아 <img src={dropdownIcon} alt="드롭다운 아이콘" />
          </a>
          <DropdownContent show={activeDropdown === 3}>
            <a href="#" onClick={() => handleSelectDest('아시아 - 전체')}>전체</a>
            <a href="#" onClick={() => handleSelectDest('아시아 - 베트남')}>베트남</a>
            <a href="#" onClick={() => handleSelectDest('아시아 - 일본')}>일본</a>
            <a href="#" onClick={() => handleSelectDest('아시아 - 중국')}>중국</a>
            <a href="#" onClick={() => handleSelectDest('아시아 - 필리핀')}>필리핀</a>
            <a href="#" onClick={() => handleSelectDest('아시아 - 기타')}>기타</a>
          </DropdownContent>
        </MainNavLinkDropdown>
        <MainNavLinkDropdown isOpen={activeDropdown === 4}>
          <a onClick={() => toggleDropdown(4)}>
            아프리카 <img src={dropdownIcon} alt="드롭다운 아이콘" />
          </a>
          <DropdownContent show={activeDropdown === 4}>
            <a href="#" onClick={() => handleSelectDest('아프리카 - 전체')}>전체</a>
            <a href="#" onClick={() => handleSelectDest('아프리카 - 모로코')}>모로코</a>
            <a href="#" onClick={() => handleSelectDest('아프리카 - 이집트')}>이집트</a>
            <a href="#" onClick={() => handleSelectDest('아프리카 - 기타')}>기타</a>
          </DropdownContent>
        </MainNavLinkDropdown>
        <MainNavLinkDropdown isOpen={activeDropdown === 5}>
          <a onClick={() => toggleDropdown(5)}>
            유럽 <img src={dropdownIcon} alt="드롭다운 아이콘" />
          </a>
          <DropdownContent show={activeDropdown === 5}>
            <a href="#" onClick={() => handleSelectDest('유럽 - 전체')}>전체</a>
            <a href="#" onClick={() => handleSelectDest('유럽 - 동유럽')}>동유럽</a>
            <a href="#" onClick={() => handleSelectDest('유럽 - 북유럽')}>북유럽</a>
            <a href="#" onClick={() => handleSelectDest('유럽 - 서유럽')}>서유럽</a>
            <a href="#" onClick={() => handleSelectDest('유럽 - 기타')}>기타</a>
          </DropdownContent>
        </MainNavLinkDropdown>
        <MainNavLinkDropdown isOpen={activeDropdown === 6}>
          <a onClick={() => toggleDropdown(6)}>
            중동 <img src={dropdownIcon} alt="드롭다운 아이콘" />
          </a>
          <DropdownContent show={activeDropdown === 6}>
            <a href="#" onClick={() => handleSelectDest('중동 - 전체')}>전체</a>
            <a href="#" onClick={() => handleSelectDest('중동 - 사우디')}>사우디</a>
            <a href="#" onClick={() => handleSelectDest('중동 - 터키')}>터키</a>
            <a href="#" onClick={() => handleSelectDest('중동 - 기타')}>기타</a>
          </DropdownContent>
        </MainNavLinkDropdown>
        <MainNavLinkDropdown isOpen={activeDropdown === 7}>
          <a onClick={() => toggleDropdown(7)}>
            호주 <img src={dropdownIcon} alt="드롭다운 아이콘" />
          </a>
          <DropdownContent show={activeDropdown === 7}>
            <a href="#" onClick={() => handleSelectDest('호주 - 전체')}>전체</a>
            <a href="#" onClick={() => handleSelectDest('호주 - 하와이')}>하와이</a>
            <a href="#" onClick={() => handleSelectDest('호주 - 호주')}>호주</a>
            <a href="#" onClick={() => handleSelectDest('호주 - 기타')}>기타</a>
          </DropdownContent>
        </MainNavLinkDropdown>
      </MainNav>
    </HeaderWrapper>
  );
}

export default Header;