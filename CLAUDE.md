# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Koden, kommentarerna och commit-meddelandena i det här projektet är på svenska. Skriv nya kommentarer och commits på svenska.

## Kommandon

```bash
npm run dev      # http://localhost:4321/
npm run build    # statiskt bygge till dist/
npm run preview  # servera dist/
```

**Det finns inga tester och ingen linter.** Bygget är enda automatiska grinden. `npx astro check` går inte att köra — `@astrojs/check` är inte installerat.

Verifiering görs därför i en webbläsare: mät i DOM:en (verkliga mått, `getComputedStyle`, scrollpositioner) i stället för att lita på att koden ser rätt ut. Kontrollera alltid även utan JavaScript och med `prefers-reduced-motion`.

Viktigt vid lokal förhandsgranskning: port 4321 upptas ofta av ett annat Astro-projekt på samma maskin. Kontrollera vilken port `astro preview` faktiskt valde innan du mäter — annars mäter du fel sajt.

## Publicering

Push till `main` → `.github/workflows/deploy.yml` → GitHub Pages på **bopg.aimstudios.se** (`public/CNAME`). CI kör `npm ci`, så `package-lock.json` måste vara committad.

`astro.config.mjs` sätter `site` men **ingen `base`** — sajten bor i domänroten, och `import.meta.env.BASE_URL` är `/`.

Alla sidor har `robots = 'noindex, nofollow'` som standard i `Layout.astro`. Det är avsiktligt: sajten är ett arbetsprov på en subdomän och ska inte konkurrera med kundens riktiga sajt. Ändra först vid en verklig lansering.

## Arkitektur

### Progressiv förbättring är husregeln

Grundtillståndet i markup och CSS är det **färdiga, synliga** läget. Ett script lägger sedan på en klass som sätter **startläget**. Aldrig `opacity: 0`, `clip-path` eller absolut positionering i markupen eller i grund-CSS:en.

Bakgrunden: framer-motions `initial={{ opacity: 0 }}` serverrenderar `style="opacity:0"` rakt in i HTML:en, och sajten hade 22 osynliga element utan JavaScript. Samma fälla finns i tredjepartskomponenter som låter GSAP ångra en `opacity: 0` från CSS.

Klasserna som används: `is-js` (BrandLogo), `is-enhanced` (sticky-scener), `is-timeline` (ProcessSection på mobil), och `.reveal` i `global.css` — en ren CSS-animation som spelas även utan JavaScript och slutar i färdigt läge.

Kontroll efter bygge: `grep -c 'opacity:0' dist/index.html` ska ge 0.

### Scrollstyrda sticky-sektioner

`BrandLogo.astro`, `ProcessSection.astro` och den arkiverade `CompaniesSection.astro` delar samma konstruktion: **spår** (högt) → **scen** (`position: sticky`, 100svh) → innehåll. Tre saker är lätta att råka bryta:

1. **Sektionen har ingen egen padding** — den ligger på scenen. Det gör att sektionens box är exakt spårets, så ScrollTriggerns `start: 'top top'` / `end: 'bottom bottom'` sammanfaller på pixeln med den sträcka scenen sitter fast.
2. **`overflow: hidden` ligger på scenen, inte på sektionen.** På sektionen bryter den `position: sticky` — ett element kan inte sitta fast mot en förfader som själv är en klippande scrollcontainer.
3. **GSAP `matchMedia` grindar allt:** `(min-width: 761px) and (min-height: 620px) and (prefers-reduced-motion: no-preference)`. Höjdvillkoret är inte kosmetiskt — scenen är 100svh och klipper innehållet i ett lågt fönster. Cleanup-funktionen kör `clearProps: 'all'` så att DOM:en återgår till exakt samma läge som utan JavaScript när ett villkor slutar gälla.

Sektionerna använder också en **dvala**: varje steg står still ungefär en tredjedel av sitt intervall innan nästa tar vid, med smoothstep i övergången. Utan den rör sig innehållet konstant och hinner aldrig läsas.

### Rörelsesystem

`:root` i `global.css` definierar `--ease`, `--dur-enter` (640 ms, entréer) och `--dur-hover` (240 ms). Använd dem i stället för nya magiska värden.

Tre tekniker i bruk, med olika roller:
- **GSAP + ScrollTrigger** för allt scrollstyrt. `scrub` kopplar rörelsen till scrollpositionen, så den går baklänges vid uppscroll.
- **framer-motion** bara kvar för hero-bildens parallax. Använd den inte till nytt — den drar ~300 kB och lockar till `initial`-mönstret ovan.
- **CSS-animationer** för entréer (`.reveal`), eftersom de spelas utan JavaScript.

### React-öar

Astro-sidorna är skalet, React-komponenterna är öar. Hydreringsdirektiven är valda, inte slumpade: `HeroSection` är `client:idle` och **inte** `client:load` — hero-bilden är sidans LCP-element, och `client:load` band huvudtråden i drygt fem sekunder med CPU-strypning innan bilden hann målas. Motiveringen står i `index.astro`; ändra den inte utan att mäta om.

### Tailwind används inte som utilities

`global.css` importerar Tailwind för reset och registrerar paletten i ett `@theme`-block, men **markupen innehåller noll utility-klasser**. All styling är handskriven CSS i `global.css` plus scoped `<style>` i komponenterna. Följ det mönstret; att börja blanda in utilities är ett eget beslut, inte en detalj.

### `src/data/company.js` är enda källan

Firmanamn, kortform, ordmärke, org.nr, telefon, e-post, adress och koordinater. Sajten hade en gång två stavningar av firmanamnet live samtidigt. Hårdkoda aldrig namnet i en komponent eller sidtitel.

### `src/_archive/` — urkopplat, inte raderat

Filer som tagits ur bruk flyttas dit med `git mv` (så `git log --follow` överlever) och får en rad i `src/_archive/ÅTERSTÄLLNING.md` med tabell över var de låg och exakta återställningssteg. Fyra poster i dag, bland dem den färdigbyggda bolagskortstacken som ska tillbaka när bolagen får riktiga namn.

### Externa anrop är reglerade av integritetspolicyn

`src/pages/integritetspolicy.astro` räknar upp exakt vilka tredjepartsvärdar som kontaktas — i dag **en enda**: OpenStreetMap i kartan på `/kontakt`. Lägger du till en extern URL (bild, typsnitt, analys, CDN) måste policytexten uppdateras i samma commit, annars blir den osann. Typsnitten self-hostas via `@fontsource` både av det skälet och för att en `@import` mot Google Fonts blockerade första målningen med ~780 ms.

Kontroll efter bygge:
```bash
grep -rhoE 'https?://[a-zA-Z0-9.-]+' dist --include="*.html" --include="*.css" --include="*.js" | sort -u
```

### React Bits-komponenter installerade med shadcn

`LogoLoop` och `AccordionGallery` kommer från `npx shadcn@latest add @react-bits/<namn>`. Två saker gäller för dem:

**Installeraren korrumperar källan.** Den tar bort inledande mellanslag inuti template-strängar. Båda komponenterna kom trasiga — `join('')` i stället för `join(' ')`, och `'ag-panel--active'` i stället för `' ag-panel--active'` — vilket slog ut klassnamn och därmed layout och toningar. **Jämför alltid den skrivna filen mot registrets JSON** (`https://reactbits.dev/r/<namn>.json`) efter en installation.

**De hanterar `prefers-reduced-motion` i CSS men låter loopen snurra.** I båda fallen låste en CSS-regel resultatet med `!important` medan rAF-loopen fortsatte rita varje bildruta. Fixat i JS i båda: ingen loop respektive `gsap.set()` utan tween.

Alla avvikelser mot originalen är märkta `ÄNDRAT` i filerna, med numrering och motivering i filhuvudet. Uppdateras en komponent måste de göras om.

### Kontaktformuläret

Web3Forms. `WEB3FORMS_KEY` i `ContactSection.jsx` är fortfarande `PLACEHOLDER_BOPG_KEY` — en egen BOPG-nyckel måste skapas. Återanvänd aldrig systerprojektets.

Formuläret har `action`/`method` så att det fungerar även utan JavaScript, mot samma mottagare. Kvittot visas först när mottagaren bekräftat — aldrig optimistiskt.

## Sidor

`/` (startsidan, i ordning: hero → BrandLogo → LogoStrip → Våra bolag → Så jobbar vi → Om → Kontakt), `/om-oss`, `/kontakt`, `/integritetspolicy`, `/404`.

Ankare som används i navigation: `#bolag` och `#process`. Regeln `scroll-margin-top` i `global.css` finns för att den fixerade headern annars lägger sig över rubriken — men den ska **inte** omfatta ett ankare som sitter på en sticky scen, eftersom scenen ska börja exakt vid sin egen överkant.

Not: `ProjectGallery.astro` renderar sektionen **Våra bolag** trots filnamnet — komponenten byggdes som ett projektgalleri och fick sedan bolagssektionens rubriker. Filen får gärna döpas om.

## README.md har glidit ifrån koden

`README.md` beskriver ett äldre tillstånd och ska inte litas på rakt av: den säger att sajten serveras på `github.io/bopg/` med `base: '/bopg/'` i konfigurationen (det finns ingen `base` längre — sajten bor i domänroten), listar `/tjanster`-sidorna som är arkiverade, beskriver en startsida som inte längre stämmer, och påstår att ordmärket är textbaserat (det är numera en bildfil). De delar som fortfarande gäller är TODO-punkterna om Web3Forms-nyckeln och domänen. Uppdatera gärna README:n vid tillfälle.
