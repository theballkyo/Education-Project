pipeline {
  //sshagent(credentials: ['c58c6351-5041-4f90-8fa5-fe8edebd82b3']) {
  //      nodejs(nodeJSInstallationName: 'Node 7.x') {
  //          dir('client/') {
  //          }
  //      }
  //}
  agent any
  stages {
    stage('test') {
      steps {
        sh 'ssh -o StrictHostKeyChecking=no root@lab.ryoka.tk -p 4565 ls'
      }
    }
    stage('Prepare') {
      steps {
        sh 'node --version'
        sh 'npm --version'
      }
    }
    stage('Install') {
      steps {
        sh 'npm install'
      }
    }
    stage('Testing') {
      steps {
        sh 'npm run unit'
      }
    }
    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }
  }
}
