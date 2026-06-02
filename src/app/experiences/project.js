export const projects = [
  {
    id: "monitorx",
    title: "MonitorX – Server Monitoring Integrated SNMPv3",
    role: "Full-Stack Web Developer",
    period: "Feb 2025 – Mar 2025",
    tech: ["Next.js", "PostgreSQL", "JavaScript", "Express.js", "Sequelize ORM", "SNMPv3"],
    category: "web",
    bullets: [
      "Designed and developed the full-stack architecture, handling both front-end and back-end development for a responsive monitoring dashboard.",
      "Implemented monitoring features for SLA, ping, and response time, providing real-time insights into server performance.",
      "Integrated SNMPv3 protocol to retrieve and display disk usage, CPU usage, and RAM usage from servers.",
      "Developed data storage using Sequelize ORM with Express.js and PostgreSQL, ensuring structured data management.",
      "Created a user-friendly dashboard, visualizing real-time metrics with interactive charts and logs."
    ]
  },
  {
    id: "disaster-sentiment",
    title: "Disaster Sentiment Analyst Classifier",
    role: "Machine Learning Engineer",
    period: "Oct 2024 – Jan 2025",
    tech: ["Python", "Machine Learning", "NLP", "e-Hak Cipta"],
    category: "ml",
    bullets: [
      "Developed an ML-based system for sentiment analysis on earthquake disaster social media posts, officially licensed through e-Hak Cipta.",
      "Cleaned, tokenized, and preprocessed social media datasets for high-accuracy text classification.",
      "Trained and evaluated classifier models, analyzing performance metrics to verify system reliability."
    ]
  },
  {
    id: "diabet-ulcus",
    title: "Diabet Ulcus Thermal SVM Classification",
    role: "Machine Learning Engineer",
    period: "Sept 2024 – Jan 2025",
    tech: ["Python", "Support Vector Machine", "HOG", "GLCM", "KMeans", "LBP"],
    category: "ml",
    bullets: [
      "Developed an SVM-based classification model for diabetic ulcer detection on thermal imaging data.",
      "Implemented and compared feature extraction techniques: CED, GLCM, KMeans, LBP, LBP-GLCM, and HOG.",
      "Achieved 95% classification accuracy using HOG (Histogram of Oriented Gradients), outperforming traditional methods.",
      "Optimized SVM hyperparameters, reducing false positives and improving detection reliability."
    ]
  },
  {
    id: "bone-fractures",
    title: "Automated Bone Fractures Detection (VGG16)",
    role: "Machine Learning Engineer",
    period: "Sept 2024 – Feb 2025",
    tech: ["Python", "Deep Learning", "CNN", "VGG16", "Transfer Learning"],
    category: "ml",
    bullets: [
      "Designed and trained a Convolutional Neural Network (CNN) using VGG16 to classify bone fractures from X-ray images.",
      "Performed data augmentation and preprocessing, including normalization and enhancement.",
      "Implemented transfer learning with pre-trained VGG16 weights to accelerate convergence.",
      "Published research findings in Jurnal RESTI (SINTA 2 index journal)."
    ]
  },
  {
    id: "mbkm-dashboard",
    title: "Data Visualization MBKM Enrollment Dashboard",
    role: "Data Analyst",
    period: "October 2024",
    tech: ["Google Looker Studio", "Data Visualization", "Data Analysis"],
    category: "data",
    bullets: [
      "Created an interactive Looker Studio dashboard to analyze and visualize MBKM program enrollment metrics.",
      "Cleaned and structured raw enrollment datasets, ensuring accuracy and pipeline consistency.",
      "Designed user-friendly chart layouts for reporting stakeholders."
    ]
  },
  {
    id: "lexicon-sentiment",
    title: "Automatic Sentiment Labeling using Lexicon Based",
    role: "Machine Learning Engineer",
    period: "Aug – Sept 2024",
    tech: ["Python", "Text Classification", "Lexicon-Based", "TSV Dictionary"],
    category: "ml",
    bullets: [
      "Created a lexicon-based sentiment dictionary, storing positive and negative word scores in a TSV file.",
      "Implemented logic calculating compound sentiment scores for text inputs (positive if > 0, negative if < 0).",
      "Preprocessed text data (tokenization, lowercasing, stopword removal) to improve scoring accuracy.",
      "Developed a scalable sentiment analysis pipeline for large-scale datasets."
    ]
  },
  {
    id: "naive-bayes-emotion",
    title: "Automatic Emotion Labeling using Naïve Bayes",
    role: "Machine Learning Engineer",
    period: "Oct – Dec 2023",
    tech: ["Python", "Naïve Bayes", "Text Classification", "NLP"],
    category: "ml",
    bullets: [
      "Developed a text classification pipeline using Naïve Bayes to classify and label emotional states in textual data.",
      "Preprocessed, tokenized, and extracted features using TF-IDF vectorization from natural language text.",
      "Evaluated model using confusion matrices, precision, recall, and F1-scores."
    ]
  },
  {
    id: "suhuf-admin",
    title: "Management Suhuf Kertaseni Nusantara Dashboard",
    role: "Front End Developer",
    period: "Aug – Oct 2023",
    tech: ["Next.js", "JavaScript", "Admin Dashboard", "Stock Monitoring"],
    category: "web",
    bullets: [
      "Designed and built a responsive admin dashboard interface in Next.js.",
      "Implemented a dynamic product management system (CRUD) and inventory tracking.",
      "Integrated analytics visualizations showing visitor counts, product views, and sales trends."
    ]
  },
  {
    id: "suhuf-ecommerce",
    title: "Suhuf Kertaseni Nusantara E-Commerce Website",
    role: "Front End Developer",
    period: "Aug – Oct 2023",
    tech: ["Next.js", "JavaScript", "Responsive Design", "Product Catalog"],
    category: "web",
    bullets: [
      "Developed an interactive front-end e-commerce website using Next.js.",
      "Built a dynamic catalog allowing seamless search, filtering, and detail inspections.",
      "Optimized UI/UX design with responsive layouts and fluid accessibility features."
    ]
  }
];
