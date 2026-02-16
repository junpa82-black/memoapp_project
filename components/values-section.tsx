import { Gem, Leaf, Heart, Sparkles } from "lucide-react"

const values = [
  {
    icon: Gem,
    title: "장인 정신",
    description:
      "모든 제품은 숙련된 장인의 손을 거쳐 탄생합니다. 한 땀 한 땀 정성을 담아 최고 품질의 의류를 만들어냅니다.",
  },
  {
    icon: Leaf,
    title: "지속 가능한 패션",
    description:
      "친환경 소재와 윤리적 생산 방식을 통해 환경과 사회에 책임을 다하는 지속 가능한 패션을 추구합니다.",
  },
  {
    icon: Heart,
    title: "고객 중심",
    description:
      "고객 한 분 한 분의 라이프스타일을 이해하고, 개인에게 맞는 최적의 스타일링을 제안합니다.",
  },
  {
    icon: Sparkles,
    title: "혁신과 전통",
    description:
      "최신 패션 트렌드와 전통적인 테일러링 기법을 결합하여, 시대를 초월하는 새로운 스타일을 창조합니다.",
  },
]

export function ValuesSection() {
  return (
    <section id="values" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] uppercase text-accent mb-4">
            Our Values
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground text-balance">
            {"MAISON이 추구하는 가치"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {values.map((value) => (
            <div
              key={value.title}
              className="group flex flex-col items-center text-center p-8 border border-border hover:border-accent transition-colors"
            >
              <div className="flex h-14 w-14 items-center justify-center border border-border group-hover:border-accent group-hover:text-accent transition-colors mb-6">
                <value.icon className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-xl text-foreground mb-3">{value.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
