import { useState, useEffect } from "react";
import { X, Send, CheckCircle, AlertCircle } from "lucide-react";

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: string;
}

interface FormData {
  name: string; company: string; phone: string;
  email: string; product: string; message: string;
}
interface FormErrors {
  name?: string; company?: string; phone?: string;
  email?: string; message?: string;
}

const PRODUCTS = [
  "TestCrack", "Pala Homes", "Original Script",
  "FTS — Natural Extracts", "Malayalam University", "Other",
];

type SubmitState = "idle" | "loading" | "success" | "error";

export default function DemoModal({ isOpen, onClose, product = "" }: DemoModalProps) {
  const [form, setForm] = useState<FormData>({
    name: "", company: "", phone: "", email: "",
    product: product || PRODUCTS[0], message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  useEffect(() => {
    if (isOpen) {
      setForm(f => ({ ...f, product: product || PRODUCTS[0] }));
      setErrors({});
      setSubmitState("idle");
    }
  }, [isOpen, product]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.company.trim()) e.company = "Company is required";
    if (!form.phone.trim()) e.phone = "Phone is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.message.trim()) e.message = "Please tell us about your needs";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setForm(f => ({ ...f, [field]: value }));
    if (errors[field as keyof FormErrors]) setErrors(e => ({ ...e, [field]: undefined }));
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitState("loading");
    await new Promise(r => setTimeout(r, 1400)); // wire to Resend/Vercel Function in T-06
    setSubmitState("success");
  };

  const labelStyle = { fontSize: "0.78rem", color: "var(--ink-soft)", display: "block", marginBottom: 6, fontWeight: 500 } as const;
  const errStyle = { color: "#DC2626", fontSize: "0.75rem", marginTop: 4 } as const;

  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-box">
        <button onClick={onClose}
          style={{ position: "absolute", top: 20, right: 20, background: "var(--surface-alt)", border: "1px solid var(--line)", borderRadius: 8, color: "var(--ink-soft)", cursor: "pointer", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <X size={16} />
        </button>

        {submitState === "success" ? (
          <div style={{ textAlign: "center", padding: "24px 0" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--green-soft)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
              <CheckCircle size={28} color="var(--green)" />
            </div>
            <h3 className="font-display" style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: 12 }}>Request Received!</h3>
            <p style={{ color: "var(--ink-soft)", fontSize: "0.9rem", lineHeight: 1.6, marginBottom: 32 }}>
              We'll get back to you within 24 hours. You can also reach us directly on WhatsApp.
            </p>
            <a href="https://wa.me/919995684689" target="_blank" rel="noreferrer" className="btn-primary" style={{ display: "inline-flex", textDecoration: "none", marginBottom: 16 }}>
              Chat on WhatsApp
            </a>
            <br />
            <button onClick={onClose} className="btn-ghost" style={{ marginTop: 8 }}>Close</button>
          </div>
        ) : submitState === "error" ? (
          <div style={{ textAlign: "center", padding: "24px 0" }}>
            <AlertCircle size={48} color="#DC2626" style={{ margin: "0 auto 16px" }} />
            <h3 className="font-display" style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: 8 }}>Something went wrong</h3>
            <p style={{ color: "var(--ink-soft)", marginBottom: 24 }}>Please try again or email us at blinkgrid@gmail.com</p>
            <button className="btn-primary" onClick={() => setSubmitState("idle")}>Try Again</button>
          </div>
        ) : (
          <>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Request a Demo</div>
            <h2 className="font-display" style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: 6 }}>Let's build something great</h2>
            <p style={{ color: "var(--ink-soft)", fontSize: "0.875rem", marginBottom: 32 }}>
              Fill in the details and our team will reach out within 24 hours.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={labelStyle}>Full Name *</label>
                  <input className={`field ${errors.name ? "field-error" : ""}`} placeholder="Alex Johnson" value={form.name} onChange={e => handleChange("name", e.target.value)} />
                  {errors.name && <p style={errStyle}>{errors.name}</p>}
                </div>
                <div>
                  <label style={labelStyle}>Company *</label>
                  <input className={`field ${errors.company ? "field-error" : ""}`} placeholder="Acme Corp" value={form.company} onChange={e => handleChange("company", e.target.value)} />
                  {errors.company && <p style={errStyle}>{errors.company}</p>}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={labelStyle}>Phone *</label>
                  <input className={`field ${errors.phone ? "field-error" : ""}`} placeholder="+91 98765 43210" value={form.phone} onChange={e => handleChange("phone", e.target.value)} />
                  {errors.phone && <p style={errStyle}>{errors.phone}</p>}
                </div>
                <div>
                  <label style={labelStyle}>Email *</label>
                  <input className={`field ${errors.email ? "field-error" : ""}`} placeholder="alex@company.com" type="email" value={form.email} onChange={e => handleChange("email", e.target.value)} />
                  {errors.email && <p style={errStyle}>{errors.email}</p>}
                </div>
              </div>

              <div>
                <label style={labelStyle}>Product of Interest</label>
                <select className="field" value={form.product} onChange={e => handleChange("product", e.target.value)} style={{ cursor: "pointer" }}>
                  {PRODUCTS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>

              <div>
                <label style={labelStyle}>Message *</label>
                <textarea className={`field ${errors.message ? "field-error" : ""}`} placeholder="Tell us what you're looking to build or solve..." rows={4} value={form.message} onChange={e => handleChange("message", e.target.value)} style={{ resize: "vertical" }} />
                {errors.message && <p style={errStyle}>{errors.message}</p>}
              </div>

              <button className="btn-primary" onClick={handleSubmit} disabled={submitState === "loading"} style={{ justifyContent: "center", opacity: submitState === "loading" ? 0.7 : 1 }}>
                {submitState === "loading" ? (
                  <>
                    <span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.6s linear infinite", display: "inline-block" }} />
                    Sending…
                  </>
                ) : (<><Send size={16} /> Send Request</>)}
              </button>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          </>
        )}
      </div>
    </div>
  );
}