import { 
  LineChart, Line, 
  AreaChart, Area,
  BarChart, Bar,
  XAxis, YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from 'recharts';

// Props 타입 정의
interface ChartContainerProps {
  title: string;
  data: any[];
  dataKey: string;
  type?: 'line' | 'area' | 'bar';
  color?: string;
  fillColor?: string;
  yAxisLabel?: string;
  xAxisDataKey?: string;
  comparativeDataKey?: string;
  comparativeColor?: string;
  darkMode: boolean;
}

// 차트 스타일 인터페이스
interface ChartStyle {
  text: string;
  background: string;
  stroke: string;
}

const ChartContainer = ({ 
  title, 
  data, 
  dataKey, 
  type = 'line',
  color = '#3B82F6',
  fillColor,
  yAxisLabel,
  xAxisDataKey = 'time',
  comparativeDataKey,
  comparativeColor = '#82ca9d',
  darkMode
}: ChartContainerProps) => {
  // 공통 props
  const commonProps = {
    data,
    margin: { top: 5, right: 30, left: 20, bottom: 5 },
  };

  // 다크 모드에 따른 스타일
  const chartStyle: ChartStyle = {
    text: darkMode ? 'text-gray-300' : 'text-gray-800',
    background: darkMode ? 'bg-gray-800' : 'bg-white',
    stroke: darkMode ? '#374151' : '#e5e7eb'
  };

  // 차트 렌더링
  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke={chartStyle.stroke} />
            <XAxis dataKey={xAxisDataKey} tick={{ fill: darkMode ? '#9ca3af' : '#4b5563' }} />
            <YAxis unit={yAxisLabel} tick={{ fill: darkMode ? '#9ca3af' : '#4b5563' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: darkMode ? '#374151' : '#fff',
                color: darkMode ? '#e5e7eb' : '#111827',
                border: `1px solid ${darkMode ? '#4b5563' : '#d1d5db'}`
              }} 
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey={dataKey} 
              stroke={color} 
              name={`${dataKey} ${yAxisLabel ? `(${yAxisLabel})` : ''}`} 
              activeDot={{ r: 8 }}
            />
          </LineChart>
        );
      
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke={chartStyle.stroke} />
            <XAxis dataKey={xAxisDataKey} tick={{ fill: darkMode ? '#9ca3af' : '#4b5563' }} />
            <YAxis unit={yAxisLabel} tick={{ fill: darkMode ? '#9ca3af' : '#4b5563' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: darkMode ? '#374151' : '#fff',
                color: darkMode ? '#e5e7eb' : '#111827',
                border: `1px solid ${darkMode ? '#4b5563' : '#d1d5db'}`
              }} 
            />
            <Legend />
            <Area 
              type="monotone" 
              dataKey={dataKey} 
              stroke={color} 
              fill={fillColor || `${color}33`} 
              name={`${dataKey} ${yAxisLabel ? `(${yAxisLabel})` : ''}`}
            />
          </AreaChart>
        );
      
      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke={chartStyle.stroke} />
            <XAxis dataKey={xAxisDataKey} tick={{ fill: darkMode ? '#9ca3af' : '#4b5563' }} />
            <YAxis unit={yAxisLabel} tick={{ fill: darkMode ? '#9ca3af' : '#4b5563' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: darkMode ? '#374151' : '#fff',
                color: darkMode ? '#e5e7eb' : '#111827',
                border: `1px solid ${darkMode ? '#4b5563' : '#d1d5db'}`
              }} 
            />
            <Legend />
            <Bar 
              dataKey={dataKey} 
              fill={color} 
              name={`${dataKey} ${yAxisLabel ? `(${yAxisLabel})` : ''}`}
            />
            {comparativeDataKey && (
              <Bar 
                dataKey={comparativeDataKey} 
                fill={comparativeColor} 
                name={`${comparativeDataKey} ${yAxisLabel ? `(${yAxisLabel})` : ''}`}
              />
            )}
          </BarChart>
        );
      
      default:
        return <div>지원하지 않는 차트 유형입니다.</div>;
    }
  };

  return (
    <div className={`p-4 rounded shadow ${chartStyle.background}`}>
      <h3 className={`text-lg font-semibold mb-4 ${chartStyle.text}`}>{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartContainer;
