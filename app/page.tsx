import Header from "@/components/Header";
import SkidSteerControl from "@/components/SkidSteerControl";
import MintAgent from '@/components/MintAgent'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-8 p-24">
      <Header />
      <MintAgent />
      <SkidSteerControl />
    </main>
  );
}
