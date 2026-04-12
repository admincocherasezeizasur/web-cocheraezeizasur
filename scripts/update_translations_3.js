const fs = require('fs');

const esPath = './src/content/i18n/es.json';
const enPath = './src/content/i18n/en.json';
const ptPath = './src/content/i18n/pt.json';

const es = JSON.parse(fs.readFileSync(esPath, 'utf8'));
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const pt = JSON.parse(fs.readFileSync(ptPath, 'utf8'));

// FAQ
const faqBase = [
  ["¿LAS COCHERAS SON TECHADAS?", "Sí, nuestras cocheras son 100% cerradas de pared y techo, brindando protección completa contra lluvia, granizo y sol."],
  ["¿DEBO DEJAR LAS LLAVES?", "Sí, necesitamos las llaves para poder maniobrar los vehículos dentro de las cocheras. Se guardan de forma segura y controlada."],
  ["¿CÓMO Y CUÁNDO LO DEBO ABONAR?", "El pago se realiza al momento del retiro del vehículo. Aceptamos efectivo, transferencia bancaria y Mercado Pago."],
  ["¿QUÉ PASA SI SUFRO MODIFICACIÓN EN EL VUELO?", "No hay problema. Nos comunicás el cambio por WhatsApp y adaptamos los horarios sin costo adicional."],
  ["¿HASTA CUÁNTAS PERSONAS INCLUYE EL TRASLADO?", "El traslado incluye hasta 4 pasajeros con su equipaje, sin costo adicional."],
  ["¿PUEDO CANCELAR MI RESERVA?", "Sí, podés cancelar o modificar tu reserva sin costo hasta 24 horas antes del ingreso."]
];

es.faq = {
  title: "PREGUNTAS FRECUENTES",
  items: faqBase.map(item => ({ q: item[0], a: item[1] }))
};
en.faq = {
  title: "FREQUENTLY ASKED QUESTIONS",
  items: [
    { q: "ARE THE GARAGES COVERED?", a: "Yes, our garages are 100% enclosed with walls and roof, providing complete protection against rain, hail and sun." },
    { q: "DO I HAVE TO LEAVE THE KEYS?", a: "Yes, we need the keys to maneuver vehicles inside the garages. They are kept safely and controlled." },
    { q: "HOW AND WHEN SHOULD I PAY?", a: "Payment is made when picking up the vehicle. We accept cash, bank transfer and credit cards." },
    { q: "WHAT IF MY FLIGHT CHANGES?", a: "No problem. Let us know via WhatsApp and we'll adapt schedules at no extra cost." },
    { q: "HOW MANY PEOPLE DOES THE SHUTTLE INCLUDE?", a: "The shuttle includes up to 4 passengers with luggage, at no extra cost." },
    { q: "CAN I CANCEL MY RESERVATION?", a: "Yes, you can cancel or modify your reservation for free up to 24 hours before entry." }
  ]
};
pt.faq = {
  title: "PERGUNTAS FREQUENTES",
  items: [
    { q: "AS GARAGENS SÃO COBERTAS?", a: "Sim, as nossas garagens são 100% fechadas com parede e teto, oferecendo proteção completa contra chuva, granizo e sol." },
    { q: "TENHO QUE DEIXAR AS CHAVES?", a: "Sim, precisamos das chaves para poder manobrar os veículos dentro das garagens. São guardadas de forma segura e controlada." },
    { q: "COMO E QUANDO DEVO PAGAR?", a: "O pagamento é feito no momento da retirada do veículo. Aceitamos dinheiro, transferência bancária e cartões." },
    { q: "E SE O MEU VOO MUDA?", a: "Sem problema. Avise-nos via WhatsApp e adaptaremos os horários sem custo adicional." },
    { q: "QUANTAS PESSOAS INCLUI O TRANSLADO?", a: "O translado inclui até 4 passageiros com sua bagagem, sem custo adicional." },
    { q: "POSSO CANCELAR MINHA RESERVA?", a: "Sim, pode cancelar ou alterar a sua reserva gratuitamente até 24 horas antes da entrada." }
  ]
};

// Ubicacion
es.ubicacion = {
  title: "UBICACIÓN ESTRATÉGICA",
  btnUrl: "CÓMO LLEGAR"
};
en.ubicacion = {
  title: "STRATEGIC LOCATION",
  btnUrl: "HOW TO GET THERE"
};
pt.ubicacion = {
  title: "LOCALIZAÇÃO ESTRATÉGICA",
  btnUrl: "COMO CHEGAR"
};

// Footer
es.footer = {
  navTitle: "SECCIONES",
  servicesTitle: "SERVICIOS",
  legalTitle: "LEGAL",
  rights: "Cocheras Ezeiza Sur. Todos los derechos reservados.",
  servicios: ["Traslado Estándar", "Valet Parking", "Limpieza", "Mecánica"],
  legales: ["Términos y Condiciones", "Políticas de Privacidad"]
};
en.footer = {
  navTitle: "SECTIONS",
  servicesTitle: "SERVICES",
  legalTitle: "LEGAL",
  rights: "Cocheras Ezeiza Sur. All rights reserved.",
  servicios: ["Standard Shuttle", "Valet Parking", "Cleaning", "Mechanics"],
  legales: ["Terms and Conditions", "Privacy Policies"]
};
pt.footer = {
  navTitle: "SEÇÕES",
  servicesTitle: "SERVIÇOS",
  legalTitle: "LEGAL",
  rights: "Cocheras Ezeiza Sur. Todos os direitos reservados.",
  servicios: ["Translado Padrão", "Valet Parking", "Limpeza", "Mecânica"],
  legales: ["Termos e Condições", "Políticas de Privacidade"]
};

fs.writeFileSync(esPath, JSON.stringify(es, null, 2));
fs.writeFileSync(enPath, JSON.stringify(en, null, 2));
fs.writeFileSync(ptPath, JSON.stringify(pt, null, 2));
console.log('Done');
