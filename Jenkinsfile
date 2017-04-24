pipeline {
  agent any
  stages {
    stage('Prepare') {
      steps {
        sh '''node --version
npm --version'''
        dir(path: 'src')
      }
    }
    stage('install') {
      steps {
        sh '''npm install
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
  tools {
    nodejs 'Node 6.x'
  }
}