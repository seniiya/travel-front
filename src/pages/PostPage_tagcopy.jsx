import React, { useRef } from "react";
import styled from "styled-components";
import PostContent from "./Post/PostContent";
import CommentSection from "./Post/CommentSection";
import Sidebar from "./Post/Sidebar";
import backgroundImage from "./Post/postpage/postbg.png";

import {
  ContentWrapper,
  HeaderWrapper,
  Title,
  EditButton,
} from './Post/SharedStyles'; 

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


const Subtitle = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px; /* Space between the tags */
  margin-bottom: 16px;

  span {
    display: inline-block;
    padding: 6px 12px;
    font-family: 'AppleSDGothicNeoM', sans-serif;
    font-size: 14px;
    color: #007BFF; 
    border: 1px solid #007BFF; 
    border-radius: 12px; 
    background-color: #FFFFFF;
  }
`;


const MetaInfo = styled.div`
  font-family: 'AppleSDGothicNeoM', sans-serif;
  font-size: 14px;
  color: #888;
  margin-bottom: 10px; 
  display: flex;
  justify-content: space-between; 
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
      gap: 0px;
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


const randomImage = images[Math.floor(Math.random() * images.length)];

const post = {
  id: 1,
  title: "제주도 여행 리뷰",
  content: `
    <p>제주도는 정말 아름다운 곳입니다. 이곳에서 즐길 수 있는 여러 명소들이 있는데, 그중에서도 한라산 등반이 가장 인상 깊었습니다.</p>
    <p>맛있는 해산물 요리도 많이 즐겼습니다!</p>
  `,
  likeCount: 150,
  scrapCount: 45,
  viewCount: 102,
  createDate: "2024-08-24 12:50",
  author: "여행자",
  authorImage: sampleDefault, // Use a default image or appropriate author image
  date: "2024-08-24",
  tag1: "여행",
  tag2: "제주도",
  tag3: "맛집",
  user: {
    id: 101,
    userid: "travel_enthusiast",
    nickname: "여행자",
    email: "travel@example.com",
  },
};



const isLoggedIn = true;
const isWrittenIn = true;

const PostPage = () => {
  const commentSectionRef = useRef(null); // 댓글칸으로

  const scrollToComments = () => {
    if (commentSectionRef.current) {
      commentSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const formatNumber = (num) => {
    return num && typeof num === 'number' ? num.toLocaleString() : '0';
  };

  return (
    <GlobalStyle>
      <ContentWrapper>
        <MainContent id="main-content">
          <HeaderWrapper>
            <Subtitle>
              <span>{post.tag1}</span>
              <span>{post.tag2}</span>
              <span>{post.tag3}</span>
            </Subtitle>
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
                    <span>{formatNumber(post.likes)}</span>
                  </div>
                  <div className="stat-item">
                    <img src={downloadImage} alt="Downloads" />
                    <span>{formatNumber(post.downloads)}</span>
                  </div>
                  <div className="stat-item">
                    <img src={viewImage} alt="Views" />
                    <span>{formatNumber(post.views)}</span>
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
          <div ref={commentSectionRef}>
            <CommentSection comments={post.comments} />
          </div>
        </MainContent>

        <SidebarWrapper>
          <Sidebar scrollToComments={scrollToComments} />
        </SidebarWrapper>
      </ContentWrapper>
    </GlobalStyle>
  );
};

export default PostPage;