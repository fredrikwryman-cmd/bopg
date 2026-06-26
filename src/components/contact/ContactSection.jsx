import { useState } from 'react';
import { motion } from 'framer-motion';
import { company } from '../../data/company.js';
import { Phone, Mail, MapPin } from '../icons.jsx';

// ============================================================================
// TODO (Fredrik): Skapa en EGEN BOPG Web3Forms-nyckel på https://web3forms.com
// och ersätt PLACEHOLDER_BOPG_KEY nedan. Återanvänd ALDRIG AD Byggprojekts
// nyckel — varje sajt ska ha sin egen så att förfrågningar hamnar rätt.
// ============================================================================
const WEB3FORMS_KEY = 'PLACEHOLDER_BOPG_KEY';

export default function ContactSection({ subject = 'Ny förfrågan från byggoprojektgruppen.se (Kontakt)' }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', projekttyp: '', message: '' });
  const [status, setStatus] = useState(null); // null | 'sending' | 'ok' | 'err'
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject,
          from_name: 'Bygg & Projektgruppen webbplats',
          name: form.name,
          email: form.email,
          phone: form.phone,
          projekttyp: form.projekttyp,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('ok');
      } else {
        setStatus('err');
        setErrorMsg(`Något gick fel. Försök igen, eller mejla oss på ${company.email}.`);
      }
    } catch (err) {
      setStatus('err');
      setErrorMsg('Kunde inte skicka just nu. Kontrollera din uppkoppling och försök igen.');
    }
  };

  return (
    <section className="section stone" id="kontakt">
      <div className="wrap">
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          <span className="sec-ey">Kontakt</span>
          <h2 className="sec-h">Hör av dig</h2>
          <p className="sec-intro">
            Berätta om ditt projekt så återkommer vi så snart vi kan. Vill du ha vår
            prislista för löpande arbeten? Säg till.
          </p>
        </motion.div>

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
                <span><span className="cl">Adress</span><br /><span className="cv">{company.address}</span></span>
              </div>
            </div>

            {status === 'ok' ? (
              <p className="form-status ok" role="status" style={{ fontSize: '1rem' }}>
                Tack för din förfrågan! Vi återkommer så snart vi kan.
              </p>
            ) : (
              <form className="cform" onSubmit={handleSubmit}>
                <div className="field">
                  <label htmlFor="c-name">Namn</label>
                  <input id="c-name" name="name" type="text" autoComplete="name" placeholder="För- och efternamn" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="field">
                  <label htmlFor="c-email">E-post</label>
                  <input id="c-email" name="email" type="email" autoComplete="email" placeholder="namn@exempel.se" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
                <div className="field">
                  <label htmlFor="c-phone">Telefon</label>
                  <input id="c-phone" name="phone" type="tel" autoComplete="tel" placeholder="070-000 00 00" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div className="field">
                  <label htmlFor="c-type">Projekttyp</label>
                  <select id="c-type" name="projekttyp" value={form.projekttyp} onChange={(e) => setForm({ ...form, projekttyp: e.target.value })}>
                    <option value="">Välj projekttyp (valfritt)</option>
                    <option value="Nybyggnation">Nybyggnation</option>
                    <option value="Bygg & renovering">Bygg & renovering</option>
                    <option value="Ytskikt">Ytskikt</option>
                    <option value="El & VVS">El & VVS</option>
                    <option value="Mark & plåt">Mark & plåt</option>
                    <option value="Smide & rostfritt">Smide & rostfritt</option>
                    <option value="Annat">Annat</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="c-msg">Meddelande</label>
                  <textarea id="c-msg" name="message" placeholder="Beskriv ditt projekt..." required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                </div>
                <button className="btn btn-primary" type="submit" disabled={status === 'sending'}>
                  <span className="fill" />
                  <span className="lbl">{status === 'sending' ? 'Skickar…' : 'Skicka förfrågan'}</span>
                  <span className="arrow">&rarr;</span>
                </button>
                {status === 'err' && <p className="form-status err" role="alert">{errorMsg}</p>}
              </form>
            )}
          </div>

          <div className="map">
            <div className="pin"><b>◉</b> SÅGVÄGEN 33 · ÅKERSBERGA</div>
            <iframe
              loading="lazy"
              title="Karta Åkersberga"
              src="https://www.openstreetmap.org/export/embed.html?bbox=18.2820%2C59.4730%2C18.3175%2C59.4865&layer=mapnik&marker=59.4794%2C18.2997"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
