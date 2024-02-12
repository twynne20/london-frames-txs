import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../config';

interface HyperFrame {
  label: string;
  frame: string;
  1: string;
  2?: string;
  3?: string;
  4?: string;
}

const frames: Record<string, HyperFrame> = {};

frames['start'] = {
  label: 'start',
  frame: getFrameHtmlResponse({
  buttons: [
    {
      label: 'Road',
    },
    {
      label: 'Woods',
    },
    {
      label: 'Cave',
    },
    {
      action: 'link',
      label: 'TODO',
      target: 'https://www.google.com',
    },
  ],
  image: {
    src: `${NEXT_PUBLIC_URL}/frame-1-forest.webp`,
    aspectRatio: '1:1',
  },
  postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=start`,
}),
  1: 'road',
  2: 'woods',
  3: 'cave-1',
};

frames['cave-1'] = {
  label: 'cave-1',
  frame: getFrameHtmlResponse({
  buttons: [
    {
      label: 'Deeper...',
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
  1: 'cave-2',
  2: 'start',
};

frames['cave-2'] = {
  label: 'cave-2',
  frame: getFrameHtmlResponse({
  buttons: [
    {
      label: 'Deeper...',
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
  1: 'cave-3',
  2: 'start',
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
  1: 'start',
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

  // TODO: Cleanup this error handling
  if (!frame) {
    return new NextResponse(
      'Frame not found',
      { status: 404 },
    );
  }

  // There should always be a button number
  if (!message?.button) {
    return new NextResponse(
      'Button not found',
      { status: 404 },
    );
  }

  const currentFrame = frames[frame];
  const nextFrameId = currentFrame[message.button as keyof HyperFrame] as string;

  return new NextResponse(
    frames[nextFrameId].frame,
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
