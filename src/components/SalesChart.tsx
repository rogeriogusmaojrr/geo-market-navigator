
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, LineChart, Line } from 'recharts';

interface SalesDataPoint {
  name: string;
  value: number;
  previous?: number;
}

interface SalesChartProps {
  title: string;
  description?: string;
  data: SalesDataPoint[];
  type?: 'area' | 'bar' | 'line';
  height?: number;
  colors?: string[];
  yAxisLabel?: string;
  showLegend?: boolean;
}

const SalesChart: React.FC<SalesChartProps> = ({
  title,
  description,
  data,
  type = 'area',
  height = 300,
  colors = ['#1E88E5', '#26A69A'],
  yAxisLabel,
  showLegend = false,
}) => {
  const renderChart = () => {
    switch (type) {
      case 'area':
        return (
          <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors[0]} stopOpacity={0.8} />
                <stop offset="95%" stopColor={colors[0]} stopOpacity={0} />
              </linearGradient>
              {data[0]?.previous !== undefined && (
                <linearGradient id="colorPrevious" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors[1]} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={colors[1]} stopOpacity={0} />
                </linearGradient>
              )}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" />
            <YAxis label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            {showLegend && <Legend />}
            <Area type="monotone" dataKey="value" stroke={colors[0]} fillOpacity={1} fill="url(#colorValue)" />
            {data[0]?.previous !== undefined && (
              <Area type="monotone" dataKey="previous" stroke={colors[1]} fillOpacity={1} fill="url(#colorPrevious)" />
            )}
          </AreaChart>
        );
        
      case 'bar':
        return (
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" />
            <YAxis label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            {showLegend && <Legend />}
            <Bar dataKey="value" fill={colors[0]} />
            {data[0]?.previous !== undefined && (
              <Bar dataKey="previous" fill={colors[1]} />
            )}
          </BarChart>
        );
        
      case 'line':
        return (
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" />
            <YAxis label={{ value: yAxisLabel, angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            {showLegend && <Legend />}
            <Line type="monotone" dataKey="value" stroke={colors[0]} activeDot={{ r: 8 }} />
            {data[0]?.previous !== undefined && (
              <Line type="monotone" dataKey="previous" stroke={colors[1]} />
            )}
          </LineChart>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          {renderChart()}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SalesChart;
