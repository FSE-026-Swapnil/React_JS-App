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
            tools {
                sonarQube 'My_SonarQube_Scanner'
            }
            steps {
                withSonarQubeEnv('My_SonarQube_Server') {
                bat 'sonar-scanner'
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