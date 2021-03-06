import ObsWebSocket = require('obs-websocket-js');

export interface Scene {
    messageId: string;
    status: 'ok';
    name: string;
    sources: ObsWebSocket.SceneItem[];
}

export interface ItemProperties {
    messageId: string;
    status: 'ok';
    name: string;
    itemId: number;
    rotation: number;
    visible: boolean;
    muted: boolean;
    locked: boolean;
    sourceWidth: number;
    sourceHeight: number;
    width: number;
    height: number;
    parentGroupName?: string;
    groupChildren?: ObsWebSocket.SceneItemTransform[];
    position: { x: number; y: number; alignment: number };
    scale: { x: number; y: number; filter: string };
    crop: { top: number; right: number; bottom: number; left: number };
    bounds: { type: string; alignment: number; x: number; y: number };
}

export interface Commands {
    '!camfuera': 'hideMainCam';
    '!fullscreen': 'fullScreenScene';
    '!welcome': 'welcomeMessage';
}

export interface User {
    username: string;
}

export interface Store {
    insertNewBot(doc: User): Promise<void>;
}
