'use client';

import { useState, useEffect } from 'react';
// Note: router not required here; login shows a notice instead of redirecting
import Link from 'next/link';
import { useAuthStore } from '@/lib/store/auth-store';
import { useServerStore } from '@/lib/store/server-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, Lock, Mail, GraduationCap, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import type { AuthError } from '@/lib/types/api';

export default function LoginPage() {
    const { isConfigured } = useServerStore();
    const login = useAuthStore((state) => state.login);
    const error = useAuthStore((state) => state.error);
    const clearError = useAuthStore((state) => state.clearError);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

    // Clear auth errors when component mounts or form data changes
    useEffect(() => {
        if (error) {
            clearError();
        }
    }, [formData.email, formData.password, clearError, error]);

    const validateForm = () => {
        const newErrors: { email?: string; password?: string } = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
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
            await login(formData);
            toast.success('Welcome back! Redirecting to dashboard...');

            // Use window.location for a hard redirect to ensure state is fresh
            window.location.href = '/dashboard';
        } catch (error) {
            console.error('Login error:', error);
            // Error is already handled by the auth store and displayed below
            setIsLoading(false);
        }
    };

    const getErrorDisplay = (authError: AuthError) => {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                        <h4 className="text-sm font-medium text-red-800 mb-1">
                            {authError.error}
                        </h4>
                        <p className="text-sm text-red-700">
                            {authError.message}
                        </p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full mb-4 shadow-lg">
                        <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Welcome Back</h1>
                    <p className="text-slate-600 dark:text-slate-400">Sign in to your University Clubs account</p>
                    <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">Powered by Second Brain Database Auth</p>
                </div>

                {/* Server configuration notice */}
                {!isConfigured && (
                    <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm text-yellow-800">
                            Server not configured.{' '}
                            <a href="/server-setup" className="font-medium text-yellow-900 underline">
                                Configure server
                            </a>
                        </p>
                    </div>
                )}

                <Card className="shadow-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                    <CardHeader className="space-y-1 pb-4">
                        <CardTitle className="text-xl font-semibold text-center text-slate-900 dark:text-white">Sign In</CardTitle>
                        <CardDescription className="text-center text-slate-600 dark:text-slate-400">
                            Access your club dashboard
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {error && getErrorDisplay(error)}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium text-slate-900 dark:text-white">
                                    Email Address
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email address"
                                        value={formData.email}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
                                        disabled={isLoading}
                                        className={`pl-10 h-11 transition-all duration-200 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 ${errors.email ? 'border-red-300 focus:border-red-500' : 'focus:border-indigo-500'
                                            }`}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-sm text-red-500 flex items-center gap-1">
                                        <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm font-medium text-slate-900 dark:text-white">
                                    Password
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, password: e.target.value })}
                                        disabled={isLoading}
                                        className={`pl-10 pr-10 h-11 transition-all duration-200 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 ${errors.password ? 'border-red-300 focus:border-red-500' : 'focus:border-indigo-500'
                                            }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-3 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-sm text-red-500 flex items-center gap-1">
                                        <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-11 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Signing in...
                                    </div>
                                ) : (
                                    'Sign In'
                                )}
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                Don&apos;t have an account?{' '}
                                <Link
                                    href="/auth/signup"
                                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 font-medium transition-colors hover:underline"
                                >
                                    Sign up here
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
