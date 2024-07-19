// apm.js
import apm from 'elastic-apm-node';
//import apm from './apm'; 
apm.start({
  serviceName: 'ecom', // Replace with your service name
  serverUrl: 'http://localhost:8200', // Replace with your APM server URL
  environment: 'production', // Change based on your environment
  secretToken: '', // Optional: Use if your APM server requires a token
  logLevel: 'info' // Change to 'debug' for more detailed logging
  // Additional configuration options can go here
});

export default apm;
