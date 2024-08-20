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
} from './Post/SharedStyles'; // Adjust the import path

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


const Subtitle = styled.h2`
  font-family: 'AppleSDGothicNeoB', sans-serif; 
  font-size: 20px;
  margin-bottom: 8px;
  color: #999;
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


const randomImage = images[Math.floor(Math.random() * images.length)];

const post = {
  country: "대한민국",
  region: "제주도",
  title: "제주도 여행 : 숨겨진 보석 같은 휴양지",
  author: "김태엽",
  authorImage: randomImage,
  date: "2024-08-24 12:50",
  likes: 32000,
  downloads: 1312,
  views: 762000,
  content: [
    { type: 'text', text: '본문입니다', align: 'left' },
    { type: 'image', src: randomImage, alt: '제주' },
    { type: 'text', text: '본문입니다', align: 'center' },
    { type: 'map', map: <iframe src="https://maps.google.com/..."></iframe> },
    { type: 'image', src: randomImage, alt: '음식' },
    { type: 'text', text: '본문입니다', align: 'right' }
  ],
  comments: [
    {
      author: "윤다희",
      text: "댓글 입니다",
      time: "2024-08-24 12:50",
      isMyComment: false,
      replies: [
        {
          author: "김태연",
          text: "댓글 입니다",
          time: "2024-08-24 12:50",
          isMyComment: true,
        },
      ],
    },
    {
      author: "윤커카",
      text: "댓글 입니다",
      time: "2024-08-24 12:50",
      isMyComment: false,
      replies: [
        {
          author: "김태연",
          text: "댓글 입니다",
          time: "2024-08-24 12:50",
          isMyComment: true,
        },
      ],
    },
    {
      author: "윤커카",
      text: "댓글 입니다",
      time: "2024-08-24 12:50",
      isMyComment: false,
      replies: [
        {
          author: "김태연",
          text: "댓글 입니다",
          time: "2024-08-24 12:50",
          isMyComment: true,
        },
      ],
    },
  ],
  location: "제주도",
};


const isLoggedIn = true;
const isWrittenIn = true;

const PostPage = () => {
  const commentSectionRef = useRef(null); // 코멘트 섹션으로 감

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
          <div ref={commentSectionRef}>  {/* 댓글 */}
            <CommentSection comments={post.comments} />
          </div>
        </MainContent>

        <SidebarWrapper>
          <Sidebar scrollToComments={scrollToComments} /> {/* 버튼 누르면 코멘트로 감 */}
        </SidebarWrapper>
    </ContentWrapper>
    </GlobalStyle >
  );
};

export default PostPage;