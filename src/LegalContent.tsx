import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon } from 'lucide-react';

export const PrivacyPolicy = ({ language }: { language: 'es' | 'en' }) => (
  <div className="space-y-8 text-sm font-light leading-relaxed text-brand-black/80">
    <section>
      <h3 className="text-xl font-black uppercase tracking-widest text-brand-black mb-4">
        {language === 'es' ? 'Aviso de Privacidad' : 'Privacy Policy'}
      </h3>
      <p>
        {language === 'es' 
          ? 'En APAZ Talent Search, la protección de sus datos personales es una prioridad. Este Aviso de Privacidad describe cómo recopilamos, usamos y protegemos su información al utilizar nuestro sitio web y servicios de consultoría, búsqueda de talento y transición de carrera.'
          : 'At APAZ Talent Search, protecting your personal data is a priority. This Privacy Policy describes how we collect, use, and protect your information when using our website and consulting, talent search, and career transition services.'}
      </p>
    </section>

    <section>
      <h4 className="font-bold uppercase tracking-wider text-brand-black mb-2">
        {language === 'es' ? '1. Datos que Recopilamos' : '1. Data We Collect'}
      </h4>
      <p>
        {language === 'es'
          ? 'Recopilamos información que usted nos proporciona directamente al completar formularios en nuestro sitio, suscribirse a nuestro boletín o contactarnos para servicios. Esto incluye, entre otros: nombre, correo electrónico, número de teléfono, currículum vitae, historial profesional y preferencias de carrera.'
          : 'We collect information that you provide directly to us by completing forms on our site, subscribing to our newsletter, or contacting us for services. This includes, among others: name, email, phone number, resume, professional history, and career preferences.'}
      </p>
    </section>

    <section>
      <h4 className="font-bold uppercase tracking-wider text-brand-black mb-2">
        {language === 'es' ? '2. Uso de la Información' : '2. Use of Information'}
      </h4>
      <p>
        {language === 'es' ? 'Utilizamos su información para:' : 'We use your information to:'}
      </p>
      <ul className="list-disc pl-5 space-y-2 mt-2">
        {language === 'es' ? (
          <>
            <li>Proveer y mejorar nuestros servicios de reclutamiento y consultoría.</li>
            <li>Gestionar procesos de selección de talento.</li>
            <li>Facilitar programas de transición de carrera autogestionada.</li>
            <li>Enviar comunicaciones relevantes sobre oportunidades profesionales.</li>
            <li>Cumplir con obligaciones legales y regulatorias.</li>
          </>
        ) : (
          <>
            <li>Provide and improve our recruitment and consulting services.</li>
            <li>Manage talent selection processes.</li>
            <li>Facilitate self-managed career transition programs.</li>
            <li>Send relevant communications about professional opportunities.</li>
            <li>Comply with legal and regulatory obligations.</li>
          </>
        )}
      </ul>
    </section>

    <section>
      <h4 className="font-bold uppercase tracking-wider text-brand-black mb-2">
        {language === 'es' ? '3. Protección de Datos' : '3. Data Protection'}
      </h4>
      <p>
        {language === 'es'
          ? 'Implementamos medidas de seguridad técnicas y organizativas para proteger sus datos personales contra acceso no autorizado, pérdida o alteración. Sus datos son tratados con estricta confidencialidad bajo los principios de licitud, consentimiento e información.'
          : 'We implement technical and organizational security measures to protect your personal data against unauthorized access, loss, or alteration. Your data is treated with strict confidentiality under the principles of legality, consent, and information.'}
      </p>
    </section>

    <section>
      <h4 className="font-bold uppercase tracking-wider text-brand-black mb-2">
        {language === 'es' ? '4. Sus Derechos (ARCO)' : '4. Your Rights'}
      </h4>
      <p>
        {language === 'es'
          ? 'Usted tiene derecho a acceder, rectificar, cancelar u oponerse al tratamiento de sus datos personales. Para ejercer estos derechos, puede contactarnos a través de los medios proporcionados en nuestra sección de contacto.'
          : 'You have the right to access, rectify, cancel, or oppose the processing of your personal data. To exercise these rights, you can contact us through the means provided in our contact section.'}
      </p>
    </section>
  </div>
);

export const CookiePolicy = ({ language }: { language: 'es' | 'en' }) => (
  <div className="space-y-8 text-sm font-light leading-relaxed text-brand-black/80">
    <section>
      <h3 className="text-xl font-black uppercase tracking-widest text-brand-black mb-4">
        {language === 'es' ? 'Política de Cookies' : 'Cookie Policy'}
      </h3>
      <p>
        {language === 'es'
          ? 'Este sitio web utiliza cookies para mejorar su experiencia de navegación. Al continuar utilizando nuestro sitio, usted acepta el uso de cookies de acuerdo con esta política.'
          : 'This website uses cookies to improve your browsing experience. By continuing to use our site, you agree to the use of cookies in accordance with this policy.'}
      </p>
    </section>

    <section>
      <h4 className="font-bold uppercase tracking-wider text-brand-black mb-2">
        {language === 'es' ? '¿Qué son las cookies?' : 'What are cookies?'}
      </h4>
      <p>
        {language === 'es'
          ? 'Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita un sitio web. Nos ayudan a reconocer su dispositivo y recordar sus preferencias para ofrecerle una experiencia más fluida.'
          : 'Cookies are small text files that are stored on your device when you visit a website. They help us recognize your device and remember your preferences to offer you a smoother experience.'}
      </p>
    </section>

    <section>
      <h4 className="font-bold uppercase tracking-wider text-brand-black mb-2">
        {language === 'es' ? 'Tipos de Cookies que utilizamos' : 'Types of Cookies we use'}
      </h4>
      <div className="space-y-4 mt-2">
        <div>
          <p className="font-semibold text-brand-black">
            {language === 'es' ? 'Cookies Estrictamente Necesarias:' : 'Strictly Necessary Cookies:'}
          </p>
          <p>
            {language === 'es'
              ? 'Indispensables para el funcionamiento básico del sitio y la seguridad.'
              : 'Essential for the basic functioning of the site and security.'}
          </p>
        </div>
        <div>
          <p className="font-semibold text-brand-black">
            {language === 'es' ? 'Cookies de Rendimiento y Análisis:' : 'Performance and Analytical Cookies:'}
          </p>
          <p>
            {language === 'es'
              ? 'Nos permiten entender cómo interactúan los visitantes con el sitio, ayudándonos a mejorar el contenido y la navegación.'
              : 'They allow us to understand how visitors interact with the site, helping us improve content and navigation.'}
          </p>
        </div>
        <div>
          <p className="font-semibold text-brand-black">
            {language === 'es' ? 'Cookies de Funcionalidad:' : 'Functionality Cookies:'}
          </p>
          <p>
            {language === 'es'
              ? 'Permiten que el sitio recuerde sus elecciones (como el idioma) para proporcionar funciones personalizadas.'
              : 'They allow the site to remember your choices (such as language) to provide personalized features.'}
          </p>
        </div>
      </div>
    </section>

    <section>
      <h4 className="font-bold uppercase tracking-wider text-brand-black mb-2">
        {language === 'es' ? 'Gestión de Cookies' : 'Cookie Management'}
      </h4>
      <p>
        {language === 'es'
          ? 'Usted puede controlar y/o eliminar las cookies en cualquier momento a través de la configuración de su navegador. Sin embargo, tenga en cuenta que deshabilitar ciertas cookies puede afectar la funcionalidad de nuestro sitio web.'
          : 'You can control and/or delete cookies at any time through your browser settings. However, please note that disabling certain cookies may affect the functionality of our website.'}
      </p>
    </section>
  </div>
);

export const CookieSettings = ({ 
  language, 
  preferences, 
  setPreferences 
}: { 
  language: 'es' | 'en', 
  preferences: any, 
  setPreferences: (p: any) => void 
}) => {
  const categories = [
    {
      id: 'necessary',
      title: language === 'es' ? 'Cookies estrictamente necesarias' : 'Strictly necessary cookies',
      desc: language === 'es' 
        ? 'Estas cookies son necesarias para que el sitio web funcione y no se pueden desactivar en nuestros sistemas. Por lo general, solo se configuran en respuesta a acciones realizadas por usted que equivalen a una solicitud de servicios.'
        : 'These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services.',
      required: true
    },
    {
      id: 'functional',
      title: language === 'es' ? 'Cookies de funcionalidad' : 'Functionality cookies',
      desc: language === 'es'
        ? 'Estas cookies permiten que el sitio ofrezca una mejor funcionalidad y personalización (como el idioma). Pueden ser establecidas por nosotros o por terceras partes cuyos servicios hemos añadido a nuestras páginas.'
        : 'These cookies enable the website to provide enhanced functionality and personalization (such as language). They may be set by us or by third party providers whose services we have added to our pages.',
      required: false
    },
    {
      id: 'analytics',
      title: language === 'es' ? 'Cookies de rendimiento' : 'Performance cookies',
      desc: language === 'es'
        ? 'Estas cookies nos permiten contar las visitas y fuentes de circulación para poder medir y mejorar el desempeño de nuestro sitio. Nos ayudan a saber qué páginas son las más o menos populares.'
        : 'These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular.',
      required: false
    },
    {
      id: 'marketing',
      title: language === 'es' ? 'Cookies de targeting' : 'Targeting cookies',
      desc: language === 'es'
        ? 'Estas cookies pueden ser establecidas a través de nuestro sitio por nuestros socios publicitarios. Pueden ser utilizadas por esas empresas para crear un perfil de sus intereses y mostrarle anuncios relevantes en otros sitios.'
        : 'These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites.',
      required: false
    }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-black uppercase tracking-widest text-brand-black mb-8 border-b-2 border-brand-black pb-4">
        {language === 'es' ? 'Centro de preferencia de la privacidad' : 'Privacy Preference Center'}
      </h3>
      
      <div className="space-y-4">
        {categories.map((cat) => (
          <div key={cat.id} className="p-6 bg-brand-gray/30 border border-brand-black/5 hover:border-brand-gold transition-colors group">
            <div className="flex justify-between items-start gap-6">
              <div className="flex-1">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-brand-black flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-brand-gold" />
                  {cat.title}
                  {cat.required && (
                    <span className="text-[8px] opacity-40 lowercase italic font-light ml-2">
                      ({language === 'es' ? 'Siempre activas' : 'Always active'})
                    </span>
                  )}
                </h4>
                <p className="mt-3 text-[10px] font-light leading-relaxed opacity-60 max-w-2xl">
                  {cat.desc}
                </p>
              </div>
              
              <div className="pt-1">
                {cat.required ? (
                  <div className="w-10 h-5 bg-brand-black rounded-full relative opacity-20">
                    <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
                  </div>
                ) : (
                  <button 
                    onClick={() => setPreferences({ ...preferences, [cat.id]: !preferences[cat.id] })}
                    className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${preferences[cat.id] ? 'bg-brand-black' : 'bg-gray-300'}`}
                  >
                    <motion.div 
                      animate={{ x: preferences[cat.id] ? 20 : 0 }}
                      className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm"
                    />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
