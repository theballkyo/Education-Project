node {
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
                stage ('Deploy') {
                    sh 'ssh -o StrictHostKeyChecking=no root@lab.ryoka.tk -p 4565 rm -rf /data/web/eduo.lab.ryoka.tk/temp/public'
                    sh 'ssh -o StrictHostKeyChecking=no root@lab.ryoka.tk -p 4565 mkdir -p /data/web/eduo.lab.ryoka.tk/temp/public'
                    sh 'scp -r dist -o StrictHostKeyChecking=no root@lab.ryoka.tk -p 4565:/data/web/eduo.lab.ryoka.tk/temp/public'
                    sh 'ssh -o StrictHostKeyChecking=no root@lab.ryoka.tk -p 4565 "rm -rf /data/web/eduo.lab.ryoka.tk/public && mv /data/web/eduo.lab.ryoka.tk/temp/public /data/web/eduo.lab.ryoka.tk/public"'
                }
            }
            // dir('server/') {
            //     stage('test') {
            //         sh 'ssh -o StrictHostKeyChecking=no root@lab.ryoka.tk -p 4565 ls'
            //     }
            //     stage('Prepare') {
            //         sh 'node --version'
            //         sh 'npm --version'
            //     }
            //     stage('Install') {
            //         sh 'npm install'
            //     }
            //     stage ('Deploy') {
            //         sh 'ssh -o StrictHostKeyChecking=no root@lab.ryoka.tk -p 4565 rm -rf /data/web/eduo.lab.ryoka.tk/temp/public'
            //         sh 'ssh -o StrictHostKeyChecking=no root@lab.ryoka.tk -p 4565 mkdir -p /data/web/eduo.lab.ryoka.tk/temp/public'
            //         sh 'scp -r dist -o StrictHostKeyChecking=no root@lab.ryoka.tk -p 4565:/data/web/eduo.lab.ryoka.tk/temp/public'
            //         sh 'ssh -o StrictHostKeyChecking=no root@lab.ryoka.tk -p 4565 "rm -rf /data/web/eduo.lab.ryoka.tk/public && mv /data/web/eduo.lab.ryoka.tk/temp/public /data/web/eduo.lab.ryoka.tk/public"'
            //     }
            // }
        }
   }
}
