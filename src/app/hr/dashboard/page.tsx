"use client"
import React, { useState } from 'react';
import { Bar, Pie, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Sample employee performance data
const employeePerformanceData = [
  { firstName: 'John', surname: 'Doe', designation: 'IT', performance: 92, department: 'IT' },
  { firstName: 'Jane', surname: 'Smith', designation: 'HR', performance: 88, department: 'Other' },
  { firstName: 'Mike', surname: 'Johnson', designation: 'Developer', performance: 95, department: 'IT' },
  { firstName: 'Sarah', surname: 'Williams', designation: 'Marketing', performance: 85, department: 'Other' },
  { firstName: 'David', surname: 'Brown', designation: 'IT Support', performance: 90, department: 'IT' },
  { firstName: 'Lisa', surname: 'Davis', designation: 'Sales', performance: 78, department: 'Other' },
];

export default function Dashboard() {
  const [selectedUnit, setSelectedUnit] = useState<'sales' | 'marketing'>('sales');

  // Sample data for different visualizations
  const salaryStatisticsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Average Salary ($)',
        data: [5500, 5800, 6000, 5900, 6200, 6100],
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 2,
      },
    ],
  };

  const salesUnitData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Sales Performance',
        data: [25000, 32000, 28000, 35000],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
      },
    ],
  };

  const marketingUnitData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Marketing Performance',
        data: [18000, 22000, 25000, 30000],
        backgroundColor: 'rgba(168, 85, 247, 0.5)',
        borderColor: 'rgba(168, 85, 247, 1)',
        borderWidth: 2,
      },
    ],
  };

  const incomeAnalysisData = {
    labels: ['Revenue', 'Profit', 'Expenses'],
    datasets: [
      {
        data: [60, 25, 15],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const employeeStructureData = {
    labels: ['Male', 'Female'],
    datasets: [
      {
        label: 'Employee Count',
        data: [180, 145],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(236, 72, 153, 0.8)',
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(236, 72, 153, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return 'text-green-600 bg-green-100';
    if (performance >= 80) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getPerformanceLabel = (performance: number) => {
    if (performance >= 90) return 'Excellent';
    if (performance >= 80) return 'Good';
    return 'Needs Improvement';
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">HR Dashboard</h1>
      
      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* New Employees Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-600">New Employees</h3>
              <p className="text-3xl font-bold text-blue-600">24</p>
              <p className="text-sm text-green-600">+12% from last month</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Total Employees Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-600">Total Employees</h3>
              <p className="text-3xl font-bold text-green-600">325</p>
              <p className="text-sm text-gray-500">Active workforce</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Average Salary Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-purple-500">
          <div className="flex items-center">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-600">Average Salary</h3>
              <p className="text-3xl font-bold text-purple-600">$5,850</p>
              <p className="text-sm text-green-600">+5.2% this year</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <svg className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
        </div>

        {/* Total Salary Budget Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-orange-500">
          <div className="flex items-center">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-600">Total Salary Budget</h3>
              <p className="text-3xl font-bold text-orange-600">$1.9M</p>
              <p className="text-sm text-gray-500">Monthly budget</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <svg className="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {/* Salary Statistics Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Salary Statistics</h3>
          <div className="h-64">
            <Bar
              data={salaryStatisticsData}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                },
                scales: {
                  y: { beginAtZero: true },
                },
              }}
            />
          </div>
        </div>

        {/* Unit Performance with Toggle */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Unit Performance</h3>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setSelectedUnit('sales')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  selectedUnit === 'sales'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Sales
              </button>
              <button
                onClick={() => setSelectedUnit('marketing')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  selectedUnit === 'marketing'
                    ? 'bg-purple-500 text-white'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Marketing
              </button>
            </div>
          </div>
          <div className="h-64">
            <Bar
              data={selectedUnit === 'sales' ? salesUnitData : marketingUnitData}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                },
                scales: {
                  y: { beginAtZero: true },
                },
              }}
            />
          </div>
        </div>

        {/* Income Analysis */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Income Analysis</h3>
          <div className="h-64">
            <Doughnut
              data={incomeAnalysisData}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'bottom' },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Employee Structure and Performance Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Employee Structure */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Employee Structure</h3>
          <div className="h-64 mb-4">
            <Bar
              data={employeeStructureData}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                },
                scales: {
                  y: { beginAtZero: true },
                },
              }}
            />
          </div>
          <div className="flex justify-center space-x-8 text-sm">
            <div className="text-center">
              <div className="flex items-center justify-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span className="font-medium">Male: 180</span>
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center">
                <div className="w-3 h-3 bg-pink-500 rounded-full mr-2"></div>
                <span className="font-medium">Female: 145</span>
              </div>
            </div>
            <div className="text-center">
              <span className="font-semibold text-gray-700">Total: 325</span>
            </div>
          </div>
        </div>

        {/* Employee Performance Table */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Employee Performance</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-2 font-medium text-gray-600">Name</th>
                  <th className="text-left py-2 px-2 font-medium text-gray-600">Designation</th>
                  <th className="text-left py-2 px-2 font-medium text-gray-600">Dept</th>
                  <th className="text-center py-2 px-2 font-medium text-gray-600">Performance</th>
                  <th className="text-center py-2 px-2 font-medium text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {employeePerformanceData.map((employee, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-2">
                      <div className="font-medium text-gray-900">
                        {employee.firstName} {employee.surname}
                      </div>
                    </td>
                    <td className="py-3 px-2 text-gray-600">{employee.designation}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        employee.department === 'IT' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {employee.department}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-center">
                      <div className="flex flex-col items-center">
                        <span className="font-bold text-gray-900">{employee.performance}%</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getPerformanceColor(employee.performance)}`}>
                          {getPerformanceLabel(employee.performance)}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-center">
                      <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}