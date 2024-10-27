import Link from 'next/link';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="flex justify-between p-4 bg-gray-800 text-white">
      <Link href="/">
        <h1 className="text-xl font-bold">Blogs</h1>
      </Link>
      <div>
        <Link href="/auth/login">
          <Button>Login</Button>
        </Link>
        <Link href="/auth/register">
          <Button variant="secondary" className="ml-2">Register</Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
