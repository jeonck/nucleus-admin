import { useState } from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

interface BackupSource {
  id: string;
  name: string;
}

interface RecoveryPanelProps {
  darkMode: boolean;
}

const RecoveryPanel = ({ darkMode }: RecoveryPanelProps) => {
  const [recoveryType, setRecoveryType] = useState<string>('full');
  const [backupSource, setBackupSource] = useState<string>('');
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  
  // 백업 소스 옵션
  const backupSources: BackupSource[] = [
    { id: '', name: '백업 선택...' },
    { id: 'S3://nucleus-backup/2023-03-10/', name: '2023-03-10 01:00:00 (최신)' },
    { id: 'S3://nucleus-backup/2023-03-09/', name: '2023-03-09 01:00:00' },
    { id: 'S3://nucleus-backup/2023-03-08/', name: '2023-03-08 01:00:00' },
    { id: 'S3://nucleus-backup/2023-03-07/', name: '2023-03-07 01:00:00' },
    { id: 'S3://nucleus-backup/2023-03-06/', name: '2023-03-06 01:00:00' }
  ];
  
  // 복구 타입 변경 핸들러
  const handleRecoveryTypeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setRecoveryType(e.target.value);
  };
  
  // 백업 소스 변경 핸들러
  const handleBackupSourceChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setBackupSource(e.target.value);
  };
  
  // 복구 확인 모달 표시
  const handleShowConfirmModal = (): void => {
    if (backupSource) {
      setShowConfirmModal(true);
    }
  };
  
  // 복구 실행
  const handleStartRecovery = (): void => {
    console.log('복구 시작:', { recoveryType, backupSource });
    // 실제로는 여기서 API 호출
    
    // 모달 닫기
    setShowConfirmModal(false);
  };

  return (
    <div className={`p-4 rounded shadow ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
      <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>시스템 복구</h3>
      
      <div className="space-y-4">
        {/* 주의 경고 */}
        <div className={`p-3 rounded flex items-start ${darkMode ? 'bg-yellow-900/20 text-yellow-300 border border-yellow-700' : 'bg-yellow-100 text-yellow-800 border border-yellow-300'}`}>
          <AlertCircle size={18} className="mr-2 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium mb-1">주의!</p>
            <p>시스템 복구는 현재 데이터를 백업 데이터로 덮어씌우는 작업입니다. 복구 작업은 되돌릴 수 없으니 신중하게 진행하세요.</p>
          </div>
        </div>
        
        {/* 복구 유형 */}
        <div>
          <label className="block text-sm font-medium mb-1">복구 유형</label>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="radio"
                id="full-recovery"
                name="recovery-type"
                value="full"
                checked={recoveryType === 'full'}
                onChange={handleRecoveryTypeChange}
                className="mr-2"
              />
              <label htmlFor="full-recovery" className="text-sm">
                <span className="font-medium">전체 복구</span> - 모든 데이터 및 설정 복구
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="data-recovery"
                name="recovery-type"
                value="data"
                checked={recoveryType === 'data'}
                onChange={handleRecoveryTypeChange}
                className="mr-2"
              />
              <label htmlFor="data-recovery" className="text-sm">
                <span className="font-medium">데이터만 복구</span> - 설정은 유지하고 데이터만 복구
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="config-recovery"
                name="recovery-type"
                value="config"
                checked={recoveryType === 'config'}
                onChange={handleRecoveryTypeChange}
                className="mr-2"
              />
              <label htmlFor="config-recovery" className="text-sm">
                <span className="font-medium">설정만 복구</span> - 데이터는 유지하고 설정만 복구
              </label>
            </div>
          </div>
        </div>
        
        {/* 백업 소스 선택 */}
        <div>
          <label className="block text-sm font-medium mb-1">백업 소스 선택</label>
          <select
            value={backupSource}
            onChange={handleBackupSourceChange}
            className={`w-full p-2 border rounded font-mono text-sm ${darkMode 
              ? 'bg-gray-700 border-gray-600 text-white' 
              : 'border-gray-300'}`}
          >
            {backupSources.map((source) => (
              <option key={source.id} value={source.id}>{source.name}</option>
            ))}
          </select>
        </div>
        
        {/* 복구 버튼 */}
        <div className="pt-2">
          <button
            onClick={handleShowConfirmModal}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded flex items-center justify-center"
            disabled={!backupSource}
          >
            <RotateCcw size={16} className="mr-2" />
            복구 시작
          </button>
        </div>
        
        {/* 주의 사항 */}
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          <p>복구 중에는 시스템이 일시적으로 중단될 수 있습니다. 모든 사용자에게 미리 알리는 것이 좋습니다.</p>
        </div>
      </div>
      
      {/* 확인 모달 */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`w-full max-w-md p-4 rounded shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className="text-lg font-semibold mb-4">복구 확인</h3>
            <div className={`p-3 rounded mb-4 ${darkMode ? 'bg-red-900/20 text-red-300 border border-red-700' : 'bg-red-100 text-red-800 border border-red-300'}`}>
              <p className="font-medium mb-1">경고!</p>
              <p className="text-sm">이 작업은 되돌릴 수 없습니다. 정말로 계속하시겠습니까?</p>
            </div>
            <div className="font-medium mb-2">복구 세부정보:</div>
            <ul className="list-disc list-inside mb-4 text-sm space-y-1">
              <li>복구 유형: {recoveryType === 'full' ? '전체 복구' : recoveryType === 'data' ? '데이터만 복구' : '설정만 복구'}</li>
              <li>백업 소스: {backupSource}</li>
              <li>영향받는 서비스: {recoveryType === 'full' ? '모든 서비스' : recoveryType === 'data' ? 'Nucleus Core, Cache, DB' : 'Nucleus 설정'}</li>
            </ul>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className={`px-4 py-2 rounded ${darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
              >
                취소
              </button>
              <button
                onClick={handleStartRecovery}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                복구 실행
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecoveryPanel;
