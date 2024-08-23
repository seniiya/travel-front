import React from "react";
import styled from "styled-components";

const ContentBlock = styled.div`
  margin-bottom: 40px; 
`;

const TextBlock = styled.p`
  font-family: 'Apple Sandol Gothic', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #333;
  text-align: ${({ align }) => align || 'center'}; /* Use the align prop or fallback to 'center' */
  margin: 20px 0; 
padding: 0 80px; /* Add padding for left and right */
`;

const ImageBlock = styled.img`
  display: block;  
  margin: 20px auto; 
  width: 70%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  object-fit: cover; 
`;

const MapBlock = styled.div`
  margin: 20px 0;
  text-align: center;
`;

const PostContent = ({ content }) => {
  return (
    <div>
      {content.map((block, index) => {
        switch (block.type) {
          case 'text':
            return (
              <ContentBlock key={index}>
                <TextBlock align={block.align}>{block.text}</TextBlock>
              </ContentBlock>
            );
          case 'image':
            return (
              <ContentBlock key={index}>
                <ImageBlock src={block.src} alt={block.alt} />
              </ContentBlock>
            );
          case 'map':
            return (
              <ContentBlock key={index}>
                <MapBlock>{block.map}</MapBlock>
              </ContentBlock>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};


export default PostContent;