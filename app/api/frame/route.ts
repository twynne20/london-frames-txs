import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../config';
import getHyperFrame from '../../hyperframes';


async function getResponse(req: NextRequest): Promise<NextResponse> {
  const url = new URL(req.url);
  const queryParams = url.searchParams;
  const frame = queryParams.get('frame');

  let accountAddress: string | undefined = '';
  var text: string | undefined = ''; // Elevate scope to use in frame dictionary

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

  return new NextResponse(
    getHyperFrame(frame as string, text || '', message?.button),
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
