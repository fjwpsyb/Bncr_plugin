const config = {
  /** 选择token缓存方式 1 无界本地缓存 2 redis缓存 */
  cache_type: '1',
  /** redis 服务ip */
  redis_host: '',
  /** redis 服务端口 */
  redis_port: '',
  /** redis 密码 */
  redis_password: '',
  /** 数据库选择 默认0 */
  redis_index: '0',
};


module.exports = {
  config,
};
