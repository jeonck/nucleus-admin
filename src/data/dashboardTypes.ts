// 대시보드를 위한 타입 정의

// CPU 사용량 데이터 타입
export interface CpuUsageDataPoint {
  time: string;
  usage: number;
}

// 메모리 사용량 데이터 타입
export interface MemoryUsageDataPoint {
  time: string;
  usage: number;
}

// 디스크 사용량 데이터 타입
export interface DiskUsageDataPoint {
  name: string;
  used: number;
  total: number;
  color?: string;
}

// 연결 데이터 타입
export interface ConnectionDataPoint {
  time: string;
  connections: number;
}

// 서비스 데이터 타입
export interface ServiceData {
  name: string;
  status: 'running' | 'stopped' | 'warning';
  uptime: string;
  cpu: number;
  memory: number;
}

// 사용자 그룹 데이터 타입
export interface UserGroupData {
  name: string;
  members: number;
  permissions: string;
}

// 이벤트 데이터 타입
export interface EventData {
  id: number;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  time: string;
}

// 사용자 데이터 타입
export interface UserData {
  id: number;
  email: string;
  name: string;
  groups: string[];
  lastActive: string;
}

// 백업 히스토리 데이터 타입
export interface BackupHistoryData {
  id: number;
  timestamp: string;
  status: 'success' | 'warning' | 'error';
  size: string;
  duration: string;
  location: string;
}

// 로그 엔트리 데이터 타입
export interface LogEntryData {
  id: number;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';
  service: string;
  message: string;
}