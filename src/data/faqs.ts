export type FaqItem = {
  question: string;
  /** Plain text used in FAQPage JSON-LD. */
  answer: string;
  /** HTML when the visible answer includes a link. */
  html?: string;
};

export type FaqSection = {
  title: string;
  items: FaqItem[];
};

const excursionsEs =
  'No. Casa del Jaguar está en una zona urbana de la ciudad de Iquitos, a pocos minutos del aeropuerto, y las ceremonias se realizan en nuestra maloca dentro del centro. No es un lodge remoto en la selva. Lo hacemos así por tu seguridad: clínicas y hospitales cerca, electricidad y agua estables, y menos exposición a mosquitos y condiciones extremas. La selva la vives con nosotros en excursiones guiadas durante tus días de integración.';

const activitiesEs =
  'Sí, incluimos yoga matutino, meditación grupal, talleres de integración, sesiones de terapia y círculos de compartir experiencias con otros participantes. Además, el retiro incluye 2 excursiones amazónicas guiadas (río Amazonas y delfines, mercado de Belén, comunidades nativas, plantas medicinales) programadas siempre en días sin ceremonia. Excursiones adicionales disponibles con costo extra.';

const excursionsEn =
  'No. Casa del Jaguar is in an urban area of the city of Iquitos, minutes from the airport, and ceremonies take place in our maloca within the center. It is not a remote jungle lodge. We do it this way for your safety: clinics and hospitals nearby, stable electricity and water, and less exposure to mosquitoes and extreme conditions. You experience the jungle with us on guided excursions during your integration days.';

const activitiesEn =
  'Yes, we include morning yoga, group meditation, integration workshops, art therapy sessions and sharing circles with other participants. The retreat also includes 2 guided Amazon excursions (Amazon River and dolphins, Belén market, native communities, medicinal plants), always scheduled on non-ceremony days. Additional excursions available at an extra cost.';

export const faqs: Record<'es' | 'en', FaqSection[]> = {
  es: [
    {
      title: 'Preguntas Generales',
      items: [
        {
          question: '¿Qué es la ayahuasca y para qué se utiliza?',
          answer:
            'La ayahuasca es una medicina sagrada ancestral utilizada por los pueblos indígenas del Amazonas durante miles de años. Es una bebida preparada con plantas medicinales que facilita procesos de sanación emocional, espiritual y física. Se utiliza para conectar con la sabiduría interior, sanar traumas, superar adicciones y encontrar propósito en la vida.',
        },
        {
          question: '¿Es seguro participar en ceremonias de ayahuasca?',
          answer:
            'Sí, en Casa del Jaguar priorizamos la seguridad absoluta. Nuestras ceremonias son dirigidas por el chamán Denis Montes con más de 14 años de experiencia. Contamos con personal médico presente, realizamos evaluaciones de salud previas, y mantenemos un ambiente controlado y sagrado. Todos los participantes pasan por un proceso de preparación y seguimiento personalizado.',
        },
        {
          question: '¿Quién puede participar en los retiros?',
          answer:
            'Los retiros están abiertos a adultos mayores de 18 años que estén en buena condición física y mental. Es necesario completar un cuestionario médico y psicológico previo. No pueden participar personas con ciertas condiciones médicas, embarazadas, o quienes tomen ciertos medicamentos. Cada caso se evalúa individualmente para garantizar la seguridad.',
        },
      ],
    },
    {
      title: 'Preparación',
      items: [
        {
          question: '¿Cómo debo prepararme antes del retiro?',
          answer:
            'La preparación incluye una dieta especial (sin sal, azúcar, carnes rojas, alcohol, drogas) 2 semanas antes del retiro. También recomendamos meditación diaria, ejercicio suave, y evitar relaciones sexuales 3 días antes. Te enviaremos una guía detallada de preparación tras confirmar tu reserva.',
        },
        {
          question: '¿Qué medicamentos debo suspender?',
          answer:
            'Debes suspender antidepresivos, ansiolíticos, y otros psicotrópicos con supervisión médica (generalmente 4-6 semanas antes). También suplementos como San Juan, 5-HTP, y tramadol. NUNCA suspendas medicamentos sin consultar a tu médico. Nuestro equipo te ayudará a crear un plan seguro de transición.',
        },
      ],
    },
    {
      title: 'Ceremonias',
      items: [
        {
          question: '¿Cuántas ceremonias incluye el retiro?',
          answer:
            'Nuestro retiro de 7 días incluye 4 ceremonias de ayahuasca distribuidas estratégicamente para permitir integración entre cada una. También incluimos ceremonia de rapé, baños florales, sesiones de integración, actividades de conexión con la naturaleza, y sesiones individuales con nuestros maestros.',
        },
        {
          question: '¿Qué puedo esperar durante una ceremonia?',
          answer:
            'Las ceremonias duran 6-8 horas en un ambiente sagrado y protegido. Experimentarás visiones, insights profundos, posible purga física (vómito/diarrea como limpieza), emociones intensas, y conexión espiritual. Los maestros cantan icaros (canciones sagradas) y brindan contención energética durante todo el proceso.',
        },
      ],
    },
    {
      title: 'Alojamiento y Servicios',
      items: [
        {
          question: '¿Dónde se realizan las ceremonias? ¿Es en la selva?',
          answer: excursionsEs,
          html: `No. Casa del Jaguar está en una zona urbana de la ciudad de Iquitos, a pocos minutos del aeropuerto, y las ceremonias se realizan en nuestra maloca dentro del centro. No es un lodge remoto en la selva. Lo hacemos así por tu seguridad: clínicas y hospitales cerca, electricidad y agua estables, y menos exposición a mosquitos y condiciones extremas. La selva la vives con nosotros en <a href="/excursions" class="text-[#B8854A] underline">excursiones guiadas</a> durante tus días de integración.`,
        },
        {
          question: '¿Qué incluye el alojamiento?',
          answer:
            'Habitaciones privadas con baño, aire acondicionado, y vista al jardín. Todas las comidas vegetarianas preparadas con amor, agua purificada, wifi Starlink, áreas de descanso, piscina, y espacios para meditación. También incluye transporte desde/hacia el aeropuerto de Iquitos.',
        },
        {
          question: '¿Hay actividades adicionales durante el retiro?',
          answer: activitiesEs,
          html: `Sí, incluimos yoga matutino, meditación grupal, talleres de integración, sesiones de terapia y círculos de compartir experiencias con otros participantes. Además, el retiro incluye <a href="/excursions" class="text-[#B8854A] underline">2 excursiones amazónicas guiadas</a> (río Amazonas y delfines, mercado de Belén, comunidades nativas, plantas medicinales) programadas siempre en días sin ceremonia. Excursiones adicionales disponibles con costo extra.`,
        },
      ],
    },
    {
      title: 'Reservas y Pagos',
      items: [
        {
          question: '¿Cuál es el costo del retiro y qué incluye?',
          answer:
            'El retiro de 7 días cuesta $2,800 USD e incluye alojamiento privado, todas las comidas, 4 ceremonias de ayahuasca, actividades complementarias, transporte aeropuerto-centro, y seguimiento post-retiro. Ofrecemos planes de pago flexibles y descuentos por reserva anticipada.',
        },
        {
          question: '¿Cuál es la política de cancelación?',
          answer:
            'Cancelaciones con más de 60 días: reembolso del 90%. Entre 30-60 días: reembolso del 50%. Menos de 30 días: sin reembolso, pero puedes transferir tu reserva a otra fecha sin costo adicional. En caso de emergencias médicas documentadas, evaluamos cada caso individualmente.',
        },
      ],
    },
  ],
  en: [
    {
      title: 'General Questions',
      items: [
        {
          question: 'What is ayahuasca and what is it used for?',
          answer:
            'Ayahuasca is an ancestral sacred medicine used by indigenous peoples of the Amazon for thousands of years. It is a drink prepared with medicinal plants that facilitates emotional, spiritual and physical healing processes. It is used to connect with inner wisdom, heal trauma, overcome addictions and find purpose in life.',
        },
        {
          question: 'Is it safe to participate in ayahuasca ceremonies?',
          answer:
            'Yes, at Casa del Jaguar we prioritize absolute safety. Our ceremonies are led by master Denis Montes with 14 years of experience. We have medical staff present, conduct prior health evaluations, and maintain a controlled and sacred environment. All participants go through a personalized preparation and follow-up process.',
        },
        {
          question: 'Who can participate in the retreats?',
          answer:
            'Retreats are open to adults over 18 years old who are in good physical and mental condition. It is necessary to complete a prior medical and psychological questionnaire. People with certain medical conditions, pregnant women, or those taking certain medications cannot participate. Each case is evaluated individually to ensure safety.',
        },
      ],
    },
    {
      title: 'Preparation',
      items: [
        {
          question: 'How should I prepare before the retreat?',
          answer:
            'Preparation includes a special diet (no salt, sugar, red meat, alcohol, drugs) 2 weeks before the retreat. We also recommend daily meditation, gentle exercise, and avoiding sexual relations 3 days before. We will send you a detailed preparation guide after confirming your booking.',
        },
        {
          question: 'What medications should I discontinue?',
          answer:
            'You must discontinue antidepressants, anxiolytics, and other psychotropics under medical supervision (generally 4-6 weeks before). Also supplements like St. Johns Wort, 5-HTP, and tramadol. NEVER stop medications without consulting your doctor. Our team will help you create a safe transition plan.',
        },
      ],
    },
    {
      title: 'Ceremonies',
      items: [
        {
          question: 'How many ceremonies does the retreat include?',
          answer:
            'Our 7-day retreat includes 4 ayahuasca ceremonies strategically distributed to allow integration between each one. We also include rapé ceremony, floral baths, integration sessions, nature connection activities, and individual sessions with our masters.',
        },
        {
          question: 'What can I expect during a ceremony?',
          answer:
            'Ceremonies last 6-8 hours in a sacred and protected environment. You will experience visions, deep insights, possible physical purging (vomiting/diarrhea as cleansing), intense emotions, and spiritual connection. The masters sing icaros (sacred songs) and provide energetic containment throughout the entire process.',
        },
      ],
    },
    {
      title: 'Accommodation and Services',
      items: [
        {
          question: 'Where do the ceremonies take place? Is it in the jungle?',
          answer: excursionsEn,
          html: `No. Casa del Jaguar is in an urban area of the city of Iquitos, minutes from the airport, and ceremonies take place in our maloca within the center. It is not a remote jungle lodge. We do it this way for your safety: clinics and hospitals nearby, stable electricity and water, and less exposure to mosquitoes and extreme conditions. You experience the jungle with us on <a href="/en/excursions" class="text-[#B8854A] underline">guided excursions</a> during your integration days.`,
        },
        {
          question: 'What does the accommodation include?',
          answer:
            'Private rooms with bathroom, air conditioning, and garden view. All vegetarian meals prepared with love, purified water, Starlink wifi, rest areas, swimming pool, and meditation spaces. Also includes transportation to/from Iquitos airport.',
        },
        {
          question: 'Are there additional activities during the retreat?',
          answer: activitiesEn,
          html: `Yes, we include morning yoga, group meditation, integration workshops, art therapy sessions and sharing circles with other participants. The retreat also includes <a href="/en/excursions" class="text-[#B8854A] underline">2 guided Amazon excursions</a> (Amazon River and dolphins, Belén market, native communities, medicinal plants), always scheduled on non-ceremony days. Additional excursions available at an extra cost.`,
        },
      ],
    },
    {
      title: 'Bookings and Payments',
      items: [
        {
          question: 'What is the cost of the retreat and what does it include?',
          answer:
            'The 7-day retreat costs $2,800 USD and includes private accommodation, all meals, 4 ayahuasca ceremonies, complementary activities, airport-center transportation, and post-retreat follow-up.',
        },
        {
          question: 'What is the cancellation policy?',
          answer:
            'Cancellations with more than 60 days: 90% refund. Between 30-60 days: 50% refund. Less than 30 days: no refund, but you can transfer your booking to another date at no additional cost. In case of documented medical emergencies, we evaluate each case individually.',
        },
      ],
    },
  ],
};

export function faqJsonLd(lang: 'es' | 'en'): string {
  const mainEntity = faqs[lang].flatMap((section) =>
    section.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  );
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity,
  }).replace(/</g, '\\u003c');
}
