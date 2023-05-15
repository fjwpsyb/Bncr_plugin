/**
 * @author Doraemon
 * @name 一键通知
 * @origin 红灯区
 * @version 1.0.0
 * @description 一键通知
 * @rule ^(一键推送) ([\s\S]+) ([\s\S]+)
 * @admin true
 * @public false
 * @priority 1000
 * @disable false
  说明：
    1、在红灯区同级目录创建一个文件夹，名字随意 如：自用插件 和 public
      一键通知.js 放到自用插件下

    2、触发示例
        一键推送 D 开卡啦，开冲
      或
        一键推送 all 开卡啦，开冲

  ----------------------

  注意：
   1、简单测试可用
   2、无界超授可用
   3、自用插件
  ----------------------

  功能：
   1、通过配置目标自定义名称 和 userId，达到针对单个人 或多个人 发送消息的功能
  ----------------------

  更新日志：
      v1.0.0 插件上线
*/

// 用户信息
const userInfo = [
  {
    name: 'D',
    userId: '5767715991'
  },
]

// 发送通知的平台
const platform = 'HumanTG'

//插件入口
module.exports = async s => {
  /** Code Encryption Block[419fd178b7a37c9eae7b7426c4a04203239aca94c6c66c31402c284dcdb6d205bdcbe7a526eebe0b2e9c3fdbcce47d1e4a425519352c1e60c15510bd32856a6fdeeaa9674b63de1b4ab9c90489f83df0d27c333351b6b030def0c46bd425a705b205f4f914f134ac00750f29fe2a23cb4978a082ce06497148e8688a87d4ab9d1b464ad3c64a078d30a524c403347191f4dcf455bdd69721382949b64af639fbbed7741c40a744eddf0f40e6a1a951b02321150369422b624562000f2e6663402acce527348f12b2521b489544280fe34371f0b2b4837157304bc5a72c6d18452d042548384ec4108a4ed9503973bc0e7dca05ef3d1545412bca333d8f41128bd6423cb84a4b556c777e5147153d2afcecd644c5dc5c64b2f64c22bab93e62af2480978dbf3d2c5fc39da4e9c3e32c5868e2b7fbe3469206be00c1d356c8de215c66c2a4f7ae4e8dcfe8bae6eb5d9446b6f1460dc8ededd9e8257d81a43c07b1e0b008c26c05865377c4a145571b3d5fd66f8ad375376be5d26d72419488221beb5204a12017921f32dddf01fc88a111653daa7c26a9fb94f5a5b9b9eff9dc4ef00707d146cb9a7828442dd81634d3d22c4b36b713518b1b3e414d034c7922174a6840559b97d7a3d91452dcc0fb3cce20d8b9d59141acca2d7950521c114aa060fbed9846173652dca2277f0ebff1da3b15ec79d8665490887955ae17f97ddd3fa23e794b029f2c3b5ca14dbbf5273fc36cb6f871f42c7a872ffcc6622d03d6087527917e549e7ff5bdf5a8b2d94abf6ef3650d4f0f59b2b0f7e4d7e3bbdf99311aa6de644cce878a42cfe5a6610b506ff2737546df5d0cf990044af0fec06976e2a5c2eca549dc6a0783e6efeeb3529ba2dbdfaa31aa7e0b78d9349823b1292ffce53baad25e5cb816dc44dd588eaa00c4b2b66337a80aba1fe3cfdf08ddc1e098b9a78ae7141e10a175f43e19909265df6458e5716aeb150cf6af25d8b393cace365e0ecf4be7f6a212abeafd68785a2b22dd5c97828cd72b55279db0c4a127df2aa6447aab1a56961b567a5bfa9979c10a3ebd98045478fb4c631f5bf355] */
};


