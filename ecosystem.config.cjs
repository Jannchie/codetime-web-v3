module.exports = {
  apps: [
    {
      name: 'CodetimeWebV3-1',
      port: '3001',
      exec_mode: 'cluster',
      instances: 1,
      script: './.output/server/index.mjs',
      max_memory_restart: '500M',
      health_check: {
        enable: true,
        interval: 5000,
        url: 'http://localhost:3001/en',
        on_failure: 'restart',
        timeout: 5000,
      },
    },
    {
      name: 'CodetimeWebV3-2',
      port: '3002',
      exec_mode: 'cluster',
      instances: 1,
      script: './.output/server/index.mjs',
      max_memory_restart: '500M',
      health_check: {
        enable: true,
        interval: 5000,
        url: 'http://localhost:3002/en',
        on_failure: 'restart',
        timeout: 5000,
      },
    },
    {
      name: 'CodetimeWebV3-3',
      port: '3003',
      exec_mode: 'cluster',
      instances: 1,
      script: './.output/server/index.mjs',
      max_memory_restart: '500M',
      health_check: {
        enable: true,
        interval: 5000,
        url: 'http://localhost:3003/en',
        on_failure: 'restart',
        timeout: 5000,
      },
    },
  ],
}
