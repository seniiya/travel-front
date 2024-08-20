import React, { useState } from "react";
import styled from "styled-components";
import { jsPDF } from "jspdf";
import unclickedHeart from "../../components/pic/postpage/unclicked_heart.png";
import clickedHeart from "../../components/pic/postpage/clicked_heart.png";
import downloadIcon from "../../components/pic/postpage/download.png";
import commentIcon from "../../components/pic/postpage/comment.png";
import pictureIcon from "../../components/pic/postpage/picture.png";
import saveHistIcon from "../../components/pic/postpage/save_hist.png";
import topIcon from "../../components/pic/postpage/top.png";

const SidebarContainer = styled.div`
  position: fixed;
  right: 50px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  background-color: white;
  border-radius: 8px;
`;

// Styling for the icon buttons
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

const Sidebar = ({ scrollToComments }) => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const content = document.getElementById("main-content");

    if (content) {
      doc.html(content, {
        callback: function (pdf) {
          pdf.save("Post.pdf");
        },
      });
    } else {
      alert("Content not found.");
    }
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
        onClick={scrollToComments} // Use the scrollToComments function passed as a prop
      />
      
      <IconButton
        src={pictureIcon}
        alt="Picture"
      />
      
      <IconButton
        src={saveHistIcon}
        alt="Save to Wish List"
        onClick={() => alert("마이페이지의 여행 지도에 저장되었습니다!")}
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
