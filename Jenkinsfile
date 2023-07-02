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
        def scannerHome
        stage('SonarQube Analysis') {
            steps {
                script{
                    scannerHome = tool 'My_SonarQube_Scanner';
                }
                withSonarQubeEnv('My_SonarQube_Server') {
                    bat "${scannerHome}/bin/sonar-scanner"
                }
            }
        }
        stage('Selenium Tests') {
            steps {
                // Run Selenium tests
                bat 'npm install -g selenium-standalone@latest'
                bat 'selenium-standalone install'
                bat 'selenium-standalone start &'
                bat 'npm test'
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