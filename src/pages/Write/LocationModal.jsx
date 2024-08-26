import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import styled from 'styled-components';

const GOOGLE_MAPS_API_KEY = 'AIzaSyDVqXQIPlNVlO35Ud8PJtHCmw5dfFfe9RA';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const MapContainer = styled.div`
  width: 100%;
  height: 400px;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;

  &:hover {
    opacity: 0.8;
  }
`;

const ConfirmButton = styled(Button)`
  background-color: #007bff;
  color: white;
`;

const CancelButton = styled(Button)`
  background-color: #6c757d;
  color: white;
`;

const getAddressFromLatLng = async (lat, lng) => {
  try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}&language=ko`);
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      let pointOfInterest = '';
      let formattedAddress = data.results[0].formatted_address;

      // 관심 지점 찾기
      for (let result of data.results) {
        for (let component of result.address_components) {
          if (component.types.includes('point_of_interest') || 
              component.types.includes('establishment')) {
            pointOfInterest = component.long_name;
            break;
          }
        }
        if (pointOfInterest) break;
      }

      // 관심 지점이 없으면 첫 번째 결과의 이름 사용
      if (!pointOfInterest && data.results[0].address_components.length > 0) {
        pointOfInterest = data.results[0].address_components[0].long_name;
      }

      return { pointOfInterest, formattedAddress };
    }
    throw new Error('주소를 찾을 수 없습니다.');
  } catch (error) {
    console.error("Error fetching address:", error);
    throw error;
  }
};

const LocationModal = ({ isOpen, onClose, onSelectLocation }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [address, setAddress] = useState({ pointOfInterest: '', formattedAddress: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleMapClick = useCallback((event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setSelectedLocation({ lat, lng });
    setAddress({ pointOfInterest: '', formattedAddress: '' });
    setError(null);
  }, []);

  useEffect(() => {
    if (selectedLocation) {
      setIsLoading(true);
      setError(null);
      getAddressFromLatLng(selectedLocation.lat, selectedLocation.lng)
        .then(addressInfo => {
          setAddress(addressInfo);
          setIsLoading(false);
        })
        .catch(err => {
          setError('주소를 가져오는 데 실패했습니다. 다시 시도해 주세요.');
          setIsLoading(false);
        });
    }
  }, [selectedLocation]);

  const handleConfirm = useCallback(() => {
    if (selectedLocation && address.formattedAddress) {
      onSelectLocation({
        lat: selectedLocation.lat,
        lng: selectedLocation.lng,
        pointOfInterest: address.pointOfInterest,
        address: address.formattedAddress
      });
      onClose();
    }
  }, [selectedLocation, address, onSelectLocation, onClose]);

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>위치 선택</h2>
        <MapContainer>
          <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '100%' }}
              center={{ lat: 37.5665, lng: 126.9780 }}
              zoom={10}
              onClick={handleMapClick}
            >
              {selectedLocation && (
                <Marker position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }} />
              )}
            </GoogleMap>
          </LoadScript>
        </MapContainer>
        {isLoading && <p>주소를 가져오는 중...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {address.pointOfInterest && <p>선택된 장소: {address.pointOfInterest}</p>}
        {address.formattedAddress && <p>주소: {address.formattedAddress}</p>}
        <ButtonContainer>
          <CancelButton onClick={onClose}>취소</CancelButton>
          <ConfirmButton 
            onClick={handleConfirm} 
            disabled={!selectedLocation || !address.formattedAddress || isLoading}
          >
            위치 선택 확인
          </ConfirmButton>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default LocationModal;