import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../config';

interface HyperFrame {
  label: string;
  frame: string;
  button1Target: string;
  button2Target: string;
  button3Target: string;
  button4Target: string;
}

const frames: Record<string, HyperFrame> = {};

frames['woods'] = {
  label: 'woods',
  frame: getFrameHtmlResponse({
  buttons: [
    {
      label: 'Follow the Road',
    },
    {
      label: 'Explore the Forest',
    },
    {
      label: 'Enter the Cave',
    },
    {
      action: 'link',
      label: 'TODO Tutorial',
      target: 'https://www.google.com',
    },
  ],
  image: {
    src: `${NEXT_PUBLIC_URL}/frame-1-forest.webp`,
    aspectRatio: '1:1',
  },
  postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=woods`,
}),
  button1Target: 'woods',
  button2Target: 'forest',
  button3Target: 'cave-1',
  button4Target: '',
};

frames['cave-1'] = {
  label: 'cave-1',
  frame: getFrameHtmlResponse({
  buttons: [
    {
      label: 'Go deeper...',
    },
    {
      label: 'Leave',
    },
  ],
  image: {
    src: `${NEXT_PUBLIC_URL}/cave-1.png`,
    aspectRatio: '1:1',
  },
  postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=cave-1`,
}),
  button1Target: 'cave-2',
  button2Target: 'forest',
  button3Target: '',
  button4Target: '',
};

frames['cave-2'] = {
  label: 'cave-2',
  frame: getFrameHtmlResponse({
  buttons: [
    {
      label: 'Go deeper...',
    },
    {
      label: 'Leave',
    },
  ],
  image: {
    src: `${NEXT_PUBLIC_URL}/cave-2.png`,
    aspectRatio: '1:1',
  },
  postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=cave-2`,
}),
  button1Target: 'cave-3',
  button2Target: 'forest',
  button3Target: '',
  button4Target: '',
};

frames['cave-3'] = {
  label: 'cave-3',
  frame: getFrameHtmlResponse({
  buttons: [
    {
      label: 'Start Over',
    },
  ],
  image: {
    src: `${NEXT_PUBLIC_URL}/cave-3.png`,
    aspectRatio: '1:1',
  },
  postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=cave-3`,
}),
  button1Target: 'forest',
  button2Target: '',
  button3Target: '',
  button4Target: '',
};


async function getResponse(req: NextRequest): Promise<NextResponse> {
  const url = new URL(req.url);
  const queryParams = url.searchParams;
  const frame = queryParams.get('frame');

  let accountAddress: string | undefined = '';
  let text: string | undefined = '';

  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

  if (isValid) {
    accountAddress = message.interactor.verified_accounts[0];
  }

  if (message?.input) {
    text = message.input;
  }





  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: `🌲☀️ ${text} 🌲🌲`,
        },
      ],
      image: {
        src: `${NEXT_PUBLIC_URL}/park-1.png`,
      },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
    }),
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
