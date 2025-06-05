import { Menu, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  BellIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';
import { clsx } from 'clsx';

interface HeaderProps {
  onMenuClick: () => void;
  onAiChatToggle: () => void;
  aiChatOpen: boolean;
}

export function Header({ onMenuClick, onAiChatToggle, aiChatOpen }: HeaderProps) {
  const { user, signOut } = useAuth();

  return (
    <div className="relative z-10 flex-shrink-0 flex h-16 bg-white dark:bg-gray-800 shadow border-b border-gray-200 dark:border-gray-700">
      {/* Mobile menu button */}
      <button
        type="button"
        className="px-4 border-r border-gray-200 dark:border-gray-700 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 md:hidden"
        onClick={onMenuClick}
      >
        <Bars3Icon className="h-6 w-6" />
      </button>

      {/* Desktop sidebar spacing */}
      <div className="hidden md:block md:w-64"></div>

      <div className="flex-1 px-4 flex justify-between">
        {/* Search */}
        <div className="flex-1 flex">
          <div className="w-full flex md:ml-0">
            <label htmlFor="search-field" className="sr-only">
              Поиск
            </label>
            <div className="relative w-full text-gray-400 focus-within:text-gray-600">
              <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5" />
              </div>
              <input
                id="search-field"
                className="block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent bg-transparent"
                placeholder="Поиск товаров, заказов, клиентов..."
                type="search"
                name="search"
              />
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="ml-4 flex items-center md:ml-6 space-x-4">
          {/* AI Chat Toggle */}
          <button
            type="button"
            onClick={onAiChatToggle}
            className={clsx(
              'p-2 rounded-md transition-colors',
              aiChatOpen
                ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                : 'text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400'
            )}
          >
            <ChatBubbleLeftRightIcon className="h-6 w-6" />
          </button>

          {/* Notifications */}
          <button
            type="button"
            className="p-2 rounded-md text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 transition-colors"
          >
            <BellIcon className="h-6 w-6" />
          </button>

          {/* Profile dropdown */}
          <Menu as="div" className="relative">
            <div>
              <Menu.Button className="max-w-xs bg-white dark:bg-gray-800 flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                <img
                  className="h-8 w-8 rounded-full"
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user?.email || 'User'
                  )}&background=667eea&color=fff`}
                  alt="Профиль"
                />
              </Menu.Button>
            </div>
            <Transition
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {user?.email}
                  </p>
                </div>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={clsx(
                        active ? 'bg-gray-100 dark:bg-gray-700' : '',
                        'block px-4 py-2 text-sm text-gray-700 dark:text-gray-300'
                      )}
                    >
                      Профиль
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={clsx(
                        active ? 'bg-gray-100 dark:bg-gray-700' : '',
                        'block px-4 py-2 text-sm text-gray-700 dark:text-gray-300'
                      )}
                    >
                      Настройки
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={signOut}
                      className={clsx(
                        active ? 'bg-gray-100 dark:bg-gray-700' : '',
                        'block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300'
                      )}
                    >
                      Выйти
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
} 