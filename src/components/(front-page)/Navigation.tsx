"use client";
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navigation = () => {
    const pathname = usePathname();
    const logoClasses = 'text-xl font-bold';
    const letterClasses = 'mx-1';
    const linkClasses = (href: string) => cn('text-black hover:text-gray-700', { 'font-bold underline': pathname === href, });
    return (
        (!pathname.includes("admin")) ? (
            <nav className="flex justify-between items-center p-4 text-black border-b-2 border-b-black">
                <div className="text-2xl font-bold">
                    <Link href="/" className={logoClasses}>
                        <span className={`${letterClasses} text-blue-500`}>M</span>
                        <span className={`${letterClasses} text-green-500`}>V</span>
                        <span className={`${letterClasses} text-red-500`}>T</span>
                    </Link>
                </div>
                <div className="flex space-x-4">
                    <Link href="/" className={linkClasses('/')}>Accueil</Link>
                    <Link href="/voitures" className={linkClasses('/voitures')}>Voitures</Link>
                    <Link href="/about" className={linkClasses('/about')}>À Propos</Link>
                    <Link href="/contact" className={linkClasses('/contact')}>Contact</Link>
                </div>
            </nav>
        ) : null
    );
}

export default Navigation;
