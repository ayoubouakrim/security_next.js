'use client';

import { useState } from 'react';
import { Eye, EyeOff, ArrowRight, Mountain } from 'lucide-react';
import { useAuth } from '@/security/service/AuthContext';

interface UserLogin {
    email: string;
    password: string;
}

export default function LoginPage() {
    const [formData, setFormData] = useState<UserLogin>({
        email: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [errors, setErrors] = useState<Partial<UserLogin>>({});
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name as keyof UserLogin]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<UserLogin> = {};

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            // Simulate API call
            await login(formData.email, formData.password);
            console.log('Login data:', formData);
            alert('Login successful!');
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex">
            {/* Left side - Hero section */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                {/* Background gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-blue-600/10 to-indigo-800/30" />
                
                {/* Mountain silhouette background */}
                <div 
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 800'%3E%3Cpath d='M0,400 Q200,200 400,300 T800,250 L1000,400 L1000,800 L0,800 Z' fill='%23000' opacity='0.4'/%3E%3Cpath d='M0,500 Q300,300 500,400 T900,350 L1000,500 L1000,800 L0,800 Z' fill='%23000' opacity='0.3'/%3E%3C/svg%3E")`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'bottom'
                    }}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-center px-16 text-white">                 
                    <h1 className="text-5xl font-light leading-tight mb-6">
                        Welcome Back,<br />
                        <span className="font-semibold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                            Creative Explorer
                        </span>
                    </h1>
                    
                    <p className="text-lg text-gray-300 max-w-md leading-relaxed">
                        Continue your journey and share your visual stories with our community.
                    </p>

                    {/* Progress indicators */}
                    <div className="flex space-x-2 mt-12">
                        <div className="h-1 w-8 bg-white rounded-full"></div>
                        <div className="h-1 w-8 bg-white/30 rounded-full"></div>
                        <div className="h-1 w-8 bg-white/30 rounded-full"></div>
                    </div>
                </div>

                {/* Floating elements */}
                <div className="absolute top-20 right-20 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <div className="absolute bottom-32 left-20 w-1 h-1 bg-blue-400 rounded-full animate-ping"></div>
            </div>

            {/* Right side - Login form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-800/50 backdrop-blur-sm">
                <div className="w-full max-w-md">
                    {/* Mobile header */}
                    <div className="lg:hidden flex items-center justify-between mb-8">
                        <div className="flex items-center space-x-2">
                            <Mountain className="w-6 h-6 text-purple-400" />
                            <span className="text-xl font-bold text-white">AMU</span>
                        </div>
                        <button className="text-gray-400 hover:text-white transition-colors">
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-light text-white mb-2">Sign in to your account</h2>
                        <p className="text-gray-400">
                            Don't have an account?{' '}
                            <button className="text-purple-400 hover:text-purple-300 transition-colors underline decoration-purple-400/30">
                                Create one
                            </button>
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email */}
                        <div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all backdrop-blur-sm ${
                                    errors.email ? 'border-red-500' : 'border-slate-600'
                                }`}
                            />
                            {errors.email && (
                                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className={`w-full px-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all backdrop-blur-sm pr-12 ${
                                    errors.password ? 'border-red-500' : 'border-slate-600'
                                }`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                            {errors.password && (
                                <p className="text-red-400 text-sm mt-1">{errors.password}</p>
                            )}
                        </div>

                        {/* Remember me and Forgot password */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 text-purple-500 bg-slate-700 border-slate-600 rounded focus:ring-purple-500 focus:ring-2"
                                />
                                <label htmlFor="remember" className="text-sm text-gray-400">
                                    Remember me
                                </label>
                            </div>
                            
                            <button 
                                type="button"
                                className="text-sm text-purple-400 hover:text-purple-300 transition-colors underline decoration-purple-400/30"
                            >
                                Forgot password?
                            </button>
                        </div>

                        {/* Submit button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                                isLoading
                                    ? 'bg-slate-600 text-gray-400 cursor-not-allowed'
                                    : 'bg-purple-600 hover:from-purple-700 hover:to-blue-700 text-white transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-purple-500/25'
                            }`}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                                    <span>Signing in...</span>
                                </div>
                            ) : (
                                'Sign in'
                            )}
                        </button>

                        {/* Divider */}
                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-600"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-slate-800/50 px-4 text-gray-400">Or continue with</span>
                            </div>
                        </div>

                        {/* Social buttons */}
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                className="flex items-center justify-center space-x-2 px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white hover:bg-slate-700 transition-all backdrop-blur-sm group"
                            >
                                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                <span>Google</span>
                            </button>

                            <button
                                type="button"
                                className="flex items-center justify-center space-x-2 px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white hover:bg-slate-700 transition-all backdrop-blur-sm group"
                            >
                                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                                </svg>
                                <span>Apple</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}