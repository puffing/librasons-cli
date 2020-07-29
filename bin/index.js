#!/usr/bin/env node

const fs = require('fs');//Node.js内置的文件系统模块
const path = require('path');//路径处理模块
const chalk = require('chalk');//可改变输出log颜色的工具
const commander = require('commander');//可处理控制台命令的工具
const inquirer = require('inquirer');//可用于控制台选择的工具
const checkDire = require('./utils/checkDire.js');
const { exec } = require('child_process');//创建子进程的方式,exec表示异步
const { version } = require('../package.json');
const { promptTypeList } = require('./config');

function resolve(dir) {
    return path.join(__dirname,'..',dir);
}

//version 版本号
commander.version(version, '-v, --version')
    .command('init <projectName>')//自定义执行的命令
    .alias("i")//执行命令的别名
    .description("输入项目名称，初始化项目模版")//命令描述
    .action(async (projectName,cmd) => {//执行命令后所执行的方法
        await checkDire(path.join(process.cwd(),projectName),projectName);   // 等待检测创建项目文件夹是否存在
        inquirer.prompt(promptTypeList).then(result => {
            const {url, gitName, val} = result.type;
            console.log("您选择的模版类型信息如下：" + val);
            console.log('项目初始化拷贝获取中...');
            if(!url){
                console.log(chalk.red(`${val} 该类型暂不支持...`));
                process.exit(1);//非0表示执行失败
            }
            exec('git clone ' + url, function (error, stdout, stderr) {//error是一个对象,stdout是执行的子进程中使用标准输出的信息,stderr是子进程中错误输出流的内容
                if (error !== null) {//error不为null表示失败
                    console.log(chalk.red(
                        `clone fail,${error}`
                    ));
                    return;
                }
                fs.rename(gitName, projectName, (err)=>{//把gitName重命名为projectName
                    if (err) {
                        exec('rm -rf '+gitName, function (err, out) {});//调用一个shell命令删除文件
                        console.log(chalk.red(`The ${projectName} project template already exist`));
                    } else {
                        console.log(chalk.green(`The ${projectName} project template successfully create(项目模版创建成功)`));
                    }
                });
            });
        })
    });
commander.parse(process.argv);//解析命令行参数(注意:这个方法一定要放到最后调用)
