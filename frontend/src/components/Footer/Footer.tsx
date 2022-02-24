import React from 'react';

import Text from '@/components/Text';

const githubIds = ['0JUUU', 'chanuuuuu', 'Hae-Riri', 'hochan222', 'judy5050'];

const GithubIdLink = ({ id }: { id: String }) => {
  const GITHUB_BASE_URL = 'https://github.com/';

  return <a href={GITHUB_BASE_URL + id}>@{id} </a>;
};

const Footer = () => {
  return (
    <footer className="footer">
      <Text text="copyrightⓒ 2022 All rights reserved by" className="copyright"/>
      <Text className="footer__link-github" Tag="div">
        {githubIds.map((id) => (
          <GithubIdLink key={id} id={id} />
        ))}
      </Text>
    </footer>
  );
};

export default Footer;
