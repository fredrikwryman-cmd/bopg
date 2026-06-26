# Bygg & Projektgruppen (BOPG) — webbplats

Astro v6 + React + Tailwind v4 + Framer Motion. Ombyggd från en enfils-HTML till en
riktig flersidig Astro-sajt. Speglar arkitektur och kvalitet från systerprojektet
AD Byggprojekt, men med BOPG:s egen "blueprint"-palett (paper/ink/blue/gold) och
typografi (Archivo / Manrope / Space Mono).

## Kom igång

```bash
npm install
npm run dev      # http://localhost:4321/bopg/
npm run build    # bygger statiskt till dist/
npm run preview  # förhandsgranska byggd sajt
```

Sajten serveras på `github.io/bopg/`, därför `base: '/bopg/'` i `astro.config.mjs`.

## Sidor

- `/` — Startsida (hero, tjänster, före/efter, så jobbar vi, om oss, kontakt)
- `/om-oss` — Om oss
- `/tjanster` — Tjänsteöversikt
- `/tjanster/[slug]` — En sida per tjänst (nybyggnation, bygg-renovering, ytskikt,
  el-vvs, mark-plat, smide-rostfritt)
- `/kontakt` — Kontakt med offert-/kontaktformulär
- `/404`

## Att göra (TODO)

- **Web3Forms-nyckel:** Skapa en EGEN BOPG-nyckel på web3forms.com och ersätt
  `PLACEHOLDER_BOPG_KEY` i `src/components/contact/ContactSection.jsx`.
  Återanvänd ALDRIG AD Byggprojekts nyckel.
- **Domän:** koppla `byggoprojektgruppen.se` när den är klar (uppdatera `site` vid behov).
- **Logga:** ordmärket är textbaserat; byt mot transparent vektorlogga när en finns.
