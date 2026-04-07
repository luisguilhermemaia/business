export const siteRoutes = {
  home: '/',
  about: '/sobre-a-medica',
  blog: '/blog',
  attendance: '/atendimento',
  contact: '/contato',
  contactBooking: '/contato-agendamento',
  privacyPolicy: '/politica-de-privacidade',
  specialty: {
    overview: '/especialidade',
    menopause: '/especialidade/menopausa-climaterio-reposicao-hormonal-individualizada',
    hormonalImplants:
      '/especialidade/implantes-hormonais-femininos-terapia-hormonal-individualizada',
  },
  advancedGynecology: {
    overview: '/ginecologia-avancada',
    laserIntimo: '/ginecologia-avancada/laser-intimo-ginecologico-tratamento-funcional-intimo',
    endometriosis:
      '/ginecologia-avancada/ginecologia-especialista-endometriose-tratamento-cirurgia-da-endometriose-laparoscopia',
    gynecologicalSurgery:
      '/ginecologia-avancada/cirurgia-ginecologica-minimamente-invasiva-mioma-cisto-endometriose',
    intimateSurgery: '/ginecologia-avancada/cirurgia-intima-feminina-ninfoplastia-perineoplastia',
    iuds: '/ginecologia-avancada/diu-hormonal-cobre-contraceptivo-longa-duracao',
  },
} as const;
