const { spawn } = require('child_process');
const path = require('path');

const IS_WINDOWS = process.platform === 'win32';

class CompilerCpp {
    static linux() {
        const CMD_PATH_NODE = `which node`;
        const LS_PATH_NODE = spawn(CMD_PATH_NODE, { shell: true });

        return new Promise((resolve, reject) => {

            try {
                let pathNode
                LS_PATH_NODE.stdout.on('data', (data) => {
                    pathNode = data.toString().trim();
                    pathNode = path.join(pathNode, '..', '..')

                    // COMPILAR C++
                    const COMPILER = 'gcc';
                    const OUT_NAMEFILE = 'addon.node';
                    const IN_NAMEFILE = './addon.cpp';

                    const PATH_RESOURCES = [`-I${path.join(pathNode, ...['include', 'node'])}`, `-L${path.join(pathNode, ...['lib'])}`];

                    const CMD_COMPILER = `${COMPILER} -o ${OUT_NAMEFILE} -shared -fPIC ${PATH_RESOURCES.join(' ')} ${IN_NAMEFILE}`;
                    const LS_COMPILER = spawn(CMD_COMPILER, { shell: true });

                    LS_COMPILER.stderr.on('data', (data) => {
                        console.error(`stderr: ${data}`);
                    });

                    LS_COMPILER.on('error', (err) => {
                        return reject(new Error(`Failed to start child process: ${err}`))
                    });

                    LS_COMPILER.on('close', (code) => {
                        console.log(`${code ? `Compilation failed with code ${code}` : 'Compilation successful'}`)
                        if (code) return reject(new Error(`Compilation failed with code ${code}`))
                        resolve()
                    });
                });

            } catch (error) { reject(error) }
        })
    }

    static windows() {
        return new Promise((resolve, reject) => {
            const CMD_BUILD = 'node-gyp build'
            const LS_BUILD = spawn(CMD_BUILD, { shell: true });


            try {

                LS_BUILD.on('error', (err) => {
                    return reject(new Error(`Failed to start child process: ${err}`))
                });

                LS_BUILD.on('close', (code) => {
                    console.log(`${code ? `Compilation failed with code ${code}` : 'Compilation successful'}`)
                    if (code) return reject(new Error(`Compilation failed with code ${code}`))
                    resolve()
                });

            } catch (error) { reject(error) }
        })
    }
}

module.exports = IS_WINDOWS ? CompilerCpp.windows : CompilerCpp.linux


