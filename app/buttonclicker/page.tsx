import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from '../config';
import { createPublicClient, encodeFunctionData, http } from 'viem';
import { base } from 'viem/chains';
import ClickTheButtonABI from '../_contracts/ClickTheButtonAbi';
import { CLICK_THE_BUTTON_CONTRACT_ADDR } from '../config';
import { useState } from 'react';

type Player = {
  user: string;
  clicks: string;
};

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      action: 'tx',
      label: 'Click the Button',
      target: `${NEXT_PUBLIC_URL}/api/buttonclicker`,
    },
    {
      action: 'link',
      label: 'Leaderboard',
      target: `${NEXT_PUBLIC_URL}/buttonclicker`,
    },
  ],
  image: {
    src: `${NEXT_PUBLIC_URL}/button.webp`,
    aspectRatio: '1:1',
  },
  input: {
    text: 'Don\'t click the button!',
  },
  postUrl: `${NEXT_PUBLIC_URL}/api/aftertx`,
});

export const metadata: Metadata = {
  title: 'Click the Button',
  description: "Don't click the button!",
  openGraph: {
    title: 'Click the Button',
    description: "Don't click the button!",
    images: [`${NEXT_PUBLIC_URL}/button.webp`],
  },
  other: {
    ...frameMetadata,
  },
};

export default async function Page() {
  const [list, setList] = useState<React.JSX.Element[]>([]);

  const publicClient = createPublicClient({
    chain: base,
    transport: http(),
  });

  async function fetchPlayers() {
    const players = (await publicClient.readContract({
      address: CLICK_THE_BUTTON_CONTRACT_ADDR,
      abi: ClickTheButtonABI,
      functionName: 'getAllClicks',
    })) as Player[];

    // Sort players by clicks
    players.sort((a, b) => parseInt(b.clicks) - parseInt(a.clicks));

    const updatedList: React.JSX.Element[] = players.map((player, index) => {
      return <div>{`${index + 1}. ${player.user} - ${player.clicks}`}</div>;
    });

    setList(updatedList);
  }

  
  return (
    <>
      <h1>Leader Board</h1>
      <hr />
      <div>{list}</div>
    </>
  );
}
