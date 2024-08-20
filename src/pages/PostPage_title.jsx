import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import PostContent from "./Post/PostContent";
import CommentSection from "./Post/CommentSection";
import Sidebar from "./Post/Sidebar";
import backgroundImage from "./Post/postpage/postbg.png";
import useMoveScroll from './Post/useMoveScroll';

// Import images
import sampleDefault from '../components/pic/samples/sample.jpeg';
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

import heartImage from './Post/postpage/title/heart.png';
import downloadImage from './Post/postpage/title/download.png';
import rewriteImage from './Post/postpage/title/rewrite.png';
import viewImage from './Post/postpage/title/viewers.png';

const images = [
  sampleDefault, sampleDefault2, sampleDefault3, sampleDefault4,
  sampleDefault5, sampleDefault6, sampleDefault7, sampleDefault8,
  sampleDefault9, sampleDefault10, sampleDefault11, sampleDefault12,
  sampleDefault13, sampleDefault14, sampleDefault15, sampleDefault16
];

const GlobalStyle = styled.div`
  font-family: 'Apple Sandol Gothic', sans-serif;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center; 
  max-width: 1000px;
  margin: 0 auto;
  border-radius: 8px;
  margin-top: 100px;
  margin-bottom: 1000px;
  min-height: 1000px; 
`;

const MainContent = styled.div`
  min-width: 830px;
  max-width: 830px;
  min-height: 1000px; 
  background-color: rgba(255, 255, 255, 0.9);
  background-image: url(${backgroundImage});
  background-size: contain; 
  background-repeat: no-repeat;
  
`;

const SidebarWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const HeaderWrapper = styled.div`
  margin-top: 100px;
  text-align: center; 
  margin-bottom: 20px;
padding: 0 80px;
`;

const Subtitle = styled.h2`
  font-family: 'AppleSDGothicNeoB', sans-serif; 
  font-size: 20px;
  margin-bottom: 8px;
  color: #999;
  text-align: center;
`;

const Title = styled.h1`
  font-family: 'AppleSDGothicNeoEB', sans-serif; 
  font-size: 28px;
  margin-bottom: 16px;
  text-align: center;
`;

const MetaInfo = styled.div`
  font-family: 'AppleSDGothicNeoM', sans-serif;
  font-size: 14px;
  color: #888;
  margin-bottom: 10px; 
  display: flex;
  justify-content: space-between; /* Space between the author and stats */
  align-items: center;

  .author-date {
    display: flex;
    align-items: center;
  }

  img {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 8px;
  }

  .stats {
    display: flex;
    gap: 10px;

    .stat-item {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .stat-item img {
      width: 16px;
      height: 16px;
    }
  }
`;


const AuthorDateWrapper = styled.div`
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;

const EditButton = styled.div`
  text-align: right;
  color: #888;
  cursor: pointer;
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};  

  img {
    margin-left: 8px;
    width: 16px;
    height: 16px;
  }
`;

// Randomly select an image
const randomImage = images[Math.floor(Math.random() * images.length)];

const post = {
  country: "대한민국",
  region: "제주도",
  title: "제주도 여행: 숨겨진 보석 같은 휴양지 ✨",
  author: "김태연",
  authorImage: randomImage,
  date: "2024-08-24 12:50",
  likes: 32000,
  downloads: 1312,
  views: 762000,
  content: [
    { type: 'text', text: '안녕 여러분! 오늘은 내가 다녀온 제주도 여행 이야기를 들려줄게.', align: 'left' },
    { type: 'image', src: randomImage, alt: '제주도 풍경' },
    { type: 'text', text: '제주도는 언제나 그렇듯이 아름다운 풍경, 맛있는 음식, 그리고 따뜻한 사람들로 가득한 곳이야.', align: 'center' },
    { type: 'map', map: <iframe src="https://maps.app.goo.gl/nD7HT11iH5U9zFuY8"></iframe> },
    { type: 'image', src: randomImage, alt: '맛있는 음식' },
    { type: 'text', text: '이번 여행에서 놓치면 안 되는 필수 코스와 꿀팁들을 공유할게. 준비됐지? 그럼 고고! 🚀', align: 'right' }
  ],
  comments: [
    { author: "김철수", text: "정말 멋지네요!" },
    { author: "이영희", text: "사진이 정말 아름다워요." },
  ],
  location: "제주도",
};


const isLoggedIn = true;
const isWrittenIn = true;

const PostPage = () => {
  const commentSectionRef = useRef(null); // Reference for the comment section

  const scrollToComments = () => {
    if (commentSectionRef.current) {
      commentSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <GlobalStyle>
      <ContentWrapper>
        <MainContent id="main-content">
          <HeaderWrapper>
            <Subtitle>{`${post.country} - ${post.region}`}</Subtitle>
            <Title>{post.title}</Title>
            <AuthorDateWrapper>
              <MetaInfo>
                <div className="author-date">
                  <img src={post.authorImage} alt="Author" />
                  <span>{`${post.author} | ${post.date}`}</span>
                </div>
                <div className="stats">
                  <div className="stat-item">
                    <img src={heartImage} alt="Likes" />
                    <span>{`${post.likes.toLocaleString()}`}</span>
                  </div>
                  <div className="stat-item">
                    <img src={downloadImage} alt="Downloads" />
                    <span>{`${post.downloads.toLocaleString()}`}</span>
                  </div>
                  <div className="stat-item">
                    <img src={viewImage} alt="Views" />
                    <span>{`${post.views.toLocaleString()}`}</span>
                  </div>
                </div>
              </MetaInfo>
            </AuthorDateWrapper>
            <EditButton isVisible={isLoggedIn && isWrittenIn}>
              수정하기
              <img src={rewriteImage} alt="Edit" />
            </EditButton>
          </HeaderWrapper>

          <PostContent content={post.content} />
          <div ref={commentSectionRef}>  {/* Attach the ref */}
            <CommentSection comments={post.comments} />
          </div>
        </MainContent>

        <SidebarWrapper>
          <Sidebar scrollToComments={scrollToComments} /> {/* Pass the scroll function */}
        </SidebarWrapper>
      </ContentWrapper>
    </GlobalStyle>
  );
};

export default PostPage;