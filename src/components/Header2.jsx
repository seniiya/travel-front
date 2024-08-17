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
  width: 1230px;
  height: 100px;
  gap: 10px;
  margin-top: 80px;
  margin-bottom: 20px;
  margin-left: 60px;

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
  width: 1290px;
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

  &:hover {
    border-bottom: 2px solid #005cf9; /* Hover 시 밑줄 효과 */
  }
`;

function Header2() {
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
        <MainNavLink href="/travel-bag">전체</MainNavLink>
        <MainNavLink href="#">공항</MainNavLink>
        <MainNavLink href="#">의류 ∙ 신발</MainNavLink>
        <MainNavLink href="#">패션 소품</MainNavLink>
        <MainNavLink href="#">가방 ∙ 캐리어</MainNavLink>
        <MainNavLink href="#">라이프 ∙ 뷰티</MainNavLink>
        <MainNavLink href="#">유아</MainNavLink>
        <MainNavLink href="#">티켓</MainNavLink>
        <MainNavLink href="#">여권 ∙ 비자</MainNavLink>
        <MainNavLink href="#">의료 ∙ 안전</MainNavLink>
        <MainNavLink href="#">웹 ∙ 앱</MainNavLink>
        <MainNavLink href="#">스포츠 ∙ 레저</MainNavLink>
        <MainNavLink href="#">기타</MainNavLink>
      </MainNav>
    </HeaderWrapper>
  );
}

export default Header2;

