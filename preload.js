/**
 * 렌더링 직전 실행 스크립트
 */
const {contextBridge, ipcRenderer} = require('electron');

// versions 라는 이름의 전역 변수를 만든다.
// renderer에 노출됨
contextBridge.exposeInMainWorld('versions', {
  // we can also expose variables, not just functions
  // 렌더러에서 실행할 액션 등록
  getHostsFile: () => ipcRenderer.invoke('getHostsFile'),
  makeDataDir: () => ipcRenderer.invoke('makeDataDir'),
});

contextBridge.exposeInMainWorld('hostApi', {
  createHost: (params) => ipcRenderer.invoke('createHost', params),
  readHost: (params) => ipcRenderer.invoke('readHost', params),
});