/* ==========================================================
   jogjatripp.id — script.js (vanilla JS)
   Semua konten yang sering diganti ada di bagian DATA di bawah.
   ========================================================== */
(() => {
  "use strict";

  /* ======================== KONFIGURASI ======================== */
  const CONFIG = {
    waNumber: "6285328910780",
    waDefault: "Halo jogjatripp.id, saya ingin booking paket wisata Jogja.",
  };

  /* ======================== DATA GAMBAR ========================
     Cara mengganti gambar (urutan prioritas):
     1. Taruh file di assets/images/<key>.jpg  (contoh: assets/images/prambanan.jpg)
        -> otomatis dipakai dan menggantikan URL remote.
     2. Ubah URL "remote" di bawah ini.
     3. Jika keduanya gagal dimuat, tampil placeholder gradien + nama tempat.
     ============================================================= */
  const wm = (file, w = 1200) =>
    "https://commons.wikimedia.org/wiki/Special:FilePath/" + encodeURIComponent(file) + "?width=" + w;

  const IMAGES = {
    hero:      { alt: "Panorama wisata Yogyakarta dengan Gunung Merapi",  remote: wm("Mount Merapi and Prambanan.jpg", 1920), label: "Jogja" },
    cta:       { alt: "Pemandangan sunset Yogyakarta",                      remote: wm("Prambanan sunset.jpg", 1600),            label: "Sunset Jogja" },
    prambanan: { alt: "Candi Prambanan Yogyakarta",                         remote: wm("Prambanan Temple.jpg"),                  label: "Candi Prambanan" },
    malioboro: { alt: "Jalan Malioboro Yogyakarta",                         remote: wm("Malioboro Street.jpg"),                  label: "Malioboro" },
    keraton:   { alt: "Keraton Yogyakarta",                                 remote: wm("Kraton Yogyakarta.jpg"),                 label: "Keraton Yogyakarta" },
    tamansari: { alt: "Taman Sari Yogyakarta",                              remote: wm("Taman Sari Yogyakarta.jpg"),             label: "Taman Sari" },
    merapi:    { alt: "Gunung Merapi Yogyakarta",                           remote: wm("Mount Merapi.jpg"),                      label: "Gunung Merapi" },
    timang:    { alt: "Pantai Timang Gunungkidul",                          remote: wm("Timang Beach.jpg"),                      label: "Pantai Timang" },
    pindul:    { alt: "Goa Pindul cave tubing Gunungkidul",                 remote: wm("Goa Pindul.jpg"),                        label: "Goa Pindul" },
    borobudur: { alt: "Candi Borobudur Magelang",                           remote: wm("Borobudur Temple.jpg"),                  label: "Borobudur" },
    pinus:     { alt: "Hutan Pinus Mangunan Yogyakarta",                    remote: wm("Hutan Pinus Mangunan.jpg"),              label: "Hutan Pinus Mangunan" },
    heha:      { alt: "HeHa Sky View Yogyakarta",                           remote: wm("HeHa Sky View.jpg"),                     label: "HeHa Sky View" },
    sunset:    { alt: "Sunset di Yogyakarta",                               remote: wm("Sunset Yogyakarta.jpg"),                 label: "Sunset Jogja" },
    kuliner:   { alt: "Kuliner khas Jogja gudeg",                           remote: wm("Gudeg Yogyakarta.jpg"),                  label: "Kuliner Jogja" },
    jeep:      { alt: "Jeep Gumuk Pasir Parangtritis",                      remote: wm("Gumuk Pasir Parangkusumo.jpg"),          label: "Jeep Gumuk Pasir" },
    pantai:    { alt: "Pantai Gunungkidul Yogyakarta",                      remote: wm("Indrayanti Beach.jpg"),                  label: "Pantai Gunungkidul" },
  };

  /* ======================== DATA KONTEN ======================== */
  const DESTINATIONS = [
    { img: "prambanan", name: "Candi Prambanan", text: "Menikmati kemegahan candi Hindu terbesar di Indonesia.", match: "prambanan" },
    { img: "malioboro", name: "Malioboro", text: "Jelajahi pusat keramaian, kuliner, belanja, dan budaya Jogja.", match: "malioboro" },
    { img: "keraton",   name: "Keraton Yogyakarta", text: "Kenali sejarah dan budaya Kesultanan Yogyakarta.", match: "keraton" },
    { img: "tamansari", name: "Taman Sari", text: "Pesona bangunan bersejarah dengan arsitektur unik.", match: "taman sari" },
    { img: "merapi",    name: "Gunung Merapi", text: "Rasakan petualangan seru di kaki Gunung Merapi.", match: "merapi" },
    { img: "timang",    name: "Pantai Timang", text: "Nikmati panorama laut Gunungkidul yang spektakuler.", match: "timang" },
    { img: "pindul",    name: "Goa Pindul", text: "Petualangan cave tubing menyusuri sungai bawah tanah.", match: "pindul" },
    { img: "borobudur", name: "Borobudur", text: "Jelajahi salah satu destinasi warisan budaya paling terkenal di Indonesia.", match: "borobudur" },
    { img: "pinus",     name: "Hutan Pinus Mangunan", text: "Spot alam yang sejuk dan cocok untuk menikmati sunrise.", match: "pinus" },
    { img: "heha",      name: "HeHa Sky View", text: "Menikmati panorama Jogja dari ketinggian.", match: "heha" },
  ];

  const PACKAGES = [
    { id: "explore",   img: "merapi",    name: "Explore Jogja",        price: 700, badges: ["Best Seller"],
      dests: ["Lava Tour Merapi", "Candi Prambanan", "Hutan Pinus", "Picnic Land"] },
    { id: "heritage",  img: "keraton",   name: "Jogja Heritage",       price: 700, badges: ["Popular"],
      dests: ["Keraton", "Taman Sari", "Candi Borobudur", "Malioboro"] },
    { id: "adventure", img: "jeep",      name: "Jogja Adventure",      price: 700, badges: [],
      dests: ["Jeep Gumuk Pasir", "Pantai / area Gunungkidul", "Obelix Sea View", "Malioboro"] },
    { id: "gunkid",    img: "timang",    name: "Gunungkidul Trip",     price: 800, badges: ["Popular"],
      dests: ["Goa Pindul", "Pantai Timang", "Pantai Gunungkidul", "HeHa Sky View"] },
    { id: "borobudur", img: "borobudur", name: "Borobudur & Jogja",    price: 800, badges: [],
      dests: ["Candi Borobudur", "VW Safari", "Sungai Mudal", "Malioboro"] },
  ];
  // Info bersama untuk kartu paket. Sesuaikan dengan kondisi sebenarnya.
  const PKG_INFO = { rating: "4.9", duration: "± 10–12 jam", capacity: "Mobil s.d. 6 orang" };

  const CUSTOM_PKG = {
    name: "Paket Bebas Sesuai Keinginanmu",
    items: ["Pilih destinasi sendiri", "Sunrise / sunset trip", "Kids friendly", "Bebas menentukan waktu", "Itinerary dapat disesuaikan"],
  };

  const FACILITIES = [
    { i: "car",    t: "Mobil + BBM + Driver" },
    { i: "pin",    t: "Penjemputan hotel / stasiun Yogyakarta" },
    { i: "bag",    t: "Antar ke tempat oleh-oleh" },
    { i: "user",   t: "Driver berpengalaman" },
    { i: "clock",  t: "Itinerary fleksibel" },
    { i: "pencil", t: "Bisa custom destinasi" },
    { i: "users",  t: "Cocok untuk keluarga & group" },
    { i: "camera", t: "Dokumentasi perjalanan" },
  ];

  const WHY = [
    { i: "wallet",  t: "Harga Transparan", d: "Tidak ada biaya tersembunyi." },
    { i: "smile",   t: "Driver Ramah", d: "Driver profesional dan mengenal berbagai destinasi Jogja." },
    { i: "clock",   t: "Flexible Trip", d: "Bebas menyesuaikan itinerary." },
    { i: "sparkle", t: "Nyaman", d: "Kendaraan bersih dan nyaman." },
    { i: "wa",      t: "Booking Mudah", d: "Booking langsung melalui WhatsApp." },
    { i: "compass", t: "Banyak Destinasi", d: "Mulai wisata budaya, alam, pantai hingga adventure." },
  ];

  // ar = rasio gambar (lebar / tinggi) agar galeri terlihat masonry
  const GALLERY = [
    { img: "prambanan", ar: "4 / 5" }, { img: "borobudur", ar: "1 / 1" }, { img: "malioboro", ar: "4 / 3" },
    { img: "merapi", ar: "3 / 4" },    { img: "timang", ar: "4 / 3" },    { img: "pindul", ar: "1 / 1" },
    { img: "tamansari", ar: "3 / 4" }, { img: "keraton", ar: "4 / 3" },   { img: "pinus", ar: "4 / 5" },
    { img: "heha", ar: "4 / 3" },      { img: "sunset", ar: "1 / 1" },    { img: "kuliner", ar: "4 / 3" },
  ];

  const ITINERARY = [
    { t: "08:00", d: "Penjemputan" },
    { t: "09:00", d: "Candi Prambanan" },
    { t: "11:30", d: "Keraton Yogyakarta" },
    { t: "13:00", d: "Makan siang" },
    { t: "14:00", d: "Taman Sari" },
    { t: "16:00", d: "Malioboro" },
    { t: "18:00", d: "Sunset / dinner" },
    { t: "20:00", d: "Kembali ke hotel" },
  ];

  const TESTIMONIALS = [
    { q: "Trip-nya sangat menyenangkan. Driver ramah dan itinerary bisa disesuaikan.", n: "Andi", c: "Jakarta" },
    { q: "Mobil nyaman, tempat wisata banyak dan proses booking sangat mudah.", n: "Rina", c: "Bandung" },
    { q: "Cocok untuk liburan keluarga. Anak-anak juga sangat menikmati.", n: "Dimas", c: "Surabaya" },
  ];

  const FAQS = [
    { q: "Apakah bisa custom destinasi?", a: "Bisa. Kamu bebas memilih destinasi dan urutan kunjungan. Kirim daftar tempat yang ingin dikunjungi lewat WhatsApp, kami bantu susun itinerary-nya." },
    { q: "Apakah harga sudah termasuk driver?", a: "Ya. Harga paket sudah termasuk mobil dan driver yang berpengalaman." },
    { q: "Apakah BBM sudah termasuk?", a: "Ya, BBM sudah termasuk dalam paket. Biaya tiket masuk wisata, parkir khusus, dan makan dapat berbeda untuk tiap destinasi — tanyakan rinciannya saat booking." },
    { q: "Apakah bisa dijemput di hotel?", a: "Bisa. Kami menjemput di hotel atau penginapan di area Yogyakarta sesuai jam yang kamu pilih." },
    { q: "Apakah bisa dari Stasiun Yogyakarta?", a: "Bisa. Penjemputan di Stasiun Yogyakarta (Tugu) maupun Stasiun Lempuyangan dapat diatur. Kirim jadwal kedatangan kereta agar driver siap menunggu." },
    { q: "Apakah bisa booking untuk group?", a: "Bisa. Untuk rombongan besar, kami bantu atur kendaraan yang sesuai dengan jumlah peserta. Hubungi kami via WhatsApp untuk penawaran terbaik." },
    { q: "Apakah bisa perjalanan 2 hari atau lebih?", a: "Bisa. Kami melayani trip multi-hari. Sebutkan tanggal dan destinasi yang diinginkan, lalu kami susun itinerary dan harganya." },
    { q: "Bagaimana cara melakukan booking?", a: "Klik tombol Booking via WhatsApp, kirim tanggal perjalanan, jumlah orang, dan paket atau destinasi pilihanmu. Kami akan membalas dengan konfirmasi dan detail perjalanan." },
  ];

  /* ======================== IKON (SVG inline) ======================== */
  const ICONS = {
    check:  "M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z",
    star:   "M12 17.3 18.2 21l-1.6-7L22 9.2l-7.2-.6L12 2 9.2 8.6 2 9.2 7.4 14l-1.6 7z",
    pin:    "M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z",
    leaf:   "M12 1C7 6 4 9.5 4 14a8 8 0 0 0 7 7.9V11h2v10.9A8 8 0 0 0 20 14c0-4.500-3-8-8-13z",
    wa:     "M12 2a10 10 0 0 0-8.600 15.100L2 22l5-1.300A10 10 0 1 0 12 2zm5.200 14.100c-.2.600-1.300 1.200-1.800 1.200-.5.100-1 .2-3.300-.7-2.800-1.200-4.600-4-4.700-4.200-.1-.2-1.100-1.500-1.100-2.800s.7-2 1-2.300c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.500l.9 2.100c.1.200.1.400 0 .5l-.4.600c-.1.200-.3.300-.1.600.2.300.8 1.300 1.700 2.100 1.200 1 2.100 1.300 2.400 1.500.3.100.5.100.6-.1l.9-1c.2-.3.4-.2.6-.1l2 1c.3.100.5.200.5.300.1.200.1.800-.1 1.400z",
    ig:     "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm5 3.500a4.500 4.500 0 1 1 0 9 4.500 4.500 0 0 1 0-9zm0 2a2.500 2.500 0 1 0 0 5 2.500 2.500 0 0 0 0-5zm5.300-3.700a1.100 1.100 0 1 1 0 2.200 1.100 1.100 0 0 1 0-2.200z",
    globe:  "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 2c.9 1.200 1.700 3.200 1.900 6.700h-3.800C10.300 7.200 11.100 5.200 12 4zM4.300 13h3.600c.1 1.800.5 3.500 1.100 4.800A8 8 0 0 1 4.300 13zm3.600-2H4.300A8 8 0 0 1 9 6.200C8.400 7.500 8 9.200 7.900 11zM12 20c-.9-1.200-1.700-3.200-1.900-6.700h3.800C13.700 16.800 12.900 18.800 12 20zm3-2.200c.6-1.300 1-3 1.100-4.800h3.600A8 8 0 0 1 15 17.800zM16.100 11c-.1-1.800-.5-3.500-1.100-4.800A8 8 0 0 1 19.700 11z",
    up:     "M12 5l-7 7 1.400 1.400L11 8.800V20h2V8.800l4.600 4.600L19 12z",
    car:    "M5 11l1.500-4.500A2 2 0 0 1 8.400 5h7.200a2 2 0 0 1 1.900 1.500L19 11a2 2 0 0 1 2 2v5h-2v2h-3v-2H8v2H5v-2H3v-5a2 2 0 0 1 2-2zm2.100 0h9.800l-1.100-3.500H8.200zM6.500 15a1.500 1.500 0 1 0 0-3 1.500 1.500 0 0 0 0 3zm11 0a1.500 1.500 0 1 0 0-3 1.500 1.500 0 0 0 0 3z",
    bag:    "M6 7V6a6 6 0 0 1 12 0v1h3l-1 15H4L3 7zm2 0h8V6a4 4 0 0 0-8 0z",
    user:   "M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-4.400 0-8 2.200-8 5v3h16v-3c0-2.800-3.600-5-8-5z",
    users:  "M16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 2c-2.700 0-8 1.300-8 4v2h16v-2c0-2.700-5.300-4-8-4zm8 0c-.3 0-.7 0-1 .1 1.200.9 2 2 2 3.900v2h6v-2c0-2.700-5.300-4-7-4z",
    clock:  "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 5h-2v6l5 3 1-1.700-4-2.300z",
    pencil: "M3 17.250V21h3.750L17.810 9.940l-3.750-3.750zM20.710 7.040a1 1 0 0 0 0-1.410l-2.340-2.340a1 1 0 0 0-1.410 0l-1.830 1.830 3.750 3.750z",
    camera: "M9 3 7.200 5H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3.200L15 3zm3 14a4.500 4.500 0 1 1 0-9 4.500 4.500 0 0 1 0 9z",
    wallet: "M21 7H5a1 1 0 0 1 0-2h14V3H5a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h16a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1zm-3 8a1.500 1.500 0 1 1 0-3 1.500 1.500 0 0 1 0 3z",
    smile:  "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM8.500 9a1.500 1.500 0 1 1 0 3 1.500 1.500 0 0 1 0-3zm7 0a1.500 1.500 0 1 1 0 3 1.500 1.500 0 0 1 0-3zM12 18c-2.300 0-4.200-1.400-5-3.400h10c-.8 2-2.700 3.400-5 3.400z",
    sparkle:"M12 2l2.400 6.600L21 11l-6.600 2.400L12 20l-2.400-6.600L3 11l6.600-2.400z",
    compass:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm3.500 6.500-2 5-5 2 2-5z",
    sun:    "M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM11 1h2v3h-2zM11 20h2v3h-2zM1 11h3v2H1zM20 11h3v2h-3z",
  };
  const icon = (n) => `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="${ICONS[n] || ""}"/></svg>`;
  const hydrateIcons = (root = document) =>
    root.querySelectorAll("[data-icon]:not([data-ready])").forEach((el) => {
      el.innerHTML = icon(el.dataset.icon);
      el.dataset.ready = "1";
    });

  /* ======================== UTIL ======================== */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const rp = (k) => "Rp" + (k * 1000).toLocaleString("id-ID");
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const waLink = (msg) => `https://wa.me/${CONFIG.waNumber}?text=${encodeURIComponent(msg || CONFIG.waDefault)}`;

  /* Placeholder gradien jika gambar gagal dimuat */
  function placeholder(label, key = "") {
    const hues = [["#1f6b45", "#3aa874"], ["#6b4423", "#a0703f"], ["#14482e", "#f5b82e"], ["#f08a24", "#6b4423"]];
    const h = hues[[...key].reduce((a, c) => a + c.charCodeAt(0), 0) % hues.length];
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${h[0]}"/><stop offset="1" stop-color="${h[1]}"/></linearGradient></defs><rect width="800" height="600" fill="url(#g)"/><path d="M400 150c60 45 85 95 45 155-20 30-45 45-45 85 0-40-25-55-45-85-40-60-15-110 45-155z" fill="#fff" fill-opacity=".16"/><text x="400" y="470" font-family="sans-serif" font-size="40" font-weight="700" fill="#fff" text-anchor="middle">${esc(label)}</text></svg>`;
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }

  /* Muat gambar: lokal -> remote -> placeholder */
  function loadImage(el, key) {
    const d = IMAGES[key] || { alt: "", remote: "", label: key };
    const chain = [`assets/images/${key}.jpg`, d.remote, placeholder(d.label, key)].filter(Boolean);
    let i = 0;
    el.alt = d.alt;
    el.onerror = () => { i++; if (i < chain.length) el.src = chain[i]; };
    el.src = chain[0];
  }
  function imgTag(key, extra = "") {
    return `<img data-key="${key}" alt="${esc((IMAGES[key] || {}).alt || "")}" loading="lazy" decoding="async" ${extra}>`;
  }
  function hydrateImages(root = document) {
    $$("img[data-key]", root).forEach((el) => { if (!el.dataset.ready) { el.dataset.ready = "1"; loadImage(el, el.dataset.key); } });
  }
  /* Background (hero & CTA): coba satu per satu */
  function loadBackground(el, key) {
    const d = IMAGES[key];
    const chain = [`assets/images/${key}.jpg`, d.remote];
    (function next(i) {
      if (i >= chain.length) return;
      const t = new Image();
      t.onload = () => { el.style.backgroundImage = `url("${chain[i]}")`; };
      t.onerror = () => next(i + 1);
      t.src = chain[i];
    })(0);
    el.setAttribute("role", "img");
    el.setAttribute("aria-label", d.alt);
  }

  /* ======================== WHATSAPP ======================== */
  const booking = { dest: "", date: "", pax: "", pkg: "" };
  function bookingMessage() {
    const lines = [CONFIG.waDefault];
    if (booking.pkg) lines.push(`Paket: ${booking.pkg}`);
    if (booking.dest) lines.push(`Destinasi: ${booking.dest}`);
    if (booking.date) lines.push(`Tanggal: ${booking.date}`);
    if (booking.pax) lines.push(`Jumlah orang: ${booking.pax}`);
    return lines.join("\n");
  }
  function bindWA(root = document) {
    $$("[data-wa]", root).forEach((a) => {
      if (a.dataset.waBound) return;
      a.dataset.waBound = "1";
      a.href = waLink(a.dataset.waMsg);
      a.target = "_blank";
      a.rel = "noopener";
      a.addEventListener("click", (e) => {
        e.preventDefault();
        const msg = a.dataset.waMsg || (booking.pkg || booking.dest || booking.date || booking.pax ? bookingMessage() : CONFIG.waDefault);
        window.open(waLink(msg), "_blank", "noopener");
      });
    });
  }

  /* ======================== RENDER ======================== */
  function renderDestinations() {
    $("#destGrid").innerHTML = DESTINATIONS.map((d, i) => `
      <article class="dest reveal" style="--d:${(i % 4) * 70}ms">
        ${imgTag(d.img)}
        <div class="dest__shade"></div>
        <div class="dest__body">
          <h3>${esc(d.name)}</h3>
          <p>${esc(d.text)}</p>
          <a class="dest__btn" href="#" data-wa data-wa-msg="Halo jogjatripp.id, saya ingin tanya trip ke ${esc(d.name)}.">Explore</a>
        </div>
      </article>`).join("");
  }

  function pkgMessage(p) {
    const extra = [];
    if (booking.date) extra.push(`Tanggal: ${booking.date}`);
    if (booking.pax) extra.push(`Jumlah orang: ${booking.pax}`);
    return [`Halo jogjatripp.id, saya ingin booking paket ${p.name}.`, ...extra].join("\n");
  }

  function renderPackages() {
    const cards = PACKAGES.map((p, i) => `
      <article class="pkg reveal" id="pkg-${p.id}" data-pkg="${p.id}" style="--d:${(i % 3) * 80}ms">
        <div class="pkg__img">
          ${imgTag(p.img)}
          <div class="pkg__badges">${p.badges.map((b, k) => `<span class="badge ${k ? "badge--gold" : ""}">${esc(b)}</span>`).join("")}</div>
          <span class="pkg__rating"><i data-icon="star"></i> ${PKG_INFO.rating}</span>
        </div>
        <div class="pkg__body">
          <h3>${esc(p.name)}</h3>
          <div class="pkg__meta">
            <span><i data-icon="pin"></i> ${p.dests.length} destinasi</span>
            <span><i data-icon="clock"></i> ${PKG_INFO.duration}</span>
            <span><i data-icon="users"></i> ${PKG_INFO.capacity}</span>
          </div>
          <ul class="pkg__list">${p.dests.map((d) => `<li><i data-icon="check"></i><span>${esc(d)}</span></li>`).join("")}</ul>
          <div class="pkg__price">
            <small>Harga mulai</small>
            <b>Mulai dari ${rp(p.price).replace(".000", "K")} <span>/ mobil</span></b>
          </div>
          <div class="pkg__actions">
            <button type="button" class="btn btn--outline" data-detail="${p.id}">Lihat Detail</button>
            <a href="#" class="btn btn--primary" data-wa data-pkg-book="${p.id}">Booking Paket</a>
          </div>
        </div>
      </article>`).join("");

    const custom = `
      <article class="pkg pkg--custom reveal" id="pkg-custom" data-pkg="custom" style="--d:160ms">
        <div class="pkg__body">
          <div class="pkg__custom-ico"><i data-icon="pencil"></i></div>
          <h3>${esc(CUSTOM_PKG.name)}</h3>
          <ul class="pkg__list">${CUSTOM_PKG.items.map((d) => `<li><i data-icon="check"></i><span>${esc(d)}</span></li>`).join("")}</ul>
          <a href="#" class="btn btn--primary" data-wa data-wa-msg="Halo jogjatripp.id, saya ingin membuat custom trip Jogja.">Buat Custom Trip</a>
        </div>
      </article>`;
    $("#pkgGrid").innerHTML = cards + custom;

    // pesan WA dinamis
    $$("[data-pkg-book]").forEach((a) => {
      const p = PACKAGES.find((x) => x.id === a.dataset.pkgBook);
      a.dataset.waMsg = pkgMessage(p);
      a.addEventListener("click", () => { a.dataset.waMsg = pkgMessage(p); }, true);
    });
  }

  function renderStatic() {
    $("#facGrid").innerHTML = FACILITIES.map((f, i) => `
      <li class="fac reveal" style="--d:${(i % 4) * 60}ms"><span class="fac__ico"><i data-icon="${f.i}"></i></span><h3>${esc(f.t)}</h3></li>`).join("");
    $("#whyGrid").innerHTML = WHY.map((w, i) => `
      <article class="why reveal" style="--d:${(i % 3) * 80}ms"><div class="why__ico"><i data-icon="${w.i}"></i></div><h3>${esc(w.t)}</h3><p>${esc(w.d)}</p></article>`).join("");
    $("#gallery").innerHTML = GALLERY.map((g, i) => `
      <button type="button" class="g-item" data-idx="${i}" style="--ar:${g.ar}" aria-label="Perbesar foto ${esc(IMAGES[g.img].label)}">
        ${imgTag(g.img)}<span class="g-item__ov">${esc(IMAGES[g.img].label)}</span>
      </button>`).join("");
    $("#timeline").innerHTML = ITINERARY.map((s, i) => `
      <li class="tl reveal" style="--d:${i * 60}ms"><time>${s.t}</time><h3>${esc(s.d)}</h3></li>`).join("");
    $("#testiGrid").innerHTML = TESTIMONIALS.map((t, i) => `
      <figure class="testi reveal" style="--d:${i * 80}ms">
        <div class="testi__stars" aria-label="Rating 5 dari 5">★★★★★</div>
        <blockquote>“${esc(t.q)}”</blockquote>
        <footer><span class="avatar" aria-hidden="true">${esc(t.n[0])}</span><div><b>${esc(t.n)}</b><span>${esc(t.c)}</span></div></footer>
      </figure>`).join("");
    $("#faqList").innerHTML = FAQS.map((f, i) => `
      <div class="faq__item reveal">
        <h3><button type="button" class="faq__q" aria-expanded="false" aria-controls="faq-a-${i}" id="faq-q-${i}">${esc(f.q)}</button></h3>
        <div class="faq__a" id="faq-a-${i}" role="region" aria-labelledby="faq-q-${i}"><p>${esc(f.a)}</p></div>
      </div>`).join("");
  }

  /* ======================== QUICK BOOKING ======================== */
  function setupQuickForm() {
    const dest = $("#qDest"), pkg = $("#qPkg"), pax = $("#qPax"), date = $("#qDate"), note = $("#quickNote");

    dest.innerHTML = `<option value="">Semua destinasi</option>` + DESTINATIONS.map((d) => `<option value="${esc(d.name)}" data-match="${esc(d.match)}">${esc(d.name)}</option>`).join("");
    pkg.innerHTML = `<option value="">Semua paket</option>` + PACKAGES.map((p) => `<option value="${p.id}">${esc(p.name)}</option>`).join("") + `<option value="custom">Custom Trip</option>`;
    pax.innerHTML = Array.from({ length: 12 }, (_, i) => `<option value="${i + 1}">${i + 1} orang</option>`).join("") + `<option value="13+">13 orang atau lebih</option>`;
    pax.value = "2";

    const today = new Date(); today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    date.min = today.toISOString().split("T")[0];

    function filterPackages(show) {
      $$("#pkgGrid .pkg").forEach((c) => c.classList.toggle("hidden", !show(c.dataset.pkg)));
      $("#pkgEmpty")?.remove();
    }
    function resetFilter() {
      filterPackages(() => true);
      note.innerHTML = "";
    }

    $("#quickForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const opt = dest.selectedOptions[0];
      const match = (opt && opt.dataset.match) || "";
      booking.dest = dest.value;
      booking.date = date.value ? new Date(date.value + "T00:00").toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "";
      booking.pax = pax.value ? pax.value + " orang" : "";
      booking.pkg = pkg.value && pkg.value !== "custom" ? PACKAGES.find((p) => p.id === pkg.value).name : (pkg.value === "custom" ? "Custom Trip" : "");

      let visible = 0;
      filterPackages((id) => {
        let ok = true;
        if (pkg.value) ok = id === pkg.value;
        else if (match) {
          const p = PACKAGES.find((x) => x.id === id);
          ok = id === "custom" || (p && p.dests.join(" ").toLowerCase().includes(match));
        }
        if (ok) visible++;
        return ok;
      });
      $$("#pkgGrid .pkg:not(.hidden)").forEach((c) => c.classList.add("in"));

      const count = $$("#pkgGrid .pkg:not(.hidden)").length;
      note.innerHTML = `Menampilkan ${count} paket sesuai pilihanmu. <button type="button" id="resetFilter">Tampilkan semua paket</button>`;
      $("#resetFilter").addEventListener("click", resetFilter);
      if (pax.value === "13+" || Number(pax.value) > 6) {
        note.innerHTML += ` Untuk lebih dari 6 orang, kami bantu atur kendaraan yang sesuai.`;
      }
      $("#paket").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* ======================== DETAIL PAKET ======================== */
  function setupDetail() {
    const dlg = $("#detailModal"), body = $("#dmBody");
    document.addEventListener("click", (e) => {
      const b = e.target.closest("[data-detail]");
      if (!b) return;
      const p = PACKAGES.find((x) => x.id === b.dataset.detail);
      body.innerHTML = `
        <div class="modal__img">${imgTag(p.img)}</div>
        <div class="modal__content">
          <h3 id="dmTitle">${esc(p.name)}</h3>
          <p>Mulai dari <b>${rp(p.price)}</b> / mobil (bukan per orang).</p>
          <div><h4>Destinasi</h4><ul>${p.dests.map((d) => `<li><i data-icon="check"></i>${esc(d)}</li>`).join("")}</ul></div>
          <div><h4>Sudah termasuk</h4><ul>
            <li><i data-icon="check"></i>Mobil + BBM + driver</li>
            <li><i data-icon="check"></i>Penjemputan hotel / stasiun Yogyakarta</li>
            <li><i data-icon="check"></i>Itinerary fleksibel</li></ul></div>
          <p style="font-size:.88rem;color:var(--muted)">${PKG_INFO.duration} · ${PKG_INFO.capacity}. Tiket masuk wisata dan makan mengikuti tiap destinasi.</p>
          <a href="#" class="btn btn--primary" data-wa data-wa-msg="${esc(pkgMessage(p))}">Booking Paket</a>
        </div>`;
      hydrateIcons(body); hydrateImages(body); bindWA(body);
      dlg.showModal();
    });
    $("#dmClose").addEventListener("click", () => dlg.close());
    dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
  }

  /* ======================== LIGHTBOX ======================== */
  function setupLightbox() {
    const dlg = $("#lightbox"), img = $("#lbImg"), cap = $("#lbCap");
    let idx = 0;
    function show(i) {
      idx = (i + GALLERY.length) % GALLERY.length;
      const key = GALLERY[idx].img;
      loadImage(img, key);
      cap.textContent = IMAGES[key].label;
    }
    $("#gallery").addEventListener("click", (e) => {
      const b = e.target.closest(".g-item");
      if (!b) return;
      show(+b.dataset.idx);
      dlg.showModal();
    });
    $("#lbClose").addEventListener("click", () => dlg.close());
    $("#lbPrev").addEventListener("click", () => show(idx - 1));
    $("#lbNext").addEventListener("click", () => show(idx + 1));
    dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") show(idx - 1);
      if (e.key === "ArrowRight") show(idx + 1);
    });
  }

  /* ======================== FAQ ======================== */
  function setupFAQ() {
    $("#faqList").addEventListener("click", (e) => {
      const q = e.target.closest(".faq__q");
      if (!q) return;
      const item = q.closest(".faq__item"), panel = $("#" + q.getAttribute("aria-controls"));
      const open = !item.classList.contains("open");
      $$(".faq__item.open").forEach((o) => {
        if (o === item) return;
        o.classList.remove("open");
        $(".faq__q", o).setAttribute("aria-expanded", "false");
        $(".faq__a", o).style.height = "0px";
      });
      item.classList.toggle("open", open);
      q.setAttribute("aria-expanded", String(open));
      panel.style.height = open ? panel.scrollHeight + "px" : "0px";
    });
  }

  /* ======================== NAVBAR ======================== */
  function setupNav() {
    const nav = $("#nav"), burger = $("#burger"), menu = $("#navMenu"), toTop = $("#toTop");
    const onScroll = () => {
      nav.classList.toggle("scrolled", scrollY > 40 || menu.classList.contains("open"));
      toTop.classList.toggle("show", scrollY > 700);
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const setOpen = (o) => {
      menu.classList.toggle("open", o);
      burger.setAttribute("aria-expanded", String(o));
      burger.setAttribute("aria-label", o ? "Tutup menu" : "Buka menu");
      onScroll();
    };
    burger.addEventListener("click", () => setOpen(!menu.classList.contains("open")));
    menu.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
    document.addEventListener("click", (e) => { if (!e.target.closest(".nav")) setOpen(false); });
    toTop.addEventListener("click", () => scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));

    // tandai menu aktif
    const links = $$(".nav__menu a[href^='#']:not(.btn)");
    const spy = new IntersectionObserver((es) => {
      es.forEach((en) => {
        if (en.isIntersecting) links.forEach((l) => l.removeAttribute("aria-current"));
        if (en.isIntersecting) { const l = links.find((x) => x.getAttribute("href") === "#" + en.target.id); if (l) l.setAttribute("aria-current", "true"); }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    ["home", "destinasi", "paket", "galeri", "tentang", "faq", "kontak"].forEach((id) => { const s = document.getElementById(id); if (s) spy.observe(s); });
  }

  /* ======================== ANIMASI ======================== */
  function setupReveal() {
    const io = new IntersectionObserver((es, o) => {
      es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); o.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    $$(".reveal").forEach((el) => io.observe(el));

    // counter
    const cio = new IntersectionObserver((es, o) => {
      es.forEach((en) => {
        if (!en.isIntersecting) return;
        o.unobserve(en.target);
        $$("[data-count]", en.target).forEach((b) => {
          const to = +b.dataset.count, suf = b.dataset.suffix || "", dur = 1200, t0 = performance.now();
          if (reduceMotion) { b.textContent = to + suf; return; }
          (function tick(t) {
            const p = Math.min((t - t0) / dur, 1);
            b.textContent = Math.round((1 - Math.pow(1 - p, 3)) * to) + suf;
            if (p < 1) requestAnimationFrame(tick);
          })(t0);
        });
      });
    }, { threshold: 0.4 });
    const stats = $("#stats"); if (stats) cio.observe(stats);
  }

  function setupParallax() {
    if (reduceMotion) return;
    const bg = $("#heroBg"); let ticking = false;
    addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (scrollY < innerHeight * 1.2) bg.style.transform = `translate3d(0, ${scrollY * 0.25}px, 0)`;
        ticking = false;
      });
    }, { passive: true });
  }

  /* ======================== INIT ======================== */
  function init() {
    renderDestinations();
    renderPackages();
    renderStatic();
    hydrateIcons();
    hydrateImages();
    loadBackground($("#heroBg"), "hero");
    loadBackground($("#ctaBg"), "cta");
    setupQuickForm();
    setupDetail();
    setupLightbox();
    setupFAQ();
    setupNav();
    setupReveal();
    setupParallax();
    bindWA();

    const hide = () => setTimeout(() => $("#loader").classList.add("hide"), 350);
    if (document.readyState === "complete") hide(); else addEventListener("load", hide);
    setTimeout(() => $("#loader").classList.add("hide"), 3500); // jaga-jaga
  }

  document.addEventListener("DOMContentLoaded", init);
})();
