import React from 'react';
import { Phone, MessageCircle, Mail, MapPin, Clock, ExternalLink } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

export const ContactSection: React.FC = () => {
  const { content, language, t } = useContent();
  const { contact } = content;

  return (
    <section id="contact" className="py-20 lg:py-28 bg-neutral-900/40 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold text-amber-500 tracking-wider uppercase mb-2">
            {language === 'ar' ? 'تواصل معنا' : 'Direct Channels'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight [text-wrap:balance]">
            {language === 'ar'
              ? 'يسعدنا استقبال استفساراتكم وزيارتكم في مقر الشركة'
              : 'Connect with Mismar Engineering & Project Directors'}
          </h2>
          <p className="mt-4 text-base text-neutral-300 leading-relaxed font-normal">
            {language === 'ar'
              ? 'نحن هنا للإجابة عن تساؤلاتكم الهندسية، مراجعة مخططاتكم، وتقديم الاستشارات اللازمة لبناء مشروعكم القادم.'
              : 'Our engineers are ready to assist with blueprints review, BOQ audits, and site feasibility.'}
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Phone */}
          <div className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900/60 hover:border-neutral-700 transition-colors flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 mb-4">
                <Phone className="w-5 h-5" />
              </div>
              <span className="text-xs text-neutral-400 block mb-1">
                {language === 'ar' ? 'الاتصال المباشر' : 'Telephone'}
              </span>
              <a
                href={`tel:${contact.phone}`}
                className="text-base font-bold text-white hover:text-amber-400 transition-colors tabular-nums"
                dir="ltr"
              >
                {contact.phone}
              </a>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-800 text-[11px] text-neutral-500">
              {language === 'ar' ? 'خدمة العملاء والاستفسارات' : 'Inquiries Line'}
            </div>
          </div>

          {/* WhatsApp */}
          <div className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900/60 hover:border-neutral-700 transition-colors flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                <MessageCircle className="w-5 h-5" />
              </div>
              <span className="text-xs text-neutral-400 block mb-1">
                {language === 'ar' ? 'محادثة واتساب' : 'WhatsApp Official'}
              </span>
              <a
                href={`https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="text-base font-bold text-white hover:text-emerald-400 transition-colors tabular-nums"
                dir="ltr"
              >
                +{contact.whatsapp}
              </a>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-800 text-[11px] text-neutral-500">
              {language === 'ar' ? 'محادثة فورية مع مهندس' : 'Live Engineering Chat'}
            </div>
          </div>

          {/* Email */}
          <div className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900/60 hover:border-neutral-700 transition-colors flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-xs text-neutral-400 block mb-1">
                {language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
              </span>
              <a
                href={`mailto:${contact.email}`}
                className="text-sm font-bold text-white hover:text-blue-400 transition-colors truncate block"
              >
                {contact.email}
              </a>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-800 text-[11px] text-neutral-500">
              {language === 'ar' ? 'العطاءات والمناقصات' : 'Tenders & Official Inquiries'}
            </div>
          </div>

          {/* Working Hours */}
          <div className="p-6 rounded-2xl border border-neutral-800 bg-neutral-900/60 hover:border-neutral-700 transition-colors flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-amber-500 mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-xs text-neutral-400 block mb-1">
                {language === 'ar' ? 'أوقات العمل' : 'Working Hours'}
              </span>
              <p className="text-xs font-semibold text-neutral-200 leading-relaxed">
                {t(contact.workingHours)}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-800 text-[11px] text-neutral-500">
              {language === 'ar' ? 'سجل تجاري: ' + contact.crNumber : 'CR: ' + contact.crNumber}
            </div>
          </div>
        </div>

        {/* Address & Google Maps Banner */}
        <div className="p-6 sm:p-8 rounded-2xl border border-neutral-800 bg-neutral-950 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 shrink-0 mt-1">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-neutral-400 block mb-1">
                {language === 'ar' ? 'المقر الرئيسي للشركة' : 'Headquarters Location'}
              </span>
              <p className="text-sm font-semibold text-white leading-relaxed">
                {t(contact.address)}
              </p>
            </div>
          </div>

          {contact.googleMapsUrl && (
            <a
              href={contact.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white text-xs font-semibold rounded-lg flex items-center gap-2 whitespace-nowrap transition-colors shrink-0"
            >
              <span>{language === 'ar' ? 'فتح الموقع في خرائط Google' : 'View on Google Maps'}</span>
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
};
