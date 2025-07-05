import { useAuth } from '../context/AuthContext'

const Dashboard = () => {
    const { user } = useAuth()

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        Welcome back, {user?.name || 'User'}!
                    </h1>
                    <p className="text-gray-600 mb-6">
                        This is your dashboard. You can manage your books and track your sales here.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold text-blue-900">Active Listings</h3>
                            <p className="text-2xl font-bold text-blue-600">0</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold text-green-900">Books Sold</h3>
                            <p className="text-2xl font-bold text-green-600">0</p>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                            <h3 className="text-lg font-semibold text-purple-900">Total Earnings</h3>
                            <p className="text-2xl font-bold text-purple-600">₹0</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard