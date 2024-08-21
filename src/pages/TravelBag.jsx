import React, { useState } from 'react';
import styled from 'styled-components';
import imageDefault from '../components/pic/default.png';
import write from '../components/pic/write.png';
import like from '../components/pic/grayLike.png';
import scrap from '../components/pic/grayScrap.png';

const SortingContainer = styled.div`
  display: flex;
  margin-top: 80px;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  margin: 120px 300px 60px 300px;

  @media (max-width: 1700px) {
    margin: 20px 20px;
    font-size: 17px;
    margin: 100px 250px 60px 250px;
  }

  @media (max-width: 1500px) {
    font-size: 16px;
    margin: 90px 200px 60px 200px;
  }

  @media (max-width: 1300px) {
    font-size: 15px;
    margin: 90px 150px 60px 150px;
  }

  @media (max-width: 1100px) {
    font-size: 14px;
    margin: 90px 130px 60px 125px;
  }

  @media (max-width: 900px) {
    font-size: 13px;
    margin: 80px 100px 60px 100px;
  }

  @media (max-width: 700px) {
    font-size: 12px;
    margin: 80px 80px 60px 80px;
  }

  @media (max-width: 600px) {
    font-size: 11px;
    margin: 80px 60px 60px 60px;
  }

  @media (max-width: 500px) {
    font-size: 10px;
    margin: 80px 40px 60px 40px;
  }

  @media (max-width: 400px) {
    margin: 80px 30px 60px 30px;
  }

  @media (max-width: 300px) {
    margin: 80px 20px 60px 20px;
  }
`;

const SortOptions = styled.div`
  span {
    cursor: pointer;
    margin: 5px;
    color: #B4B7B9;
    font-size: 17px;
  }

  .separator {
    color: #ccc;
  }

  .active {
    color: #005cf9;
  }
`;

const WriteButton = styled.button`
  background-color: #ffffff;
  font-size: 17px;
  color: #B4B7B9;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;

  img {
    margin-left: 8px;
    width: 16px;
    height: 16px;
  }

  @media (max-width: 1700px) {
    font-size: 17px;
  }

  @media (max-width: 1500px) {
    font-size: 16px;
  }

  @media (max-width: 1300px) {
    font-size: 15px;
  }

  @media (max-width: 1100px) {
    font-size: 14px;
  }

  @media (max-width: 900px) {
    font-size: 13px;
  }

  @media (max-width: 700px) {
    font-size: 12px;
  }

  @media (max-width: 600px) {
    font-size: 11px;
  }

  @media (max-width: 500px) {
    font-size: 10px;
  }
`;

const TravelBagWrapper = styled.div`
  padding: 20px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin: 0 250px 0 250px;
  justify-content: center;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  width: 270px;
  height: 385px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  img {
    width: 250px;
    height: 260px;
    display: block;
    margin: 10px;
  }

  .card-content {
    padding: 15px;
  }

  h2 {
    font-size: 16px;
    margin: 0 0 10px 0;
    color: #333;
  }

  p {
    font-size: 14px;
    margin: 0;
    color: #777;
  }

  .meta-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px;
    font-size: 12px;
    color: #aaa;

    .left-section {
      display: flex;
      gap: 3px;
    }

    .right-section {
      display: flex;
    }

    span {
      display: flex;
      align-items: center;
      gap: 5px;
    }

    img {
      vertical-align: middle;
      margin-left: 0;
      margin-right: 2px;
      width: 16px;
      height: 16px;
    }
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(-80px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

`;


const TagsContainer = styled.div`
  position: absolute;
  bottom: 120px;
  left: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  background-color: none;

  span {
    background-color: #ffffff;
    color: #005CF9;
    padding: 2px 6px;
    font-size: 12px;
    border-radius: 4px;
    border: 0.5px solid #A8C5F6;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  button, span {
    margin: 0 5px;
    padding: 8px 12px;
    border: none;
    background-color: none;
    cursor: pointer;
  }

  .active {
    color: #005CF9;
    background-color: none;
  }
`;

function TravelBag() {
  const itemsPerPage = 16;
  const [currentPage, setCurrentPage] = useState(1);
  const [sortCriteria, setSortCriteria] = useState('latest');
  const [activeCard, setActiveCard] = useState(null); // 클릭된 카드를 추적

  const cards = [
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

  const maxPageIdx = Math.ceil(cards.length / itemsPerPage);

  const handleSortChange = (criteria) => {
    setSortCriteria(criteria);
    setCurrentPage(1);
  };

  const sortedCards = [...cards].sort((a, b) => {
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

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, maxPageIdx));
    scrollToTop();
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    scrollToTop();
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
    scrollToTop();
  };

  const handleLastPage = () => {
    setCurrentPage(maxPageIdx);
    scrollToTop();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentCards = sortedCards.slice(startIdx, startIdx + itemsPerPage);

  return (
    <TravelBagWrapper>
      <SortingContainer>
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
        <WriteButton>
          글쓰기
          <img src={write} alt="write" />
        </WriteButton>
      </SortingContainer>
      <GridContainer>
        {currentCards.map((card) => (
          <Card
            key={card.id}
            isActive={activeCard === card.id} // 클릭된 카드만 위로 올라가도록 설정
            onClick={() => setActiveCard(card.id)} // 클릭 시 카드 활성화
          >
            <TagsContainer>
              {card.tags.slice(0, 3).map((tag, index) => (
                <span key={index}># {tag}</span>
              ))}
              {card.tags.length > 3 && (
                <span>+{card.tags.length - 3}</span>
              )}
            </TagsContainer>
            <img src={card.imgSrc} alt={card.title} />
            <div className="card-content">
              <h2>{card.title}</h2>
              <p>{card.content}</p>
              <div className="meta-info">
                <div className="left-section">
                  <span><img src={like} alt="like" /> {card.likes}</span>
                  <span><img src={scrap} alt="scrap" /> {card.scraps}</span>
                </div>
                <div className="right-section">
                  <span>조회수 {card.views}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </GridContainer>
      <Pagination>
        <button onClick={handleFirstPage} disabled={currentPage === 1}>&lt;&lt;</button>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>&lt;</button>
        {Array.from({ length: maxPageIdx }, (_, index) => (
          <span
            key={index + 1}
            className={currentPage === index + 1 ? 'active' : ''}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </span>
        ))}
        <button onClick={handleNextPage} disabled={currentPage === maxPageIdx}>&gt;</button>
        <button onClick={handleLastPage} disabled={currentPage === maxPageIdx}>&gt;&gt;</button>
      </Pagination>
    </TravelBagWrapper>
  );
}

export default TravelBag;