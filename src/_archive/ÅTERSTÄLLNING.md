# Arkiv — BOPG

Filerna här är **inte raderade, bara urkopplade**. De ligger utanför `src/pages/`
och `src/components/`, så Astro varken bygger eller routar dem. Historiken är
intakt: allt flyttades med `git mv`, så `git log --follow <fil>` visar hela
förflutna.

## tjanstekort/
De sex tjänstekorten och deras undersidor, urkopplade när BOPG lades om mot
CM-uppdrag (Construction Management). Innehåller:

| Fil | Låg tidigare på |
|---|---|
| `ServicesOverview.jsx` | `src/components/home/ServicesOverview.jsx` |
| `ServiceDetail.jsx` | `src/components/services/ServiceDetail.jsx` |
| `services.js` | `src/data/services.js` |
| `tjanster.astro` | `src/pages/tjanster.astro` (rutt `/tjanster`) |
| `[slug].astro` | `src/pages/tjanster/[slug].astro` (sex rutter `/tjanster/*`) |

## for-efter-slider/
| Fil | Låg tidigare på |
|---|---|
| `BeforeAfterSection.jsx` | `src/components/home/BeforeAfterSection.jsx` |

Bildmaterialet ligger kvar orört i `public/forevefter/` och `public/services/`.

## brand-video/
Den loopande 3D-logotypfilmen på startsidan, urkopplad när blocket gjordes om
till en interaktiv bildlösning (`src/components/home/BrandLogo.astro`). Klippet
vägde 2,1 MB och var sidans tyngsta resurs; de två PNG:erna som ersatte det
väger 107 kB tillsammans.

| Fil | Låg tidigare på |
|---|---|
| `BrandVideo.astro` | `src/components/home/BrandVideo.astro` |
| `logo-3d-rotating.mp4` | `public/logo-3d-rotating.mp4` |
| `logo-3d-rotating-poster.jpg` | `public/logo-3d-rotating-poster.jpg` |

Mp4:an och postern flyttades ut ur `public/` så att de inte längre följer med i
bygget. De ligger kvar här orörda.

## bolagssektion/
Sektionen Våra bolag, urkopplad när projektgalleriet flyttades till dess plats
på startsidan. Den är byggd och färdig — den scrollstyrda bolagsstacken med
sticky scen, dvala per kort och progressindikator — men tre av fyra kort är
platshållare utan namn. **Ta tillbaka den när bolagen har riktiga namn.**

| Fil | Låg tidigare på |
|---|---|
| `CompaniesSection.astro` | `src/components/home/CompaniesSection.astro` |

Kort 01 är redan färdigt: AD Byggprojekt Stockholm AB med kategori, fakta och
länk till adbyggprojekt.se. Kort 02–04 väntar på namn, beskrivning och adress.
Fälten `category` och `facts` är valfria — kort utan dem renderar som förut.

Rubriktexten lever vidare: ögonbrynet "Gruppen", rubriken "Våra bolag" och
ingressen om att gruppen är navet är hämtade ordagrant härifrån till
`ProjectGallery.astro`, som numera renderar sektionen Våra bolag med
dragspelspaneler i stället för den gamla kortstacken. Ändras texten på ett
ställe ska den ändras på båda, annars glider de isär.

Ankaret `#bolag` sitter på den sektionen. Tas kortstacken tillbaka ska id:t
flytta dit, och `#bolag` lyftas ur `scroll-margin-top`-listan i `global.css` —
kortstacken är en sticky scen som ska börja exakt vid sin egen överkant.

## Återställa
`git mv` tillbaka till sökvägen i tabellen, och lägg tillbaka:
- importen + `<ServicesOverview client:visible />` / `<BeforeAfterSection client:visible />` i `src/pages/index.astro`
- `{ label: 'Tjänster', href: BASE + 'tjanster' }` i `links` i `src/components/layout/Navbar.jsx`
- tjänstekolumnen i `src/components/layout/Footer.jsx`
- för `brand-video/`: flytta tillbaka filerna enligt tabellen och byt
  `<BrandLogo />` mot `<BrandVideo />` i `src/pages/index.astro` (och importen
  på rad 7). `public/logo-symbol.png` och `public/logo-wordmark.png` kan då tas
  bort, liksom `gsap` ur `package.json` om inget annat använder det.
- för `bolagssektion/`: `git mv` tillbaka till
  `src/components/home/CompaniesSection.astro`, lägg tillbaka importen och
  `<CompaniesSection />` i `src/pages/index.astro` (ovanför `<ProjectGallery />`,
  där den låg), och flytta `id="bolag"` från `LogoStrip.astro` tillbaka till
  sektionen.
