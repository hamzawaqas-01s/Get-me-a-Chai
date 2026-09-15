import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="flex flex-col justify-center gap-4 pt-15">
        <h1 className="text-center text-7xl">Get ME a Chai</h1>
        <div className="flex justify-center gap-5">
          <Link href={"/signup"}><button className="rounded-xl bg-cyan-600 text-white font-bold p-2">Get started</button></Link>
          <Link href={"/login"}><button className="rounded-xl bg-cyan-600 text-white font-bold p-2">Log in</button></Link>
        </div>
      </div>
    </div>
  );
}
