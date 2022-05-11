import React, { useRef } from 'react';

import image from '../../assets/globe.svg';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useClickOutside } from '../../hooks/useClickOutside';
import { locationSlice } from '../../store/reducers/LocationSlice';
import LocationModal from './components/LocationModal';
import cl from './LocationBar.module.scss';

const LocationBar = () => {
  const { location, isModalOpen } = useAppSelector((state) => state.locationReducer);
  const { setIsModalOpen } = locationSlice.actions;
  const dispatch = useAppDispatch();
  const barRef = useRef(null);

  const toggleModal = () => dispatch(setIsModalOpen(!isModalOpen));
  const closeModal = () => dispatch(setIsModalOpen(false));

  useClickOutside(barRef, closeModal);

  return (
    <div ref={barRef}>
      <button className={cl.location} onClick={toggleModal}>
        <img src={image} alt="globe" />
      </button>
      <LocationModal />
    </div>
  );
};

export default LocationBar;
