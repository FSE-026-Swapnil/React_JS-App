pipeline {
    agent any
    stages {
        stage('Build') { 
            steps {
                echo "building stage started ..."
                bat 'node -v' 
                bat 'npm install'
            }
        }
        stage('Test') { 
            steps {
                echo "testing stage started ..."
                bat "npm test"
            }
            post {
                always {
                    echo "testing stage completed successfully ..."
                }
            }
            
        }
        stage('SonarQube analysis started ...') {
            environment {
                def scannerHome = tool 'My_SonarQube_Scanner'
            }
            steps {
                withSonarQubeEnv('My_SonarQube_Server') {
                    bat '''
                    ${scannerHome}/bin/sonar-scanner
                    -Dsonar.projectKey=React_Frontend \
                    -Dsonar.sources=./src \
                    -Dsonar.host.url=http://192.168.1.3:9000 \
                    -Dsonar.login=sqa_25d6a3c056915e2648cf1df193f4a76f5b892608'
                    '''
                }
            }
        }
         stage('Deploy') { 
            steps {
                echo "Deploying..."
               
            }
        }
    }
     post{
          always{
               echo "pipeline concluded."
          }
          success{
               echo "all stages executed with success."
               bat 'npm start'
          }
     }
}