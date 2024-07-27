import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Dropdown from './Dropdown.jsx';

function TravelDestinations() {
  const navigate = useNavigate();

  return (
    <Dropdown onClose={() => navigate('/')}>
      <div>
        <h3>대한민국</h3>
        <p>서울 · 경기도</p>
        <p>강원도</p>
        <p>경상북도</p>
        <p>경상남도</p>
        <p>전라북도</p>
        <p>전라남도</p>
        <p>제주도</p>
        <p>충청북도</p>
        <p>충청남도</p>
      </div>
      <div>
        <h3>남아메리카</h3>
        <p>브라질</p>
        <p>볼리비아</p>
        <p>아르헨티나</p>
        <p>칠레</p>
        <p>페루</p>
        <p>기타</p>
      </div>
      <div>
        <h3>북아메리카</h3>
        <p>미국 · 동부</p>
        <p>미국 · 서부</p>
        <p>멕시코</p>
        <p>캐나다</p>
        <p>기타</p>
      </div>
      <div>
        <h3>아시아</h3>
        <p>베트남</p>
        <p>일본</p>
        <p>중국</p>
        <p>필리핀</p>
        <p>기타</p>
      </div>
      <div>
        <h3>아프리카</h3>
        <p>모로코</p>
        <p>이집트</p>
        <p>기타</p>
      </div>
      <div>
        <h3>유럽</h3>
        <p>동유럽</p>
        <p>북유럽</p>
        <p>서유럽</p>
        <p>기타</p>
      </div>
      <div>
        <h3>중동</h3>
        <p>사우디</p>
        <p>터키</p>
        <p>기타</p>
      </div>
      <div>
        <h3>호주</h3>
        <p>하와이</p>
        <p>호주</p>
        <p>기타</p>
      </div>
    </Dropdown>
  );
}

// TravelDestinations.propTypes = {
//   history: PropTypes.object.isRequired,
// };

export default TravelDestinations;