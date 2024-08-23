import React, { useEffect, useState, useRef } from "react";
import axios from 'axios'; 
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


const isLoggedIn = true;
const isWrittenIn = true;
const PostPage_title = () => {
  const [post, setPost] = useState(null);
  const commentSectionRef = useRef(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get('http://3.37.134.143:8080/api/v1/travelPost/1');  // Adjusted the URL
        if (response.data.isSuccess) {
          setPost(response.data.result);
        } else {
          console.error('Failed to fetch post:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, []);

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
            <Title>{post.title}</Title>
            <Subtitle>{`${post.continent} - ${post.country}`}</Subtitle>
            <div style={{ textAlign: 'center' }}>
              <img src={post.repImage} alt="Representative" style={{ width: '100%', height: 'auto' }} />
            </div>
            <AuthorDateWrapper>
              <MetaInfo>
                <div className="author-date">
                  <span>{`${post.user.nickname} | ${new Date(post.createDate).toLocaleDateString()}`}</span>
                </div>
                <div className="stats">
                  <div className="stat-item">
                    <img src={heartImage} alt="Likes" />
                    <span>{`${post.likeCount.toLocaleString()}`}</span>
                  </div>
                  <div className="stat-item">
                    <img src={downloadImage} alt="Scraps" />
                    <span>{`${post.scrapCount.toLocaleString()}`}</span>
                  </div>
                  <div className="stat-item">
                    <img src={viewImage} alt="Views" />
                    <span>{`${post.viewCount.toLocaleString()}`}</span>
                  </div>
                </div>
              </MetaInfo>
            </AuthorDateWrapper>
          </HeaderWrapper>

          <PostContent content={post.content} />
          <div ref={commentSectionRef}>
            <CommentSection postId={post.id} />
          </div>
        </MainContent>

        <SidebarWrapper>
          <Sidebar scrollToComments={scrollToComments} postId={post.id} />
        </SidebarWrapper>
      </ContentWrapper>
    </GlobalStyle>
  );
};

export default PostPage_title;