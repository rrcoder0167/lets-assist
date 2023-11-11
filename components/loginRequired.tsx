"use client";
import React, { ReactNode } from 'react';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

interface LoginRequiredProps {
    children: ReactNode;
}

const LoginRequired: React.FC<LoginRequiredProps> = ({ children }) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'loading') return;

        if (!session) {
            router.push('/login');
        }
    }, [session, status, router]);

    return <>{children}</>;
};

export default LoginRequired;