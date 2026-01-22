import { BrandContent } from '../../core/types/brand';

export const karinneContent: BrandContent = {
  doctor: {
    name: 'Dra. Karinne Azin',
    specialty: 'Ginecologia e Obstetrícia',
    registrationLabel: 'CRM 000000 - Registro profissional',
    bio: 'Ginecologista dedicada ao cuidado integral da mulher, combinando ciência, ética e acolhimento em cada consulta.',
    headshot:
      'https://s3-sa-east-1.amazonaws.com/doctoralia.com.br/doctor/04015c/04015c1b5a5b4bc60398b20d5590c191_large.jpg',
    highlights: ['Ciência e Ética', 'Acolhimento e Escuta', 'Cuidado Personalizado'],
  },
  hero: {
    headline: 'Você está cansada de conviver com dores ou sintomas que atrapalham sua vida?',
    subheadline:
      'O cuidado ginecológico pode ser o seu espaço seguro para entender o que está acontecendo e receber um plano claro de tratamento. Atendo presencialmente e online para todo o Brasil — com acolhimento, escuta ativa e condutas baseadas em evidências.',
    ctaLabel: 'Agendar consulta',
    secondaryCtaLabel: 'Conhecer especialidades',
  },
  services: [
    {
      title: 'Cólicas intensas e dor pélvica',
      shortDescription:
        'Investigação cuidadosa para identificar causas como endometriose, adenomiose e miomas.',
      iconKey: 'stethoscope',
    },
    {
      title: 'Menopausa e sintomas hormonais',
      shortDescription:
        'Tratamento individualizado para ondas de calor, insônia, ansiedade e alterações de humor.',
      iconKey: 'heart',
    },
    {
      title: 'Endometriose e adenomiose',
      shortDescription:
        'Diagnóstico preciso e plano terapêutico para reduzir dor e preservar qualidade de vida.',
      iconKey: 'shield',
    },
    {
      title: 'Mioma uterino',
      shortDescription:
        'Avaliação completa com condutas clínicas ou cirúrgicas de acordo com seu perfil.',
      iconKey: 'check',
    },
    {
      title: 'Cirurgia íntima e ginecológica',
      shortDescription:
        'Procedimentos com técnica precisa, segurança e acompanhamento pós-operatório.',
      iconKey: 'shield',
    },
    {
      title: 'Planejamento reprodutivo',
      shortDescription:
        'Orientação sobre fertilidade, anticoncepção e escolhas seguras para seu momento de vida.',
      iconKey: 'heart',
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
    addressLine: 'Av. Referência, 123',
    neighborhood: 'Bairro Central',
    city: 'Cidade',
    state: 'UF',
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3658.000000!2d-46.658000!3d-23.561000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0x0!2zMjPCsDMzJzM5LjYiUyA0NsKwMzknMjguOCJX!5e0!3m2!1spt-BR!2sbr!4v0000000000000',
    mapsLink: 'https://maps.google.com/?q=Av.+Refer%C3%AAncia%2C+123',
    openingHours: ['Seg a Sex • 8h às 19h', 'Sáb • 9h às 13h'],
  },
  contact: {
    email: 'contato@karinneazin.com',
    phone: '+55 (11) 4000-0000',
    whatsapp: '+55 (11) 98888-8888',
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
    { label: 'Instagram', url: 'https://instagram.com' },
    { label: 'LinkedIn', url: 'https://linkedin.com' },
  ],
  pagesMeta: {
    default: {
      title: 'Ginecologia e Obstetrícia - Dra. Karinne Azin',
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
  },
  home: {
    sections: ['hero', 'services', 'steps', 'testimonials', 'location', 'blog', 'cta'],
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
