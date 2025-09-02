"use client";

import { useAuth } from "@/security/service/AuthContext";
import { useRouter } from "next/navigation";

const DashboardPage = () => {

    const { logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/login');
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800">Welcome to the Dashboard</h1>
                <div className="mt-4 text-gray-600">You are successfully logged in!</div>
                <button 
                    onClick={() => handleLogout() }
                    className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Logout
                </button>
            </div>
        </div>
    );
}
export default DashboardPage;