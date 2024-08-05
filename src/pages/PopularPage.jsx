import React, { useState } from "react";
import styled from "styled-components";
import sectionbar from '../components/pic/sectionbar.svg';
import * as A from "../pages/TravelPage.style";

import mark1 from '../components/pic/mark1.png';
import headerbar from '../components/pic/headerbar.svg';
import recordicon from '../components/pic/recordicon.svg';
import sampleDefault from '../components/pic/samples/sample.jpeg';
import movetop from '../components/pic/movetop.svg';

export default function PopularPage() {
    const [activeSection, setActiveSection] = useState(null);
    const [selectedCard, setSelectedCard] = useState(null);

    const handleClick = (section) => {
        setActiveSection(section);
    };

    const MoveToTop = () => {
      // top: 0 (맨위로)
      window.scrollTo({ top: 0, behavior: 'smooth'})
    }

    // content 데이터 정의 
    const contentCards = Array.from({ length: 24 }, (_, index) => ({
      id: index,
      title: "제목입니다",
      content: "내용입니다 내용입니다 내용입니다 내용입니다",
      author: "김태엽",
      date: "2024-08-24",
      views: "999+",
      image: sampleDefault
    }));


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
            <A.HeaderBar src={headerbar} alt="header bar"/>

            <SectionWrapper>
              <A.Section>
                <A.SectionTxt     
                    $active={activeSection === 'recent'}
                    onClick={() => handleClick('recent')}>
                    최신순
                </A.SectionTxt>
                <A.SectionBar src={sectionbar} alt="section bar"/>
                <A.SectionTxt 
                    $active={activeSection === 'old'}
                    onClick={() => handleClick('old')}>
                    오래된순
                </A.SectionTxt>
                <A.SectionBar src={sectionbar} alt="section bar"/>
                <A.SectionTxt 
                    $active={activeSection === 'name'}
                    onClick={() => handleClick('name')}>
                    이름순
                </A.SectionTxt>
                <A.SectionBar src={sectionbar} alt="section bar"/>
                <A.SectionTxt 
                    $active={activeSection === 'like'}
                    onClick={() => handleClick('like')}>
                    좋아요순
                </A.SectionTxt>
                <A.SectionBar src={sectionbar} alt="section bar"/>
                <A.SectionTxt 
                    $active={activeSection === 'scrap'}
                    onClick={() => handleClick('scrap')}>
                    스크랩순
                </A.SectionTxt>
                <A.SectionBar src={sectionbar} alt="section bar"/>
                <A.SectionTxt 
                    $active={activeSection === 'view'}
                    onClick={() => handleClick('view')}>
                    조회순
                </A.SectionTxt>
              </A.Section>

              <WriteSection>
                <A.SectionTxt to='/write'>
                {/* 글쓰기 페이지로 이동 */}
                    글쓰기
                    <img src={recordicon} alt="record"/>
                </A.SectionTxt>
              </WriteSection>
            </SectionWrapper>


            <TravelersGrid>
              {contentCards.map((card, index) => (
                <ContentCard 
                  key={card.id} 
                  onClick={() => setSelectedCard(index)} 
                  className={selectedCard === index ? 'active' : ''}
                >
                  <div className="img-wrapper">
                    <img src={card.image} alt={card.title}/>
                  </div> 
                  <div className="content">
                    <h3>{card.title}</h3>
                    <p>{card.content}</p>
                    <div className="info">
                      <span>{card.author} | {card.date}</span>
                      <span> 조회수 {card.views}</span>
                    </div>
                  </div>
                </ContentCard>
              ))}
            </TravelersGrid>


        </A.Container>

        <GoTop>
        <img src={movetop} onClick={MoveToTop} />
        </GoTop>
    </>
    )
}

const SectionWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    margin-bottom: 20px;
`;

const WriteSection = styled.div`
    display: flex;
    align-items: center;
    padding: 0px;
    gap: 10px;
    margin-top: 250px;
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

    // @media (max-width: 1024px) {
    //     grid-template-columns: repeat(2, 1fr);
    //     grid-template-rows: repeat(12, auto);
    // }

    // @media (max-width: 768px) {
    //     grid-template-columns: repeat(2, 1fr);
    //     grid-template-rows: repeat(12, auto);
    // }

    // @media (max-width: 480px) {
    //     grid-template-columns: 1fr;
    //     grid-template-rows: repeat(24, auto);
    // }
`;

const ContentCard = styled.div`
    position: relative;
    width: 97%;
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;

    &:hover {
        transform: translateY(-10px);
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
    }

    .image-wrapper {
        width: 100%;
        height: 200px;
        overflow: hidden;
    }

    .image-wrapper img {
        width: 100%;
        height: 100%;
        object-fit: cover;
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

const GoTop = styled.div`
    /* Frame 9970 */

    position: absolute;
    width: 50px;
    height: 50px;
    left: 1695px;
    top: 897px;
    .img {
        box-shadow: inset -2px -3px 14px #FFFFFF;
        filter: drop-shadow(1px 2px 7px rgba(0, 0, 0, 0.1));
        backdrop-filter: blur(4px);
        /* Note: backdrop-filter has minimal browser support */
    }

`;

