import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

const Home = () => {
    return (
        <div className='flex flex-col justify-center items-center'>
            <p
                className='text-5xl text-blue-600 m-4 text-center'
            >Anna Oasis</p>

            <div className='max-w-4xl mx-auto flex flex-col gap-2 p-2'>
                <p>Important Links</p>
                <Button>
                    <Link to='/admissionForm'>
                        Fill admissionForm
                    </Link>
                </Button>
            </div>
        </div>
    );
}

export default Home;
