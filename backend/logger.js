// logger.js
import winston from 'winston';
import ecsFormat from '@elastic/ecs-winston-format';

const logger = winston.createLogger({
  format: ecsFormat(), // ECS format for Elastic
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: '/var/log/app/combined.log' }) // Save logs to host
  ]
});

export default logger;
