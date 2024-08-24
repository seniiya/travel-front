import React, { useEffect, useState } from "react";
import axios from 'axios';
import styled from "styled-components";
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
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

const Sidebar = ({ scrollToComments, postId }) => { 
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 페이지 로드 시 좋아요 상태를 확인
    const fetchLikedStatus = async () => {
      try {
        const response = await axios.post(`http://3.37.134.143:8080/api/v1/travelItemPost/${postId}/liked`, {
          userid: 'miriya' // 실제 사용자 ID로 변경 필요
        });
        if (response.data.isSuccess) {
          setLiked(response.data.result.liked); // 초기 좋아요 상태 설정
        } else {
          console.error('Failed to fetch liked status:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching liked status:', error);
      }
    };

    fetchLikedStatus();
  }, [postId]);
  
  const handleLike = async () => {
    setLoading(true);
    try {
        const response = await axios.get(`http://3.37.134.143:8080/api/v1/travelItemPost/${postId}/like/toggle`, {
            params: { userid: 'miriya' } // 사용자 ID가 문자열로 정확하게 전달되어야 함
        });
        if (response.data.isSuccess) {
            setLiked(!liked);
            alert('좋아요 상태가 변경되었습니다!');
        } else {
            alert('좋아요 상태 변경에 실패하였습니다.');
        }
    } catch (error) {
        console.error('Error toggling like status:', error);
        alert(`Error: ${error.response?.data?.message || 'Network error occurred.'}`);
    } finally {
        setLoading(false);
    }
};


  const handleDownloadPDF = async () => {
    const element = document.getElementById('root'); 
    const canvas = await html2canvas(document.documentElement, {
      scrollX: 0,
      scrollY: 0,
      windowWidth: document.documentElement.scrollWidth,
      windowHeight: document.documentElement.scrollHeight,
    });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;
  
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
  
    pdf.save('page.pdf');
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
        onClick={scrollToComments}
      />
      <IconButton
        src={pictureIcon}
        alt="Picture"
      />
      <IconButton
        src={saveHistIcon}
        alt="Save to Wish List"
        onClick={() => alert("Saved to your travel map!")}
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