import React from "react";
import styled from "styled-components";

const ContentBlock = styled.div`
  margin-bottom: 40px; 
`;

const HtmlBlock = styled.div`
  font-family: 'Apple Sandol Gothic', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #333;
  padding: 0 80px;
  margin: 20px 0;

  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    object-fit: cover; 
    display: block;
    margin: 20px auto;
  }
`;

// Function to replace img src paths
const modifyImgSrc = (html, baseUrl) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  doc.querySelectorAll('img').forEach(img => {
    const src = img.getAttribute('src');
    if (src && !src.startsWith('http')) {
      img.src = `${baseUrl}${src}`;
    }
  });
  return doc.body.innerHTML;
};

const PostContent = ({ content }) => {
  const baseUrl = 'http://3.37.134.143:8080';  // Your server's base URL

  const updatedContent = modifyImgSrc(content, baseUrl);

  return (
    <ContentBlock>
      <HtmlBlock dangerouslySetInnerHTML={{ __html: updatedContent }} />
    </ContentBlock>
  );
};

export default PostContent;
