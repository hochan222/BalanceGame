import React from 'react';
import Lottie from 'react-lottie';
import LoadingVote from '@/asset/loading-vote.json';

const Spinner = () => {
  const lottieOptions = {
    animationData: LoadingVote,
    loop: true,
    autoplay: true,
    renderer: 'svg',
  };

  return (
    <div className="vote-spinner">
      <Lottie options={lottieOptions} height={200} width={200} />
    </div>
  );
};

export default Spinner;
