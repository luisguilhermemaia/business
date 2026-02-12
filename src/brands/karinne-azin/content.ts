import { BrandContent } from '../../core/types/brand';

export const karinneContent: BrandContent = {
  doctor: {
    name: 'Dra. Karinne Azin',
    specialty: 'Ginecologia',
    registrationLabel: 'CRM 10236 - CE',
    bio: 'Ginecologista dedicada ao cuidado integral da mulher, combinando ciência, ética e acolhimento em cada consulta.',
    headshot:
      'https://s3-sa-east-1.amazonaws.com/doctoralia.com.br/doctor/04015c/04015c1b5a5b4bc60398b20d5590c191_large.jpg',
    highlights: ['Ciência e Ética', 'Acolhimento e Escuta', 'Cuidado Personalizado'],
  },
  hero: {
    headline: 'Vamos conversar sobre Ginecologia Baseada em Evidências?',
    subheadline:
      'O cuidado ginecológico pode ser o seu espaço seguro para entender o que está acontecendo e receber um plano claro de tratamento. Atendo presencialmente e online para todo o Brasil — com acolhimento, escuta ativa e condutas baseadas em evidências científicas.',
    ctaLabel: 'Agendar consulta',
    secondaryCtaLabel: 'Conhecer especialidades',
    backgroundImage: undefined,
    images: [
      'https://lh3.googleusercontent.com/p/AF1QipOPE9kpgW32teVgXxzxFvygPIP24-S72zgbHKLL=s1200',
      'https://lh3.googleusercontent.com/p/AF1QipPNP-E0ddT2qKMYwmR5ue5ucalwIuoxd5bcWFiD=s1200',
      'https://lh3.googleusercontent.com/p/AF1QipOR69F8XTmC6FQdII2WeG1AxF5a37VsUmdu-d5J=s1200',
    ],
  },
  services: [
    {
      title: 'Corrimento',
      shortDescription:
        'Avaliação e tratamento adequado de corrimentos vaginais, identificando causas e oferecendo soluções efetivas.',
      iconKey: 'stethoscope',
    },
    {
      title: 'Candidíase',
      shortDescription:
        'Diagnóstico preciso e tratamento individualizado para candidíase, com foco em prevenção de recorrências.',
      iconKey: 'shield',
    },
    {
      title: 'Endometriose',
      shortDescription:
        'Diagnóstico preciso e plano terapêutico para reduzir dor e preservar qualidade de vida. Abordagem baseada em evidências.',
      iconKey: 'heart',
    },
    {
      title: 'Menopausa',
      shortDescription:
        'Entenda como saber se está entrando nessa fase e o que ajuda no corpo. Ondas de calor, insônia, irritabilidade e alterações podem ser sinais.',
      iconKey: 'clock',
    },
    {
      title: 'Rejuvenescimento Íntimo',
      shortDescription:
        'Procedimentos com técnica precisa para rejuvenescimento íntimo, segurança e acompanhamento pós-operatório.',
      iconKey: 'shield',
    },
    {
      title: 'Cirurgia Ginecológica',
      shortDescription:
        'Cirurgias ginecológicas conduzidas com técnica refinada, segurança e cuidado especializado.',
      iconKey: 'check',
    },
  ],
  steps: {
    title: 'Quem é a Dra. Karinne Azin?',
    description:
      'Ginecologista dedicada ao cuidado integral da mulher, com atuação baseada em evidências científicas, ética e escuta qualificada.',
    items: [
      {
        title: 'Ciência e Ética',
        description:
          'Condutas baseadas em evidências, com transparência e respeito às necessidades individuais.',
      },
      {
        title: 'Acolhimento e Escuta',
        description: 'Tempo para ouvir, compreender sintomas e construir decisões em conjunto.',
      },
      {
        title: 'Cuidado Especializado',
        description:
          'Menopausa, endometriose, mioma e cirurgias ginecológicas conduzidas com técnica e cuidado.',
      },
    ],
  },
  testimonials: {
    enabled: true,
    items: [
      {
        quote:
          'Finalmente encontrei uma ginecologista que me escuta de verdade e explica tudo com clareza. Me sinto acolhida e confiante.',
        name: 'Mariana S.',
        title: 'Paciente há 3 anos',
      },
      {
        quote:
          'O tratamento da minha endometriose mudou completamente minha qualidade de vida. Dra. Karinne é excepcional.',
        name: 'Ana Paula R.',
        title: 'Paciente há 2 anos',
      },
      {
        quote:
          'Saí da consulta com um plano claro e me senti realmente cuidada. A abordagem ética e científica faz toda a diferença.',
        name: 'Patrícia L.',
        title: 'Paciente há 1 ano',
      },
    ],
  },
  location: {
    addressLine: 'Rua Coronel Linhares, 950 - 12º andar',
    neighborhood: 'Aldeota',
    city: 'Fortaleza',
    state: 'CE',
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.273!2d-38.524!3d-3.732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xf4a92d2e9c33177e!2sDra.%20Karinne%20Azin!5e0!3m2!1spt-BR!2sbr!4v1690000000000!5m2!1spt-BR!2sbr',
    mapsLink:
      'https://www.google.com/maps/place/Dra.+Karinne+Azin/data=!4m2!3m1!1s0x0:0xf4a92d2e9c33177e?sa=X&ved=1t:2428&ictx=111',
    openingHours: ['Seg a Sex • 8h às 19h', 'Sáb • 9h às 13h'],
  },
  contact: {
    email: 'contato@karinneazin.com',
    phone: '+55 (85) 98208-5858',
    whatsapp: '+55 (85) 98208-5858',
    whatsappMessage:
      'Olá! Gostaria de agendar uma consulta com a Dra. Karinne Azin. Como posso proceder?',
  },
  booking: {
    mode: 'whatsapp',
    defaultMessage: {
      'pt-BR':
        'Olá, gostaria de agendar uma consulta com a Dra. Karinne Azin. Meu nome é {name}, prefiro a data {date} no período {time}.',
      en: 'Hello, I would like to book an appointment with Dr. Karinne Azin. My name is {name}, and I prefer {date} during {time}.',
    },
  },
  social: [
    {
      label: 'Instagram',
      url: 'https://www.instagram.com/dra.karinneazin/',
      platform: 'instagram',
    },
    { label: 'Facebook', url: 'https://pt-br.facebook.com/drakarinneazin', platform: 'facebook' },
  ],
  doctoralia: {
    url: 'https://www.doctoralia.com.br/karinne-azin/ginecologista/fortaleza',
    reviewCount: 35,
  },
  instagram: {
    profileUrl: 'https://www.instagram.com/dra.karinneazin/',
    postUrls: [
      'https://www.instagram.com/p/DMDg4JKR0k0/',
      'https://www.instagram.com/p/DLEYuHsMrPR/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
      'https://www.instagram.com/p/DPzH0GhETaA/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
    ],
  },
  pagesMeta: {
    default: {
      title: 'Ginecologia - Dra. Karinne Azin',
      description:
        'Cuidado ginecológico especializado com foco em ciência, ética, acolhimento e escuta. Atendimento para menopausa, endometriose, mioma e cirurgia íntima.',
    },
    home: {
      title: 'Ginecologista - Dra. Karinne Azin',
      description:
        'Ginecologista especializada em menopausa, endometriose, mioma e cirurgia íntima. Cuidado com ciência, ética e acolhimento.',
    },
    about: {
      title: 'Sobre - Dra. Karinne Azin',
      description:
        'Conheça a trajetória, a visão de cuidado e os pilares da prática ginecológica da Dra. Karinne Azin: ciência, ética e acolhimento.',
    },
    services: {
      title: 'Especialidades - Ginecologia',
      description:
        'Consultas ginecológicas, tratamento de menopausa, endometriose, mioma, cirurgia íntima e prevenção com protocolos baseados em evidências.',
    },
    location: {
      title: 'Localização - Consultório',
      description:
        'Veja como chegar, horários de atendimento e detalhes do consultório da Dra. Karinne Azin.',
    },
    contact: {
      title: 'Contato - Dra. Karinne Azin',
      description:
        'Entre em contato para dúvidas, orientações ou informações sobre agendamento de consultas ginecológicas.',
    },
    booking: {
      title: 'Agendamentos - Consulta Ginecológica',
      description:
        'Solicite seu horário de consulta ginecológica pelo WhatsApp ou envie um pedido de agendamento.',
    },
    blog: {
      title: 'Conteúdos sobre Saúde da Mulher',
      description:
        'Artigos e orientações sobre ginecologia, saúde da mulher, prevenção e qualidade de vida.',
    },
    'blog/[slug]': {
      title: 'Artigo sobre Saúde da Mulher',
      description: 'Leitura aprofundada sobre ginecologia, saúde da mulher e bem-estar.',
    },
    instagram: {
      title: 'Instagram',
      description:
        'Acompanhe no Instagram: dicas, conteúdos e novidades sobre saúde da mulher e ginecologia.',
    },
  },
  home: {
    sections: ['hero', 'instagram', 'services', 'steps', 'testimonials', 'location', 'blog', 'cta'],
  },
  blog: {
    intro: {
      title: 'Conteúdo confiável sobre saúde da mulher',
      description:
        'Artigos e orientações sobre ginecologia, saúde da mulher, prevenção e qualidade de vida para decisões informadas.',
    },
  },
  openGraph: {
    image: undefined,
  },
};
