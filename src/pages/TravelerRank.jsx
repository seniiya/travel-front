import React, { useState, useEffect } from "react";
import axios from 'axios';
import styled from "styled-components";
import * as A from "../pages/TravelPage.style";
import sectionbar from '../components/pic/sectionbar.svg';
import TravelerModal from '../pages/TravelerModal.jsx';

import mark3 from '../components/pic/mark3.png';
import headerbar from '../components/pic/headerbar.svg';
import hearticon from '../components/pic/hearticon.svg';
import fullheart from '../components/pic/fullheart.svg';
import scrap from '../components/pic/scrap.svg';
import recordicon from '../components/pic/recordicon.svg';
import movetop from '../components/pic/movetop.svg';
import sampleDefault from '../components/pic/samples/sample18.svg';



export default function TravelerRank() {
    const [activeSection, setActiveSection] = useState('rank');
    const [selectedTraveler, setSelectedTraveler] = useState(null);
    const [likeTraveler, setLikedTraveler] = useState([]);
    const [travelers, setTravelers] = useState([]);


    useEffect(() => {
      fetchTravelers();
    }, []);

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

    const handleSectionClick = (section) => {
      setActiveSection(section);
      // sortTravelers(section);
    };



    // 좋아요 누르면 색상 바뀌는 건가? 
    const handleLikeClick = (travelerId) => {
      setLikedTraveler(prevState => {
          if (prevState.includes(travelerId)) {
              return prevState.filter(id => id !== travelerId);
          } else {
              return [...prevState, travelerId];
          }
      });
    };

    const fetchTravelers = async () => {
      try {
        const response = await axios.get('http://3.37.134.143:8080/api/v1/user/topUsers');
        if (response.data.isSuccess) {
          const enhancedUsers = response.data.result.users.map(user => ({
            id: user.id,
            userid: user.userid,
            nickname: user.nickname,
            title: user.title,
            content: user.content,
            intro: user.intro || '소개글이 없습니다.',
            totalLikes: user.totalLikes || 0,
            totalScraps: user.totalScraps || 0,
            imgSrc: user.imgSrc || sampleDefault,
            // 제공 안함 => 모달 뜰 때 안 뜸 ? 
            joinDate: user.joinDate,
            favoriteCountry: user.favoriteCountry,
            location: user.location,
            sns: user.sns
          }));
          setTravelers(enhancedUsers.slice(0, 30)); // 최대 30명만 
        }
      } catch (error) {
        console.error('Error fetching travelers:', error);
      }
    }

    return (
        <Container>
          <Header>
            <img src={mark3} alt="mark3"/>
            <div>
              <h2>세계 여행가</h2>
              <p>많은 좋아요와 스크랩 수를 보유한 여행가에요.</p>
            </div>
          </Header>
          <HeaderBar />

          <TravelerSection>
            <SectionWrapper>
              <A.Section>
                {['rank', 'join', 'likes', 'scrap', 'writes'].map((section, index) => (
                  <React.Fragment key={section}>
                    <A.SectionTxt     
                        $active={activeSection === section}
                        onClick={() => handleSectionClick(section)}>
                        {section === 'rank' ? '순위순' :
                         section === 'join' ? '가입순' :
                         section === 'likes' ? '좋아요순' :
                         section === 'scrap' ? '스크랩순' : '기록순'}
                    </A.SectionTxt>
                    {index < 4 && <A.SectionBar src={sectionbar} alt="section bar"/>}
                  </React.Fragment>
                ))}
              </A.Section>
            </SectionWrapper>

            <TravelersGrid>
              {travelers.map((traveler, index) => (
                <TravelerCard
                  key={traveler.id}
                  onClick={() => handleClick(traveler)}
                >
                  <img src={traveler.imgSrc} alt={`${traveler.name}`} />
                  <div className="traveler-info">
                    <h2>{index + 1}. {traveler.nickname}</h2>
                    {/* 소개글 최대 100자, 요소에는 80자 이상 시 ... 보이게 */}
                    <Description noDescription={traveler.into === '소개글이 없습니다'}>
                      {traveler.intro.length > 80 ? `${traveler.intro.slice(0, 80)}...` : traveler.intro}
                    </Description>
                    <div className="traveler-stats">
                      <StatItem>
                        <img src={hearticon} alt="like"/>
                        <span>{traveler.totalLikes}</span>
                      </StatItem>
                      <StatItem>
                        <img src={scrap } alt="scrap"/>
                        <span>{traveler.totalScraps}</span>
                      </StatItem>
                      <StatItem>
                        {/* 사진이 동그랗게 잘려서 나옴 */}
                        <img src={recordicon} alt="record"/>
                        <span>{traveler.totalPosts}</span>
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
          <TravelerModal onClose={handelCloseModal} traveler={selectedTraveler}/>
        )}
        </Container>
    )
}
const Container = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    min-height: 100vh;
    max-width: 1290px;
    margin: 0 auto;
    
 
`;

const Header = styled.div`
  display: flex;
  gap: 10px;
  width: 1230px;
  height: 100px;
  align-items: center;
  margin-top: 80px;
  margin-bottom: 20px;
  margin-left: 60px;

  h2 {
    font-size: 23px;
    margin: 0;
  }

  p {
    font-size: 20px;
    margin: 0;
    color: gray;
  }

  img {
    width: 80px;
    height: 80px;
  }

`;

const HeaderBar = styled.div`

    height: 0px;
    left: calc(50% - 1920px/2 );
    position: absolute;
    width: 133.9%;
    top: 220px; 
    border: 1px solid #E0E2E6;

`;

const TravelerSection = styled.div`
  
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

`;


const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 50px 0 84px 0 ;
`;

const TravelersGrid = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(3, 1fr);
  max-width: 1400px;
  gap: 20px;
  margin-left: 30px;
  margin-right: 30px;
`;

const TravelerCard = styled.div`
  display: flex;
  align-items: center;
  width: 380px;
  height: 178px;
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
    margin: 6px;
    width: 140px;
    height: 160px;
    object-fit: cover;
    border-radius: 10px;

  }

  .traveler-info {
    flex-grow: 1;
    width: 150px;
    margin-left: 10px;
    h2 {
      margin: 0;
      font-size: 18px;
      font-weight: 400;
    }

    .traveler-stats {
      display: flex;
      margin-top: 10px;
      font-size: 12px;
      color: #888;
    }
}
`;

const Description = styled.p`
    font-size: 14px;
    // color: #555;
    width: 200px;
    color: ${props => props.noDescription ? '#AAAAAA' : 'inherit'};
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


