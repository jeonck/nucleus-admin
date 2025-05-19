import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { servicesData } from '../data/dashboardData';
import ServiceTable from '../components/services/ServiceTable';
import DockerManager from '../components/services/DockerManager';
import ConfigEditor from '../components/services/ConfigEditor';

const Services = () => {
  const { darkMode, addNotification } = useAppContext();
  const [services, setServices] = useState(servicesData);

  // 서비스 재시작 처리
  const handleRestartService = (serviceName) => {
    // 실제 구현에서는 API 호출을 통해 서비스 재시작
    console.log(`재시작 서비스: ${serviceName}`);
    addNotification({
      type: 'info',
      message: `${serviceName} 서비스 재시작 중...`
    });
    
    // 상태 변경 시뮬레이션
    setTimeout(() => {
      addNotification({
        type: 'success',
        message: `${serviceName} 서비스가 성공적으로 재시작되었습니다.`
      });
    }, 2000);
  };

  // 서비스 중지 처리
  const handleStopService = (serviceName) => {
    // 실제 구현에서는 API 호출을 통해 서비스 중지
    console.log(`중지 서비스: ${serviceName}`);
    addNotification({
      type: 'info',
      message: `${serviceName} 서비스 중지 중...`
    });
    
    // 상태 변경 시뮬레이션
    setTimeout(() => {
      setServices(prevServices => 
        prevServices.map(service => 
          service.name === serviceName 
            ? { ...service, status: 'stopped' } 
            : service
        )
      );
      
      addNotification({
        type: 'success',
        message: `${serviceName} 서비스가 중지되었습니다.`
      });
    }, 2000);
  };

  // Docker 명령어 실행 처리
  const handleExecuteDockerCommand = (command) => {
    // 실제 구현에서는 API 호출을 통해 Docker 명령어 실행
    console.log(`Docker 명령어 실행: ${command}`);
    addNotification({
      type: 'info',
      message: `Docker 명령어 실행 중: ${command}`
    });
    
    // 실행 시뮬레이션
    setTimeout(() => {
      addNotification({
        type: 'success',
        message: `Docker 명령어가 성공적으로 실행되었습니다.`
      });
    }, 1500);
  };

  // Docker 컨테이너 재시작 처리
  const handleRestartContainer = (containerName) => {
    console.log(`컨테이너 재시작: ${containerName}`);
    addNotification({
      type: 'info',
      message: `${containerName} 컨테이너 재시작 중...`
    });
    
    // 실행 시뮬레이션
    setTimeout(() => {
      addNotification({
        type: 'success',
        message: `${containerName} 컨테이너가 성공적으로 재시작되었습니다.`
      });
    }, 2000);
  };

  // 전체 Docker 스택 재시작 처리
  const handleRestartStack = () => {
    console.log('전체 Docker 스택 재시작');
    addNotification({
      type: 'info',
      message: `전체 Docker 스택 재시작 중...`
    });
    
    // 실행 시뮬레이션
    setTimeout(() => {
      addNotification({
        type: 'success',
        message: `전체 Docker 스택이 성공적으로 재시작되었습니다.`
      });
    }, 3000);
  };

  // 설정 파일 저장 처리
  const handleSaveConfig = (fileName, content) => {
    console.log(`설정 파일 저장: ${fileName}`);
    addNotification({
      type: 'info',
      message: `${fileName} 설정 파일 저장 중...`
    });
    
    // 저장 시뮬레이션
    setTimeout(() => {
      addNotification({
        type: 'success',
        message: `${fileName} 설정 파일이 저장되었습니다.`
      });
    }, 1000);
  };

  return (
    <div>
      <ServiceTable 
        services={services} 
        onRestart={handleRestartService} 
        onStop={handleStopService}
        darkMode={darkMode}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <DockerManager 
          onExecuteCommand={handleExecuteDockerCommand}
          onRestartContainer={handleRestartContainer}
          onRestartStack={handleRestartStack}
          darkMode={darkMode}
        />
        
        <ConfigEditor 
          onSave={handleSaveConfig}
          darkMode={darkMode}
        />
      </div>
    </div>
  );
};

export default Services;