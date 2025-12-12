import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
            <h2 className="text-6xl font-bold text-cyan-400 mb-4">404</h2>
            <p className="text-xl text-gray-400 mb-8">This intelligence report does not exist.</p>
            <Link href="/" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full border border-white/20 transition">
                Return to HQ
            </Link>
        </div>
    )
}
