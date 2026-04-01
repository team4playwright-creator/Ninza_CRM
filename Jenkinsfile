pipeline {
agent any
environment {
BASE_URL = credentials('BASE_URL')
CRM_USERNAME = credentials('PIPE_CRM_USERNAME')
CRM_PASSWORD = credentials('PIPE_CRM_PASS')
}
stages {
stage('Install Dependencies') {
steps {
echo 'Installing dependencies...'
bat 'npm install'
}
}
stage('Run Tests') {
steps {
echo 'Running tests...'
catchError(buildResult: 'UNSTABLE', stageResult: 'UNSTABLE') {
bat 'npm test'
}
}
}
}
post {
always {
publishHTML([
allowMissing: true,
alwaysLinkToLastBuild: true,
keepAll: true,
reportDir: 'html-report',
reportFiles: 'index.html',
reportName: 'Playwright HTML Report'
])
allure([
includeProperties: false,
jdk: '',
reportBuildPolicy: 'ALWAYS',
results: [[path: 'allure-results']]
])
}
success {
echo 'Pipeline succeeded!'
}
failure {
echo 'Pipeline failed!'
}
}
}

