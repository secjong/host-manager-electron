/**
 * index.html 제어 스크립트
 */
const showHostButtonElem = document.getElementById('showHostButton');
const addHostButtonElem = document.getElementById('addHostButton');
const hostsFileContentsElem = document.getElementById('hostsFileContents');
const ipElem = document.getElementById('ip');
const hostElem = document.getElementById('host');
const descriptionElem = document.getElementById('description');

/**
 * 테스트용
 */
showHostButtonElem.addEventListener('click', async () => {
    // setHostsFileContents();
    // window.versions.makeDataDir();
    const data = await window.hostApi.readHost('222_333');
    console.log(data);
});

/**
 * 호스트 추가하기
 */
addHostButtonElem.addEventListener('click', () => {
    const ip = ipElem.value;
    const host = hostElem.value;
    const description = descriptionElem.value;
    window.hostApi.createHost({ip, host, description});
});



document.addEventListener("DOMContentLoaded", function(){
    setHostsFileContents();
});





  /**
  * 호스트 파일 내용을 화면에 출력
  */
async function setHostsFileContents() {
    const hosts = await window.versions.getHostsFile();
    hostsFileContentsElem.innerText = hosts;
}
