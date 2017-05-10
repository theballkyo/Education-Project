pipeline {
  agent any
  stages {
    stage('Prepare') {
      steps {
        sh '''node --version
npm --version'''
      }
    }
    stage('install') {
      steps {
        sh '''cd client
npm install
'''
      }
    }
    stage('unit tests') {
      steps {
        sh '''cd client
npm run unit'''
      }
    }
    stage('build') {
      steps {
        sh '''cd client
npm run build'''
      }
    }
    stage('deploy') {
      steps {
        echo 'Deploy simple'
      }
    }
  }
  tools {
    nodejs 'Node 7.x'
  }
}
