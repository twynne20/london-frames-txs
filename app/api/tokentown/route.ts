import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { encodeFunctionData, formatEther, parseGwei } from 'viem';
import { base } from 'viem/chains';
import type { FrameTransactionResponse } from '@coinbase/onchainkit/frame';

import ClickTheButtonABI from '../../_contracts/ClickTheButtonAbi';
import { CLICK_THE_BUTTON_CONTRACT_ADDR } from '../../config';

