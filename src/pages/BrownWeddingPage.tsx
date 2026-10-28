import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BrownWeddingExperience } from '../components/brown-wedding/BrownWeddingExperience';

export const BrownWeddingPage: React.FC = () => {
  const [searchParams] = useSearchParams();

  const partnerOne = searchParams.get('bride') || searchParams.get('partnerOne') || 'Ayesha';
  const partnerTwo = searchParams.get('groom') || searchParams.get('partnerTwo') || 'Zayd';
  const venue = searchParams.get('venue') || 'The Royal Palm Garden & Pavilion, Lahore';
  const date = searchParams.get('date') || 'Saturday, October 24, 2026';
  const videoSrc = searchParams.get('video') || '/wedding-animation.mp4';

  useEffect(() => {
    document.title = `${partnerOne} & ${partnerTwo} — Luxury Royal Wedding Invitation`;
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
