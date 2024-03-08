import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from '../config';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      action: 'tx',
      label: 'Mint Soulbound NFT',
      target: `${NEXT_PUBLIC_URL}/api/frames-of-the-future`,
    },
  ],
  image: {
    src: `${NEXT_PUBLIC_URL}/base-heart-farcaster_1080_9mb.gif`,
    aspectRatio: '1:1',
  },
  postUrl: `${NEXT_PUBLIC_URL}/api/future-after-tx`,
});

export const metadata: Metadata = {
  title: 'Frames of the Future',
  description: 'Base celebrates the launch of transactions in Farcaster',
  openGraph: {
    title: 'Frames of the Future',
    description: 'Base celebrates the launch of transactions in Farcaster',
    images: [`${NEXT_PUBLIC_URL}/base-heart-farcaster_1080_9mb.gif`],
  },
  other: {
    ...frameMetadata,
  },
};

export default async function Page() {
  return (
    <>
      <h1>Base 💙 Farcaster</h1>
    </>
  );
}
