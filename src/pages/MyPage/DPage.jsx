import React, { useState } from 'react';
import styled from 'styled-components';
import TravelMap from './Map/TravelMap';

const DPageContainer = styled.div`
  position: absolute;
  top: 150px;
  left: 100px;
  width: 1000px;
  height: 660px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
`;

const LeftPanel = styled.div`
  width: 45%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const RightPanel = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 330px; // 전체 높이의 절반
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
`;

const LocationList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  max-height: 330px; // 맵과 동일한 높이
  overflow-y: auto; // 내용이 넘칠 경우 스크롤 표시
`;

const LocationItem = styled.li`
  background-color: #f8f8f8;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  position: relative;
`;

const LocationName = styled.h3`
  margin: 0 0 5px 0;
  font-size: 16px;
  color: #333;
`;

const LocationAddress = styled.p`
  margin: 0;
  font-size: 14px;
  color: #666;
`;

const ArrowIcon = styled.span`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  font-size: 20px;
`;

const DPage = () => {
  const [selectedLocations, setSelectedLocations] = useState([]);

  const handleLocationSelect = (location) => {
    if (selectedLocations.length < 4) {
      setSelectedLocations([...selectedLocations, location]);
    }
  };

  return (
    <DPageContainer>
      <LeftPanel>
        <LocationList>
          {selectedLocations.map((location, index) => (
            <LocationItem key={index}>
              <LocationName>{location.name}</LocationName>
              <LocationAddress>{location.address}</LocationAddress>
              <ArrowIcon>›</ArrowIcon>
            </LocationItem>
          ))}
        </LocationList>
      </LeftPanel>
      <RightPanel>
        <MapWrapper>
          <TravelMap onLocationSelect={handleLocationSelect} />
        </MapWrapper>
      </RightPanel>
    </DPageContainer>
  );
};

export default DPage;