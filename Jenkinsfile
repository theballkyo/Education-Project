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
        sh '''cd src
npm install
'''
      }
    }
    stage('unit tests') {
      steps {
        sh '''cd src
npm run unit'''
      }
    }
    stage('build') {
      steps {
        sh '''cd src
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
    nodejs 'Node 6.x'
  }
}