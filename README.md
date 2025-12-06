# ruma.cvecara.shop

## Pregled
ruma.cvecara.shop je savremena e-commerce platforma za lokalnu cvećaru, inspirisana konkurentskim sajtom prikazanim na screenshotovima, ali sa ciljanim unapređenjima u brzini, dostupnosti i UX-u. Plan je da se sa jedne codebase instanciraju poddomene za 15 gradova uz dosledan vizuelni identitet i lokalizovane sadržaje.

## Ciljevi
- **Bolji UX od konkurencije**: jasniji CTA-ovi, stabilniji hero slider, preciznije filtriranje i brže učitavanje proizvoda.
- **Višestadijski asortiman**: prikaz aranžmana, korpi, buketa, balona, poklon korpi i dodataka (čokolade, vino, plišane igračke) uz bedževe za novitet, akciju i dostupnost.
- **Jedinstveno održavanje**: konfiguracija gradskih poddomena kroz deljene komponente i per-lokacija podatke (kontakt, radno vreme, adrese, zone dostave).
- **SEO i performanse**: minimalan CLS u hero sekciji, optimizovane WebP slike, unapred pripremljeni meta tagovi i sitemaps za sve poddomene.

## Inspiracija iz konkurentskog sajta
- **Hero i istaknuti proizvodi**: široki baner sa kampanjskim vizualom (npr. Dan zaljubljenih) i grid od 4+ istaknuta proizvoda sa CTA „Dodaj u korpu“.
- **Kategorije i filteri**: levo bočno stablo sa kategorijama i cenovnim/povodnim filterima; etikete poput „novo“, „istaknuto“ i „na akciji“ na karticama proizvoda.
- **Shop stranica**: pregledi u kolonama 3–4, breadcrumbs, paginacija, kvadratić za brzi pregled i brza kupovina.
- **Kontakt stranica**: višestruke adrese i telefoni, kontakt forma, iframe mape, radno vreme i linkovi ka društvenim mrežama u futeru.
- **Header/footer**: sticky header sa brzim kontaktima, pretraga, želje, nalog i korpa; futer sa linkovima, radnim vremenom i newsletterom.

## Funkcionalni zahtevi
- **Kupovina**: dodavanje u korpu direktno iz grida, upravljanje količinama, kupovina bez registracije i podrška za promo kodove.
- **Lokalizacija**: srpski (latinica) kao primarni jezik; fleksibilnost za dodavanje engleskog. Valuta RSD sa jasnim simbolom i razdvajanjem hiljada.
- **Dostava**: definisane zone po gradu sa dinamičkim prikazom cene dostave i dostupnog termina.
- **CMS integracija**: sadržaji (opisi, hero kampanje, blog/novosti) treba da se uređuju kroz headless CMS; proizvodi sinkronizovani iz baze/ERP-a.
- **Analytics**: ugrađen Google Tag Manager i osnovni e-commerce events (view_item, add_to_cart, begin_checkout, purchase).

## Tehnološki predlog
- **Front-end**: Next.js 14 (App Router) + TypeScript, Tailwind CSS, Framer Motion za mikro animacije, Zustand/Context za korpu.
- **Back-end/API**: Next.js API route ili serverless funkcije; opcionalno povezivanje na headless CMS (npr. Strapi/Sanity) i payment gateway (Stripe/PayPal lokalni ekvivalent).
- **Slike i CDN**: Next.js Image + CDN (npr. Cloudflare Images) sa automatskim formatima (WebP/AVIF) i responsive breakpoints.
- **Testiranje**: Jest/React Testing Library za UI, Playwright za E2E checkout tokove; ESLint + Prettier za stil.

## Informaciona arhitektura
- **Početna (/)/**: hero slider, istaknuti proizvodi, blok „Najprodavaniji“, sekcija sa povodima (Rođendani, Godišnjice, 8. mart, Dan zaljubljenih, Nova godina), testimoniali i CTA za kontakt.
- **Shop (/shop)**: filteri (cena, povod, boja, tip biljke, dostupnost), sortiranje, badge-ovi, paginacija, quick view modal, breadcrumbs.
- **Proizvod (/p/{slug})**: galerija sa zoomom, dostupnost po gradu, dodatni proizvodi (čokolade, vino), preporuke i sekcija „Kupci su kupovali i“.
- **Kontakt (/kontakt)**: više lokacija sa mapama, telefonske linije, radno vreme, forma za upit i CTA za Viber/WhatsApp.
- **Blog (/novosti)**: članci o aranžmanima, saveti za negu biljaka, sezonske kampanje.

## Dizajn smernice
- **Paleta**: pastelne zelene i bež nijanse, kontrastni CTA (tamno zelena), akcentni crveni/ružičasti za praznične kampanje.
- **Tipografija**: sans-serif sa dobrom čitljivošću (npr. Inter ili Manrope), veličina baze 16px, jasno istaknute h1–h3 hijerarhije.
- **Karte proizvoda**: jasna cena, bedž, kratki opis, dimenzije i dostupnost; hover efekat sa sekundarnom slikom.
- **Obrasci**: validacija u realnom vremenu, jasne poruke o greškama, CTA dugme pune širine na mobilu.
- **Responsive**: prioritizovati mobile-first; sticky bottom bar na mobilu sa CTA „Pozovi“ i „Korpa“.

## Operativa i sadržaj
- **Poddomene**: konfiguracioni fajl (npr. `config/locations.ts`) sa podacima po gradu (adresa, telefoni, radno vreme, zone dostave, porez/dostava, lokalni hero vizuali).
- **Mediji**: imenovanje `kategorija-naziv-proizvoda-hero.webp`; alt tekst na srpskom, opisno.
- **Pravne stranice**: Uslovi korišćenja, Politika privatnosti, Politika kolačića i Pravila o reklamacijama.

## Plan rada (kratko)
1. Postaviti osnovnu Next.js/TypeScript strukturu sa Tailwind konfiguracijom.
2. Definisati CMS šemu za proizvode, povode i gradove; pripremiti seed podatke.
3. Izgraditi komponente: header, hero, grid proizvoda, sidebar filteri, kartica proizvoda, quick view modal, footer.
4. Implementirati korpu i checkout tok sa validacijom, kuponima i kalkulacijom dostave po zoni.
5. Dodati analitiku, SEO optimizaciju (Open Graph, structured data) i pristupačnost (WCAG AA).
6. Pripremiti CI za testove, lint i preview deploy.

## Lokalno pokretanje (placeholder)
Codebase još nije postavljen. Kada se inicijalizuje, dodati korake za instalaciju (`pnpm install`), razvoj (`pnpm dev`) i testiranje (`pnpm test` / `pnpm lint`).
