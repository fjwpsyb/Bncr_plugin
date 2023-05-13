/**
 * @author Doraemon
 * @name 常规签到爬取
 * @origin 红灯区
 * @version 1.0.7
 * @description 扫描某文档当天签到token
 * @rule ^(qdscan)$
 * @admin true
 * @public false
 * @priority 1000
 * @disable false
 * @cron 0 50 23 * * * 
  说明：
    1、在红灯区同级目录创建一个文件夹，名字随意 如：自用插件

       常规签到扫描.js 放到自用插件中

  ----------------------

  注意：
   1、简单测试可用
   2、无界超授可用
   3、自用插件
  ----------------------

  功能：
    1、每日定时扫描某常规签到token文档，自动匹配相关数据，省去人工的操作 （已实现）
    2、自动内联执行命令，触发 红灯区 店铺签到监控.js，执行相关任务 （已实现）
    3、通过自定义正则匹配 xxx份数据（份数太少，签了没意义 ）  （已实现）
    4、通过自定义设置匹配 具体的天数，比如我只要签2天的线报 （已实现）
  ----------------------

  更新日志：
      v1.0.0 插件上线
      v1.0.1 支持份数筛选
      2023.4.28 v1.0.2 支持处理未知深度的链接 比如 3天10豆下有多个链接
      2023.4.29 v1.0.3 支持一个线报中，多份数的过滤 如 3天10豆 7天100豆 100+50份，就按照总份数
      2023.5.5 v1.0.4 线报天数（regex） 支持一位或者多位
      2023.5.5 v1.0.5 内联执行 店铺签到清理 命令，具体功能详见 红灯区 - 店铺签到监控
      2023.5.6 v1.0.6 修改加密导致的bug
      2023.5.13 v1.0.7 修复cron 内联执行 店铺签到清理 造成的死循环问题， 改成静默执行
*/


 // 自定义签到监控别名 （如 1天1豆）
 const globalAlias = '1天1豆'

 // 自定义撤回时间
 const waitObj = { wait: 10 }

 // 文档地址（自己找文档地址）
 const url = '';

 // 如果你要取 2天 3天的数据，则填 2,3
 const regex = [2];

 // 份数，如填50，则只筛选50份以上的数据
 const globalLimit = 0;

 // 支持自定义时间：如4月25 （冗余，默认留空）
 const customDate = '';

 //插件入口
module.exports = async s => {
  /** Code Encryption Block[419fd178b7a37c9eae7b7426c4a04203e718ff222f9d0ceb298295aedf4e5c07fd2ee38f9e0975c19ad3328f204b4db5d43b681c2cf4271b7c40617e0d98e1de283a31bbad3a5dc7dd9aca0094d6a7fb9bd1c3445e7cb1b757d045820cbdec0f6d824cdb6a916cee7d81996f34be4bf753b46a589e32fffd0a48e48998363e396160f094a6cbf631897b6be3bc6fa09e12d5f8039686666925347475ea45d3cecef6da013ce0a628b4e3eaa4b5f92ffd31e76f9df67ae217db30cf43ba54dee6710dfd01e077610947b7137ea2c6e52bf7c3fd96514ce37c2f2b29dbdce237824c26fb765e7346a3c7166fe91418a5a19e658a9ad0ac1d28c865abdac12a8f1a9767a4d12424427d891a89d7997ec60545190ddd7563912ef73f32e511df6b3114700cea0010b10d0a3f9465b4de456425af1b52cf1c1cf655383007d271c33982f5fd252ff4af9e0a9cc0b9fa6c692b518eaaad50a641bcb74797f4c79c7d6607eb2db92f1483a20ebf9384b59b8353cf0fa3fb8768e097d5308fb7192e2273d7db0b6fab8fa46ab88bd0b3db4d2a413268aae6f87bae5ac81cdacad2ba0226dc612ded0d5790dc8e22688e8ff8b5c20d5ecadc400dacb1cb98d25c915dd05c99e94db4c7624f60c4d4bcdb297d10d6874964873189f86b807de54466033bde77e2592da902ccade89ba0c23b86e70e08a0b73f1c6dc8f6321006a72e16e23c5797e30232c49687d1bb3af7523ddf930a55846e72612890a363c9c2a173be8afd55252fdc039bd26308f9929ee2c54e1cca5ff29bf8efd940fc9624727abcc1da658246f4a349e8731985e465089c92c10f47e710c51efa8eeca6bd6df941c588bdb811a07f344ff6fc580fce3332b44df148c6c43415942b10f1ac1f3da028a2cd951fd91b0b4edd20e7d91cf2ddcf4a3f8b4dfd189e9d64fcce4fe8ebc5adb8f7f0753eb6653403da794d19877ea99ef0e1f9c7d41f372d64d8c21bfa946e6dd9961fe9c6a5cec47c07a58cb81b085202f5b916e8e693a4066dbd91e74aae4a6958d1a693b5f92809b29c85d543442efa1f6c32af3beb3c53959368f4eb951c71cca0d292fecacb810c89a912f70b6223176fab801ab56cb969b2cbe3ea78a65e80ce4fa3d9ba28c6752e129e4a94b1b327271fd13f3ee3fe293e541dddf85143dff35533a6662e16d738a273639d8a660e4c53300788e0818bf0d77e6a0a04bfaa3181dcb85ef777feeaedf6ba2680ab7ab06840a55db6bf56a5c03edf6f9ae9f54d2d1d64f73d18b14c46836ba475637139f6221e609063d6eebedbd990220a6663d45a202338e40c835aef9488d4ee1ce9d546f9c4b1901b28cd5755c825aa558d4d5f7402aea2f68cefa8fd42bba47e4ea993ee048014cebb5fc497f61bca78c26d4928b9a815567b6ef9176b42afdc6c4b73869b1338aaec147081ac30a8f6acd8973a3e7d2c9aeacf5920723dded60cea8c9f296584f8401e336599bba8251fbdb48af43a91e189891f6608abaa3f7738420ffa0f288d07a85994027029813697f263d90441d8ee7b54c93118e73892110c820ea7e1b5d9c1bcc4e79d2e57691320434bf88baa14c7d74586bfab3f25b3123d5a67786a10746660ed0a1ec0dfb36430f613a8a0763924bf571e201a0f6208d705a33e8cc1b5473e344fe03ac7062e8b4a02c000675d76904e1951a6b45a571bc34ba87710894c23dc34d314a86e730dc41ccad87882a73d3b4317285daabddd00bde8728060133bbc4838150200ac2986c39641932fe0e9cf95d4f61b6d4db5e112a30413dc73b3d2b8120b8d15611b9b2b15b3a16b68fa9a766fc18b81a0722540dfb81e44a4024c2cf70442ecbe8f33bf8f1e4696d0a08c5f9c24ef42bffb6ab2b113881ae197d0800ade9259469738db3999c244a1c722398b6c59283e3248669de2bb5c419f5c27202286e946883817d62f1a4a6aa64ed33771ed36a10eb751cb614e1d7060f7fc665e0ae5b1f766594f1286162478100b7b5b81b42a22b515c44e11503b42c51385eac837083c1314b0918afb7f6e6cc8db9eade667ea4cf2a690cbd1dd07d6b645360e450a22e07c7ac8b25e901df639364552da5c9f114aa292be24353234b23059482f90ce9e4490610909d4430b40a24aa1223ac2a2149bf36e661ad8b560be6756be91a8a5f694b62a6608167b595c05564c5aa7c61591da02131b8f2559bd8ac8091abcc78162bb860bd38ddef56267b082ca90528c3bdf6b18f80178994da6c90d2c91602cbe01c9d00cfd787b3a21b1c8687671e8f37a3e0c46425179165e8768a012733ff1d9adc0c1c6a56b946135db1c3f3db7bac400938c3bdfcff35013028f03050c9d4b42e3c0bde335e4050e47595e24f8a50dda19b0d3d130181ecdda64859ea0cb8144c538b86c10e340a8c77a7d825e149e4016fa2e4d06740058ceb81925e755807ebe86eac06fd85886bc5849a7e4fc09bb314e5fc838af3c24c3965a07033045cc776915637354e9483fab74c8092084cacd48063201268174d7398802db4eaeb6b0ce3551c3a5e2ba4356c6116334ef77edd5b7095f49030f368b9a4131ad339a31dd186bd44dd05ef7c8c75ada19282d900a2e15d303adfe714ebf104450f8a5ce6c59f8cd5e68b866d71d2178f474fa63db9eb45b58d3f9bbd5cdf07b63c31dcf2d41fc3f7df27a54a9698c7bbb4d84dbdcff43226223377c412dcea126237a31dd25d7decba2328879777e26e013d7548fd01d60b348a2f48d3cc519c4a6bae546e9704d8144e4cc3a61ea588d4648f39fdd647150fb1b1ea924fedd7d6a1ba0e9c7088a8bd7fa3e088cf451a80ac6a2c6561e9bd81845892e76c1fefd87a9a749d98452744402ce0fcdccb1fd10989859c29718efb3e9bba1c9634ded58f74c27faab25d5ed0d67eef60fb9aef4653b48ff3934555e395d249af9e6b62446565e23971daef46a27fe369960f309100b5d89a9b053b3c749c425b80e6d3cc33ca73b6aebacd3b168ab119340f1a9c10fc2cffc] */

  /**
   * 递归查询
   * @param {*} nextP nextP
   * @param {*} result result
   * @returns 
   */
  function extractLinks(nextP, result) {
    if (nextP.text().match(/https:\/\/[A-Za-z0-9\-\._~:\/\?#\[\]@!$&'\*\+,%;\=]*/)) {
      result.push(nextP.text().trim());
      return extractLinks(nextP.next('p'), result);
    }
    return result;
  }
};
 