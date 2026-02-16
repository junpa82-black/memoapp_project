import { Mail, MapPin, Phone } from "lucide-react"

export function ContactSection() {
  return (
    <section id="contact" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] uppercase text-accent mb-4">
            Contact
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground text-balance">
            {"함께 이야기해요"}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-10 border border-border">
            <div className="flex h-14 w-14 items-center justify-center border border-border mb-6">
              <MapPin className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-serif text-lg text-foreground mb-2">{"방문"}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {"서울특별시 강남구 압구정로 123"}
              <br />
              {"MAISON 플래그십 스토어"}
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-10 border border-border">
            <div className="flex h-14 w-14 items-center justify-center border border-border mb-6">
              <Phone className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-serif text-lg text-foreground mb-2">{"전화"}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {"고객센터: 1588-0000"}
              <br />
              {"평일 09:00 - 18:00"}
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-10 border border-border">
            <div className="flex h-14 w-14 items-center justify-center border border-border mb-6">
              <Mail className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-serif text-lg text-foreground mb-2">{"이메일"}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {"contact@maison.co.kr"}
              <br />
              {"press@maison.co.kr"}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
