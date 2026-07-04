const {exec} = require("child_process");
const path = require("path");

function rungit(cammand){
    return new Promise((resolve,reject)=>{
        exec(cammand,{cwd:path.join(__dirname,"..","..")},
        (error,stdout,stderr)=>{
            if(error) return reject(err);
            resolve(stdout);
        });
    });
}


async function gitAdd() {
    return runGit("git add .");
}

async function gitCommit(message) {
    return runGit(`git commit -m "${message}"`);
}

async function gitPush() {
    return runGit("git push origin main");
}

async function gitAutomation(message) {
    await gitAdd();
    await gitCommit(message);
    await gitPush();
}


module.exports = { gitAutomation };