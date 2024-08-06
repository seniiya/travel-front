import React, { useState } from 'react';
import styled from 'styled-components';
import write from '../components/pic/write.png';
import sampleDefault from '../components/pic/samples/sample.jpeg';
import like from '../components/pic/like.png';
import scrap from '../components/pic/scrap.svg';
import link_src from '../components/pic/link.svg';

const PageContainer = styled.div`
  padding: 20px;
  max-width: 1045px;
  margin: 0 auto;
  margin-top: 80px;
`;

const SortingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  font-size: 18px;

  span {
    cursor: pointer;
    padding: 5px;
    border-radius: 5px;
    transition: background-color 0.3s;
    color: #b4b7b9;
  }

  span.active {
    background-color: #ffffff;
    color: #005cf9;
  }

  span.separator {
    cursor: default;
    padding: 0 10px;
  }
`;

const SortOptions = styled.div`
  display: flex;
  align-items: center;
`;

const WriteButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  padding-left: 15px;
  font-size: 16px;
  color: #b4b7b9;

  img {
    width: 20px;
    height: 20px;
    margin-left: 5px;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 50px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 200px;
  font-size: 20px;

  span, button {
    margin: 0 5px;
    align-items: center;
    cursor: pointer;
    padding: 10px;
    border: none;
    user-select: none;
    color: black;
    background: none;
    transition: border 0.3s ease;
  }

  span.active {
    background-color: #ffffff;
    color: #005cf9;
  }

  button {
    display: flex;
    background-color: #f7f7f7;
    border: none;
    width: 30px;
    height: 30px;
    border-radius: 1000px;
    padding: 6px;
    font-size: 15px;
  }

  button:disabled {
    color: #ddd;
    border: none;
  }
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

function TravelDestinations({ selectedDest }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortCriteria, setSortCriteria] = useState('newest');
  const destinationsPerPage = 16;

  const filteredDestinations = selectedDest === '여행지 - 전체'
    ? destinations
    : selectedDest.endsWith('전체')
    ? destinations.filter(destination => destination.dest.includes(selectedDest.split(' - ')[0]))
    : destinations.filter(destination => destination.dest === selectedDest);

  const sortedDestinations = [...filteredDestinations].sort((a, b) => {
    if (sortCriteria === 'newest') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortCriteria === 'oldest') {
      return new Date(a.date) - new Date(b.date);
    } else if (sortCriteria === 'name') {
      return a.title.localeCompare(b.title);
    } else if (sortCriteria === 'likes') {
      return b.likes - a.likes;
    } else if (sortCriteria === 'scraps') {
      return b.scraps - a.scraps;
    } else if (sortCriteria === 'views') {
      return parseInt(b.views) - parseInt(a.views);
    }
    return 0;
  });

  const indexOfLastDestination = currentPage * destinationsPerPage;
  const indexOfFirstDestination = indexOfLastDestination - destinationsPerPage;
  const currentDestinations = sortedDestinations.slice(indexOfFirstDestination, indexOfLastDestination);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(sortedDestinations.length / destinationsPerPage); i++) {
    pageNumbers.push(i);
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, pageNumbers.length));
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
    setCurrentPage(pageNumbers.length);
    scrollToTop();
  };

  const handleSortChange = (criteria) => {
    setSortCriteria(criteria);
    setCurrentPage(1);
    scrollToTop();
  };

  return (
    <PageContainer id="travel-destinations-container">
      <SortingContainer>
        <SortOptions>
          <span className={sortCriteria === 'newest' ? 'active' : ''} onClick={() => handleSortChange('newest')}>최신순</span>
          <span className="separator">|</span>
          <span className={sortCriteria === 'oldest' ? 'active' : ''} onClick={() => handleSortChange('oldest')}>오래된순</span>
          <span className="separator">|</span>
          <span className={sortCriteria === 'name' ? 'active' : ''} onClick={() => handleSortChange('name')}>이름순</span>
          <span className="separator">|</span>
          <span className={sortCriteria === 'likes' ? 'active' : ''} onClick={() => handleSortChange('likes')}>좋아요순</span>
          <span className="separator">|</span>
          <span className={sortCriteria === 'scraps' ? 'active' : ''} onClick={() => handleSortChange('scraps')}>스크랩순</span>
          <span className="separator">|</span>
          <span className={sortCriteria === 'views' ? 'active' : ''} onClick={() => handleSortChange('views')}>조회순</span>
        </SortOptions>
        <WriteButton>
          글쓰기
          <img src={write} alt="write" />
        </WriteButton>
      </SortingContainer>
      <CardGrid>
        {currentDestinations.map(destination => (
          <StyledCard key={destination.id} destination={destination} />
        ))}
      </CardGrid>
      <Pagination>
        <button onClick={handleFirstPage} disabled={currentPage === 1}>
          &lt;&lt;
        </button>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          &lt;
        </button>
        {pageNumbers.map(number => (
          <span
            key={number}
            className={currentPage === number ? 'active' : ''}
            onClick={() => {
              setCurrentPage(number);
              scrollToTop();
            }}
          >
            {number}
          </span>
        ))}
        <button onClick={handleNextPage} disabled={currentPage === pageNumbers.length}>
          &gt;
        </button>
        <button onClick={handleLastPage} disabled={currentPage === pageNumbers.length}>
          &gt;&gt;
        </button>
      </Pagination>
      <ScrollToTopButton onClick={scrollToTop}>↑</ScrollToTopButton>
      <FixedButtonLeft onClick={handlePreviousPage} disabled={currentPage === 1}>
        &lt;
      </FixedButtonLeft>
      <FixedButtonRight onClick={handleNextPage} disabled={currentPage === pageNumbers.length}>
        &gt;
      </FixedButtonRight>
    </PageContainer>
  );
}

const StyledCard = ({ destination }) => {
  const formatViews = (views) => {
    return parseInt(views) >= 999 ? '999+' : views;
  };

  return (
    <Card>
      <CardImage src={destination.image} alt={destination.title} />
      <Overlay>
        <LikesScraps>
          <span>
            <img src={like} alt="like" />
            {destination.likes}
          </span>
          <span>
            <img src={scrap} alt="scrap" />
            {destination.scraps || 0}
          </span>
          <span>
            <img src={link_src} alt="link" />
          </span>
        </LikesScraps>
      </Overlay>
      <CardContent>
        <h2>{destination.title}</h2>
        <p>{destination.content}</p>
      </CardContent>
      <CardFooter>
        <CardFooterLeft>
          <span>{destination.nickname}</span>
          <span>| {destination.date}</span>
        </CardFooterLeft>
        <CardFooterRight>
          <span>조회수 {formatViews(destination.views)}</span>
        </CardFooterRight>
      </CardFooter>
    </Card>
  );
};

const Card = styled.div`
  width: 240px;
  height: 320px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);

    img {
      filter: brightness(50%);
    }

    div {
      opacity: 1;
    }
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  transition: filter 0.3s ease;
  border-radius: 10px 10px 0 0;
`;

const Overlay = styled.div`
  position: absolute;
  top: 15px;
  left: 0;
  width: 100%;
  height: 40%;
  display: flex;
  align-items: end;
  color: white;
  font-size: 15px;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 10px 10px 0 0;
  margin-left: 3px;
`;

const LikesScraps = styled.div`
  display: flex;
  gap: 10px;

  span {
    display: flex;
    align-items: center;

    img {
      width: 20px;
      height: 20px;
      margin-right: 5px;
      color: white;
    }
  }
`;

const CardContent = styled.div`
  margin-left: 10px;
  height: 115px;
  h2 {
    font-size: 20px;
  }
  p {
    font-size: 15px;
    color: #75797d;
  }
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #75797d;
  margin: 10px;
`;

const CardFooterLeft = styled.div`
  display: flex;
  gap: 3px;
`;

const CardFooterRight = styled.div`
  display: flex;
`;

const ScrollToTopButton = styled.button`
  position: fixed;
  bottom: 350px;
  right: 80px;
  background-color: rgba(255, 255, 255, 0);
  color: #005cf9;
  border: none;
  border-radius: 1000px;
  cursor: pointer;
  font-size: 16px;
  z-index: 1000;
  width: 30px;
  height: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: rgba(255, 255, 250, 0.5);
  }
`;

const FixedButtonLeft = styled.button`
  position: fixed;
  bottom: 48%;
  left: 80px;
  background-color: #ffffff;
  color: #75797d;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  z-index: 1000;
  width: 30px;
  height: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:disabled {
    color: #ddd;
    cursor: not-allowed;
  }
`;

const FixedButtonRight = styled.button`
  position: fixed;
  bottom: 48%;
  right: 80px;
  background-color: #ffffff;
  color: #75797d;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  z-index: 1000;
  width: 30px;
  height: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:disabled {
    color: #ddd;
    cursor: not-allowed;
  }
`;

export default TravelDestinations;