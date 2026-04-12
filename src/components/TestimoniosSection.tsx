export function TestimoniosSection({ dict }: { dict: any }) {
  const testimonios = dict.testimonios?.cards || [];
  return (
    <section className="py-20 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            {dict.testimonios?.title || "TESTIMONIOS"}
          </h2>
          <div className="w-16 h-1 bg-brand-red mx-auto mt-4 mb-6" />
          <p className="text-[#E7BCBA] text-lg max-w-2xl mx-auto">
            {dict.testimonios?.subtitle || "Lo que dicen quienes ya confían su vehículo en nuestras manos."}
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonios.map((t: any) => (
            <div
              key={t.initials}
              className="bg-brand-card border border-brand-red/15 rounded-xl p-6 flex flex-col h-full"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4 text-brand-red text-sm tracking-wider">
                ★★★★★
              </div>
              {/* Text */}
              <p className="text-[15px] text-[#E7BCBA] leading-relaxed italic mb-6 flex-grow">
                {t.text}
              </p>
              {/* Author */}
              <div className="flex items-center gap-3 border-t border-white/10 pt-4 mt-auto">
                <div className="w-10 h-10 rounded-full bg-brand-red flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {t.initials}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-white text-sm font-bold">
                    {t.name}
                  </span>
                  <span className="text-[#E7BCBA] text-xs mt-0.5">
                    {t.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
