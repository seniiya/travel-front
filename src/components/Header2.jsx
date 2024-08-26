import React from 'react';
import styled from 'styled-components';
import mark4 from '../components/pic/mark4.png';

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
  width: 100%;
  max-width: 1230px;
  height: 100px;
  gap: 10px;
  padding: 0 20px;
  margin-top: 80px;
  margin-bottom: 20px;

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

  @media (max-width: 768px) {
    align-items: flex-start;
    text-align: left;
    padding: 0 10px;

    img {
      width: 60px;
      height: 60px;
    }

    h2 {
      font-size: 20px;
    }

    p {
      font-size: 16px;
    }
  }

  @media (max-width: 480px) {
    align-items: center;
    text-align: center;

    h2 {
      font-size: 18px;
    }

    p {
      font-size: 14px;
    }
  }
`;

const MainNav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  padding: 0 20px;
  font-size: 17px;

  @media (max-width: 768px) {
    align-items: flex-start;
    gap: 10px;
  }

  @media (max-width: 480px) {
    align-items: center;
    text-align: center;
  }
`;

const MainNavLink = styled.a`
  color: #000;
  text-decoration: none;
  font-size: 1em;
  border-bottom: ${({ active }) => (active ? '2px solid #005cf9' : 'none')};
  padding-bottom: 5px;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 0.9em;
  }

  @media (max-width: 480px) {
    font-size: 0.8em;
  }
`;

function Header2({ selectedCategory, setSelectedCategory }) {
  return (
    <HeaderWrapper>
      <SectionHeader>
        <img src={mark4} alt="마크" />
        <div>
          <h2>{selectedCategory}</h2>
          <p>여행가들의 가방 속 빠질 수 없는 이것!</p>
        </div>
      </SectionHeader>
      <MainNav>
        <MainNavLink
          active={selectedCategory === '여행 가방 - 전체'}
          onClick={() => setSelectedCategory('여행 가방 - 전체')}
        >
          전체
        </MainNavLink>
        <MainNavLink
          active={selectedCategory === '공항'}
          onClick={() => setSelectedCategory('공항')}
        >
          공항
        </MainNavLink>
        <MainNavLink
          active={selectedCategory === '의류·신발'}
          onClick={() => setSelectedCategory('의류·신발')}
        >
          의류·신발
        </MainNavLink>
        <MainNavLink
          active={selectedCategory === '패션 소품'}
          onClick={() => setSelectedCategory('패션 소품')}
        >
          패션 소품
        </MainNavLink>
        <MainNavLink
          active={selectedCategory === '가방·캐리어'}
          onClick={() => setSelectedCategory('가방·캐리어')}
        >
          가방·캐리어
        </MainNavLink>
        <MainNavLink
          active={selectedCategory === '라이프·뷰티'}
          onClick={() => setSelectedCategory('라이프·뷰티')}
        >
          라이프·뷰티
        </MainNavLink>
        <MainNavLink
          active={selectedCategory === '유아'}
          onClick={() => setSelectedCategory('유아')}
        >
          유아
        </MainNavLink>
        <MainNavLink
          active={selectedCategory === '티켓'}
          onClick={() => setSelectedCategory('티켓')}
        >
          티켓
        </MainNavLink>
        <MainNavLink
          active={selectedCategory === '여권·비자'}
          onClick={() => setSelectedCategory('여권·비자')}
        >
          여권·비자
        </MainNavLink>
        <MainNavLink
          active={selectedCategory === '의료·영양'}
          onClick={() => setSelectedCategory('의료·영양')}
        >
          의료·영양
        </MainNavLink>
        <MainNavLink
          active={selectedCategory === '웹·앱'}
          onClick={() => setSelectedCategory('웹·앱')}
        >
          웹·앱
        </MainNavLink>
        <MainNavLink
          active={selectedCategory === '스포츠·레저'}
          onClick={() => setSelectedCategory('스포츠·레저')}
        >
          스포츠·레저
        </MainNavLink>
        <MainNavLink
          active={selectedCategory === '기타'}
          onClick={() => setSelectedCategory('기타')}
        >
          기타
        </MainNavLink>
      </MainNav>
    </HeaderWrapper>
  );
}

export default Header2;