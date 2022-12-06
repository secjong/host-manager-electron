const path = require('path');
const fs = require('fs');
const process = require('process');
const util = require('../../static/script/common/util');

const userName = process.env.USERNAME;
const userDirectoryPath = path.join('C:\/Users', userName);
const dataDirectoryPath = path.join(userDirectoryPath, '.hostManagerElectron');
const hostFilePath = path.join(dataDirectoryPath, 'host.json');

module.exports = {
    createHost: ({ip, host, description}) => {
        // host.json 파일에 저장
        const id = `${ip}_${host}`; // ip_host 가 식별자가 된다.
        const data = JSON.stringify({id, ip, host, description});

        const originData = fs.readFileSync(hostFilePath, 'utf8');
        if (util.isEmpty(originData)) {
            console.log('not exist');
        } else {
            console.log('exist');
        }

        fs.writeFileSync(hostFilePath, data, {flag: 'a'});
    },
    readHost: (id) => {
        console.log(id);
        const data = fs.readFileSync(hostFilePath, 'utf8');
        console.log(data);
        const dataArr = data.split('\n');
        console.log(dataArr);
    },
    updateHost: () => {},
    deleteHost: () => {}
};