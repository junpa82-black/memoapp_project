import Image from "next/image"

export function BrandSection() {
  return (
    <section id="brand" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/images/brand-story.jpg"
              alt="MAISON 아틀리에 작업실"
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-8">
            <p className="text-sm tracking-[0.3em] uppercase text-accent">
              Our Story
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight text-balance">
              {"시대를 초월하는 아름다움을 만들다"}
            </h2>
            <div className="h-px w-16 bg-accent" />
            <p className="text-muted-foreground leading-relaxed text-base lg:text-lg">
              {"2010년 서울에서 시작된 MAISON은 '진정한 스타일은 트렌드를 넘어선다'는 철학 아래, 클래식과 모던의 완벽한 조화를 추구해왔습니다. 최고급 원단과 장인 정신으로 만들어진 우리의 컬렉션은 입는 이에게 자신감과 품격을 선사합니다."}
            </p>
            <p className="text-muted-foreground leading-relaxed text-base lg:text-lg">
              {"15년이 넘는 시간 동안 MAISON은 한국을 대표하는 프리미엄 패션 브랜드로 성장하며, 국내외 패션 시장에서 독자적인 위치를 확립했습니다."}
            </p>

            <div className="grid grid-cols-3 gap-6 pt-4">
              <div>
                <p className="font-serif text-3xl md:text-4xl text-foreground">15+</p>
                <p className="text-sm text-muted-foreground mt-1">{"년의 역사"}</p>
              </div>
              <div>
                <p className="font-serif text-3xl md:text-4xl text-foreground">50+</p>
                <p className="text-sm text-muted-foreground mt-1">{"매장 수"}</p>
              </div>
              <div>
                <p className="font-serif text-3xl md:text-4xl text-foreground">1M+</p>
                <p className="text-sm text-muted-foreground mt-1">{"고객 수"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
