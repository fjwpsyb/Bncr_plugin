/**
 * @author Doraemon
 * @name Doraemon_一键操作
 * @origin 红灯区
 * @version v1.0.6
 * @description 一键操作
 * @rule ^(一键开卡) ([0-9]+) ([0-9]+)
 * @rule ^(关注有礼) ([0-9]+)$
 * @rule ^(E卡查询|e卡查询) ([0-9]+) ([0-9]+)$
 * @admin true
 * @public false
 * @priority 666
  说明：
    1、在红灯区同级目录创建一个文件夹，名字随意 如：自用插件
       Doraemon_一键操作.js 放到自用插件中

    2、设置一些变量
    （必填）执行面板 对应红灯区奶酪棒位置，从0开始
      set Doraemon OneClickOperation_qlIndex xxx

  示例：
    一键开卡 shopId venderId （非管理员不可触发）

    关注有礼 12276329 （非管理员不可触发）

  （第一个数字是哪个面板，从 1 开始，第二个数字是ck索引，从 1 开始）

    E卡查询 1 666

  注意：
   1、无界超授可用
   2、自用插件
   3、简单测试可用
   4、需要代理
  ----------------------

  功能：
    1）、主动入店铺会员，方便跑组队或者一些其他活动（已实现）
    2）、直接通过链接识别shopId venderId，并开卡（待实现）
    3) 、根据shopId 获取店铺venderId 内置执行M关注有礼 M_FOLLOW_SHOP_ARGV / jd_shopFollowGiftId （已实现）
  ----------------------

  更新日志：
      v1.0.0 插件上线
      2023.7.17 v1.0.1 新增命令：关注有礼
      2023.8.3  v1.0.3 优化关注有礼 业务逻辑
      2023.8.9  v1.0.4 优化关注有礼 错误处理
      2023.8.9  v1.0.5 新增命令：E卡查询
      2023.8.23 v1.0.6 优化E卡查询业务逻辑 索引从1开始
*/
const dayjs = require('dayjs');
const Doraemon_tool = require('./mod/Doraemon_tool');
const wx_active_tool = require('./mod/wx_active_tool');

//插件入口
module.exports = async s => {
  /** Code Encryption Block[419fd178b7a37c9eae7b7426c4a04203a0d819e33b5fd30cd3886b60c74fedb0797ef168937d95964412780450de031a9273995da106642b54dc2ee9d3849c470c2c216eaed889bb13dc0d143d04c9c5a63e611dbd3b7d1e53c2e2afaa30965c3bf92e82dac434c5a4749e6c4f744c3c9b59c07cc32e8988decfeea59f8432cbdee30fec801513ad423c2e912cac46b3142fffe8c78049d606a3f28d2ca303a3f6554d42fce0ab5084d85e6e56a415d1c63d5efe57896f75233ac32ec21f165d3f71d6e63fc0c585ff0f2d8a92967051d04f53e082b70f82cb10cf7bd5aab8883f8bcf436529458c9cf8e702be9f143d4d50e24874e9aed73cb22744f20e1aef3d36ab60d7ae6f8df3d83fbdbea9a4547d881d57737c68485a08dab837d0e2bbeb113901533d8aa40197af25f68c64ec63387915240ff5ad846d6210c76f9460624c989a7701e09381e84fd0ea75977266255ac2fc6da0f918c63ebfbd4bd07281e2ec11db426c7bce265887d0de5697abd85910b4c19526482d6cbf7d312ed8fe2ab15cdc5dfb2a4e8d1028610f73bcb742ee0e2f8ded52b8f877bd99506150da66d97c3769c363f7c23c3fcc487c0c2bfee4c00d3c164a6569f0d3e449e9820ab0fc3cd3c805d6ce2ced455f2c757d181c9e4bd74a0106627450ad98db33ea9cbac5649e3010bc63ee31f9836069e172d1948a7d67abf13a3fe56d964fe117145718ecca047225f7226361965bdf99393833b65908b284285efe773a4ac5295654391bd895352690435b50157e5dfe94481b428482617121d3909b38134affa140366d699c9b8c9e69aec6679eb4f2b1617aa4c6fa49652e45529d71f5a92f5504954e6223eff797975640c9ab470ee3e11ada9d23624c9e148b65432256fb872d788ea2d8db879e57ca96a456c738009a1313ef6e970c9b93b4f4fade710c6a8be8077cab525b4d97bf31f99057b368e21098a820b06271ab9de54950562530fee1d98e68d27da65b531692a3b31ff33aeb1e193222c0d96d52e809e86855bd72f3d644f3d4d8687c14b54a6007c067d4386fbcdda7a9258f32c3122494ef8f84be1a63405be29a409265fcec6b50ed7d8d58049b44c4b0bfdb544a5da16ba3b0a6673daf5eec6c2cd2bb76b93920a66b0273572fb64cd04ba1980eeb5b5b7f13528eac69fb2089d41605aa8be0bc85d66f8d51c513d1b46bea5a972217098fc29861a257839b2072fceca9ed6e016cf87e33e3f083bf224c1fc834a02f83d33065047f4f940b252a5c30095e63d25f61741cd04fe820b03047b77b10debde5943975a3c779f217b94781f18f55e1efc82278eeff4702943eb6ba86e202f34a85784e08f693d492d0476f47e9ef1ae27407382cc8a249096de51337c6c90a9a0428ddb63c8d6366171dde9307aeaae874bf8e9e5a1ddb952e76fc47e95d30b601085aa175ee9ab45dd61d3d04d310ef757d492379d04ce03267537a8b292e16b9819166ba19b9149b24e794da4656f2b67f875a3e4fce482cf36ea51afe667745aff67b0303955778e16ba29cfffe38d363d48acaac1d9be9f3512e448f79ce7a387b04e98beeb12fea5a7d42ddad8f8ed379ffdfbf8c20e9b33759ea0f86fda63015472b9c6b3da13c8cb974cc51300209ddc571c28d7d762352cc22c73c5263e67667559225d4a5454d9c86c7f4e55d591499871197fd19810183060bc64fc8749cb203dfd3bd200f3df1a46466c2dff97e86b710c01df1acd81021482c11804f46c277315858289e2a2ee3cee22f776d9fd47cffe8feeb21d6e1842756d703ddc9aa7f314f4fb6005a70ba2fbc882e4e23333804b1ae82b0918e06b9833fcaa42302b7e90f6db8fede25fef5a30f307d6ae1bc4c32c4a5063d86e0628932f7b2f391368f4b95154641b5e74d104e82750d27867016249c491fb697575a7cf68cc72c1c027690b6902a345b6a8f2cd3bde1a8a15477c84500f113cbf96cd8e26f8ace299a432c8b1a0de5b32e4559088d021a20c4290b5069397cb67b2c902f816ca62f1eed8b71d4d2b90f54e5578b1d9563edcd894bdc149759ae3c595325106d8a60282c8a9712bbe8747ca1839130e435b711575ac10b178acdece9b8853ea5b868513d0aca0dcb1618f2901d124c19c54cf8072d257e07a1ce8dce5b6df6fb35ef013a7553aeeb5689f5e5399991da151b870a4e763cb292d25aa1c5a475d61e7423558ad1b52e90ca0bb74e9d9d268ea93fb1b517bdef5a04fd7269fc034d2765e06b3da46538f5c6dd1addb0250d3b79d7f50b96d6f17a538d589f5a5db5d3be0143281a740dd2fd4be02f85ac8244fb7c1b113489f362a35f29bd2bc1775c025c65a8e599ec43a442888cf84bac1a9acc8d394df2539740317db14793a30565cdcdbfa3fd71cdbea3e2bee97bd03f8f6e22cac86c51e9d82839d6fa3bcf973f306e5a48c046aae7c53112aa19bebbe3817c9ff054e90abafd5b77506687585b627f4ed07b487820371806760e771f303ca0d98729d15fa8d12851285152cb2abd2be851e400eacf2e9a30e545a57be69edf58f23b8d871b9e7aeb6e7be182e88292f840c510d66dc2e42a08645d723a7588d2fdc3511f72b98cbfe47045634b5600e30998a3b582b5bf6ac762d85cc486aeeea93a3c1e1e92aeb563a7474763cb859e9773ce8f6b8dc29cccdde70ce911776a3e2c2de761a861ea8d80fc8997bffc233d9ad4266830ac34eefb6b9970754089d640b86aeffa9e0bcf79a0d96866b22f442c089a685e019e310fe71e4d86ac63d5245499ef53cd1b2f0f129395dad5a92ce58dc96d1e7edc1198342db5ae68e54dfdffb26e73851eafeb71f5faf8bb04f7950b15430373aed33385a7ceefbdaa7eae227858fe7a84f6fd74942066d289c189f357033e8498d933ee21957267090c4a80be2ee4f6111bba59481e7039d147a0973b4c8ddb2fa119805e5a6471cd396dde553540f0a6dd77a0bbe9eb27f97ba50d0322d389245c422d0829ba02ef1a6c4d6463aef56bdb94a2ccf1efec041a1aa3b0638950e57bd342cdb92b0de68dff799c18421ece63dd36893fbb8fcd9d37b6b53cc2f512ee5fd579bd92347d5d5150e6c0a9a7e9a1f77d42a1dca7171f3b48f1181e0e40b6ba629ac3e67b2ebba9daeb8f2a0ffcc5adadf7e578c3e0951b02f5444c4b90f2e97e841a3d5358997cac76ece2fa195f18ca11ad0feaaf3f4aa2b95fb4efa0096708dec3a090c5dfb3eaff078366a623dda48e8a204f62c9df39a06ae288e1e0fd8cd7597885a607d396206ce690f3532b2a7fd2980033e62ebf508dc8facf05ea0c918b7c24419ed3fedbb64990495e2bd9d420887ef6924614c4e798f26efaf07fbf87ef6cea30b3452757dad22bd0aff4b9b8e1a329fda7c566f14640039a9bf3f8e0f905265e1bc4fadbbcee8011270865a00daeb8563e90a01efe1e5ad2eba549eaefbfbe4cbe439781df345c5356a953265f269e64c790c95dacfa28519ae804c57aeca0fda5a8727a96bda67fb77c73043a9e64f729c5d90c21198fa404da929a9bcfd764452a508ded28410b6a1d6f18fe92a407dbfd61dac5b0a6f289af4a26584ff02d736d6678ed54e50d79232701397d0b8e771aa1c987e7d88a52ea7135aff28291776750d9ac2c03ae3b7390e6b17773dcaa3bc46bbfda87f07023be0a7d6652a8c82300162ec3d5f3fcb3d63065625ffc9c4c20775a800287eeedff1fc3eae99247aeda48f1c564c8d76479a24336d66cd3a1fde2f434144516af6f1dacd4e1bd8b95fdc2f420941ddfa5e2a86ce61702f95b6042d5b6cbfbbf390ac57655f61daf1acbe3b4fab58059edca19398c0c3b40ddb81b755056900121479e60b8e06c9c8e067168d5b34f27951500c691f4e45e9918e0750b40ca631fefdf68b45d75703d0673f18f5087c52d37d1a312bab9fcd3828485b97a691846b967c577940942b224234eb462f6b29ea93698fdb08009af9387f8c6376d4de2cd6e9fdf97f50d189d7301907a1e7d5ce9825277e32d6537fcd3a952c3778ad42afd9bb50eaf0e55ff658fdd5b4a0d2ac4acda79d9ac55687d9b3409417fcecd09fa8e7b3e4a2e2cca3bee49095711d383eaa5cbc7d26544b6781e62671bc1a8721e74b70bacf57c01192c2f9016ba310f62bf22542f928a591089d99382f30a97125e48797bd8da1593ef982e449faff054bc8e5b5a9a6f78d260f54b4017574104be0a0f3ea13e10eddbea39a063b12ef67e99c661b3d9ebddd8844364f696e185a1a35298e1782aed985e36b8fad5b15c0adf02c89f01d344e6b683d191319ab5a1491a90f9fc79f7a294453eb53159761ec770e0ec842cade2b8fb0565ea9ecfec73dde80e98cf5c4ea28b223a6dd7dba48dc5020ad60e68a398f92064594336342aa544409840b1aca98c6e3e722ffba4f474764e7ae6c795bd76cd944564d9066a0f0e5775a92ab0e800bd65b3c7bb82508039c111ac65d09aa92e8a721396687f19522a5fb50e6ebe5a5db7f42d05ec5c588f9501b0bedfaf3ba49c9bac90248db3b4a3d7f5aa9aafa879ddfd49b9ebb7c5baee124f69dcdee231f13d6299cb6f78d42abc2701265366c276cf503f98477816c97899c3b21b5289bbc6e200f6289fda949e246de41107de40799fc7f0d279be95bf27ecbc30597d825a20a322eeab3b99c2483bb54339d607ad9b6ee8e65a399abecc7bcce01fb1c0bb8056a20e5fd515049eb8c0e2909c9ca4ac38da24980acc7d8bd1c4e4209bd2a70a97c4abcc566848d99d143ff6ffded6229beef67335544c426cf1843b95948c39bc52c150fc218ff1136f26fc15dd40ebed488d5bf49777a5602daae9f5ca74faecc6f9aa81c961790cf7fe16cf606ead1d6e6cc11fdbf6caa5dbee690c27c2e7931f116716d1dde3a5a8c5b4cb8f090fdabffa11e2646a3c17aa8d51ac4547e81d1d6c882b4d8020ebe93cdff45651e051c07ed65fe571e7109149381f2866b21b88bdc82a17d5bf4d92f6f057293bbd4ee61913342beca0d9873bf84a4b5e93b407046ba8a180cf9fa8b25877a2fe59dac8127abcf554d045b253a65b7e181fdfb02ea1f2eabd935e8f0576726e9c33f0abffa7ff976b6b266605a8663ffd76f56c7b54a3ba77b77c9dc3ecf9015869e3ad09af5a0fb8a1e64132c68af90f208915988966eb1c6e7f465ca209e141a524297b9dd1e12583886ec7c07675408dd342cd8724caf5046f8862a4c4d310dee796bee055ff20cabc23cfd1f84c93bdfc8ca6022acf102c4746643b5d9a510fb414e4714be2b3a3757b4f3a16c3a557708c78af85997a0f9c61de041e03e2fdfb3b38691de0ce1f3eae45fa76b86daf2d9b3eae4deecc8e090467d8db871925328b8f4512a70829b6c4a3e25d05aa76fff38f69f460c867fdaccead53fce14a2bd764357df0951c1c5e8f96a7243483d0c16856e8d560fec815516eb721c55ab3fd09ecf296e0ad0483e10c809a3a42a5e97bc297e819d6fe76eb16ad80b0d4d80ce9135bba2c5aa4662aa91b8fadbdfece45b4cbf5b7b1c58180acdc8e5dea756981b78542431efdeb6fc2019d24c516ecca5f014b6fc3761344e4f4499cee50128284e4266deae0d519957f3f8236d6c8db55575d3a97a730edca19c3bbc18b41cde929cd7e096228bed1c5717367aaece127fca71883e372e1f2e92f630349fd18e9da5227091cbdf5deb055b3d43c60f093a156f9c02a3a2772f7d8c84ec30218f0832084c610d7636dd4f609340535c8849e439023123cd6d6e9832517d62842d8161e7a03bec9e6c834fd9322dd9dbb19b275637d1529709f1f127c1d272735811e1a52e41ab8e72aa58c113516d6812951adee03f5e1e1da96243a2d769076aa5d6121f53376a0d33ca0a2aa1c5b870d0d9551f6ec9e9c46fa904580079dd9b9b2483ba93105f5160ad2c6c08dde8750bbe56a0fa6a389bf44e2be9c3429f33b63813bb33f07188f8eccc3c3e3eb79bb0124d714fdc53c5e9a26c71410307ce1bac5210c7cc8fcaaa298f5832b028994f22ba26aad850e85a11a27dad832c44080d371ea0c7a6ebe69d4eef9c3be37fafd66502758a9cc2371577a9bd317beb1a0642a1154535adbed0d86dd70184fb4fe226fb88b42ecd8d9d86c7ea65e859edd6f174ea20cd0677663a96303d89b0f0ed636e340f40cf629727fff38af8801bfad2a5e5e7cd62b65b4240e7468fa7208713de0ddd1f981fcaa0f173aada27f7d7462158222ed0b4fe6be637b2ecdf2bf859321c1d375e7b8e3a82c0ec2a39997cb56299cfe640a857433b965006521ce35a499c919dd5f785ca288a5b4560a8567a8505024a9fa9d040c0d38030a80b0c7126c386219b313782001eaa7f06030b081ef241d9309aa500e60e43462fa044b93c71011d43799d2f8468f2fc60dcb1cdb748ffc268e9feaad8bf480a08515736998236e87f7d6c99f504deda589b1e665795e3373a721e890e9c0467c7f8345146bfb5a1cb9c2ec06dc7bae74f266b3645e0de894702f81a03e68261d37e2914b3ec0de9f1cafd4ceb032ad9bf72cc675d25ef8fecf3447c3dda75fbb9bdd91bcc594e22ca1778bca3afa7436cecc9b31ebc24efee5ca98ce5b4178627911e417bf50292ad7a55811a7fbbb8b0bf85812cffad7cee41b7ea3f3075be1e9c67ff8b24737d8506d69176fb47d57e66d3bf6810ad740cb7c519b97a63d403b404789e243feaeaef7c5a226f3d9a7c63111259bb73fd3cb0506bb4c425af799d83810102db5d142269c4757beafcfe09d3b5d0c5b292c12fe49cfc71d55a01a1d03a18983e5a9ede92b213bc409f1caed9733e5422c6f0cc0e95dfffb364a52403947fcf629e24e586609deacc2a09f0d2463df3bcf22f19a53db910182621e44019f2c70ce992b5f401f2befd166991c9ba6c18f68727c718debca1e525c76f4e41858005cde1f6ae82bbba696c461c737156deebafe6f200a017cc5f16e56e4eed2aea7dd764cea6b9ec4b449175ab05f1a12ab81ca454590b00590d180e002174c5549a3b1ffc970a398bdc9904fdf922d1b84583e5b4ea78cecc6d71b5e3b84c0db0bd8edb7c691256b201430b6eaac1cda1004e5f5278064528bf421cc10d79d0f7f8f0e811d2bca9843c5a15703f9459b971d23e7f8507c212f3f60359af28a327e2181ba21e6b876b180adcf23f3f8b183efcd478b196e642d9f3ebf7f31686634346856e79edc0e6f19c6af93829835f779b029801528d612651bfdfad6d1e95134dbf61ab65389a0bc148bd684ad1ae0699b390be08d477010299940a24c581471b36ef8d4cc64fcdd3fbd9f9a6cd3812a130409e123d2bbeb5d3f42d810af3e16e2b1334b8a9cc7a2391f15c3e126ade9ce32932047df63f5abc52e9d2d318e628c53d520aa2bda87dab83022e245ac14f90f94f06e8be5dabc9d3c7c650021b4b11ad7682f70dd170f4633033e8a809681e4d84ef3ffdf3160cc074a29cf95ac770f30dce0e2894239f2887b9fbb43e2bd7eb31de903b83ac72cf448d366702965b43bc75caa2d105e8dcc3727c40494305076f2304347f379324d14818c93dcf1f4d8c18d7de64d7c2539cdbb1976465047e5790c158ef6140d0ecb1fabcc479728de548a8303679900c6fb40972c831292de1fd546c4b316341df03f04495578d46251df63d948023bdbf4e27b0b11f5522092507125411d043bf81ede7fa57f1819a040778e76a73995f3c56e9ad50cf5686d4b86ae032b71c4083d092933529db4bac6b7b09d3c297494f02abc24a1b09bfe7b160755e11fa3a397c8f1cd56ff755a0f5229e41450c84e761e169cf9534204820e145f97cf51215c22888ffa6b516725c7ada224d99b4254de609b6f7867ac4113aa86b67cb002e629ef7e7d1a138d658532209f4e3f6276e094a6424c11fc459fa6c5bffa97a61ebc7ded6b94a350a0ae9a4f89087657cbba0293c028c96b805ae39d3f96b14923e759388a2afb4c180d4a968e8b3942c0b2f2d32a0c0e90305f3438d5e0ed14ed4d332068fea926a33a3d4afa90ed1661768aad064fca79ff562de7bec7afdd8b26292687242353b09685592b33e97c2c4ec0380a1fd20bb660bb222220cd1bb434479e50510bfe16dd5c132093993b53b02c3c0c94c85f20160a2a61a1e3b3a900ad3e3eab523ee5273cedeb21c6268eb6202ca6138f66e6b0c7a41c844616d23a66b72353fa9b623c35903172ed23840df3d4b2725ca19d0d318f1809b919a49db8a2dca33c09e597bc550c02530f8dce5cb36cd0c6a902d7e2b4534aa6892ca82242d888742adbbedc61806b5023cb8a35f74a27823c4c0b0f42880840610e73c66e94647f411f316cf3bc30bb0fdc99500023cc2eb9dea8a299c9ef1fff1b29bb4d5cdcf10b2326e6167bee0424a5ff40777a19e985742b385438c63c7c56b44a7dcc38f4eb0f3f52fd9e66657a52ba042a3911471802a10bdf706bad8ad8c461c8e01d2e19e331d676344b5cc361a3a5d45502fdb6eb285de6173ed7f3e6faf3440112f1f0ff07df30b3d3b6b511ff5df403bb722e3abd1713e96cc1c4a64df9d932b4cbedecf624cf34f3f7b07359d2fc2766eedcde7e4c4e0a05d998ea04460872b32b6f26c8ea1de6de79722c784d3c9fd5632e87963f8c2473114a27b56b7639c6270695c1684bd884c95cfddc1d19023ad938619d82b4db071f99a8e332243d689353873785087da28a95fa78264d6457731823de66b8ddc77cf25fe75ca2ebde360b1a45acf2615a33ae25ed31d35f219143dd2b9aad68da483b25b5fad6a3574545ed2e72197f9710650e08042bbcdbed335ce0e11d2bb9acd9f3510ad28bccc0f22110601fde6ef782f84b9c63cc4fa6f226c488fa9013b288383f038af183bebf6da3208b5cfc6c2165bd5750c9c44d5b0602ab91e33ce8b49f475d5447b2244301be8eb318766c6238ab1610264e42efdca2ff470258eced2bc7cdc949adfb860617a499e7a197f8bfa813365c9b985b71faf75d03d4f76bc813e80fdab0a979ea784252482d403e969a64ccb79ecd3162e5bb8135dbc18a6fbbd6242be39e64f1774b054a86771a2f512309f1b260b5699ed00394fd89b5038f40311629962d53f9e85e785c527ac58a7d40152375b8658e177aae48d6e9ded0535b834a617da4cde396d57885ad335e0537b6e7d1fe358a5c172de1b4359679427d7f85c29190c3cfa3c14582381b2b41661464f1e97c5e8b081a0fa303318f520bfbe742cef3b5a4fecb26ef9bddc6f24a9f09a3e5a0fbe553d4555302050912f7bbb0c28570e5ab5ff232d3fd56e67d620ef55a049a1c5509152d5651c7bdc304184a3399070f9a469351f0b50537fc89e01153f9c38be665dcdacb98d4c75aeed5dc4961b709f990b9fdf599a67fbd80e3abd471875999c0a9e9b997f6834fae51e6ce10baec9757a9d488989c69708ba0e25c94352aedc687b98cb572d2da17ebb03fd9b1d1ab9d2a51812fbfabf36c2abcd9eb22ec3c564a6917aa5ba8148fbc5373f923c32df7214d82463eacd281e58aa08997beaf835454a03ae08a5fd69cf860c47d847be41da8c60849e6dd7874e9620da0874545bb5fac21af9761597ddd9550471a272648b1ce29d7d125dffd0184450cb9d32e9f19b7039de9fdd7c721c0012df08432bef33ba625e3adcc833b16e66c7f5d595f84c4d5f1c42682ea0b9585c9522dfe89c0991710d52e667ad4d4aabcff325550aaecea3cc6b7d5432a29444f2eca982ac92128e5ab96eff3f822c7387a42e18783d6292ab662a9c853cfc63c4b88cf74510ab7fa2054e00ae7f957101c2e3ed10221605e25e649d29e30389555cd21f807b735b9587bb205bf3ff6b44d5bd59ba1b5e57260c740c2dcc714d35c5757b3fb9314ee813d09301ad5b351906a0b100224b3b4ff9439a696b2830683a9541e81747f44d5dfae8ecdcd6af1561c1d9e77842fd14f5bb60ab3105ee64c00c55fcaab26d78c1acbe019b4a187a658d6d3277e42c9b15a27616257bf778edec52e28d39777cee9d5f6488aa7fc6dc6127271e29cdf15a1bd2ee657d1de16cd23d224dc4c9914054a7b1e0ecff6f42c77e45e0c469499dee2536f731a926503a136a95c757556934ecfeb63203c2236ce5ecc02486b492e37b3127a96b9aef2751682ff45d98830e200946cd43a34e1006032107473c1e1db63c7a3b2826cfcb789a7085e36011fbc82ad24be7a207a21f43f2c200589f4e83d13096a60df07b30b59c0e06affcf1e0c5add08c381f5fb3a3c9ccc7e5114273badc0b44a2d25426b96f66f9caa8fda31ac8f2eada7cc9bb2f6900fb7402fb9edb69025150099f6e91ac4db8c8b2983cd36fc1a7d1fa8a2ccce79e06882225da88035783d350962b2f15b52e0189de1f438c1c3ad59fc8afa543744d8e3d86562157dc40e1d5f571528377b22efa9172f272d6cd7a118481ffb5216340132a27e66c4ea2a2a599d214ea34627fdd3d2324435cef0029bb365471d496d34cd1f86b525d9a89620995a0cafc7b8210defc9] */
};


