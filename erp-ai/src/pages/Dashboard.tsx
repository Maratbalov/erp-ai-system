import {
  ChartBarIcon,
  CubeIcon,
  ShoppingCartIcon,
  UsersIcon,
  CurrencyDollarIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

// Updated layout fixes - trigger deployment
interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'increase' | 'decrease';
  icon: React.ComponentType<{ className?: string }>;
}

function MetricCard({ title, value, change, changeType, icon: Icon }: MetricCardProps) {
  return (
    <div className="card dashboard-card">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Icon className="h-6 w-6 text-primary-500" />
        </div>
        <div className="ml-4 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
              {title}
            </dt>
            <dd className="flex items-baseline">
              <div className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {value}
              </div>
              {change && (
                <div
                  className={`ml-2 flex items-baseline text-sm font-semibold ${
                    changeType === 'increase'
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {change}
                </div>
              )}
            </dd>
          </dl>
        </div>
      </div>
    </div>
  );
}

export function Dashboard() {
  const metrics = [
    {
      title: 'Продажи за месяц',
      value: '₽1,240,000',
      change: '+12.5%',
      changeType: 'increase' as const,
      icon: CurrencyDollarIcon,
    },
    {
      title: 'Заказы',
      value: 156,
      change: '+8.2%',
      changeType: 'increase' as const,
      icon: ShoppingCartIcon,
    },
    {
      title: 'Товары',
      value: 2840,
      change: '+4.1%',
      changeType: 'increase' as const,
      icon: CubeIcon,
    },
    {
      title: 'Клиенты',
      value: 892,
      change: '+15.3%',
      changeType: 'increase' as const,
      icon: UsersIcon,
    },
  ];

  const lowStockItems = [
    { name: 'iPhone 15 Pro', stock: 3, min: 10 },
    { name: 'Samsung Galaxy S24', stock: 1, min: 5 },
    { name: 'MacBook Air M3', stock: 2, min: 8 },
  ];

  const recentOrders = [
    { id: '001', client: 'ООО "Техносвязь"', amount: '₽45,000', status: 'confirmed' },
    { id: '002', client: 'ИП Иванов А.А.', amount: '₽12,500', status: 'shipped' },
    { id: '003', client: 'ООО "Дигитал"', amount: '₽78,900', status: 'draft' },
  ];

  return (
    <div className="space-y-4 p-4 max-w-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Дашборд
        </h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Обзор ключевых показателей вашего бизнеса
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="dashboard-grid">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>

      {/* Charts and Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Sales Chart */}
        <div className="card dashboard-card">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
            Продажи за последние 7 дней
          </h3>
          <div className="h-48 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="text-center">
              <ChartBarIcon className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500 dark:text-gray-400">
                График будет добавлен с Recharts
              </p>
            </div>
          </div>
        </div>

        {/* Low Stock Alert */}
        <div className="card dashboard-card">
          <div className="flex items-center mb-4">
            <ExclamationTriangleIcon className="h-5 w-5 text-amber-500 mr-2" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              Низкие остатки
            </h3>
          </div>
          <div className="space-y-3">
            {lowStockItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0 border-gray-200 dark:border-gray-700">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Минимум: {item.min} шт.
                  </p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 ml-2 flex-shrink-0">
                  {item.stock} шт.
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="card dashboard-card">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
          Последние заказы
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Клиент
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Сумма
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Статус
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                    #{order.id}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {order.client}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                    {order.amount}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        order.status === 'confirmed'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : order.status === 'shipped'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}
                    >
                      {order.status === 'confirmed' ? 'Подтвержден' : 
                       order.status === 'shipped' ? 'Отправлен' : 'Черновик'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 