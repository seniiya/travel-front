
import React from 'react';
import styled from 'styled-components';

// Import images (ensure these paths are correct in your environment)
import unclickedHeart from '../../components/pic/postpage/unclicked_heart.png'; 
import clickedHeart from '../../components/pic/postpage/clicked_heart.png'; 
import downloadIcon from '../../components/pic/postpage/download.png'; 
import commentIcon from '../../components/pic/postpage/comment.png';
import pictureIcon from '../../components/pic/postpage/picture.png';
import saveHistIcon from '../../components/pic/postpage/save_hist.png';
import topIcon from '../../components/pic/postpage/top.png'; 

// Define the Sidebar component
const SidebarContainer = styled.div`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1000;
  padding: 10px;
  border-radius: 8px;
`;

const IconButton = styled.img`
  margin-bottom: 15px;
  width: 50px;
  height: 50px;
  cursor: pointer;
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

const Sidebar = () => {
  const [liked, setLiked] = React.useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleDownloadPDF = () => {
    alert('Downloading the page as a PDF...');
  };

  const handleScrollToComments = () => {
    const commentSection = document.getElementById('comment-section');
    if (commentSection) {
      commentSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <SidebarContainer>
      <IconButton
        src={liked ? clickedHeart : unclickedHeart}
        alt="Like"
        onClick={handleLike}
      />
      <IconButton
        src={downloadIcon}
        alt="Download as PDF"
        onClick={handleDownloadPDF}
      />
      <IconButton
        src={commentIcon}
        alt="Go to Comments"
        onClick={handleScrollToComments}
      />
      <IconButton
        src={pictureIcon}
        alt="Picture"
      />
      <IconButton
        src={saveHistIcon}
        alt="Save to Wish List"
        onClick={() => alert('Added to Wish List!')}
      />
      <IconButton
        src={topIcon}
        alt="Go to Top"
        onClick={handleScrollToTop}
      />
    </SidebarContainer>
  );
};

const Sample = () => {
  return (
    <div>
      <h1>Sample Sidebar Test</h1>
      <p>This is a sample page to test the Sidebar component with images.</p>
      <Sidebar />
    </div>
  );
};

export default Sample;