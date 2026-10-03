export const projectDetails = {
  tinaku: {
    id: "tinaku",
    title: "TINAKU",
    subtitle: "Pendamping Digital Ibu Hamil Selama 1000 Hari Pertama Kehidupan",
    liveUrl: "https://tinaku.net",
    image: "/assets/tinaku-screenshot.png",
    role: "Core Developer",
    roleType: "Full-Stack Development",
    timeline: "Maret - April 2026",
    status: "DEPLOYED // PRODUCTION",
    metrics: [
      { label: "Target Focus", value: "1000 HPK", desc: "Maternal & Child Health" },
      { label: "Uptime SLA", value: "99.9%", desc: "PM2 Process Daemon on AWS" },
      { label: "Latency", value: "< 120ms", desc: "Next.js SSR Engine" },
      { label: "User Access", value: "Multilateral", desc: "Patient, Midwife, & Clinic" }
    ],
    about: [
      "TINAKU adalah platform digital inovatif berbasis web yang dirancang khusus untuk mendampingi ibu hamil selama masa krusial 1000 Hari Pertama Kehidupan.",
      "Proyek ini dikembangkan dengan tujuan mulia untuk membantu menurunkan angka kematian ibu dan bayi di Indonesia melalui sistem pemantauan mandiri, edukasi literasi KIA, dan koneksi langsung secara real-time antara pasien dengan tenaga kesehatan (Bidan/Puskesmas)."
    ],
    architecture: {
      title: "Client-to-Clinic Maternal Telemetry Pipeline",
      flow: [
        { step: "01", name: "Client PWA & Mobile Web", desc: "Antarmuka responsif Next.js untuk logging metrik harian ibu hamil." },
        { step: "02", name: "Nginx & SSL Gateway", desc: "Reverse proxy terenkripsi HTTPS dengan firewall & custom port routing." },
        { step: "03", name: "Node.js Engine (PM2)", desc: "Business logic kalkulasi skor risiko KSPR & pemantauan suplemen TTD." },
        { step: "04", name: "Clinic Command Panel", desc: "Dashboard real-time faskes untuk tindak lanjut cepat peringatan darurat." }
      ]
    },
    codeSnippet: {
      language: "javascript",
      filename: "maternal-kspr-engine.js",
      code: `export function calculateKSPRScore(riskFactors) {
  const baseScore = 2;
  const calculatedRisk = riskFactors.reduce((acc, factor) => {
    return acc + (factor.triggered ? factor.weight : 0);
  }, baseScore);

  return {
    score: calculatedRisk,
    status: calculatedRisk >= 12 ? 'HIGH_RISK_EMERGENCY' : 'ROUTINE_MONITORING',
    priority: calculatedRisk >= 12 ? 'CRITICAL_DISPATCH' : 'NORMAL'
  };
}`
    },
    features: [
      {
        icon: "Activity",
        title: "Dashboard Personal",
        description: "Pemantauan metrik penting seperti HB, Tekanan Darah, TFU, DJJ, serta visualisasi grafik kehamilan dan peningkatan berat badan."
      },
      {
        icon: "ClipboardList",
        title: "Skrining KSPR Mandiri",
        description: "Fitur deteksi dini risiko kehamilan menggunakan Kartu Skor Poedji Rochjati (KSPR) digital yang terhubung dengan dashboard Bidan."
      },
      {
        icon: "Pill",
        title: "Tracker TTD",
        description: "Kalender visual interaktif yang membantu memantau kepatuhan ibu dalam mengonsumsi suplemen zat besi harian (mencegah anemia)."
      },
      {
        icon: "ShieldAlert",
        title: "Edukasi KIA & Darurat",
        description: "Pusat literasi kesehatan berstandar buku KIA 2024 dan integrasi hotline cepat ke layanan darurat medis setempat."
      },
      {
        icon: "Users",
        title: "Manajemen Multilateral (Bidan & Faskes)",
        description: "Sistem dilengkapi dengan admin panel khusus untuk Bidan dan Fasilitas Kesehatan (Puskesmas/Rumah Sakit) agar dapat mengelola rekam jejak pasien, memantau alarm indikator peringatan dini, dan menjadwalkan pemeriksaan kuantitas secara komprehensif."
      }
    ],
    techStack: ["Node.js", "Next.js", "React", "Tailwind CSS", "AWS EC2", "PM2", "Nginx"],
    infrastructure: [
      { label: "Server Instance", value: "AWS EC2 (t3.micro Linux)", color: "bg-blue-400" },
      { label: "Process Daemon", value: "PM2 Cluster Manager", color: "bg-emerald-400" },
      { label: "Web Server", value: "Nginx Reverse Proxy", color: "bg-purple-400" },
      { label: "Security & Ports", value: "SSH Hardened + Custom Routing", color: "bg-rose-400" },
      { label: "Domain & SSL", value: "Custom Domain + Automated HTTPS", color: "bg-yellow-400" }
    ]
  },
  monitorx: {
    id: "monitorx",
    title: "MonitorX",
    subtitle: "Enterprise Server Monitoring Integrated SNMPv3 Telemetry Engine",
    liveUrl: "https://github.com/reskyadhyaksa/backend-monitoring",
    image: null,
    role: "Full-Stack Web Developer",
    roleType: "Full-Stack Development",
    timeline: "Feb 2025 – Mar 2025",
    status: "PROTOTYPE // ENTERPRISE",
    metrics: [
      { label: "Telemetry Protocol", value: "SNMPv3", desc: "authPriv SHA-256/AES" },
      { label: "Polling Rate", value: "30s Cycle", desc: "Real-time Telemetry Poller" },
      { label: "Query Speed", value: "< 25ms", desc: "Indexed Time-series DB" },
      { label: "Alert Latency", value: "Instant", desc: "Threshold SLA Monitoring" }
    ],
    about: [
      "MonitorX adalah sistem pemantauan performa server berskala enterprise yang dirancang untuk mengumpulkan dan menganalisis metrik perangkat keras secara real-time melalui protokol aman SNMPv3.",
      "Solusi ini membantu tim IT Infrastructure mendeteksi lonjakan penggunaan CPU, kebocoran RAM, ketersediaan disk, dan status latensi jaringan secara preventif sebelum terjadi downtime sistem."
    ],
    architecture: {
      title: "Enterprise Hardware Telemetry Architecture",
      flow: [
        { step: "01", name: "SNMPv3 Agent Querying", desc: "Pengambilan OID CPU, RAM, Disk, dan network traffic dari server node." },
        { step: "02", name: "Express.js Ingestion API", desc: "Validasi payload dan pemrosesan threshold alert SLA otomatis." },
        { step: "03", name: "PostgreSQL Storage Layer", desc: "Penyimpanan relasional terindeks via Sequelize ORM untuk data historis." },
        { step: "04", name: "Next.js Command Center", desc: "Visualisasi metrik grafis real-time dan notifikasi anomali infrastruktur." }
      ]
    },
    codeSnippet: {
      language: "javascript",
      filename: "snmpv3-collector.js",
      code: `const snmp = require('net-snmp');

export function pollHardwareMetrics(hostIp, securityUser) {
  const session = snmp.createV3Session(hostIp, securityUser, {
    version: snmp.Version3,
    port: 161,
    retries: 2,
    timeout: 3000
  });

  const oids = [
    '1.3.6.1.4.1.2021.10.1.3.1',
    '1.3.6.1.4.1.2021.4.6.0',
    '1.3.6.1.4.1.2021.9.1.9.1'
  ];

  return new Promise((resolve, reject) => {
    session.get(oids, (err, varbinds) => {
      session.close();
      if (err) return reject(err);
      resolve(formatTelemetry(varbinds));
    });
  });
}`
    },
    features: [
      {
        icon: "Activity",
        title: "Real-time Telemetry & SLA Tracking",
        description: "Pelacakan continuous metrik latensi ping, status response time server, dan visualisasi status uptime SLA berbasis timeline interaktif."
      },
      {
        icon: "Server",
        title: "SNMPv3 Protocol Integration",
        description: "Engine komunikasi hardware berstandar enkripsi authPriv (SHA-256 / AES-128) untuk polling beban CPU, partisi disk, dan memori RAM."
      },
      {
        icon: "Database",
        title: "Structured Time-series Storage",
        description: "Arsitektur database relasional PostgreSQL yang dioptimasi menggunakan Sequelize ORM dan Express.js untuk query agregasi data historis berkecepatan tinggi."
      },
      {
        icon: "LayoutDashboard",
        title: "Command Center Dashboard",
        description: "Antarmuka dashboard analitik interaktif yang menyajikan log notifikasi anomali, diagram grafik real-time, dan status node multi-server."
      }
    ],
    techStack: ["Next.js", "PostgreSQL", "Express.js", "Sequelize ORM", "SNMPv3", "JavaScript"],
    infrastructure: [
      { label: "Relational Database", value: "PostgreSQL 15 Engine", color: "bg-blue-400" },
      { label: "Telemetry Protocol", value: "SNMPv3 Encrypted authPriv", color: "bg-emerald-400" },
      { label: "Backend Daemon", value: "Express.js Polling Worker", color: "bg-purple-400" },
      { label: "UI Console", value: "Next.js Real-time Dashboard", color: "bg-cyan-400" }
    ]
  },
  "disaster-sentiment": {
    id: "disaster-sentiment",
    title: "Disaster Sentiment Classifier",
    subtitle: "NLP Classification Pipeline for Earthquake Disaster Emergency Streams",
    liveUrl: "https://drive.google.com/file/d/1O5iInNGf3uvicbEGjTVswVfjNXLOdfJ8/view?usp=sharing",
    image: null,
    role: "Machine Learning Engineer",
    roleType: "AI & Natural Language Processing",
    timeline: "Oct 2024 – Jan 2025",
    status: "LICENSED // e-HAK CIPTA",
    metrics: [
      { label: "Model F1-Score", value: "94.8%", desc: "High Urgency Precision" },
      { label: "Corpus Size", value: "15,000+", desc: "Disaster Emergency Posts" },
      { label: "Legal Licensing", value: "e-Hak Cipta", desc: "Kemenkumham RI Certified" },
      { label: "Inference Speed", value: "< 10ms", desc: "Batch NLP Vectorizer" }
    ],
    about: [
      "Sistem pemrosesan Natural Language Processing (NLP) tingkat lanjut yang mengklasifikasikan postingan media sosial selama bencana gempa bumi untuk mendeteksi tingkat urgensi dan sentimen publik.",
      "Karya intelektual ini telah resmi didaftarkan dan mendapatkan sertifikat lisensi Hak Cipta resmi (e-Hak Cipta) dari Kemenkumham RI."
    ],
    architecture: {
      title: "NLP Sentiment Classification Pipeline",
      flow: [
        { step: "01", name: "Social Stream Ingestion", desc: "Pengumpulan dataset teks media sosial pada periode bencana gempa bumi." },
        { step: "02", name: "Indonesian NLP Cleaning", desc: "Pembersihan teks, tokenisasi, case folding, dan normalisasi kata slang." },
        { step: "03", name: "TF-IDF Vector Space", desc: "Ekstraksi representasi fitur unigram & bigram bernilai bobot statistik." },
        { step: "04", name: "Classifier Inference", desc: "Klasifikasi polaritas sentimen dan segregasi pesan darurat mendesak." }
      ]
    },
    codeSnippet: {
      language: "python",
      filename: "disaster_sentiment_pipeline.py",
      code: `from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB

def build_nlp_pipeline():
    return Pipeline([
        ('tfidf', TfidfVectorizer(
            ngram_range=(1, 2),
            min_df=2,
            sublinear_tf=True
        )),
        ('clf', MultinomialNB(alpha=0.15))
    ])`
    },
    features: [
      {
        icon: "Cpu",
        title: "NLP Preprocessing Pipeline",
        description: "Tokenisasi teks otomatis, case folding, normalisasi slang/singkatan, dan penyaringan stopword bahasa Indonesia untuk pembersihan dataset darurat bencana."
      },
      {
        icon: "Activity",
        title: "High-Accuracy Classifier",
        description: "Model klasifikasi sentimen berbasis ML terlatih dengan evaluasi metrik presisi, recall, dan F1-score tinggi pada data teks darurat."
      },
      {
        icon: "ShieldAlert",
        title: "Emergency Urgency Detection",
        description: "Pemisahan otomatis antara laporan permohonan bantuan darurat, informasi kerusakan, dan sentimen kepanikan masyarakat."
      }
    ],
    techStack: ["Python", "Machine Learning", "NLP", "TF-IDF", "Scikit-Learn", "e-Hak Cipta"],
    infrastructure: [
      { label: "Pipeline Runtime", value: "Python NLP Scikit-Learn", color: "bg-purple-400" },
      { label: "IP Certification", value: "e-Hak Cipta Kemenkumham RI", color: "bg-emerald-400" },
      { label: "Dataset Ingestion", value: "Disaster Social Corpus", color: "bg-blue-400" }
    ]
  }
};

export function getProjectDetail(id) {
  return projectDetails[id] || null;
}

export function getAllProjectDetailIds() {
  return Object.keys(projectDetails);
}

export function getAdjacentProjects(currentId) {
  const ids = Object.keys(projectDetails);
  const currentIndex = ids.indexOf(currentId);

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  const prevIndex = (currentIndex - 1 + ids.length) % ids.length;
  const nextIndex = (currentIndex + 1) % ids.length;

  return {
    prev: projectDetails[ids[prevIndex]],
    next: projectDetails[ids[nextIndex]]
  };
}
