import React, { useState } from 'react';
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

  @media (max-width: 768px) {
    font-size: 0.9em;
  }

  @media (max-width: 480px) {
    font-size: 0.8em;
  }
`;

function Header2() {
  const [activeLink, setActiveLink] = useState('/travel-bag');

  const handleClick = (href) => {
    setActiveLink(href);
  };

  return (
    <HeaderWrapper>
      <SectionHeader>
        <img src={mark4} alt="마크" />
        <div>
          <h2>여행 가방 - 전체</h2>
          <p>여행가들의 가방 속 빠질 수 없는 이것!</p>
        </div>
      </SectionHeader>
      <MainNav>
        <MainNavLink
          href="/travel-bag"
          active={activeLink === '/travel-bag'}
          onClick={() => handleClick('/travel-bag')}
        >
          전체
        </MainNavLink>
        <MainNavLink
          href="#airport"
          active={activeLink === '#airport'}
          onClick={() => handleClick('#airport')}
        >
          공항
        </MainNavLink>
        <MainNavLink
          href="#clothing"
          active={activeLink === '#clothing'}
          onClick={() => handleClick('#clothing')}
        >
          의류 ∙ 신발
        </MainNavLink>
        <MainNavLink
          href="#fashion"
          active={activeLink === '#fashion'}
          onClick={() => handleClick('#fashion')}
        >
          패션 소품
        </MainNavLink>
        <MainNavLink
          href="#bags"
          active={activeLink === '#bags'}
          onClick={() => handleClick('#bags')}
        >
          가방 ∙ 캐리어
        </MainNavLink>
        <MainNavLink
          href="#life-beauty"
          active={activeLink === '#life-beauty'}
          onClick={() => handleClick('#life-beauty')}
        >
          라이프 ∙ 뷰티
        </MainNavLink>
        <MainNavLink
          href="#infants"
          active={activeLink === '#infants'}
          onClick={() => handleClick('#infants')}
        >
          유아
        </MainNavLink>
        <MainNavLink
          href="#tickets"
          active={activeLink === '#tickets'}
          onClick={() => handleClick('#tickets')}
        >
          티켓
        </MainNavLink>
        <MainNavLink
          href="#passport-visa"
          active={activeLink === '#passport-visa'}
          onClick={() => handleClick('#passport-visa')}
        >
          여권 ∙ 비자
        </MainNavLink>
        <MainNavLink
          href="#medical-safety"
          active={activeLink === '#medical-safety'}
          onClick={() => handleClick('#medical-safety')}
        >
          의료 ∙ 안전
        </MainNavLink>
        <MainNavLink
          href="#web-app"
          active={activeLink === '#web-app'}
          onClick={() => handleClick('#web-app')}
        >
          웹 ∙ 앱
        </MainNavLink>
        <MainNavLink
          href="#sports-leisure"
          active={activeLink === '#sports-leisure'}
          onClick={() => handleClick('#sports-leisure')}
        >
          스포츠 ∙ 레저
        </MainNavLink>
        <MainNavLink
          href="#other"
          active={activeLink === '#other'}
          onClick={() => handleClick('#other')}
        >
          기타
        </MainNavLink>
      </MainNav>
    </HeaderWrapper>
  );
}

export default Header2;
