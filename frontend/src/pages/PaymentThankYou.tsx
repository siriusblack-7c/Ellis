import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const PaymentThankYou = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-center p-4">
            <div className="max-w-2xl">
                <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">Thank You for Your Interest!</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                    This feature is part of a proof-of-concept for our upcoming platform. While online payments are not yet active, we appreciate you exploring our services.
                </p>
                <div className="bg-blue-100 dark:bg-blue-900/30 border-l-4 border-blue-500 text-blue-700 dark:text-blue-300 p-4 mb-6 text-left">
                    <h2 className="font-bold mb-2">What's Next?</h2>
                    <p>Our dedicated caregivers are currently undergoing comprehensive training to provide you with the best possible care.</p>
                    <p className='mt-2'>We are excited to announce our official launch on <strong>December 1st, 2025</strong>.</p>
                    <p className='mt-2'>We will contact you as soon as we launch. As a token of our appreciation for your early interest, you will receive a <strong>15% discount</strong> on your first month of service.</p>
                </div>
                <p className="text-md text-gray-500 dark:text-gray-500 mb-8">
                    We are building a platform that prioritizes trust, quality, and compassion. Thank you for being a part of our journey from the beginning.
                </p>
                <Button asChild>
                    <Link to="/">Return to Homepage</Link>
                </Button>
            </div>
        </div>
    );
};

export default PaymentThankYou; 