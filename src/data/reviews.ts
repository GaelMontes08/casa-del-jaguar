export type GuestReview = {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  date: { es: string; en: string };
  location: { es: string; en: string };
  /** Language the guest actually wrote in. */
  originalLang: 'es' | 'en' | 'it' | 'fr';
  original: string;
  es: string;
  en: string;
};

const langName = {
  es: { es: 'español', en: 'Spanish' },
  en: { es: 'inglés', en: 'English' },
  it: { es: 'italiano', en: 'Italian' },
  fr: { es: 'francés', en: 'French' },
} as const;

/** Hand-copied Google reviews. Original wording is kept; the other language is a translation. */
export const guestReviews: GuestReview[] = [
  {
    id: '1',
    name: 'Candy Beatriz Rios Cahuaza',
    avatar: '/img/avatars/candy-beatriz-rios-cahuaza.webp',
    rating: 5,
    date: { es: 'Hace 6 meses', en: '6 months ago' },
    location: { es: 'Perú', en: 'Peru' },
    originalLang: 'es',
    original:
      'La experiencia en la Casa del Jaguar es absolutamente imperdible. Desde el inicio, la atención es de primera, con un ambiente acogedor y armonioso. La ceremonia de Ayahuasca es guiada con profundo conocimiento y sabiduría, brindando una experiencia transformadora. Cada detalle, desde La preparación hasta la explicación, contribuye a hacer de esta sesión un momento único e inolvidable. Sin duda, una experiencia que recomiendo a quienes buscan una conexión auténtica y significativa.',
    es: 'La experiencia en la Casa del Jaguar es absolutamente imperdible. Desde el inicio, la atención es de primera, con un ambiente acogedor y armonioso. La ceremonia de Ayahuasca es guiada con profundo conocimiento y sabiduría, brindando una experiencia transformadora. Cada detalle, desde La preparación hasta la explicación, contribuye a hacer de esta sesión un momento único e inolvidable. Sin duda, una experiencia que recomiendo a quienes buscan una conexión auténtica y significativa.',
    en: 'The experience at Casa del Jaguar is absolutely unmissable. From the start, the care is first-rate, with a welcoming and calm atmosphere. The ayahuasca ceremony is guided with real knowledge and care, and it was a transformative experience. Every detail, from the preparation to the explanation, made the session unique. I recommend it to anyone looking for an honest and meaningful connection.',
  },
  {
    id: '2',
    name: 'Diego Reuch Borbor',
    avatar: '/img/avatars/diego-reuch-borbor.webp',
    rating: 5,
    date: { es: 'Hace 10 meses', en: '10 months ago' },
    location: { es: 'Perú', en: 'Peru' },
    originalLang: 'es',
    original:
      'Una experiencia única en el lugar. Buena atención, preparación y el guiado en ceremonia es sencillamente personalizado, que se adapta a la situación de uno. Como producto de la potente conexión que tuve gracias a la madre ayahuasca y al maestro chaman pude expandir mis límites mentales y espirituales para forjar la transcendente consciencia que hoy me ayuda a tener una mejor calidad de vida. Definitivamente recomendaría visitar la Casa del Jaguar a toda persona que desee entender mejor su realidad y expandir su nivel de conciencia.',
    es: 'Una experiencia única en el lugar. Buena atención, preparación y el guiado en ceremonia es sencillamente personalizado, que se adapta a la situación de uno. Como producto de la potente conexión que tuve gracias a la madre ayahuasca y al maestro chaman pude expandir mis límites mentales y espirituales para forjar la transcendente consciencia que hoy me ayuda a tener una mejor calidad de vida. Definitivamente recomendaría visitar la Casa del Jaguar a toda persona que desee entender mejor su realidad y expandir su nivel de conciencia.',
    en: 'A one-of-a-kind experience in this place. Good care and preparation, and the ceremony guidance is simply personal: it adapts to your situation. Through the strong connection I had, thanks to Mother Ayahuasca and the shaman, I was able to stretch my mental and spiritual limits and build the awareness that now helps me live better. I would recommend Casa del Jaguar to anyone who wants to understand their reality more clearly.',
  },
  {
    id: '3',
    name: 'Samuel Ballantine',
    rating: 5,
    date: { es: 'Hace 4 meses', en: '4 months ago' },
    location: { es: 'Italia', en: 'Italy' },
    originalLang: 'en',
    original:
      'This is a place for people who truly want to heal. The shaman is truly dedicated he is. The kind of man who will sit and talk to you all day if you so desire it. He holds great insight and will be able to guide you through your ceremonies and help you understand what you are seeing and processing. Couldn’t recommend this place any more.',
    es: 'Este es un lugar para personas que de verdad quieren sanar. El chamán está verdaderamente dedicado. Es el tipo de persona que se sienta a hablar contigo todo el día si lo necesitas. Tiene una gran claridad y puede guiarte en las ceremonias y ayudarte a entender lo que estás viendo y procesando. No podría recomendar más este lugar.',
    en: 'This is a place for people who truly want to heal. The shaman is truly dedicated he is. The kind of man who will sit and talk to you all day if you so desire it. He holds great insight and will be able to guide you through your ceremonies and help you understand what you are seeing and processing. Couldn’t recommend this place any more.',
  },
  {
    id: '4',
    name: 'Jacopo Foglia',
    rating: 5,
    date: { es: 'Hace 3 meses', en: '3 months ago' },
    location: { es: 'Italia', en: 'Italy' },
    originalLang: 'it',
    original:
      'L’esperienza con lo sciamano Denis è stata davvero sorprendente! Avevo già partecipato ad una cerimonia di ayahuasca prima di quel momento, ma questa è stata davvero interessante ed intima. Ha guidato me ed il mio amico in un viaggio interiore indescrivibile, aiutandoci grazie a diverse ore di chiacchierata prima della cerimonia, spiegandoci il suo approccio con la medicina e spiegandoci come gestire la cerimonia nelle sue diverse fasi. Sicuramente parteciperò ad una nuova quando tornerò ad Iquitos.',
    es: 'La experiencia con el chamán Denis fue realmente sorprendente. Ya había participado en una ceremonia de ayahuasca, pero esta fue interesante e íntima. Nos guió a mi amigo y a mí en un viaje interior difícil de describir. Antes de la ceremonia hablamos varias horas: nos explicó su manera de trabajar con la medicina y cómo atravesar las distintas etapas. Volveré a participar cuando regrese a Iquitos.',
    en: 'The experience with the shaman Denis was truly surprising. I had already been in an ayahuasca ceremony, but this one was interesting and intimate. He guided my friend and me through an inner journey that is hard to describe. Before the ceremony we talked for several hours: he explained his approach to the medicine and how to move through its stages. I will take part again when I return to Iquitos.',
  },
  {
    id: '5',
    name: 'Felix Rios Teran',
    avatar: '/img/avatars/felix-rios-teran.webp',
    rating: 5,
    date: { es: 'Hace 1 año', en: '1 year ago' },
    location: { es: 'Perú', en: 'Peru' },
    originalLang: 'es',
    original:
      'Maestro Denis muchas gracias por guiarme y curarme con tu sabiduría durante mi experiencia con la Madre Ayahuasca una experiencia transformadora que abre puertas a la introspección y la sanación. Estoy profundamente agradecido por tu cuidado, profesionalismo y dedicación. Le recomiendo a cualquier hermano que busque sanación y crecimiento espiritual en la CASA DEL JAGUAR',
    es: 'Maestro Denis muchas gracias por guiarme y curarme con tu sabiduría durante mi experiencia con la Madre Ayahuasca una experiencia transformadora que abre puertas a la introspección y la sanación. Estoy profundamente agradecido por tu cuidado, profesionalismo y dedicación. Le recomiendo a cualquier hermano que busque sanación y crecimiento espiritual en la CASA DEL JAGUAR',
    en: 'Maestro Denis, thank you for guiding me with your care during my experience with Mother Ayahuasca, a transformative experience that opens a door to looking inward. I am deeply grateful for your attention, professionalism, and dedication. I recommend Casa del Jaguar to anyone seeking spiritual growth.',
  },
  {
    id: '6',
    name: 'Stella Palomares',
    avatar: '/img/avatars/stella-palomares.webp',
    rating: 5,
    date: { es: 'Hace 1 año', en: '1 year ago' },
    location: { es: 'México', en: 'Mexico' },
    originalLang: 'es',
    original:
      'Una experiencia gratificante y llena de sabiduría con la acogedora atención del Sr Jaguar y su linda familia; sentimos mucha comodidad y linda energía. Fuimos bien guiados bajo el poder de la madre Ayahuasca ',
    es: 'Una experiencia gratificante y llena de sabiduría con la acogedora atención del Sr Jaguar y su linda familia; sentimos mucha comodidad y linda energía. Fuimos bien guiados bajo el poder de la madre Ayahuasca ',
    en: 'A rewarding experience, full of care, with the warm attention of Mr Jaguar and his family. We felt comfortable and held. We were well guided with Mother Ayahuasca.',
  },
  {
    id: '7',
    name: 'Victor Alfonso Vazquez Zapata',
    avatar: '/img/avatars/victor-alfonso-vazquez-zapata.webp',
    rating: 5,
    date: { es: 'Hace 1 año', en: '1 year ago' },
    location: { es: 'México', en: 'Mexico' },
    originalLang: 'es',
    original:
      'La mejor experiencia de mi vida. Todo está espectacularmente calculado. Gracias Denis, nos vemos pronto. Saludos desde Aguascalientes, México.',
    es: 'La mejor experiencia de mi vida. Todo está espectacularmente calculado. Gracias Denis, nos vemos pronto. Saludos desde Aguascalientes, México.',
    en: 'The best experience of my life. Everything is carefully arranged. Thank you, Denis. See you soon. Greetings from Aguascalientes, Mexico.',
  },
  {
    id: '8',
    name: 'Clever Enrique',
    rating: 5,
    date: { es: 'Hace 4 meses', en: '4 months ago' },
    location: { es: 'Italia', en: 'Italy' },
    originalLang: 'fr',
    original: 'Une belle place et en plein securité pour vivre cette belle expérience. 100% recommander!',
    es: 'Un lugar hermoso y seguro para vivir esta experiencia. 100% recomendado.',
    en: 'A beautiful place, and a safe one, for this experience. 100% recommended.',
  },
];

export type ReviewCard = {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  date: string;
  text: string;
  location?: string;
  originalLanguage: string;
  translation?: string;
  translationLabel?: string;
};

export function reviewsFor(lang: 'es' | 'en'): ReviewCard[] {
  const translationLabel = lang === 'en' ? 'Translation' : 'Traducción';
  return guestReviews.map((review) => {
    const showTranslation = review.originalLang !== lang;
    return {
      id: review.id,
      name: review.name,
      avatar: review.avatar,
      rating: review.rating,
      date: review.date[lang],
      text: review.original,
      location: review.location[lang],
      originalLanguage: langName[review.originalLang][lang],
      translation: showTranslation ? review[lang] : undefined,
      translationLabel: showTranslation ? translationLabel : undefined,
    };
  });
}
