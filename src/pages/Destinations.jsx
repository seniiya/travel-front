import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
// import write from '../components/pic/write.png';
import write from '../components/pic/recordicon.svg'; 
import sampleDefault from '../components/pic/samples/sample.jpeg';
// import like from '../components/pic/like.png';
import like from '../components/pic/whiteLike.svg';
// import scrap from '../components/pic/scrap.png';
import scrap from '../components/pic/whiteScrap.svg';
// import link_src from '../components/pic/link.svg';
import link_src from '../components/pic/whiteLink.svg';

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

const Destinations = ({ selectedDest }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortCriteria, setSortCriteria] = useState('newest');
  const [destinations, setDestinations] = useState([]);
  const destinationsPerPage = 16;

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get('/api/destinations');
        setDestinations(response.data.destinations);
      } catch (error) {
        console.error('Error fetching destinations:', error);
      }
    };

    fetchDestinations();
  }, []);

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

export default Destinations;