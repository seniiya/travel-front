import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Draggable from 'react-draggable';
import mark1 from '../components/pic/mark1.png';
import mark2 from '../components/pic/mark2.png';
import mark3 from '../components/pic/mark3.png';
import mark4 from '../components/pic//mark4.png';
import plane1 from '../components/pic/plane1.png';
import plane2 from '../components/pic/plane2.png';
import folder from '../components/pic/folder.png';
import sampleDefault from '../components/pic/samples/sample.jpeg'; /* 서버에서 받아오게 */
import sampleDefault2 from '../components/pic/samples/sample2.jpeg';
import sampleDefault3 from '../components/pic/samples/sample3.jpeg';
import sampleDefault4 from '../components/pic/samples/sample4.jpeg';
import sampleDefault5 from '../components/pic/samples/sample5.jpeg';
import sampleDefault6 from '../components/pic/samples/sample6.jpeg';
import sampleDefault7 from '../components/pic/sample7.jpeg';
import sampleDefault8 from '../components/pic/sample8.jpeg';
import sampleDefault9 from '../components/pic/sample9.jpeg';
import sampleDefault10 from '../components/pic/sample10.jpeg';
import sampleDefault11 from '../components/pic/sample11.jpeg';
import sampleDefault12 from '../components/pic/sample12.jpeg';
import sampleDefault13 from '../components/pic/sample13.jpeg';
import sampleDefault14 from '../components/pic/sample14.jpeg';
import sampleDefault15 from '../components/pic/sample15.jpeg';
import sampleDefault16 from '../components/pic/samples/sample16.jpeg';

const images = [
  sampleDefault, sampleDefault2, sampleDefault3, sampleDefault4,
  sampleDefault5, sampleDefault6, sampleDefault7, sampleDefault8,
  sampleDefault9, sampleDefault10, sampleDefault11, sampleDefault12,
  sampleDefault13, sampleDefault14, sampleDefault15, sampleDefault16
];

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const getShuffledImages = (count) => {
  return shuffleArray(images.slice()).slice(0, count);
};

const getRandomImage = (usedImages) => {
  const availableImages = images.filter(img => !usedImages.includes(img));
  return availableImages[Math.floor(Math.random() * availableImages.length)];
};

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

const ContentCard = styled.div`
  display: inline-block;
  min-width: 280px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background: white;
  transition: transform 0.3s;
  cursor: pointer;

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
  margin-bottom: 10px;

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
    padding: 10px;
    h2 {
      margin: 0;
      font-size: 18px;
      font-weight: 400;
    }
    p {
      font-size: 14px;
      color: #555;
      margin-right: 10px;
    }
    .traveler-stats {
      display: flex;
      margin-top: 10px;
      font-size: 12px;
      color: #888;
    }
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

  const travelFolders = [
    { name: '• 삿포로' },
    { name: '• 나트랑' },
    { name: '• 대만' },
    { name: '• 이탈리아' },
    { name: '• 괌' },
    { name: '• 사이판' },
    { name: '• 다낭' },
    { name: '• 방콕파타야' },
  ];

  const shuffledImages = getShuffledImages(travelFolders.length);
  const [folderImages, setFolderImages] = useState(shuffledImages);

  const handleMouseEnterFolder = (index) => {
    const newImages = [...folderImages];
    const currentImage = newImages[index];
    let randomImage = getRandomImage(newImages);

    while (randomImage === currentImage) {
      randomImage = getRandomImage(newImages);
    }

    newImages[index] = randomImage;
    setFolderImages(newImages);
  };

  const contentCards = Array.from({ length: 100 }, (_, index) => (
    <ContentCard
      key={index}
      onClick={() => setSelectedCard(index)}
      className={selectedCard === index ? 'active' : ''}
    >
      <img src={sampleDefault} alt="샘플" />
      <div className="content">
        <h3>제목입니다</h3>
        <p>내용입니다 내용입니다 내용입니다 내용입니다</p>
        <div className="info">
          <span>김태엽 | 2024-08-24</span>
          <span>조회수 999+</span>
        </div>
      </div>
    </ContentCard>
  ));

  const worldTravelers = [
    {
      id: 1,
      name: '김태엽',
      description: '안녕하세요! 저는 여행을 사랑하는 25살 김태엽입니다. 새로운 장소를 탐험하고, 다양한 문화를 경험하며, 전 세계 사람들과 소통하는 것을 즐깁니다...',
      likes: '3.2만',
      comments: 1312,
      shares: 5,
      imgSrc: sampleDefault 
    },
    {
      id: 2,
      name: '김태엽',
      description: '안녕하세요! 저는 여행을 사랑하는 25살 김태엽입니다. 새로운 장소를 탐험하고, 다양한 문화를 경험하며, 전 세계 사람들과 소통하는 것을 즐깁니다...',
      likes: '3.2만',
      comments: 1312,
      shares: 5,
      imgSrc: sampleDefault2 
    },
    {
      id: 3,
      name: '김태엽',
      description: '안녕하세요! 저는 여행을 사랑하는 25살 김태엽입니다. 새로운 장소를 탐험하고, 다양한 문화를 경험하며, 전 세계 사람들과 소통하는 것을 즐깁니다...',
      likes: '3.2만',
      comments: 1312,
      shares: 5,
      imgSrc: sampleDefault3 
    },
    {
      id: 4,
      name: '김태엽',
      description: '안녕하세요! 저는 여행을 사랑하는 25살 김태엽입니다. 새로운 장소를 탐험하고, 다양한 문화를 경험하며, 전 세계 사람들과 소통하는 것을 즐깁니다...',
      likes: '3.2만',
      comments: 1312,
      shares: 5,
      imgSrc: sampleDefault4 
    },
    {
      id: 5,
      name: '김태엽',
      description: '안녕하세요! 저는 여행을 사랑하는 25살 김태엽입니다. 새로운 장소를 탐험하고, 다양한 문화를 경험하며, 전 세계 사람들과 소통하는 것을 즐깁니다...',
      likes: '3.2만',
      comments: 1312,
      shares: 5,
      imgSrc: sampleDefault5 
    },
    {
      id: 6,
      name: '김태엽',
      description: '안녕하세요! 저는 여행을 사랑하는 25살 김태엽입니다. 새로운 장소를 탐험하고, 다양한 문화를 경험하며, 전 세계 사람들과 소통하는 것을 즐깁니다...',
      likes: '3.2만',
      comments: 1312,
      shares: 5,
      imgSrc: sampleDefault6 
    },
    {
      id: 7,
      name: '김태엽',
      description: '안녕하세요! 저는 여행을 사랑하는 25살 김태엽입니다. 새로운 장소를 탐험하고, 다양한 문화를 경험하며, 전 세계 사람들과 소통하는 것을 즐깁니다...',
      likes: '3.2만',
      comments: 1312,
      shares: 5,
      imgSrc: sampleDefault7
    },
    {
      id: 8,
      name: '김태엽',
      description: '안녕하세요! 저는 여행을 사랑하는 25살 김태엽입니다. 새로운 장소를 탐험하고, 다양한 문화를 경험하며, 전 세계 사람들과 소통하는 것을 즐깁니다...',
      likes: '3.2만',
      comments: 1312,
      shares: 5,
      imgSrc: sampleDefault8
    },
    {
      id: 9,
      name: '김태엽',
      description: '안녕하세요! 저는 여행을 사랑하는 25살 김태엽입니다. 새로운 장소를 탐험하고, 다양한 문화를 경험하며, 전 세계 사람들과 소통하는 것을 즐깁니다...',
      likes: '3.2만',
      comments: 1312,
      shares: 5,
      imgSrc: sampleDefault9
    },
    {
      id: 10,
      name: '김태엽',
      description: '안녕하세요! 저는 여행을 사랑하는 25살 김태엽입니다. 새로운 장소를 탐험하고, 다양한 문화를 경험하며, 전 세계 사람들과 소통하는 것을 즐깁니다...',
      likes: '3.2만',
      comments: 1312,
      shares: 5,
      imgSrc: sampleDefault10
    },
    {
      id: 11,
      name: '김태엽',
      description: '안녕하세요! 저는 여행을 사랑하는 25살 김태엽입니다. 새로운 장소를 탐험하고, 다양한 문화를 경험하며, 전 세계 사람들과 소통하는 것을 즐깁니다...',
      likes: '3.2만',
      comments: 1312,
      shares: 5,
      imgSrc: sampleDefault11
    },
    {
      id: 12,
      name: '김태엽',
      description: '안녕하세요! 저는 여행을 사랑하는 25살 김태엽입니다. 새로운 장소를 탐험하고, 다양한 문화를 경험하며, 전 세계 사람들과 소통하는 것을 즐깁니다...',
      likes: '3.2만',
      comments: 1312,
      shares: 5,
      imgSrc: sampleDefault12
    }
  ];

  const travelersPerPage = 6;
  const maxPage = Math.ceil(worldTravelers.length / travelersPerPage);
  const startIdx = (currentPage - 1) * travelersPerPage;
  const selectedTravelers = worldTravelers.slice(startIdx, startIdx + travelersPerPage);

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
              {contentCards}
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
          {travelFolders.map((folderItem, index) => (
            <FolderCard key={index}>
              <div className="image-wrapper">
                <img
                  src={folderImages[index]}
                  alt={folderItem.name}
                  onMouseEnter={() => handleMouseEnterFolder(index)}
                  className="current"
                />
              </div>
              <div>{folderItem.name}</div>
            </FolderCard>
          ))}
        </FolderContainer>
      </SectionContainer>
      <StyledButton
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
                <p>{traveler.description}</p>
                <div className="traveler-stats">
                  <span>좋아요 {traveler.likes}</span>
                  <span>댓글 {traveler.comments}</span>
                  <span>공유 {traveler.shares}</span>
                </div>
              </div>
            </TravelerCard>
          ))}
        </TravelersGrid>
        <PageButtonContainer>
          <PageButton onClick={handlePrevPage} disabled={currentPage === 1}>{'<'}</PageButton>
          <PageButton onClick={handleNextPage} disabled={currentPage === maxPage}>{'>'}</PageButton>
        </PageButtonContainer>
      </SectionContainer>
      <StyledButton
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
              {contentCards}
            </SectionContent>
          </div>
        </Draggable>
      </SectionContainer>
      <StyledButton
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