pipeline {
  agent {
    docker {
      image 'node:6'
    }
    
  }
  stages {
    stage('Hello') {
      steps {
        echo 'Hello'
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
        sh 'npm run unit'
      }
    }
    stage('build') {
      steps {
        sh 'npm run build'
      }
    }
    stage('deploy') {
      steps {
        echo 'Deploy simple'
      }
    }
  }
}