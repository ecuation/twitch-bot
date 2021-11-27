import ObsWebSocket = require('obs-websocket-js');

export interface Scene {
    messageId: string;
    status: 'ok';
    name: string;
    sources: ObsWebSocket.SceneItem[];
}
