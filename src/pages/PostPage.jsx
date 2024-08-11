import React from "react";
import styled from "styled-components";
import PostContent from "../components/post/PostContent";
import CommentSection from "../components/post/CommentSection";
import Sidebar from "../components/post/Sidebar";
import backgroundImage from "../components/pic/postpage/postbg.png"; // Correct file path

import sample2Image from "../components/pic/samples/sample2.jpeg";
import sample3Image from "../components/pic/samples/sample3.jpeg";
import profileImage from '../components/pic/image 53.png';

// Global Style for the font
const GlobalStyle = styled.div`
  font-family: 'Apple Sandol Gothic', sans-serif; /* Fallback to sans-serif if the font is unavailable */
`;

// Background Container for the whole page content
const BackgroundContainer = styled.div`
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  min-height: 100vh;
`;

// Content Wrapper with padding and centered layout
const ContentWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0px 100px; /* Increased padding for more space */
  background-color: rgba(255, 255, 255, 0.9); /* Slight transparency */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-top: 100px; /* Add margin to prevent overlap with navbar */
  margin-bottom: 100px; /* Add enough bottom margin to accommodate the footer */
`;

const SidebarContainer = styled.div`
  position: fixed;
  right: 20px;
  top: 150px; /* Adjusted to align with the content */
`;

// Header Section Styling
const HeaderWrapper = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const Subtitle = styled.h2`
  font-family: 'AppleSDGothicNeoB', sans-serif; /* Use Bold for subtitle */
  font-size: 20px;
  margin-bottom: 8px;
  color: #999; /* Light gray color for subtitle */
`;

const Title = styled.h1`
  font-family: 'AppleSDGothicNeoEB', sans-serif; /* Use Extra Bold for title */
  font-size: 28px;
  margin-bottom: 16px;
`;

const MetaInfo = styled.div`
  font-family: 'AppleSDGothicNeoM', sans-serif; /* Use Medium for meta info */
  font-size: 14px;
  color: #888;
  margin-bottom: 10px; /* Adjusted margin to space from the title */
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AuthorDateWrapper = styled.div`
  border-bottom: 1px solid #e0e0e0; /* Line under the name and date */
  padding-bottom: 10px;
  margin-bottom: 10px;
`;

const EditButton = styled.div`
  text-align: right;
  color: #888;
  cursor: pointer;
  display: ${({ isLoggedIn }) => (isLoggedIn ? 'block' : 'none')}; /* Show only if logged in */
`;

const post = {
  country: "대한민국",
  region: "제주도",
  title: "제주도 여행: 숨겨진 보석 같은 휴양지 ✨",
  author: "김태연",
  // authorImage: "https://example.com/author-image.jpg", // Replace with the actual author image path
  authorImage: profileImage,
  date: "2024-08-24 12:50",
  likes: 32000,
  downloads: 1312,
  views: 762000,
  content: [
    { type: 'text', text: '안녕 여러분! 오늘은 내가 다녀온 제주도 여행 이야기를 들려줄게.' },
    { type: 'image', src: sample2Image, alt: '제주도 풍경' },
    { type: 'text', text: '제주도는 언제나 그렇듯이 아름다운 풍경, 맛있는 음식, 그리고 따뜻한 사람들로 가득한 곳이야.' },
    { type: 'map', map: <iframe src="https://maps.google.com/..."></iframe> }, // Replace with actual map iframe or element
    { type: 'image', src: sample3Image, alt: '맛있는 음식' },
    { type: 'text', text: '이번 여행에서 놓치면 안 되는 필수 코스와 꿀팁들을 공유할게. 준비됐지? 그럼 고고! 🚀' }
  ],
  comments: [
    { author: "김철수", text: "정말 멋지네요!" },
    { author: "이영희", text: "사진이 정말 아름다워요." },
  ],
  location: "제주도",
};

const isLoggedIn = true; // Change this based on actual authentication state

const PostPage = () => {
  return (
    <GlobalStyle>
      <BackgroundContainer>
        <ContentWrapper>
          {/* Header Section */}
          <HeaderWrapper>
            <Subtitle>{`${post.country} - ${post.region}`}</Subtitle>
            <Title>{post.title}</Title>
            <AuthorDateWrapper>
              <MetaInfo>
                <div className="author-date">
                  <img src={post.authorImage} alt="Author" /> {/* Replace with actual image */}
                  <span>{`${post.author} | ${post.date}`}</span>
                </div>
                <div className="stats">
                  <span>{`❤️ ${post.likes.toLocaleString()}`}</span>
                  <span>{`👍 ${post.downloads.toLocaleString()}`}</span>
                  <span>{`👁️ ${post.views.toLocaleString()}`}</span>
                </div>
              </MetaInfo>
            </AuthorDateWrapper>
            <EditButton isLoggedIn={isLoggedIn}>
              수정하기 ✏️
            </EditButton>
          </HeaderWrapper>

          {/* Post Content */}
          <PostContent content={post.content} />

          {/* Comments Section */}
          <CommentSection comments={post.comments} />
        </ContentWrapper>

        {/* Sidebar */}
        <SidebarContainer>
          <Sidebar />
        </SidebarContainer>
      </BackgroundContainer>
    </GlobalStyle>
  );
};

export default PostPage;