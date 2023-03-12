import { ImgHTMLAttributes } from 'react';

import getConfig from 'next/config';

export const Img = (props: ImgHTMLAttributes<HTMLImageElement>) => {
  const { publicRuntimeConfig } = getConfig();

  return <img {...props} src={publicRuntimeConfig.urlPrefix + props.src} alt={props.alt} />;
};
