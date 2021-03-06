"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.TwitchAPI = void 0;
var tmi = require("tmi.js");
var Obs_1 = require("../Obs");
var TwitchAPI = /** @class */ (function () {
    function TwitchAPI() {
        var _this = this;
        this.client = new tmi.client({
            identity: {
                username: process.env.TWITCH_USER,
                password: process.env.TWITCH_PASSWORD
            },
            channels: ['ecuationable']
        });
        this.obs = new Obs_1.OBSConnector();
        this.commands = {
            '!camfuera': 'hideMainCam',
            '!fullscreen': 'fullScreenScene',
            '!welcome': 'welcomeMessage'
        };
        this.lastTimeRaided = this.addMinutes(new Date(), 1);
        this.client.on('message', function (target, context, msg, self) {
            _this.onMessageHandler(target, context, msg, self);
        });
        this.client.on('raided', function (channel, username, viewers) {
            _this.lastTimeRaided = _this.addMinutes(new Date(), 5);
            _this.writeMessage("El usuario " + username + " ha enviado una raid con " + viewers + " espectadores. Gracias!");
        });
        this.client.on('join', function (channel, username) {
            var currentTime = new Date();
            var lastTimeRaided = _this.lastTimeRaided;
            if (currentTime.valueOf() > lastTimeRaided.valueOf()) {
                _this.welcomeMessage();
            }
        });
    }
    TwitchAPI.prototype.addMinutes = function (date, minutes) {
        return new Date(date.getTime() + minutes * 60000);
    };
    TwitchAPI.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.connectTwitch();
                        return [4 /*yield*/, this.connectOBS()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TwitchAPI.prototype.connectTwitch = function () {
        this.client.connect();
    };
    TwitchAPI.prototype.connectOBS = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.obs.connect()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TwitchAPI.prototype.onMessageHandler = function (target, context, msg, self) {
        return __awaiter(this, void 0, void 0, function () {
            var commandName, dynamicMethod;
            return __generator(this, function (_a) {
                if (self) {
                    return [2 /*return*/];
                } // Ignore messages from the bot
                commandName = msg.trim();
                dynamicMethod = this.commands[commandName];
                if (dynamicMethod)
                    this[dynamicMethod]();
                return [2 /*return*/];
            });
        });
    };
    TwitchAPI.prototype.hideMainCam = function () {
        return __awaiter(this, void 0, void 0, function () {
            var itemName, currentStatus;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        itemName = 'Main cam group';
                        return [4 /*yield*/, this.obs.getItemCurrentStatus(itemName)];
                    case 1:
                        currentStatus = _a.sent();
                        if (!currentStatus.visible)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.obs.hideItemFromCurrentScene(itemName)];
                    case 2:
                        _a.sent();
                        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.obs.showItemFromCurrentScene(itemName)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }, 3000);
                        return [2 /*return*/];
                }
            });
        });
    };
    TwitchAPI.prototype.fullScreenScene = function () {
        return __awaiter(this, void 0, void 0, function () {
            var currentScene;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.obs.getCurrentScene()];
                    case 1:
                        currentScene = _a.sent();
                        if (currentScene.name === 'Ending')
                            return [2 /*return*/];
                        return [4 /*yield*/, this.obs.switchToScene('Gameplay')];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TwitchAPI.prototype.writeMessage = function (message) {
        this.client.say('ecuationable', message);
    };
    TwitchAPI.prototype.welcomeMessage = function () {
        this.writeMessage("Escribe !r para reproducir tu mensaje.");
        this.writeMessage("Comandos disponibles: !saludo, !fua, !reanimacion, !reglas");
        this.writeMessage("Comandos stream: !camfuera, !wenanoshe, !cerrar, !grande, !peque\u00F1a");
    };
    return TwitchAPI;
}());
exports.TwitchAPI = TwitchAPI;
// 1. Necesito base de datos de bots (yes)
// 2. Cuando un usuario se une al chat comprobar que no es un bot
// si es un bot no muestro mensaje
// si es humano muestro mensaje
//# sourceMappingURL=index.js.map