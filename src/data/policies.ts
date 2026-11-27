export type PolicySection = {
  heading: string;
  paragraphs?: string[];
  items?: string[];
};

export type PolicyPage = {
  title: string;
  description: string;
  lede: string;
  sections: PolicySection[];
};

const dietEs: PolicyPage = {
  title: 'Dieta antes del retiro',
  description:
    'Dieta de dos semanas antes del retiro de ayahuasca en Casa del Jaguar, Iquitos: alimentos permitidos, alimentos que se evitan y abstinencia.',
  lede:
    'Durante al menos dos semanas antes de llegar, come simple. Esta es la dieta que pedimos. No suspendas medicamentos por tu cuenta: eso está en la página de seguridad, y la decisión es entre tú y tu médico.',
  sections: [
    {
      heading: 'Cuánto tiempo',
      paragraphs: [
        'Empieza al menos 14 días antes de tu llegada.',
      ],
    },
    {
      heading: 'Puedes comer',
      items: [
        'Pescado fresco, no enlatado',
        'Pollo',
        'Arroz integral, quinoa y avena',
        'Fruta fresca',
        'Verduras frescas',
        'Agua',
        'Infusiones de hierbas suaves',
      ],
    },
    {
      heading: 'Evita',
      items: [
        'Carne roja: cerdo, res, cordero',
        'Lácteos',
        'Alcohol y drogas',
        'Sal en exceso',
        'Azúcar refinada',
        'Comida procesada',
        'Condimentos fuertes y picante',
        'Café y té negro',
        'Chocolate',
        'Alimentos fermentados',
      ],
    },
    {
      heading: 'Relaciones sexuales',
      paragraphs: [
        'Pide abstinencia sexual al menos 3 días antes de la ceremonia y 3 días después. Es parte de la preparación que ya estaba en los términos.',
      ],
    },
  ],
};

const dietEn: PolicyPage = {
  title: 'Diet before the retreat',
  description:
    'Two-week diet before the ayahuasca retreat at Casa del Jaguar in Iquitos: foods to eat, foods to avoid, and abstinence.',
  lede:
    'For at least two weeks before you arrive, eat simply. This is the diet we ask for. Do not stop medication on your own. That decision belongs on the safety page, between you and your doctor.',
  sections: [
    {
      heading: 'How long',
      paragraphs: [
        'Start at least 14 days before arrival.',
      ],
    },
    {
      heading: 'You can eat',
      items: [
        'Fresh fish, not canned',
        'Chicken',
        'Brown rice, quinoa, and oats',
        'Fresh fruit',
        'Fresh vegetables',
        'Water',
        'Mild herbal teas',
      ],
    },
    {
      heading: 'Avoid',
      items: [
        'Red meat: pork, beef, lamb',
        'Dairy',
        'Alcohol and drugs',
        'Too much salt',
        'Refined sugar',
        'Processed food',
        'Strong spices and chili',
        'Coffee and black tea',
        'Chocolate',
        'Fermented foods',
      ],
    },
    {
      heading: 'Sex',
      paragraphs: [
        'We ask for sexual abstinence for at least 3 days before the ceremony and 3 days after. That rule was already in the terms.',
      ],
    },
  ],
};

const safetyEs: PolicyPage = {
  title: 'Seguridad y quién no puede venir',
  description:
    'Quién puede participar en el retiro de ayahuasca de Casa del Jaguar, contraindicaciones, medicamentos, hospitales en Iquitos y seguro de viaje.',
  lede:
    'La ayahuasca no es para todo el mundo. Leemos tu solicitud de salud antes de confirmar la plaza. Si no es segura para ti, te lo decimos y devolvemos el depósito de $100 USD.',
  sections: [
    {
      heading: 'Quién puede solicitar',
      paragraphs: [
        'Adultos de 18 años o más. Cada solicitud se lee por separado. Completar el formulario no reserva la plaza.',
      ],
    },
    {
      heading: 'No podemos aceptarte si ahora mismo tienes',
      items: [
        'Antidepresivos en uso (ISRS, IMAO, tricíclicos)',
        'Antipsicóticos o estabilizadores del ánimo',
        'Un problema cardíaco grave, como insuficiencia cardíaca o arritmias',
        'Presión arterial alta no controlada',
        'Embarazo o lactancia',
        'Historial de psicosis, esquizofrenia o trastorno bipolar',
        'Epilepsia u otro trastorno convulsivo',
        'Enfermedad hepática grave',
      ],
    },
    {
      heading: 'Medicamentos',
      paragraphs: [
        'Si tomas antidepresivos, ansiolíticos u otros psicotrópicos, no los suspendas solo. Habla con el médico que te los recetó. Cuando un médico autoriza una pausa, el plazo habitual que ya publicábamos es de 4 a 6 semanas antes del retiro.',
        'También declara hierba de San Juan, 5-HTP y tramadol. Nombra todo lo que tomas, incluidas dosis y la fecha en que empezaste.',
      ],
    },
    {
      heading: 'Durante la semana',
      paragraphs: [
        'Las ceremonias las guían chamanes indígenas junto con el Maestro Denis Montes. Denis guía el programa completo. Las ceremonias son en inglés y Denis traduce.',
        'Casa del Jaguar está en la ciudad de Iquitos. Clínicas y hospitales quedan a minutos del centro. No somos un hospital y no damos seguro médico.',
        'Trae un seguro de viaje que cubra una emergencia médica en Perú. El centro no lo incluye.',
      ],
    },
  ],
};

const safetyEn: PolicyPage = {
  title: 'Safety and who cannot attend',
  description:
    'Who can join the Casa del Jaguar ayahuasca retreat, contraindications, medicines, hospitals in Iquitos, and travel insurance.',
  lede:
    'Ayahuasca is not for everyone. We read your health application before we confirm a place. If it is not safe for you, we say so and refund the $100 USD deposit.',
  sections: [
    {
      heading: 'Who can apply',
      paragraphs: [
        'Adults aged 18 or older. Each application is read on its own. Sending the form does not reserve the place.',
      ],
    },
    {
      heading: 'We cannot accept you if you currently have',
      items: [
        'Antidepressants in use (SSRIs, MAOIs, tricyclics)',
        'Antipsychotics or mood stabilizers',
        'Serious heart disease, including heart failure or arrhythmias',
        'High blood pressure that is not controlled',
        'Pregnancy or breastfeeding',
        'A history of psychosis, schizophrenia, or bipolar disorder',
        'Epilepsy or another seizure disorder',
        'Severe liver disease',
      ],
    },
    {
      heading: 'Medication',
      paragraphs: [
        'If you take antidepressants, anxiolytics, or other psychiatric medicines, do not stop them on your own. Talk to the doctor who prescribed them. When a doctor approves a pause, the window we already published is generally 4 to 6 weeks before the retreat.',
        'Also tell us about St. John’s wort, 5-HTP, and tramadol. Name everything you take, including the dose and when you started.',
      ],
    },
    {
      heading: 'During the week',
      paragraphs: [
        'Ceremonies are led by indigenous shamans together with Maestro Denis Montes. Denis guides the whole programme. Ceremonies are in English, and Denis translates.',
        'Casa del Jaguar is in the city of Iquitos. Clinics and hospitals are minutes away. We are not a hospital, and we do not provide medical insurance.',
        'Bring travel insurance that covers a medical emergency in Peru. The retreat price does not include it.',
      ],
    },
  ],
};

const cancellationEs: PolicyPage = {
  title: 'Precio, depósito y cancelación',
  description:
    'El retiro de Casa del Jaguar cuesta $2,800 USD. Depósito de $100 USD, reembolso si la solicitud se rechaza por seguridad, y la política de cancelación.',
  lede:
    'El retiro de 7 días y 6 noches cuesta $2,800 USD. El precio es el mismo para todas las habitaciones. El grupo es de máximo 8 personas.',
  sections: [
    {
      heading: 'Depósito',
      paragraphs: [
        'La solicitud incluye un depósito de $100 USD por PayPal. Si rechazamos la solicitud porque la ceremonia no es segura para ti, devolvemos los $100 completos.',
        'Si retiras la solicitud antes de que confirmemos la plaza, también devolvemos los $100. El depósito no confirma la plaza. La plaza queda confirmada cuando te escribimos que sí y el pago del retiro está completo.',
      ],
    },
    {
      heading: 'Después de confirmar',
      items: [
        'Más de 60 días antes de la llegada: reembolso del 90%',
        'Entre 30 y 60 días: reembolso del 50%',
        'Menos de 30 días: no hay reembolso. Puedes pasar la reserva a otra fecha sin costo extra',
        'Una emergencia médica documentada se revisa caso por caso',
      ],
    },
    {
      heading: 'Qué cubre el precio',
      paragraphs: [
        'Los $2,800 incluyen la habitación privada, las comidas, 4 ceremonias de ayahuasca, el traslado desde el aeropuerto de Iquitos y de regreso, y las dos excursiones amazónicas del programa. El detalle está en la página de precios.',
        'No incluyen vuelos, visa ni seguro de viaje. El código de descuento del mes, si sigue publicado en la barra superior, se aplica al confirmar y el precio final queda por escrito.',
      ],
    },
  ],
};

const cancellationEn: PolicyPage = {
  title: 'Price, deposit, and cancellation',
  description:
    'The Casa del Jaguar retreat costs $2,800 USD. $100 USD deposit, refund if an application is declined for safety, and the cancellation policy.',
  lede:
    'The 7-day, 6-night retreat costs $2,800 USD. Every room is the same price. Groups are a maximum of 8 people.',
  sections: [
    {
      heading: 'Deposit',
      paragraphs: [
        'The application includes a $100 USD PayPal deposit. If we decline the application because the ceremony is not safe for you, we refund the $100 in full.',
        'If you withdraw the application before we confirm your place, we also refund the $100. The deposit does not confirm the place. The place is confirmed when we write to accept you and the retreat payment is complete.',
      ],
    },
    {
      heading: 'After we confirm',
      items: [
        'More than 60 days before arrival: 90% refund',
        'Between 30 and 60 days: 50% refund',
        'Less than 30 days: no refund. You can move the booking to another date at no extra cost',
        'A documented medical emergency is reviewed case by case',
      ],
    },
    {
      heading: 'What the price covers',
      paragraphs: [
        'The $2,800 includes the private room, meals, 4 ayahuasca ceremonies, the transfer from Iquitos airport and back, and the two Amazon excursions in the programme. The pricing page lists the rest.',
        'Flights, visas, and travel insurance are not included. If the monthly discount code is still on the banner, it is applied when we confirm, and the final price is put in writing.',
      ],
    },
  ],
};

export const policies = {
  es: { diet: dietEs, safety: safetyEs, cancellation: cancellationEs },
  en: { diet: dietEn, safety: safetyEn, cancellation: cancellationEn },
};
