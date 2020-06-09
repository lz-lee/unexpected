const fs = require('fs');
const path = require('path');
const babylon = require('babylon');
const traverse = require('babel-traverse').default;
const { tarnsformFromAst } = require('babel-core');

function bundle(dependencies, entry) {
    let modules = '';
    // 构建 modules  结构为
    // { './entry.js': function(module, exports, require) { xxxx }}
    dependencies.forEach(dep => {
        const filePath = dep.relativePath || entry;
        modules += `'${filePath}': (
            function(module, exports, require) { ${dep.code} }
        )`;
    });
    // 构建 require 函数， 为了获取模块暴出来的内容
    const result = `
        (function(modules) {
            function require(id) {
                // 构造一个 CommonJS 导出代码
                const module = { exports: {} };
                // 根据 id （即文件的相对路径） 去参数中获取文件对应的函数并执行
                modules[id](module, module.exports, require);
                return module.exports;
            }
            require('${entry}');
        })(${modules});
    `;
    fs.writeFileSync('./bundle.js', result);
}

// 获取所有的文件依赖关系
function getDependencies(entry) {
    // 读取入口文件
    const entryObj = readCode(entry);
    const dependencies = [entryObj];

    // 遍历所有文件依赖关系
    for (const asset of dependencies) {
        // 获取文件目录
        const dirname = path.dirname(asset.path);
        // 遍历当前文件依赖关系
        asset.dependencies.forEach(relativePath => {
            // 获取绝对路径
            const absolutePath = path.join(dirname, relativePath);
            // css 文件的逻辑是将代码插入到 `style` 标签中
            if (/\.css$/.test(absolutePath)) {
                const content = fs.readFileSync(absolutePath, 'utf8');
                const code = `
                    const style = document.createElement('style');;
                    style.innerText = ${JSON.stringify(content).replace(/\\r\\n/g, '')};
                    document.head.appendChild(style);;
                `;
                dependencies.push({
                    path: absolutePath,
                    relativePath,
                    dependencies: [],
                    code
                });
            } else {
                // 对于 js 代码需要继续查找是否有依赖关系
                const child = readCode(absolutePath);
                child.relativePath = relativePath;
                dependencies.push(child);
            }
        });
    }

    return dependencies;
}


function readCode(path) {
    const content = fs.readFileSync(path, 'utf-8');
    // 生成 ast
    const ast = babylon.parse(content, { sourceType: 'module' });

    const dependencies = [];
    // 寻找当前依赖关系
    traverse(ast, {
        ImportDeclaration: ({ node }) => {
            dependencies.push(node.source.value);
        }
    });

    // 通过 ast 将代码转为 ES5
    const { code } = tarnsformFromAst(ast, null, {
        presets: ['env']
    });

    return {
        path,
        dependencies,
        code
    };
}


