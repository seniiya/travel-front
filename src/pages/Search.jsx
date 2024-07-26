import { useNavigate } from 'react-router-dom';
import Dropdown from '../components/Dropdown';
import styled from 'styled-components';
import searchIcon from '../components/pic/큰돋보기.png'; // 아이콘 이미지를 임포트합니다.

const SearchContent = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const SearchInput = styled.input`
  width: 300px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SearchButton = styled.button`
  width: 140px;
  height: 140px;
  margin-left: 10px;
  background-color: white;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-image: url(${searchIcon});
  background-size: 140px 140px;
  background-repeat: no-repeat;
  background-position: center;
`;

const SearchTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 20px;
`;

const SearchTag = styled.a`
  margin: 5px 10px;
  padding: 5px 10px;
  background-color: #f0f4f8;
  color: #007bff;
  text-decoration: none;
  border-radius: 4px;
`;

function Search() {
  const navigate = useNavigate();

  return (
    <Dropdown onClose={() => navigate('/')}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <SearchContent>
          <SearchInput type="text" placeholder="어디로 떠나볼까요?" />
          <SearchButton />
        </SearchContent>
        <SearchTags>
          <SearchTag href="#">#인스타 그림 명소</SearchTag>
          <SearchTag href="#">#항공권</SearchTag>
          <SearchTag href="#">#배행기 가격</SearchTag>
          <SearchTag href="#">#대학생 방학</SearchTag>
          <SearchTag href="#">#예쁜 숙소</SearchTag>
        </SearchTags>
      </div>
    </Dropdown>
  );
}

export default Search;