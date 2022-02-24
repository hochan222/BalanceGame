import React from 'react';
import Lottie from 'react-lottie';
import LoadingBalance from '@/asset/search-not-found.json';

const SearchNotFound = () => {
  const lottieOptions = {
    animationData: LoadingBalance,
    loop: true,
    autoplay: true,
    renderer: 'svg',
  };

  return (
    <div className="vote-balance-game">
      <Lottie options={lottieOptions} height={150} width={150} />
      <p style={{fontSize:18, textAlign: 'center'}}>검색 결과를 찾지 못했습니다.</p>
    </div>
  );
};

export default SearchNotFound;
