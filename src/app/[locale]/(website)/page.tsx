import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";

export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
    <h4>{session?.user.email}</h4>
  );
}
