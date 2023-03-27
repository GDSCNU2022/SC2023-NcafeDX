import { https } from 'firebase-functions';
import { next } from 'next';

// ref https://blog.bltinc.co.jp/entry/2022/11/16/150000

const nextJsDistDir = '.next';

const nextJsServer = next({
    dev: false,
    conf: {
        distDir: nextJsDistDir,
    },
})

const nextJsHandle = nextJsServer.getRequestHandler()

exports.nextJsFunc = https.onRequest((req, res) => {
    return nextJsServer.prepare().then(()=> nextJsHandle(req, res));
});