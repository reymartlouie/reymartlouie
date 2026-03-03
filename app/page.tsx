import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#111111]">
      <div className="max-w-[1280px] mx-auto px-4 py-4 md:px-6 md:py-6 flex flex-col gap-4">
        <Navbar />
        <Hero />
        <Projects />
        <Footer />
      </div>
    </main>
  )
}
