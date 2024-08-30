import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import sectionbar from '../components/pic/sectionbar.svg';
import * as A from "../pages/TravelPage.style";
import {Link } from "react-router-dom";

import mark1 from '../components/pic/mark1.png';
import headerbar from '../components/pic/headerbar.svg';
import recordicon from '../components/pic/recordicon.svg';
// import sampleDefault from '../components/pic/samples/sample.jpeg';
import sampleDefault from '../components/pic/samples/sample18.svg';
import movetop from '../components/pic/movetop.svg';

import likeicon from '../components/pic/whiteLike.svg';
import scrapicon from '../components/pic/whiteScrap.svg';
import linkicon from '../components/pic/whiteLink.svg';

export default function PopularPage() {
    const [activeSection, setActiveSection] = useState('latest');
    const [selectedCard, setSelectedCard] = useState(null);
    const [topPosts, setTopPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
      fetchTopPosts();
    }, [activeSection]);

    const fetchTopPosts = async () => {
      setIsLoading(true);
      setError(null);
      


      try {
        const response = await axios.get('http://3.37.134.143:8080/api/v1/travelPost/topTravelPosts', {
                // params: {  },
                withCredentials: true
            });
            console.log('API Response:', response);  // 디버깅용 로그
            
            if (response.data.isSuccess && response.data.result?.topTravelPosts?.length > 0) {
              const formattedPosts = response.data.result.topTravelPosts.map(post => ({
                id: post.id,
                nickname: post.nickname,
                title: post.title,
                content: post.content,
                continent: post.continent,
                country: post.country,
                likeCount: post.likeCount,
                scrapCount: post.scrapCount,
                viewCount: post.viewCount,
                createDate: post.createDate,
                repImage: sampleDefault,
                user: post.user
              }));

              setTopPosts(formattedPosts);
            } else {
              throw new Error(response.data?.message || '데이터를 불러오는데 실패했습니다.');
            }
          } catch (error) {
            console.error('Error fetching top posts:', error);
            setError('게시글을 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.');
          } finally {
            setIsLoading(false);
          }
      };

    const handleClick = (section) => {
        setActiveSection(section);
    };

    const MoveToTop = () => {
      // top: 0 (맨위로)
      window.scrollTo({ top: 0, behavior: 'smooth'})
    }

     // HTML 태그 제거 함수
    const stripHtml = (html) => {
      let tmp = document.createElement("DIV");
      tmp.innerHTML = html;
      return tmp.textContent || tmp.innerText || "";
    }


// 최신순 오래된순 이름순 좋아요순 스크랩순 조회순
    return (
        <>
        <A.Container>
            <A.Header>
                <img src={mark1} alt="mark1"/>
                <div>
                <h2>인기 기록</h2>
                <p>7일 동안의 인기 있었던 기록들이에요.</p>
                </div>
            </A.Header>
            <A.HeaderBar />

            <SectionWrapper>
              <A.Section>
                {['latest', 'oldest', 'name', 'likes', 'scrap', 'views'].map((section, index) => (
                  <React.Fragment key={section}>
                    <A.SectionTxt     
                        $active={activeSection === section}
                        onClick={() => handleClick(section)}>
                        {section === 'latest' ? '최신순' :
                         section === 'oldest' ? '오래된순' :
                         section === 'name' ? '이름순' :
                         section === 'likes' ? '좋아요순' :
                         section === 'scrap' ? '스크랩순' : '조회순'}
                    </A.SectionTxt>
                    {index < 5 && <A.SectionBar src={sectionbar} alt="section bar"/>}
                  </React.Fragment>
                ))}
              </A.Section>

              <WriteSection>
                {/* 글쓰기 페이지로 이동 */}
                <SectionTxt to='/write'>
                    글쓰기
                    <img src={recordicon} alt="record"/>
                </SectionTxt>
              </WriteSection>
            </SectionWrapper>

            {isLoading && <LoadingMessage>게시글을 불러오는 중입니다...</LoadingMessage>}
            {error && <ErrorMessage>{error}</ErrorMessage>}

            {!isLoading && !error && (
            <TravelersGrid>
              {topPosts.map((post) => (
                <ContentCard 
                  key={post.id} 
                  onClick={() => setSelectedCard(post.id)} 
                  className={selectedCard === post.id ? 'active' : ''}
                >
                 
                    <CardImg src={post.repImage} alt={post.title}/>
                    <Overlay>
                    <LikesScraps>
                      <div className="left-icons">
                        <span>
                          <img src={likeicon} alt="like" />
                          {post.likeCount}
                        </span>
                        <span>
                          <img src={scrapicon} alt="scrap" />
                          {post.scrapCount}
                        </span>
                      </div>
                      <span >
                        <img src={linkicon} alt="link" />
                      </span>
                    </LikesScraps>
                    </Overlay>
                  
                  <div className="content">
                    <h3>{post.title}</h3>
                    <p>{stripHtml(post.content).length > 100 ? stripHtml(post.content).slice(0, 100) + '...' : stripHtml(post.content)}</p>
                    <div className="info">
                    <span>{post.user.nickname} | {new Date(post.createDate).toLocaleDateString()}</span>
                      <span> 조회수 {post.viewCount}</span>
                    </div>
                  </div>
                </ContentCard>
              ))}
              
            </TravelersGrid>
            )}

        </A.Container>

        <A.GoTop>
            <img src={movetop} onClick={MoveToTop} />
        </A.GoTop>
    </>
    )
}


const LoadingMessage = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 18px;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 18px;
  color: red;
`;

const SectionTxt = styled(Link)`
    
    font-family: 'Inter';
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 130%;
 
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: -0.003em;
    text-transform: lowercase;
    text-decoration: none;

 
    color: ${({$active}) => ($active ? '#005CF9': '#B4B7B9')};
    cursor: pointer;

    &:hover {
        color: #005CF9;

    }

    .separator {
      cursor: default;
      padding: 0 10px;
    }
`;

const SectionWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    margin-bottom: 50px;
    margin-top: 80px;
`;

const WriteSection = styled.div`
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



const TravelersGrid = styled.div`

    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(6, auto);
    gap: 20px;
    padding: 20px;
    max-width: 1300px;
    margin: 0 auto;

  @media (max-width: 1200px) {
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(8, auto);
  }

  @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(12, auto);
  }

  @media (max-width: 480px) {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(24, auto);
  }


`;


const ContentCard = styled.div`
  width: 100%;
  height: 320px;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  cursor: pointer;
  overflow: hidden;
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

      .content {
        padding: 15px;
               

        h3 {
            margin: 0 0 10px;
            font-size: 18px;
        }

        p {
            margin: 0 0 10px;
            color: #555;
            font-size: 14px;
        }

        .info {
            display: flex;
            justify-content: space-between;
            color: #888;
            font-size: 12px;
        }
    }


`;

const CardImg = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: filter 0.3s ease;
  border-radius: 10px 10px 0 0;


`;


const Overlay = styled.div`
  position: absolute;
  bottom: 130px;
  left: 0;
  width: 100%;
  display: flex;
  align-items: end;
  color: white;
  font-size: 15px;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 10px 10px 0 0;
  
`;

const LikesScraps = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 10px;
  opacity: 2;
  margin-left: 8px;
  margin-right: 8px;

  .left-icons {
    display: flex;
    gap: 10px;
  }
  
  span {
    display: flex;
    align-items: center;

    img {
      width: 20px;
      height: 20px;
      margin-right: 5px;
      color: white;
      filter: brightness(100%) !important;
    }

   
  }
`;
