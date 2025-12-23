import "./Contact.css";
import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaLinkedin, FaGithub, FaReact, FaHeart } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";

const Contact: React.FC = () => {
  const { t, i18n } = useTranslation("global");
  const language = i18n.language;

  const contact = {
    name: "contact.name",
    email: "contact.email",
    subject: "contact.subject",
    send: "contact.send",
    requiredFields: "contact.requiredFields",
    invalidEmail: "contact.invalidEmail",
    formSubmitted: "contact.formSubmitted",
    formError: "contact.formError",
  };

  const form = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (isSubmitting) return;
  
    setIsSubmitting(true);
  
    const formData = new FormData(form.current!);
    const values = Object.fromEntries(formData.entries());
  
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
    const requiredFieldsError = t(contact.requiredFields);
    const validationErrors: { [key: string]: string } = {};
  
    // Validación
    Object.entries(values).forEach(([field, value]) => {
      if (value.toString().trim() === "") {
        validationErrors[field] = requiredFieldsError;
      } else if (
        field === "user_email" &&
        !emailPattern.test(value.toString())
      ) {
        validationErrors[field] = t(contact.invalidEmail);
      }
    });
  
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch("https://api-send-mail-beta.vercel.app/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
  
        if (response.ok) {
          const result = await response.json();
          toast.success(result.message);
          form.current!.reset();
          setErrors({});
        } else {
          const errorData = await response.json();
          toast.error(errorData.message || t(contact.formError));
        }
      } catch (error) {
        console.error("Error al enviar el correo:", error);
        toast.error(t(contact.formError));
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrors(validationErrors);
      setIsSubmitting(false);
    }
  };  

  return (
    <section className="contact" id="contact">
      <div className="container">
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
        />
        <h3 className="heading">{t("navbar.contact")}</h3>
        <form ref={form} onSubmit={handleSubmit}>
          <div className="input-box">
            <div className="form-group">
              <input
                type="text"
                placeholder={t(contact.name)}
                name="user_name"
                className="input"
              />
              {errors.user_name && (
                <p className="error-message">{errors.user_name}</p>
              )}
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder={t(contact.email)}
                name="user_email"
                className="input"
              />
              {errors.user_email && (
                <p className="error-message">{errors.user_email}</p>
              )}
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder={t(contact.subject)}
                name="subject"
                className="input"
              />
              {errors.subject && (
                <p className="error-message">{errors.subject}</p>
              )}
            </div>
          </div>

          <div className="input-group-2">
            <div className="form-group">
              <textarea
                name="message"
                className="textarea"
                cols={30}
                rows={10}
              />
              {errors.message && (
                <p className="error-message">{errors.message}</p>
              )}
            </div>

            <input
              type="submit"
              value={isSubmitting ? t("contact.sending") : t(contact.send)}
              className="btn btn-fill"
              disabled={isSubmitting}
            />
          </div>
        </form>
      </div>
      <footer className="footer">
        <div className="social">
          <a
            href="https://linkedin.com/in/iara-etchart/"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://github.com/iaraetchart"
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={24} />
          </a>
        </div>
        <div className="footer-text">
          <p>{t("contact.builtBy")}</p>
          <div className="page">
            <p>{t("contact.made")}</p>
            <FaReact title="React" size={24} />
            <SiTypescript title="TypeScript" size={22} />
            <FaHeart title={language === 'es' ? 'Amor' : 'Love'} size={20} style={{ color: '#fff' }} />
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Contact;
