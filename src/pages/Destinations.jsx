import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import write from '../components/pic/write.png';
import like from '../components/pic/whiteLike.svg';
import scrap from '../components/pic/whiteScrap.svg';
import link_src from '../components/pic/link.svg';
import img from '../components/pic/default.png';

const PageContainer = styled.div`
  max-width: 1920px;
  margin: 50px 30px;

  @media (max-width: 1000px) {
    margin: 20px 10px;
  }

  @media (max-width: 500px) {
    margin: 10px 50px;
  }
`;

const SortingContainer = styled.div`
  display: flex;
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


  span {
    cursor: pointer;
    padding: 5px;
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

  @media (max-width: 480px) {
    flex-wrap: wrap;
    gap: 5px;
  }
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

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 50px;

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

  @media (max-width: 480px) {
    font-size: 16px;
    margin-bottom: 30px;
  }
`;

function Destinations({ selectedDest }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortCriteria, setSortCriteria] = useState('latest');
  const [destinations, setDestinations] = useState([]);
  const [minPageIdx, setMinPageIdx] = useState(1);
  const [maxPageIdx, setMaxPageIdx] = useState(1);

  useEffect(() => {
    fetchDestinations();
  }, [sortCriteria, currentPage, selectedDest]);

  const fetchDestinations = async () => {
    try {
      const response = await axios.get('/api/v1/travelPost/allPosts', {
        params: {
          orderBy: sortCriteria,
          page: currentPage,
        },
      });
      const { posts, minPageIdx, maxPageIdx } = response.data.result;
      setDestinations(posts);
      setMinPageIdx(minPageIdx);
      setMaxPageIdx(maxPageIdx);
    } catch (error) {
      console.error('여행지 데이터를 가져오는 중 오류가 발생했습니다:', error);
    }
  };

  const handleSortChange = (criteria) => {
    setSortCriteria(criteria);
    setCurrentPage(1);
    scrollToTop();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, maxPageIdx));
    scrollToTop();
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, minPageIdx));
    scrollToTop();
  };

  const handleFirstPage = () => {
    setCurrentPage(minPageIdx);
    scrollToTop();
  };

  const handleLastPage = () => {
    setCurrentPage(maxPageIdx);
    scrollToTop();
  };

  return (
    <PageContainer id="travel-destinations-container">
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
      <CardGrid>
        {destinations.map(destination => (
          <StyledCard key={destination.id} destination={destination} />
        ))}
      </CardGrid>
      <Pagination>
        <button onClick={handleFirstPage} disabled={currentPage === minPageIdx}>
          &lt;&lt;
        </button>
        <button onClick={handlePreviousPage} disabled={currentPage === minPageIdx}>
          &lt;
        </button>
        {Array.from({ length: maxPageIdx - minPageIdx + 1 }, (_, index) => (
          <span
            key={minPageIdx + index}
            className={currentPage === minPageIdx + index ? 'active' : ''}
            onClick={() => {
              setCurrentPage(minPageIdx + index);
              scrollToTop();
            }}
          >
            {minPageIdx + index}
          </span>
        ))}
        <button onClick={handleNextPage} disabled={currentPage === maxPageIdx}>
          &gt;
        </button>
        <button onClick={handleLastPage} disabled={currentPage === maxPageIdx}>
          &gt;&gt;
        </button>
      </Pagination>
      <ScrollToTopButton onClick={scrollToTop}>↑</ScrollToTopButton>
      <FixedButtonLeft onClick={handlePreviousPage} disabled={currentPage === minPageIdx}>
        &lt;
      </FixedButtonLeft>
      <FixedButtonRight onClick={handleNextPage} disabled={currentPage === maxPageIdx}>
        &gt;
      </FixedButtonRight>
    </PageContainer>
  );
}

const StyledCard = ({ destination }) => {
  const formatViews = (views) => {
    return parseInt(views) >= 999 ? '999+' : views;
  };

  const imageUrl = destination.repImage
    ? destination.repImage.startsWith('http')
      ? destination.repImage
      : `${process.env.REACT_APP_BASE_URL}${destination.repImage.replace(/\\/g, '/')}`
    : img; // 기본 이미지 사용

  return (
    <Card>
      <CardImage src={imageUrl} alt={destination.title} />
      <Overlay>
        <LikesScraps>
          <span>
            <img src={like} alt="like" />
            {destination.likeCount}
          </span>
          <span>
            <img src={scrap} alt="scrap" />
            {destination.scrapCount || 0}
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
          <span>{destination.user.nickname}</span>
          <span>| {destination.createDate}</span>
        </CardFooterLeft>
        <CardFooterRight>
          <span>조회수 {formatViews(destination.viewCount)}</span>
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

  @media (max-width: 768px) {
    width: 100%;
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

    @media (max-width: 480px) {
      font-size: 18px;
    }
  }
  p {
    font-size: 15px;
    color: #75797d;

    @media (max-width: 480px) {
      font-size: 14px;
    }
  }
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #75797d;
  margin: 10px;

  @media (max-width: 480px) {
    font-size: 12px;
  }
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

  @media (max-width: 768px) {
    bottom: 100px;
    right: 20px;
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

  @media (max-width: 768px) {
    left: 20px;
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

  @media (max-width: 768px) {
    right: 20px;
  }
`;

export default Destinations;
