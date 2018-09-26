#!/usr/bin/env node
console.log("hello, world23", process.argv[2]);
// process.on('CL',function(data){
//     console.log("here get a: ", data);
// })
// process.on('END', function(){
//     process.exit(0);
// })
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
    console.log("文件不存在")
}
let data = fs.readFileSync(process.argv[2], CONST.FILETYPE);
data = data.split("\n");
console.log(data);
data.map((line,index)=>{
    if(line.indexOf("#") === 0){
        console.log(line);
        let newLine = getHn(line);
        data[index] += "<a id=" + newLine.id + "></a>"
        indexStr.push(genContent(newLine));
        // console.log(genContent(getHn(line)));
        console.log(indexStr)
        console.log(line, data[index])
    }
});
let newData = indexStr.concat(data).join("\n");
fs.writeFileSync(process.argv[2], newData);
console.log("添加成功")
// 截取字段
function getHn(line){
    let id = genId();
    let result = {h: line.indexOf(" ") - line.indexOf("#"), t:line.substr(line.indexOf(" ")+1), id:id};
    line += "<a id=" + id + "></a>"
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


