import type React from "react"
import Link from "next/link"

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto py-4 px-5 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          My Website
        </Link>

        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/" className="hover:text-gray-500">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-gray-500">
                About
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-gray-500">
                Services
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gray-500">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header

