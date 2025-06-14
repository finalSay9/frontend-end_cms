import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HomeIcon, 
  UsersIcon, 
  FolderIcon, 
  CogIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClipboardDocumentListIcon,
  CalendarDaysIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  DocumentTextIcon,
  UserIcon,
  BellIcon,
  ChatBubbleLeftRightIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  BuildingOfficeIcon,
  UserPlusIcon,
  VideoCameraIcon,
  XMarkIcon,
  PlusIcon,
  PhoneIcon,
  EnvelopeIcon,
  IdentificationIcon,
  CalendarIcon as CalendarSmallIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

interface NavItem {
  label: string;
  href?: string;
  icon: React.ElementType;
  badge?: number;
  onClick?: () => void;
}

interface AccountSubItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { label: 'Employees', href: '/employees', icon: UsersIcon, badge: 325 },
  { label: 'Task Board', href: '/taskboard', icon: ClipboardDocumentListIcon, badge: 12 },
  { label: 'Events', href: '/events', icon: CalendarDaysIcon },
  { label: 'Projects', href: '/projects', icon: FolderIcon, badge: 8 },
  { label: 'Leave Management', href: '/leave-management', icon: CalendarIcon, badge: 5 },
  { label: 'Payroll', href: '/payroll', icon: CurrencyDollarIcon },
  { label: 'Performance', href: '/performance', icon: ChartBarIcon },
  { label: 'Reports', href: '/reports', icon: DocumentTextIcon },
  { label: 'Settings', href: '/settings', icon: CogIcon },
];

const accountSubItems: AccountSubItem[] = [
  { label: 'Profile', href: '/profile', icon: UserIcon },
  { label: 'Notifications', href: '/notification', icon: BellIcon },
  { label: 'Messages', href: '/messages', icon: ChatBubbleLeftRightIcon },
];

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [isAccountExpanded, setIsAccountExpanded] = useState<boolean>(false);
  const [showEmployeeModal, setShowEmployeeModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'add' | 'interview'>('add');
  const [isInterviewActive, setIsInterviewActive] = useState<boolean>(false);
  const pathname = usePathname();

  // Form state for adding new employee
  const [newEmployee, setNewEmployee] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    startDate: '',
    address: '',
    employeeId: ''
  });

  // Interview state
  const [interviewData, setInterviewData] = useState({
    candidateName: '',
    position: '',
    interviewDate: '',
    interviewTime: '',
    interviewType: 'video',
    notes: ''
  });

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
    if (!isCollapsed) {
      setIsAccountExpanded(false);
    }
  };

  const toggleAccountMenu = () => {
    if (!isCollapsed) {
      setIsAccountExpanded(!isAccountExpanded);
    }
  };

  const openEmployeeModal = () => {
    setShowEmployeeModal(true);
  };

  const closeEmployeeModal = () => {
    setShowEmployeeModal(false);
    setActiveTab('add');
    setIsInterviewActive(false);
  };

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Adding new employee:', newEmployee);
    // Here you would typically send the data to your backend
    alert('Employee added successfully!');
    setNewEmployee({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      position: '',
      department: '',
      startDate: '',
      address: '',
      employeeId: ''
    });
  };

  const handleStartInterview = () => {
    setIsInterviewActive(true);
    console.log('Starting interview with:', interviewData);
    // Here you would typically integrate with a video conferencing API
  };

  const handleEndInterview = () => {
    setIsInterviewActive(false);
    alert('Interview ended successfully!');
  };

  const isAccountActive = accountSubItems.some(item => pathname === item.href);

  // Add the HR Management item to nav items
  const navItemsWithHR: NavItem[] = [
    ...navItems.slice(0, 2), // Dashboard and Employees
    { label: 'HR Management', icon: UserPlusIcon, onClick: openEmployeeModal, badge: 3 },
    ...navItems.slice(2) // Rest of the items
  ];

  return (
    <>
      <div className={`
        bg-gradient-to-b from-teal-800 to-teal-900 text-white 
        ${isCollapsed ? 'w-16' : 'w-64'} 
        transition-all duration-300 ease-in-out
        flex flex-col 
        h-screen lg:h-[calc(100vh-4rem)]
        shadow-xl border-r border-teal-700
      `}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-teal-700/50">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <BuildingOfficeIcon className="h-6 w-6 text-teal-300" />
              <span className="font-semibold text-teal-100">Navigation</span>
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-teal-700/50 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-200 hidden lg:block"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <ChevronRightIcon className="h-5 w-5 text-teal-300" />
            ) : (
              <ChevronLeftIcon className="h-5 w-5 text-teal-300" />
            )}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-teal-600 scrollbar-track-teal-800">
          <ul className="space-y-1">
            {navItemsWithHR.map((item) => {
              const isActive = item.href ? pathname === item.href : false;
              
              if (item.onClick) {
                return (
                  <li key={item.label}>
                    <button
                      onClick={item.onClick}
                      className={`
                        group flex items-center p-3 rounded-lg text-sm font-medium 
                        transition-all duration-200 relative w-full text-left
                        text-teal-100 hover:bg-teal-700/50 hover:text-white
                      `}
                      title={isCollapsed ? item.label : undefined}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0 transition-colors duration-200 text-teal-300 group-hover:text-white" />
                      
                      {!isCollapsed && (
                        <>
                          <span className="ml-3 truncate">{item.label}</span>
                          {item.badge && (
                            <span className="ml-auto bg-teal-600 text-white text-xs rounded-full px-2 py-1 min-w-[1.5rem] text-center">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </button>
                  </li>
                );
              }

              return (
                <li key={item.label}>
                  <Link
                    href={item.href!}
                    className={`
                      group flex items-center p-3 rounded-lg text-sm font-medium 
                      transition-all duration-200 relative
                      ${isActive 
                        ? 'bg-teal-700 text-white shadow-lg' 
                        : 'text-teal-100 hover:bg-teal-700/50 hover:text-white'
                      }
                    `}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <item.icon className={`
                      h-5 w-5 flex-shrink-0 transition-colors duration-200
                      ${isActive ? 'text-white' : 'text-teal-300 group-hover:text-white'}
                    `} />
                    
                    {!isCollapsed && (
                      <>
                        <span className="ml-3 truncate">{item.label}</span>
                        {item.badge && (
                          <span className="ml-auto bg-teal-600 text-white text-xs rounded-full px-2 py-1 min-w-[1.5rem] text-center">
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}

                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Account Section */}
        <div className="p-4 border-t border-teal-700/50 bg-teal-900/50">
          <div>
            <button
              onClick={toggleAccountMenu}
              className={`
                w-full flex items-center p-3 rounded-lg text-sm font-medium 
                transition-all duration-200 group
                ${isAccountActive 
                  ? 'bg-teal-700 text-white' 
                  : 'text-teal-100 hover:bg-teal-700/50 hover:text-white'
                }
              `}
              title={isCollapsed ? 'Account' : undefined}
            >
              <UserIcon className={`
                h-5 w-5 flex-shrink-0 transition-colors duration-200
                ${isAccountActive ? 'text-white' : 'text-teal-300 group-hover:text-white'}
              `} />
              
              {!isCollapsed && (
                <>
                  <span className="flex-1 text-left ml-3">Account</span>
                  <div className="ml-2">
                    {isAccountExpanded ? (
                      <ChevronUpIcon className="h-4 w-4 text-teal-400" />
                    ) : (
                      <ChevronDownIcon className="h-4 w-4 text-teal-400" />
                    )}
                  </div>
                </>
              )}
            </button>

            {/* Account Sub-menu */}
            {!isCollapsed && isAccountExpanded && (
              <div className="mt-2 space-y-1">
                {accountSubItems.map((subItem) => {
                  const isSubActive = pathname === subItem.href;
                  return (
                    <Link
                      key={subItem.label}
                      href={subItem.href}
                      className={`
                        group flex items-center p-2.5 ml-4 rounded-lg text-sm font-medium 
                        transition-all duration-200 relative
                        ${isSubActive
                          ? 'bg-teal-600 text-white'
                          : 'text-teal-200 hover:bg-teal-700/30 hover:text-white'
                        }
                      `}
                    >
                      <subItem.icon className={`
                        h-4 w-4 flex-shrink-0 transition-colors duration-200
                        ${isSubActive ? 'text-white' : 'text-teal-400 group-hover:text-white'}
                      `} />
                      <span className="ml-3 truncate">{subItem.label}</span>
                      
                      {/* Sub-item active indicator */}
                      {isSubActive && (
                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-white rounded-r-full" />
                      )}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* User Profile Summary */}
          {!isCollapsed && (
            <div className="mt-4 p-3 bg-teal-800/50 rounded-lg border border-teal-700/30">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-medium">EC</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white truncate">Evan Chimwaza</div>
                  <div className="text-xs text-teal-300 truncate">HR Manager</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* HR Management Modal */}
      {showEmployeeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">HR Management</h2>
              <button
                onClick={closeEmployeeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XMarkIcon className="h-6 w-6 text-gray-500" />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('add')}
                className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                  activeTab === 'add'
                    ? 'bg-teal-50 text-teal-700 border-b-2 border-teal-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <PlusIcon className="h-5 w-5 inline mr-2" />
                Add New Employee
              </button>
              <button
                onClick={() => setActiveTab('interview')}
                className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                  activeTab === 'interview'
                    ? 'bg-teal-50 text-teal-700 border-b-2 border-teal-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <VideoCameraIcon className="h-5 w-5 inline mr-2" />
                Online Interview
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              {activeTab === 'add' && (
                <form onSubmit={handleAddEmployee} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        required
                        value={newEmployee.firstName}
                        onChange={(e) => setNewEmployee({...newEmployee, firstName: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="Enter first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        required
                        value={newEmployee.lastName}
                        onChange={(e) => setNewEmployee({...newEmployee, lastName: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="Enter last name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <EnvelopeIcon className="h-4 w-4 inline mr-1" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={newEmployee.email}
                        onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="Enter email address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <PhoneIcon className="h-4 w-4 inline mr-1" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={newEmployee.phone}
                        onChange={(e) => setNewEmployee({...newEmployee, phone: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="Enter phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Position
                      </label>
                      <input
                        type="text"
                        required
                        value={newEmployee.position}
                        onChange={(e) => setNewEmployee({...newEmployee, position: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="Enter position"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Department
                      </label>
                      <select
                        required
                        value={newEmployee.department}
                        onChange={(e) => setNewEmployee({...newEmployee, department: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      >
                        <option value="">Select department</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Sales">Sales</option>
                        <option value="HR">Human Resources</option>
                        <option value="Finance">Finance</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <IdentificationIcon className="h-4 w-4 inline mr-1" />
                        Employee ID
                      </label>
                      <input
                        type="text"
                        required
                        value={newEmployee.employeeId}
                        onChange={(e) => setNewEmployee({...newEmployee, employeeId: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        placeholder="Enter employee ID"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <CalendarSmallIcon className="h-4 w-4 inline mr-1" />
                        Start Date
                      </label>
                      <input
                        type="date"
                        required
                        value={newEmployee.startDate}
                        onChange={(e) => setNewEmployee({...newEmployee, startDate: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPinIcon className="h-4 w-4 inline mr-1" />
                      Address
                    </label>
                    <textarea
                      value={newEmployee.address}
                      onChange={(e) => setNewEmployee({...newEmployee, address: e.target.value})}
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="Enter full address"
                    />
                  </div>
                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={closeEmployeeModal}
                      className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                    >
                      Add Employee
                    </button>
                  </div>
                </form>
              )}

              {activeTab === 'interview' && (
                <div className="space-y-6">
                  {!isInterviewActive ? (
                    <form onSubmit={(e) => { e.preventDefault(); handleStartInterview(); }} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Candidate Name
                          </label>
                          <input
                            type="text"
                            required
                            value={interviewData.candidateName}
                            onChange={(e) => setInterviewData({...interviewData, candidateName: e.target.value})}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                            placeholder="Enter candidate name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Position
                          </label>
                          <input
                            type="text"
                            required
                            value={interviewData.position}
                            onChange={(e) => setInterviewData({...interviewData, position: e.target.value})}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                            placeholder="Enter position"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Interview Date
                          </label>
                          <input
                            type="date"
                            required
                            value={interviewData.interviewDate}
                            onChange={(e) => setInterviewData({...interviewData, interviewDate: e.target.value})}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Interview Time
                          </label>
                          <input
                            type="time"
                            required
                            value={interviewData.interviewTime}
                            onChange={(e) => setInterviewData({...interviewData, interviewTime: e.target.value})}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Interview Type
                        </label>
                        <select
                          value={interviewData.interviewType}
                          onChange={(e) => setInterviewData({...interviewData, interviewType: e.target.value})}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        >
                          <option value="video">Video Conference</option>
                          <option value="phone">Phone Call</option>
                          <option value="in-person">In Person</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Notes
                        </label>
                        <textarea
                          value={interviewData.notes}
                          onChange={(e) => setInterviewData({...interviewData, notes: e.target.value})}
                          rows={4}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          placeholder="Enter interview notes or questions..."
                        />
                      </div>
                      <div className="flex justify-end space-x-4">
                        <button
                          type="button"
                          onClick={closeEmployeeModal}
                          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
                        >
                          <VideoCameraIcon className="h-5 w-5 mr-2" />
                          Start Interview
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="text-center space-y-6">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                        <VideoCameraIcon className="h-16 w-16 text-green-600 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-green-800 mb-2">
                          Interview in Progress
                        </h3>
                        <p className="text-green-700">
                          Currently interviewing: <strong>{interviewData.candidateName}</strong>
                        </p>
                        <p className="text-green-600 text-sm mt-2">
                          Position: {interviewData.position}
                        </p>
                      </div>
                      
                      <div className="bg-gray-100 rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-2">Video Conference Simulation</p>
                        <div className="bg-black rounded-lg h-64 flex items-center justify-center">
                          <div className="text-white text-center">
                            <VideoCameraIcon className="h-12 w-12 mx-auto mb-2" />
                            <p>Video Conference Active</p>
                            <p className="text-sm opacity-75">Candidate: {interviewData.candidateName}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-center space-x-4">
                        <button
                          onClick={handleEndInterview}
                          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                          End Interview
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;