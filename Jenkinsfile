pipeline{
    agent any
    environment{
        S3_BUCKET='ks-static-site-host'
        IMAGE_NAME='static-site-host'
    }
    stages{
        stage('Checkout Code'){
            steps{
                checkout scm
            }
        }
        stage('Build Docker Image'){
            steps{
                script{
                    dockerImage=docker.build("${IMAGE_NAME}:${BUILD_NUMBER}") 
                }
            }
        }
        stage('Test Site in Docker Container'){
            steps{
                script{
                    sh```
                    docker run -d -p 80:80 --name test-container ${IMAGE_NAME}:${BUILD_NUMBER}
                    sleep 5
                    curl -f http://localhost || exit 1
                    curl -f http://localhost/index.html || exit 1
                    docker stop test-container
                    docker rm test-container
                    ```
                }
            }
        }
        stage('Deploy to S3'){
            steps{
                script{
                    sh```
                    aws s3 sync . s3://${S3_BUCKET} \
                    --delete \
                    --exclude ".git/*" \
                    --exclude "Jenkinsfile" \
                    --exclude "Dockerfile"
                    ```
                }
            }
        }
    }
    post{
        success{
            echo 'Deployment successful! Site live at http://ks-static-site-host.s3-website.ap-south-1.amazonaws.com'
        }
        failure{
            echo 'Deployment failed! Please check the logs.'
        }
        always{
            script{
                sh```
                docker rmi ${IMAGE_NAME}:${BUILD_NUMBER} || true
                ```
            }
            cleanWs()
        }
    }
}