/**
 * 앱 실행시 처음 시작하는 스크립트
 * 이 스크립트가 main 프로세스가 된다.
 */
const electron = require('electron');
// 애플리케이션 생명주기를 조작 하는 모듈.
const {app} = electron;
// 네이티브 브라우저 창을 만드는 모듈.
const {BrowserWindow} = electron;
// ipcMain
const {ipcMain} = electron;
const path = require('path');
const fs = require('fs');
const process = require('process');
const hostApi = require(path.join(__dirname, 'core', 'api', 'host.js'));

// 윈도우 객체를 전역에 유지합니다. 만약 이렇게 하지 않으면
// 자바스크립트 GC가 일어날 때 창이 멋대로 닫혀버립니다.
let win = null;

function createWindow () {
  // 새로운 브라우저 창을 생성합니다.
  win = new BrowserWindow({
    width: 1200
    , height: 800
    , icon: './icon/interpark_tour.png'
    , webPreferences: {
      preload: path.join(__dirname, 'preload.js')
  }});

  // html 로드 이전에 실행해야 하는 스크립트
  // 메인에서 들어오면 실행할 액션 등록
  ipcMain.handle('getHostsFile', () => {
    const hostsFilePath = 'C:\/Windows\/System32\/drivers\/etc\/hosts';
    const data = fs.readFileSync(hostsFilePath, 'utf-8');
    return data;
  });
  // 사용자 폴더에 데이터 저장소로 사용할 디렉토리 생성
  ipcMain.handle('makeDataDir', () => {
    // db로 사용할 디렉토리 생성
    const userName = process.env.USERNAME;
    const userDirectoryPath = path.join('C:\/Users', userName);
    const dataDirectoryPath = path.join(userDirectoryPath, '.hostManagerElectron');
    const isDataDirExist = fs.existsSync(dataDirectoryPath);
    if (!isDataDirExist) {
      // 새로 만들기
      fs.mkdirSync(dataDirectoryPath);
    } else {
    }
  });

  ipcMain.handle('createHost', (event, params) => {
    return hostApi.createHost(params);
  });
  ipcMain.handle('readHost', (event, params) => {
    return hostApi.readHost(params);
  });

  // 그리고 현재 디렉터리의 index.html을 로드합니다.
  // win.loadURL(`file://${__dirname}/index.html`);
  win.loadFile(path.join(__dirname, 'index', 'index.html'));

  // 개발자 도구를 엽니다.
  win.webContents.openDevTools();

  // 창이 닫히면 호출됩니다.
  win.on('closed', () => {
    // 윈도우 객체의 참조를 삭제합니다. 보통 멀티 윈도우 지원을 위해
    // 윈도우 객체를 배열에 저장하는 경우가 있는데 이 경우
    // 해당하는 모든 윈도우 객체의 참조를 삭제해 주어야 합니다.
    win = null;
  });
}

// 이 메서드는 Electron의 초기화가 끝나면 실행되며 브라우저
// 윈도우를 생성할 수 있습니다. 몇몇 API는 이 이벤트 이후에만
// 사용할 수 있습니다.
app.on('ready', createWindow);

// 모든 창이 닫히면 애플리케이션 종료.
app.on('window-all-closed', () => {
  // macOS의 대부분의 애플리케이션은 유저가 Cmd + Q 커맨드로 확실하게
  // 종료하기 전까지 메뉴바에 남아 계속 실행됩니다.
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', () => {
  // macOS에선 보통 독 아이콘이 클릭되고 나서도
  // 열린 윈도우가 없으면, 새로운 윈도우를 다시 만듭니다.
  if (win === null) {
    createWindow();
  }
})

// 이 파일엔 제작할 애플리케이션에 특화된 메인 프로세스 코드를
// 포함할 수 있습니다. 또한 파일을 분리하여 require하는 방법으로
// 코드를 작성할 수도 있습니다.