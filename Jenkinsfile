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
                echo "scannerHome ${scannerHome}"
                withSonarQubeEnv('My_SonarQube_Server') {
                    bat '''
                    "${scannerHome}/bin/sonar-scanner"
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