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

## Återställa
`git mv` tillbaka till sökvägen i tabellen, och lägg tillbaka:
- importen + `<ServicesOverview client:visible />` / `<BeforeAfterSection client:visible />` i `src/pages/index.astro`
- `{ label: 'Tjänster', href: BASE + 'tjanster' }` i `links` i `src/components/layout/Navbar.jsx`
- tjänstekolumnen i `src/components/layout/Footer.jsx`
