import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const DropdownContainer = styled.div`
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 999;
`;

const DropdownContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  
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

const CategoryColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 10px;

  &:not(:last-child) {
    border-right: 1px solid #e0e0e0;
  }
`;

const CategoryTitle = styled.h3`
  margin: 0 0 10px;
  font-size: 1em;
  color: #333;
`;

const CategoryItem = styled.p`
  margin: 5px 0;
  color: #666;
  cursor: pointer;
  font-size: 0.9em;

  &:hover {
    color: #007bff;
  }
`;

const CloseButton = styled.div`
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 20px;
  opacity: 0.8;
`;

const categories = {
  '대한민국': ['서울·경기도', '강원도', '경상북도', '경상남도', '전라북도', '전라남도', '제주도', '충청북도', '충청남도'],
  '남아메리카': ['브라질', '볼리비아', '아르헨티나', '칠레', '페루', '기타'],
  '북아메리카': ['미국·동부', '미국·서부', '멕시코', '캐나다', '기타'],
  '아시아': ['베트남', '일본', '중국', '필리핀', '기타'],
  '아프리카': ['모로코', '이집트', '기타'],
  '유럽': ['동유럽', '북유럽', '서유럽', '기타'],
  '중동': ['사우디', '터키', '기타'],
  '호주': ['하와이', '호주', '기타']
};

function Dropdown({ onClose, setSelectedDest }) {
  const navigate = useNavigate();

  const handleItemClick = (category, item) => {
    const destination = item === '전체' ? `${category} - 전체` : `${category} - ${item}`;
    setSelectedDest(destination);
    navigate('/travel-destinations');
    onClose();
  };

  return (
    <DropdownContainer>
      <DropdownContent>
        {Object.entries(categories).map(([category, items]) => (
          <CategoryColumn key={category}>
            <CategoryTitle>{category}</CategoryTitle>
            {items.map(item => (
              <CategoryItem key={item} onClick={() => handleItemClick(category, item)}>
                {item}
              </CategoryItem>
            ))}
          </CategoryColumn>
        ))}
      </DropdownContent>
      <CloseButton onClick={onClose}>✕</CloseButton>
    </DropdownContainer>
  );
}

Dropdown.propTypes = {
  onClose: PropTypes.func.isRequired,
  setSelectedDest: PropTypes.func.isRequired,
};

export default Dropdown;
