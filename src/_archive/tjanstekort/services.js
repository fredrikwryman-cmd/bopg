// Tjänster för Bygg & Projektgruppen (BOPG).
// Innehåll och bilder hämtade troget från den skarpa enfils-sajten (bopg-deploy/index.html).
// Varje tjänst får en egen undersida via /tjanster/[slug].

export const services = [
  {
    slug: 'nybyggnation',
    idx: '01',
    title: 'Nybyggnation',
    image: 'services/nybyggnation.jpg',
    summary:
      'Byggnation av bostadshus och andra byggnader — från grund och stomme till färdig och besiktigad byggnad.',
    intro:
      'Vi uppför bostadshus och andra byggnader från grunden och håller ihop hela kedjan — från projektering och grundläggning till stomme, stomkomplettering och en färdig, besiktigad byggnad. Med egen personal och samordnade underentreprenörer har du en kontakt genom hela bygget.',
    includes: [
      'Grundläggning och markarbeten',
      'Stomme och stomkomplettering',
      'Tak, fasad och tätt hus',
      'Invändiga arbeten och ytskikt',
      'Slutbesiktning samt kvalitets- och miljödokumentation',
    ],
  },
  {
    slug: 'bygg-renovering',
    idx: '02',
    title: 'Bygg & renovering',
    image: 'services/bygg-renovering.jpg',
    summary:
      'Byggarbeten, rivning, undertaksmontage och putsarbeten in- och utvändigt. Om- och totalrenovering med ordning på detaljerna.',
    intro:
      'Vi tar oss an om- och totalrenovering av bostäder, lokaler och fastigheter — stora som små uppdrag. Allt utförs med ordning och reda på arbetsplatsen och avslutas med relevant dokumentation, så att du vet exakt vad som är gjort.',
    includes: [
      'Byggarbeten och snickeri',
      'Rivningsarbeten',
      'Undertaksmontage',
      'Putsarbeten in- och utvändigt',
      'Lokalanpassningar',
    ],
  },
  {
    slug: 'ytskikt',
    idx: '03',
    title: 'Ytskikt',
    image: 'services/ytskikt.jpg',
    summary:
      'Måleri, golvläggning i mattor och parkett samt plattsättning — prydliga ytor som håller över tid.',
    intro:
      'De synliga ytorna är det första man lägger märke till. Vi utför måleri, golv och plattsättning med noggrann förbehandling som grund, så att resultatet både ser bra ut och håller över tid.',
    includes: [
      'Måleri in- och utvändigt',
      'Golvläggning — mattor och parkett',
      'Plattsättning, kakel och klinker',
      'Spackling och förbehandling',
    ],
  },
  {
    slug: 'el-vvs',
    idx: '04',
    title: 'El & VVS',
    image: 'services/el-vvs.jpg',
    summary:
      'El- och VVS-arbeten i samordning med behöriga installatörer — tryggt utfört och dokumenterat.',
    intro:
      'El och VVS ska vara tryggt, korrekt och dokumenterat. Vi planerar och samordnar arbetet tillsammans med behöriga installatörer, så att installationerna håller måttet och egenkontrollen finns på plats.',
    includes: [
      'El-dragningar och installation',
      'VVS-arbeten',
      'Samordning av behöriga installatörer',
      'Egenkontroll och dokumentation',
    ],
  },
  {
    slug: 'mark-plat',
    idx: '05',
    title: 'Mark & plåt',
    image: 'services/mark-plat.jpg',
    summary:
      'Utvändiga markarbeten och utvändiga plåtarbeten — en stabil grund och ett tätt yttre skal.',
    intro:
      'Ett bra bygge står på en stabil grund och håller sig tätt utvändigt. Vi utför markarbeten och utvändiga plåtarbeten som ger rätt förutsättningar — från schakt och dränering till tak- och fasadplåt.',
    includes: [
      'Schakt och markberedning',
      'Dränering',
      'Plattläggning och markytor',
      'Utvändiga plåtarbeten',
      'Tak- och fasadplåt',
    ],
  },
  {
    slug: 'smide-rostfritt',
    idx: '06',
    title: 'Smide & rostfritt',
    image: 'services/smide-rostfritt.jpg',
    summary:
      'Smidesarbeten samt arbeten i rostfritt — räcken, detaljer och konstruktion med precision.',
    intro:
      'När det krävs hållbara detaljer i metall löser vi det. Vi utför smidesarbeten och arbeten i rostfritt — från räcken och balkonger till specialtillverkade konstruktionsdetaljer.',
    includes: [
      'Räcken och balkonger',
      'Specialsmide efter mått',
      'Arbeten i rostfritt',
      'Konstruktionsdetaljer',
    ],
  },
];

// Övriga tjänster som nämns i löptext på den skarpa sajten.
export const extraServices = [
  'Projektledning & byggkonsult',
  'Demontering, flytt & återmontering',
  'Fastighetsförvaltning',
  'Uthyrning av personal & lokal',
];

export function getService(slug) {
  return services.find((s) => s.slug === slug);
}
