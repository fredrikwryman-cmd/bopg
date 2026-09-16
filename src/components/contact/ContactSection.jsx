import { useEffect, useRef, useState } from 'react';
import { company } from '../../data/company.js';
import { Phone, Mail, MapPin } from '../icons.jsx';

// ============================================================================
// TODO (Fredrik): Skapa en EGEN BOPG Web3Forms-nyckel på https://web3forms.com
// och ersätt PLACEHOLDER_BOPG_KEY nedan. Återanvänd ALDRIG AD Byggprojekts
// nyckel — varje sajt ska ha sin egen så att förfrågningar hamnar rätt.
// ============================================================================
const WEB3FORMS_KEY = 'PLACEHOLDER_BOPG_KEY';

// Neutrala alternativ. Listan säger ingenting om vem som utför arbetet, bara
// vad förfrågan gäller — en CM-partner tar emot alla fem.
const PROJEKTTYPER = ['Nybyggnation', 'Ombyggnad', 'Renovering', 'Projektledning', 'Annat'];

const TOM = { name: '', email: '', phone: '', projekttyp: '', message: '' };

// Kartlänk till OpenStreetMap på samma koordinater som inbäddningen. Används av
// den designade grundvyn, som alltid finns — även när kartan inte kan visas.
const KARTLANK = `https://www.openstreetmap.org/?mlat=${company.latitude}&mlon=${company.longitude}#map=16/${company.latitude}/${company.longitude}`;

// showHeading: sidor som redan har en PageHeader med samma rubrik (i dag
// /kontakt) skickar false, annars dubbleras eyebrow + rubrik + ingress
// ordagrant — en gång i det mörka sidhuvudet och en gång här.
export default function ContactSection({
  subject = 'Ny förfrågan från byggoprojektgruppen.se (Kontakt)',
  showHeading = true,
}) {
  const [form, setForm] = useState(TOM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // null | 'sending' | 'ok' | 'err'
  const [errorMsg, setErrorMsg] = useState('');
  const [mapState, setMapState] = useState('idle'); // idle | ready | failed
  const kvittoRef = useRef(null);

  const satt = (falt) => (e) => {
    setForm((f) => ({ ...f, [falt]: e.target.value }));
    // Felet försvinner så fort fältet rättas, inte först vid nästa försök.
    setErrors((prev) => (prev[falt] ? { ...prev, [falt]: null } : prev));
  };

  const validera = () => {
    const fel = {};
    if (!form.name.trim()) fel.name = 'Fyll i ditt namn så vet vi vem vi svarar.';
    if (!form.email.trim()) fel.email = 'Vi behöver en e-postadress för att kunna återkomma.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) fel.email = 'Kontrollera adressen — den ser inte komplett ut.';
    if (!form.message.trim()) fel.message = 'Beskriv kort vad du planerar.';
    return fel;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fel = validera();
    if (Object.keys(fel).length) {
      setErrors(fel);
      // Fokus till det första fältet med fel, så att tangentbordsanvändare
      // hamnar rätt i stället för att leta.
      document.getElementById(`c-${Object.keys(fel)[0]}`)?.focus();
      return;
    }

    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject,
          from_name: `${company.legalName} webbplats`,
          name: form.name,
          email: form.email,
          phone: form.phone,
          projekttyp: form.projekttyp,
          message: form.message,
          // Honeypot. Web3Forms kastar inlägget om fältet är ifyllt — ett
          // spamskydd som inte kostar besökaren ett enda klick.
          botcheck: '',
        }),
      });
      const data = await res.json();
      // KVITTOT VISAS FÖRST HÄR. Inte vid submit, inte optimistiskt: status
      // sätts till 'ok' bara när mottagaren har bekräftat att förfrågan tagits
      // emot. Allt annat vore att ljuga för besökaren om att vi hört av oss.
      if (data.success) {
        setStatus('ok');
        setForm(TOM);
      } else {
        setStatus('err');
        setErrorMsg(`Något gick fel hos vår formulärtjänst. Försök igen, eller mejla oss direkt på ${company.email}.`);
      }
    } catch (err) {
      setStatus('err');
      setErrorMsg('Kunde inte skicka just nu. Kontrollera din uppkoppling och försök igen.');
    }
  };

  // Flytta fokus till kvittot när det dyker upp, så att skärmläsaren läser upp
  // det och tangentbordet inte står kvar på en knapp som inte finns längre.
  useEffect(() => {
    if (status === 'ok') kvittoRef.current?.focus();
  }, [status]);

  // Kartan. Laddas den inte inom sex sekunder står den designade grundvyn kvar
  // i stället för en vit ruta eller ett tekniskt felmeddelande från tjänsten.
  useEffect(() => {
    if (mapState !== 'idle') return;
    const t = window.setTimeout(() => setMapState((s) => (s === 'idle' ? 'failed' : s)), 6000);
    return () => window.clearTimeout(t);
  }, [mapState]);

  const faltklass = (falt) => `field${errors[falt] ? ' has-error' : ''}`;

  return (
    <section className="section stone" id="kontakt">
      <div className="wrap">
        {showHeading && (
          <div className="reveal">
            <span className="sec-ey">Kontakt</span>
            <h2 className="sec-h">Låt oss prata<br />om ditt projekt</h2>
            <p className="sec-intro">
              Berätta kort vad du planerar, så tar vi nästa steg tillsammans.
            </p>
          </div>
        )}

        <div className="contact">
          <div>
            <div className="cinfo">
              <a className="citem" href={company.phoneHref}>
                <span className="ci"><Phone /></span>
                <span><span className="cl">Telefon</span><br /><span className="cv">{company.phone}</span></span>
              </a>
              <a className="citem" href={company.emailHref}>
                <span className="ci"><Mail /></span>
                <span><span className="cl">E-post</span><br /><span className="cv">{company.email}</span></span>
              </a>
              <div className="citem">
                <span className="ci"><MapPin /></span>
                <span><span className="cl">Besöksadress</span><br /><span className="cv">{company.address}</span></span>
              </div>
            </div>

            {status === 'ok' ? (
              <div className="form-sent" role="status" tabIndex={-1} ref={kvittoRef}>
                <h3>Tack — förfrågan är skickad</h3>
                <p>
                  Vi har tagit emot din förfrågan och återkommer så snart vi kan. Brådskar
                  det når du oss direkt på <a href={company.phoneHref}>{company.phone}</a>.
                </p>
              </div>
            ) : (
              /* action/method gör att formuläret fungerar ÄVEN utan JavaScript:
                 webbläsaren postar då direkt till samma mottagare, och
                 Web3Forms visar sin egen kvittosida. Med JavaScript tar
                 handleSubmit över och preventDefault stoppar den vägen. */
              <form
                className="cform"
                onSubmit={handleSubmit}
                action="https://api.web3forms.com/submit"
                method="POST"
                noValidate
              >
                <input type="hidden" name="access_key" value={WEB3FORMS_KEY} />
                <input type="hidden" name="subject" value={subject} />
                <input type="hidden" name="from_name" value={`${company.legalName} webbplats`} />
                <div className={faltklass('name')}>
                  <label htmlFor="c-name">Namn</label>
                  <input
                    id="c-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={satt('name')}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'c-name-fel' : undefined}
                  />
                  {errors.name && <p className="field-error" id="c-name-fel">{errors.name}</p>}
                </div>

                <div className={faltklass('email')}>
                  <label htmlFor="c-email">E-post</label>
                  <input
                    id="c-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={satt('email')}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'c-email-fel' : undefined}
                  />
                  {errors.email && <p className="field-error" id="c-email-fel">{errors.email}</p>}
                </div>

                <div className="field">
                  <label htmlFor="c-phone">Telefon <span className="opt">(valfritt)</span></label>
                  <input
                    id="c-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={satt('phone')}
                  />
                </div>

                {/* Ersätter fritextfältet "Kort om ditt projekt", som frågade om
                    samma sak som meddelandefältet nedanför och fick besökaren
                    att skriva sin beskrivning två gånger. Fem neutrala
                    alternativ räcker för att sortera förfrågan; detaljerna hör
                    hemma i meddelandet. Web3Forms tar emot fältet som vanlig
                    sträng precis som förr. */}
                <div className="field">
                  <label htmlFor="c-projekttyp">Typ av projekt</label>
                  <select
                    id="c-projekttyp"
                    name="projekttyp"
                    value={form.projekttyp}
                    onChange={satt('projekttyp')}
                  >
                    <option value="">Välj…</option>
                    {PROJEKTTYPER.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div className={`${faltklass('message')} field-wide`}>
                  <label htmlFor="c-message">Meddelande</label>
                  <textarea
                    id="c-message"
                    name="message"
                    placeholder="Vad planerar du, var ligger projektet och när vill du komma igång?"
                    value={form.message}
                    onChange={satt('message')}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'c-message-fel' : undefined}
                  />
                  {errors.message && <p className="field-error" id="c-message-fel">{errors.message}</p>}
                </div>

                {/* Web3Forms egen honeypot. Dold för besökare, synlig för bottar. */}
                <input type="checkbox" name="botcheck" className="w3-botcheck" tabIndex={-1} autoComplete="off" />

                <div className="form-actions">
                  <button className="btn btn-primary" type="submit" disabled={status === 'sending'}>
                    <span className="fill" />
                    <span className="lbl">{status === 'sending' ? 'Skickar…' : 'Skicka förfrågan'}</span>
                    <span className="arrow">&rarr;</span>
                  </button>
                  <p className="form-note">
                    Vi använder uppgifterna enbart för att svara på din förfrågan.
                  </p>
                </div>

                {status === 'err' && <p className="form-status err" role="alert">{errorMsg}</p>}
              </form>
            )}
          </div>

          {/* KARTAN. Den designade vyn ligger underst och finns alltid.
              Inbäddningen läggs ovanpå först när den faktiskt laddat — går den
              inte att visa (blockerad tredjepart, WebGL som inte startar) står
              grundvyn kvar med adress och en riktig länk i stället för en vit
              ruta eller ett tekniskt fel. */}
          <div className={`map${mapState === 'ready' ? ' is-ready' : ''}${mapState === 'failed' ? ' is-failed' : ''}`}>
            <div className="pin"><b>◉</b> SÅGVÄGEN 33 · ÅKERSBERGA</div>
            <div className="map-fallback">
              <span className="mf-label">Besöksadress</span>
              <span className="mf-addr">{company.address}</span>
              <a className="mf-link" href={KARTLANK} target="_blank" rel="noopener noreferrer">
                Öppna i karta <span className="arrow">&rarr;</span>
              </a>
            </div>
            <iframe
              loading="lazy"
              title="Karta över Sågvägen 33 i Åkersberga"
              onLoad={() => setMapState('ready')}
              onError={() => setMapState('failed')}
              src={`https://www.openstreetmap.org/export/embed.html?bbox=18.270623%2C59.472941%2C18.306123%2C59.486441&layer=mapnik&marker=${company.latitude}%2C${company.longitude}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
