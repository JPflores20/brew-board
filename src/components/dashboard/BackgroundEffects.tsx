import { APP_CONSTANTS } from "@/constants/appConstants";

// Componente que renderiza los efectos visuales de fondo de la aplicación
export function BackgroundEffects() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-slate-950"
    >
      {/* Malla de cuadrícula sutil para dar textura geométrica al fondo */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(ellipse at 50% 0%, black 40%, transparent 75%)",
        }}
      />
      {/* Esferas flotantes animadas con alto desenfoque para generar un efecto de luces de neón o aura */}
      <div className="animate-orb-a absolute -top-[10vw] -left-[10vw] h-[45vw] w-[45vw] rounded-full bg-blue-600 opacity-40 blur-[120px]" />
      <div className="animate-orb-b absolute top-[10vh] -right-[12vw] h-[40vw] w-[40vw] rounded-full bg-violet-600 opacity-40 blur-[130px]" />
      <div className="animate-orb-c absolute -bottom-[10vw] left-[20vw] h-[42vw] w-[42vw] rounded-full bg-cyan-500 opacity-30 blur-[140px]" />
      <div className="animate-orb-d absolute bottom-[5vh] right-[15vw] h-[30vw] w-[30vw] rounded-full bg-fuchsia-500 opacity-25 blur-[120px]" />
      
      {/* Viñeta suave en los bordes para oscurecer y ayudar a mantener un buen contraste con las tarjetas del primer plano */}
      <div className="absolute inset-0 bg-slate-950/30" />

      {/* Textura de ruido de fondo para dar un aspecto más orgánico y menos digital */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("${APP_CONSTANTS.BACKGROUND_NOISE_SVG}")`,
        }}
      />
    </div>
  );
}
