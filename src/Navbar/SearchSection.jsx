import { useState } from 'react';
import styled from 'styled-components';
import magnifierIcon from '../components/pic/큰돋보기.png'; 
import PropTypes from 'prop-types'; 

const SearchContainer = styled.div`
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 15px;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 999;
`;

const SearchContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 10px 0; // 상하 패딩 추가
  
  @media (max-width: 1200px) {
    font-size: 14px;
  }

  @media (max-width: 992px) {
    font-size: 12px;
  }

  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 800px;
  margin-bottom: 10px; // 간격을 줄임
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #005cf9;
  border-radius: 25px;
  padding: 8px 15px;
  flex-grow: 1;
`;

const SearchInput = styled.input`
  flex-grow: 1;
  border: none;
  padding-left: 10px;
  background: transparent;
  color: white;
  font-size: 14px;
  &::placeholder {
    color: rgba(255, 255, 255, 0.8);
  }
  &:focus {
    outline: none;
  }
`;

const SearchIcon = styled.img`
  width: 150px;
  height: 150px;
  margin-left: 10px;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  max-width: 800px;
  width: 100%;
  margin-top: -50px; // 위쪽 간격을 줄임
`;

const Tag = styled.span`
  color: #005CF9;
  border: 1px solid rgba(0, 92, 249, 0.6);
  padding: 4px 8px;
  border-radius: 15px;
  margin-right: 8px;
  margin-bottom: 8px;
  font-size: 12px;
  background-color: white; // 태그 배경색 추가
`;   

const CloseButton = styled.div`
  font-size: 20px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 15px;
  opacity: 0.6;
`;

function SearchSection({ onClose }) {
  const [searchTerm, setSearchTerm] = useState('');
  const tags = ['인스타그램 명소', '항공권', '비행기 가격', '대학생 방학', '예쁜 숙소'];

  return (
    <SearchContainer>
      <SearchContent>
        <SearchBarWrapper>
          <SearchBar>
            <SearchInput 
              type="text" 
              placeholder="어디로 떠나볼까요?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBar>
          <SearchIcon src={magnifierIcon} alt="Search" />
        </SearchBarWrapper>
        <TagContainer>
          {tags.map((tag, index) => (
            <Tag key={index}>#{tag}</Tag>
          ))}
        </TagContainer>
      </SearchContent>
      <CloseButton onClick={onClose}>✕</CloseButton>
    </SearchContainer>
  );
}

SearchSection.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default SearchSection;