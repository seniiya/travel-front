import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import PostContent from "./Post/PostContent"; // Assuming the component path is correct
import CommentSection from "./Post/CommentSection";
import Sidebar from "./Post/Sidebar";
import backgroundImage from "./Post/postpage/postbg.png";

import {
  ContentWrapper,
  HeaderWrapper,
  Title,
  EditButton,
} from './Post/SharedStyles';

import heartImage from './Post/postpage/title/heart.png';
import downloadImage from './Post/postpage/title/download.png';
import rewriteImage from './Post/postpage/title/rewrite.png';
import viewImage from './Post/postpage/title/viewers.png';

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
  gap: 8px; 
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

const PostPage_tag = () => {
  const { id } = useParams(); // Get post ID from URL
  const [post, setPost] = useState(null);
  const commentSectionRef = useRef(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://3.37.134.143:8080/api/v1/travelItemPost/${id}`);

        if (!response.ok) {
          const text = await response.text();
          throw new Error(`HTTP error! status: ${response.status}, message: ${text}`);
        }

        const data = await response.json();

        setPost(data.result); // Using the entire result object directly
      } catch (error) {
        console.error("Failed to fetch post:", error.message);
      }
    };

    fetchPost();
  }, [id]);

  const scrollToComments = () => {
    if (commentSectionRef.current) {
      commentSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <GlobalStyle>
      <ContentWrapper>
        <MainContent id="main-content">
          <HeaderWrapper>
            {post.categories && (
              <Subtitle>
                {post.categories.map((category, index) => (
                  <span key={index}>#{category}</span>
                ))}
              </Subtitle>
            )}
            <Title>{post.title}</Title>
            <AuthorDateWrapper>
              <MetaInfo>
                <div className="author-date">
                  <img src={post.authorImage} alt="Author" />
                  <span>{`${post.user.nickname} | ${new Date(post.createDate).toLocaleDateString()}`}</span>
                </div>
                <div className="stats">
                  <div className="stat-item">
                    <img src={heartImage} alt="Likes" />
                    <span>{`${post.likeCount.toLocaleString()}`}</span>
                  </div>
                  <div className="stat-item">
                    <img src={downloadImage} alt="Downloads" />
                    <span>{`${post.scrapCount.toLocaleString()}`}</span>
                  </div>
                  <div className="stat-item">
                    <img src={viewImage} alt="Views" />
                    <span>{`${post.viewCount.toLocaleString()}`}</span>
                  </div>
                </div>
              </MetaInfo>
            </AuthorDateWrapper>
            <EditButton isVisible={true}>
              수정하기
              <img src={rewriteImage} alt="Edit" />
            </EditButton>
          </HeaderWrapper>

          <PostContent content={post.content} />
          <div ref={commentSectionRef}>
            <CommentSection comments={post.comments} postId={id} />
          </div>
        </MainContent>

        <SidebarWrapper>
          <Sidebar scrollToComments={scrollToComments} postId={id} />
        </SidebarWrapper>
      </ContentWrapper>
    </GlobalStyle>
  );
};

export default PostPage_tag;