#!/usr/bin/env node
let CONST = {
    "FILETYPE": "UTF-8",
    // 第一个 ### 标题的 # 个数
    "FIRSTHN": 2,
    "TAB": "  ",
    // "TAB": "\t",
}
let uniqIds = [];
let indexStr = ["# 目录"];
let fs = require('fs');
if(!fs.existsSync(process.argv[2])){
    console.log("文件不存在");
    process.exit(1);
}
let data = fs.readFileSync(process.argv[2], CONST.FILETYPE);
data = data.split("\n");
console.log(data);
data.map((line,index)=>{
    if(line.indexOf("#") === 0){
        let newLine = getHn(line);
        data[index] += "<a id=" + newLine.id + "></a>"
        indexStr.push(genContent(newLine));
        // console.log(genContent(getHn(line)));
    }
});
let newData = indexStr.concat(data).join("\n");
fs.writeFileSync(process.argv[2], newData);
console.log("添加成功，共添加 ",indexStr.length - 1 ," 个目录" )

/**
 * util 类型函数
 */
// 截取字段
function getHn(line){
    let id = genId();
    let result = {h: line.indexOf(" ") - line.indexOf("#"), t:line.substr(line.indexOf(" ")+1), id:id};
    return result;
}
// 生成 id
function genId(){
    let id = ("" + Math.random()).substr(2,5);
    while(uniqIds.indexOf(id) > -1){
        id = Math.random().substr(2,5);
    }
    uniqIds.push(id);
    return id;
}
// 生成
function genContent(h){
    let tabs = "";
    for(let i = 0;i<h.h - CONST.FIRSTHN;i++){
        // 可能使用两个空格
        tabs += CONST.TAB;
    }
    return tabs + "- [" + h.t +"]" + "(#" + h.id + ")";
}


