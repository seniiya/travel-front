import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Draggable from 'react-draggable';
import mark1 from '../components/pic/mark1.png';
import mark2 from '../components/pic/mark2.png';
import mark3 from '../components/pic/mark3.png';
import mark4 from '../components/pic/mark4.png';
import plane1 from '../components/pic/plane1.png';
import plane2 from '../components/pic/plane2.png';
import folder from '../components/pic/folder.png';
import likes from '../components/pic/grayLike.png';
import scraps from '../components/pic/grayScrap.png';
import write from '../components/pic/write.png';
import imageDefault from '../components/pic/default.png';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  padding: 20px;
  margin-top: 100px;
  overflow: hidden;
`;

const StyledButton = styled.button`
  width: 235px;
  height: 59px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #E6E6E6;
  color: black;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: background-color 0.3s ease;
  margin-bottom: 20px;

  &:hover {
    background-color: #F0F5FE;
    color: #005CF9;
  }

  img {
    margin-left: 10px;
    width: 24px;
    height: 24px;
  }
`;

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1600px;
  margin-bottom: 50px;
  overflow: hidden;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 50px;

  img {
    width: 100px;
    height: 100px;
  }

  h2 {
    font-size: 28px;
    margin: 0;
  }

  p {
    font-size: 20px;
    margin: 0;
    color: gray;
  }
`;

const scrollAnimation = (duration) => keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(0); }
`;

const SectionContent = styled.div`
  display: flex;
  gap: 10px;
  padding-bottom: 10px;
  white-space: nowrap;
  cursor: grab;
  animation: ${(props) => scrollAnimation(props.duration)} ${(props) => props.duration}s linear infinite;
  animation-play-state: ${(props) => (props.isPaused ? 'paused' : 'running')};
`;

const CategoryOverlay = styled.div`
  display: flex;
  position: absolute;
  top: 145px;
  left: 10px;
  width: 20px;
  height: 15px;
  background-color: #ffffff;
  color: #005CF9;
  padding: 4px 4px 2px 6px;
  font-size: 11px;
  height: 15px;
  border: 1px solid #005CF9 ;
  border-radius: 8px;
  font-size: 12px;
  z-index: 1;
`;

const ContentCard = styled.div`
  display: inline-block;
  width: 280px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background: white;
  transition: transform 0.3s;
  cursor: pointer;
  position: relative; /* To position the category overlay */

  &.active {
    transform: translateY(-20px);
  }
  img {
    width: 100%;
    height: 180px;
    object-fit: cover;
  }

  .content {
    padding: 15px;
    h3 {
      font-size: 20px;
      margin: 0 0 10px;
    }
    p {
      margin: 0 0 10px;
      color: gray;
    }
    .info {
      display: flex;
      justify-content: space-between;
      color: gray;
    }
  }
`;

const FolderContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  justify-content: center;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const FolderCard = styled.div`
  position: relative;
  width: 310px;
  height: 264px;
  background: url(${folder}) no-repeat center center;
  background-size: 120% 120%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
  font-weight: bold;
  font-size: 18px;
  overflow: hidden;
  border-radius: 10px;

  .image-wrapper {
    position: absolute;
    top: 80px;
    left: 25px;
    width: 245px;
    height: 165px;
    border-radius: 10px;
    overflow: hidden;
    margin: 0;
    padding: 0;
  }

  .image-wrapper img {
    width: 245px;
    height: 165px;
    object-fit: cover;
    transition: opacity 0.5s ease-in-out;
    border-radius: 10px;
  }

  .hidden {
    opacity: 0;
  }

  div {
    position: absolute;
    top: 42px;
    left: 30px;
    width: 310px;
    padding: 5px 10px;
    background: rgba(0, 0, 0, 0);
    border-radius: 10px 10px 0 0;
    z-index: 2;
    font-weight: 400;
  }
`;

const TravelersGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 50px;
`;

const TravelerCard = styled.div`
  display: flex;
  align-items: center;
  width: 450px;
  height: 220px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  background: white;
  transition: transform 0.3s;
  cursor: pointer;

  &.active {
    transform: translateY(-20px);
  }

  img {
    margin: 10px;
    width: 160px;
    height: 175px;
    object-fit: cover;
  }

  .traveler-info {
    flex-grow: 1;
    h2 {
      margin: 0;
      font-size: 20px;
      font-weight: 500;
    }
    p {
      height: 70px;
      font-size: 17px;
      color: #555;
      margin-right: 10px;
    }
    .traveler-stats {
      display: flex;
      font-size: 15px;
      color: #C1C3C5;
      margin-bottom: 10px;
    }
  }
`;

const TravelerStats = styled.div`
  display: flex;
  align-items: center;
  font-size: 15px;
  color: #888;
  align-items: center;
  img {
    width: 16px;
    height: 16px;
    margin: 5px 5px 0 5px;
  }

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }
`;

const PageButtonContainer = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 30px;
  padding-left: 80px;
`;

const PageButton = styled.button`
  width: 50px;
  height: 30px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  font-size: 24px;
  font-weight: 600;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};

  &:hover {
    background-color: #e0e0e0;
  }
`;

const Contents = () => {
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isHovered3, setIsHovered3] = useState(false);
  const [isHovered4, setIsHovered4] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedTravelerCard, setSelectedTravelerCard] = useState(null);
  const [isPaused1, setIsPaused1] = useState(false);
  const [isPaused3, setIsPaused3] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [topTravelPosts, setTopTravelPosts] = useState([]);
  const [travelBagPosts, setTravelBagPosts] = useState([]);
  const [users, setUsers] = useState([]); 
  const navigate = useNavigate();

  const handleDestinationsButtonClick = () => {
    navigate('/travel-destinations');
  };
  const handleTravelerButtonClick = () => {
    navigate('/traveler-rank');
  };
  const handleTravelbagsButtonClick = () => {
    navigate('/travel-bag');
  };

  const travelersPerPage = 6;
  const maxPage = Math.ceil(users.length / travelersPerPage);
  const startIdx = (currentPage - 1) * travelersPerPage;
  const selectedTravelers = users.slice(startIdx, startIdx + travelersPerPage);

  const handleNextPage = () => {
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://3.37.134.143:8080/api/v1/user/topUsers');

        if (response.data.isSuccess && response.data.result.users.length > 0) {
          const formattedUsers = response.data.result.users.map(user => ({
            id: user.id,
            name: user.nickname,
            description: user.intro,
            likes: user.likeCount,  
            comments: user.scrapCount,
            shares: user.postCount, 
            imgSrc: imageDefault,
          }));
          setUsers(formattedUsers);
        }
      } catch (error) {
        console.error('Error fetching users:', error.message || error);
        setUsers([]);
      }
    };

    fetchUsers();
  }, []);


  useEffect(() => {
    const fetchTopTravelPosts = async () => {
      try {
        const response = await axios.get('http://3.37.134.143:8080/api/v1/travelPost/topTravelPosts');
        console.log('API Response:', response);

        if (response.data.isSuccess && response.data.result?.topTravelPosts?.length > 0) {
          const formattedPosts = response.data.result.topTravelPosts.map(post => ({
            id: post.id,
            title: post.title,
            content: post.content,
            likes: post.likeCount,
            downloads: post.scrapCount,
            views: post.viewCount,
            date: post.createDate,
            author: post.user.nickname,
            imageUrl: post.imageUrl || imageDefault,
          }));
          setTopTravelPosts(formattedPosts);
        }
      } catch (error) {
        console.error('Error fetching top travel posts:', error.message || error);
        setTopTravelPosts([]);
      }
    };

    const fetchTravelBagPosts = async () => {
      try {
        const response = await axios.get('http://3.37.134.143:8080/api/v1/travelItemPost/allPosts');
        console.log('Travel Bag API Response:', response);

        if (response.data.isSuccess && response.data.result?.posts?.length > 0) {
          const formattedPosts = response.data.result.posts.map(post => ({
            id: post.id,
            title: post.title,
            content: post.content,
            likes: post.likeCount,
            downloads: post.scrapCount,
            views: post.viewCount,
            date: post.createDate,
            author: post.user.nickname,
            imageUrl: post.repImage || imageDefault,
          }));
          setTravelBagPosts(formattedPosts);
        }
      } catch (error) {
        console.error('Error fetching travel bag posts:', error.message || error);
        setTravelBagPosts([]);
      }
    };

    fetchTopTravelPosts();
    fetchTravelBagPosts();
  }, []);

  
  return (
    <Container>
      <SectionContainer>
        <SectionHeader>
          <img src={mark1} alt="마크" />
          <div>
            <h2>금주의 기록</h2>
            <p>7일 동안의 인기 있었던 기록들이에요.</p>
          </div>
        </SectionHeader>
        <Draggable
          axis="x"
          onStart={() => setIsPaused1(true)}
          onStop={() => setIsPaused1(false)}
        >
          <div>
            <SectionContent
              duration={30}
              onMouseEnter={() => setIsPaused1(true)}
              onMouseLeave={() => setIsPaused1(false)}
              isPaused={isPaused1}
            >
              {topTravelPosts.map(post => (post && (
                <ContentCard key={post.id} onClick={() => setSelectedCard(post.id)}>
                  <img src={post.imageUrl} alt={post.title} />
                  <div className="content">
                    <h3>{post.title}</h3>
                    <p>{post.content.length > 25 ? `${post.content.substring(0, 25)}...` : post.content}</p>
                    <div className="info">
                      <span>{post.author} | {new Date(post.date).toLocaleDateString()}</span>
                      <span>조회수 {post.views}</span>
                    </div>
                  </div>
                </ContentCard>
              )
            ))}
            </SectionContent>
          </div>
        </Draggable>
      </SectionContainer>
      <StyledButton
        onMouseEnter={() => setIsHovered1(true)}
        onMouseLeave={() => setIsHovered1(false)}
      >
        금주의 기록 전체보기
        <img src={isHovered1 ? plane2 : plane1} alt="비행기" />
      </StyledButton>

      <SectionContainer>
        <SectionHeader>
          <img src={mark2} alt="마크" />
          <div>
            <h2>여행지</h2>
            <p>여행가들이 선호하는 여행지에요.</p>
          </div>
        </SectionHeader>
        <FolderContainer>
          {topTravelPosts.map(post => (
            <FolderCard key={post.id}>
              <div className="image-wrapper">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="current"
                />
              </div>
              <div>{post.title}</div>
            </FolderCard>
          ))}
        </FolderContainer>
      </SectionContainer>
      <StyledButton onClick={handleDestinationsButtonClick}
        onMouseEnter={() => setIsHovered2(true)}
        onMouseLeave={() => setIsHovered2(false)}
      >
        여행지 전체보기
        <img src={isHovered2 ? plane2 : plane1} alt="비행기" />
      </StyledButton>

      <SectionContainer>
        <SectionHeader>
          <img src={mark3} alt="마크" />
          <div>
            <h2>세계 여행가</h2>
            <p>많은 좋아요와 스크랩 수를 보유한 여행가에요.</p>
          </div>
        </SectionHeader>
        <TravelersGrid>
          {selectedTravelers.map(traveler => (
            <TravelerCard
              key={traveler.id}
              onClick={() => setSelectedTravelerCard(traveler.id)}
              className={selectedTravelerCard === traveler.id ? 'active' : ''}
            >
              <img src={traveler.imgSrc} alt={`${traveler.name}`} />
              <div className="traveler-info">
                <h2>{traveler.name}</h2>
                <p>{traveler.description.length > 50 ? `${traveler.description.substring(0, 50)}...` : traveler.description}</p>
                <TravelerStats>
                  <span><img src={likes} alt="like" />{traveler.likes}</span>&ensp;
                  <span><img src={scraps} alt="scrap" /> {traveler.comments}</span>&ensp;
                  <span><img src={write} alt="write" /> {traveler.shares}</span>
                </TravelerStats>
              </div>
            </TravelerCard>
          ))}
        </TravelersGrid>
        <PageButtonContainer>
          <PageButton onClick={handlePrevPage} disabled={currentPage === 1}>{'<'}</PageButton>
          <PageButton onClick={handleNextPage} disabled={currentPage === maxPage}>{'>'}</PageButton>
        </PageButtonContainer>
      </SectionContainer>
      <StyledButton onClick={handleTravelerButtonClick}
        onMouseEnter={() => setIsHovered3(true)}
        onMouseLeave={() => setIsHovered3(false)}
      >
        세계 여행가 전체보기
        <img src={isHovered3 ? plane2 : plane1} alt="비행기" />
      </StyledButton>

      <SectionContainer>
        <SectionHeader>
          <img src={mark4} alt="마크" />
          <div>
            <h2>여행가방</h2>
            <p>여행가들의 가방 속 빠질 수 없는 이것!</p>
          </div>
        </SectionHeader>
        <Draggable
          axis="x"
          onStart={() => setIsPaused3(true)}
          onStop={() => setIsPaused3(false)}
        >
          <div>
            <SectionContent
              duration={50}
              onMouseEnter={() => setIsPaused3(true)}
              onMouseLeave={() => setIsPaused3(false)}
              isPaused={isPaused3}
            >
              {travelBagPosts.map(post => (
                <ContentCard key={post.id} onClick={() => setSelectedCard(post.id)}>
                  <CategoryOverlay>
                    # {post.categories}
                  </CategoryOverlay>
                  <img src={post.imageUrl} alt={post.title} />
                  <div className="content">
                    <h3>{post.title}</h3>
                    <p>{post.content.substring(0, 100)}...</p>
                    <div className="info">
                      <span>{post.author} | {new Date(post.date).toLocaleDateString()}</span>
                      <span>조회수 {post.views}</span>
                    </div>
                  </div>
                </ContentCard>
              ))}
            </SectionContent>
          </div>
        </Draggable>
      </SectionContainer>
      <StyledButton onClick={handleTravelbagsButtonClick}
        onMouseEnter={() => setIsHovered4(true)}
        onMouseLeave={() => setIsHovered4(false)}
      >
        여행가방 전체보기
        <img src={isHovered4 ? plane2 : plane1} alt="비행기" />
      </StyledButton>
    </Container>
  );
};

export default Contents;