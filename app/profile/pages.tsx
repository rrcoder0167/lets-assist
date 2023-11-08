import './page.css';
import { useSession } from 'next-auth/react';
import LoginRequired from "@/components/loginRequired";

const ProfilePage = () => {
    const { status, data: session } = useSession();

    return (
        <>
            <LoginRequired>
                <h1>Hello World!</h1>
            </LoginRequired>
        </>
    );
}

export default ProfilePage;