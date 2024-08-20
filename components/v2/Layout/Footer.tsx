import Image from 'next/image'

const Footer: React.FC = () => {
    return (
        <footer className="left-0 w-full bg-base-100 shadow-lg-top rounded-box">
            <div className="container mx-auto py-4">
                <div className="flex justify-center">
                    <a href="https://github.com/frmjar/FunkoTraker"
                        target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-500 hover:text-blue-700 mr-5">
                        <Image src="/icons/github.svg" alt="GitHub" width={24} height={24} className='mr-2 dark:invert' />
                        GitHub
                    </a>
                    <a href="https://paypal.me/funkotracker?country.x=ES&locale.x=es_ES"
                        target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-500 hover:text-blue-700">
                        <Image src="/icons/paypal.svg" alt="PayPal" width={24} height={24} className='mr-2 dark:invert' />
                        PayPal
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer