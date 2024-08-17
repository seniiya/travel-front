import React from "react";
import styled from "styled-components";

// Styled components for text and image blocks
const ContentBlock = styled.div`
  margin-bottom: 40px; /* Increased margin to create space between sections */
`;

const TextBlock = styled.p`
  font-family: 'Apple Sandol Gothic', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #333; /* Add color to match the design */
  text-align: center; /* Center text to match the example image */
  margin: 20px 0; /* Add margin for spacing */
`;

const ImageBlock = styled.img`
  width: 100%;
  height: auto;
  margin: 20px 0;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  object-fit: cover; /* Ensures images fit within the set dimensions */
`;

const MapBlock = styled.div`
  margin: 20px 0;
  text-align: center;
`;

const PostContent = ({ content }) => {
  return (
    <div>
      {content.map((block, index) => {
        if (block.type === 'text') {
          return (
            <ContentBlock key={index}>
              <TextBlock>{block.text}</TextBlock>
            </ContentBlock>
          );
        } else if (block.type === 'image') {
          return (
            <ContentBlock key={index}>
              <ImageBlock src={block.src} alt={block.alt} />
            </ContentBlock>
          );
        } else if (block.type === 'map') {
          return (
            <ContentBlock key={index}>
              <MapBlock>{block.map}</MapBlock>
            </ContentBlock>
          );
        }
        return null;
      })}
    </div>
  );
};

export default PostContent;