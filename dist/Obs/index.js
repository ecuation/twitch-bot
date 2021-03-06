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
exports.OBSConnector = void 0;
var ObsWebSocket = require("obs-websocket-js");
var OBSConnector = /** @class */ (function () {
    function OBSConnector() {
        this.obs = new ObsWebSocket();
    }
    OBSConnector.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.obs.connect({
                                address: process.env.OBS_HOST,
                                password: process.env.OBS_PASSWORD
                            })];
                    case 1:
                        _a.sent();
                        console.log('OBS connection success!');
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log('OBS cannot be connected: ', error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OBSConnector.prototype.switchToScene = function (sceneName) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.obs.send('SetCurrentScene', {
                                'scene-name': sceneName
                            })];
                    case 1:
                        _a.sent();
                        console.log("Scene changed to: " + sceneName);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.log('Scene cannot be changed: ', error_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OBSConnector.prototype.getCurrentScene = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var scene, error_3;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    return [4 /*yield*/, this.obs.send('GetCurrentScene')];
                                case 1:
                                    scene = _a.sent();
                                    resolve(scene);
                                    return [3 /*break*/, 3];
                                case 2:
                                    error_3 = _a.sent();
                                    reject(error_3);
                                    return [3 /*break*/, 3];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    OBSConnector.prototype.getItemCurrentStatus = function (itemName) {
        return __awaiter(this, void 0, void 0, function () {
            var currentScene;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getCurrentScene()];
                    case 1:
                        currentScene = _a.sent();
                        return [4 /*yield*/, this.obs.send('GetSceneItemProperties', {
                                'scene-name': currentScene.name,
                                item: { name: itemName }
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    OBSConnector.prototype.showItemFromCurrentScene = function (itemName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.setItemVisibleTo(itemName, true)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    OBSConnector.prototype.hideItemFromCurrentScene = function (itemName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.setItemVisibleTo(itemName, false)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    OBSConnector.prototype.setItemVisibleTo = function (itemName, status) {
        return __awaiter(this, void 0, void 0, function () {
            var currentScene;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getCurrentScene()];
                    case 1:
                        currentScene = _a.sent();
                        return [4 /*yield*/, this.obs.send('SetSceneItemProperties', {
                                'scene-name': currentScene.name,
                                visible: status,
                                item: { name: itemName },
                                bounds: {},
                                scale: {},
                                crop: {},
                                position: {}
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return OBSConnector;
}());
exports.OBSConnector = OBSConnector;
//# sourceMappingURL=index.js.map