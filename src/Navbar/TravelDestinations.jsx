import React from 'react';
import Dropdown from './Dropdown.jsx';
import Header from '../components/Header';
import Destinations from '../components/Destinations';

function TravelDestinations({ selectedDest }) {
  return (
    <>
      <Header selectedDest={selectedDest} />
      <Destinations selectedDest={selectedDest} />
    </>
  );
}

export default TravelDestinations;