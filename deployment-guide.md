# Nucleus Admin 온프렘 Kubernetes 배포 가이드

이 문서는 Nucleus Admin 대시보드를 온프렘 Kubernetes 클러스터에 배포하는 프로세스를 상세히 설명합니다.

## 목차
1. [개요](#개요)
2. [사전 요구사항](#사전-요구사항)
3. [빌드 및 컨테이너화](#빌드-및-컨테이너화)
4. [Kubernetes 리소스](#kubernetes-리소스)
5. [배포 방법](#배포-방법)
6. [환경별 설정](#환경별-설정)
7. [모니터링 및 알람](#모니터링-및-알람)
8. [유지보수](#유지보수)
9. [문제 해결](#문제-해결)
10. [참고 자료](#참고-자료)

## 개요

Nucleus Admin은 Nucleus 플랫폼의 관리 대시보드로, React로 개발되었습니다. 이 애플리케이션은 nginx 컨테이너에서 실행되며 Kubernetes 클러스터에 배포됩니다.

### 아키텍처 다이어그램

```
+---------------------+       +--------------------+       +-------------------+
|                     |       |                    |       |                   |
|  Ingress Controller +------>+  Nucleus Admin     +------>+  Backend API      |
|                     |       |  Service           |       |                   |
+---------------------+       +--------------------+       +-------------------+
                                      ^
                                      |
                                      v
                              +-------------------+
                              |                   |
                              |  ConfigMap        |
                              |  (환경 설정)       |
                              |                   |
                              +-------------------+
```

## 사전 요구사항

- Kubernetes 클러스터 (1.19+)
- kubectl CLI 도구
- Docker
- 프라이빗 레지스트리 접근 권한
- Helm (선택적)
- ArgoCD (선택적 - GitOps 배포용)

## 빌드 및 컨테이너화

### 빌드 과정

1. React 애플리케이션 빌드:
   ```bash
   cd /Users/1102680/ws/claude-project/nucleus-admin
   npm run build
   ```

2. 도커 이미지 빌드:
   ```bash
   docker build -t nucleus-admin:1.0.0 .
   ```

3. 이미지 태그 지정 및 푸시:
   ```bash
   docker tag nucleus-admin:1.0.0 your-private-registry.example.com/nucleus-admin:1.0.0
   docker push your-private-registry.example.com/nucleus-admin:1.0.0
   ```

### Dockerfile 설명

Dockerfile은 다단계 빌드 프로세스를 사용합니다:
1. 빌드 단계: Node.js 환경에서 애플리케이션 빌드
2. 런타임 단계: nginx를 사용하여 정적 파일 제공

## Kubernetes 리소스

Nucleus Admin은 다음 Kubernetes 리소스로 구성됩니다:

1. **네임스페이스**: 모든 리소스를 격리합니다
2. **ConfigMap**: 환경별 설정을 저장합니다
3. **Deployment**: 애플리케이션 컨테이너를 관리합니다
4. **Service**: 내부 네트워크 연결을 제공합니다
5. **Ingress**: 외부 트래픽을 라우팅합니다
6. **HorizontalPodAutoscaler**: 수요에 따라 Pod 수를 자동으로 조정합니다
7. **ServiceMonitor**: Prometheus 모니터링을 활성화합니다

## 배포 방법

### Kustomize 사용 배포

```bash
# 개발 환경
kubectl apply -k /Users/1102680/ws/claude-project/nucleus-admin/k8s/overlays/dev

# 스테이징 환경
kubectl apply -k /Users/1102680/ws/claude-project/nucleus-admin/k8s/overlays/staging

# 프로덕션 환경
kubectl apply -k /Users/1102680/ws/claude-project/nucleus-admin/k8s/overlays/production
```

### Helm 사용 배포

```bash
# 개발 환경
helm upgrade --install nucleus-admin ./helm/nucleus-admin \
  -f ./helm/nucleus-admin/values-dev.yaml \
  --namespace nucleus-system

# 스테이징 환경
helm upgrade --install nucleus-admin ./helm/nucleus-admin \
  -f ./helm/nucleus-admin/values-staging.yaml \
  --namespace nucleus-system

# 프로덕션 환경
helm upgrade --install nucleus-admin ./helm/nucleus-admin \
  -f ./helm/nucleus-admin/values-production.yaml \
  --namespace nucleus-system
```

### 배포 스크립트 사용

```bash
# 개발 환경
./deploy.sh --environment dev

# 스테이징 환경
./deploy.sh --environment stage

# 프로덕션 환경
./deploy.sh --environment prod
```

## 환경별 설정

Nucleus Admin은 세 가지 환경을 지원합니다:

### 개발 환경
- 적은 리소스 요구사항
- 디버그 로그 수준
- 자동 확장 비활성화
- API URL: https://api.nucleus-dev.example.com

### 스테이징 환경
- 중간 수준의 리소스 요구사항
- 표준 로그 수준
- 제한된 자동 확장
- API URL: https://api.nucleus-staging.example.com

### 프로덕션 환경
- 높은 리소스 요구사항
- 경고 로그 수준
- 강화된 자동 확장
- API URL: https://api.nucleus.example.com

## 모니터링 및 알람

### Prometheus 메트릭

다음 메트릭이 수집됩니다:
- CPU 및 메모리 사용량
- HTTP 요청 수
- HTTP 응답 시간
- 오류 비율

### Grafana 대시보드

Grafana 대시보드는 `/Users/1102680/ws/claude-project/nucleus-admin/monitoring/grafana-dashboard.json`에서 제공됩니다.

### 알람 규칙

다음 상황에서 알람이 트리거됩니다:
- 높은 CPU 사용량 (>80%, 10분 이상)
- 높은 메모리 사용량 (>80%, 10분 이상)
- 높은 오류율 (>5%, 5분 이상)
- 느린 응답 시간 (95%가 2초 이상, 5분 동안)

## 유지보수

### 업데이트 배포
1. 새 이미지 빌드 및 푸시
2. 매니페스트 파일에서 이미지 태그 업데이트
3. 변경사항 적용 (`kubectl apply -k ...` 또는 `helm upgrade ...`)

### 롤백
```bash
kubectl rollout undo deployment/nucleus-admin -n nucleus-system
```

### 스케일링
```bash
kubectl scale deployment/nucleus-admin --replicas=5 -n nucleus-system
```

## 문제 해결

### 일반적인 문제
1. **Pod 시작 실패**
   ```bash
   kubectl describe pod -l app=nucleus-admin -n nucleus-system
   kubectl logs -l app=nucleus-admin -n nucleus-system
   ```

2. **Ingress 연결 문제**
   ```bash
   kubectl get ingress -n nucleus-system
   kubectl describe ingress nucleus-admin-ingress -n nucleus-system
   ```

3. **이미지 풀 오류**
   - 레지스트리 시크릿이 올바르게 구성되었는지 확인
   - 이미지 태그가 존재하는지 확인

### 로그 확인
```bash
kubectl logs -l app=nucleus-admin -n nucleus-system --tail=100
```

## 참고 자료

- [Kubernetes 공식 문서](https://kubernetes.io/docs/)
- [Helm 공식 문서](https://helm.sh/docs/)
- [Kustomize 공식 문서](https://kustomize.io/)
- [Nginx 설정 가이드](https://nginx.org/en/docs/)
- [ArgoCD 설정 가이드](https://argo-cd.readthedocs.io/)
