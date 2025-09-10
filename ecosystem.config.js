// PM2 生产环境配置文件
module.exports = {
  apps: [
    {
      name: 'product-review-api',
      script: './src/api/server.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      log_file: './logs/combined.log',
      out_file: './logs/out.log',
      error_file: './logs/error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      max_memory_restart: '500M',
      node_args: '--max_old_space_size=1024',
      watch: false,
      ignore_watch: ['node_modules', 'logs', 'tests'],
      max_restarts: 10,
      min_uptime: '10s',
      kill_timeout: 5000
    },
    {
      name: 'product-review-dify-adapter',
      script: './dify-integration/start-dify-adapter.js',
      instances: 2,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        DIFY_PORT: 3001,
        DIFY_REGION: 'china'
      },
      env_production: {
        NODE_ENV: 'production',
        DIFY_PORT: 3001,
        DIFY_REGION: 'china'
      },
      log_file: './logs/dify-combined.log',
      out_file: './logs/dify-out.log',
      error_file: './logs/dify-error.log',
      merge_logs: true,
      max_memory_restart: '300M',
      watch: false,
      max_restarts: 10,
      min_uptime: '10s'
    },
    {
      name: 'product-review-web',
      script: './src/ui/WebInterface.js',
      instances: 1,
      env: {
        NODE_ENV: 'production',
        PORT: 3002
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3002
      },
      log_file: './logs/web-combined.log',
      out_file: './logs/web-out.log',
      error_file: './logs/web-error.log',
      merge_logs: true,
      max_memory_restart: '200M',
      watch: false
    }
  ]
};