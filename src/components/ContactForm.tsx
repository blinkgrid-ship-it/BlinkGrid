import { useState } from "react";

interface ContactFormProps {
  onDemoRequest: (product: string) => void;
}

// Extracted from the original inline App.tsx form — validation, WhatsApp
// redirect, and message format are byte-identical. Only markup/styling changed
// (persistent visible labels instead of visually-hidden ones).
export default function ContactForm({ onDemoRequest }: ContactFormProps) {
  const [form, setForm] = useState({ name: "", email: "", whatsapp: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};

    if (!form.name.trim()) e.name = "Required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      e.email = "Required";
    } else if (!emailRegex.test(form.email)) {
      e.email = "Please enter a valid email address";
    }

    const phoneRegex = /^\+?[1-9]\d{9,14}$/;
    const cleanPhone = form.whatsapp.replace(/[\s-]/g, "");
    if (!form.whatsapp.trim()) {
      e.whatsapp = "Required";
    } else if (!phoneRegex.test(cleanPhone)) {
      e.whatsapp = "Please enter a valid mobile number";
    }

    if (!form.message.trim()) e.message = "Required";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;

    const BLINKGRID_WHATSAPP = "919995684689";
    const messageText = encodeURIComponent(
      `Hi BlinkGrid team! New contact request:\n\nName: ${form.name}\nEmail: ${form.email}\nWhatsApp: ${form.whatsapp}\n\nMessage: ${form.message}`
    );

    window.open(`https://wa.me/${BLINKGRID_WHATSAPP}?text=${messageText}`, "_blank");
    setSent(true);
  };

  if (sent) {
    return (
      <div className="contact-form__sent">
        <div className="contact-form__sent-icon" aria-hidden="true">✅</div>
        <h4 className="font-display">Redirecting to WhatsApp...</h4>
        <p>You can now send your message to us directly.</p>
      </div>
    );
  }

  return (
    <div className="contact-form">
      <div className="contact-form__field">
        <label htmlFor="contact-name">Your name</label>
        <input
          id="contact-name"
          className={`field ${errors.name ? "field-error" : ""}`}
          placeholder="Alex Johnson"
          value={form.name}
          onChange={(e) => { setForm((f) => ({ ...f, name: e.target.value })); setErrors((er) => ({ ...er, name: "" })); }}
        />
        {errors.name && <p className="contact-form__error" role="alert">{errors.name}</p>}
      </div>

      <div className="contact-form__field">
        <label htmlFor="contact-email">Email address</label>
        <input
          id="contact-email"
          className={`field ${errors.email ? "field-error" : ""}`}
          placeholder="alex@company.com"
          type="email"
          value={form.email}
          onChange={(e) => { setForm((f) => ({ ...f, email: e.target.value })); setErrors((er) => ({ ...er, email: "" })); }}
        />
        {errors.email && <p className="contact-form__error" role="alert">{errors.email}</p>}
      </div>

      <div className="contact-form__field">
        <label htmlFor="contact-whatsapp">WhatsApp number</label>
        <input
          id="contact-whatsapp"
          className={`field ${errors.whatsapp ? "field-error" : ""}`}
          placeholder="+91 98765 43210"
          type="tel"
          value={form.whatsapp}
          onChange={(e) => { setForm((f) => ({ ...f, whatsapp: e.target.value })); setErrors((er) => ({ ...er, whatsapp: "" })); }}
        />
        {errors.whatsapp && <p className="contact-form__error" role="alert">{errors.whatsapp}</p>}
      </div>

      <div className="contact-form__field">
        <label htmlFor="contact-message">Your message</label>
        <textarea
          id="contact-message"
          className={`field ${errors.message ? "field-error" : ""}`}
          placeholder="Tell us about your project..."
          rows={4}
          value={form.message}
          onChange={(e) => { setForm((f) => ({ ...f, message: e.target.value })); setErrors((er) => ({ ...er, message: "" })); }}
        />
        {errors.message && <p className="contact-form__error" role="alert">{errors.message}</p>}
      </div>

      <button type="button" className="btn-primary contact-form__submit" onClick={submit}>
        Send via WhatsApp
      </button>

      <p className="contact-form__demo-link">
        Need a product demo?{" "}
        <button type="button" onClick={() => onDemoRequest("")}>Request one here</button>
      </p>
    </div>
  );
}
