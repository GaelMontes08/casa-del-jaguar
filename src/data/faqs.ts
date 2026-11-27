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
  'No. Casa del Jaguar está en una zona urbana de la ciudad de Iquitos, a pocos minutos del aeropuerto, y las ceremonias se realizan en nuestra maloca dentro del centro. No es un lodge remoto en la selva. Lo hacemos así porque clínicas y hospitales quedan cerca, hay electricidad y agua estables, y hay menos exposición a mosquitos y a condiciones extremas. La selva la vives con nosotros en excursiones guiadas durante tus días de integración.';

const activitiesEs =
  'Sí. Hay yoga matutino, meditación grupal, talleres de integración y círculos para compartir. El retiro incluye 2 excursiones amazónicas guiadas (río Amazonas y delfines, mercado de Belén, comunidades nativas, plantas medicinales), siempre en días sin ceremonia. Hay excursiones extra, con costo aparte.';

const excursionsEn =
  'No. Casa del Jaguar is in an urban area of the city of Iquitos, minutes from the airport, and ceremonies take place in our maloca at the center. It is not a remote jungle lodge. We work this way because clinics and hospitals are close, electricity and water are stable, and there is less exposure to mosquitoes and extreme conditions. You see the jungle with us on guided excursions during integration days.';

const activitiesEn =
  'Yes. There is morning yoga, group meditation, integration workshops, and sharing circles. The retreat includes 2 guided Amazon excursions (Amazon River and dolphins, Belén market, native communities, medicinal plants), always on days without a ceremony. Extra excursions are available at a separate cost.';

const safetyEs =
  'No es segura para todo el mundo. Las ceremonias las guían chamanes indígenas junto con el Maestro Denis Montes, que dirige el programa. Denis guía las ceremonias desde 2014. Las ceremonias son en inglés y Denis traduce. Leemos una solicitud de salud antes de confirmar la plaza. No aceptamos embarazo, lactancia, antidepresivos o IMAO en uso, antipsicóticos, problemas cardíacos graves, presión alta no controlada, psicosis, esquizofrenia, bipolar, epilepsia ni enfermedad hepática grave. Clínicas y hospitales de Iquitos quedan a minutos del centro. No damos seguro médico.';

const safetyEn =
  'It is not safe for everyone. Indigenous shamans lead the ceremonies together with Maestro Denis Montes, who guides the programme. Denis has led the ceremonies since 2014. Ceremonies are in English, and Denis translates. We read a health application before we confirm a place. We do not accept pregnancy, breastfeeding, antidepressants or MAOIs in use, antipsychotics, serious heart disease, uncontrolled high blood pressure, psychosis, schizophrenia, bipolar disorder, epilepsy, or severe liver disease. Clinics and hospitals in Iquitos are minutes from the center. We do not provide medical insurance.';

export const faqs: Record<'es' | 'en', FaqSection[]> = {
  es: [
    {
      title: 'Preguntas Generales',
      items: [
        {
          question: '¿Qué es la ayahuasca y para qué se utiliza?',
          answer:
            'La ayahuasca es una bebida de plantas que los pueblos indígenas de la Amazonía han usado durante generaciones. En Casa del Jaguar se trabaja en ceremonia, con un propósito personal y espiritual. No es un tratamiento médico ni sustituye a un médico o a un psiquiatra.',
        },
        {
          question: '¿Es seguro participar en ceremonias de ayahuasca?',
          answer: safetyEs,
          html: `${safetyEs} El detalle está en la <a href="/safety/" class="text-[#B8854A] underline">página de seguridad</a>.`,
        },
        {
          question: '¿Quién puede participar en los retiros?',
          answer:
            'Adultos de 18 años o más. Hay que completar la solicitud de salud. El grupo es de máximo 8 personas. Si la ceremonia no es segura para ti, no confirmamos la plaza y devolvemos el depósito de $100 USD.',
        },
        {
          question: '¿En qué idioma son las ceremonias?',
          answer:
            'Las ceremonias son en inglés. El Maestro Denis Montes traduce. El programa completo lo guía Denis, y las ceremonias las conduce junto con chamanes indígenas.',
        },
      ],
    },
    {
      title: 'Preparación',
      items: [
        {
          question: '¿Cómo debo prepararme antes del retiro?',
          answer:
            'Durante al menos dos semanas antes de llegar puedes comer pescado fresco, pollo, arroz integral, quinoa, avena, fruta, verduras, agua e infusiones suaves. Evita carne roja, lácteos, alcohol, drogas, sal en exceso, azúcar refinada, comida procesada, condimentos fuertes, café, té negro, chocolate y fermentados. Pedimos abstinencia sexual 3 días antes y 3 días después de la ceremonia.',
          html: `Durante al menos dos semanas antes de llegar puedes comer pescado fresco, pollo, arroz integral, quinoa, avena, fruta, verduras, agua e infusiones suaves. Evita carne roja, lácteos, alcohol, drogas, sal en exceso, azúcar refinada, comida procesada, condimentos fuertes, café, té negro, chocolate y fermentados. Pedimos abstinencia sexual 3 días antes y 3 días después de la ceremonia. La lista está en la <a href="/diet/" class="text-[#B8854A] underline">página de dieta</a>.`,
        },
        {
          question: '¿Qué medicamentos debo suspender?',
          answer:
            'No suspendas antidepresivos, ansiolíticos ni otros psicotrópicos sin tu médico. Si tu médico autoriza una pausa, el plazo habitual es de 4 a 6 semanas. Declara también hierba de San Juan, 5-HTP y tramadol.',
        },
      ],
    },
    {
      title: 'Ceremonias',
      items: [
        {
          question: '¿Cuántas ceremonias incluye el retiro?',
          answer:
            'El retiro de 7 días y 6 noches incluye 4 ceremonias de ayahuasca. También hay ceremonia de rapé, baño de florecimiento, sesiones de integración y una conversación individual. Las ceremonias son en inglés y Denis traduce. El grupo es de máximo 8 personas.',
        },
        {
          question: '¿Qué puedo esperar durante una ceremonia?',
          answer:
            'Las ceremonias duran de 6 a 8 horas. Puede haber visiones, emociones fuertes y purga física, como vómito o diarrea. Los chamanes cantan ícaros. Denis está en el programa y traduce lo que se dice en inglés.',
        },
      ],
    },
    {
      title: 'Alojamiento y Servicios',
      items: [
        {
          question: '¿Dónde se realizan las ceremonias? ¿Es en la selva?',
          answer: excursionsEs,
          html: `No. Casa del Jaguar está en una zona urbana de la ciudad de Iquitos, a pocos minutos del aeropuerto, y las ceremonias se realizan en nuestra maloca dentro del centro. No es un lodge remoto en la selva. Lo hacemos así porque clínicas y hospitales quedan cerca, hay electricidad y agua estables, y hay menos exposición a mosquitos y a condiciones extremas. La selva la vives con nosotros en <a href="/excursions/" class="text-[#B8854A] underline">excursiones guiadas</a> durante tus días de integración.`,
        },
        {
          question: '¿Qué incluye el alojamiento?',
          answer:
            'Todas las habitaciones tienen el mismo precio. Cada una tiene aire acondicionado, televisor, wifi, baño privado, ventilador de techo y dos camas. No se fuma en las habitaciones. El grupo es de máximo 8 personas. El traslado desde el aeropuerto de Iquitos y de regreso está incluido.',
        },
        {
          question: '¿Hay actividades adicionales durante el retiro?',
          answer: activitiesEs,
          html: `Sí. Hay yoga matutino, meditación grupal, talleres de integración y círculos para compartir. El retiro incluye <a href="/excursions/" class="text-[#B8854A] underline">2 excursiones amazónicas guiadas</a> (río Amazonas y delfines, mercado de Belén, comunidades nativas, plantas medicinales), siempre en días sin ceremonia. Hay excursiones extra, con costo aparte.`,
        },
      ],
    },
    {
      title: 'Reservas y Pagos',
      items: [
        {
          question: '¿Cuál es el costo del retiro y qué incluye?',
          answer:
            'El retiro de 7 días y 6 noches cuesta $2,800 USD, el mismo precio para todas las habitaciones. Incluye la habitación, las comidas, 4 ceremonias de ayahuasca, el traslado de aeropuerto y las dos excursiones del programa. La solicitud pide un depósito de $100 USD. Si rechazamos la solicitud por seguridad, devolvemos los $100. Vuelos, visa y seguro de viaje no están incluidos.',
        },
        {
          question: '¿Cuál es la política de cancelación?',
          answer:
            'Si rechazamos la solicitud por seguridad, o si la retiras antes de que confirmemos la plaza, devolvemos el depósito de $100 USD. Después de confirmar: más de 60 días, reembolso del 90%; entre 30 y 60 días, reembolso del 50%; menos de 30 días, sin reembolso, y puedes pasar la reserva a otra fecha sin costo. Una emergencia médica documentada se revisa caso por caso.',
          html: `Si rechazamos la solicitud por seguridad, o si la retiras antes de que confirmemos la plaza, devolvemos el depósito de $100 USD. Después de confirmar: más de 60 días, reembolso del 90%; entre 30 y 60 días, reembolso del 50%; menos de 30 días, sin reembolso, y puedes pasar la reserva a otra fecha sin costo. Una emergencia médica documentada se revisa caso por caso. Está escrito en la <a href="/cancellation/" class="text-[#B8854A] underline">página de cancelación</a>.`,
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
            'Ayahuasca is a plant brew that indigenous peoples of the Amazon have used for generations. At Casa del Jaguar the work happens in ceremony, for a personal and spiritual purpose. It is not medical treatment and it does not replace a doctor or a psychiatrist.',
        },
        {
          question: 'Is it safe to participate in ayahuasca ceremonies?',
          answer: safetyEn,
          html: `${safetyEn} The detail is on the <a href="/en/safety/" class="text-[#B8854A] underline">safety page</a>.`,
        },
        {
          question: 'Who can participate in the retreats?',
          answer:
            'Adults aged 18 or older. You need to complete the health application. Groups are a maximum of 8 people. If the ceremony is not safe for you, we do not confirm the place and we refund the $100 USD deposit.',
        },
        {
          question: 'What language are the ceremonies in?',
          answer:
            'Ceremonies are in English. Maestro Denis Montes translates. Denis guides the whole programme, and he leads the ceremonies together with indigenous shamans.',
        },
      ],
    },
    {
      title: 'Preparation',
      items: [
        {
          question: 'How should I prepare before the retreat?',
          answer:
            'For at least two weeks before arrival you can eat fresh fish, chicken, brown rice, quinoa, oats, fruit, vegetables, water, and mild herbal teas. Avoid red meat, dairy, alcohol, drugs, too much salt, refined sugar, processed food, strong spices, coffee, black tea, chocolate, and fermented foods. We ask for sexual abstinence for 3 days before and 3 days after the ceremony.',
          html: `For at least two weeks before arrival you can eat fresh fish, chicken, brown rice, quinoa, oats, fruit, vegetables, water, and mild herbal teas. Avoid red meat, dairy, alcohol, drugs, too much salt, refined sugar, processed food, strong spices, coffee, black tea, chocolate, and fermented foods. We ask for sexual abstinence for 3 days before and 3 days after the ceremony. The list is on the <a href="/en/diet/" class="text-[#B8854A] underline">diet page</a>.`,
        },
        {
          question: 'What medications should I discontinue?',
          answer:
            'Do not stop antidepressants, anxiolytics, or other psychiatric medicines without your doctor. If your doctor approves a pause, the usual window is 4 to 6 weeks. Also tell us about St. John’s wort, 5-HTP, and tramadol.',
        },
      ],
    },
    {
      title: 'Ceremonies',
      items: [
        {
          question: 'How many ceremonies does the retreat include?',
          answer:
            'The 7-day, 6-night retreat includes 4 ayahuasca ceremonies. There is also a rapé ceremony, a flower bath, integration sessions, and an individual conversation. Ceremonies are in English, and Denis translates. Groups are a maximum of 8 people.',
        },
        {
          question: 'What can I expect during a ceremony?',
          answer:
            'Ceremonies last 6 to 8 hours. There may be visions, strong emotions, and physical purging, such as vomiting or diarrhea. The shamans sing icaros. Denis is with the programme and translates what is said in English.',
        },
      ],
    },
    {
      title: 'Accommodation and Services',
      items: [
        {
          question: 'Where do the ceremonies take place? Is it in the jungle?',
          answer: excursionsEn,
          html: `No. Casa del Jaguar is in an urban area of the city of Iquitos, minutes from the airport, and ceremonies take place in our maloca at the center. It is not a remote jungle lodge. We work this way because clinics and hospitals are close, electricity and water are stable, and there is less exposure to mosquitoes and extreme conditions. You see the jungle with us on <a href="/en/excursions/" class="text-[#B8854A] underline">guided excursions</a> during integration days.`,
        },
        {
          question: 'What does the accommodation include?',
          answer:
            'Every room is the same price. Each one has air conditioning, a TV, WiFi, a private bathroom, a ceiling fan, and two beds. No smoking in the rooms. Groups are a maximum of 8 people. The transfer from Iquitos airport and back is included.',
        },
        {
          question: 'Are there additional activities during the retreat?',
          answer: activitiesEn,
          html: `Yes. There is morning yoga, group meditation, integration workshops, and sharing circles. The retreat includes <a href="/en/excursions/" class="text-[#B8854A] underline">2 guided Amazon excursions</a> (Amazon River and dolphins, Belén market, native communities, medicinal plants), always on days without a ceremony. Extra excursions are available at a separate cost.`,
        },
      ],
    },
    {
      title: 'Bookings and Payments',
      items: [
        {
          question: 'What is the cost of the retreat and what does it include?',
          answer:
            'The 7-day, 6-night retreat costs $2,800 USD, the same price for every room. It includes the room, meals, 4 ayahuasca ceremonies, the airport transfer, and the two excursions in the programme. The application asks for a $100 USD deposit. If we decline the application for safety, we refund the $100. Flights, visas, and travel insurance are not included.',
        },
        {
          question: 'What is the cancellation policy?',
          answer:
            'If we decline the application for safety, or if you withdraw it before we confirm the place, we refund the $100 USD deposit. After confirmation: more than 60 days, 90% refund; between 30 and 60 days, 50% refund; less than 30 days, no refund, and you can move the booking to another date at no cost. A documented medical emergency is reviewed case by case.',
          html: `If we decline the application for safety, or if you withdraw it before we confirm the place, we refund the $100 USD deposit. After confirmation: more than 60 days, 90% refund; between 30 and 60 days, 50% refund; less than 30 days, no refund, and you can move the booking to another date at no cost. A documented medical emergency is reviewed case by case. It is written on the <a href="/en/cancellation/" class="text-[#B8854A] underline">cancellation page</a>.`,
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
