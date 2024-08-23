import styled from 'styled-components';

export const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  max-width: 1000px;
  margin: 0 auto;
  border-radius: 8px;
  margin-top: 100px;
  margin-bottom: 1000px;
  min-height: 1000px;
  align-items: center;
`;

export const HeaderWrapper = styled.div`
  margin-top: 100px;
  text-align: center;
  margin-bottom: 20px;
  padding: 0 80px;
`;

export const Subtitle = styled.h2`
  font-family: 'AppleSDGothicNeoB', sans-serif;
  font-size: 20px;
  margin-bottom: 8px;
  color: #999;
  text-align: center;
`;

export const Title = styled.h1`
  font-family: 'AppleSDGothicNeoEB', sans-serif;
  font-size: 28px;
  margin-bottom: 16px;
  text-align: center;
`;

export const MetaInfo = styled.div`
  font-family: 'AppleSDGothicNeoM', sans-serif;
  font-size: 14px;
  color: #888;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .author-date {
    display: flex;
    align-items: center;
  }

  img {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 8px;
  }

  .stats {
    display: flex;
    gap: 10px;

    .stat-item {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .stat-item img {
      width: 16px;
      height: 16px;
    }
  }
`;

export const EditButton = styled.div`
  text-align: right;
  color: #888;
  cursor: pointer;
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};

  img {
    margin-left: 8px;
    width: 16px;
    height: 16px;
  }
`;
