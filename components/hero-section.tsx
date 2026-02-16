import Image from "next/image"
import { ArrowDown } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <Image
        src="/images/hero.jpg"
        alt="MAISON 패션 컬렉션 히어로 이미지"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-foreground/40" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <p className="text-sm tracking-[0.3em] uppercase text-primary-foreground/80 mb-6">
          Since 2010
        </p>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-primary-foreground leading-tight text-balance">
          {"Style that"}
          <br />
          {"speaks for you"}
        </h1>
        <p className="mt-6 max-w-lg text-base md:text-lg text-primary-foreground/80 leading-relaxed">
          {"당신의 일상에 특별함을 더하는 프리미엄 패션. MAISON은 시대를 초월하는 스타일을 제안합니다."}
        </p>
        <a
          href="#brand"
          className="mt-10 inline-flex items-center gap-2 border border-primary-foreground/50 text-primary-foreground px-8 py-3 text-sm tracking-widest uppercase hover:bg-primary-foreground hover:text-foreground transition-all"
        >
          {"브랜드 스토리"}
          <ArrowDown className="h-4 w-4" />
        </a>
      </div>
    </section>
  )
}
