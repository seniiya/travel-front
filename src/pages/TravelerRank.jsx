import React, { useState } from "react";
import styled from "styled-components";
import sectionbar from '../components/pic/sectionbar.svg';
import * as A from "../pages/TravelPage.style";
import TravelerModal from '../pages/TravelerModal.jsx';

import mark3 from '../components/pic/mark3.png';
import headerbar from '../components/pic/headerbar.svg';
import hearticon from '../components/pic/hearticon.svg';
import fullheart from '../components/pic/fullheart.svg';
import scrap from '../components/pic/scrap.svg';
import recordicon from '../components/pic/recordicon.svg';
import movetop from '../components/pic/movetop.svg';


import sampleDefault from '../components/pic/samples/sample.jpeg'; /* 서버에서 받아오게 */
import sampleDefault2 from '../components/pic/samples/sample2.jpeg';
import sampleDefault3 from '../components/pic/samples/sample3.jpeg';
import sampleDefault4 from '../components/pic/samples/sample4.jpeg';
import sampleDefault5 from '../components/pic/samples/sample5.jpeg';
import sampleDefault6 from '../components/pic/samples/sample6.jpeg';
import sampleDefault7 from '../components/pic/samples/sample7.jpeg';
import sampleDefault8 from '../components/pic/samples/sample8.jpeg';
import sampleDefault9 from '../components/pic/samples/sample9.jpeg';
import sampleDefault10 from '../components/pic/samples/sample10.jpeg';
import sampleDefault11 from '../components/pic/samples/sample11.jpeg';
import sampleDefault12 from '../components/pic/samples/sample12.jpeg';
import sampleDefault13 from '../components/pic/samples/sample13.jpeg';
import sampleDefault14 from '../components/pic/samples/sample14.jpeg';
import sampleDefault15 from '../components/pic/samples/sample15.jpeg';
import sampleDefault16 from '../components/pic/samples/sample16.jpeg';

export default function TravelerRank() {
    const [isActiveSection, setisActiveSection] = useState(null);
    const [selectedTraveler, setSelectedTraveler] = useState(null);
    const [likeTraveler, setLikedTraveler] = useState([]);

    const handleClick = (traveler) => {
      setSelectedTraveler(traveler);
    };
    
    const handelCloseModal = () => {
      setSelectedTraveler(null);
    }

    const MoveToTop = () => {
      // top: 0 (맨위로)
      window.scrollTo({ top: 0, behavior: 'smooth'})
    }

    const handleLikeClick = (travelerId) => {
      setLikedTraveler(prevState => {
          if (prevState.includes(travelerId)) {
              return prevState.filter(id => id !== travelerId);
          } else {
              return [...prevState, travelerId];
          }
      });
    };

    const travelersPerPage = 30;
    

    // 최대 30명
    const worldTravelers = [
        {
          id: 1,
          name: '김태엽1',
          description: '안녕하세요, 25살의 여행가 김태엽입니다. 📸 ✈️호주의 문화와 풍경을 사랑하며, 필름 카메라로 순간을 담는 것을 즐깁니다.여행을 통해 얻은 경험을 사진과 이야기로 나누고 싶어요. 많은 분들에게 영감을 주는 것이 제 꿈입니다. 잘 부탁드려요! 🙏✨',
          likes: '3.2만',
          comments: 1312,
          shares: 5,
          imgSrc: sampleDefault,
          sns: [
            'https://www.youtube.com/channel/UCET3I7YOuGTO31OlYdg2B_w',
            'https://x.com/_sskofficial',
            'https://www.instagram.com/SJKUKSEE/'
          ],
          location: '서울',
          dateofissue:'2024-07-24',
          favcountry: '호주',
          // introduce: 
        },
        {
          id: 2,
          name: '김태엽2',
          description: '안녕하세요! 저는 여행을 사랑하는 25살 김태엽입니다. 새로운 장소를 탐험하고, 다양한 문화를 경험하며, 전 세계 사람들과 소통하는 것을 즐깁니다...',
          likes: '3.2만',
          comments: 1312,
          shares: 5,
          imgSrc: sampleDefault2, 
          sns: [
            'https://www.youtube.com/channel/UCET3I7YOuGTO31OlYdg2B_w',
            'https://x.com/_sskofficial'
          ],
          location: '울산',
          dateofissue:'2024-07-24',
          favcountry: '한국',
        },
        {
          id: 3,
          name: '김태엽3',
          description: '안녕하세요! 저는 여행을 사랑하는 25살 김태엽입니다. 새로운 장소를 탐험하고, 다양한 문화를 경험하며, 전 세계 사람들과 소통하는 것을 즐깁니다...',
          likes: '3.2만',
          comments: 1312,
          shares: 5,
          imgSrc: sampleDefault3,
          sns: [
            'https://www.youtube.com/channel/UCET3I7YOuGTO31OlYdg2B_w',
            'https://x.com/_sskofficial'
          ],
          location: '울산',
          dateofissue:'2024-07-24',
          favcountry: '한국', 
        },
        {
          id: 4,
          name: '김태엽',
          description: '안녕하세요! 저는 여행을 사랑하는 25살 김태엽입니다. 새로운 장소를 탐험하고, 다양한 문화를 경험하며, 전 세계 사람들과 소통하는 것을 즐깁니다...',
          likes: '3.2만',
          comments: 1312,
          shares: 5,
          imgSrc: sampleDefault4,
          sns: [
            'https://www.youtube.com/channel/UCET3I7YOuGTO31OlYdg2B_w',
            'https://x.com/_sskofficial',
            'https://www.instagram.com/SJKUKSEE/'
          ],
          location: '서울',
          dateofissue:'2024-07-24',
          favcountry: '호주',
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
        },
        {
          id: 13,
          name: '김태엽',
          description: '안녕하세요! 저는 여행을 사랑하는 25살 김태엽입니다. 새로운 장소를 탐험하고, 다양한 문화를 경험하며, 전 세계 사람들과 소통하는 것을 즐깁니다...',
          likes: '3.2만',
          comments: 1312,
          shares: 5,
          imgSrc: sampleDefault12
        },
        {
          id: 14,
          name: '김태엽',
          description: '안녕하세요! 저는 여행을 사랑하는 25살 김태엽입니다. 새로운 장소를 탐험하고, 다양한 문화를 경험하며, 전 세계 사람들과 소통하는 것을 즐깁니다...',
          likes: '3.2만',
          comments: 1312,
          shares: 5,
          imgSrc: sampleDefault12
        },
        {
          id: 15,
          name: '김태엽',
          description: '안녕하세요! 저는 여행을 사랑하는 25살 김태엽입니다. 새로운 장소를 탐험하고, 다양한 문화를 경험하며, 전 세계 사람들과 소통하는 것을 즐깁니다...',
          likes: '3.2만',
          comments: 1312,
          shares: 5,
          imgSrc: sampleDefault12
        },
        {
          id: 16,
          name: '김태엽',
          description: '안녕하세요! 저는 여행을 사랑하는 25살 김태엽입니다. 새로운 장소를 탐험하고, 다양한 문화를 경험하며, 전 세계 사람들과 소통하는 것을 즐깁니다...',
          likes: '3.2만',
          comments: 1312,
          shares: 5,
          imgSrc: sampleDefault13
        },
        {
          id: 17,
          name: '김태엽',
          description: '안녕하세요! 저는 여행을 사랑하는 25살 김태엽입니다. 새로운 장소를 탐험하고, 다양한 문화를 경험하며, 전 세계 사람들과 소통하는 것을 즐깁니다...',
          likes: '3.2만',
          comments: 1312,
          shares: 5,
          imgSrc: sampleDefault14
        },
        {
          id: 18,
          name: '김태엽',
          description: '안녕하세요! 저는 여행을 사랑하는 25살 김태엽입니다. 새로운 장소를 탐험하고, 다양한 문화를 경험하며, 전 세계 사람들과 소통하는 것을 즐깁니다...',
          likes: '3.2만',
          comments: 1312,
          shares: 5,
          imgSrc: sampleDefault15
        },
        {
          id: 19,
          name: '김태엽',
          description: '안녕하세요! 저는 여행을 사랑하는 25살 김태엽입니다. 새로운 장소를 탐험하고, 다양한 문화를 경험하며, 전 세계 사람들과 소통하는 것을 즐깁니다...',
          likes: '3.2만',
          comments: 1312,
          shares: 5,
          imgSrc: sampleDefault16
        },
        {
          id: 20,
          name: '김태엽',
          description: '안녕하세요! 저는 여행을 사랑하는 25살 김태엽입니다. 새로운 장소를 탐험하고, 다양한 문화를 경험하며, 전 세계 사람들과 소통하는 것을 즐깁니다...',
          likes: '3.2만',
          comments: 1312,
          shares: 5,
          imgSrc: sampleDefault12
        },
        {
          id: 21,
          name: '김태엽',
          description: '안녕하세요! 저는 여행을 사랑하는 25살 김태엽입니다. 새로운 장소를 탐험하고, 다양한 문화를 경험하며, 전 세계 사람들과 소통하는 것을 즐깁니다...',
          likes: '3.2만',
          comments: 1312,
          shares: 5,
          imgSrc: sampleDefault12
        },
        {
          id: 22,
          name: '김태엽',
          description: '안녕하세요! 저는 여행을 사랑하는 25살 김태엽입니다. 새로운 장소를 탐험하고, 다양한 문화를 경험하며, 전 세계 사람들과 소통하는 것을 즐깁니다...',
          likes: '3.2만',
          comments: 1312,
          shares: 5,
          imgSrc: sampleDefault12
        },
        {
          id: 23,
          name: '김태엽',
          description: '안녕하세요! 저는 여행을 사랑하는 25살 김태엽입니다. 새로운 장소를 탐험하고, 다양한 문화를 경험하며, 전 세계 사람들과 소통하는 것을 즐깁니다...',
          likes: '3.2만',
          comments: 1312,
          shares: 5,
          imgSrc: sampleDefault12
        },
        {
          id: 24,
          name: '김태엽',
          description: '안녕하세요! 저는 여행을 사랑하는 25살 김태엽입니다. 새로운 장소를 탐험하고, 다양한 문화를 경험하며, 전 세계 사람들과 소통하는 것을 즐깁니다...',
          likes: '3.2만',
          comments: 1312,
          shares: 5,
          imgSrc: sampleDefault12
        },
        {
          id: 25,
          name: '김태엽',
          description: '안녕하세요! 저는 여행을 사랑하는 25살 김태엽입니다. 새로운 장소를 탐험하고, 다양한 문화를 경험하며, 전 세계 사람들과 소통하는 것을 즐깁니다...',
          likes: '3.2만',
          comments: 1312,
          shares: 5,
          imgSrc: sampleDefault12
        },
        {
          id: 26,
          name: '김태엽',
          description: '안녕하세요! 저는 여행을 사랑하는 25살 김태엽입니다. 새로운 장소를 탐험하고, 다양한 문화를 경험하며, 전 세계 사람들과 소통하는 것을 즐깁니다...',
          likes: '3.2만',
          comments: 1312,
          shares: 5,
          imgSrc: sampleDefault12
        },
        {
          id: 27,
          name: '김태엽',
          description: '안녕하세요! 저는 여행을 사랑하는 25살 김태엽입니다. 새로운 장소를 탐험하고, 다양한 문화를 경험하며, 전 세계 사람들과 소통하는 것을 즐깁니다...',
          likes: '3.2만',
          comments: 1312,
          shares: 5,
          imgSrc: sampleDefault12
        },
        {
          id: 28,
          name: '김태엽',
          description: '안녕하세요! 저는 여행을 사랑하는 25살 김태엽입니다. 새로운 장소를 탐험하고, 다양한 문화를 경험하며, 전 세계 사람들과 소통하는 것을 즐깁니다...',
          likes: '3.2만',
          comments: 1312,
          shares: 5,
          imgSrc: sampleDefault12
        },
        {
          id: 29,
          name: '김태엽',
          description: '안녕하세요! 저는 여행을 사랑하는 25살 김태엽입니다. 새로운 장소를 탐험하고, 다양한 문화를 경험하며, 전 세계 사람들과 소통하는 것을 즐깁니다...',
          likes: '3.2만',
          comments: 1312,
          shares: 5,
          imgSrc: sampleDefault12
        },
        {
          id: 30,
          name: '김태엽',
          description: '안녕하세요! 저는 여행을 사랑하는 25살 김태엽입니다. 새로운 장소를 탐험하고, 다양한 문화를 경험하며, 전 세계 사람들과 소통하는 것을 즐깁니다...',
          likes: '3.2만',
          comments: 1312,
          shares: 5,
          imgSrc: sampleDefault12
        }
      ];

    const selectedTravelers = worldTravelers.slice(0, travelersPerPage);

    return (
        <Container>
          <Header>
            <img src={mark3} alt="mark3"/>
            <div>
              <h2>세계 여행가</h2>
              <p>많은 좋아요와 스크랩 수를 보유한 여행가에요.</p>
            </div>
          </Header>
          <HeaderBar src={headerbar} alt="header bar"/>

          <TravelerSection>
            <SectionWrapper>
            < A.Section>
                <A.SectionTxt     
                    $active={isActiveSection === 'rank'}
                    onClick={() => setisActiveSection('rank')}>
                순위순
                </A.SectionTxt>
                <A.SectionBar src={sectionbar} alt="section bar"/>
                <A.SectionTxt 
                    $active={isActiveSection === 'join'}
                    onClick={() => setisActiveSection('join')}>
                가입순
                </A.SectionTxt>
                <A.SectionBar src={sectionbar} alt="section bar"/>
                <A.SectionTxt 
                    $active={isActiveSection === 'like'}
                    onClick={() => setisActiveSection('like')}>
                좋아요순
                </A.SectionTxt>
                <A.SectionBar src={sectionbar} alt="section bar"/>
                <A.SectionTxt 
                    $active={isActiveSection === 'scrap'}
                    onClick={() => setisActiveSection('scrap')}>
                스크랩순
                </A.SectionTxt>
                <A.SectionBar src={sectionbar} alt="section bar"/>
                <A.SectionTxt 
                    $active={isActiveSection === 'write'}
                    onClick={() => setisActiveSection('write')}>
                기록순
                </A.SectionTxt>
              </A.Section>
            </SectionWrapper>

            <TravelersGrid>
              {selectedTravelers.map((traveler, index) => (
                <TravelerCard
                  key={traveler.id}
                  onClick={() => handleClick(traveler)}
                >
                  <img src={traveler.imgSrc} alt={`${traveler.name}`} />
                  <div className="traveler-info">
                    <h2>{index + 1}. {traveler.name}</h2>
                    {/* 소개글 최대 100자, 요소에는 80자 이상 시 ... 보이게 */}
                    <p>
                      {traveler.description.length > 80
                        ? `${traveler.description.slice(0, 80)}. . .`
                       : traveler.description}
                    </p>
                    <div className="traveler-stats">
                      <StatItem>
                        <img src={hearticon} alt="like"/>
                        <span>{traveler.likes}</span>
                      </StatItem>
                      <StatItem>
                        <img src={scrap } alt="scrap"/>
                        <span>{traveler.comments}</span>
                      </StatItem>
                      <StatItem>
                        {/* 사진이 동그랗게 잘려서 나옴 */}
                        <img src={recordicon} alt="record"/>
                        <span>{traveler.shares}</span>
                      </StatItem>
                    </div>
                  </div>
                </TravelerCard>
              ))}

            </TravelersGrid>
          </TravelerSection>

            <A.GoTop onClick={MoveToTop}>
              <img src={movetop}  alt="move to top"/>
            </A.GoTop>
            



        {selectedTraveler && (
          <TravelerModal onClose={handelCloseModal} traveler={selectedTraveler}>
              {/* <TravelerDtails traveler={selectedTraveler}/> */}
          </TravelerModal>
        )}
        </Container>
    )
}


const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: relative; // 추가
    // flex: 1;
    min-height: 100vh;
    padding: 80px 20px 20px; // 상단 패딩 증가
    // overflow: hidden;
    max-width: 1400px;
    // min-height: 100vh;
    margin: 0 auto;
    // margin-top: 80px;
 
`;

const Header = styled.div`
  /* Frame 10057 */

  /* Auto layout */
  display: flex;
  // flex-direction: column;
  // align-items: flex-start;
  // padding: 0px;/
  gap: 25px;
  align-items: center;
  // gap: 10px;
  margin-bottom: 20px;
  // margin-left: 50px;

  // position: absolute;
  // width: 1540px;
  // height: 100px;
  // left: 190px;
  // top: 137px;

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

const HeaderBar = styled.div`

  position: absolute;
  width: 1920px;
  // width: 100%;
  height: 0px;
  left: calc(50% - 1920px/2);
  // top: 262px;
  margin: 120px 0 0px 0;
  border: 1px solid #E0E2E6;

`;

const TravelerSection = styled.div`
  
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 0; // 수정

`;


const SectionWrapper = styled.div`

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 84px;
  // padding: 0px;
  // gap: 40px;

  // position: absolute;
  // width: 1400px;
  // height: 25px;
  // left: 0px;
  // top: 0px;

`;

const TravelersGrid = styled.div`

  display: grid;
  justify-content: center;
  grid-template-columns: repeat(3, 1fr);
  // margin: 0 auto;
  max-width: 1400px;
  gap: 50px;
  // margin-top: 50px;

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

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 20px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: none;
    box-shadow: none;
  }

  img {
    margin: 10px;
    width: 160px;
    height: 175px;
    object-fit: cover;
    border-radius: 10px;
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

const StatItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;

  img {
    margin-right: 5px;
    width: 12px;
    height: 12px;
  }

  span {
    font-size: 12px;
  }
`;





// const TravelerDtails = ({ traveler }) => (
//   <div>
//       <img src={traveler.imgSrc} alt={`${traveler.name}`} />
//       <h2>{traveler.name}</h2>
//       <p>{traveler.description}</p>
//       <div className="traveler-stats">
//           <span>좋아요 {traveler.likes}</span>
//           <span>댓글 {traveler.comments}</span>
//           <span>공유 {traveler.shares}</span>
//       </div>
//   </div>
// );