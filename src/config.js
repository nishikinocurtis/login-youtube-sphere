import { useEffect } from "react";

export const appId = '6034a70af621af721e5320b9';
export const appHost = 'https://portal-lite-china.authing.cn';
export const guardConfig = {
    mode: 'modal',
    logo: 'https://nicegoodthings.com/apple-touch-icon.png',
    title: 'Portal',
    socialConnections: ['github', 'google', 'dingtalk', 'weibo'],
    appHost,
    lang: navigator.language == 'zh-CN' ? 'zh-CN' : 'en-US'
};