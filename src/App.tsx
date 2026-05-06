import { motion, AnimatePresence } from "motion/react";
import { Search, Briefcase, Users, ArrowRight, Menu, X, ChevronRight, Globe, FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon, XIcon, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { PrivacyPolicy, CookiePolicy, CookieSettings } from "./LegalContent";
import { supabase } from "./lib/supabase";

// --- Translations ---

const translations = {
  es: {
    nav: ["Servicios", "Filosofía", "Contacto"],
    hero: {
      tag: "BÚSQUEDA DE TALENTO . TRANSICIÓN DE CARRERA AUTOGESTIONADA",
      title1: "Talento",
      title2: "Humano",
      title3: "Redefinido.",
      desc: "Consultoría estratégica enfocada en Candidate Centricity. Conectamos personas con propósito a través de procesos humanos y precisos, con acompañamiento constante",
      cta: "Conócenos",
    },
    about: {
      tag: "CONÓCENOS",
      p1: "Equipo de expertos con más de 15 años de experiencia en Hispanoamérica y Europa en estrategias de atracción de talento y marca empleadora. Nos dedicamos a llevar paso a paso a las personas y compañías para encontrar el talento para el proyecto idóneo.",
      p2: "Dejamos de lado el proceso transaccional para evolucionarlo a un proceso de personas para personas, y claro, implementamos tecnología pero no reemplazamos el toque humano que se requiere en cualquier proceso de búsqueda de talento.",
      phrase: "CONECTA TU PRESENTE CON EL FUTURO QUE QUIERES",
    },
    services: {
      tag1: "BÚSQUEDA DE TALENTO",
      title1: "Headhunting",
      desc1: "Identificamos talento que no solo cumple con los requerimientos técnicos, sino que se alinea con la visión estratégica y la cultura de su organización.",
      tag2: "ESTRATÉGIA DE CARRERA PROFESIONAL",
      title2: "Transición de Carrera",
      desc2: "Contamos con un sistema creado por expertos en talento para la autogestión de la transición de carrera, donde acompañamos a la persona en el redescubrimiento de su oferta de valor profesional.",
      cta: "Contáctanos para conocer más",
    },
    philosophy: {
      tag: "NUESTRA FILOSOFÍA",
      title: "Candidate Centricity",
      label1: "El Individuo",
      desc1: "Diseñamos trayectorias de éxito centradas en la persona. Creemos que el talento encuentra su máximo potencial cuando su propósito resuena con la organización.",
      label2: "Impacto Ético",
      desc2: "Nuestra metodología de Candidate Centricity garantiza transiciones honestas y transparentes, priorizando al humano detrás del perfil profesional, cuidando a cultura de las organizaciones",
    },
    blog: {
      title: "JOURNAL",
      tag: "PENSAMIENTO",
      posts: [
        { id: 1, title: "Algoritmos vs Intuición", date: "26.05.04", cat: "INSIGHT" },
        { id: 2, title: "Reinvención Ejecutiva", date: "26.04.28", cat: "CAREER" },
        { id: 3, title: "Cultura de Transición", date: "26.04.15", cat: "ETHICS" }
      ]
    },
    contact: {
      tag: "CONECTA CON NOSOTROS",
      title: "CONECTA CON NOSOTROS",
      name: "Nombre Completo",
      email: "Correo Electrónico",
      message: "Mensaje",
      placeholderName: "TU NOMBRE",
      placeholderEmail: "TU CORREO",
      placeholderMessage: "DÉJANOS TU MENSAJE",
      submit: "ENVIAR",
    },
    cookies: {
      title: "APAZ Talent Search utiliza cookies",
      desc: "Utilizamos cookies en nuestro sitio web. Al hacer clic en \"Aceptar todas las cookies\", usted acepta el almacenamiento de cookies en su dispositivo para mejorar el rendimiento de nuestro sitio, mejorar la funcionalidad y la personalización, analizar el uso del sitio y ayudar en nuestros esfuerzos de marketing. Al hacer clic en \"Estrictamente necesarias\", solo acepta el almacenamiento de cookies estrictamente necesarias en su dispositivo.",
      settings: "Configuración de cookies",
      necessary: "Estrictamente necesarias",
      acceptAll: "Aceptar todas las cookies",
      privacy: "Política de Privacidad",
      cookies: "Política de Cookies",
    }
  },
  en: {
    nav: ["Services", "Philosophy", "Contact"],
    hero: {
      tag: "TALENT SEARCH . SELF-MANAGED CAREER TRANSITION",
      title1: "Human",
      title2: "Talent",
      title3: "Redefined.",
      desc: "Strategic consultancy focused on Candidate Centricity. We connect people with purpose through human and precise processes, with constant support",
      cta: "About Us",
    },
    about: {
      tag: "ABOUT US",
      p1: "Expert team with more than 15 years of experience in Hispano-America and Europe in talent attraction and employer branding strategies. We are dedicated to taking people and companies step by step to find the talent for the ideal project.",
      p2: "We move from transactional processes to evolve into a people-for-people process, and yes, we implement technology but we do not replace the human touch required in any talent search process.",
      phrase: "CONNECT YOUR PRESENT WITH THE FUTURE YOU WANT",
    },
    services: {
      tag1: "TALENT SEARCH",
      title1: "Headhunting",
      desc1: "We identify talent that not only meets technical requirements but also aligns with the strategic vision and culture of your organization.",
      tag2: "PROFESSIONAL CAREER STRATEGY",
      title2: "Career Transition",
      desc2: "We have a system created by talent experts for the self-management of career transition, where we accompany the person in the rediscovery of their professional value offer.",
      cta: "Contact us to learn more",
    },
    philosophy: {
      tag: "OUR PHILOSOPHY",
      title: "Candidate Centricity",
      label1: "The Individual",
      desc1: "We design success trajectories centered on the person. We believe that talent finds its maximum potential when its purpose resonates with the organization.",
      label2: "Ethical Impact",
      desc2: "Our Candidate Centricity methodology ensures honest and transparent transitions, prioritizing the human behind the professional profile, while taking care of organizational culture",
    },
    blog: {
      title: "JOURNAL",
      tag: "THOUGHTS",
      posts: [
        { id: 1, title: "Algorithms vs Intuition", date: "26.05.04", cat: "INSIGHT" },
        { id: 2, title: "Executive Reinvention", date: "26.04.28", cat: "CAREER" },
        { id: 3, title: "Transition Culture", date: "26.04.15", cat: "ETHICS" }
      ]
    },
    contact: {
      tag: "CONNECT WITH US",
      title: "CONNECT WITH US",
      name: "Full Name",
      email: "Email Address",
      message: "Message",
      placeholderName: "YOUR NAME",
      placeholderEmail: "YOUR EMAIL",
      placeholderMessage: "LEAVE US YOUR MESSAGE",
      submit: "SEND",
    },
    cookies: {
      title: "APAZ Talent Search uses cookies",
      desc: "We use cookies on our website. By clicking \"Accept all cookies\", you agree to the storage of cookies on your device to improve our site's performance, enhance functionality and personalization, analyze site usage and assist in our marketing efforts. By clicking \"Strictly necessary\", you only agree to the storage of strictly necessary cookies on your device.",
      settings: "Cookie settings",
      necessary: "Strictly necessary",
      acceptAll: "Accept all cookies",
      privacy: "Privacy Policy",
      cookies: "Cookie Policy",
    }
  }
};

// --- Components ---

const Navbar = ({ language, setLanguage }: { language: 'es' | 'en', setLanguage: (l: 'es' | 'en') => void }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = translations[language];

  return (
    <nav className="border-b-2 border-brand-black bg-brand-white sticky top-0 z-50">
      <div className="max-w-[1600px] mx-auto px-6 h-32 flex justify-between items-center">
        <a href="#" className="flex items-center group">
          <img 
            src="/logo-final.png" 
            alt="APAZ Talent Search" 
            className="h-16 md:h-24 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] mr-8 border-r border-brand-black/10 pr-8">
            {t.nav.map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace('í', 'i')}`} 
                className="hover:line-through transition-all decoration-2"
              >
                {item}
              </a>
            ))}
          </div>
          
          <div className="flex items-center gap-3">
             <button 
               onClick={() => setLanguage('es')}
               className={`text-[10px] font-black tracking-widest px-2 ${language === 'es' ? 'bg-brand-black text-white' : 'opacity-40'}`}
             >
               ES
             </button>
             <button 
               onClick={() => setLanguage('en')}
               className={`text-[10px] font-black tracking-widest px-2 ${language === 'en' ? 'bg-brand-black text-white' : 'opacity-40'}`}
             >
               EN
             </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden flex items-center gap-4"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="flex items-center gap-2 text-[10px] font-black mr-4">
             <span onClick={(e) => { e.stopPropagation(); setLanguage('es'); }} className={language === 'es' ? 'underline' : 'opacity-40'}>ES</span>
             <span className="opacity-20">|</span>
             <span onClick={(e) => { e.stopPropagation(); setLanguage('en'); }} className={language === 'en' ? 'underline' : 'opacity-40'}>EN</span>
          </div>
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-full left-0 right-0 bg-brand-black text-white p-12 flex flex-col gap-8 md:hidden h-[calc(100vh-128px)]"
        >
          {t.nav.map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase().replace('í', 'i')}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-4xl font-black uppercase tracking-tighter"
            >
              {item}
            </a>
          ))}
        </motion.div>
      )}
    </nav>
  );
};

const Hero = ({ language }: { language: 'es' | 'en' }) => {
  const t = translations[language].hero;
  return (
    <section className="min-h-[90vh] flex flex-col border-b-2 border-brand-black">
      <div className="flex-1 flex flex-col md:flex-row">
        <div className="flex-[2] p-6 md:p-12 lg:p-20 flex flex-col justify-center border-r-2 border-brand-black">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[10px] font-black uppercase tracking-[0.3em] mb-12 block border-l-4 border-brand-black pl-4">
              {t.tag}
            </span>
            <h1 className="text-6xl md:text-8xl lg:text-[10vw] font-black leading-[0.85] letter-spacing-tight mb-12 uppercase">
              {t.title1} <br />
              {t.title2} <br />
              <span className="text-brand-gold italic font-light lowercase tracking-normal">{t.title3}</span>
            </h1>
          </motion.div>
          
          <div className="flex flex-col sm:flex-row gap-12 items-baseline mt-12">
             <p className="text-xs font-medium max-w-xs leading-relaxed uppercase tracking-wider opacity-60">
                {t.desc}
             </p>
             <a href="#conocenos" className="text-2xl font-black uppercase border-b-4 border-brand-black hover:border-brand-gold transition-colors pb-1">
                {t.cta} →
             </a>
          </div>
        </div>

        <div className="flex-1 bg-brand-gray relative overflow-hidden group min-h-[400px] md:min-h-0">
           <img 
             src="/imagen-portada.png" 
             className="w-full h-full object-cover grayscale brightness-90 group-hover:scale-110 transition-transform duration-1000"
             alt="Collaborative Talent"
           />
           <div className="absolute inset-0 border-[20px] border-brand-white/10" />
           <div className="absolute bottom-10 left-10 text-white font-black text-[10px] tracking-widest uppercase bg-brand-black px-4 py-2">
              México | LATAM
           </div>
        </div>
      </div>
    </section>
  );
};

const About = ({ language }: { language: 'es' | 'en' }) => {
  const t = translations[language].about;
  
  return (
    <section id="conocenos" className="py-24 md:py-32 border-b-2 border-brand-black bg-brand-white">
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] mb-12 block border-l-4 border-brand-gold pl-4">
              {t.tag}
            </span>
            <div className="space-y-8 max-w-xl">
              <p className="text-xl md:text-2xl font-bold leading-tight uppercase tracking-tight">
                {t.p1}
              </p>
              <p className="text-sm md:text-md font-medium leading-relaxed opacity-60 uppercase tracking-wide">
                {t.p2}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center lg:items-end">
            <h2 className="text-4xl md:text-6xl font-black leading-none text-center lg:text-right uppercase tracking-tighter max-w-md">
              <span className="text-brand-gold">{language === 'es' ? 'CONECTA' : 'CONNECT'}</span>
              {language === 'es' ? ' TU PRESENTE CON EL FUTURO QUE QUIERES' : ' YOUR PRESENT WITH THE FUTURE YOU WANT'}
            </h2>
            <div className="w-24 h-2 bg-brand-black mt-12 hidden lg:block" />
          </div>
        </div>
      </div>
    </section>
  );
};

const Services = ({ language }: { language: 'es' | 'en' }) => {
  const t = translations[language].services;
  const items = [
    {
      id: "headhunting",
      title: t.title1,
      desc: t.desc1,
      tag: t.tag1,
      details: language === 'es' 
        ? ["Mapeo de talento", "Media y Alta Gerencia", "Alineación cultural", "Seguimiento post vinculación"] 
        : ["Talent Mapping", "Middle & Senior Management", "Cultural Alignment", "Post-placement Follow-up"]
    },
    {
      id: "transicion",
      title: t.title2,
      desc: t.desc2,
      tag: t.tag2,
      details: language === 'es' 
        ? ["Marca Personal", "Estrategia de Red", "Mentores de transición profesional", "Autogestión de transición profesional con ELVIA"] 
        : ["Personal Branding", "Network Strategy", "Professional Transition Mentors", "Career Transition Self-management with ELVIA"]
    }
  ];

  return (
    <section id="servicios" className="border-b-2 border-brand-black">
      <div className="flex flex-col md:flex-row min-h-[70vh]">
        {items.map((item, idx) => (
          <div 
            key={item.id}
            className={`flex-1 p-12 md:p-20 group hover:bg-brand-gold transition-all duration-700 cursor-pointer relative flex flex-col justify-between ${
              idx === 0 ? "border-b-2 md:border-b-0 md:border-r-2" : ""
            } border-brand-black`}
          >
            <div>
              <span className="text-[10px] font-black tracking-widest mb-12 block opacity-40 group-hover:opacity-100 group-hover:text-brand-black">
                 {item.tag}
              </span>
              <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-none group-hover:text-brand-black">
                 {item.title}
              </h3>
              <p className="text-sm font-medium leading-relaxed max-w-sm mb-12 opacity-60 group-hover:opacity-100 group-hover:text-brand-black">
                 {item.desc}
              </p>
              
              <ul className="space-y-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                {item.details.map((detail, i) => (
                  <li key={i} className="text-[10px] font-black uppercase tracking-widest flex items-center gap-3 text-brand-black">
                    <div className="w-2 h-2 bg-brand-black" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-4 group/btn group-hover:text-brand-black mt-20">
               <span className="text-[10px] font-black uppercase">{t.cta}</span>
               <div className="w-12 h-1 bg-current group-hover/btn:w-24 transition-all" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Philosophy = ({ language }: { language: 'es' | 'en' }) => {
  const t = translations[language].philosophy;
  return (
    <section id="filosofia" className="py-32 md:py-60 bg-brand-black text-white overflow-hidden relative border-b-2 border-brand-black">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black opacity-[0.03] select-none whitespace-nowrap">
        APAZ TALENT
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <span className="text-[10px] font-black uppercase tracking-[0.5em] mb-12 block text-brand-gold">
          {t.tag}
        </span>
        <h2 className="text-5xl md:text-9xl font-black uppercase leading-[0.8] tracking-tighter mb-20">
          {t.title}
        </h2>
        <div className="flex justify-center mb-20">
          <img 
            src={language === 'es' ? "/candidate-centricity-esp.png" : "/candidate-centricity-eng.png"} 
            alt="Candidate Centricity" 
            className="max-w-4xl w-full h-auto object-contain"
          />
        </div>
        <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-20 text-left">
           <div>
              <h4 className="text-[10px] font-black uppercase mb-6 tracking-widest">{t.label1}</h4>
              <p className="text-sm font-light leading-relaxed opacity-60 border-l border-white/20 pl-8">
                 {t.desc1}
              </p>
           </div>
           <div>
              <h4 className="text-[10px] font-black uppercase mb-6 tracking-widest">{t.label2}</h4>
              <p className="text-sm font-light leading-relaxed opacity-60 border-l border-white/20 pl-8">
                 {t.desc2}
              </p>
           </div>
        </div>
      </div>
    </section>
  );
};

const ContactForm = ({ language }: { language: 'es' | 'en' }) => {
  const t = translations[language].contact;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const { error } = await supabase
        .from('contacts')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message
        }]);

      if (error) throw error;
      
      setStatus('success');
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(`Hola Alejandro, acabo de registrarme en APAZ Talent Search. Mi nombre es ${formData.name}. Me gustaría recibir más información.`);
    window.open(`https://wa.me/525525164576?text=${text}`, '_blank');
  };

  return (
    <section id="contacto" className="bg-brand-white min-h-[60vh] border-b-2 border-brand-black flex flex-col">
       <div className="flex-1 flex flex-col lg:flex-row">
          <div className="lg:w-1/2 p-12 md:p-24 border-r-2 border-brand-black flex flex-col justify-between">
             <div>
                <span className="text-[10px] font-black uppercase tracking-[0.5em] mb-12 block text-brand-gold">
                   {language === 'es' ? 'CONTACTO' : 'CONTACT'}
                </span>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase leading-[0.9] tracking-tighter mb-12">
                   {t.title}
                </h2>
             </div>
             <div className="space-y-4 text-xs font-black uppercase">
                <p className="opacity-40 tracking-widest">CIUDAD DE MÉXICO</p>
                <p className="opacity-40 tracking-widest">BOGOTÁ</p>
                <p className="opacity-40 tracking-widest">LATAM</p>
             </div>
          </div>
          
          <div className="lg:w-1/2 p-10 md:p-24 flex flex-col justify-center">
             <AnimatePresence mode="wait">
               {status === 'success' ? (
                 <motion.div 
                   key="success"
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -20 }}
                   className="text-center space-y-8"
                 >
                   <div className="flex justify-center">
                     <div className="w-20 h-20 bg-brand-gold flex items-center justify-center rounded-full">
                       <CheckCircle2 className="size-10 text-brand-black" />
                     </div>
                   </div>
                   <h3 className="text-3xl font-black uppercase tracking-tighter">
                     {language === 'es' ? '¡MENSAJE RECIBIDO!' : 'MESSAGE RECEIVED!'}
                   </h3>
                   <p className="text-xs font-light leading-relaxed opacity-60 uppercase tracking-[0.2em]">
                     {language === 'es' 
                       ? 'Gracias por contactarnos. Tu información ha sido guardada.' 
                       : 'Thank you for reaching out. Your information has been saved.'}
                   </p>
                   
                   <div className="pt-4 flex flex-col items-center gap-4">
                      <button 
                        onClick={openWhatsApp}
                        className="w-full bg-[#25D366] text-white p-6 text-sm font-black uppercase tracking-widest hover:bg-[#128C7E] transition-all flex items-center justify-center gap-3"
                      >
                        HABLAR POR WHATSAPP AHORA
                      </button>
                      <button 
                        onClick={() => {
                          setStatus('idle');
                          setFormData({ name: '', email: '', phone: '', message: '' });
                        }}
                        className="text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-all"
                      >
                        {language === 'es' ? 'VOLVER AL FORMULARIO' : 'BACK TO FORM'}
                      </button>
                   </div>
                 </motion.div>
               ) : (
                 <motion.form 
                   key="form"
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   className="space-y-8" 
                   onSubmit={handleSubmit}
                 >
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest opacity-40">{t.name}</label>
                       <input 
                         type="text" 
                         required
                         value={formData.name}
                         onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                         className="w-full bg-brand-gray p-6 text-xl font-black uppercase tracking-tighter focus:bg-brand-black focus:text-white transition-all outline-none" 
                         placeholder={t.placeholderName} 
                       />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest opacity-40">{t.email}</label>
                          <input 
                            type="email" 
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-brand-gray p-6 text-xl font-black uppercase tracking-tighter focus:bg-brand-black focus:text-white transition-all outline-none" 
                            placeholder={t.placeholderEmail} 
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest opacity-40">
                             {language === 'es' ? 'TELÉFONO' : 'PHONE'}
                          </label>
                          <input 
                            type="tel" 
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full bg-brand-gray p-6 text-xl font-black uppercase tracking-tighter focus:bg-brand-black focus:text-white transition-all outline-none" 
                            placeholder="+57 300..." 
                          />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest opacity-40">{t.message}</label>
                       <textarea 
                         rows={2} 
                         required
                         value={formData.message}
                         onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                         className="w-full bg-brand-gray p-6 text-xl font-black uppercase tracking-tighter focus:bg-brand-black focus:text-white transition-all outline-none resize-none" 
                         placeholder={t.placeholderMessage}
                       ></textarea>
                    </div>
                    
                    <button 
                      disabled={status === 'loading'}
                      className="w-full h-20 bg-brand-black text-white text-xl font-black uppercase tracking-tighter hover:bg-brand-gold transition-all duration-500"
                    >
                      {status === 'loading' ? 'ENVIANDO...' : <>{t.submit} →</>}
                    </button>
                 </motion.form>
               )}
             </AnimatePresence>
          </div>
       </div>
    </section>
  );
};

const Footer = ({ language }: { language: 'es' | 'en' }) => {
  const year = new Date().getFullYear();
  const t = translations[language];

  const resources = [
    { title: t.nav[0], href: '#servicios' },
    { title: t.nav[1], href: '#filosofia' },
    { title: t.nav[2], href: '#contacto' },
  ];

  const legal = [
    { title: language === 'es' ? 'Privacidad' : 'Privacy', type: 'privacy' },
    { title: language === 'es' ? 'Cookies' : 'Cookies', type: 'cookies' },
  ];

  const socialLinks = [
    { icon: <LinkedinIcon className="size-4" />, link: '#' },
    { icon: <InstagramIcon className="size-4" />, link: '#' },
  ];

  return (
    <footer className="bg-brand-black text-white relative border-t-2 border-brand-black">
      <div className="max-w-[1600px] mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 lg:gap-12">
          <div className="col-span-1 md:col-span-3 space-y-2">
            <img 
              src="/logo-fondo-negro.png" 
              alt="APAZ Talent Search" 
              className="h-32 md:h-56 w-auto object-contain" 
            />
            <p className="text-xs font-medium uppercase tracking-[0.2em] max-w-sm opacity-40 leading-relaxed">
              {t.hero.desc}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((item, i) => (
                <div
                  key={i}
                  className="border border-white/10 p-3 transition-all duration-300 opacity-40"
                >
                  {item.icon}
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-1 border-t md:border-t-0 md:border-l border-white/10 pt-10 md:pt-0 md:pl-12">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 mb-10 block">
               {language === 'es' ? 'NAVEGACIÓN' : 'NAVIGATION'}
            </span>
            <div className="flex flex-col gap-5">
              {resources.map((item) => (
                <a 
                  key={item.title} 
                  href={item.href}
                  className="text-[10px] font-black uppercase tracking-[0.2em] hover:text-brand-gold transition-colors"
                >
                  {item.title}
                </a>
              ))}
            </div>
          </div>

          <div className="col-span-1 border-t md:border-t-0 md:border-l border-white/10 pt-10 md:pt-0 md:pl-12">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 mb-10 block">
               LEGAL
            </span>
            <div className="flex flex-col gap-5">
              {legal.map((item) => (
                <button 
                  key={item.title} 
                  onClick={() => (window as any).openLegalModal(item.type)}
                  className="text-[10px] text-left font-black uppercase tracking-[0.2em] hover:text-brand-gold transition-colors"
                >
                  {item.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] font-black uppercase tracking-[0.3em] opacity-20">
          <p>© APAZ TALENT SEARCH {year}. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
};

const LegalModal = ({ 
  isOpen, 
  onClose, 
  type, 
  language,
  cookiePreferences,
  setCookiePreferences
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  type: 'privacy' | 'cookies' | 'settings' | null, 
  language: 'es' | 'en',
  cookiePreferences?: any,
  setCookiePreferences?: (p: any) => void
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-black/80 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-brand-white w-full max-w-4xl max-h-[85vh] overflow-y-auto p-8 md:p-16 border-2 border-brand-black shadow-2xl"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 hover:bg-brand-black/5 rounded-full transition-colors z-10"
            >
              <XIcon className="size-6 text-brand-black" />
            </button>
            
            {type === 'privacy' && <PrivacyPolicy language={language} />}
            {type === 'cookies' && <CookiePolicy language={language} />}
            {type === 'settings' && (
              <CookieSettings 
                language={language} 
                preferences={cookiePreferences} 
                setPreferences={setCookiePreferences!} 
              />
            )}
            
            <div className="mt-12 pt-8 border-t border-brand-black/10 flex flex-col sm:flex-row justify-end gap-4">
              {type === 'settings' && (
                <button 
                  onClick={() => {
                    localStorage.setItem("cookie-consent", JSON.stringify(cookiePreferences));
                    window.dispatchEvent(new Event('cookie-updated'));
                    onClose();
                  }}
                  className="bg-brand-gold text-brand-black px-10 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-brand-black hover:text-white transition-all order-1 sm:order-2"
                >
                  {language === 'es' ? 'CONFIRMAR MIS PREFERENCIAS' : 'CONFIRM MY PREFERENCES'}
                </button>
              )}
              <button 
                onClick={onClose}
                className={`bg-brand-black/5 text-brand-black px-8 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-brand-black/10 transition-all ${type === 'settings' ? 'order-2 sm:order-1' : ''}`}
              >
                {language === 'es' ? 'CERRAR' : 'CLOSE'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const CookieBanner = ({ language, onOpenLegal }: { language: 'es' | 'en', onOpenLegal: (type: 'privacy' | 'cookies' | 'settings') => void }) => {
  const [isVisible, setIsVisible] = useState(false);
  const t = translations[language].cookies;

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setIsVisible(true);
    }
    
    const handleUpdate = () => {
      if (localStorage.getItem("cookie-consent")) {
        setIsVisible(false);
      }
    };
    window.addEventListener('cookie-updated', handleUpdate);
    return () => window.removeEventListener('cookie-updated', handleUpdate);
  }, []);

  const acceptAll = () => {
    const prefs = { functional: true, analytics: true, marketing: true };
    localStorage.setItem("cookie-consent", JSON.stringify(prefs));
    setIsVisible(false);
  };

  const acceptNecessary = () => {
    const prefs = { functional: false, analytics: false, marketing: false };
    localStorage.setItem("cookie-consent", JSON.stringify(prefs));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-0 left-0 right-0 z-[150] bg-white text-brand-black p-8 md:p-12 border-t-4 border-brand-gold shadow-[0_-10px_50px_rgba(0,0,0,0.2)]"
    >
      <div className="max-w-[1600px] mx-auto flex flex-col gap-8">
        <div>
          <h3 className="text-xl font-black uppercase tracking-widest mb-4">
            {t.title}
          </h3>
          <p className="text-xs font-light leading-relaxed max-w-5xl opacity-70">
            {t.desc}
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            <button 
              onClick={() => onOpenLegal('cookies')}
              className="text-[10px] font-black uppercase tracking-widest border-b border-brand-black hover:text-brand-gold hover:border-brand-gold transition-all"
            >
              {t.cookies}
            </button>
            <button 
              onClick={() => onOpenLegal('privacy')}
              className="text-[10px] font-black uppercase tracking-widest border-b border-brand-black hover:text-brand-gold hover:border-brand-gold transition-all"
            >
              {t.privacy}
            </button>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
          <button 
            onClick={() => onOpenLegal('settings')}
            className="text-[10px] font-black uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity"
          >
            {t.settings}
          </button>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button 
              onClick={acceptNecessary}
              className="bg-brand-black/5 text-brand-black px-8 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-brand-black/10 transition-all border border-brand-black/10"
            >
              {t.necessary}
            </button>
            <button 
              onClick={acceptAll}
              className="bg-brand-black text-white px-8 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-brand-gold hover:text-brand-black transition-all"
            >
              {t.acceptAll}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const [cookiePreferences, setCookiePreferences] = useState({
    functional: true,
    analytics: true,
    marketing: true
  });
  const [legalModal, setLegalModal] = useState<{ isOpen: boolean, type: 'privacy' | 'cookies' | 'settings' | null }>({
    isOpen: false,
    type: null
  });

  useEffect(() => {
    (window as any).openLegalModal = (type: 'privacy' | 'cookies' | 'settings') => {
      setLegalModal({ isOpen: true, type });
    };
  }, []);

  return (
    <div className="bg-brand-white font-sans text-brand-black selection:bg-brand-gold selection:text-brand-black">
      <div className="h-2 bg-brand-black w-full" />
      <Navbar language={language} setLanguage={setLanguage} />
      <Hero language={language} />
      <About language={language} />
      <Services language={language} />
      <Philosophy language={language} />
      {/* <Blog language={language} /> */}
      <ContactForm language={language} />
      <Footer language={language} />
      <CookieBanner language={language} onOpenLegal={(type) => setLegalModal({ isOpen: true, type })} />
      <LegalModal 
        isOpen={legalModal.isOpen} 
        onClose={() => setLegalModal({ ...legalModal, isOpen: false })} 
        type={legalModal.type}
        language={language}
        cookiePreferences={cookiePreferences}
        setCookiePreferences={setCookiePreferences}
      />
    </div>
  );
}
