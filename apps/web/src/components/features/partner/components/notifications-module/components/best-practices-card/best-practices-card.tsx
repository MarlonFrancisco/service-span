import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui';
import { Icons } from '../../notifications-module.utils';

interface TBestPractice {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface TBestPracticesCardProps {
  practices: TBestPractice[];
}

export function BestPracticesCard({ practices }: TBestPracticesCardProps) {
  return (
    <Card className="border-gray-200 bg-gradient-to-br from-gray-50 to-white">
      <CardHeader>
        <CardTitle className="text-gray-900 flex items-center gap-2">
          <Icons.TrendingUp className="h-5 w-5 text-gray-600" />
          Dicas para Melhorar o Engajamento
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {practices.map((practice, index) => (
            <div
              key={index}
              className="p-4 bg-white rounded-lg border border-gray-200"
            >
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                {practice.icon}
              </div>
              <h4 className="text-sm text-gray-900 mb-1">{practice.title}</h4>
              <p className="text-xs text-gray-600">{practice.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
