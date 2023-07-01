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
        stage('SonarQube analysis') {
            environment {
                scannerHome = tool 'SonarQube_4.3.0'
            }
            steps {
                withSonarQubeEnv('My_SonarQube') {
                    bat '''
                    ${scannerHome}/bin/sonar-scanner \
                    -D sonar.projectKey=React_Jenkins \
                    -D sonar.projectName=React_Jenkins \
                    -D sonar.sources=./src \
                    -D sonar.test.inclusions=**/*.spec.ts
                    -D sonar.exclusions=**/node_modules/**
                    -D sonar.testExecutionReportPaths=reports/sonarqube_report.xml
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