// Load .env
require('dotenv').config()

// Load babel
require('babel-register')

const app = require('./app')
// const thenifyAll = require('thenify-all')
// const pem = thenifyAll(require('pem'))
// const os = require('os')
const cluster = require('cluster')
// const spdy = require('spdy')

// Port a server
let port = process.env.PORT || 3000
// Set cluster num
let numCluster = 1

// Create a server function
const server = function () {
  // const keys = await pem.createCertificate({
  //   days: 1,
  //   selfSigned: true
  // })

  // const credentials = {
  //   key: keys.serviceKey,
  //   cert: keys.certificate
  // };

  // const getServer = () => {
  //   const server = spdy.createServer(credentials, app.callback())

  //   return server
  // }

  // Create a cluster
  if (cluster.isMaster) {
    for (let i = 0; i < numCluster; i++) {
      cluster.fork()
    }
  } else {
    // getServer().listen(port, () => {
    //   console.log(`HTTPS server (${cluster.worker ? cluster.worker.id : ''}) listening on port ${port}`);
    // });
    app.listen(port, function () {
      console.log('App listening on port 3000!')
    })
  }
}

// Start a server
server()
