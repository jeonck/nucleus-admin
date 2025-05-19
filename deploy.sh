#!/bin/bash
set -e

# 변수 설정
IMAGE_NAME="nucleus-admin"
NAMESPACE="nucleus-system"
REGISTRY="your-private-registry.example.com"
VERSION=$(date +"%Y%m%d%H%M%S")

# 도움말 출력
function show_help {
  echo "Nucleus Admin 배포 스크립트"
  echo ""
  echo "사용법: $0 [옵션]"
  echo ""
  echo "옵션:"
  echo "  -e, --environment [dev|stage|prod]  배포 환경 (기본값: dev)"
  echo "  -v, --version [태그]               사용할 이미지 태그 (기본값: 타임스탬프)"
  echo "  -h, --help                         도움말 표시"
  echo ""
}

# 명령행 인수 처리
ENVIRONMENT="dev"

while [[ $# -gt 0 ]]; do
  key="$1"
  case $key in
    -e|--environment)
      ENVIRONMENT="$2"
      shift 2
      ;;
    -v|--version)
      VERSION="$2"
      shift 2
      ;;
    -h|--help)
      show_help
      exit 0
      ;;
    *)
      echo "알 수 없는 옵션: $1"
      show_help
      exit 1
      ;;
  esac
done

echo "환경: $ENVIRONMENT"
echo "버전: $VERSION"

# 이미지 빌드 및 푸시
echo "이미지 빌드 중..."
docker build -t ${IMAGE_NAME}:${VERSION} .

echo "이미지에 태그 지정 중..."
docker tag ${IMAGE_NAME}:${VERSION} ${REGISTRY}/${IMAGE_NAME}:${VERSION}

echo "이미지 푸시 중..."
docker push ${REGISTRY}/${IMAGE_NAME}:${VERSION}

# 기존 이미지 업데이트
echo "Kubernetes 매니페스트 업데이트 중..."
sed -i.bak "s|image:.*${IMAGE_NAME}:.*|image: ${REGISTRY}/${IMAGE_NAME}:${VERSION}|g" k8s/deployment.yaml

# ConfigMap 환경별 설정
case $ENVIRONMENT in
  dev)
    API_URL="https://api.nucleus-dev.example.com"
    ;;
  stage)
    API_URL="https://api.nucleus-stage.example.com"
    ;;
  prod)
    API_URL="https://api.nucleus.example.com"
    ;;
  *)
    echo "지원되지 않는 환경: $ENVIRONMENT"
    exit 1
    ;;
esac

echo "ConfigMap 업데이트 중..."
sed -i.bak "s|API_URL:.*|API_URL: \"${API_URL}\"|g" k8s/configmap.yaml

# 매니페스트 적용
echo "Kubernetes 매니페스트 적용 중..."
kubectl apply -k k8s/

# 배포 상태 확인
echo "배포 상태 확인 중..."
kubectl rollout status deployment/${IMAGE_NAME} -n ${NAMESPACE}

echo "배포 완료!"
