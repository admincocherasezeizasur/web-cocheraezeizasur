import Image from "next/image";
import { Icon } from "@iconify/react";

export function IdentidadSection({ dict }: { dict: any }) {
  return (
    <section className="py-20 bg-[#060606]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            {dict.identidad?.title || "NUESTRA IDENTIDAD"}
          </h2>
          <div className="w-16 h-1 bg-brand-red mx-auto mt-4" />
        </div>

        {/* Two Column Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
          {/* Card 1 */}
          <div className="relative bg-[#1E1E24] border border-[#D90429]/20 hover:border-[#D90429]/60 shadow-[0_0_20px_rgba(217,4,41,0.03)] hover:shadow-[0_0_25px_rgba(217,4,41,0.15)] transition-all duration-500 rounded-xl p-10 overflow-hidden flex flex-col">
            {/* Huge Watermark */}
            <div className="absolute right-4 bottom-4 w-40 h-40 pointer-events-none">
              <Image src="/nuestra_identidad-Shield-heart.svg" fill alt="Shield Watermark" className="object-contain" />
            </div>
            
            {/* Content */}
            <div className="relative z-20 flex flex-col h-full">
              <div className="w-[52px] h-[52px] rounded-xl bg-[#D90429]/10 flex items-center justify-center mb-8 border border-[#D90429]/20 shadow-[0_0_10px_rgba(217,4,41,0.1)]">
                <Icon icon="mdi:shield-check" className="w-6 h-6 text-[#D90429]" />
              </div>
              
              <h3 className="text-xl font-extrabold text-white tracking-widest mb-4 uppercase">
                {dict.identidad?.card1_title || "EXPERIENCIA Y SEGURIDAD PREMIUM"}
              </h3>
              <p className="text-[15px] text-[#E7BCBA] leading-relaxed mb-10 font-medium">
                {dict.identidad?.card1_desc || "Diseñamos un entorno de máxima protección para su patrimonio. Nuestras instalaciones cuentan con cocheras 100% cerradas de pared y techo, garantizando resguardo absoluto contra factores climáticos."}
              </p>
              
              <div className="space-y-8 mt-auto">
                <div className="flex items-start gap-5">
                  <Icon icon="mdi:shield-check-outline" className="w-6 h-6 text-[#D90429] shrink-0" />
                  <div className="pt-0.5">
                    <p className="text-[11px] font-black text-white uppercase tracking-[0.15em] mb-1">
                      {dict.identidad?.card1_feat1_title || "MONITOREO ACTIVO"}
                    </p>
                    <p className="text-sm text-[#E7BCBA] font-medium leading-relaxed">
                      {dict.identidad?.card1_feat1_desc || "Vigilancia profesional las 24hs con sistemas de cámaras de alta definición."}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-5">
                  <Icon icon="mdi:clock-fast" className="w-6 h-6 text-[#D90429] shrink-0" />
                  <div className="pt-0.5">
                    <p className="text-[11px] font-black text-white uppercase tracking-[0.15em] mb-1">
                      {dict.identidad?.card1_feat2_title || "TRASLADO INMEDIATO"}
                    </p>
                    <p className="text-sm text-[#E7BCBA] font-medium leading-relaxed">
                      {dict.identidad?.card1_feat2_desc || "Logística sincronizada para traslados a la terminal sin tiempos de espera."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative bg-[#1E1E24] border border-[#D90429]/20 hover:border-[#D90429]/60 shadow-[0_0_20px_rgba(217,4,41,0.03)] hover:shadow-[0_0_25px_rgba(217,4,41,0.15)] transition-all duration-500 rounded-xl p-10 overflow-hidden flex flex-col">
            {/* Huge Watermark */}
            <div className="absolute right-4 bottom-4 w-40 h-40 pointer-events-none">
              <Image src="/nuestra_identidad-connections-trayectoria.svg" fill alt="Connections Watermark" className="object-contain" />
            </div>
            
            {/* Content */}
            <div className="relative z-20 flex flex-col h-full">
              <div className="w-[52px] h-[52px] rounded-xl bg-[#D90429]/10 flex items-center justify-center mb-8 border border-[#D90429]/20 shadow-[0_0_10px_rgba(217,4,41,0.1)]">
                <Icon icon="mdi:account-group" className="w-6 h-6 text-[#D90429]" />
              </div>
              
              <h3 className="text-xl font-extrabold text-white tracking-widest mb-4 uppercase">
                {dict.identidad?.card2_title || "NUESTRA TRAYECTORIA"}
              </h3>
              <p className="text-[15px] text-[#E7BCBA] leading-relaxed mb-10 font-medium">
                {dict.identidad?.card2_desc || "Somos una empresa familiar con más de 10 años de experiencia en el sector aeroportuario. Nuestra filosofía se basa en el trato directo y la excelencia operativa."}
              </p>
              
              <div className="space-y-8 mt-auto">
                <div className="flex items-start gap-5">
                  <Icon icon="mdi:account-star" className="w-6 h-6 text-[#D90429] shrink-0" />
                  <div className="pt-0.5">
                    <p className="text-[11px] font-black text-white uppercase tracking-[0.15em] mb-1">
                      {dict.identidad?.card2_feat1_title || "ATENCIÓN POR SUS DUEÑOS"}
                    </p>
                    <p className="text-sm text-[#E7BCBA] font-medium leading-relaxed">
                      {dict.identidad?.card2_feat1_desc || "Garantizamos un trato personalizado y resolutivo en cada interacción."}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-5">
                  <Icon icon="mdi:car-estate" className="w-6 h-6 text-[#D90429] shrink-0" />
                  <div className="pt-0.5">
                    <p className="text-[11px] font-black text-white uppercase tracking-[0.15em] mb-1">
                      {dict.identidad?.card2_feat2_title || "VALET PARKING DIFERENCIAL"}
                    </p>
                    <p className="text-sm text-[#E7BCBA] font-medium leading-relaxed">
                      {dict.identidad?.card2_feat2_desc || "Servicio exclusivo de recepción y entrega diseñado para el viajero frecuente."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
