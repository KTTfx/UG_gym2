import { useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { Search, AlertCircle, CheckCircle, Clock, X } from 'lucide-react';
import { sampleUsers } from '../data/sampleData';

interface UserDetailsModalProps {
  user: any;
  onClose: () => void;
  onUpdateStatus: (userId: string, status: string) => void;
}

const UserDetailsModal = ({ user, onClose, onUpdateStatus }: UserDetailsModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#002147]">User Details</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Name</h3>
                <p className="mt-1 text-lg text-gray-900">{user.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">User Type</h3>
                <p className="mt-1 text-lg text-gray-900 capitalize">{user.userType}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="mt-1 text-lg text-gray-900">{user.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                <p className="mt-1 text-lg text-gray-900">{user.contactNumber}</p>
              </div>
              {user.universityId && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">University ID</h3>
                  <p className="mt-1 text-lg text-gray-900">{user.universityId}</p>
                </div>
              )}
              {user.hallOfResidence && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Hall of Residence</h3>
                  <p className="mt-1 text-lg text-gray-900">{user.hallOfResidence}</p>
                </div>
              )}
              {user.department && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Department</h3>
                  <p className="mt-1 text-lg text-gray-900">{user.department}</p>
                </div>
              )}
            </div>

            {user.medicalCondition && (
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-yellow-800">Medical Condition</h3>
                <p className="mt-1 text-yellow-700">{user.medicalCondition}</p>
              </div>
            )}

            {user.subscription && (
              <div className="border-t pt-4">
                <h3 className="text-lg font-medium text-[#002147] mb-3">Subscription Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Plan</h4>
                    <p className="mt-1 text-gray-900 capitalize">{user.subscription.duration} Plan</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Price</h4>
                    <p className="mt-1 text-gray-900">GH₵{user.subscription.price}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Start Date</h4>
                    <p className="mt-1 text-gray-900">
                      {new Date(user.subscription.startDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">End Date</h4>
                    <p className="mt-1 text-gray-900">
                      {new Date(user.subscription.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="border-t pt-4">
              <h3 className="text-lg font-medium text-[#002147] mb-3">Update Status</h3>
              <div className="flex space-x-3">
                <button
                  onClick={() => onUpdateStatus(user.id, 'approved')}
                  className="px-4 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors"
                >
                  Mark as Paid
                </button>
                <button
                  onClick={() => onUpdateStatus(user.id, 'on-hold')}
                  className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition-colors"
                >
                  Put on Hold
                </button>
                <button
                  onClick={() => onUpdateStatus(user.id, 'pending')}
                  className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Mark as Pending
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AdminDashboard() {
  const location = useLocation();
  const user = location.state?.user;

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [usersData, setUsersData] = useState(sampleUsers);

  if (!user || user.userType !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  const users = Object.values(usersData).filter(u => u.userType !== 'admin');
  
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.universityId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.contactNumber.includes(searchTerm);

    if (filterStatus === 'all') return matchesSearch;
    if (filterStatus === 'pending') return matchesSearch && user.subscription?.status === 'pending';
    if (filterStatus === 'approved') return matchesSearch && user.subscription?.status === 'approved';
    if (filterStatus === 'on-hold') return matchesSearch && user.subscription?.status === 'on-hold';
    if (filterStatus === 'medical') return matchesSearch && user.medicalCondition;
    return matchesSearch;
  });

  const handleUpdateStatus = (userId: string, newStatus: string) => {
    setUsersData(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(key => {
        if (updated[key].id === userId && updated[key].subscription) {
          updated[key].subscription.status = newStatus;
        }
      });
      return updated;
    });
    setSelectedUser(null);
  };

  const getStatusBadge = (user: any) => {
    if (user.medicalCondition && (!user.subscription || user.subscription.status !== 'approved')) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          <AlertCircle className="w-4 h-4 mr-1" />
          Medical Clearance Required
        </span>
      );
    }
    if (user.subscription?.status === 'approved') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          <CheckCircle className="w-4 h-4 mr-1" />
          Active
        </span>
      );
    }
    if (user.subscription?.status === 'pending') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
          <Clock className="w-4 h-4 mr-1" />
          Payment Pending
        </span>
      );
    }
    if (user.subscription?.status === 'on-hold') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
          <AlertCircle className="w-4 h-4 mr-1" />
          On Hold
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        No Subscription
      </span>
    );
  };

  const calculateDaysLeft = (subscription: any) => {
    if (!subscription) return 0;
    const endDate = new Date(subscription.endDate);
    const today = new Date();
    return Math.max(0, Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 3600 * 24)));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-2xl font-bold text-[#002147] mb-6">Admin Dashboard</h1>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, ID, or phone..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002147]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-lg ${
                filterStatus === 'all'
                  ? 'bg-[#002147] text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterStatus('pending')}
              className={`px-4 py-2 rounded-lg ${
                filterStatus === 'pending'
                  ? 'bg-[#002147] text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilterStatus('approved')}
              className={`px-4 py-2 rounded-lg ${
                filterStatus === 'approved'
                  ? 'bg-[#002147] text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilterStatus('on-hold')}
              className={`px-4 py-2 rounded-lg ${
                filterStatus === 'on-hold'
                  ? 'bg-[#002147] text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              On Hold
            </button>
            <button
              onClick={() => setFilterStatus('medical')}
              className={`px-4 py-2 rounded-lg ${
                filterStatus === 'medical'
                  ? 'bg-[#002147] text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Medical
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Membership
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user: any) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.userType.charAt(0).toUpperCase() + user.userType.slice(1)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                    <div className="text-sm text-gray-500">{user.contactNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.subscription ? (
                      <div>
                        <div className="text-sm text-gray-900">
                          {user.subscription.duration.charAt(0).toUpperCase() + 
                           user.subscription.duration.slice(1)} Plan
                        </div>
                        <div className="text-sm text-gray-500">
                          {calculateDaysLeft(user.subscription)} days left
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">No active plan</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(user)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-3">
                      {user.subscription?.status === 'pending' && (
                        <button
                          onClick={() => handleUpdateStatus(user.id, 'approved')}
                          className="text-green-600 hover:text-green-800"
                        >
                          Approve
                        </button>
                      )}
                      <button
                        className="text-[#002147] hover:text-[#003167] font-semibold"
                        onClick={() => setSelectedUser(user)}
                      >
                        View Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onUpdateStatus={handleUpdateStatus}
        />
      )}
    </div>
  );
}