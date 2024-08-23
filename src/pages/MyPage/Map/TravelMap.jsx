import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import styled from 'styled-components';

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const containerStyle = {
  width: '100%',
  height: '100%'
};

const center = {
  lat: 16.0544,
  lng: 108.2452
};

const mapStyles = [
  {
    featureType: "all",
    elementType: "geometry.fill",
    stylers: [{ weight: "2.00" }]
  },
  {
    featureType: "all",
    elementType: "geometry.stroke",
    stylers: [{ color: "#9c9c9c" }]
  },
  // 추가 스타일 규칙...
];
const TravelMap = ({ onLocationSelect }) => {
  const [markers, setMarkers] = useState([]);

  const getLocationInfo = async (lat, lng) => {
    return new Promise((resolve, reject) => {
      const service = new window.google.maps.places.PlacesService(document.createElement('div'));
      service.nearbySearch({
        location: { lat, lng },
        radius: 10, // 10미터 반경 내 검색
        type: ['point_of_interest'] // 관심 장소 타입
      }, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
          // 특정 정보가 있는 경우
          resolve({
            name: results[0].name,
            address: results[0].vicinity
          });
        } else {
          // 특정 정보가 없는 경우, Geocoder로 주소만 가져옴
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ location: { lat, lng } }, (results, status) => {
            if (status === "OK" && results[0]) {
              resolve({
                name: null,
                address: results[0].formatted_address
              });
            } else {
              reject("Geocoder failed due to: " + status);
            }
          });
        }
      });
    });
  };

  const onMapClick = async (e) => {
    try {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      const { name, address } = await getLocationInfo(lat, lng);
      
      const newLocation = {
        lat,
        lng,
        name: name || address, // name이 null이면 address를 사용
        address
      };
      
      setMarkers([...markers, newLocation]);
      onLocationSelect(newLocation);
    } catch (error) {
      console.error("Error getting location info:", error);
      // 에러 처리: 사용자에게 알림을 표시하거나 기본값을 사용할 수 있습니다.
    }
  };

  return (
    <MapContainer>
      <LoadScript 
        googleMapsApiKey="AIzaSyDVqXQIPlNVlO35Ud8PJtHCmw5dfFfe9RA"
        libraries={["places"]}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          options={{
            styles: mapStyles,
            disableDefaultUI: true,
            zoomControl: true
          }}
          onClick={onMapClick}
        >
          {markers.map((marker, index) => (
            <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} />
          ))}
        </GoogleMap>
      </LoadScript>
    </MapContainer>
  );
};

export default TravelMap;