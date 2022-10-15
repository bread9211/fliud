// import EventBus from "./utils/EventBus";
// window.EventBus = EventBus;
import WebGL from "./modules/WebGL.js";


if(!window.isDev) window.isDev = false;

const webglMng = new WebGL({
    $wrapper: document.body
});
