// Destinations.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import write from '../components/pic/write.png';
import like from '../components/pic/whiteLike.svg';
import scrap from '../components/pic/whiteScrap.svg';
import link from '../components/pic/whiteLink.svg';
import img from '../components/pic/default.png';
import sampleDefault from '../components/pic/samples/sample18.svg';

function Destinations({ selectedDest }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortCriteria, setSortCriteria] = useState('latest');
  const [destinations, setDestinations] = useState([]);
  const [minPageIdx, setMinPageIdx] = useState(1);
  const [maxPageIdx, setMaxPageIdx] = useState(1);
  const [activeCard, setActiveCard] = useState(null);
  const navigate = useNavigate();
  
  const handleWriteButtonClick = () => {
    navigate('/write');
  };

  useEffect(() => {
    fetchDestinations();
  }, [sortCriteria, currentPage, selectedDest]);

  const fetchDestinations = async () => {
    try {
      const [continent, country] = selectedDest.split(' - ');

      const response = await axios.get('http://3.37.134.143:8080/api/v1/travelPost/allPosts', {
        params: {
          orderBy: sortCriteria,
          page: currentPage,
          continent: continent === '여행지' ? null : continent,
          country: country === '전체' || !country ? null : country,
        },
      });

      if (response.data.isSuccess) {
        const { posts, minPageIdx, maxPageIdx } = response.data.result;
        setDestinations(posts);
        setMinPageIdx(minPageIdx);
        setMaxPageIdx(maxPageIdx);
      } else {
        console.error('API 요청에 실패했습니다:', response.data.message);
      }
    } catch (error) {
      if (error.response) {
        console.error(`여행지 데이터를 가져오는 중 오류가 발생했습니다: ${error.response.status}`, error.response.data);
      } else if (error.request) {
        alert('서버로부터 응답이 없습니다. 네트워크 연결을 확인하세요.');
      } 
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
        <WriteButton onClick={handleWriteButtonClick}>
          글쓰기
          <img src={write} alt="write" />
        </WriteButton>
      </SortingContainer>

      <CardGrid>
        {destinations.map((card) => (
          <Card
            key={card.id}
            isActive={activeCard === card.id} 
            onClick={() => setActiveCard(card.id)}
          >
            <CardImageContainer>
              <CardImage src={sampleDefault} alt={card.title} />
              <Overlay>
                <span><img src={like} alt="like" /> {card.likeCount}</span>&emsp;&emsp;
                <span><img src={scrap} alt="scrap" /> {card.scrapCount}</span>
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                <span><img src={link} alt="link" /></span>
              </Overlay>
            </CardImageContainer>
            <CardContent>
              <h2>{card.title}</h2>
              <p>{card.content.length > 50 ? `${card.content.substring(0, 50)}...` : card.content}</p>
              <CardFooter>
                <CardFooterLeft>
                  <span>{card.user.nickname} | {new Date(card.createDate).toLocaleDateString()}</span>
                </CardFooterLeft>
                <CardFooterRight>
                  <span>조회수 {card.viewCount}</span>
                </CardFooterRight>
              </CardFooter>
            </CardContent>
          </Card>
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

const PageContainer = styled.div`
  max-width: 1920px;
  margin: 20px 30px;

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
  margin: 100px 200px 0 200px;
  grid-template-columns: repeat(4, 1fr);
  gap: 0px;
  margin-bottom: 50px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
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

const Card = styled.div`
  width: 280px;
  height: 340px;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);

    img {
      filter: brightness(0%);
    }

    div {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const CardImageContainer = styled.div`
  position: relative;
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
  bottom: 0;
  left: 0;
  width: 100%;
  background: none;
  color: white;
  padding: 5px;
  display: flex;
  justify-content: space-end;

  span {
    display: flex;
    align-items: center;
    gap: 5px;
    img {
      width: 16px;
      height: 16px;
    }
  }
`;

const CardContent = styled.div`
  margin-left: 10px;
  height: 90px;
  h2 {
    font-size: 20px;

    @media (max-width: 480px) {
      font-size: 18px;
    }
  }
  p {
    font-size: 15px;
    color: #75797d;
    height: 85px;

    @media (max-width: 480px) {
      font-size: 14px;
    }
  }
`;

const CardFooter = styled.div`
  display: flex;
  top: 200px;
  justify-content: space-between;
  font-size: 13px;
  color: #75797d;
  margin: 10px 5px 10px 5px;

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const CardFooterLeft = styled.div`
  display: flex;
  gap: 10px;
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