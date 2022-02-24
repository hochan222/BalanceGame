import React from 'react';
import Lottie from 'react-lottie';
import LoadingBalance from '@/asset/loading-balance.json';

const BalanceGame = () => {
  const lottieOptions = {
    animationData: LoadingBalance,
    loop: true,
    autoplay: true,
    renderer: 'svg',
  };

  return (
    <div className="vote-balance-game">
      <Lottie options={lottieOptions} height={150} width={150} />
    </div>
  );
};

export default BalanceGame;
