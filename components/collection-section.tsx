import Image from "next/image"
import { ArrowRight } from "lucide-react"

const categories = [
  {
    title: "Women",
    subtitle: "여성 컬렉션",
    image: "/images/category-women.jpg",
    description: "세련된 실루엣과 고급 소재로 완성된 여성 컬렉션",
  },
  {
    title: "Men",
    subtitle: "남성 컬렉션",
    image: "/images/category-men.jpg",
    description: "현대적 감각과 클래식의 조화, 남성 컬렉션",
  },
  {
    title: "Accessories",
    subtitle: "액세서리",
    image: "/images/category-accessories.jpg",
    description: "스타일을 완성하는 프리미엄 액세서리 컬렉션",
  },
]

export function CollectionSection() {
  return (
    <section id="collection" className="py-24 lg:py-32 bg-secondary">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] uppercase text-accent mb-4">
            Collections
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground text-balance">
            {"당신을 위한 스타일"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((cat) => (
            <a
              key={cat.title}
              href="#"
              className="group relative overflow-hidden bg-background"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.subtitle}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-500" />
              </div>
              <div className="p-6">
                <h3 className="font-serif text-2xl text-foreground">{cat.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{cat.subtitle}</p>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                  {cat.description}
                </p>
                <div className="mt-4 flex items-center gap-2 text-accent text-sm tracking-widest uppercase">
                  <span>{"컬렉션 보기"}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
