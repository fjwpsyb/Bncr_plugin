/**
 * @author Doraemon
 * @name Doraemon_ql方法公开说明文档
 * @origin 红灯区
 * @version 1.0.0
 * @description ql api方法公开说明文档
 * @rule ^(Doraemon_ql方法公开说明文档)$
 * @admin true
 * @public false
 * @priority 1000
   说明：
    1、在红灯区同级目录创建一个文件夹，名字随意 如：自用插件

        Doraemon_ql方法公开说明文档.js 放到自用插件下

    ---------------------
    
    功能：
      1、本仓库依赖主要是为了方便大家使用，所以把一些常用的方法公开出来，方便大家使用
      2、本仓库会不定期更新，如果有好的方法，会第一时间公开出来
      3、本仓库的方法依赖于mod下的文件，所以请勿删除mod下的文件，否则会报错
      4、如果你有好的方法，可以在issue里面提出来，我会第一时间更新

    ---------------------

    更新日志：
      v1.0.0 插件上线
 */

const ql = require('./mod/Doraemon_ql');
const Doraemon_tool = require('./mod/Doraemon_tool');

const log = require('log4js').getLogger('Doraemon_ql方法公开说明文档');
log.level = 'DEBUG';

module.exports = async s => {

  /**
   * 获取青龙host，tokenObj，以及新旧版本的id，是_id 还是 id
   * @param {*} qlNum 奶酪棒的面板管理数据，索引从0开始，0代表第一个账号，1代表第二个账号，以此类推
   * @returns 
   */
  const [host, tokenObj, versionId] = await Doraemon_tool.getQlHostAndToken(0);
  log.debug(host, tokenObj, versionId);

  /**
   * 获取青龙token (可废弃)
   * @param {*} host host
   * @param {*} client_id client_id
   * @param {*} client_secret client_secret
   */
  await ql.Get_QL_Token(host, client_id, client_secret);

  // --------------------- 定时任务相关 ---------------------

  /**
   * 根据关键词查询青龙脚本信息
   * @param {*} host host
   * @param {*} tokenObj tokenObj
   * @param {*} keyword 需要查询的脚本
   */
  await ql.searchQlCron (host, tokenObj, 'test.js');

  /**
   * 更新定时任务
   * @param {*} host host
   * @param {*} token token
   * @param {*} id 定时任务id
   * @param {*} name 任务名称
   * @param {*} command 脚本路径
   * @param {*} schedule 定时cron
   * @returns 
   */
  await ql.update_QL_Cron (host, tokenObj, 'P1bQBbU7GvsaFh1', '任务名称', '脚本路径', '定时cron', versionId)

  /**
   * 启动青龙任务
   * @param {*} host host
   * @param {*} token tokenObj
   * @param {*} body id数组 ['xxx','xxxx']
   * @returns 
   */
  await ql.start_QL_Crons(host, tokenObj, ['P1bQBbU7GvsaFh1']);

  /**
   * 停止青龙任务
   * @param {*} host host
   * @param {*} token tokenObj
   * @param {*} body id数组 ['xxx','xxxx']
   * @returns 
   */
  await ql.stopQlCrons(host, tokenObj, ['P1bQBbU7GvsaFh1']);

  /**
   * 添加青龙任务
   * @param {*} host host
   * @param {*} token token
   * @param {*} body body.command body.schedule body.name
   * @returns 
   */
  await ql.addQlCron(host, tokenObj, {command: '', schedule: '', name: ''});

  // --------------------- 日志相关 ---------------------

  /**
   * 获取指定青龙日志
   * @param {*} host host
   * @param {*} tokenObj tokenObj
   * @param {*} id 任务id
   */
  await ql.getQlLog(host, tokenObj, 'P1bQBbU7GvsaFh1');


  // --------------------- 环境变量相关 ---------------------

  /**
   * 青龙环境变量移动
   * @param {*} host host
   * @param {*} token tokenObj
   * @param {*} id 环境变量的id值
   * @param {*} body fromIndex 从哪个索引移动 toIndex 移动到哪个索引
   * @returns 
   */
  await ql.moveEnvPosition(host, tokenObj, 'P1bQBbU7GvsaFh1', {
    "fromIndex": 0,
    "toIndex": 1
  });

  /**
   * 删除指定环境变量
   * @param {*} host host
   * @param {*} token token
   * @param {*} idArr id数组 ['xxx','xxxx']
   * @returns 
   */
  await ql.removeEnvs(host, tokenObj, ['P1bQBbU7GvsaFh1']);

  /**
   * 添加青龙环境变量
   * @param {*} host host
   * @param {*} token token
   * @param {*} body body [{"value": "变量值","name": "变量名","remarks": "备注"}]
   * @returns 
   */
  await ql.add_QL_Envs(host, tokenObj, [{"value": "变量值","name": "变量名","remarks": "备注"}]);


  /**
   * 获取青龙环境变量
   * @param {*} host ip地址
   * @param {*} token token
   * @param {*} searchValue 搜索条件 为空，则查询全部
   */
  await ql.Get_QL_Envs(host, tokenObj, 'JD_COOKIE');

  /**
   * 更新青龙环境变量
   * @param {*} host host
   * @param {*} token token
   * @param {*} body body.value：值 body.name：名称 body.remarks：备注
   * @returns 
   */
  await ql.update_QL_Env(host, tokenObj, {
    "value": '',
    "name": '',
    "remarks": '',
    [versionId]: 'P1bQBbU7GvsaFh1'
  });

  /**
   * 启用环境变量
   * @param {*} host host
   * @param {*} token token
   * @param {*} body id 数组 [0,1,2]
   * @returns 
   */
  await ql.enable_QL_Env(host, tokenObj, ['P1bQBbU7GvsaFh1']);

  /**
   * 禁用环境变量
   * @param {*} host host
   * @param {*} token token
   * @param {*} body id 数组 [0,1,2]
   * @returns 
   */
  await ql.disable_QL_Env(host, tokenObj, ['P1bQBbU7GvsaFh1']);

  // --------------------- 配置相关 ---------------------

  /**
   * 更新青龙配置文件
   * @param {*} host host
   * @param {*} token token
   * @param {*} filename 文件名
   * @param {*} content 内容
   * @returns 
   */
  await ql.update_QL_Config(host, tokenObj, 'config.sh', '内容');

  /**
   * 更新青龙配置文件变量
   * @param {*} host host
   * @param {*} token token
   * @param {*} envs 需要替换的变量数据 [{name: 'test', value: '666'}]
   * @returns 
   */
  await ql.modify_QL_Config(host, tokenObj, envs);

  /**
   * 获取青龙配置文件变量
   * @param {*} host host
   * @param {*} token token
   * @param {*} filename 文件名
   * @returns 
   */
  await ql.get_QL_Config(host, tokenObj, 'config.sh')

  /**
   * 获取青龙配置文件中指定key数据
   * @param {*} host 
   * @param {*} token 
   * @param {*} variableArr key [{name: 'test'}] 数组
   * @returns 
   */
  await ql.getQlConfigCustomValue (host, tokenObj, [  
    { name: 'test'},
  ])
}
