
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const AvailabilityOverTime = () => {
  const data = [
    { week: 0, own: 95, competition: 60 },
    { week: 1, own: 45, competition: 55 },
    { week: 2, own: 40, competition: 45 },
    { week: 3, own: 65, competition: 40 },
    { week: 4, own: 50, competition: 35 },
    { week: 5, own: 55, competition: 50 },
    { week: 6, own: 35, competition: 95 },
    { week: 7, own: 15, competition: 75 },
    { week: 8, own: 75, competition: 70 },
    { week: 9, own: 65, competition: 45 }
  ];

  const chartConfig = {
    own: {
      label: "Our Availability",
      color: "#577399",
    },
    competition: {
      label: "Competition Availability", 
      color: "#C1CFDA",
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-brand-navy mb-6">Availability Over Time</h3>
      
      <ChartContainer config={chartConfig} className="h-64 w-full">
        <LineChart data={data}>
          <XAxis 
            dataKey="week" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6B7280' }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6B7280' }}
            domain={[0, 100]}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line 
            type="monotone" 
            dataKey="own" 
            stroke="#577399" 
            strokeWidth={2}
            dot={{ fill: '#577399', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: '#577399' }}
          />
          <Line 
            type="monotone" 
            dataKey="competition" 
            stroke="#C1CFDA" 
            strokeWidth={2}
            dot={{ fill: '#C1CFDA', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: '#C1CFDA' }}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
};

export default AvailabilityOverTime;
