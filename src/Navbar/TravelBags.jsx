import { useNavigate } from 'react-router-dom';
import Dropdown from './Dropdown';

function TravelBags() {
  const navigate = useNavigate();

  return (
    <Dropdown onClose={() => navigate('/')}>
      <div>
        <h3>공항</h3>
        <p>티켓</p>
      </div>
      <div>
        <h3>의류 · 신발</h3>
        <p>여권 · 비자</p>
      </div>
      <div>
        <h3>패션 소품</h3>
        <p>의료 · 안전</p>
      </div>
      <div>
        <h3>가방 · 캐리어</h3>
        <p>웹 · 앱</p>
      </div>
      <div>
        <h3>라이프 · 뷰티</h3>
        <p>스포츠 · 레저</p>
      </div>
      <div>
        <h3>유아</h3>
        <p>기타</p>
      </div>
    </Dropdown>
  );
}

export default TravelBags;