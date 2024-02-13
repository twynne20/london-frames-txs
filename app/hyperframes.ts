import { getFrameHtmlResponse } from "@coinbase/onchainkit";
import { NEXT_PUBLIC_URL } from "./config";


interface HyperFrame {
  label: string;
  frame: string;
  1: string;
  2?: string;
  3?: string;
  4?: string;
}

export default function getHyperFrame(frame: string, text: string, button: number) {
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
        2: 'woods-bear',
        3: 'cave-1',
    };

    frames['woods-bear'] = {
        label: 'woods-bear',
        frame: getFrameHtmlResponse({
            buttons: [
                {
                    label: 'Go Back',
                },
                {
                    label: 'TODO',
                },
            ],
            image: {
                src: `${NEXT_PUBLIC_URL}/woods-bear.png`,
                aspectRatio: '1:1',
            },
            postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=woods-bear`,
        }),
        1: 'start',
        2: 'start',
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

    frames['road'] = {
        label: 'road',
        frame: getFrameHtmlResponse({
            buttons: [
                {
                    label: 'Go Back',
                },
                {
                    label: 'Shack',
                },
                {
                    label: 'Forward',
                },
            ],
            image: {
                src: `${NEXT_PUBLIC_URL}/road.png`,
                aspectRatio: '1:1',
            },
            postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=road`,
        }),
        1: 'start',
        2: 'shack',
        3: 'desert-road',
    };

    frames['shack'] = {
        label: 'shack',
        frame: getFrameHtmlResponse({
            buttons: [
                {
                    label: 'Go Back',
                },
                {
                    label: 'Door',
                },
            ],
            image: {
                src: `${NEXT_PUBLIC_URL}/shack.png`,
                aspectRatio: '1:1',
            },
            input: {
                text: 'What is the password?',
            },
            postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=shack`,
        }),
        1: 'road',
        2: checkForCorrectText('shack', text) ? 'key' : 'shack-bad-password',
    };

    frames['shack-bad-password'] = {
        label: 'shack-bad-password',
        frame: getFrameHtmlResponse({
            buttons: [
                {
                    label: 'Go Back',
                },
                {
                    label: 'Door',
                },
            ],
            image: {
                src: `${NEXT_PUBLIC_URL}/shack.png`,
                aspectRatio: '1:1',
            },
            input: {
                text: 'Try again. What is the password?',
            },
            postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=shack-bad-password`,
        }),
        1: 'road',
        2: checkForCorrectText('shack', text) ? 'key' : 'shack-bad-password',
    };

    frames['key'] = {
        label: 'key',
        frame: getFrameHtmlResponse({
            buttons: [
                {
                    label: 'Go Back',
                },
                {
                    label: 'TODO',
                },
            ],
            image: {
                src: `${NEXT_PUBLIC_URL}/key.png`,
                aspectRatio: '1:1',
            },
            postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=key`,
        }),
        1: 'shack',
    };

    frames['desert-road'] = {
        label: 'desert-road',
        frame: getFrameHtmlResponse({
            buttons: [
                {
                    label: 'Go Back',
                },
                {
                    label: 'Go Forward',
                },
                {
                    label: 'Desert',
                },
            ],
            image: {
                src: `${NEXT_PUBLIC_URL}/desert-road.png`,
                aspectRatio: '1:1',
            },
            postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=desert-road`,
        }),
        1: 'road',
        2: 'mountain-road',
        3: 'desert-lost-1',
    };

    frames['mountain-road'] = {
        label: 'mountain-road',
        frame: getFrameHtmlResponse({
            buttons: [
                {
                    label: 'Go Back',
                },
                {
                    label: 'Go Forward',
                },
            ],
            image: {
                src: `${NEXT_PUBLIC_URL}/mountain-road.png`,
                aspectRatio: '1:1',
            },
            postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=mountain-road`,
        }),
        1: 'desert-road',
        2: 'mountain-goat',
    };

    frames['mountain-goat'] = {
        label: 'mountain-goat',
        frame: getFrameHtmlResponse({
            buttons: [
                {
                    label: 'Go Back',
                },
                {
                    label: 'TODO',
                },
            ],
            image: {
                src: `${NEXT_PUBLIC_URL}/mountain-goat.png`,
                aspectRatio: '1:1',
            },
            postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=mountain-goat`,
        }),
        1: 'mountain-road',
        2: 'mountain-goat'
    };

    frames['desert-lost-1'] = {
        label: 'desert-lost-1',
        frame: getFrameHtmlResponse({
            buttons: [
                {
                    label: 'North',
                },
                {
                    label: 'South',
                },
                {
                    label: 'East',
                },
                {
                    label: 'West',
                },
            ],
            image: {
                src: `${NEXT_PUBLIC_URL}/desert-lost.png`,
                aspectRatio: '1:1',
            },
            postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=desert-lost-1`,
        }),
        1: 'desert-road',
        2: 'desert-lost-2',
        3: 'desert-road',
        4: 'desert-road',
    };

    frames['desert-lost-2'] = {
        label: 'desert-lost-2',
        frame: getFrameHtmlResponse({
            buttons: [
                {
                    label: 'North',
                },
                {
                    label: 'South',
                },
                {
                    label: 'East',
                },
                {
                    label: 'West',
                },
            ],
            image: {
                src: `${NEXT_PUBLIC_URL}/desert-lost.png`,
                aspectRatio: '1:1',
            },
            postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=desert-lost-2`,
        }),
        1: 'desert-road',
        2: 'desert-road',
        3: 'desert-road',
        4: 'desert-lost-3',
    };

    frames['desert-lost-3'] = {
        label: 'desert-lost-3',
        frame: getFrameHtmlResponse({
            buttons: [
                {
                    label: 'North',
                },
                {
                    label: 'South',
                },
                {
                    label: 'East',
                },
                {
                    label: 'West',
                },
            ],
            image: {
                src: `${NEXT_PUBLIC_URL}/desert-lost.png`,
                aspectRatio: '1:1',
            },
            postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=desert-lost-3`,
        }),
        1: 'desert-road',
        2: 'desert-road',
        3: 'desert-road',
        4: 'desert-lost-4',
    };

    frames['desert-lost-4'] = {
        label: 'desert-lost-4',
        frame: getFrameHtmlResponse({
            buttons: [
                {
                    label: 'North',
                },
                {
                    label: 'South',
                },
                {
                    label: 'East',
                },
                {
                    label: 'West',
                },
            ],
            image: {
                src: `${NEXT_PUBLIC_URL}/desert-lost.png`,
                aspectRatio: '1:1',
            },
            postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=desert-lost-4`,
        }),
        1: 'desert-oasis',
        2: 'desert-road',
        3: 'desert-road',
        4: 'desert-road',
    };

    frames['desert-oasis'] = {
        label: 'desert-oasis',
        frame: getFrameHtmlResponse({
            buttons: [
                {
                    label: 'Go Back',
                },
                {
                    label: 'TODO',
                },
            ],
            image: {
                src: `${NEXT_PUBLIC_URL}/desert-oasis.png`,
                aspectRatio: '1:1',
            },
            postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=desert-oasis`,
        }),
        1: 'desert-road',
        2: 'desert-road',
    };


    function checkForCorrectText(room: string, text: string): boolean {
        switch (room) {
            case 'shack':
                return text === 'All our base are belong to you';
        }
  
        return false;
    }

    const currentFrame = frames[frame];
    const nextFrameId = currentFrame[button as keyof HyperFrame] as string;

    return frames[nextFrameId].frame;
}
