"use client";

import { FormEvent, useEffect, useState } from "react";

const PHONE = "+917006982655";
const WHATSAPP = "917006982655";

const destinations = [
  {
    name: "Srinagar",
    label: "The soul of the valley",
    description: "Wake on Dal Lake, drift past floating gardens and follow old-city lanes to timeless Mughal gardens.",
    detail: "Dal Lake · Houseboats · Mughal Gardens",
    distance: "Your arrival point",
    stay: "2–3 nights",
    image: "https://images.pexels.com/photos/16498513/pexels-photo-16498513.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1600",
  },
  {
    name: "Gulmarg",
    label: "Meadow above the clouds",
    description: "Ride one of the world’s highest gondolas, chase winter powder or walk flower-rich summer meadows.",
    detail: "Gondola · Snow · Alpine meadows",
    distance: "50 km from Srinagar",
    stay: "1–2 nights",
    image: "https://images.pexels.com/photos/30077915/pexels-photo-30077915.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1600",
  },
  {
    name: "Pahalgam",
    label: "Rivers, pines & slow days",
    description: "Follow the Lidder River into pine forests, cinematic valleys and gentle days made for families.",
    detail: "Betaab Valley · Baisaran · Lidder River",
    distance: "90 km from Srinagar",
    stay: "2 nights",
    image: "https://images.pexels.com/photos/7562495/pexels-photo-7562495.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1600",
  },
  {
    name: "Sonamarg",
    label: "The meadow of gold",
    description: "Glacial rivers, high passes and dramatic mountain roads make this Kashmir at its wildest.",
    detail: "Thajiwas Glacier · Sindh River · High passes",
    distance: "80 km from Srinagar",
    stay: "Day trip / 1 night",
    image: "https://images.pexels.com/photos/10679347/pexels-photo-10679347.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1600",
  },
  {
    name: "Gurez",
    label: "Kashmir’s hidden chapter",
    description: "Cross Razdan Pass to log huts, Dardic villages and the blue-green Kishanganga River.",
    detail: "Razdan Pass · Habba Khatoon · Log huts",
    distance: "125 km from Srinagar",
    stay: "2–3 nights",
    image: "https://images.pexels.com/photos/26752840/pexels-photo-26752840.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1600",
  },
];

const packages = [
  {
    no: "01",
    title: "Kashmir Essential",
    duration: "5 nights · 6 days",
    price: "From ₹14,999 / person*",
    places: "Srinagar · Gulmarg · Pahalgam · Sonamarg",
    note: "The balanced first Kashmir journey: houseboat mornings, alpine snow, river valleys and private transfers.",
    image: "https://images.pexels.com/photos/38978298/pexels-photo-38978298.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
    tag: "Most loved",
  },
  {
    no: "02",
    title: "Kashmir Grand Escape",
    duration: "6 nights · 7 days",
    price: "From ₹18,999 / person*",
    places: "Classic circuit · Doodhpathri",
    note: "A slower, fuller valley story with quiet Doodhpathri meadows and handpicked comfort stays.",
    image: "https://images.pexels.com/photos/35027239/pexels-photo-35027239.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
    tag: "Slow travel",
  },
  {
    no: "03",
    title: "Luxury Kashmir Honeymoon",
    duration: "5 nights · 6 days",
    price: "From ₹34,999 / couple*",
    places: "Dal Lake · Gulmarg · Pahalgam",
    note: "Private cabs, romantic houseboats, curated stays and unhurried moments designed for two.",
    image: "https://images.pexels.com/photos/12025044/pexels-photo-12025044.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
    tag: "For two",
  },
  {
    no: "04",
    title: "Gurez Explorer",
    duration: "8 nights · 9 days",
    price: "From ₹27,999 / person*",
    places: "Gurez · Gulmarg · Sonamarg",
    note: "Remote Kashmir for curious travellers—Razdan Pass, riverside villages, log huts and mountain light.",
    image: "https://images.pexels.com/photos/14262339/pexels-photo-14262339.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
    tag: "Hidden Kashmir",
  },
  {
    no: "05",
    title: "Kashmir Family Escape",
    duration: "5 nights · 6 days",
    price: "From ₹15,999 / person*",
    places: "Srinagar · Gulmarg · Pahalgam",
    note: "Age-aware pacing, private transport, family-friendly stays and support that is always close.",
    image: "https://images.pexels.com/photos/34998312/pexels-photo-34998312.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
    tag: "All generations",
  },
  {
    no: "06",
    title: "Kashmir + Vaishno Devi",
    duration: "8 nights · 9 days",
    price: "From ₹24,999 / person*",
    places: "Katra · Srinagar · Gulmarg · Pahalgam",
    note: "A thoughtfully coordinated spiritual and scenic journey with local assistance from Katra to Kashmir.",
    image: "https://images.pexels.com/photos/29575030/pexels-photo-29575030.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
    tag: "Sacred journey",
  },
];

const seasons = [
  { name: "Spring", months: "March — May", line: "Tulips, almond blossom and crisp lake mornings.", places: "Srinagar · Badamwari · Pahalgam", mood: "Bloom & renewal", image: "https://images.pexels.com/photos/26752840/pexels-photo-26752840.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=1800" },
  { name: "Summer", months: "June — August", line: "Green meadows, cool valleys and long family days.", places: "Gulmarg · Sonamarg · Gurez", mood: "Meadows & adventure", image: "https://images.pexels.com/photos/7562495/pexels-photo-7562495.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=1800" },
  { name: "Autumn", months: "September — November", line: "Golden chinar leaves and calm, cinematic light.", places: "Srinagar · Pahalgam · Old City", mood: "Colour & quiet", image: "https://images.pexels.com/photos/14262339/pexels-photo-14262339.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=1800" },
  { name: "Winter", months: "December — February", line: "Snow-covered valleys, fire-warmed rooms and powder days.", places: "Gulmarg · Srinagar · Pahalgam", mood: "Snow & wonder", image: "https://images.pexels.com/photos/35672516/pexels-photo-35672516.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=1800" },
];

const reviews = [
  { quote: "Panda made our honeymoon flawless. The houseboat, candlelight dinner and snow at Gulmarg felt personal and warm. The team checked on us every day.", name: "Ananya & Vikram", city: "Mumbai", trip: "Luxury Kashmir Honeymoon" },
  { quote: "Travelling with kids and elderly parents felt completely stress-free. The itinerary was paced perfectly and every request was handled instantly.", name: "The Sharma Family", city: "Jaipur", trip: "Kashmir Family Escape" },
  { quote: "Gurez was unreal. The log-hut stay and drive over Razdan Pass were the highlight of our year—real local knowledge made the difference.", name: "Rohit & Friends", city: "Bengaluru", trip: "Gurez Explorer" },
  { quote: "A beautiful first taste of Kashmir. The sunrise shikara ride was beyond what photos can show. Transparent planning and no hidden surprises.", name: "Meera Iyer", city: "Hyderabad", trip: "Kashmir Essential" },
];

const galleryImages = [
  { src: "/gallery/guest-arrival-01.webp", alt: "A family welcomed at Srinagar airport with flowers by Panda Tours and Travels", label: "A snowy Srinagar welcome" },
  { src: "/gallery/guest-arrival-02.webp", alt: "Guests from Dubai sharing a welcome moment with Panda Tours and Travels", label: "From Dubai to Kashmir" },
  { src: "/gallery/guest-arrival-03.webp", alt: "Senior guests welcomed at Srinagar airport with flower bouquets", label: "Warm welcomes, every age" },
  { src: "/gallery/guest-arrival-04.webp", alt: "An extended family welcomed to Kashmir by Panda Tours and Travels", label: "Kashmir, all together" },
  { src: "/gallery/guest-arrival-05.webp", alt: "A family holding flowers during their Kashmir airport welcome", label: "The holiday starts here" },
  { src: "/gallery/guest-arrival-06.webp", alt: "A family greeted at Srinagar airport with flowers and a welcome sign", label: "Arrivals made personal" },
  { src: "/gallery/guest-arrival-07.webp", alt: "Three travellers greeted with flower bouquets at Srinagar airport", label: "Flowers at first hello" },
  { src: "/gallery/guest-arrival-08.webp", alt: "Fresh flower bouquets and a Panda Tours welcome sign at Srinagar airport", label: "Ready before you land" },
  { src: "/gallery/guest-arrival-09.webp", alt: "A senior couple welcomed beside their private car at Srinagar airport", label: "Care from airport to airport" },
];

const galleryTop = galleryImages.slice(0, 5);
const galleryBottom = galleryImages.slice(5);

const faqs = [
  ["What is the best time to visit Kashmir?", "April to June is loved for blossom and green meadows; September and October bring golden chinar; December to February is best for snow. We tailor the route to the season you choose."],
  ["Can every package be customized?", "Yes. Dates, pace, hotels, meals, transport, destinations and experiences can all be adjusted around your group and budget."],
  ["Do you arrange private transport?", "Yes. Our journeys can include private airport transfers and a dedicated local cab for sightseeing, with vehicle size matched to your group."],
  ["Is Kashmir comfortable for families and senior citizens?", "Absolutely. We plan shorter drives, comfortable stays, gentle sightseeing and realistic rest time, with 24×7 local assistance throughout."],
  ["What is included in the displayed package price?", "Package inclusions vary by dates and stay category. Your final quote clearly lists hotels, meals, transport, activities, inclusions and exclusions before you confirm."],
];

function whatsapp(message: string) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
}

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function PremiumHome() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [destination, setDestination] = useState(0);
  const [season, setSeason] = useState(0);
  const [review, setReview] = useState(0);
  const [faq, setFaq] = useState(0);
  const [formStatus, setFormStatus] = useState("");
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    if (!loading) return;

    const startedAt = Date.now();
    const previousOverflow = document.body.style.overflow;
    let hideTimer: number | undefined;
    const fallbackTimer = window.setTimeout(() => setLoading(false), 3200);
    const finishLoading = () => {
      const minimumDelay = Math.max(0, 1250 - (Date.now() - startedAt));
      hideTimer = window.setTimeout(() => setLoading(false), minimumDelay);
    };

    document.body.style.overflow = "hidden";
    if (document.readyState === "complete") finishLoading();
    else window.addEventListener("load", finishLoading, { once: true });

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("load", finishLoading);
      window.clearTimeout(fallbackTimer);
      if (hideTimer !== undefined) window.clearTimeout(hideTimer);
    };
  }, [loading]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setReview((value) => (value + 1) % reviews.length), 6500);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (lightbox === null) return;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(null);
      if (event.key === "ArrowLeft") setLightbox((current) => current === null ? null : (current - 1 + galleryImages.length) % galleryImages.length);
      if (event.key === "ArrowRight") setLightbox((current) => current === null ? null : (current + 1) % galleryImages.length);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightbox]);

  function submitPlanner(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const message = `Hello Panda Tours & Travels 👋\n\nPlease design my Kashmir journey.\nName: ${form.get("name")}\nPhone: ${form.get("phone")}\nTravel month: ${form.get("month") || "Flexible"}\nDuration: ${form.get("duration")}\nTravellers: ${form.get("travellers")}\nJourney style: ${form.get("style")}\nCity: ${form.get("city") || "Not shared"}\n\nPlease send me a custom itinerary.`;
    window.open(whatsapp(message), "_blank", "noopener,noreferrer");
    setFormStatus("Lovely—your trip brief is ready. WhatsApp is opening so our Srinagar team can take it from here.");
  }

  const activeDestination = destinations[destination];
  const activeSeason = seasons[season];

  return (
    <main className="site-shell">
      <div className={`site-loader ${loading ? "is-active" : "is-complete"}`} role="status" aria-live="polite" aria-hidden={!loading}>
        <div className="loader-orbit" aria-hidden="true"><i /><i /><i /></div>
        <div className="loader-inner">
          <span className="loader-kicker">Srinagar · Kashmir</span>
          <div className="loader-logo"><img src="/brand/panda-tours-logo.jpeg" alt="Panda Tours and Travels" /></div>
          <div className="loader-track"><i /></div>
          <p>Preparing your Kashmir journey <span>✦</span></p>
        </div>
        <span className="loader-index" aria-hidden="true">34.0837° N · 74.7973° E</span>
      </div>

      <header className={`topbar ${scrolled ? "topbar-scrolled" : ""}`}>
        <div className="shell nav-inner">
          <a className="brand" href="#home" aria-label="Panda Tours and Travels home" onClick={() => setMenuOpen(false)}>
            <span className="brand-logo"><img src="/brand/panda-tours-logo.jpeg" alt="Panda Tours and Travels" /></span>
          </a>
          <nav className="desktop-nav" aria-label="Primary navigation">
            <a href="#destinations">Destinations</a>
            <a href="#journeys">Journeys</a>
            <a href="#experiences">Experiences</a>
            <a href="#gallery">Gallery</a>
            <a href="#about">Our story</a>
          </nav>
          <a className="nav-cta" href="#planner">Plan your escape <Arrow /></a>
          <button className={`menu-toggle ${menuOpen ? "is-open" : ""}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}><span /><span /></button>
        </div>
        <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
          <nav>{[["Destinations", "#destinations"], ["Journeys", "#journeys"], ["Experiences", "#experiences"], ["Guest gallery", "#gallery"], ["Our story", "#about"], ["Plan your trip", "#planner"]].map(([label, href], index) => <a key={href} href={href} onClick={() => setMenuOpen(false)}><small>0{index + 1}</small>{label}<Arrow /></a>)}</nav>
          <div><a href={`tel:${PHONE}`}>+91 70069 82655</a><a href={whatsapp("Hello Panda Tours & Travels, I would like to plan a Kashmir trip.")} target="_blank" rel="noreferrer">WhatsApp our Srinagar team</a></div>
        </div>
      </header>

      <section className="hero" id="home">
        <img className="hero-image" src="https://images.pexels.com/photos/33466692/pexels-photo-33466692.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=2000" alt="A shikara gliding across Dal Lake beneath the Kashmir mountains" />
        <div className="hero-shade" />
        <div className="hero-content shell">
          <p className="eyebrow hero-eyebrow"><span /> Local experts · Bespoke journeys</p>
          <h1><span>Kashmir,</span><br /><em>beautifully yours.</em></h1>
          <p className="hero-copy">Private journeys through quiet lakes, alpine meadows and snow-draped valleys—crafted around your pace by our Srinagar team.</p>
          <div className="hero-actions">
            <a className="button button-gold" href="#planner">Design my journey <Arrow /></a>
            <a className="button button-glass" href="#destinations">Explore Kashmir <span>↓</span></a>
          </div>
        </div>
        <div className="hero-proof shell">
          <div><strong>24×7</strong><span>Local assistance</span></div>
          <div><strong>100%</strong><span>Tailor-made plans</span></div>
          <div><strong>4 seasons</strong><span>One magical valley</span></div>
          <p>Government-registered · Srinagar-based</p>
        </div>
      </section>

      <section className="ticker" aria-label="Travel assurances"><div className="ticker-track">{["Local Kashmir experts", "Private transfers", "Handpicked stays", "Family friendly", "Honeymoon specialists", "24×7 travel assistance", "Transparent planning", "Local Kashmir experts", "Private transfers", "Handpicked stays", "Family friendly", "Honeymoon specialists", "24×7 travel assistance", "Transparent planning"].map((item, index) => <span key={`${item}-${index}`}><i>✦</i>{item}</span>)}</div></section>

      <section className="story section-ivory" id="about">
        <div className="shell story-grid">
          <div className="story-art reveal">
            <img src="https://images.pexels.com/photos/12025044/pexels-photo-12025044.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=900" alt="Traditional shikara on Dal Lake" loading="lazy" />
            <span className="story-stamp">Kashmir<br />is home.</span>
            <p className="vertical-note">34.0837° N · 74.7973° E</p>
          </div>
          <div className="story-copy reveal">
            <p className="eyebrow eyebrow-dark"><span /> Panda Tours & Travels</p>
            <h2>Not a fixed tour.<br /><em>Your Kashmir story.</em></h2>
            <p className="lead">We are rooted in Srinagar. That means your route, comfort and local support are never afterthoughts. We listen first, then shape the valley around the way you want to travel.</p>
            <div className="story-values">
              <article><b>01</b><h3>Locally crafted</h3><p>Real-time advice from people who call Kashmir home.</p></article>
              <article><b>02</b><h3>Privately yours</h3><p>Your vehicle, stays and pace—designed for your people.</p></article>
              <article><b>03</b><h3>Quietly supported</h3><p>One local team, before arrival and throughout the journey.</p></article>
            </div>
            <a className="text-link" href={whatsapp("Hello Panda Tours & Travels, I would like to speak to a local Kashmir expert.")} target="_blank" rel="noreferrer">Meet your local travel team <Arrow /></a>
          </div>
        </div>
      </section>

      <section className="destinations section-dark" id="destinations">
        <div className="shell section-heading reveal"><div><p className="eyebrow"><span /> The valley, curated</p><h2>Five places.<br /><em>Infinite stories.</em></h2></div><p>Choose a point on the valley. We’ll connect it into a journey with the right rhythm, route and season.</p></div>
        <div className="shell destination-explorer reveal">
          <div className="destination-tabs" role="tablist" aria-label="Kashmir destinations">{destinations.map((item, index) => <button key={item.name} role="tab" aria-selected={destination === index} className={destination === index ? "active" : ""} onClick={() => setDestination(index)}><small>0{index + 1}</small><span>{item.name}</span><i>↗</i></button>)}</div>
          <div className="destination-visual" key={activeDestination.name}>
            <img src={activeDestination.image} alt={`${activeDestination.name}, Kashmir`} loading="lazy" />
            <div className="destination-caption"><p>{activeDestination.label}</p><h3>{activeDestination.name}</h3><span>{activeDestination.detail}</span></div>
          </div>
          <article className="destination-info" key={`${activeDestination.name}-info`}>
            <span className="destination-index">0{destination + 1} / 05</span>
            <p>{activeDestination.description}</p>
            <dl><div><dt>From Srinagar</dt><dd>{activeDestination.distance}</dd></div><div><dt>Ideal time</dt><dd>{activeDestination.stay}</dd></div></dl>
            <a className="text-link text-link-light" href={whatsapp(`Hello Panda Tours & Travels, please include ${activeDestination.name} in my Kashmir journey.`)} target="_blank" rel="noreferrer">Plan {activeDestination.name} <Arrow /></a>
          </article>
        </div>
      </section>

      <section className="journeys section-ivory" id="journeys">
        <div className="shell section-heading section-heading-dark reveal"><div><p className="eyebrow eyebrow-dark"><span /> Curated journeys</p><h2>Begin with<br /><em>a beautiful idea.</em></h2></div><p>Every journey is a starting point. Your dates, stays, pace and experiences stay completely flexible.</p></div>
        <div className="shell package-grid">{packages.map((item) => <article className="package-card reveal" key={item.title}>
          <div className="package-image"><img src={item.image} alt={`${item.title} Kashmir journey`} loading="lazy" /><span>{item.tag}</span><b>{item.no}</b></div>
          <div className="package-body"><p>{item.duration}</p><h3>{item.title}</h3><span className="package-places">{item.places}</span><p className="package-note">{item.note}</p><div><strong>{item.price}</strong><a href={whatsapp(`Hello Panda Tours & Travels, I am interested in the ${item.title} (${item.duration}). Please customize it for me.`)} target="_blank" rel="noreferrer" aria-label={`Enquire about ${item.title}`}><Arrow /></a></div></div>
        </article>)}</div>
        <p className="price-note shell">*Starting prices are indicative and change with dates, hotel category, transport and group size. Your personalized quote will show every inclusion clearly.</p>
      </section>

      <section className="experiences section-warm" id="experiences">
        <div className="shell experience-layout">
          <div className="experience-intro reveal"><p className="eyebrow eyebrow-dark"><span /> More than sightseeing</p><h2>The moments<br /><em>in between.</em></h2><p>It’s the quiet details you remember: saffron tea on a houseboat, a first footprint in snow, a market found without a map.</p><a href="#planner" className="text-link">Build them into my trip <Arrow /></a></div>
          <div className="experience-mosaic">
            <article className="experience-tile tile-large reveal"><img src="https://images.pexels.com/photos/10679349/pexels-photo-10679349.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1200" alt="Snowy Gulmarg landscape" loading="lazy" /><div><span>01</span><h3>Fresh snow<br />in Gulmarg</h3></div></article>
            <article className="experience-tile reveal"><img src="https://images.pexels.com/photos/16498513/pexels-photo-16498513.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=900" alt="Dal Lake at sunrise" loading="lazy" /><div><span>02</span><h3>Shikara<br />at sunrise</h3></div></article>
            <article className="experience-tile tile-ink reveal"><div><span>03</span><h3>Kahwa &<br />Kashmiri kitchens</h3><p>Warm hospitality, traditional flavours and stories shared across the table.</p></div></article>
            <article className="experience-tile tile-wide reveal"><img src="https://images.pexels.com/photos/35027239/pexels-photo-35027239.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=1200" alt="Mountain road through Kashmir" loading="lazy" /><div><span>04</span><h3>Roads less travelled</h3></div></article>
          </div>
        </div>
      </section>

      <section className="travel-styles">
        {[{ eyebrow: "For two", title: "Kashmir, for two.", copy: "Private cabs, romantic houseboats, mountain-view stays and small details you’ll remember together.", image: "https://images.pexels.com/photos/29964225/pexels-photo-29964225.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1200", cta: "Design our honeymoon" }, { eyebrow: "For every generation", title: "Kashmir together.", copy: "Comfort-first pacing, family-friendly stays, gentle sightseeing and support that keeps everyone at ease.", image: "https://images.pexels.com/photos/37898606/pexels-photo-37898606.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1200", cta: "Plan a family journey" }, { eyebrow: "For unhurried days", title: "Senior travel, considered.", copy: "Shorter drives, thoughtful rest time, accessible stays and private assistance for a relaxed valley experience.", image: "https://images.pexels.com/photos/7332516/pexels-photo-7332516.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1000&w=1200", cta: "Speak to our team" }].map((item) => <article className="travel-style reveal" key={item.eyebrow}><img src={item.image} alt={item.title} loading="lazy" /><div><p className="eyebrow"><span /> {item.eyebrow}</p><h3>{item.title}</h3><p>{item.copy}</p><a className="button button-glass" href={whatsapp(`Hello Panda Tours & Travels, I would like to plan: ${item.title}`)} target="_blank" rel="noreferrer">{item.cta} <Arrow /></a></div></article>)}
      </section>

      <section className="season-section">
        <img key={activeSeason.image} className="season-image" src={activeSeason.image} alt={`${activeSeason.name} in Kashmir`} loading="lazy" />
        <div className="season-overlay" />
        <div className="shell season-content">
          <div className="reveal"><p className="eyebrow"><span /> A four-season valley</p><h2>Kashmir changes.<br /><em>The magic doesn’t.</em></h2><div className="season-tabs" role="tablist">{seasons.map((item, index) => <button key={item.name} className={season === index ? "active" : ""} onClick={() => setSeason(index)} role="tab" aria-selected={season === index}>{item.name}</button>)}</div></div>
          <article className="season-card" key={activeSeason.name}><span>{activeSeason.months}</span><h3>{activeSeason.name} in Kashmir</h3><p>{activeSeason.line}</p><dl><div><dt>Consider</dt><dd>{activeSeason.places}</dd></div><div><dt>For the feeling of</dt><dd>{activeSeason.mood}</dd></div></dl><a href={whatsapp(`Hello Panda Tours & Travels, I want to visit Kashmir in ${activeSeason.name}. Please suggest the best journey.`)} target="_blank" rel="noreferrer">Plan for {activeSeason.name} <Arrow /></a></article>
        </div>
      </section>

      <section className="process section-dark">
        <div className="shell process-heading reveal"><p className="eyebrow"><span /> Effortless by design</p><h2>From “Maybe Kashmir?”<br /><em>to “Welcome to Srinagar.”</em></h2></div>
        <div className="shell process-grid">{[["01", "Tell us your idea", "Dates, people, pace and the feeling you want."], ["02", "Receive your journey", "A clear route, stay plan and transparent quote."], ["03", "Make it yours", "Refine every detail until it feels exactly right."], ["04", "Arrive & exhale", "We meet you in Srinagar and stay close throughout."]].map(([no, title, text]) => <article className="process-step reveal" key={no}><span>{no}</span><div className="process-line"><i /></div><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className="reviews section-ivory">
        <div className="shell review-layout reveal">
          <div className="review-side"><p className="eyebrow eyebrow-dark"><span /> Guest stories</p><h2>Carried home<br /><em>in memory.</em></h2><div className="review-controls"><button onClick={() => setReview((review - 1 + reviews.length) % reviews.length)} aria-label="Previous review">←</button><span>0{review + 1} / 0{reviews.length}</span><button onClick={() => setReview((review + 1) % reviews.length)} aria-label="Next review">→</button></div></div>
          <article className="review-card" key={reviews[review].name}><div className="stars" aria-label="5 out of 5 stars">★★★★★</div><blockquote>“{reviews[review].quote}”</blockquote><footer><span className="review-avatar">{reviews[review].name.charAt(0)}</span><div><b>{reviews[review].name}</b><small>{reviews[review].city} · {reviews[review].trip}</small></div></footer></article>
        </div>
      </section>

      <section className="guest-gallery section-dark" id="gallery">
        <div className="shell gallery-heading reveal">
          <div><p className="eyebrow"><span /> Real guests · Real welcomes</p><h2>Every journey begins<br /><em>with a welcome.</em></h2></div>
          <div className="gallery-heading-copy"><p>Not stock moments. These are our guests arriving in Kashmir—met with flowers, a familiar face and a local team ready from the very first hello.</p><div><span>Airport-to-airport support</span><span>Fresh-flower welcome</span><span>Local team on arrival</span></div></div>
        </div>

        <div className="gallery-rails reveal" aria-label="Panda Tours and Travels guest welcome gallery">
          <div className="gallery-rail gallery-rail-forward">
            {[...galleryTop, ...galleryTop].map((item, index) => (
              <button className="gallery-card gallery-card-portrait" type="button" key={`top-${item.src}-${index}`} onClick={() => setLightbox(index % galleryTop.length)} aria-label={`Open photo: ${item.label}`} aria-hidden={index >= galleryTop.length} tabIndex={index >= galleryTop.length ? -1 : 0}>
                <img src={item.src} alt={index < galleryTop.length ? item.alt : ""} loading="lazy" decoding="async" />
                <span><small>Guest story · 0{(index % galleryTop.length) + 1}</small><b>{item.label}</b><i>View photo ↗</i></span>
              </button>
            ))}
          </div>
          <div className="gallery-rail gallery-rail-reverse">
            {[...galleryBottom, ...galleryBottom].map((item, index) => (
              <button className="gallery-card gallery-card-landscape" type="button" key={`bottom-${item.src}-${index}`} onClick={() => setLightbox(5 + (index % galleryBottom.length))} aria-label={`Open photo: ${item.label}`} aria-hidden={index >= galleryBottom.length} tabIndex={index >= galleryBottom.length ? -1 : 0}>
                <img src={item.src} alt={index < galleryBottom.length ? item.alt : ""} loading="lazy" decoding="async" />
                <span><small>Guest story · 0{5 + (index % galleryBottom.length) + 1}</small><b>{item.label}</b><i>View photo ↗</i></span>
              </button>
            ))}
          </div>
        </div>

        <div className="shell gallery-foot reveal"><span>01 — 09</span><p>Pause the moving gallery by hovering. Select any photograph to see the full story frame.</p><a href={whatsapp("Hello Panda Tours & Travels, I saw your guest welcome gallery and would like to plan my Kashmir arrival.")} target="_blank" rel="noreferrer">Plan my welcome <Arrow /></a></div>
      </section>

      <section className="planner-section" id="planner">
        <div className="shell planner-layout">
          <div className="planner-copy reveal"><p className="eyebrow"><span /> Your journey starts here</p><h2>A few details.<br /><em>A Kashmir made for you.</em></h2><p>Share the outline. A local travel specialist will turn it into a thoughtful itinerary and transparent quote.</p><div className="planner-contact"><span>Prefer a conversation?</span><a href={`tel:${PHONE}`}>+91 70069 82655</a><a href="mailto:pandatoursandtravels@gmail.com">pandatoursandtravels@gmail.com</a></div></div>
          <form className="planner-form reveal" onSubmit={submitPlanner}>
            <div className="field"><label htmlFor="name">Your name *</label><input id="name" name="name" required placeholder="Full name" /></div>
            <div className="field"><label htmlFor="phone">WhatsApp number *</label><input id="phone" name="phone" required inputMode="tel" placeholder="For your itinerary" /></div>
            <div className="field"><label htmlFor="city">Travelling from</label><input id="city" name="city" placeholder="Your city" /></div>
            <div className="field"><label htmlFor="month">Travel month</label><input id="month" name="month" type="month" /></div>
            <div className="field"><label htmlFor="duration">Duration</label><select id="duration" name="duration" defaultValue="5–6 days"><option>3–4 days</option><option>5–6 days</option><option>7–8 days</option><option>9+ days</option><option>Flexible</option></select></div>
            <div className="field"><label htmlFor="travellers">Travellers</label><select id="travellers" name="travellers" defaultValue="2 adults"><option>2 adults</option><option>Family of 3–4</option><option>5+ travellers</option><option>Group</option></select></div>
            <div className="field field-wide"><label htmlFor="style">Journey style</label><select id="style" name="style" defaultValue="Premium escape"><option>Premium escape</option><option>Luxury honeymoon</option><option>Family holiday</option><option>Senior-friendly tour</option><option>Adventure & hidden valleys</option><option>Spiritual journey</option></select></div>
            <button className="button button-gold form-button" type="submit">Create my Kashmir plan <Arrow /></button>
            {formStatus && <p className="form-status" role="status">{formStatus}</p>}
            <small className="form-privacy">By continuing, you agree to be contacted about this trip. We never share your details.</small>
          </form>
        </div>
      </section>

      <section className="faq section-warm">
        <div className="shell faq-layout"><div className="reveal"><p className="eyebrow eyebrow-dark"><span /> Practical answers</p><h2>Before you<br /><em>pack your bags.</em></h2><p>For anything specific to your dates or group, speak directly with our local Srinagar team.</p><a className="text-link" href={whatsapp("Hello Panda Tours & Travels, I have a question about visiting Kashmir.")} target="_blank" rel="noreferrer">Ask us on WhatsApp <Arrow /></a></div><div className="faq-list reveal">{faqs.map(([question, answer], index) => <article className={faq === index ? "open" : ""} key={question}><button onClick={() => setFaq(faq === index ? -1 : index)} aria-expanded={faq === index}><span>0{index + 1}</span>{question}<i>{faq === index ? "−" : "+"}</i></button><div><p>{answer}</p></div></article>)}</div></div>
      </section>

      <section className="office section-ivory">
        <div className="shell office-layout reveal"><div><p className="eyebrow eyebrow-dark"><span /> Meet us in Srinagar</p><h2>Come say<br /><em>hello.</em></h2><p>Panda Tours & Travels<br />Airport Road / Baghat / Barzulla Bridge,<br />Srinagar, Jammu & Kashmir — 190005</p><div><a className="button button-ink" href="https://www.google.com/maps/search/?api=1&query=Panda+Tours+and+Travels+Srinagar" target="_blank" rel="noreferrer">Get directions <Arrow /></a><a className="button button-outline" href={`tel:${PHONE}`}>Call office</a></div></div><aside><span>Local time · Srinagar</span><strong>Always close<br />when you’re here.</strong><p>Airport-to-airport support, route guidance and a familiar voice on WhatsApp—throughout your stay.</p><a href={whatsapp("Hello Panda Tours & Travels, I would like to meet or speak with your Srinagar team.")} target="_blank" rel="noreferrer">Start a conversation <Arrow /></a></aside></div>
      </section>

      <section className="final-cta">
        <img src="https://images.pexels.com/photos/38978298/pexels-photo-38978298.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=1900" alt="Dal Lake and the mountains of Kashmir" loading="lazy" /><div className="final-overlay" /><div className="shell reveal"><p className="eyebrow"><span /> Your Kashmir story starts here</p><h2>You dream it.<br /><em>We plan the rest.</em></h2><div><a className="button button-gold" href="#planner">Plan my Kashmir trip <Arrow /></a><a className="button button-glass" href={whatsapp("Hello Panda Tours & Travels, I am ready to plan my Kashmir trip.")} target="_blank" rel="noreferrer">WhatsApp a travel expert <Arrow /></a></div></div>
      </section>

      <footer className="footer">
        <div className="shell footer-top"><div><a className="brand footer-brand" href="#home"><span className="brand-logo"><img src="/brand/panda-tours-logo.jpeg" alt="Panda Tours and Travels" /></span></a><p>Our guests are our honour.<br />Our valley is yours to discover.</p></div><div><h3>Explore</h3><a href="#destinations">Srinagar</a><a href="#destinations">Gulmarg</a><a href="#destinations">Pahalgam</a><a href="#destinations">Gurez Valley</a></div><div><h3>Journeys</h3><a href="#journeys">Kashmir packages</a><a href="#experiences">Honeymoon</a><a href="#experiences">Family travel</a><a href="#experiences">Senior-friendly tours</a></div><div><h3>Contact</h3><a href={`tel:${PHONE}`}>+91 70069 82655</a><a href="mailto:pandatoursandtravels@gmail.com">Email our team</a><a href="https://www.instagram.com/pandatoursandtravels" target="_blank" rel="noreferrer">Instagram ↗</a><a href={whatsapp("Hello Panda Tours & Travels")} target="_blank" rel="noreferrer">WhatsApp ↗</a></div></div>
        <div className="shell footer-bottom"><span>© {new Date().getFullYear()} Panda Tours & Travels</span><span>Government-registered · Srinagar-based</span><a href="#home">Back to top ↑</a></div>
      </footer>

      {lightbox !== null && (
        <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label="Guest welcome photo viewer" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" type="button" onClick={() => setLightbox(null)} aria-label="Close gallery" autoFocus>Close <span>×</span></button>
          <button className="lightbox-arrow lightbox-prev" type="button" onClick={(event) => { event.stopPropagation(); setLightbox((lightbox - 1 + galleryImages.length) % galleryImages.length); }} aria-label="Previous photo">←</button>
          <figure onClick={(event) => event.stopPropagation()}>
            <div><img src={galleryImages[lightbox].src} alt={galleryImages[lightbox].alt} /></div>
            <figcaption><span>0{lightbox + 1} / 0{galleryImages.length}</span><div><small>Panda guest story</small><b>{galleryImages[lightbox].label}</b></div></figcaption>
          </figure>
          <button className="lightbox-arrow lightbox-next" type="button" onClick={(event) => { event.stopPropagation(); setLightbox((lightbox + 1) % galleryImages.length); }} aria-label="Next photo">→</button>
        </div>
      )}

      <a className="concierge" href={whatsapp("Hello Panda Tours & Travels 👋 I would like help planning my Kashmir journey.")} target="_blank" rel="noreferrer" aria-label="Chat with a Kashmir travel expert on WhatsApp"><span>✦</span><div><small>Local expert online</small><b>Plan on WhatsApp</b></div><i>↗</i></a>
    </main>
  );
}
