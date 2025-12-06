import type { BlogPost } from "@/lib/cms-types";

export const blogPostsMock: BlogPost[] = [
  {
    id: "blog-001",
    naslov: "Pastelne kombinacije za rođendanske bukete",
    slug: "pastelne-kombinacije-za-rodjendane",
    sadrzaj:
      "Pastelne kombinacije su idealne za rođendanske poklone jer odišu nežnošću i elegancijom. Koristite ruže, eustomu i hortenzije u slojevima da biste dobili bogat volumen. Dodajte malo eukaliptusa za teksturu i miris. Završni detalji poput saten trake ili personalizovane kartice čine poklon jedinstvenim.",
    heroSlika: "/images/blog-pastel.jpg",
    tagovi: ["inspiracija", "rodjendani"],
    datum: "2024-05-14",
  },
  {
    id: "blog-002",
    naslov: "Kako odabrati cvetne poklone za godišnjicu",
    slug: "cvetni-pokloni-za-godisnjicu",
    sadrzaj:
      "Za godišnjice birajte kombinacije koje imaju posebno značenje. Crvene ruže simbolizuju ljubav, dok orhideje ukazuju na dugotrajnost. Kombinujte ih sa zelenilom i diskretnim mirisima. Dodavanje male bočice vina ili pralina može upotpuniti doživljaj i pokazati dodatnu pažnju.",
    heroSlika: "/images/blog-anniversary.jpg",
    tagovi: ["saveti", "godisnjice"],
    datum: "2024-04-28",
  },
  {
    id: "blog-003",
    naslov: "Zeleni aranžmani koji osvežavaju enterijer",
    slug: "zeleni-aranzmani-za-enterijer",
    sadrzaj:
      "Biljni aranžmani sa više nijansi zelene donose mir i svežinu u svaki prostor. Koristite paprat, monstere i sukulente u kombinaciji sa dekorativnim kamenčićima. Postavite ih u minimalističke posude kako bi biljke došle do izražaja. Redovno orošavanje i prirodno svetlo čuvaju njihov izgled.",
    heroSlika: "/images/blog-greenery.jpg",
    tagovi: ["dekoracija", "saveti"],
    datum: "2024-03-30",
  },
];
