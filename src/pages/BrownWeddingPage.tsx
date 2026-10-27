import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BrownWeddingExperience } from '../components/brown-wedding/BrownWeddingExperience';

export const BrownWeddingPage: React.FC = () => {
  const [searchParams] = useSearchParams();

  const partnerOne = searchParams.get('bride') || searchParams.get('partnerOne') || 'Aayan';
  const partnerTwo = searchParams.get('groom') || searchParams.get('partnerTwo') || 'Meher';
  const venue = searchParams.get('venue') || 'The Royal Palm Garden & Pavilion';
  const date = searchParams.get('date') || 'Saturday, October 24, 2026';
  const videoSrc = searchParams.get('video') || '/wedding%20aniamtion.mp4';

  useEffect(() => {
    document.title = `${partnerOne} & ${partnerTwo} — Luxury Chocolate & Gold Wedding Card`;
  }, [partnerOne, partnerTwo]);

  return (
    <BrownWeddingExperience
      partnerOne={partnerOne}
      partnerTwo={partnerTwo}
      weddingDate={date}
      venueName={venue}
      videoSrc={videoSrc}
    />
  );
};
