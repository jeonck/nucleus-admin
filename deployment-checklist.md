# Nucleus Admin 배포 체크리스트

## 1. 사전 준비
- [ ] Kubernetes 클러스터 접근 권한 확인
- [ ] 프라이빗 레지스트리 접근 권한 확인
- [ ] kubectl이 올바르게 구성되었는지 확인
- [ ] 필요한 네임스페이스 존재 여부 확인
- [ ] 도메인 이름 및 DNS 레코드 구성 확인

## 2. 이미지 빌드 및 푸시
- [ ] 소스 코드 최신 버전 확인
- [ ] 프로덕션 빌드 생성 (`npm run build`)
- [ ] 도커 이미지 빌드 (`docker build -t nucleus-admin:1.0.0 .`)
- [ ] 이미지에 태그 지정 (`docker tag nucleus-admin:1.0.0 your-private-registry.example.com/nucleus-admin:1.0.0`)
- [ ] 프라이빗 레지스트리로 이미지 푸시 (`docker push your-private-registry.example.com/nucleus-admin:1.0.0`)

## 3. Kubernetes 리소스 준비
- [ ] 네임스페이스 생성 (`kubectl apply -f k8s/namespace.yaml`)
- [ ] ConfigMap 환경에 맞게 설정 (개발/스테이징/프로덕션)
- [ ] 레지스트리 시크릿 생성 (필요한 경우)
- [ ] 매니페스트 파일에서 이미지 태그 업데이트

## 4. 배포 실행
- [ ] Kustomize 또는 Helm을 사용한 배포
  - Kustomize: `kubectl apply -k k8s/overlays/<environment>`
  - Helm: `helm upgrade --install nucleus-admin ./helm/nucleus-admin -f ./helm/nucleus-admin/values-<environment>.yaml --namespace nucleus-system`
- [ ] 롤아웃 상태 모니터링 (`kubectl rollout status deployment/nucleus-admin -n nucleus-system`)

## 5. 배포 후 확인
- [ ] 모든 Pod이 정상적으로 실행 중인지 확인 (`kubectl get pods -n nucleus-system`)
- [ ] 서비스가 올바르게 노출되었는지 확인 (`kubectl get svc -n nucleus-system`)
- [ ] Ingress가 올바르게 구성되었는지 확인 (`kubectl get ingress -n nucleus-system`)
- [ ] 애플리케이션 URL 접속 테스트 (브라우저에서 접속)
- [ ] 로그에 오류가 있는지 확인 (`kubectl logs -l app=nucleus-admin -n nucleus-system`)

## 6. 모니터링 구성
- [ ] ServiceMonitor 배포 (Prometheus 모니터링 용)
- [ ] Grafana 대시보드 가져오기
- [ ] Alert 규칙 배포

## 7. 롤백 계획
- [ ] 이전 배포 버전 기록
- [ ] 롤백 명령어 준비 (`kubectl rollout undo deployment/nucleus-admin -n nucleus-system`)
- [ ] 롤백 후 검증 단계 정의

## 배포 관련 정보
- 배포 담당자: _____________________
- 배포 날짜 및 시간: _____________________
- 배포 환경: _____________________
- 이미지 태그: _____________________
- 주요 변경 사항: _____________________
