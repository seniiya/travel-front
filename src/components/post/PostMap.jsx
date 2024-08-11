import React from 'react';
import styled from 'styled-components';

const Map = styled.div`
  margin-top: 20px;
`;

const PostMap = ({ location }) => {
  return (
    <Map>
      <h3>위치</h3>
      <iframe
        src={`https://maps.google.com/maps?q=${location}&z=15&output=embed`}
        width="100%"
        height="450"
        frameBorder="0"
        style={{ border: 0 }}
        allowFullScreen=""
        aria-hidden="false"
        tabIndex="0"
      ></iframe>
    </Map>
  );
};

export default PostMap;