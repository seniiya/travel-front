// 사진이 없는 것 같고, music.jsx 넣으니까 자꾸 오류떠서 일단 빼두었습니다 ㅜㅜ !! 
import { useNavigate } from 'react-router-dom';
import Dropdown from '../components/Dropdown.jsx';
import styled from 'styled-components';

const MusicContent = styled.div`
  text-align: center;
`;

const MusicImage = styled.img`
  width: 200px;
  margin-bottom: 10px;
`;

const MusicTitle = styled.p`
  margin: 10px 0;
  color: #333;
`;

const MusicControls = styled.div`
  button {
    font-size: 20px;
    margin: 0 10px;
    background: none;
    border: none;
    cursor: pointer;
  }
`;

function Music() {
  const navigate = useNavigate();

  return (
    <Dropdown onClose={() => navigate('/')}>
      <MusicContent>
        <MusicImage src="/src/assets/paper 1.png" alt="Music" />
        <MusicTitle>노래 제목 예시 노래 제목 예시 노래 제목 예시 노래 제목 예시</MusicTitle>
        <MusicControls>
          <button>⏪</button>
          <button>⏯</button>
          <button>⏩</button>
        </MusicControls>
      </MusicContent>
    </Dropdown>
  );
}

export default Music;