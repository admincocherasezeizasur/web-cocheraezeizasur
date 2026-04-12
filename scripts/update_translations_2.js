const fs = require('fs');

const esPath = './src/content/i18n/es.json';
const enPath = './src/content/i18n/en.json';
const ptPath = './src/content/i18n/pt.json';

const es = JSON.parse(fs.readFileSync(esPath, 'utf8'));
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const pt = JSON.parse(fs.readFileSync(ptPath, 'utf8'));

// Identidad
es.identidad = {
  title: "NUESTRA IDENTIDAD",
  card1_title: "EXPERIENCIA Y SEGURIDAD PREMIUM",
  card1_desc: "Diseñamos un entorno de máxima protección para su patrimonio. Nuestras instalaciones cuentan con cocheras 100% cerradas de pared y techo, garantizando resguardo absoluto contra factores climáticos.",
  card1_feat1_title: "MONITOREO ACTIVO",
  card1_feat1_desc: "Vigilancia profesional las 24hs con sistemas de cámaras de alta definición.",
  card1_feat2_title: "TRASLADO INMEDIATO",
  card1_feat2_desc: "Logística sincronizada para traslados a la terminal sin tiempos de espera.",
  card2_title: "NUESTRA TRAYECTORIA",
  card2_desc: "Somos una empresa familiar con más de 10 años de experiencia en el sector aeroportuario. Nuestra filosofía se basa en el trato directo y la excelencia operativa.",
  card2_feat1_title: "ATENCIÓN POR SUS DUEÑOS",
  card2_feat1_desc: "Garantizamos un trato personalizado y resolutivo en cada interacción.",
  card2_feat2_title: "VALET PARKING DIFERENCIAL",
  card2_feat2_desc: "Servicio exclusivo de recepción y entrega diseñado para el viajero frecuente."
};

en.identidad = {
  title: "OUR IDENTITY",
  card1_title: "PREMIUM EXPERIENCE & SECURITY",
  card1_desc: "We design a maximum protection environment for your assets. Our facilities feature 100% enclosed garages with walls and roofs, ensuring absolute shelter from climatic factors.",
  card1_feat1_title: "ACTIVE MONITORING",
  card1_feat1_desc: "Professional 24/7 surveillance with high-definition camera systems.",
  card1_feat2_title: "IMMEDIATE SHUTTLE",
  card1_feat2_desc: "Synchronized logistics for terminal transfers with no waiting times.",
  card2_title: "OUR TRACK RECORD",
  card2_desc: "We are a family business with over 10 years of experience in the airport sector. Our philosophy is based on direct interaction and operational excellence.",
  card2_feat1_title: "ATTENDED BY OWNERS",
  card2_feat1_desc: "We guarantee a personalized and decisive approach in every interaction.",
  card2_feat2_title: "DIFFERENTIAL VALET PARKING",
  card2_feat2_desc: "Exclusive reception and delivery service designed for the frequent traveler."
};

pt.identidad = {
  title: "NOSSA IDENTIDADE",
  card1_title: "EXPERIÊNCIA E SEGURANÇA PREMIUM",
  card1_desc: "Projetamos um ambiente de proteção máxima para seu patrimônio. Nossas instalações possuem garagens 100% fechadas com paredes e tetos, garantindo proteção absoluta contra fatores climáticos.",
  card1_feat1_title: "MONITORAMENTO ATIVO",
  card1_feat1_desc: "Vigilância profissional 24h com sistemas de câmeras de alta definição.",
  card1_feat2_title: "TRANSLADO IMEDIATO",
  card1_feat2_desc: "Logística sincronizada para traslados ao terminal sem tempo de espera.",
  card2_title: "NOSSA TRAJETÓRIA",
  card2_desc: "Somos uma empresa familiar com mais de 10 anos de experiência no setor aeroportuário. Nossa filosofia baseia-se no contato direto e excelência operacional.",
  card2_feat1_title: "ATENDIMENTO PELOS DONOS",
  card2_feat1_desc: "Garantimos um tratamento personalizado e resolutivo em cada interação.",
  card2_feat2_title: "VALET PARKING DIFERENCIAL",
  card2_feat2_desc: "Serviço exclusivo de recepção e entrega projetado para o viajante frequente."
};

// Testimonios
es.testimonios = {
  title: "TESTIMONIOS",
  subtitle: "Lo que dicen quienes ya confían su vehículo en nuestras manos.",
  cards: [
    { initials: "RM", name: "RICARDO MARTÍNEZ", role: "VIAJERO FRECUENTE", text: "\"Impecable el servicio de Valet. Me recibieron el auto en la terminal y al volver me lo entregaron en minutos. Mucho más cómodo y rápido que estacionar en el aeropuerto.\"" },
    { initials: "LS", name: "LAURA SÍVORI", role: "CLIENTE PARTICULAR", text: "\"La seguridad es mi prioridad y acá dormí tranquilo. Cocheras cerradas de verdad y el traslado a la terminal fue inmediato. No esperé ni 5 minutos.\"" },
    { initials: "JP", name: "JUAN PABLO FERRO", role: "VIAJE DE NEGOCIOS", text: "\"Excelente relación precio-calidad. El ahorro comparado con el parking oficial es notable y el servicio es mucho más personalizado. Lo recomiendo 100%.\"" }
  ]
};

en.testimonios = {
  title: "TESTIMONIALS",
  subtitle: "What those who already trust their vehicle in our hands say.",
  cards: [
    { initials: "RM", name: "RICARDO MARTÍNEZ", role: "FREQUENT FLYER", text: "\"Impeccable Valet service. They received my car at the terminal and delivered it to me in minutes when I returned. Much more comfortable and faster than parking at the airport.\"" },
    { initials: "LS", name: "LAURA SÍVORI", role: "PRIVATE CLIENT", text: "\"Security is my priority and here I slept peacefully. Truly enclosed garages and the shuttle to the terminal was immediate. I didn't even wait 5 minutes.\"" },
    { initials: "JP", name: "JUAN PABLO FERRO", role: "BUSINESS TRIP", text: "\"Excellent price-quality ratio. The savings compared to official parking are remarkable and the service is much more personalized. I recommend it 100%.\"" }
  ]
};

pt.testimonios = {
  title: "DEPOIMENTOS",
  subtitle: "O que dizem aqueles que já confiam seu veículo em nossas mãos.",
  cards: [
    { initials: "RM", name: "RICARDO MARTÍNEZ", role: "VIAJANTE FREQUENTE", text: "\"Impecável o serviço de Valet. Receberam o meu carro no terminal e ao voltar entregaram-no em minutos. Muito mais confortável e rápido do que estacionar no aeroporto.\"" },
    { initials: "LS", name: "LAURA SÍVORI", role: "CLIENTE PARTICULAR", text: "\"A segurança é a minha prioridade e aqui dormi descansado. Garagens verdadeiramente fechadas e o translado para o terminal foi imediato. Não esperei nem 5 minutos.\"" },
    { initials: "JP", name: "JUAN PABLO FERRO", role: "VIAGEM DE NEGÓCIOS", text: "\"Excelente relação preço-qualidade. A poupança em relação ao estacionamento oficial é notável e o serviço é muito mais personalizado. Recomendo a 100%.\"" }
  ]
};

fs.writeFileSync(esPath, JSON.stringify(es, null, 2));
fs.writeFileSync(enPath, JSON.stringify(en, null, 2));
fs.writeFileSync(ptPath, JSON.stringify(pt, null, 2));
console.log('Done');
