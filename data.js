const portfolioData = {
  profile: {
    name: "TULC",
    title: "Creative Designer & Visual Artist",
    subtitles: ["Graphic Design", "Branding Identity", "UI/UX & Creative Coding", "Editorial & Zine Culture"],
    bio: "Saya adalah desainer visual dan kreator independen yang berfokus pada estetika mentah, berani, dan eksperimental. Menggabungkan teknik desain grafis tradisional dengan teknologi modern untuk menciptakan identitas visual yang provokatif dan berkarakter kuat.",
    socials: [
      { name: "Instagram", url: "https://instagram.com", icon: "instagram" },
      { name: "Behance", url: "https://behance.net", icon: "behance" },
      { name: "GitHub", url: "https://github.com", icon: "github" },
      { name: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" }
    ],
    resumeUrl: "#"
  },
  skills: [
    {
      category: "Visual Design",
      items: [
        { name: "Brand Identity & Logo", level: 95 },
        { name: "Editorial & Layout Design", level: 90 },
        { name: "Poster & Print Media", level: 95 },
        { name: "Typography", level: 85 }
      ]
    },
    {
      category: "Digital & Code",
      items: [
        { name: "UI/UX Design (Figma)", level: 88 },
        { name: "HTML5 / CSS3 / Modern JS", level: 80 },
        { name: "Generative Art (p5.js)", level: 75 },
        { name: "Webflow / Framer", level: 85 }
      ]
    },
    {
      category: "Tools & Mediums",
      items: [
        { name: "Adobe Photoshop / Illustrator", level: 95 },
        { name: "Adobe InDesign", level: 90 },
        { name: "Blender (3D Modeling)", level: 70 },
        { name: "Screen Printing (Sablon)", level: 80 }
      ]
    }
  ],
  experience: [
    {
      role: "Lead Visual Designer",
      company: "Kolektif Kreatif RawSpace, Jakarta",
      period: "2024 - Sekarang",
      description: "Memimpin tim desainer untuk merancang identitas visual pameran seni, konser musik independen, dan kampanye digital merek fesyen lokal dengan konsep brutalist & kontemporer."
    },
    {
      role: "Freelance Brand Consultant",
      company: "Independen",
      period: "2022 - 2024",
      description: "Membantu UMKM dan label musik independen membangun identitas visual mereka, mulai dari logo, merchandise kustom, hingga materi promosi cetak dan digital."
    },
    {
      role: "Junior UI/UX Designer & Graphic Artist",
      company: "Studio Garis Keras, Bandung",
      period: "2021 - 2022",
      description: "Merancang antarmuka aplikasi web bertema eksperimental, mendesain poster acara mingguan, dan mengelola produksi zine bulanan kolektif."
    }
  ],
  projects: [
    {
      id: 1,
      title: "DISTORTIA: Noise Fest 2025 Identity",
      category: "branding",
      tags: ["Branding", "Poster Design", "Print"],
      description: "Identitas visual lengkap untuk festival musik noise bawah tanah. Menggunakan teknik cetak sablon manual dikombinasikan dengan tipografi terdistorsi untuk menyampaikan energi musik noise yang mentah dan bising.",
      image: "distortia.png",
      demoUrl: "#",
      githubUrl: "#"
    },
    {
      id: 2,
      title: "REBEL ZINE: Issue #04 'Digital Anarchy'",
      category: "editorial",
      tags: ["Zine", "Editorial", "Layout"],
      description: "Publikasi zine setebal 48 halaman bertema pengaruh internet terhadap budaya subkultur modern. Didesain dengan tata letak brutalist, kolase foto monokrom, dan teks bergaya mesin tik.",
      image: "rebel_zine.png",
      demoUrl: "#",
      githubUrl: ""
    },
    {
      id: 3,
      title: "BRUTALIST-UI: CSS UI Kit",
      category: "code",
      tags: ["UI/UX", "Web Development", "CSS"],
      description: "Perpustakaan komponen UI web open-source berbasis desain Brutalisme. Memiliki border tebal, warna monokrom berkontras tinggi, tanpa gradien halus, dan interaksi hover yang kaku.",
      image: "brutalist_ui.png",
      demoUrl: "#",
      githubUrl: "https://github.com"
    },
    {
      id: 4,
      title: "CHAOS GENERATOR: Generative Art App",
      category: "code",
      tags: ["Creative Coding", "p5.js", "Interactive"],
      description: "Sebuah aplikasi web interaktif menggunakan p5.js yang memungkinkan pengguna membuat pola poster grunge acak mereka sendiri berdasarkan input mouse dan suara.",
      image: "chaos_generator.png",
      demoUrl: "#",
      githubUrl: "https://github.com"
    },
    {
      id: 5,
      title: "KRONIK: Underground Merch Brand",
      category: "branding",
      tags: ["Apparel", "Merchandise", "Typography"],
      description: "Desain visual produk dan kemasan kaos eksklusif untuk merek fesyen lokal. Menampilkan grafis sablon kasar, detail stiker robek, dan kotak pengiriman bermotif halftone hitam-putih.",
      image: "kronik.png",
      demoUrl: "#",
      githubUrl: ""
    },
    {
      id: 6,
      title: "MONOSPACE: Minimalist Editorial Website",
      category: "editorial",
      tags: ["Web Design", "Figma", "Typography"],
      description: "Desain UI/UX untuk portal berita independen berfokus pada seni visual kontemporer. Menggunakan tata letak grid asimetris dan font monospace untuk menjaga estetika fungsional dan raw.",
      image: "monospace.png",
      demoUrl: "#",
      githubUrl: "#"
    }
  ]
};

// Export for browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = portfolioData;
} else {
  window.portfolioData = portfolioData;
}
