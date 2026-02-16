import Image from "next/image"

export function TeamSection() {
  return (
    <section id="team" className="py-24 lg:py-32 bg-secondary">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="flex flex-col gap-8 order-2 lg:order-1">
            <p className="text-sm tracking-[0.3em] uppercase text-accent">
              Our Team
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight text-balance">
              {"열정으로 만드는 패션의 미래"}
            </h2>
            <div className="h-px w-16 bg-accent" />
            <p className="text-muted-foreground leading-relaxed text-base lg:text-lg">
              {"MAISON의 팀은 디자이너, 패턴사, MD, 마케터 등 다양한 분야의 전문가들로 구성되어 있습니다. 각자의 전문성과 창의력을 바탕으로, 고객에게 최고의 패션 경험을 제공하기 위해 끊임없이 노력합니다."}
            </p>
            <p className="text-muted-foreground leading-relaxed text-base lg:text-lg">
              {"서울, 부산, 제주에 위치한 우리의 오피스와 아틀리에에서는 매일 새로운 아이디어가 탄생하고, 트렌드를 선도하는 컬렉션이 만들어집니다."}
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="border border-border p-6">
                <p className="font-serif text-3xl text-foreground">200+</p>
                <p className="text-sm text-muted-foreground mt-1">{"팀 멤버"}</p>
              </div>
              <div className="border border-border p-6">
                <p className="font-serif text-3xl text-foreground">3</p>
                <p className="text-sm text-muted-foreground mt-1">{"오피스"}</p>
              </div>
            </div>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden order-1 lg:order-2">
            <Image
              src="/images/team.jpg"
              alt="MAISON 팀 미팅"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
