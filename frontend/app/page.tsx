import Link from "next/link";
import { ArrowUpRight } from "lucide-react"

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      <main className="flex flex-col max-w-[360px]">
        <h1 className="text-3xl">Some awesome name</h1>
        <div className="text-base text-muted-foreground">Some description of what are trying to do yap yap yap</div>
        <Link href='/home' className="mt-16 flex justify-end underline underline-offset-2 opacity-60 hover:opacity-100 transition">
          Get Started <ArrowUpRight/>
        </Link>
      </main>
    </div>
  );
}
