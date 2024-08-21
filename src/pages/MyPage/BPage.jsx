import React, { useState } from 'react';
import styled from 'styled-components';
import sampleDefault from '../../components/pic/default.png'; 
import imageDefault from '../../components/pic/default.png'; 

const BPageContainer = styled.div`
  position: absolute;
  top: 110px;
  width: 1100px;
  height: auto;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  z-index: 1; /* 클릭이 가능하도록 z-index 추가 */
`;

const BPageContent = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
`;

const Tabs = styled.div`
  display: flex;
  align-items: center;
`;

const Tab = styled.div`
  margin-right: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${(props) => (props.active ? '#0066FF' : '#888')};
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  z-index: 2; /* 클릭이 가능하도록 z-index 추가 */
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 8px;
`;

const SortOptions = styled.div`
  span {
    cursor: pointer;
    margin: 5px;
    color: #B4B7B9;
    font-size: 17px;
    z-index: 2; /* 클릭이 가능하도록 z-index 추가 */
  }

  .separator {
    color: #ccc;
  }

  .active {
    color: #005cf9;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  width: 100%;
`;

const GridItem = styled.div`
  background-color: #f5f5f5;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 16px;
  text-align: center;
`;

const Title = styled.h3`
  font-size: 18px;
  margin-bottom: 8px;
`;

const Description = styled.p`
  font-size: 14px;
  color: #666;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 16px 16px;
  font-size: 12px;
  color: #999;
`;

const destinations = [
  { id: 1, title: '여행지 1', image: sampleDefault, content: '여행지 1 내용입니다', date: '2021-08-20', views: 998, likes: 20, scraps: 5 },
  { id: 2, title: '여행지 2', image: sampleDefault, content: '여행지 2 내용입니다', date: '2021-08-21', views: 999, likes: 25, scraps: 10 },
  { id: 3, title: '여행지 3', image: sampleDefault, content: '여행지 3 내용입니다', date: '2021-08-22', views: 912, likes: 15, scraps: 8 }
];

const travelbags = [
  { id: 1, imgSrc: imageDefault, title: '제목1입니다', content: '내용입니다', date: '2024.08.11', views: 1310, likes: 50, scraps: 25 },
  { id: 2, imgSrc: imageDefault, title: '제목2입니다', content: '내용입니다', date: '2024.08.12', views: 1311, likes: 60, scraps: 35 },
  { id: 3, imgSrc: imageDefault, title: '제목3입니다', content: '내용입니다', date: '2024.08.13', views: 1312, likes: 45, scraps: 20 }
];

const BPage = () => {
  const [activeTab, setActiveTab] = useState('여행지');
  const [sortCriteria, setSortCriteria] = useState('latest');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSortChange = (criteria) => {
    setSortCriteria(criteria);
  };

  const cards = activeTab === '여행지' ? destinations : travelbags;

  const sortedCards = [...cards].sort((a, b) => {
    switch (sortCriteria) {
      case 'latest':
        return new Date(b.date) - new Date(a.date);
      case 'oldest':
        return new Date(a.date) - new Date(b.date);
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

  return (
    <BPageContainer>
      <BPageContent>
        <Tabs>
          <Tab active={activeTab === '여행지'} onClick={() => handleTabChange('여행지')}>
            <Checkbox checked={activeTab === '여행지'} readOnly />
            여행지
          </Tab>
          <Tab active={activeTab === '여행 가방'} onClick={() => handleTabChange('여행 가방')}>
            <Checkbox checked={activeTab === '여행 가방'} readOnly />
            여행 가방
          </Tab>
        </Tabs>
        <SortOptions>
          <span
            className={sortCriteria === 'latest' ? 'active' : ''}
            onClick={() => handleSortChange('latest')}
          >
            최신순
          </span>
          <span className="separator">|</span>
          <span
            className={sortCriteria === 'oldest' ? 'active' : ''}
            onClick={() => handleSortChange('oldest')}
          >
            오래된순
          </span>
          <span className="separator">|</span>
          <span
            className={sortCriteria === 'views' ? 'active' : ''}
            onClick={() => handleSortChange('views')}
          >
            조회수순
          </span>
          <span className="separator">|</span>
          <span
            className={sortCriteria === 'likes' ? 'active' : ''}
            onClick={() => handleSortChange('likes')}
          >
            좋아요순
          </span>
          <span className="separator">|</span>
          <span
            className={sortCriteria === 'name' ? 'active' : ''}
            onClick={() => handleSortChange('name')}
          >
            이름순
          </span>
          <span className="separator">|</span>
          <span
            className={sortCriteria === 'scraps' ? 'active' : ''}
            onClick={() => handleSortChange('scraps')}
          >
            스크랩순
          </span>
        </SortOptions>
      </BPageContent>

      <GridContainer>
        {sortedCards.map((item) => (
          <GridItem key={item.id}>
            <Image src={item.image || item.imgSrc} alt={item.title} />
            <Content>
              <Title>{item.title}</Title>
              <Description>{item.content}</Description>
            </Content>
            <Footer>
              <span>{item.date}</span>
              <span>{item.views} views</span>
            </Footer>
          </GridItem>
        ))}
      </GridContainer>
    </BPageContainer>
  );
};

export default BPage;