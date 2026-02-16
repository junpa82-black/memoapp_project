export function Footer() {
  return (
    <footer className="border-t border-border bg-foreground text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <a href="#" className="font-serif text-2xl tracking-[0.2em]">
              MAISON
            </a>
            <p className="mt-4 text-sm text-primary-foreground/60 leading-relaxed">
              {"시대를 초월하는 스타일을 제안하는 프리미엄 패션 브랜드"}
            </p>
          </div>

          <div>
            <h4 className="text-sm tracking-widest uppercase mb-4">{"쇼핑"}</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a href="#" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  {"여성 컬렉션"}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  {"남성 컬렉션"}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  {"액세서리"}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  {"신상품"}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm tracking-widest uppercase mb-4">{"회사"}</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a href="#brand" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  {"브랜드 소개"}
                </a>
              </li>
              <li>
                <a href="#values" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  {"기업 가치"}
                </a>
              </li>
              <li>
                <a href="#team" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  {"팀 소개"}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  {"채용 정보"}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm tracking-widest uppercase mb-4">{"고객 서비스"}</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a href="#contact" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  {"연락처"}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  {"배송 안내"}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  {"교환/반품"}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  {"개인정보처리방침"}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-primary-foreground/40">
            {"© 2026 MAISON. All rights reserved."}
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-primary-foreground/40 hover:text-primary-foreground transition-colors">
              Instagram
            </a>
            <a href="#" className="text-xs text-primary-foreground/40 hover:text-primary-foreground transition-colors">
              Facebook
            </a>
            <a href="#" className="text-xs text-primary-foreground/40 hover:text-primary-foreground transition-colors">
              YouTube
            </a>
            <a href="#" className="text-xs text-primary-foreground/40 hover:text-primary-foreground transition-colors">
              KakaoTalk
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
