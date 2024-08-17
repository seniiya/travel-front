import React, { useState } from "react";
import styled from "styled-components";
//import { saveAs } from "file-saver"; // For saving the PDF

import unclickedHeart from "../pic/postpage/unclicked_heart.png"; // Update with correct path
import clickedHeart from "../pic/postpage/unclicked_heart.png"; // Update with correct path
import downloadIcon from "../pic/postpage/download.png"; // Update with correct path
import commentIcon from "../pic/postpage/comment.png"; // Update with correct path
import pictureIcon from "../pic/postpage/picture.png"; // Update with correct path
import saveHistIcon from "../pic/postpage/save_hist.png"; // Update with correct path
import topIcon from "../pic/postpage/top.png"; // Update with correct path

const SidebarContainer = styled.div`
  position: fixed;
  right: 20px;
  top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IconButton = styled.img`
  margin-bottom: 20px;
  width: 50px;
  height: 50px;
  cursor: pointer;
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
`;

const Sidebar = () => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleDownloadPDF = () => {
    // Implement the logic to download the page as a PDF
    // Placeholder for actual implementation
    alert("Downloading the page as a PDF...");
    // Use a library like jsPDF or html2canvas for the actual implementation
  };

  const handleScrollToComments = () => {
    document.getElementById("comment-section").scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
        alt="Picture" // No function specified for now
      />
      <IconButton
        src={saveHistIcon}
        alt="Save to Wish List"
        onClick={() => alert("Added to Wish List!")} // Placeholder for the actual function
      />
      <IconButton
        src={topIcon}
        alt="Go to Top"
        onClick={handleScrollToTop}
      />
    </SidebarContainer>
  );
};

export default Sidebar;