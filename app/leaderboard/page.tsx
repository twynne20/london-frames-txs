'use-client';

type Player = {
  user: string;
  clicks: string;
};

import { createPublicClient, http } from 'viem';
import { base } from 'viem/chains';
import ClickTheButtonABI from '../_contracts/ClickTheButtonAbi';
import { CLICK_THE_BUTTON_CONTRACT_ADDR } from '../config';

export default async function Page() {
  const publicClient = createPublicClient({
    chain: base,
    transport: http(),
  });

  const players = (await publicClient.readContract({
    address: CLICK_THE_BUTTON_CONTRACT_ADDR,
    abi: ClickTheButtonABI,
    functionName: 'getAllClicks',
  })) as Player[];

  // Sort players by clicks
  players.sort((a, b) => parseInt(b.clicks) - parseInt(a.clicks));

  const list = players.map((player, index) => {
    return <div>{`${index + 1}. ${player.user} - ${player.clicks}`}</div>;
  });

  return (
    <>
      <h1>Leader Board</h1>
      <hr />
      <div>{list}</div>
    </>
  );
}
