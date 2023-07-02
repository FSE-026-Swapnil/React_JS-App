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
        stage('SonarQube Analysis') {
            steps {
                // Run SonarQube scanner
                withSonarQubeEnv('My_SonarQube_Scanner') {
                // Replace the placeholders with your SonarQube project details
                bat 'C:\\sonarscanner\\bin\\sonar-scanner.bat \
                    -Dsonar.projectKey="ReactFronteEnd" \
                    -Dsonar.sources=./src \
                    -Dsonar.host.url=http://192.168.1.3:9000 \
                    -Dsonar.login=sqa_25d6a3c056915e2648cf1df193f4a76f5b892608'
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