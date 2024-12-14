import Link from "next/link";

export default function Header (){
    return (
      <>
        <header className="bg-violet-300  text-white   shadow-lg">
          <div className="container mx-auto px-4 py-6 flex justify-between items-center">
            <Link href="/">
              <h1 className="md:text-3xl text-xl">Blog Website</h1>
            </Link>

            <nav className="space-x-10">
              <Link
                href="/"
                className="font-extrabold text-black hover:text-white hover:underline duration-500 "
              >
                Home
              </Link>
              <Link
                href="/about"
                className="font-extrabold active:text-black text-black hover:text-white hover:underline duration-500 "
              >
                About
              </Link>
              <Link
                href="/contact"
                className="font-extrabold active:text-black text-black hover:text-white hover:underline duration-500"
              >
                Contact
              </Link>
            </nav>
          </div>
        </header>
      </>
    );
}