import { Mail, MessageCircle } from "lucide-react";
import ContactForm from "./ContactForm";

interface ContactProps {
  onDemoRequest: (product: string) => void;
}

export default function Contact({ onDemoRequest }: ContactProps) {
  return (
    <section id="contact" className="contact">
      <div className="contact__inner">
        <div className="contact__cta">
          <span className="eyebrow eyebrow--on-dark">Get in Touch</span>
          <h2 className="font-display contact__heading">
            Have a product, platform or workflow that needs to work better?
          </h2>
          <p className="contact__copy">
            Whether you have a fully-formed idea or just a problem worth solving, we&apos;d love to
            hear from you.
          </p>
          <div className="contact__methods">
            <a href="mailto:blinkgrid@gmail.com" className="contact__method">
              <Mail size={18} aria-hidden="true" />
              <span>blinkgrid@gmail.com</span>
            </a>
            <a href="https://wa.me/919995684689" target="_blank" rel="noreferrer" className="contact__method">
              <MessageCircle size={18} aria-hidden="true" />
              <span>+91 99956 84689</span>
            </a>
          </div>
        </div>

        <div className="contact__panel">
          <h3 className="font-display contact__panel-title">Send us a message</h3>
          <p className="contact__panel-sub">We reply within 24 hours.</p>
          <ContactForm onDemoRequest={onDemoRequest} />
        </div>
      </div>
    </section>
  );
}
