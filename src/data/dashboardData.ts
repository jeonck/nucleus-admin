// 대시보드를 위한 더미 데이터
import type {
  CpuUsageDataPoint,
  MemoryUsageDataPoint,
  DiskUsageDataPoint,
  ConnectionDataPoint,
  ServiceData,
  UserGroupData,
  EventData,
  UserData,
  BackupHistoryData,
  LogEntryData
} from './dashboardTypes';


// CPU 사용량 데이터
export const cpuUsageData: CpuUsageDataPoint[] = [
  { time: '00:00', usage: 45 },
  { time: '01:00', usage: 42 },
  { time: '02:00', usage: 37 },
  { time: '03:00', usage: 35 },
  { time: '04:00', usage: 38 },
  { time: '05:00', usage: 42 },
  { time: '06:00', usage: 47 },
  { time: '07:00', usage: 55 },
  { time: '08:00', usage: 65 },
  { time: '09:00', usage: 72 },
  { time: '10:00', usage: 78 },
  { time: '11:00', usage: 82 },
  { time: '12:00', usage: 85 },
];

// 메모리 사용량 데이터
export const memoryUsageData: MemoryUsageDataPoint[] = [
  { time: '00:00', usage: 62 },
  { time: '01:00', usage: 60 },
  { time: '02:00', usage: 59 },
  { time: '03:00', usage: 58 },
  { time: '04:00', usage: 57 },
  { time: '05:00', usage: 59 },
  { time: '06:00', usage: 63 },
  { time: '07:00', usage: 68 },
  { time: '08:00', usage: 73 },
  { time: '09:00', usage: 78 },
  { time: '10:00', usage: 82 },
  { time: '11:00', usage: 85 },
  { time: '12:00', usage: 87 },
];

// 디스크 사용량 데이터
export const diskUsageData: DiskUsageDataPoint[] = [
  { name: 'nucleus-data', used: 850, total: 1000 },
  { name: 'nucleus-cache', used: 420, total: 500 },
  { name: 'nucleus-logs', used: 120, total: 200 },
];

// 연결 데이터
export const connectionData: ConnectionDataPoint[] = [
  { time: '00:00', connections: 12 },
  { time: '01:00', connections: 10 },
  { time: '02:00', connections: 8 },
  { time: '03:00', connections: 5 },
  { time: '04:00', connections: 3 },
  { time: '05:00', connections: 2 },
  { time: '06:00', connections: 4 },
  { time: '07:00', connections: 8 },
  { time: '08:00', connections: 15 },
  { time: '09:00', connections: 24 },
  { time: '10:00', connections: 32 },
  { time: '11:00', connections: 38 },
  { time: '12:00', connections: 42 },
];

// 마이크로서비스 상태 데이터
export const servicesData: ServiceData[] = [
  { name: 'nucleus-core', status: 'running', uptime: '5d 12h 30m', cpu: 12.5, memory: 980 },
  { name: 'nucleus-cache', status: 'running', uptime: '5d 12h 30m', cpu: 8.2, memory: 420 },
  { name: 'nucleus-auth', status: 'running', uptime: '5d 12h 30m', cpu: 2.1, memory: 310 },
  { name: 'nucleus-web', status: 'running', uptime: '5d 12h 30m', cpu: 5.5, memory: 490 },
  { name: 'nucleus-db', status: 'running', uptime: '5d 12h 30m', cpu: 15.3, memory: 850 },
];

// 사용자 그룹 데이터
export const userGroupsData: UserGroupData[] = [
  { name: 'GM (General Management)', members: 3, permissions: '관리자 권한' },
  { name: 'developers', members: 12, permissions: '개발자 권한' },
  { name: 'artists', members: 18, permissions: '아티스트 권한' },
  { name: 'users', members: 42, permissions: '일반 사용자 권한' },
];

// 최근 이벤트 및 알림 데이터
export const recentEvents: EventData[] = [
  { id: 1, type: 'warning', message: '백업 프로세스에서 지연 발생', time: '12:45' },
  { id: 2, type: 'error', message: 'nucleus-cache 메모리 사용량 임계치 접근 (85%)', time: '11:32' },
  { id: 3, type: 'info', message: '시스템 업데이트 완료', time: '10:15' },
  { id: 4, type: 'success', message: '데이터베이스 최적화 완료', time: '09:05' },
  { id: 5, type: 'info', message: '새 사용자 5명 추가됨', time: '08:30' },
];

// 사용자 데이터
export const usersData: UserData[] = [
  { id: 1, email: 'admin@example.com', name: '관리자', groups: ['GM', 'users'], lastActive: '2023-03-10T12:30:45' },
  { id: 2, email: 'jkim@example.com', name: '김지훈', groups: ['developers', 'users'], lastActive: '2023-03-10T10:15:22' },
  { id: 3, email: 'sjpark@example.com', name: '박성진', groups: ['developers', 'users'], lastActive: '2023-03-09T16:45:12' },
  { id: 4, email: 'mlee@example.com', name: '이민지', groups: ['artists', 'users'], lastActive: '2023-03-10T11:05:38' },
  { id: 5, email: 'jhchoi@example.com', name: '최재현', groups: ['artists', 'users'], lastActive: '2023-03-09T14:22:10' },
];

// 백업 데이터
export const backupHistoryData: BackupHistoryData[] = [
  { id: 1, timestamp: '2023-03-10T01:00:00', status: 'success', size: '3.45 GB', duration: '00:15:32', location: 'S3://nucleus-backup/2023-03-10/' },
  { id: 2, timestamp: '2023-03-09T01:00:00', status: 'success', size: '3.42 GB', duration: '00:14:55', location: 'S3://nucleus-backup/2023-03-09/' },
  { id: 3, timestamp: '2023-03-08T01:00:00', status: 'warning', size: '3.44 GB', duration: '00:18:22', location: 'S3://nucleus-backup/2023-03-08/' },
  { id: 4, timestamp: '2023-03-07T01:00:00', status: 'success', size: '3.41 GB', duration: '00:15:10', location: 'S3://nucleus-backup/2023-03-07/' },
  { id: 5, timestamp: '2023-03-06T01:00:00', status: 'success', size: '3.38 GB', duration: '00:14:45', location: 'S3://nucleus-backup/2023-03-06/' },
];

// 로그 데이터
export const logEntriesData: LogEntryData[] = [
  { id: 1, timestamp: '2023-03-10T12:45:23', level: 'WARN', service: 'nucleus-core', message: '백업 프로세스에서 지연 발생' },
  { id: 2, timestamp: '2023-03-10T11:32:15', level: 'ERROR', service: 'nucleus-cache', message: '메모리 사용량 임계치 접근 (85%)' },
  { id: 3, timestamp: '2023-03-10T10:15:42', level: 'INFO', service: 'nucleus-web', message: '시스템 업데이트 완료' },
  { id: 4, timestamp: '2023-03-10T09:05:37', level: 'INFO', service: 'nucleus-db', message: '데이터베이스 최적화 완료' },
  { id: 5, timestamp: '2023-03-10T08:30:12', level: 'INFO', service: 'nucleus-auth', message: '새 사용자 5명 추가됨' },
];
