import SignupCard from  '@/components/SIgnupCard'
import { handleSignup } from '@/utils/auth/authUtil';
import { useNavigate } from 'react-router';

function Signup() {
    const navigate = useNavigate();
    return (
        <div className="flex items-center justify-center min-h-screen bg-white px-4">
            <SignupCard onSubmit={(values) => {
                console.log("Signup values:", values);
                handleSignup(values, () => navigate('/login'));
            }} />
        </div>
    )
}

export default Signup