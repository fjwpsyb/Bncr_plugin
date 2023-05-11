/**
 * @author Doraemon
 * @name AmQlMod方法公开说明文档
 * @origin Doraemon
 * @version 1.0.5
 * @description AmQlMod方法公开说明文档
 * @rule ^(test3)$
 * @admin true
 * @public false
 * @priority 1000
 */

let waitObj = { wait: 10 }
const QlMod = require("../红灯区/mod/AmQlMod")

//要执行的容器序号
let i = 0
 //插件入口
module.exports = async s => {
    
    let qlDb = await QlMod.GetQlDataBase()
    let qlDbArr = qlDb["data"] || []
    console.log(qlDbArr);
    //未配置奶酪
    if (qlDbArr.length == 0) return s.reply('请先发“面板管理”添加面板')

    /* 获取青龙青龙面板版本号 */
    console.log(JSON.stringify(await QlMod.GetQlVersion(qlDbArr, i)));

    /************* 配置文件相关****************/
    /* 获取配置文件 */
    console.log(await QlMod.GetQlConfig(qlDbArr, i, 'config.sh'));

    // /* 保存配置文件 */
    // log(JSON.stringify(QlMod.UpdateQlConfig(qlDbArr, i, 'config.sh', '需要保存的Str')))   //慎用，注释了，运行的时候

    // /************* 定时任务相关****************/
    // /* 获取所有任务 */
    // log(JSON.stringify(QlMod.GetQlAllCrons(qlDbArr, i)))

    // /* 运行、更新、启用和禁用 
    //  * 第三个参数 任务名字或脚本名关键词，方法内部会先读取所有任务-遍历所有任务找出包含关键词的任务
    //  * 第四个参数 可选：stop停止 run运行 disable禁用 enable启用 pin置顶 unpin取消置顶
    //  * 第五个参数 布尔值，false 或不填 则会调用方法内部选择器(如果有多个，否则直接返回数据)让用户选择一个，true返回找到的第一个任务
    //  */
    // log(JSON.stringify(QlMod.PutQlCrons(s,qlDbArr, i, 'test.js', 'stop', false)))

    // /* 获取脚本状态 参数同上*/
    // console.log(JSON.stringify(await QlMod.GetQlCronsStatus(s,qlDbArr, i, 'KingRan_KR/jd_sevenDay.js', false)));

    // /* 获取任务日志 */
    // console.log(JSON.stringify(await QlMod.GetQlCronsLogs(s, qlDbArr, i, 'KingRan_KR/jd_sevenDay.js', true)));

    // /* 删除定时任务 */
    // log(JSON.stringify(QlMod.DelQlCrons(s,qlDbArr, i, 'test.js', false)))

    // /* 添加任务，传用户名参数调用后，函数内部有询问器，会询问后续流程 */
    // log(JSON.stringify(QlMod.AddQlCrons(s,qlDbArr, i, '任务名')))

    // /* 修改任务  这个方法内部太臃肿，后期优化*/
    // log(JSON.stringify(QlMod.EditQlCrons(s,qlDbArr, i, 'test.js')))

    // /************* 环境变量相关****************/
    // /* 获取所有环境变量 */
    // console.log(JSON.stringify(await QlMod.GetQlAllEnvs(qlDbArr, i)));

    /* 查找环境变量 
      {
        value: '',
        _id: '08WF2V7ZkdSLi0BB',
        created: 1681037010781,
        status: 0,
        timestamp: 'Sun Apr 16 2023 19:17:32 GMT+0800 (中国标准时间)',
        position: 4.930380657138286e-22,
        name: 'JD_R_WSCK',
        remarks: '@@1681037015000@@'
      }
    */
    console.log(JSON.stringify(await QlMod.SearchQlEnvs(qlDbArr, i, "JD_COOKIE")));

    /* 添加环境变量  { status: true, data: '', msg: 'ok' } */
    /*
    console.log(JSON.stringify(QlMod.AddQlEnvs(qlDbArr, i, [{
        "value": "ssssssssssssssss", //变量
        "name": 'bbbbbbbbbb',   //变量名
        "remarks": "cccccccccc" //备注
    },
    {
        "value": "111", //变量
        "name": '22',   //变量名
        "remarks": "33" //备注
    }])));
    */

    /* 更新环境变量 */
    /*
    console.log(
        JSON.stringify(QlMod.EditQlEnvs(qlDbArr, i, {
        "value": "111", //变量
        "name": '22',   //变量名
        "remarks": "33",//备注
        "id": '1'  //id或_id
    }))
    );
    */

    /* 
      启用和禁用环境变量  315为id 
      { 
        status: true, 
        data: '', 
        msg: 'ok' 
      }
    */
    // log(JSON.stringify(QlMod.PutQlEnvs(qlDbArr, i, "enable", "315")))
    // log(JSON.stringify(QlMod.PutQlEnvs(qlDbArr, i, "disable", "315")))

    // /* 删除环境变量 */
    // log(JSON.stringify(QlMod.DelQlEnvs(qlDbArr, i, "315")))

    // /* 移动环境变量  5-1 */
    // log(JSON.stringify(QlMod.MoveQlEnvs(qlDbArr, i, '315', { "fromIndex": 5, "toIndex": 1 })))


    // /************* 订阅相关****************/
    // /* 获取所有订阅任务 */
    // log(JSON.stringify(QlMod.GetQlAllSubscribe(qlDbArr, i)))

    // /* 运行、更新、启用禁用*/
    // /* 
    //  * 第三个参数 任务名字或脚本名关键词，方法内部会先读取所有任务-遍历所有任务找出包含关键词的任务
    //  * 第四个参数 可选： stop停止 run运行 disable禁用 enable启用
    //  * 第五个参数 布尔值，false 或不填 则会调用方法内部选择器(如果有多个，否则直接返回数据)让用户选择一个，true返回找到的第一个任务
    //  */
    // log(JSON.stringify(QlMod.PutQlSubscribe(s,qlDbArr, i, "关键词", "stop", false)))

    // /* 获取订阅日志 */
    // log(JSON.stringify(QlMod.GetQlSubscribeLogs(s,qlDbArr, i, '关键词', false)))

    // /* 删除订阅 */
    // log(JSON.stringify(QlMod.DelQlSubscribe(s,qlDbArr, i, '关键词', false)))


    // 口令转url
    // let { status, data } = await AmTool.jdCodeToUrl('');
    // // 隐藏pin 保留前1 后 1
    // let userName = AmTool.Masking('', 1, 1),

    // 获取青龙token api
    const token = await QlMod.GetQlDbToken(qlDbArr, i)
    console.log(token);
}