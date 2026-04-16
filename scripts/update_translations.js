const fs = require('fs');

const es = JSON.parse(fs.readFileSync('./src/content/i18n/es.json', 'utf8'));
const en = JSON.parse(fs.readFileSync('./src/content/i18n/en.json', 'utf8'));
const pt = JSON.parse(fs.readFileSync('./src/content/i18n/pt.json', 'utf8'));

// 1. Navbar
es.nav.contacto = "CONTACTO";
en.nav.contacto = "CONTACT";
pt.nav.contacto = "CONTATO";

// 2. Hero (Fix keys)
const heroUpdateES = {
  form_tipo_auto: "Auto",
  form_tipo_camioneta: "Camioneta",
  form_tipo_suv: "SUV",
  form_tipo_moto: "Moto",
  form_tipo_especial: "Especiales/Grande (RAM, RAPTOR, DUCATO, SPRINTER)"
};
Object.assign(es.hero, heroUpdateES);
Object.assign(en.hero, {
  form_tipo_auto: "Car",
  form_tipo_camioneta: "Pickup Truck",
  form_tipo_suv: "SUV",
  form_tipo_moto: "Motorcycle",
  form_tipo_especial: "Special/Large (RAM, RAPTOR, DUCATO, SPRINTER)"
});
Object.assign(pt.hero, {
  form_tipo_auto: "Carro",
  form_tipo_camioneta: "Caminhonete Média",
  form_tipo_suv: "SUV",
  form_tipo_moto: "Moto",
  form_tipo_especial: "Especial/Grande"
});

// 3. Servicios
es.servicios = {
  title: "Nuestros Servicios Principales",
  traslado: "TRASLADO:",
  valet: "VALET PARKING:",
  trasladoSteps: [
    { title: "1. CHECK-IN RÁPIDO", desc: "Dejás tu auto. Registramos tus datos y tu vuelo al instante para total control y seguridad." },
    { title: "2. TRASLADO DIRECTO", desc: "Te llevamos en nuestro vehículo (hasta 4 pasajeros). Espacio garantizado para tu grupo y equipaje." },
    { title: "3. REGRESO ÁGIL", desc: "Al momento de aterrizar, ¡Nos contactás por WhatsApp y acordamos el punto de encuentro!" }
  ],
  valetSteps: [
    { title: "1. RECEPCIÓN EN TERMINAL", desc: "Vas directo al aeropuerto (Ezeiza o Aeroparque). Nos entregás tu auto en la puerta y te vas a tu vuelo sin demoras." },
    { title: "2. RESGUARDO SEGURO", desc: "Nos encargamos de llevar tu vehículo y guardarlo en nuestras cocheras 100% cerradas mientras viajás." },
    { title: "3. ENTREGA AL ATERRIZAR", desc: "Cuando regreses, te estamos esperando con tu auto en la puerta de arribos listo para que vuelvas a casa." }
  ],
  extraCostsTitle: "⚠️ Costos Adicionales del Servicio:",
  extraCostsDesc: "+ $25.000 (Retiro y entrega en Ezeiza). + $90.000 (Combinado: Ej. Retiro en EZE y entrega en AEP, o viceversa)."
};

en.servicios = {
  title: "Our Main Services",
  traslado: "SHUTTLE:",
  valet: "VALET PARKING:",
  trasladoSteps: [
    { title: "1. FAST CHECK-IN", desc: "Leave your car. We instantly register your details and flight for complete control and security." },
    { title: "2. DIRECT SHUTTLE", desc: "We take you in our vehicle (up to 4 passengers). Guaranteed space for your group and luggage." },
    { title: "3. AGILE RETURN", desc: "Upon landing, contact us via WhatsApp and we will agree on the meeting point!" }
  ],
  valetSteps: [
    { title: "1. TERMINAL RECEPTION", desc: "Go straight to the airport (Ezeiza or Aeroparque). Hand us your car at the door and go to your flight without delays." },
    { title: "2. SECURE SHELTER", desc: "We take care of transporting your vehicle and storing it in our 100% covered garages while you travel." },
    { title: "3. DELIVERY UPON LANDING", desc: "When you return, we will be waiting with your car at the arrivals door ready for you to go home." }
  ],
  extraCostsTitle: "⚠️ Additional Service Costs:",
  extraCostsDesc: "+ $25,000 (Pickup and delivery at Ezeiza). + $90,000 (Combined: e.g., Pickup at EZE and delivery at AEP, or vice versa)."
};

pt.servicios = {
  title: "Nossos Principais Serviços",
  traslado: "TRANSLADO:",
  valet: "VALET PARKING:",
  trasladoSteps: [
    { title: "1. CHECK-IN RÁPIDO", desc: "Você deixa seu carro. Registramos seus dados e seu voo instantaneamente para controle e segurança totais." },
    { title: "2. TRANSLADO DIRETO", desc: "Levamos você no nosso veículo (até 4 passageiros). Espaço garantido para seu grupo e bagagem." },
    { title: "3. RETORNO ÁGIL", desc: "Ao pousar, entre em contato via WhatsApp e combinamos o ponto de encontro!" }
  ],
  valetSteps: [
    { title: "1. RECEPÇÃO NA BASE", desc: "Vá direto para o aeroporto (Ezeiza ou Aeroparque). Entregue seu carro na porta e vá para seu voo sem atrasos." },
    { title: "2. ABRIGO SEGURO", desc: "Cuidamos de transportar seu veículo e armazená-lo em nossas garagens 100% cobertas enquanto você viaja." },
    { title: "3. ENTREGA NO DESEMBARQUE", desc: "Quando você retornar, estaremos esperando com seu carro no desembarque pronto para você ir para casa." }
  ],
  extraCostsTitle: "⚠️ Custos Adicionais de Serviço:",
  extraCostsDesc: "+ $25.000 (Retirada e entrega em Ezeiza). + $90.000 (Combinado: Ex. Retirada em EZE e entrega em AEP, ou vice-versa)."
};

// 4. Modalidades
es.modalidades = {
  title: "Diversas Modalidades",
  subtitle: "Elegí la modalidad que mejor se adapte a tu viaje. Comodidad absoluta en cada paso.",
  popularBadge: "MÁS POPULAR",
  consultText: "Consultar servicio",
  cards: [
    {
      title: "TRASLADO ESTÁNDAR",
      features: ["Estacionás y te llevamos", "Traslado 24/7 sin cargo", "Cocheras totalmente cerradas"],
      price: "Desde $19.000 (Tarifa base)"
    },
    {
      title: "VALET PARKING",
      features: ["Entrega en la terminal", "Ahorro máximo de tiempo", "Recepción 24hs"],
      price: "+ $25.000 (Costo adicional)"
    },
    {
      title: "CRUCEROS",
      features: ["Retiro y entrega de vehículos en cruceros y buquebus."],
      price: "Consultar servicio"
    }
  ]
};

en.modalidades = {
  title: "Various Modalities",
  subtitle: "Choose the modality that best suits your trip. Absolute comfort at every step.",
  popularBadge: "MOST POPULAR",
  consultText: "Inquire about service",
  cards: [
    {
      title: "STANDARD SHUTTLE",
      features: ["Park and we drive you", "Free 24/7 shuttle", "Fully covered garages"],
      price: "From $19,000 (Base rate)"
    },
    {
      title: "VALET PARKING",
      features: ["Terminal drop-off", "Maximum time saving", "24h reception"],
      price: "+ $25,000 (Additional cost)"
    },
    {
      title: "CRUISES",
      features: ["Vehicle pick-up and delivery at cruise terminals and Buquebus."],
      price: "Inquire about service"
    }
  ]
};

pt.modalidades = {
  title: "Diversas Modalidades",
  subtitle: "Escolha a modalidade que melhor se adapta à sua viagem. Conforto absoluto em cada passo.",
  popularBadge: "MAIS POPULAR",
  consultText: "Consultar serviço",
  cards: [
    {
      title: "TRANSLADO PADRÃO",
      features: ["Estacione e nós o levamos", "Translado 24/7 gratuito", "Garagens totalmente cobertas"],
      price: "A partir de $19.000 (Tarifa base)"
    },
    {
      title: "VALET PARKING",
      features: ["Entrega no terminal", "Máxima economia de tempo", "Recepção 24h"],
      price: "+ $25.000 (Custo adicional)"
    },
    {
      title: "CRUZEIROS",
      features: ["Retirada e entrega de veículos em terminais de cruzeiros e Buquebus."],
      price: "Consultar serviço"
    }
  ]
};

// 5. Identidad
es.identidad = {
  title: "NUESTRA IDENTIDAD",
  subtitle1: "100% CERRADAS",
  desc1: "Nuestras instalaciones cuentan con cocheras 100% cerradas de pared y techo, garantizando resguardo absoluto contra factores climáticos.",
  stat1_label: "CAPACIDAD Y RESGUARDO",
  stat1_value: "Cocheras Techadas",
  subtitle2: "+10 AÑOS DE TRAYECTORIA",
  desc2: "Somos una empresa familiar con más de 10 años de experiencia en el sector aeroportuario. Nuestra filosofía se basa en el trato directo y la excelencia operativa.",
  stat2_label: "VÍNCULO Y CONFIANZA",
  stat2_value: "Trato Familiar"
};

en.identidad = {
  title: "OUR IDENTITY",
  subtitle1: "100% ENCLOSED",
  desc1: "Our facilities feature 100% enclosed parking with walls and roofs, guaranteeing absolute protection against weather conditions.",
  stat1_label: "CAPACITY AND PROTECTION",
  stat1_value: "Covered Parking",
  subtitle2: "10+ YEARS OF EXPERIENCE",
  desc2: "We are a family-owned business with over 10 years of experience in the airport sector. Our philosophy is based on direct service and operational excellence.",
  stat2_label: "BOND AND TRUST",
  stat2_value: "Family Service"
};

pt.identidad = {
  title: "NOSSA IDENTIDADE",
  subtitle1: "100% FECHADAS",
  desc1: "Nossas instalações contam com garagens 100% fechadas com paredes e tetos, garantindo proteção absoluta contra intempéries.",
  stat1_label: "CAPACIDADE E PROTEÇÃO",
  stat1_value: "Garagens Cobertas",
  subtitle2: "MAIS DE 10 ANOS DE EXPERIÊNCIA",
  desc2: "Somos uma empresa familiar com mais de 10 anos de experiência no setor aeroportuário. Nossa filosofia baseia-se no atendimento direto e excelência operacional.",
  stat2_label: "VÍNCULO E CONFIANÇA",
  stat2_value: "Atendimento Familiar"
};

// 6. Testimonios
es.testimonios = {
  title: "TESTIMONIOS",
  subtitle: "Lo que dicen quienes ya confían su vehículo en nuestras manos.",
  cards: [
    { text: "Excelente servicio! El traslado al aeropuerto fue súper rápido y mi auto quedó bajo techo impecable.", author: "María Fernández", role: "Viajera frecuente" },
    { text: "Muy recomendables. Me atendieron de madrugada con la misma buena onda. Dejar el auto no fue una preocupación.", author: "Juan Ignacio López", role: "Cliente de negocios" },
    { text: "Trato muy amable, todo familiar y de confianza. La opción de Valet me salvó porque estaba corto de tiempo.", author: "Carlos S.", role: "Turista" }
  ]
};
en.testimonios = {
  title: "TESTIMONIALS",
  subtitle: "What those who already trust their vehicle in our hands say.",
  cards: [
    { text: "Excellent service! The shuttle to the airport was super fast and my car was perfectly kept indoors.", author: "María Fernández", role: "Frequent Flyer" },
    { text: "Highly recommended. They attended me at dawn with the same great attitude. Leaving the car was worry-free.", author: "Juan Ignacio López", role: "Business Traveler" },
    { text: "Very friendly treatment, all familiar and trustworthy. The Valet option saved me because I was short on time.", author: "Carlos S.", role: "Tourist" }
  ]
};
pt.testimonios = {
  title: "DEPOIMENTOS",
  subtitle: "O que dizem aqueles que já confiam seu veículo em nossas mãos.",
  cards: [
    { text: "Excelente serviço! O translado para o aeroporto foi super rápido e meu carro ficou sob teto impecável.", author: "María Fernández", role: "Viajante Frequente" },
    { text: "Altamente recomendado. Me atenderam de madrugada com a mesma energia boa. Deixar o carro não foi preocupação.", author: "Juan Ignacio López", role: "Viajante de Negócios" },
    { text: "Atendimento muito simpático, tudo familiar e confiável. A opção Valet me salvou porque eu estava sem tempo.", author: "Carlos S.", role: "Turista" }
  ]
};

// 7. FAQ
es.faq = {
  title: "PREGUNTAS FRECUENTES",
  subtitle: "Consultas rápidas sobre nuestro servicio.",
  items: [
    { q: "¿En qué horarios trabajan?", a: "Estamos disponibles las 24 horas del día, todos los días del año, brindando vigilancia ininterrumpida." },
    { q: "¿Tengo que dejar las llaves de mi auto?", a: "Sí, es requisito dejar la llave para permitir maniobras logísticas dentro de nuestras propias cocheras y optimizar los espacios." },
    { q: "¿El traslado al aeropuerto se paga aparte?", a: "No, en la modalidad estándar el traslado ida y vuelta al aeropuerto de Ezeiza está bonificado. Sólo tiene costo adicional si es Aeroparque o es servicio Valet Parking." },
    { q: "¿Se puede abonar con tarjeta?", a: "Aceptamos efectivo, transferencias bancarias y tarjetas, permitiendo mayor comodidad al momento del pago." }
  ]
};

en.faq = {
  title: "FREQUENTLY ASKED QUESTIONS",
  subtitle: "Quick queries about our service.",
  items: [
    { q: "What are your working hours?", a: "We are available 24 hours a day, every day of the year, providing uninterrupted surveillance." },
    { q: "Do I have to leave my car keys?", a: "Yes, it is a requirement to leave the key to allow logistical maneuvers within our own garages and optimize spaces." },
    { q: "Is the airport shuttle paid separately?", a: "No, in the standard modality the round trip shuttle to Ezeiza airport is included. It only has an additional cost if it is Aeroparque or Valet Parking service." },
    { q: "Can I pay by card?", a: "We accept cash, bank transfers, and cards, allowing greater convenience at the time of payment." }
  ]
};

pt.faq = {
  title: "PERGUNTAS FREQUENTES",
  subtitle: "Dúvidas rápidas sobre nosso serviço.",
  items: [
    { q: "Quais são os horários de funcionamento?", a: "Estamos disponíveis 24 horas por dia, todos os dias do ano, oferecendo vigilância ininterrupta." },
    { q: "Preciso deixar as chaves do meu carro?", a: "Sim, é necessário deixar a chave para permitir manobras logísticas em nossas próprias garagens e otimizar os espaços." },
    { q: "A transferência para o aeroporto é paga separadamente?", a: "Não, na modalidade padrão, o translado de ida e volta ao aeroporto de Ezeiza está incluído na tarifa. Só há custo adicional se for Aeroparque ou serviço Valet Parking." },
    { q: "Posso pagar com cartão?", a: "Aceitamos dinheiro, transferências bancárias e cartões, oferecendo maior comodidade no momento do pagamento." }
  ]
};

// 8. Ubicacion
es.ubicacion = {
  title: "UBICACIÓN",
  subtitle: "ESTAMOS CERCA TUYO",
  desc: "A solo unos minutos del Aeropuerto Internacional de Ezeiza. Fácil acceso, camino seguro.",
  btnUrl: "CÓMO LLEGAR",
  addressLabel: "DIRECCIÓN",
  addressValue: "Venezuela 424, entre Centenario y 25 de Mayo. Ezeiza,",
  timeLabel: "TIEMPO A EZEIZA",
  timeValue: "~7 Minutos",
  scheduleLabel: "HORARIO",
  scheduleValue: "Atención 24hs"
};
en.ubicacion = {
  title: "LOCATION",
  subtitle: "WE ARE CLOSE TO YOU",
  desc: "Just minutes away from Ezeiza International Airport. Easy access, safe road.",
  btnUrl: "HOW TO GET THERE",
  addressLabel: "ADDRESS",
  addressValue: "Venezuela 424, Ezeiza.",
  timeLabel: "TIME TO EZEIZA",
  timeValue: "~7 Minutes",
  scheduleLabel: "SCHEDULE",
  scheduleValue: "Open 24/7"
};
pt.ubicacion = {
  title: "LOCALIZAÇÃO",
  subtitle: "ESTAMOS PERTO DE VOCÊ",
  desc: "A poucos minutos do Aeroporto Internacional de Ezeiza. Fácil acesso, estrada segura.",
  btnUrl: "COMO CHEGAR",
  addressLabel: "ENDEREÇO",
  addressValue: "Venezuela 424, entre Centenario y 25 de Mayo. Ezeiza.",
  timeLabel: "TEMPO ATÉ EZEIZA",
  timeValue: "~7 Minutos",
  scheduleLabel: "HORÁRIO",
  scheduleValue: "Aberto 24/7"
};

// 9. Footer
es.footer = {
  navTitle: "Zonas de la web",
  servicesTitle: "Servicios",
  legalTitle: "Legales",
  rights: "Todos los derechos reservados."
};
en.footer = {
  navTitle: "Website areas",
  servicesTitle: "Services",
  legalTitle: "Legal",
  rights: "All rights reserved."
};
pt.footer = {
  navTitle: "Áreas do site",
  servicesTitle: "Serviços",
  legalTitle: "Legais",
  rights: "Todos os direitos reservados."
};

fs.writeFileSync('./src/content/i18n/es.json', JSON.stringify(es, null, 2));
fs.writeFileSync('./src/content/i18n/en.json', JSON.stringify(en, null, 2));
fs.writeFileSync('./src/content/i18n/pt.json', JSON.stringify(pt, null, 2));
