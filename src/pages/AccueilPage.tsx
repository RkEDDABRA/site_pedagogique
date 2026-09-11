import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedSection from "@/components/AnimatedSection";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import LordIcon, { LORD_ICONS } from "@/components/LordIcon";

const actualites = [
  { tag: "2026", tagColor: "bg-rose/10 text-rose", text: "Molecular Diagnostic Tests for Tuberculosis — Diagnostics (IN PRESS)" },
  { tag: "2026", tagColor: "bg-rose/10 text-rose", text: "Nursing Simulation & Self-Efficacy — Education in Medicine Journal (IN PRESS)" },
  { tag: "Conf.", tagColor: "bg-primary/10 text-primary", text: "Conférence plénière CINESIA 2025 — Profil des nouveau-nés, CHR Hassan II Agadir" },
  { tag: "Dubai", tagColor: "bg-gold/10 text-gold", text: "12th International Nursing Conference 2023 — Miliary tuberculosis in children" },
];

const PAGE_TO_PATH: Record<string, string> = {
  accueil: "/",
  cv: "/cv",
  licence: "/licence",
  master: "/master",
};

export default function AccueilPage() {
  const navigate = useNavigate();
  const onNavigate = (page: string) => {
    navigate(PAGE_TO_PATH[page] ?? "/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const { toast } = useToast();
  const [contactForm, setContactForm] = useState({ nom: "", email: "", sujet: "", message: "" });
  const [activeActuTab, setActiveActuTab] = useState("recherche");
  const [contactLoading, setContactLoading] = useState(false);
  const [contactStatus, setContactStatus] = useState<"idle" | "success" | "error">("idle");

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (contactLoading) return;
    setContactLoading(true);
    setContactStatus("idle");
    try {
      // Mock backend call — replace with real endpoint later
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast({ title: "Message envoyé !", description: "Merci pour votre message. Nous vous répondrons bientôt." });
      setContactForm({ nom: "", email: "", sujet: "", message: "" });
      setContactStatus("success");
    } catch {
      setContactStatus("error");
    } finally {
      setContactLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <AnimatedSection>
        <div className="relative rounded-2xl overflow-hidden bg-navy p-8 sm:p-12 mb-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-gold/10 pointer-events-none" />
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 bg-gold/15 border border-gold/30 text-gold px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
              <LordIcon src={LORD_ICONS.star} size={20} colors="primary:#FFD700,secondary:#FFD700" trigger="loop" /> Site pédagogique officiel
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-navy-foreground mb-3">
              Pr. Rkia <span className="text-gold">EDDABRA</span>
            </h1>
            <p className="text-navy-foreground/80 text-base max-w-lg leading-relaxed">
              <i className="fa-solid fa-microscope mr-2" aria-hidden="true" />Maître de Conférence Habilitée en Microbiologie
              <br />
              <i className="fa-solid fa-building-columns mr-2" aria-hidden="true" />ISPITS d'Agadir — Site pédagogique officiel
            </p>
          </div>
        </div>
      </AnimatedSection>

      {/* 3 Cards */}
      <AnimatedSection delay={0.08}>
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          <button
            onClick={() => onNavigate("licence")}
            className="bg-card rounded-xl p-5 shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5 text-left border-t-4 border-t-primary">
            <div className="mb-2"><LordIcon src={LORD_ICONS.book} size={36} colors="primary:#3B82F6,secondary:#FFD700" /></div>
            <div className="font-display font-bold text-sm text-foreground">Licence — Modules Enseignés</div>
            <p className="text-xs text-muted-foreground mt-1">Accéder aux modules et ressources</p>
          </button>
          <div className="bg-card rounded-xl p-5 shadow-card border-t-4 border-t-gold opacity-75">
            <div className="mb-2"><LordIcon src={LORD_ICONS.trophy} size={36} colors="primary:#FFD700,secondary:#3B82F6" /></div>
            <div className="font-display font-bold text-sm text-foreground">Master — Filière Coordonnée</div>
            <p className="text-xs text-muted-foreground mt-1">PRATIQUES AVANCEES EN URGENTOLOGIE</p>
          </div>
          <div className="bg-card rounded-xl p-5 shadow-card border-t-4 border-t-rose opacity-75">
            <div className="mb-2"><LordIcon src={LORD_ICONS.document} size={36} colors="primary:#E23670,secondary:#3B82F6" /></div>
            <div className="font-display font-bold text-sm text-foreground">Licence — Filière Coordonnée</div>
            <p className="text-xs text-muted-foreground mt-1">SOINS INFIRMIERS</p>
          </div>
        </div>
      </AnimatedSection>

      {/* Actualités */}
      <div className="grid md:grid-cols-1 gap-6 mb-8">

        <AnimatedSection delay={0.2}>
          <div className="bg-card rounded-xl p-6 shadow-card h-full">
            <h3 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <LordIcon src={LORD_ICONS.article} size={28} colors="primary:#3B82F6,secondary:#FFD700" /> Actualités & Publications
            </h3>
            {/* Tabs */}
            <div className="flex gap-2 mb-4 flex-wrap">
              {[
                { id: "recherche", label: "Recherche", icon: "fa-solid fa-flask", color: "bg-rose/10 text-rose border-rose/20" },
                { id: "enseignement", label: "Enseignement", icon: "fa-solid fa-chalkboard", color: "bg-primary/10 text-primary border-primary/20" },
                { id: "formation", label: "Formation", icon: "fa-solid fa-user-graduate", color: "bg-gold/10 text-gold border-gold/20" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveActuTab(tab.id)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 ${
                    activeActuTab === tab.id
                      ? tab.color + " shadow-sm"
                      : "bg-secondary text-muted-foreground border-border hover:border-muted-foreground/30"
                  }`}
                >
                  <i className={tab.icon} aria-hidden="true" /> {tab.label}
                </button>
              ))}
            </div>
            {/* Content */}
            <div className="space-y-3 min-h-[80px]">
              {activeActuTab === "recherche" && (
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-rose/5 border border-rose/15">
                    <div className="w-10 h-12 bg-destructive rounded-lg flex flex-col items-center justify-center flex-shrink-0">
                      <span className="text-[9px] font-bold text-destructive-foreground">PDF</span>
                      <i className="fa-solid fa-file-pdf text-destructive-foreground text-sm" aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-foreground leading-tight mb-0.5">Mباراة ولوج سلك الماستر ISPITS 2025-2026</p>
                      <p className="text-xs text-muted-foreground mb-1.5">Concours d'accès au Master ISPITS — 690 places · 10 mai 2026</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="inline-flex items-center gap-1 bg-rose/10 text-rose text-[10px] font-bold px-2 py-0.5 rounded-full">2026</span>
                        <a
                          href="/documents/Master_ISPITS.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 bg-rose text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full hover:opacity-90 transition-opacity"
                        >
                          <i className="fa-solid fa-download" aria-hidden="true" /> Télécharger
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {activeActuTab === "enseignement" && (
                <p className="text-sm text-muted-foreground italic"><i className="fa-regular fa-clock mr-1" aria-hidden="true" />Aucune actualité pour le moment. Contenu à venir.</p>
              )}
              {activeActuTab === "formation" && (
                <p className="text-sm text-muted-foreground italic"><i className="fa-regular fa-clock mr-1" aria-hidden="true" />Aucune actualité pour le moment. Contenu à venir.</p>
              )}
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Bottom sections */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <AnimatedSection delay={0.25}>
          <div className="bg-card rounded-xl p-6 shadow-card border-t-4 border-t-gold">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center">
                <LordIcon src={LORD_ICONS.document} size={24} colors="primary:#1a2332,secondary:#1a2332" />
              </div>
              <div>
                <div className="font-display font-bold text-sm">Textes Réglementaires</div>
                <div className="text-xs text-muted-foreground">Documents officiels de référence</div>
              </div>
            </div>
            <div className="bg-gold/5 border border-gold/20 rounded-xl p-4 flex items-center gap-3">
              <div className="w-11 h-13 bg-destructive rounded-lg flex flex-col items-center justify-center flex-shrink-0 p-2">
                <span className="text-[10px] font-bold text-destructive-foreground">PDF</span>
                <i className="fa-solid fa-file-pdf text-destructive-foreground" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm mb-1">Textes Réglementaires ISPITS</p>
                <p className="text-xs text-muted-foreground mb-2">Document officiel réglementant les programmes</p>
                <span className="inline-flex items-center gap-1 bg-gold text-gold-foreground text-xs font-bold px-3 py-1 rounded-full">
                  <i className="fa-solid fa-download" aria-hidden="true" /> Télécharger le PDF
                </span>
              </div>
            </div>
            <div className="bg-gold/5 border border-gold/20 rounded-xl p-4 flex items-center gap-3 mt-3">
              <div className="w-11 h-13 bg-destructive rounded-lg flex flex-col items-center justify-center flex-shrink-0 p-2">
                <span className="text-[10px] font-bold text-destructive-foreground">PDF</span>
                <i className="fa-solid fa-file-pdf text-destructive-foreground" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm mb-1">CNPN 2024 Master</p>
                <p className="text-xs text-muted-foreground mb-2">Cahier des Normes Pédagogiques Nationales du Master</p>
                <a
                  href="/documents/CNPN_2024_Master.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 bg-gold text-gold-foreground text-xs font-bold px-3 py-1 rounded-full hover:opacity-90 transition-opacity"
                >
                  <i className="fa-solid fa-download" aria-hidden="true" /> Télécharger le PDF
                </a>
              </div>
            </div>
            <div className="bg-gold/5 border border-gold/20 rounded-xl p-4 flex items-center gap-3 mt-3">
              <div className="w-11 h-13 bg-destructive rounded-lg flex flex-col items-center justify-center flex-shrink-0 p-2">
                <span className="text-[10px] font-bold text-destructive-foreground">PDF</span>
                <i className="fa-solid fa-file-pdf text-destructive-foreground" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm mb-1">CNPN 2025 Licence &amp; Master</p>
                <p className="text-xs text-muted-foreground mb-2">Cahier des Normes Pédagogiques Nationales 2025 (Bulletin Officiel)</p>
                <a
                  href="/documents/CNPN_2025_Licence_Master.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 bg-gold text-gold-foreground text-xs font-bold px-3 py-1 rounded-full hover:opacity-90 transition-opacity"
                >
                  <i className="fa-solid fa-download" aria-hidden="true" /> Télécharger le PDF
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <div className="bg-card rounded-xl p-6 shadow-card border-t-4 border-t-primary">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <LordIcon src={LORD_ICONS.target} size={24} colors="primary:#ffffff,secondary:#ffffff" />
              </div>
              <div>
                <div className="font-display font-bold text-sm">Liens Utiles</div>
                <div className="text-xs text-muted-foreground">Ressources institutionnelles</div>
              </div>
            </div>
            <div className="space-y-2">
              {[
                { icon: "fa-solid fa-hospital", name: "Ministère de la Santé", desc: "Actualités, textes, programmes", url: "https://www.sante.gov.ma", hoverColor: "hover:border-primary/30" },
                { icon: "fa-solid fa-graduation-cap", name: "Accréditation — ENSSUP", desc: "Portail d'accréditation", url: "https://www.enssup.gov.ma", hoverColor: "hover:border-accent/30" },
                { icon: "fa-solid fa-building-columns", name: "ISPITS — Site Institutionnel", desc: "ISPITS, Agadir", url: "#", hoverColor: "hover:border-gold/30" },
              ].map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 p-3 rounded-xl bg-secondary border border-transparent ${link.hoverColor} transition-all`}>
                  <span className="text-lg text-primary"><i className={link.icon} aria-hidden="true" /></span>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{link.name}</p>
                    <p className="text-xs text-muted-foreground">{link.desc}</p>
                  </div>
                  <span className="text-muted-foreground text-sm"><i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" /></span>
                </a>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Quick nav + Institution */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <AnimatedSection delay={0.35}>
          <div className="bg-navy rounded-xl p-6 shadow-card">
            <div className="flex items-center gap-2 mb-4">
              <LordIcon src={LORD_ICONS.home} size={24} colors="primary:#FFD700,secondary:#FFD700" />
              <span className="font-display font-bold text-sm text-navy-foreground">Navigation</span>
            </div>
            <div className="space-y-1">
              {[
                { label: "Accueil", page: "accueil", icon: "fa-solid fa-house" },
                { label: "Curriculum Vitae", page: "cv", icon: "fa-solid fa-id-card" },
                { label: "Licence Sage-femme", page: "licence", icon: "fa-solid fa-baby" },
                { label: "Licence Diététique", page: "licence", icon: "fa-solid fa-apple-whole" },
                { label: "Master PAU", page: "master", icon: "fa-solid fa-medal" },
              ].map((item, i) => (
                <button
                  key={i}
                  onClick={() => onNavigate(item.page)}
                  className="w-full text-left flex items-center gap-3 text-navy-foreground/70 hover:text-navy-foreground text-sm px-3 py-2 rounded-lg hover:bg-navy-foreground/5 transition-all">
                  <i className={`${item.icon} text-primary text-xs w-4 text-center`} aria-hidden="true" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <div className="bg-navy rounded-xl p-6 shadow-card">
            <div className="flex items-center gap-2 mb-4">
              <LordIcon src={LORD_ICONS.computer} size={24} colors="primary:#FFD700,secondary:#FFD700" />
              <span className="font-display font-bold text-sm text-navy-foreground">Institution</span>
            </div>
            <p className="text-navy-foreground/70 text-sm leading-relaxed mb-4">
              Institut Supérieur des Professions Infirmières et Techniques de Santé (ISPITS)
              <br />
              <span className="text-navy-foreground/50"><i className="fa-solid fa-location-dot mr-1" aria-hidden="true" />Agadir, Maroc</span>
            </p>
            <div className="space-y-2">
              <a href="https://ispits.sante.gov.ma" target="_blank" rel="noopener" className="flex items-center gap-2 text-primary/80 hover:text-primary text-sm transition-colors">
                <i className="fa-solid fa-globe" aria-hidden="true" /> ispits.sante.gov.ma
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Contact Form */}
      <AnimatedSection delay={0.45}>
        <div className="bg-card rounded-xl p-6 shadow-card border-t-4 border-t-teal">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-teal rounded-xl flex items-center justify-center">
              <LordIcon src={LORD_ICONS.email} size={24} colors="primary:#ffffff,secondary:#ffffff" />
            </div>
            <div>
              <div className="font-display font-bold text-sm">Formulaire de Contact</div>
              <div className="text-xs text-muted-foreground">N'hésitez pas à me contacter</div>
            </div>
          </div>
          <form onSubmit={handleContactSubmit} className="grid sm:grid-cols-2 gap-4">
            <Input
              placeholder="Nom"
              required
              value={contactForm.nom}
              onChange={(e) => setContactForm(prev => ({ ...prev, nom: e.target.value }))}
              className="bg-secondary border-border"
            />
            <Input
              type="email"
              placeholder="Email"
              required
              value={contactForm.email}
              onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
              className="bg-secondary border-border"
            />
            <Input
              placeholder="Sujet"
              required
              value={contactForm.sujet}
              onChange={(e) => setContactForm(prev => ({ ...prev, sujet: e.target.value }))}
              className="sm:col-span-2 bg-secondary border-border"
            />
            <Textarea
              placeholder="Votre message..."
              required
              value={contactForm.message}
              onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
              className="sm:col-span-2 bg-secondary border-border min-h-[100px]"
            />
            <div className="sm:col-span-2 flex flex-col gap-2">
              <Button type="submit" disabled={contactLoading} className="bg-teal text-teal-foreground hover:bg-teal/90 font-semibold disabled:opacity-60">
                {contactLoading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-teal-foreground border-t-transparent mr-2" />
                    Envoi en cours…
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-paper-plane mr-2" aria-hidden="true" />
                    Envoyer
                  </>
                )}
              </Button>
              {contactStatus === "success" && (
                <p className="text-sm font-medium text-accent flex items-center gap-1.5">
                  <i className="fa-solid fa-circle-check" aria-hidden="true" /> Message envoyé !
                </p>
              )}
              {contactStatus === "error" && (
                <p className="text-sm font-medium text-destructive flex items-center gap-1.5">
                  <i className="fa-solid fa-circle-xmark" aria-hidden="true" /> Échec de l'envoi, réessayez.
                </p>
              )}
            </div>
          </form>
        </div>
      </AnimatedSection>
    </div>
  );
}
