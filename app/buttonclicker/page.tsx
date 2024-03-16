import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from '../config';
import { createPublicClient, http } from 'viem';
import { base } from 'viem/chains';
import ClickTheButtonABI from '../_contracts/ClickTheButtonAbi';
import { CLICK_THE_BUTTON_CONTRACT_ADDR } from '../config';

type Player = {
  user: string;
  clicks: string;
};

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      action: 'tx',
      label: 'Get Player Status',
      target: `${NEXT_PUBLIC_URL}/api/buttonclicker`,
    },
    {
      action: 'link',
      label: 'Game Status',
      target: `${NEXT_PUBLIC_URL}/buttonclicker`,
    },
  ],
  image: {
    src: `${NEXT_PUBLIC_URL}/TokenTown.png`,
    aspectRatio: '1:1',
  },
  input: {
    text: 'Enter address of the player!',
  },
  postUrl: `${NEXT_PUBLIC_URL}/api/aftertx`,
});

export const metadata: Metadata = {
  title: 'Token Town',
  description: "Enter address of the player!",
  openGraph: {
    title: 'Token Town Game Info',
    description: "Find token town game info!",
    images: [`${NEXT_PUBLIC_URL}/TokenTown.png`],
  },
  other: {
    ...frameMetadata,
  },
};

export default async function Page() {
  const publicClient = createPublicClient({
    chain: base,
    transport: http(),
  });

  const players = await publicClient.readContract({
    address: CLICK_THE_BUTTON_CONTRACT_ADDR,
    abi: ClickTheButtonABI,
    functionName: 'getAllClicks',
  }) as Player[];

  // Sort players by clicks
  players.sort((a, b) => parseInt(b.clicks) - parseInt(a.clicks));

  const list = players.map((player, index) => {
      return <div>{`${index + 1}. ${player.user} - ${player.clicks}`}</div>;
    }
  );

  return (
    <>
      <h1>Leader Board</h1>
      <hr />
      <div>{list}</div>
    </>
  );
}
