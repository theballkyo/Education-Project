pipeline {
  agent any
  stages {
     sshagent(credentials: ['c58c6351-5041-4f90-8fa5-fe8edebd82b3']) {
        nodejs(nodeJSInstallationName: 'Node 7.x') {
            dir('client/') {
                stage('test') {
                    sh 'ssh -o StrictHostKeyChecking=no root@lab.ryoka.tk -p 4565 ls'
                }
                stage('Prepare') {
                    sh 'node --version'
                    sh 'npm --version'
                }
                stage('Install') {
                    sh 'npm install'
                }
                stage('Testing') {
                    sh 'npm run unit'
                }
                stage('Build') {
                    sh 'npm run build'
                }
            }
        }
   }    
  }
}
