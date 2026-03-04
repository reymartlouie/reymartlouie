import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#111111]">
      <Navbar />
      <div className="max-w-[1280px] mx-auto px-4 pt-8 pb-32 md:px-6 md:pt-10 flex flex-col gap-4">
        <Hero />
        <Projects />
        <Footer />
      </div>
    </main>
  )
}
