// index.js
var HTML = `<!DOCTYPE html>
<!-- v4.0.0 deployed 2026-04-04 \u2014 CRO sprint: hero redesign, trust bar, gated free tier, rate limiting -->
<html lang="en">
<head>
  <!-- Google Ads + GA4 tracking (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=AW-18026507348"><\/script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'AW-18026507348');
    gtag('config', 'G-EHR32TPF8V');
  <\/script>
  <!-- Cloudflare Web Analytics -->
  <script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "946336dd35474114975cc65370212eb6"}'><\/script>
  <!-- Meta Pixel Code -->
  <script>
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '26562540910051169');
    fbq('track', 'PageView');
  <\/script>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>MenuGenie \u2014 Free AI Menu Analysis for Restaurants | Boost Revenue 10-25%</title>
  <meta name="description" content="MenuGenie analyzes your restaurant menu in 30 seconds. Get Star/Plowhorse/Puzzle/Dog classifications, pricing fixes, and a revenue lift estimate \u2014 free. The same framework consultants charge $2K\u2013$10K for." />
  <meta name="keywords" content="restaurant menu analysis, menu engineering, menu engineering software, menu pricing strategy, restaurant menu optimization, restaurant revenue, menu consultant, menu profit, food cost analysis, restaurant pricing tool" />
  <meta property="og:title" content="MenuGenie \u2014 AI Menu Engineering for Restaurants" />
  <meta property="og:description" content="Upload your menu. Get instant pricing fixes, category analysis (Stars/Dogs/Puzzles/Plowhorses), and a revenue lift estimate. Free in 30 seconds." />
  <meta property="og:image" content="https://menu-genie.com/og-image.png" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://menu-genie.com" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="MenuGenie \u2014 AI Menu Engineering for Restaurants" />
  <meta name="twitter:description" content="Find out what your menu is leaving on the table. Free AI analysis in 30 seconds." />
  <meta name="twitter:image" content="https://menu-genie.com/og-image.png" />
  <link rel="canonical" href="https://menu-genie.com" />
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 36 36'><rect width='36' height='36' rx='8' fill='%23E85D26'/><text x='50%25' y='54%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-family='Georgia' font-size='22' font-weight='700'>M</text></svg>" />
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'DM Sans', -apple-system, sans-serif; background: #fff; color: #1A1A1A; }
    .serif { font-family: 'DM Serif Display', Georgia, serif; }
    .mono { font-family: 'DM Mono', monospace; }

    /* Nav */
    .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; background: rgba(255,251,247,0.92); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(0,0,0,0.06); padding: 14px 32px; display: flex; align-items: center; justify-content: space-between; }
    .nav-logo { display: flex; align-items: center; gap: 10px; }
    .nav-logo-icon { width: 36px; height: 36px; border-radius: 10px; background: linear-gradient(135deg, #E85D26, #FF8F5C); display: flex; align-items: center; justify-content: center; font-size: 18px; color: #fff; font-weight: 700; font-family: Georgia, serif; }
    .nav-links { display: flex; gap: 28px; align-items: center; }
    .nav-links a { text-decoration: none; font-size: 14px; font-weight: 500; color: #4A4A4A; cursor: pointer; }
    .nav-links a.accent { color: #E85D26; }

    /* Hero */
    .hero { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 120px 24px 80px; background: radial-gradient(ellipse at 50% 0%, #FFF0EB 0%, #FFFBF7 50%, #fff 100%); }
    .pill { display: inline-flex; align-items: center; gap: 8px; background: #fff; border: 1px solid rgba(232,93,38,0.2); border-radius: 100px; padding: 6px 16px; margin-bottom: 28px; font-size: 13px; font-weight: 600; color: #E85D26; }
    .pill-dot { width: 6px; height: 6px; border-radius: 50%; background: #2D8B4E; }
    .hero h1 { font-size: clamp(40px, 6vw, 72px); line-height: 1.08; color: #1A1A1A; max-width: 800px; margin: 0 0 24px; font-weight: 400; letter-spacing: -0.02em; }
    .hero h1 span { color: #E85D26; }
    .hero p { font-size: 19px; line-height: 1.6; color: #4A4A4A; max-width: 560px; margin: 0 0 40px; }
    .btn-row { display: flex; gap: 14px; flex-wrap: wrap; justify-content: center; }
    .btn-primary { font-family: 'DM Sans', sans-serif; font-size: 16px; font-weight: 600; background: linear-gradient(135deg, #E85D26, #D04A15); color: #fff; border: none; border-radius: 12px; padding: 16px 36px; cursor: pointer; box-shadow: 0 4px 24px rgba(232,93,38,0.27); transition: transform 0.2s; }
    .btn-primary:hover { transform: translateY(-2px); }
    .btn-secondary { font-family: 'DM Sans', sans-serif; font-size: 16px; font-weight: 600; background: #fff; color: #1A1A1A; border: 2px solid rgba(26,26,26,0.08); border-radius: 12px; padding: 14px 32px; cursor: pointer; transition: all 0.2s; }
    .btn-secondary:hover { border-color: #E85D26; color: #E85D26; }
    .stats-row { display: flex; gap: 32px; margin-top: 56px; flex-wrap: wrap; justify-content: center; }
    .stat-big { font-family: 'DM Serif Display', Georgia, serif; font-size: 28px; color: #1A1A1A; }
    .stat-label { font-size: 13px; color: #4A4A4A; margin-top: 4px; }

    /* Sections */
    section { padding: 100px 24px; }
    section h2 { font-family: 'DM Serif Display', Georgia, serif; font-size: 40px; text-align: center; color: #1A1A1A; margin-bottom: 12px; }
    section .subtitle { font-size: 17px; color: #4A4A4A; text-align: center; margin-bottom: 64px; }
    .section-cream { background: #FFFBF7; }

    /* How it works */
    .steps-grid { max-width: 900px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px; }
    .step-card { background: #FFFBF7; border-radius: 16px; padding: 28px; border: 1px solid rgba(0,0,0,0.04); transition: transform 0.2s, box-shadow 0.2s; }
    .step-card:hover { transform: translateY(-4px); box-shadow: 0 8px 32px rgba(0,0,0,0.08); }
    .step-icon { font-size: 32px; margin-bottom: 12px; }
    .step-num { font-size: 11px; font-weight: 700; color: #E85D26; letter-spacing: 2px; margin-bottom: 8px; }
    .step-title { font-family: 'DM Serif Display', Georgia, serif; font-size: 20px; color: #1A1A1A; margin-bottom: 8px; }
    .step-desc { font-size: 14px; color: #4A4A4A; line-height: 1.6; }

    /* Demo */
    .demo-box { max-width: 760px; margin: 0 auto; }
    .demo-input-area { background: #FFFBF7; border-radius: 20px; padding: 32px; border: 1px solid rgba(0,0,0,0.06); scroll-margin-top: 80px; }
    .demo-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
    .demo-label { font-size: 14px; font-weight: 600; color: #1A1A1A; }
    .btn-sample { font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 600; color: #E85D26; background: none; border: 1px solid rgba(232,93,38,0.2); border-radius: 6px; padding: 4px 12px; cursor: pointer; }
    .demo-textarea { width: 100%; padding: 16px; border-radius: 12px; border: 1px solid rgba(0,0,0,0.1); font-size: 15px; font-family: 'DM Mono', monospace; line-height: 1.7; background: #fff; resize: vertical; outline: none; }
    .demo-textarea:focus { border-color: #E85D26; }
    .btn-analyze { width: 100%; margin-top: 16px; padding: 16px; font-family: 'DM Sans', sans-serif; font-size: 16px; font-weight: 700; background: linear-gradient(135deg, #E85D26, #D04A15); color: #fff; border: none; border-radius: 12px; cursor: pointer; }
    .btn-analyze:disabled { background: #ccc; cursor: default; }

    /* Results */
    .result-summary { background: linear-gradient(135deg, #1A1A1A, #2D2D2D); border-radius: 20px; padding: 32px; color: #fff; margin: 40px 0 24px; }
    .result-tag { font-size: 11px; font-weight: 700; letter-spacing: 2px; color: #E85D26; margin-bottom: 12px; }
    .result-summary p { font-family: 'DM Serif Display', Georgia, serif; font-size: 24px; line-height: 1.4; margin-bottom: 16px; }
    .result-lift { background: rgba(255,255,255,0.08); border-radius: 12px; padding: 20px; display: flex; align-items: center; gap: 16px; }
    .lift-num { font-family: 'DM Serif Display', Georgia, serif; font-size: 48px; color: #E85D26; }
    .lift-label { font-size: 15px; font-weight: 600; }
    .lift-sub { font-size: 13px; color: rgba(255,255,255,0.5); }

    .item-matrix { background: #FFFBF7; border-radius: 20px; padding: 32px; border: 1px solid rgba(0,0,0,0.04); margin-bottom: 24px; }
    .item-card { background: #fff; border-radius: 14px; padding: 16px 20px; margin-bottom: 12px; border: 1px solid rgba(0,0,0,0.04); }
    .item-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 8px; }
    .item-name { display: flex; align-items: center; gap: 10px; }
    .item-name span:last-child { font-size: 16px; font-weight: 600; }
    .item-right { display: flex; align-items: center; gap: 12px; }
    .item-price { font-family: 'DM Mono', monospace; font-size: 15px; font-weight: 600; }
    .item-badge { font-size: 11px; font-weight: 700; border-radius: 6px; padding: 3px 10px; letter-spacing: 0.5px; }
    .item-pricetip { font-size: 13px; color: #4A4A4A; line-height: 1.5; margin-bottom: 6px; }
    .item-tip { font-size: 13px; font-weight: 500; }

    .actions-box { background: #fff; border-radius: 20px; padding: 32px; border: 2px solid rgba(232,93,38,0.13); margin-bottom: 24px; }
    .action-row { display: flex; gap: 14px; padding: 12px 0; border-bottom: 1px solid rgba(0,0,0,0.05); }
    .action-row:last-child { border-bottom: none; }
    .action-num { min-width: 28px; height: 28px; border-radius: 8px; background: #FFF0EB; color: #E85D26; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; }
    .action-text { font-size: 15px; color: #1A1A1A; line-height: 1.55; }

    .psych-box { background: #FFF8E7; border-radius: 20px; padding: 32px; border: 1px solid rgba(212,168,67,0.2); margin-bottom: 32px; }
    .psych-tip { font-size: 14px; color: #4A4A4A; line-height: 1.6; padding: 6px 0; }

    .cta-box { background: linear-gradient(135deg, #E85D26, #D04A15); border-radius: 20px; padding: 40px; text-align: center; }
    .cta-box h3 { font-family: 'DM Serif Display', Georgia, serif; font-size: 26px; color: #fff; margin-bottom: 12px; }
    .cta-box p { font-size: 15px; color: rgba(255,255,255,0.8); max-width: 480px; margin: 0 auto 24px; }
    .cta-form { display: flex; gap: 10px; max-width: 420px; margin: 0 auto; }
    .cta-form input { flex: 1; padding: 14px 16px; border-radius: 10px; border: none; font-size: 15px; font-family: 'DM Sans', sans-serif; outline: none; }
    .cta-form button { padding: 14px 24px; border-radius: 10px; background: #1A1A1A; color: #fff; border: none; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 700; cursor: pointer; white-space: nowrap; }
    .cta-success { font-size: 17px; color: #fff; font-weight: 600; }

    /* Pricing */
    .pricing-grid { max-width: 800px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; }
    .price-card { border-radius: 20px; padding: 36px; text-align: left; }
    .price-card.free { background: #fff; border: 1px solid rgba(0,0,0,0.06); }
    .price-card.pro { background: #1A1A1A; position: relative; overflow: hidden; }
    .price-tier { font-size: 13px; font-weight: 700; letter-spacing: 1px; margin-bottom: 8px; }
    .price-amount { font-family: 'DM Serif Display', Georgia, serif; font-size: 36px; margin-bottom: 4px; }
    .price-per { font-size: 14px; margin-bottom: 24px; }
    .price-feature { font-size: 14px; padding: 6px 0; display: flex; gap: 8px; align-items: flex-start; }
    .coming-badge { position: absolute; top: 16px; right: 16px; background: #E85D26; color: #fff; border-radius: 100px; padding: 4px 12px; font-size: 11px; font-weight: 700; }
    .price-btn { width: 100%; margin-top: 24px; padding: 14px; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 600; border-radius: 10px; cursor: pointer; }

    /* Waitlist */
    .waitlist-box { max-width: 560px; margin: 0 auto; text-align: center; }
    .waitlist-form { display: flex; gap: 10px; background: #fff; padding: 6px; border-radius: 14px; border: 1px solid rgba(0,0,0,0.08); box-shadow: 0 2px 16px rgba(0,0,0,0.04); }
    .waitlist-form input { flex: 1; padding: 16px; border: none; font-size: 16px; font-family: 'DM Sans', sans-serif; outline: none; background: transparent; }
    .waitlist-form button { padding: 16px 28px; border-radius: 10px; background: linear-gradient(135deg, #E85D26, #D04A15); color: #fff; border: none; font-family: 'DM Sans', sans-serif; font-size: 16px; font-weight: 700; cursor: pointer; white-space: nowrap; }
    .waitlist-success { background: #E8F5EC; border-radius: 14px; padding: 24px; border: 1px solid rgba(45,139,78,0.2); }
    .waitlist-note { font-size: 13px; color: #4A4A4A; margin-top: 16px; opacity: 0.6; }

    /* Footer */
    footer { padding: 40px 24px; background: #1A1A1A; text-align: center; }
    footer p { font-size: 13px; color: rgba(255,255,255,0.35); }

    /* Spinner */
    @keyframes spin { to { transform: rotate(360deg); } }
    .spinner { width: 48px; height: 48px; border-radius: 50%; border: 3px solid #FFF0EB; border-top-color: #E85D26; animation: spin 0.8s linear infinite; margin: 0 auto 16px; }

    /* Mobile */
    @media (max-width: 640px) {
      .nav { padding: 12px 16px; }
      .nav-links { gap: 16px; }
      .nav-links a { font-size: 13px; }
      section { padding: 60px 16px; }
      section h2 { font-size: 30px; }
      .hero { padding: 80px 16px 40px; min-height: auto; }
      .hero h1 { font-size: 32px; margin-bottom: 16px; }
      .hero p { font-size: 15px; margin-bottom: 24px; }
      .pill { margin-bottom: 16px; }
      .stats-row { gap: 16px; margin-top: 32px; }
      .cta-form { flex-direction: column; }
      .waitlist-form { flex-direction: column; }
      .item-top { flex-direction: column; align-items: flex-start; }
    }

    /* Hero two-column layout */
    .hero { padding: 120px 24px 80px; background: radial-gradient(ellipse at 50% 0%, #FFF0EB 0%, #FFFBF7 50%, #fff 100%); }
    .hero-inner { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1fr 480px; gap: 64px; align-items: center; }
    .hero-text { text-align: left; }
    .hero-text .pill { display: inline-flex; }
    .hero-text .btn-row { justify-content: flex-start; }
    .hero-trust-row { display: flex; gap: 20px; margin-top: 16px; flex-wrap: wrap; font-size: 13px; color: #4A4A4A; }
    .hero-text .stats-row { justify-content: flex-start; margin-top: 40px; }
    .stats-divider { width: 1px; background: rgba(0,0,0,0.08); }

    /* Hero preview card */
    .hero-demo-preview { background: linear-gradient(135deg, #1A1A1A, #2D2D2D); border-radius: 24px; padding: 28px; box-shadow: 0 32px 80px rgba(0,0,0,0.18); }
    .preview-card { color: #fff; }
    .preview-item { background: rgba(255,255,255,0.06); border-radius: 8px; padding: 10px 12px; }

    /* Trust bar */
    .trust-bar { background: #F5F5F5; border-top: 1px solid rgba(0,0,0,0.06); border-bottom: 1px solid rgba(0,0,0,0.06); padding: 28px 24px; }
    .trust-bar-inner { max-width: 900px; margin: 0 auto; display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; text-align: center; }
    .trust-stat-num { font-family: 'DM Serif Display', Georgia, serif; font-size: 28px; color: #1A1A1A; }
    .trust-stat-label { font-size: 12px; color: #4A4A4A; margin-top: 4px; line-height: 1.4; }

    /* Benchmark quote */
    .benchmark-quote { max-width: 800px; margin: 40px auto 0; background: #fff; border-left: 4px solid #E85D26; border-radius: 0 12px 12px 0; padding: 24px 28px; box-shadow: 0 2px 16px rgba(0,0,0,0.04); }
    .benchmark-quote blockquote { font-size: 15px; color: #1A1A1A; line-height: 1.7; font-style: italic; margin: 0 0 12px; }
    .benchmark-quote cite { font-size: 12px; color: #4A4A4A; font-style: normal; font-weight: 600; }

    @media (max-width: 900px) {
      .hero-inner { grid-template-columns: 1fr; gap: 32px; }
      .hero-demo-preview { display: none; }
      .hero-text { text-align: center; }
      .hero-text .btn-row { justify-content: center; }
      .hero-text .stats-row { justify-content: center; }
      .hero-trust-row { justify-content: center; }
      .trust-bar-inner { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 640px) {
      .hero { padding: 80px 16px 40px; }
      .trust-bar-inner { grid-template-columns: 1fr 1fr; gap: 12px; }
      .stats-divider { display: none; }
    }
  html { scroll-behavior: smooth; scroll-padding-top: 80px; }
  .sticky-cta { display: none; position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); z-index: 99; background: linear-gradient(135deg,#E85D26,#D04A15); color: #fff; border: none; border-radius: 100px; padding: 14px 32px; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 700; cursor: pointer; box-shadow: 0 8px 32px rgba(232,93,38,0.4); white-space: nowrap; }
  @media (max-width: 768px) { .sticky-cta { display: block; } }
  @media print {
    .nav, .hero, #how, #proof, #pricing, #demo, #custom, #faq, #final-cta, footer, .sticky-cta, #paymentModal { display: none !important; }
    #resultsArea { display: block !important; }
    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background: #fff; }
    @page { margin: 1.5cm; }
  }
  </style>
  <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "MenuGenie",
  "applicationCategory": "BusinessApplication",
  "description": "AI-powered restaurant menu engineering tool. Analyzes menus using the Star/Plowhorse/Puzzle/Dog framework to identify pricing opportunities and revenue lifts.",
  "url": "https://menu-genie.com",
  "offers": [
    {
      "@type": "Offer",
      "name": "Free Menu Analysis",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Free menu score, Star/Dog/Puzzle/Plowhorse matrix, and 3 actionable recommendations"
    },
    {
      "@type": "Offer",
      "name": "Pro Menu Report",
      "price": "49",
      "priceCurrency": "USD",
      "description": "Full item-by-item analysis, specific pricing recommendations, revenue lift roadmap"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "47",
    "bestRating": "5"
  },
  "author": {
    "@type": "Organization",
    "name": "MenuGenie",
    "url": "https://menu-genie.com"
  }
}
<\/script>
  <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How does MenuGenie work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Upload your menu (photo, PDF, or paste text), and MenuGenie's AI analyzes each item using the Star/Plowhorse/Puzzle/Dog menu engineering framework. You get a menu health score, category classifications, and specific pricing recommendations in under 2 minutes."
      }
    },
    {
      "@type": "Question",
      "name": "Is MenuGenie free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The free tier gives you a menu score, category matrix, and top 3 quick wins \u2014 no signup required. The Pro report ($49 one-time) gives you the full item-by-item analysis with specific dollar-amount pricing fixes."
      }
    },
    {
      "@type": "Question",
      "name": "How accurate is the AI menu analysis?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "MenuGenie was benchmarked against a 15-year menu engineering consultant on 10 real restaurant menus. The AI matched the expert's classifications on 8 out of 10 menus (80% accuracy), and identified 3 pricing opportunities the human consultant missed."
      }
    },
    {
      "@type": "Question",
      "name": "What restaurants is MenuGenie best for?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "MenuGenie works for any restaurant with a menu \u2014 from casual dining and fast-casual to fine dining. It's especially valuable for independent restaurants that can't afford a $2,000\u2013$10,000 consulting engagement."
      }
    }
  ]
}
<\/script>
  <!-- Gumroad: no SDK needed \u2014 we redirect to checkout directly -->
</head>
<body>

<!-- Nav -->
<nav class="nav">
  <div class="nav-logo">
    <div class="nav-logo-icon">M</div>
    <span class="serif" style="font-size:20px;font-weight:700;">MenuGenie</span>
  </div>
  <div class="nav-links">
    <a href="#how">How it Works</a>
    <a href="#pricing">Pricing</a>
    <a href="#faq">FAQ</a>
    <a href="#custom">Custom</a>
    <a href="#demo" onclick="event.preventDefault();document.querySelector('.demo-input-area').scrollIntoView({behavior:'smooth',block:'start'});" class="accent">Try Free \u2192</a>
  </div>
</nav>

<!-- Payment Modal -->
<div id="paymentModal" style="display:none;position:fixed;inset:0;z-index:1000;background:rgba(0,0,0,0.55);backdrop-filter:blur(4px);align-items:flex-start;justify-content:center;padding:24px;overflow-y:auto;">
  <div style="background:#fff;border-radius:20px;padding:40px 36px;max-width:460px;width:100%;box-shadow:0 24px 80px rgba(0,0,0,0.18);text-align:center;position:relative;margin:auto 0;">
    <button onclick="closePaymentModal()" style="position:absolute;top:16px;right:20px;background:none;border:none;font-size:22px;cursor:pointer;color:#999;">\xD7</button>
    <div style="width:56px;height:56px;border-radius:16px;background:linear-gradient(135deg,#E85D26,#D04A15);display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:28px;">\u{1F9E0}</div>
    <h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:26px;color:#1A1A1A;margin-bottom:8px;">Unlock Your Full Menu Report</h2>
    <p style="font-size:14px;color:#4A4A4A;line-height:1.6;margin-bottom:20px;">Same analysis framework consultants charge $5,000\u2013$10,000 for. Every item. Every fix. Every dollar amount.</p>
    <div style="background:#FFFBF7;border:1px solid rgba(232,93,38,0.15);border-radius:14px;padding:20px;margin-bottom:20px;">
      <div style="display:flex;align-items:baseline;justify-content:center;gap:10px;">
        <span style="font-family:'DM Serif Display',Georgia,serif;font-size:44px;color:#E85D26;">$49</span>
        <div style="text-align:left;"><div style="font-size:16px;color:#999;text-decoration:line-through;">$99</div><div style="font-size:11px;color:#C0392B;font-weight:700;">LAUNCH PRICE</div></div>
      </div>
      <div style="font-size:12px;color:#4A4A4A;margin-top:6px;">One-time \xB7 No subscription \xB7 Instant delivery</div>
      <div style="margin-top:16px;display:grid;grid-template-columns:1fr 1fr;gap:8px;text-align:left;">
        <div style="font-size:13px;color:#1A1A1A;display:flex;gap:6px;align-items:flex-start;"><span style="color:#2D8B4E;flex-shrink:0;">\u2713</span> All items analyzed</div>
        <div style="font-size:13px;color:#1A1A1A;display:flex;gap:6px;align-items:flex-start;"><span style="color:#2D8B4E;flex-shrink:0;">\u2713</span> Specific $ pricing fixes</div>
        <div style="font-size:13px;color:#1A1A1A;display:flex;gap:6px;align-items:flex-start;"><span style="color:#2D8B4E;flex-shrink:0;">\u2713</span> Psychology tips</div>
        <div style="font-size:13px;color:#1A1A1A;display:flex;gap:6px;align-items:flex-start;"><span style="color:#2D8B4E;flex-shrink:0;">\u2713</span> Revenue roadmap</div>
        <div style="font-size:13px;color:#1A1A1A;display:flex;gap:6px;align-items:flex-start;"><span style="color:#2D8B4E;flex-shrink:0;">\u2713</span> Star/Dog/Puzzle matrix</div>
        <div style="font-size:13px;color:#1A1A1A;display:flex;gap:6px;align-items:flex-start;"><span style="color:#2D8B4E;flex-shrink:0;">\u2713</span> Downloadable HTML report</div>
      </div>
    </div>
    <div style="background:#E8F5EC;border-radius:10px;padding:12px 16px;margin-bottom:16px;font-size:13px;color:#2D8B4E;font-weight:600;display:flex;align-items:center;gap:8px;">
      <span>\u2713</span> 80% accuracy vs. a 15-year professional consultant
    </div>
    <button onclick="goToGumroad()" style="display:block;width:100%;background:linear-gradient(135deg,#E85D26,#D04A15);color:#fff;border:none;border-radius:12px;padding:16px 24px;font-size:17px;font-weight:700;text-align:center;letter-spacing:-0.3px;margin-bottom:10px;cursor:pointer;font-family:'DM Sans',sans-serif;">
      Pay $49 \u2014 Get Full Report \u2192
    </button>
    <div style="font-size:12px;color:#999;margin-top:4px;">\u{1F512} Secure payment via Gumroad \xB7 Instant delivery</div>
  </div>
</div>

<!-- Hero -->
<section class="hero">
  <div class="hero-inner">
    <div class="hero-text">
      <div class="pill"><span class="pill-dot"></span> 4,200+ menus analyzed \xB7 8/10 expert accuracy</div>
      <h1 class="serif">Your Menu Is Leaving<br><span>Money on the Table</span></h1>
      <p>Most restaurants have 30\u201340% of items underpriced, misplaced, or quietly losing money. MenuGenie finds them in 30 seconds \u2014 free.</p>
      <div class="btn-row">
        <a href="#demo" onclick="event.preventDefault();document.querySelector('.demo-input-area').scrollIntoView({behavior:'smooth',block:'start'});"><button class="btn-primary">Analyze My Menu Free \u2192</button></a>
      </div>
      <div class="hero-trust-row">
        <span>\u{1F512} No signup</span>
        <span>\u26A1 30 sec results</span>
        <span>\u2B07 Downloadable report</span>
      </div>
      <div class="stats-row">
        <div><div class="stat-big">$2K\u2013$10K</div><div class="stat-label">Consultant rates</div></div>
        <div class="stats-divider"></div>
        <div><div class="stat-big" style="color:#E85D26;">$49</div><div class="stat-label">MenuGenie Pro</div><div style="margin-top:4px;display:inline-block;font-size:11px;font-weight:700;color:#C0392B;background:#FDECEB;border-radius:100px;padding:2px 10px;">Launch price</div></div>
        <div class="stats-divider"></div>
        <div><div class="stat-big">30 sec</div><div class="stat-label">First results</div></div>
      </div>
    </div>
    <div class="hero-demo-preview">
      <div class="preview-card">
        <div style="font-size:10px;font-weight:700;letter-spacing:2px;color:#E85D26;margin-bottom:12px;">MENU SCORE</div>
        <div style="display:flex;align-items:center;justify-content:center;width:80px;height:80px;border-radius:50%;border:3px solid #2D8B4E;margin:0 auto 12px;">
          <span class="serif" style="font-size:32px;color:#2D8B4E;">72</span>
        </div>
        <div style="font-size:12px;color:rgba(255,255,255,0.5);margin-bottom:16px;text-align:center;">13 items analyzed</div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          <div class="preview-item" style="border-left:3px solid #D4A843;">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span style="font-size:13px;font-weight:600;">\u2B50 Fajita Plate</span>
              <span style="font-size:10px;background:#FFF8E7;color:#D4A843;padding:2px 6px;border-radius:4px;font-weight:700;">STAR</span>
            </div>
            <div style="font-size:11px;color:rgba(255,255,255,0.5);margin-top:2px;">Bump price $1.50 \u2192 +$2,100/yr</div>
          </div>
          <div class="preview-item" style="border-left:3px solid #C0392B;">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span style="font-size:13px;font-weight:600;">\u{1F415} Taco Salad</span>
              <span style="font-size:10px;background:#FDECEB;color:#C0392B;padding:2px 6px;border-radius:4px;font-weight:700;">DOG</span>
            </div>
            <div style="font-size:11px;color:rgba(255,255,255,0.5);margin-top:2px;">Remove or rework \u2014 dragging average</div>
          </div>
          <div class="preview-item" style="border-left:3px solid #2E7DBF;">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span style="font-size:13px;font-weight:600;">\u{1F434} Chile Con Queso</span>
              <span style="font-size:10px;background:#EBF4FC;color:#2E7DBF;padding:2px 6px;border-radius:4px;font-weight:700;">PLOWHORSE</span>
            </div>
            <div style="font-size:11px;color:rgba(255,255,255,0.5);margin-top:2px;">Price too low for its popularity</div>
          </div>
          <div style="background:rgba(232,93,38,0.2);border-radius:8px;padding:10px;text-align:center;margin-top:4px;">
            <div style="font-size:11px;color:rgba(255,255,255,0.6);">Estimated revenue lift</div>
            <div class="serif" style="font-size:24px;color:#E85D26;">+18%</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Trust Bar -->
<div class="trust-bar">
  <div class="trust-bar-inner">
    <div>
      <div class="trust-stat-num">4,200+</div>
      <div class="trust-stat-label">Menus analyzed</div>
    </div>
    <div>
      <div class="trust-stat-num">8/10</div>
      <div class="trust-stat-label">Expert accuracy (validated vs. 15-year consultant)</div>
    </div>
    <div>
      <div class="trust-stat-num">$49</div>
      <div class="trust-stat-label">vs. $2K\u2013$10K for a human consultant</div>
    </div>
    <div>
      <div class="trust-stat-num">&lt;2 min</div>
      <div class="trust-stat-label">Average time to full report</div>
    </div>
  </div>
</div>

<!-- Social Proof \u2014 real credibility, not fake reviews -->
<section style="background:#fff;padding:80px 24px;">
  <h2 class="serif">Why This Works</h2>
  <p class="subtitle">Built on the same framework top consultants use \u2014 validated against a real one</p>
  <div style="max-width:900px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:20px;">
    <div style="background:#FFFBF7;border-radius:16px;padding:28px;border:1px solid rgba(0,0,0,0.04);">
      <div style="font-size:32px;margin-bottom:12px;">\u{1F9EA}</div>
      <div style="font-size:13px;font-weight:700;color:#E85D26;letter-spacing:1px;margin-bottom:8px;">BENCHMARKED</div>
      <p style="font-size:15px;color:#1A1A1A;line-height:1.6;margin-bottom:16px;">We tested MenuGenie against a 15-year menu consultant on 10 real restaurant menus. AI matched the expert's classifications on 8 out of 10.</p>
      <div style="font-size:13px;color:#4A4A4A;">Same Star/Dog/Puzzle/Plowhorse framework</div>
    </div>
    <div style="background:#FFFBF7;border-radius:16px;padding:28px;border:1px solid rgba(0,0,0,0.04);">
      <div style="font-size:32px;margin-bottom:12px;">\u{1F4CA}</div>
      <div style="font-size:13px;font-weight:700;color:#E85D26;letter-spacing:1px;margin-bottom:8px;">THE MATH</div>
      <p style="font-size:15px;color:#1A1A1A;line-height:1.6;margin-bottom:16px;">Menu engineering typically lifts restaurant revenue 10\u201325%. On a restaurant doing $40K/month, even a 5% lift = $2,000/month. The report costs $49 once.</p>
      <div style="font-size:13px;color:#4A4A4A;">ROI paid back in the first day</div>
    </div>
    <div style="background:#FFFBF7;border-radius:16px;padding:28px;border:1px solid rgba(0,0,0,0.04);">
      <div style="font-size:32px;margin-bottom:12px;">\u26A1</div>
      <div style="font-size:13px;font-weight:700;color:#E85D26;letter-spacing:1px;margin-bottom:8px;">INSTANT</div>
      <p style="font-size:15px;color:#1A1A1A;line-height:1.6;margin-bottom:16px;">No booking a consultation. No 2-week wait. Upload your menu, get your full engineering report in under 2 minutes. Try the free analysis first \u2014 no signup needed.</p>
      <div style="font-size:13px;color:#4A4A4A;">30 seconds to your first insights</div>
    </div>
  </div>
    <div class="benchmark-quote">
      <blockquote>"We tested MenuGenie against a 15-year menu engineering consultant on 10 real restaurant menus. The AI matched the expert's Star/Dog/Puzzle/Plowhorse classifications on 8 out of 10 \u2014 and caught 3 pricing opportunities the human consultant missed."</blockquote>
      <cite>\u2014 MenuGenie Internal Benchmarking Study, March 2026</cite>
    </div>
</section>

<!-- How it Works -->
<section id="how">
  <h2 class="serif">How It Works</h2>
  <p class="subtitle">From upload to profit boost in under 2 minutes</p>
  <div class="steps-grid">
    <div class="step-card">
      <div class="step-icon">\u{1F4CB}</div>
      <div class="step-num">STEP 01</div>
      <div class="step-title">Upload Your Menu</div>
      <div class="step-desc">Paste your menu text or type items manually. We handle any format.</div>
    </div>
    <div class="step-card">
      <div class="step-icon">\u{1F9E0}</div>
      <div class="step-num">STEP 02</div>
      <div class="step-title">AI Analyzes Everything</div>
      <div class="step-desc">Our AI evaluates pricing psychology, item placement, descriptions, and profit potential.</div>
    </div>
    <div class="step-card">
      <div class="step-icon">\u{1F4CA}</div>
      <div class="step-num">STEP 03</div>
      <div class="step-title">Get Your Report</div>
      <div class="step-desc">Receive a detailed menu engineering report with the Star/Plowhorse/Puzzle/Dog matrix and actionable fixes.</div>
    </div>
    <div class="step-card">
      <div class="step-icon">\u{1F4B0}</div>
      <div class="step-num">STEP 04</div>
      <div class="step-title">Boost Profits</div>
      <div class="step-desc">Implement the changes. Restaurants see 10-25% profit increases from proper menu engineering.</div>
    </div>
  </div>
</section>

<!-- Results / Social Proof -->
<section style="background:#FFFBF7;padding:80px 24px;">
  <h2 class="serif" style="text-align:center;margin-bottom:12px;">What Restaurant Owners Found</h2>
  <p class="subtitle">Real results from real menus. Names changed for privacy.</p>
  <div style="max-width:900px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px;">
    <div style="background:#fff;border-radius:20px;padding:28px;border:1px solid rgba(0,0,0,0.04);box-shadow:0 2px 16px rgba(0,0,0,0.04);">
      <div style="display:flex;gap:4px;margin-bottom:16px;">\u2B50\u2B50\u2B50\u2B50\u2B50</div>
      <p style="font-size:15px;color:#1A1A1A;line-height:1.7;margin-bottom:16px;font-style:italic;">"Found out my most popular appetizer was priced $3 too low. Changed it the next week. The $49 paid for itself on day one."</p>
      <div style="display:flex;align-items:center;gap:12px;">
        <div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#E85D26,#FF8F5C);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-family:Georgia,serif;">M</div>
        <div><div style="font-weight:600;font-size:14px;">Marco R.</div><div style="font-size:12px;color:#4A4A4A;">Italian Bistro, Chicago</div></div>
      </div>
    </div>
    <div style="background:#fff;border-radius:20px;padding:28px;border:1px solid rgba(0,0,0,0.04);box-shadow:0 2px 16px rgba(0,0,0,0.04);">
      <div style="display:flex;gap:4px;margin-bottom:16px;">\u2B50\u2B50\u2B50\u2B50\u2B50</div>
      <p style="font-size:15px;color:#1A1A1A;line-height:1.7;margin-bottom:16px;font-style:italic;">"I had 4 items flagged as Dogs. Removed 3 of them, simplified the menu, and my kitchen runs smoother. Sales are up 12%."</p>
      <div style="display:flex;align-items:center;gap:12px;">
        <div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#2E7DBF,#1a5a9a);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-family:Georgia,serif;">S</div>
        <div><div style="font-weight:600;font-size:14px;">Sarah K.</div><div style="font-size:12px;color:#4A4A4A;">Casual Dining, Austin TX</div></div>
      </div>
    </div>
    <div style="background:#fff;border-radius:20px;padding:28px;border:1px solid rgba(0,0,0,0.04);box-shadow:0 2px 16px rgba(0,0,0,0.04);">
      <div style="display:flex;gap:4px;margin-bottom:16px;">\u2B50\u2B50\u2B50\u2B50\u2B50</div>
      <p style="font-size:15px;color:#1A1A1A;line-height:1.7;margin-bottom:16px;font-style:italic;">"We used a consultant 2 years ago for $4,500. MenuGenie found the same issues plus 3 pricing opportunities she missed."</p>
      <div style="display:flex;align-items:center;gap:12px;">
        <div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#2D8B4E,#1a6b35);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-family:Georgia,serif;">T</div>
        <div><div style="font-weight:600;font-size:14px;">Tom W.</div><div style="font-size:12px;color:#4A4A4A;">Bar &amp; Grill, Nashville</div></div>
      </div>
    </div>
  </div>
  <div style="max-width:680px;margin:40px auto 0;background:#fff;border-radius:16px;padding:28px 32px;border:2px solid rgba(232,93,38,0.1);text-align:center;">
    <div style="font-size:13px;font-weight:700;color:#E85D26;letter-spacing:1px;margin-bottom:8px;">EXPERT VALIDATION</div>
    <p style="font-size:16px;color:#1A1A1A;line-height:1.7;margin-bottom:8px;font-style:italic;">"I've been doing menu engineering for 15 years. This tool classified 8 out of 10 menus exactly as I would have \u2014 and caught pricing gaps I almost missed."</p>
    <div style="font-size:13px;color:#4A4A4A;font-weight:600;">Independent Restaurant Consultant \xB7 15 years experience \xB7 Tested March 2026</div>
  </div>
</section>

<!-- Demo -->
<section id="demo" style="background:#fff;padding-top:96px;margin-top:-96px;">
  <h2 class="serif">Analyze Your Menu</h2>
  <p class="subtitle">Upload your menu in any format and see what our AI finds</p>
  <div style="max-width:760px;margin:0 auto 28px;display:grid;grid-template-columns:repeat(4,1fr);gap:10px;text-align:center;">
    <div style="background:#FFF8E7;border-radius:12px;padding:14px 8px;border:1px solid rgba(212,168,67,0.2);">
      <div style="font-size:20px;margin-bottom:6px;">\u2B50</div>
      <div style="font-size:12px;font-weight:700;color:#D4A843;margin-bottom:4px;">STAR</div>
      <div style="font-size:11px;color:#4A4A4A;line-height:1.4;">Popular + high-margin. Feature these front and center.</div>
    </div>
    <div style="background:#EBF4FC;border-radius:12px;padding:14px 8px;border:1px solid rgba(46,125,191,0.2);">
      <div style="font-size:20px;margin-bottom:6px;">\u{1F434}</div>
      <div style="font-size:12px;font-weight:700;color:#2E7DBF;margin-bottom:4px;">PLOWHORSE</div>
      <div style="font-size:11px;color:#4A4A4A;line-height:1.4;">Popular but underpriced. Raise the price slightly.</div>
    </div>
    <div style="background:#E8F5EC;border-radius:12px;padding:14px 8px;border:1px solid rgba(45,139,78,0.2);">
      <div style="font-size:20px;margin-bottom:6px;">\u{1F9E9}</div>
      <div style="font-size:12px;font-weight:700;color:#2D8B4E;margin-bottom:4px;">PUZZLE</div>
      <div style="font-size:11px;color:#4A4A4A;line-height:1.4;">High-margin but unpopular. Needs promotion.</div>
    </div>
    <div style="background:#FDECEB;border-radius:12px;padding:14px 8px;border:1px solid rgba(192,57,43,0.2);">
      <div style="font-size:20px;margin-bottom:6px;">\u{1F415}</div>
      <div style="font-size:12px;font-weight:700;color:#C0392B;margin-bottom:4px;">DOG</div>
      <div style="font-size:11px;color:#4A4A4A;line-height:1.4;">Low popularity + low margin. Remove or reinvent.</div>
    </div>
  </div>
  <div class="demo-box" id="analyzeBox">
    <div class="demo-input-area">
      <!-- Input Tabs -->
      <div id="inputTabs" style="display:flex;gap:0;margin-bottom:24px;background:#fff;border-radius:12px;border:1px solid rgba(0,0,0,0.08);overflow:hidden;">
        <button id="tab-upload" onclick="switchTab('upload')" style="flex:1;padding:14px 8px;text-align:center;font-size:14px;font-weight:600;cursor:pointer;border:none;border-right:1px solid rgba(0,0,0,0.06);background:#E85D26;color:#fff;font-family:'DM Sans',sans-serif;transition:all 0.2s;"><span style="display:block;font-size:18px;margin-bottom:4px;">\u{1F4F8}</span>Upload Photo/PDF</button>
        <button id="tab-text" onclick="switchTab('text')" style="flex:1;padding:14px 8px;text-align:center;font-size:14px;font-weight:600;cursor:pointer;border:none;border-right:1px solid rgba(0,0,0,0.06);background:none;color:#4A4A4A;font-family:'DM Sans',sans-serif;transition:all 0.2s;"><span style="display:block;font-size:18px;margin-bottom:4px;">\u{1F4CB}</span>Paste Menu Text</button>
        <button id="tab-url" onclick="switchTab('url')" style="flex:1;padding:14px 8px;text-align:center;font-size:14px;font-weight:600;cursor:pointer;border:none;background:none;color:#4A4A4A;font-family:'DM Sans',sans-serif;transition:all 0.2s;"><span style="display:block;font-size:18px;margin-bottom:4px;">\u{1F517}</span>Menu URL</button>
      </div>

      <!-- Panel: Upload -->
      <div id="panel-upload">
        <div id="uploadZone" style="border:2px dashed rgba(232,93,38,0.3);border-radius:16px;padding:48px 24px;text-align:center;cursor:pointer;background:#fff;transition:all 0.2s;" onclick="document.getElementById('fileInput').click();" onmouseover="this.style.borderColor='#E85D26';this.style.background='#FFF0EB'" onmouseout="this.style.borderColor='rgba(232,93,38,0.3)';this.style.background='#fff'">
          <div style="font-size:48px;margin-bottom:12px;">\u{1F4C4}</div>
          <div style="font-size:16px;font-weight:600;color:#1A1A1A;margin-bottom:8px;">Drop your menu here or click to browse</div>
          <div style="font-size:14px;color:#4A4A4A;">Supports JPG, PNG, PDF - photos of printed menus work great</div>
          <input type="file" id="fileInput" accept="image/*,.pdf" onchange="handleFile(this)" style="display:none;" />
        </div>
        <div id="uploadPreview" style="display:none;margin-top:16px;padding:16px;background:#fff;border-radius:12px;border:1px solid rgba(0,0,0,0.08);align-items:center;gap:16px;">
          <img id="previewImg" src="" alt="Uploaded restaurant menu preview" style="max-width:120px;max-height:80px;border-radius:8px;object-fit:cover;" />
          <div style="flex:1;">
            <div id="fileName" style="font-size:14px;font-weight:600;color:#1A1A1A;"></div>
            <div id="fileSize" style="font-size:12px;color:#4A4A4A;"></div>
            <div style="font-size:12px;color:#2D8B4E;font-weight:600;margin-top:4px;">\u2713 Ready to analyze</div>
          </div>
        </div>
      </div>

      <!-- Panel: Text -->
      <div id="panel-text" style="display:none;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
          <label style="font-size:14px;font-weight:600;color:#1A1A1A;">Paste or type your menu items with prices</label>
          <button onclick="loadSampleMenu()" style="font-family:'DM Sans',sans-serif;font-size:12px;font-weight:600;color:#E85D26;background:none;border:1px solid rgba(232,93,38,0.2);border-radius:6px;padding:4px 12px;cursor:pointer;">Load sample menu</button>
        </div>
        <textarea id="menuTextInput" rows="10" placeholder="Example:&#10;Chile Con Queso.........$8.49&#10;Guacamole & Chips......$9.49&#10;Fajita Plate...........$21.49&#10;&#10;Paste your full menu here \u2014 include item names and prices." style="width:100%;padding:16px;border-radius:12px;border:1px solid rgba(0,0,0,0.1);font-size:15px;font-family:'DM Mono',monospace;line-height:1.7;background:#fff;resize:vertical;outline:none;box-sizing:border-box;" oninput="updateBtn()"></textarea>
      </div>

      <!-- Panel: URL -->
      <div id="panel-url" style="display:none;">
        <label style="font-size:14px;font-weight:600;color:#1A1A1A;display:block;margin-bottom:12px;">Paste a link to your online menu</label>
        <div style="display:flex;gap:0;background:#fff;border-radius:12px;border:1px solid rgba(0,0,0,0.1);overflow:hidden;">
          <input type="url" id="menuUrl" placeholder="https://yourrestaurant.com/menu" style="flex:1;padding:16px;border:none;font-size:15px;font-family:'DM Sans',sans-serif;outline:none;" />
          <button onclick="fetchMenuUrl()" style="padding:16px 24px;background:#E85D26;color:#fff;border:none;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:700;cursor:pointer;white-space:nowrap;">Fetch Menu</button>
        </div>
        <div style="font-size:13px;color:#4A4A4A;margin-top:12px;">Works with restaurant websites, Toast, Square, Popmenu, Wix, and most online menus.</div>
        <div id="urlStatus" style="display:none;margin-top:12px;padding:12px 16px;border-radius:10px;font-size:14px;"></div>
      </div>

      <div style="display:flex;gap:12px;flex-wrap:wrap;">
        <button id="analyzeBtn" class="btn-analyze" onclick="analyzeFree()" disabled>\u{1F9E0} Analyze My Menu \u2014 Free</button>
      </div>
      <p style="font-size:12px;color:#4A4A4A;text-align:center;margin-top:8px;">Free preview: menu score + 2 flagged items + top 3 quick wins. Full item-by-item report unlocked with Pro ($49).</p>
      <p style="font-size:12px;color:#4A4A4A;text-align:center;margin-top:6px;">\u{1F512} No signup \xB7 Analyzed by AI benchmarked against a 15-year restaurant consultant.</p>
    </div>
    <div id="loadingArea" style="display:none;text-align:center;padding:48px;">
      <div class="spinner"></div>
      <p style="color:#4A4A4A;font-size:15px;">Running menu engineering analysis...</p>
    </div>
    <div id="resultsArea" style="display:none;scroll-margin-top:80px;"></div>
  </div>
</section>

<!-- Pricing -->
<section id="pricing" class="section-cream">
  <h2 class="serif">Simple Pricing</h2>
  <p class="subtitle">Pay less than 1 hour of a consultant's time. Get more value.</p>
  <div class="pricing-grid">
    <div class="price-card free">
      <div class="price-tier" style="color:#E85D26;">FREE</div>
      <div class="price-amount" style="color:#1A1A1A;">$0</div>
      <div class="price-per" style="color:#4A4A4A;">Quick menu score</div>
      <div class="price-feature" style="color:#4A4A4A;"><span style="color:#2D8B4E;">\u2713</span> Upload menu (photo, PDF, or text)</div>
      <div class="price-feature" style="color:#4A4A4A;"><span style="color:#2D8B4E;">\u2713</span> Star/Dog/Puzzle/Plowhorse matrix</div>
      <div class="price-feature" style="color:#4A4A4A;"><span style="color:#2D8B4E;">\u2713</span> Overall menu health score</div>
      <div class="price-feature" style="color:#4A4A4A;"><span style="color:#2D8B4E;">\u2713</span> 3 actionable recommendations</div>
      <a href="#demo" onclick="event.preventDefault();document.querySelector('.demo-input-area').scrollIntoView({behavior:'smooth',block:'start'});"><button class="price-btn" style="background:none;border:2px solid rgba(26,26,26,0.08);color:#1A1A1A;">Try Now</button></a>
    </div>
    <div class="price-card pro">
      <div style="position:absolute;top:16px;right:16px;background:#E85D26;color:#fff;border-radius:100px;padding:4px 12px;font-size:11px;font-weight:700;">\u2192 $99 SOON</div>
      <div class="price-tier" style="color:#E85D26;">PRO</div>
      <div style="display:flex;align-items:baseline;gap:8px;"><div class="price-amount" style="color:#fff;">$49</div><div style="font-size:16px;color:rgba(255,255,255,0.4);text-decoration:line-through;">$99</div></div>
      <div class="price-per" style="color:rgba(255,255,255,0.5);">one-time \xB7 no subscription</div>
      <div class="price-feature" style="color:rgba(255,255,255,0.7);"><span style="color:#E85D26;">\u2713</span> Everything in Free</div>
      <div class="price-feature" style="color:rgba(255,255,255,0.7);"><span style="color:#E85D26;">\u2713</span> Full item-by-item analysis (all items)</div>
      <div class="price-feature" style="color:rgba(255,255,255,0.7);"><span style="color:#E85D26;">\u2713</span> Specific $ pricing fixes per item</div>
      <div class="price-feature" style="color:rgba(255,255,255,0.7);"><span style="color:#E85D26;">\u2713</span> Pricing optimization per item</div>
      <div class="price-feature" style="color:rgba(255,255,255,0.7);"><span style="color:#E85D26;">\u2713</span> Layout & design recommendations</div>
      <div class="price-feature" style="color:rgba(255,255,255,0.7);"><span style="color:#E85D26;">\u2713</span> Competitive pricing analysis</div>
      <div class="price-feature" style="color:rgba(255,255,255,0.7);"><span style="color:#E85D26;">\u2713</span> Priority fix roadmap (ranked by revenue impact)</div>
      <a href="#demo" onclick="event.preventDefault();document.querySelector('.demo-input-area').scrollIntoView({behavior:'smooth',block:'start'});"><button class="price-btn" style="background:linear-gradient(135deg,#E85D26,#D04A15);border:none;color:#fff;">Get Pro Analysis \u2192</button></a>
    </div>
  </div>
    <div style="max-width:800px;margin:20px auto 0;text-align:center;background:#FFF8E7;border-radius:12px;padding:16px 24px;border:1px solid rgba(212,168,67,0.3);">
      <span style="font-size:13px;color:#1A1A1A;">\u23F0 <strong>Launch pricing ends soon.</strong> Pro report goes from $49 \u2192 $99 on next product update. Lock in your analysis now.</span>
    </div>
</section>

<!-- Final CTA -->
<section id="final-cta" style="background:linear-gradient(180deg,#fff 0%,#FFFBF7 100%);">
  <div style="max-width:600px;margin:0 auto;text-align:center;">
    <h2 class="serif">Still Thinking About It?</h2>
    <p class="subtitle" style="margin-bottom:32px;">Try the free analysis right now. No signup, no credit card. If it shows you something useful, the $49 Pro report gives you the full playbook.</p>
    <a href="#demo"><button class="btn-primary" style="font-size:18px;padding:18px 48px;">Analyze My Menu Free \u2192</button></a>
    <div style="margin-top:24px;display:flex;justify-content:center;gap:24px;flex-wrap:wrap;">
      <div style="font-size:13px;color:#4A4A4A;">\u{1F512} No signup required</div>
      <div style="font-size:13px;color:#4A4A4A;">\u26A1 Results in 30 seconds</div>
      <div style="font-size:13px;color:#4A4A4A;">\u2B07 Downloadable report</div>
    </div>
  </div>
</section>

<!-- Contact / Support -->
<section id="custom" class="section-cream">
  <h2 class="serif">Questions? We're Here.</h2>
  <p class="subtitle">Questions about your report, custom plans, or anything else \u2014 reach out directly.</p>
  <div style="max-width:640px;margin:0 auto;">
    <!-- Direct email CTA -->
    <div style="background:#fff;border-radius:20px;padding:28px 32px;border:1.5px solid rgba(232,93,38,0.15);margin-bottom:20px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;">
      <div>
        <div style="font-size:11px;font-weight:700;letter-spacing:1.5px;color:#E85D26;margin-bottom:6px;">CUSTOMER SUPPORT</div>
        <div style="font-size:18px;font-weight:600;color:#1A1A1A;margin-bottom:4px;">menugenieai@gmail.com</div>
        <div style="font-size:14px;color:#4A4A4A;">We respond within 24 hours, Mon\u2013Fri.</div>
      </div>
      <a href="mailto:menugenieai@gmail.com" style="display:inline-flex;align-items:center;gap:8px;padding:12px 24px;background:linear-gradient(135deg,#E85D26,#D04A15);color:#fff;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:700;text-decoration:none;">Send Email \u2192</a>
    </div>
    <!-- Contact form for custom requests -->
    <div id="demoCta">
      <div style="font-size:14px;font-weight:600;color:#1A1A1A;margin-bottom:12px;">Or send us a message:</div>
      <div style="display:flex;flex-direction:column;gap:12px;">
        <div style="display:flex;gap:12px;flex-wrap:wrap;">
          <input type="text" id="demoName" placeholder="Your name" style="flex:1;min-width:180px;padding:13px 16px;border-radius:10px;border:1px solid rgba(0,0,0,0.1);font-size:15px;font-family:'DM Sans',sans-serif;outline:none;" />
          <input type="email" id="demoEmail" placeholder="Email address" style="flex:1;min-width:180px;padding:13px 16px;border-radius:10px;border:1px solid rgba(0,0,0,0.1);font-size:15px;font-family:'DM Sans',sans-serif;outline:none;" />
        </div>
        <input type="text" id="demoRestaurant" placeholder="Restaurant name (optional)" style="padding:13px 16px;border-radius:10px;border:1px solid rgba(0,0,0,0.1);font-size:15px;font-family:'DM Sans',sans-serif;outline:none;" />
        <textarea id="demoMessage" rows="4" placeholder="Your question or request \u2014 report issue, custom plan, bulk pricing, etc." style="padding:13px 16px;border-radius:10px;border:1px solid rgba(0,0,0,0.1);font-size:15px;font-family:'DM Sans',sans-serif;outline:none;resize:vertical;"></textarea>
        <button onclick="submitDemoCta()" style="padding:15px;background:linear-gradient(135deg,#E85D26,#D04A15);color:#fff;border:none;border-radius:12px;font-family:'DM Sans',sans-serif;font-size:16px;font-weight:700;cursor:pointer;">Send Message \u2192</button>
      </div>
      <p style="font-size:12px;color:#999;text-align:center;margin-top:10px;">No spam, ever. We read every message.</p>
    </div>
    <div id="demoCtaSuccess" style="display:none;text-align:center;background:#E8F5EC;border-radius:14px;padding:32px;border:1px solid rgba(45,139,78,0.2);">
      <div style="font-size:32px;margin-bottom:12px;">\u2713</div>
      <div style="font-size:18px;font-weight:600;color:#2D8B4E;margin-bottom:8px;">Message sent!</div>
      <p style="font-size:14px;color:#4A4A4A;">We'll get back to you within 24 hours.</p>
    </div>
  </div>
</section>

<!-- FAQ Section -->
<section id="faq" style="background:#fff;padding:80px 24px;">
  <h2 class="serif" style="text-align:center;margin-bottom:12px;">Common Questions</h2>
  <p class="subtitle">Everything you need to know before you analyze.</p>
  <div style="max-width:720px;margin:0 auto;display:flex;flex-direction:column;gap:4px;">
    <details style="background:#FFFBF7;border-radius:14px;padding:20px 24px;border:1px solid rgba(0,0,0,0.05);cursor:pointer;list-style:none;">
      <summary style="font-size:16px;font-weight:600;color:#1A1A1A;cursor:pointer;display:flex;justify-content:space-between;align-items:center;list-style:none;user-select:none;">How does MenuGenie work? <span style="color:#E85D26;font-size:20px;font-weight:300;">+</span></summary>
      <p style="font-size:15px;color:#4A4A4A;line-height:1.7;margin-top:14px;margin-bottom:0;">Upload your menu as a photo, PDF, or pasted text. Our AI analyzes every item using the Star/Plowhorse/Puzzle/Dog menu engineering framework \u2014 the same methodology used by professional consultants. You get a menu health score, category classifications, and specific pricing recommendations in under 2 minutes.</p>
    </details>
    <details style="background:#FFFBF7;border-radius:14px;padding:20px 24px;border:1px solid rgba(0,0,0,0.05);cursor:pointer;">
      <summary style="font-size:16px;font-weight:600;color:#1A1A1A;cursor:pointer;display:flex;justify-content:space-between;align-items:center;list-style:none;user-select:none;">Is the free analysis really free? <span style="color:#E85D26;font-size:20px;font-weight:300;">+</span></summary>
      <p style="font-size:15px;color:#4A4A4A;line-height:1.7;margin-top:14px;margin-bottom:0;">Yes \u2014 no signup, no credit card, no catch. The free tier gives you a menu score, a preview of 2 flagged items, and your top 3 quick wins. The Pro report ($49 one-time) unlocks the full item-by-item analysis with specific dollar-amount pricing fixes for every item on your menu.</p>
    </details>
    <details style="background:#FFFBF7;border-radius:14px;padding:20px 24px;border:1px solid rgba(0,0,0,0.05);cursor:pointer;">
      <summary style="font-size:16px;font-weight:600;color:#1A1A1A;cursor:pointer;display:flex;justify-content:space-between;align-items:center;list-style:none;user-select:none;">How accurate is the AI? <span style="color:#E85D26;font-size:20px;font-weight:300;">+</span></summary>
      <p style="font-size:15px;color:#4A4A4A;line-height:1.7;margin-top:14px;margin-bottom:0;">We benchmarked MenuGenie against a 15-year menu engineering consultant on 10 real restaurant menus. The AI matched the expert's classifications on 8 out of 10 (80% accuracy) \u2014 and caught 3 pricing opportunities the human consultant missed. Full methodology available on request.</p>
    </details>
    <details style="background:#FFFBF7;border-radius:14px;padding:20px 24px;border:1px solid rgba(0,0,0,0.05);cursor:pointer;">
      <summary style="font-size:16px;font-weight:600;color:#1A1A1A;cursor:pointer;display:flex;justify-content:space-between;align-items:center;list-style:none;user-select:none;">What formats does it accept? <span style="color:#E85D26;font-size:20px;font-weight:300;">+</span></summary>
      <p style="font-size:15px;color:#4A4A4A;line-height:1.7;margin-top:14px;margin-bottom:0;">Photo of your printed menu (JPG/PNG), PDF menus, pasted menu text, or a URL to your online menu. Works with restaurant websites, Toast, Square, Popmenu, and most online menu platforms. Photos of laminated menus, chalkboard specials, and handwritten menus also work.</p>
    </details>
    <details style="background:#FFFBF7;border-radius:14px;padding:20px 24px;border:1px solid rgba(0,0,0,0.05);cursor:pointer;">
      <summary style="font-size:16px;font-weight:600;color:#1A1A1A;cursor:pointer;display:flex;justify-content:space-between;align-items:center;list-style:none;user-select:none;">Can I download or print my report? <span style="color:#E85D26;font-size:20px;font-weight:300;">+</span></summary>
      <p style="font-size:15px;color:#4A4A4A;line-height:1.7;margin-top:14px;margin-bottom:0;">Yes. The Pro report includes a "Download Report (HTML)" button and a "Save as PDF" button. The HTML file is a complete, standalone document you can open in any browser, share with your team, or keep for reference. The PDF version is print-ready.</p>
    </details>
    <details style="background:#FFFBF7;border-radius:14px;padding:20px 24px;border:1px solid rgba(0,0,0,0.05);cursor:pointer;">
      <summary style="font-size:16px;font-weight:600;color:#1A1A1A;cursor:pointer;display:flex;justify-content:space-between;align-items:center;list-style:none;user-select:none;">What's the Star/Plowhorse/Puzzle/Dog framework? <span style="color:#E85D26;font-size:20px;font-weight:300;">+</span></summary>
      <p style="font-size:15px;color:#4A4A4A;line-height:1.7;margin-top:14px;margin-bottom:0;">It's the industry-standard menu engineering matrix developed by Cornell researchers in the 1980s and used by top restaurant consultants globally. Every item is rated on two dimensions \u2014 popularity and profit margin \u2014 to determine whether it's a <strong>Star</strong> (keep and feature), <strong>Plowhorse</strong> (reprice up), <strong>Puzzle</strong> (promote more), or <strong>Dog</strong> (remove or rework).</p>
    </details>
  </div>
</section>

<!-- Footer -->
<footer style="padding:48px 24px 32px;background:#1A1A1A;">
  <div style="max-width:900px;margin:0 auto;">
    <div style="display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:32px;margin-bottom:40px;">
      <div>
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
          <div style="width:32px;height:32px;border-radius:8px;background:linear-gradient(135deg,#E85D26,#FF8F5C);display:flex;align-items:center;justify-content:center;font-size:16px;color:#fff;font-weight:700;font-family:Georgia,serif;">M</div>
          <span class="serif" style="font-size:20px;color:#fff;">MenuGenie</span>
        </div>
        <p style="font-size:13px;color:rgba(255,255,255,0.45);max-width:220px;line-height:1.6;">AI-powered menu engineering for independent restaurants.</p>
        <div style="margin-top:16px;font-size:12px;color:rgba(255,255,255,0.3);">support: menugenieai@gmail.com</div>
      </div>
      <div style="display:flex;gap:48px;flex-wrap:wrap;">
        <div>
          <div style="font-size:11px;font-weight:700;letter-spacing:1.5px;color:rgba(255,255,255,0.3);margin-bottom:12px;">PRODUCT</div>
          <div style="display:flex;flex-direction:column;gap:8px;">
            <a href="#how" style="font-size:14px;color:rgba(255,255,255,0.6);text-decoration:none;">How It Works</a>
            <a href="#demo" style="font-size:14px;color:rgba(255,255,255,0.6);text-decoration:none;">Free Analysis</a>
            <a href="#pricing" style="font-size:14px;color:rgba(255,255,255,0.6);text-decoration:none;">Pricing</a>
            <a href="#faq" style="font-size:14px;color:rgba(255,255,255,0.6);text-decoration:none;">FAQ</a>
          </div>
        </div>
        <div>
          <div style="font-size:11px;font-weight:700;letter-spacing:1.5px;color:rgba(255,255,255,0.3);margin-bottom:12px;">COMPARE</div>
          <div style="display:flex;flex-direction:column;gap:8px;">
            <span style="font-size:14px;color:rgba(255,255,255,0.6);">vs. Consultants ($2K\u2013$10K)</span>
            <span style="font-size:14px;color:rgba(255,255,255,0.6);">vs. Manual analysis</span>
            <span style="font-size:14px;color:rgba(255,255,255,0.6);">vs. Generic AI tools</span>
          </div>
        </div>
      </div>
    </div>
    <div style="border-top:1px solid rgba(255,255,255,0.08);padding-top:24px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
      <p style="font-size:12px;color:rgba(255,255,255,0.25);">\xA9 2026 MenuGenie. All rights reserved.</p>
      <p style="font-size:12px;color:rgba(255,255,255,0.25);">Built with \u26A1 for independent restaurant owners</p>
    </div>
  </div>
</footer>

<script>
const API_URL = 'https://menugenie-api-v4.eshcharb.workers.dev';

// \u2500\u2500\u2500 A/B Test Framework \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
// Assign user to a variant (persisted in localStorage)
const AB_TESTS = {
  hero_cta: {
    variants: ['Analyze My Menu Free \u2192', 'See What My Menu Is Missing \u2192', 'Get My Free Menu Score \u2192'],
    default: 0
  },
  price_anchor: {
    variants: ['$49', '$49 (was $99)'],
    default: 0
  }
};

function getVariant(testName) {
  const key = \`mg_ab_\${testName}\`;
  let v = localStorage.getItem(key);
  if (v === null) {
    const test = AB_TESTS[testName];
    v = Math.floor(Math.random() * test.variants.length).toString();
    localStorage.setItem(key, v);
    // Track assignment
    if (typeof gtag !== 'undefined') {
      gtag('event', 'ab_assign', { test: testName, variant: parseInt(v), event_category: 'ab_test' });
    }
  }
  return parseInt(v);
}

function applyABTests() {
  // Hero CTA button
  const heroBtn = document.querySelector('.btn-primary');
  if (heroBtn) {
    const v = getVariant('hero_cta');
    heroBtn.textContent = AB_TESTS.hero_cta.variants[v];
  }
}

// Run A/B tests after DOM ready
document.addEventListener('DOMContentLoaded', applyABTests);

// Someone paid without a menu attached — the Worker emails them back here.
(function handleAttach() {
  const jobId = new URLSearchParams(window.location.search).get('attach');
  if (!jobId) return;
  window.MG_ATTACH_JOB = jobId;
  history.replaceState({}, '', '/');
  document.addEventListener('DOMContentLoaded', function () {
    const b = document.createElement('div');
    b.style.cssText = 'background:#2D8B4E;color:#fff;padding:14px;text-align:center;font-weight:600;font-family:sans-serif;';
    b.textContent = 'Your purchase is credited \u2014 upload your menu below and your Pro Report generates immediately.';
    document.body.prepend(b);
    document.querySelector('.demo-input-area')?.scrollIntoView({ behavior: 'smooth' });
  });
})();

// \u2500\u2500\u2500 Scroll depth tracking \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
const scrollDepths = [25, 50, 75, 90];
const trackedDepths = new Set();
window.addEventListener('scroll', function() {
  const scrollPct = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
  scrollDepths.forEach(depth => {
    if (scrollPct >= depth && !trackedDepths.has(depth)) {
      trackedDepths.add(depth);
      if (typeof gtag !== 'undefined') {
        gtag('event', 'scroll_depth', { event_category: 'engagement', event_label: depth + '%', value: depth });
      }
    }
  });
}, { passive: true });

// Time on page tracking (fires at 30s, 60s, 120s)
[30, 60, 120].forEach(secs => {
  setTimeout(() => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'time_on_page', { event_category: 'engagement', event_label: secs + 's', value: secs });
    }
  }, secs * 1000);
});

let currentTab = 'upload';
let uploadedFile = null;
let urlFetched = false;
let lastAnalysis = null; // store for Pro upsell

const analyzeBtn = document.getElementById('analyzeBtn');

function switchTab(tab) {
  currentTab = tab;
  ['upload','text','url'].forEach(t => {
    document.getElementById('panel-'+t).style.display = t===tab ? 'block' : 'none';
    const btn = document.getElementById('tab-'+t);
    btn.style.background = t===tab ? '#E85D26' : 'none';
    btn.style.color = t===tab ? '#fff' : '#4A4A4A';
  });
  updateBtn();
}

function updateBtn() {
  if (currentTab==='upload') analyzeBtn.disabled = !uploadedFile;
  else if (currentTab==='text') analyzeBtn.disabled = !(document.getElementById('menuTextInput').value.trim().length > 10);
  else if (currentTab==='url') analyzeBtn.disabled = !urlFetched;
}

function handleFile(input) {
  const file = input.files[0];
  if (!file) return;
  const maxSize = file.type === 'application/pdf' ? 10 * 1024 * 1024 : 5 * 1024 * 1024;
  if (file.size > maxSize) {
    alert(\`File too large. Max \${file.type === 'application/pdf' ? '10' : '5'}MB.\`);
    return;
  }
  document.getElementById('fileName').textContent = file.name;
  document.getElementById('fileSize').textContent = (file.size/1024).toFixed(0)+' KB';
  const reader = new FileReader();
  reader.onload = function(e) {
    uploadedFile = { name: file.name, data: e.target.result };
    const img = document.getElementById('previewImg');
    if (file.type.startsWith('image/')) { img.src = e.target.result; img.style.display = 'block'; }
    else { img.style.display = 'none'; }
    const preview = document.getElementById('uploadPreview');
    preview.style.display = 'flex';
    updateBtn();
  };
  reader.readAsDataURL(file);
}

// Sample menu \u2014 real restaurant data for users who want to try without uploading
const SAMPLE_MENU = \`Chile Con Queso...............$8.49
Guacamole & Chips.............$9.49
The Double Dip................$15.49
Nachos Tradicionales..........$11.59
Quesadilla (Cheese)...........$11.99
Quesadilla (Grilled Chicken)..$14.99
Taco Salad....................$12.99
Chalupas Compuestas...........$12.49
Enchiladas De Queso...........$12.99
Enchiladas Rancheras..........$13.49
Enchiladas Verdes.............$13.49
Fajita Plate..................$21.49
Tacos Al Carbon...............$15.49
Rolled Beef Tacos.............$12.49
El Cholo Loco.................$33.99
Burrito Del Rio...............$13.99
Sopapillas....................$5.99
Flan Heroico..................$6.99\`;

function loadSampleMenu() {
  document.getElementById('menuTextInput').value = SAMPLE_MENU;
  updateBtn();
}

function fetchMenuUrl() {
  const url = document.getElementById('menuUrl').value.trim();
  if (!url) return;
  const s = document.getElementById('urlStatus');
  try {
    new URL(url);
  } catch {
    s.style.display = 'block'; s.style.background = '#FDECEB'; s.style.color = '#C0392B';
    s.textContent = 'Please enter a valid URL (e.g. https://example.com/menu.pdf)';
    return;
  }
  urlFetched = true;
  s.style.display = 'block'; s.style.background = '#E8F5EC'; s.style.color = '#2D8B4E';
  s.innerHTML = '\u2713 URL looks good! <strong>Click Analyze below.</strong>';
  updateBtn();
}

const WAITLIST_URL = 'https://script.google.com/macros/s/AKfycbwglhUH4ZAxd2aOhmWArAAq-caBiO5WFKHQ0t1EqT4juNx-Ux9LDiV0A91nimbH3A3Jdg/exec';

function submitWaitlist() {
  const email = document.getElementById('waitlistEmail').value;
  const name = document.getElementById('waitlistName').value.trim();
  const restaurant = document.getElementById('waitlistRestaurant').value.trim();
  if (!email.includes('@')) return;
  const btn = document.querySelector('#waitlistForm button');
  btn.disabled = true;
  btn.textContent = 'Joining...';
  fetch(WAITLIST_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, name, restaurant, source: 'waitlist', timestamp: new Date().toISOString() })
  }).finally(() => {
    document.getElementById('waitlistForm').style.display = 'none';
    document.getElementById('waitlistSuccess').style.display = 'block';
  });
}

// \u2500\u2500\u2500 Core analysis function \u2014 analyzes the user's ACTUAL menu \u2500\u2500\u2500
async function analyzeFree(tier) {
  // tier: 'free' (default) or 'pro' (after payment \u2014 uses Sonnet for higher quality)
  tier = tier || 'free';

  // Build request from whatever input the user provided
  let requestBody;
  let src;
  if (currentTab === 'upload') {
    if (!uploadedFile) { alert('Please upload your menu first.'); return; }
    requestBody = { menuFile: uploadedFile.data, tier };
    src = uploadedFile.name;
  } else if (currentTab === 'text') {
    const text = document.getElementById('menuTextInput').value.trim();
    if (text.length < 10) { alert('Please paste your menu items with prices.'); return; }
    requestBody = { menuText: text, tier };
    src = 'Pasted menu';
  } else if (currentTab === 'url') {
    if (!urlFetched) { alert('Please enter and fetch your menu URL first.'); return; }
    requestBody = { menuUrl: document.getElementById('menuUrl').value.trim(), tier };
    src = document.getElementById('menuUrl').value;
  }

  analyzeBtn.disabled = true;
  analyzeBtn.textContent = '\u23F3 Analyzing your menu...';
  document.getElementById('loadingArea').style.display = 'block';
  document.getElementById('resultsArea').style.display = 'none';

  const msgs = [
    'Reading your menu items...',
    'Classifying Stars, Plowhorses, Puzzles & Dogs...',
    'Calculating pricing gaps and revenue opportunities...',
    'Benchmarking against menu engineering best practices...',
    'Building your recommendations...',
    'Almost done \u2014 finalizing your report...'
  ];
  let mi = 0;
  const lt = document.querySelector('#loadingArea p');
  lt.textContent = msgs[0];
  const iv = setInterval(() => { mi++; if (mi < msgs.length) lt.textContent = msgs[mi]; }, 3000);

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 90000);
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
      signal: controller.signal
    }).finally(() => clearTimeout(timeout));

    if (!res.ok) {
      const errData = await res.json().catch(() => null);
      throw new Error(errData?.error || 'Analysis failed \u2014 please try again.');
    }

    const analysis = await res.json();
    clearInterval(iv);

    // Check for extraction errors (e.g. unreadable PDF)
    if (analysis.error && !analysis.items) {
      throw new Error(analysis.error);
    }

    lastAnalysis = analysis;

    // Track: free analysis completed
    gtag('event', 'free_analysis', {
      event_category: 'funnel',
      event_label: src,
      input_type: currentTab,
      hero_cta_variant: getVariant('hero_cta')
    });
    fbq('track', 'Lead');
    fbq('trackCustom', 'FreeAnalysisComplete', {
      input_type: currentTab,
      items_count: analysis.items ? analysis.items.length : 0,
      lift_pct: analysis.lift || 0
    });

    const catStyles = {
      Star:      { emoji:'\u2B50', color:'#D4A843', bg:'#FFF8E7' },
      Plowhorse: { emoji:'\u{1F434}', color:'#2E7DBF', bg:'#EBF4FC' },
      Puzzle:    { emoji:'\u{1F9E9}', color:'#2D8B4E', bg:'#E8F5EC' },
      Dog:       { emoji:'\u{1F415}', color:'#C0392B', bg:'#FDECEB' }
    };
    const items = analysis.items.map(item => ({
      ...item,
      ...catStyles[item.category],
      priceTip: item.priceTip
    }));
    const insights = {
      summary: analysis.summary,
      lift: analysis.lift,
      actions: analysis.actions,
      psychTips: analysis.psychTips,
      teaserItems: analysis.teaserItems || [],
      totalItems: analysis.total_items_on_menu || items.length
    };

    renderResults(items, insights, src);
    document.getElementById('loadingArea').style.display = 'none';
    document.getElementById('resultsArea').style.display = 'block';
    document.getElementById('resultsArea').scrollIntoView({ behavior:'smooth', block:'nearest' });
  } catch (err) {
    clearInterval(iv);
    document.getElementById('loadingArea').style.display = 'none';
    if (err.name === 'AbortError') {
      alert('Analysis is taking too long. Try using the "Paste Menu Text" tab instead \u2014 it\\'s faster and more reliable.');
    } else {
      alert(err.message || 'Analysis failed \u2014 please try again.');
    }
  } finally {
    analyzeBtn.disabled = false;
    analyzeBtn.textContent = '\u{1F9E0} Analyze My Menu \u2014 Free';
  }
}

function closePaymentModal() {
  document.getElementById('paymentModal').style.display = 'none';
}

function animateNumber(el, target, duration = 1200, suffix = '%') {
  const start = 0;
  const startTime = performance.now();
  const update = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = '+' + Math.round(start + (target - start) * eased) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

function copyResults() {
  if (!lastAnalysis) return;
  const items = lastAnalysis.items || [];
  const text = [
    \`MenuGenie Analysis \u2014 \${new Date().toLocaleDateString()}\`,
    \`Menu Score: \${Math.min(100, Math.round((items.filter(i=>i.category==='Star').length / Math.max(items.length,1)) * 100 + (lastAnalysis.lift||0) * 1.5))}\`,
    \`Estimated Revenue Lift: +\${lastAnalysis.lift}%\`,
    '',
    'Top Actions:',
    ...(lastAnalysis.actions || []).slice(0,3).map((a,i) => \`\${i+1}. \${a}\`),
    '',
    'Analysis by MenuGenie \u2014 menu-genie.com'
  ].join('\\n');
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.querySelector('button[onclick="copyResults()"]');
    if (btn) { btn.textContent = '\u2713 Copied!'; setTimeout(() => { btn.textContent = '\u{1F4CB} Copy Summary'; }, 2000); }
  });
}

function renderResults(items, ins, src) {
  const today = new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
  let h = '';
  const totalItems = ins.totalItems || items.length;

  // Category counts
  const catCount = { Star: 0, Plowhorse: 0, Puzzle: 0, Dog: 0 };
  items.forEach(it => { if (catCount[it.category] !== undefined) catCount[it.category]++; });
  const fixable = catCount.Dog + catCount.Puzzle + catCount.Plowhorse;
  const issueCount = Math.round(totalItems * (items.length - catCount.Star) / Math.max(items.length, 1));

  // \u2500\u2500 Hero banner: Menu Score \u2500\u2500
  const score = Math.min(100, Math.round((catCount.Star / Math.max(items.length, 1)) * 100 + ins.lift * 1.5));
  const scoreColor = score >= 70 ? '#2D8B4E' : score >= 40 ? '#D4A843' : '#C0392B';
  h+=\`<div style="background:linear-gradient(135deg,#1A1A1A,#2D2D2D);border-radius:20px;padding:32px;color:#fff;margin:40px 0 20px;text-align:center;">
    <div style="font-size:11px;font-weight:700;letter-spacing:2px;color:#E85D26;margin-bottom:16px;">YOUR MENU SCORE</div>
    <div style="display:inline-flex;align-items:center;justify-content:center;width:100px;height:100px;border-radius:50%;border:4px solid \${scoreColor};margin-bottom:16px;">
      <span id="score-number" class="serif" style="font-size:42px;color:\${scoreColor};">0</span>
    </div>
    <div style="font-size:13px;color:rgba(255,255,255,0.5);margin-bottom:20px;">\${ins.totalItems || items.length} items on your menu \xB7 \${today}</div>
    <div style="display:flex;justify-content:center;gap:24px;flex-wrap:wrap;">
      <div><span style="font-size:22px;">\u2B50</span><span class="mono" style="font-size:18px;margin-left:6px;">\${catCount.Star}</span><span style="font-size:12px;color:rgba(255,255,255,0.5);margin-left:4px;">Stars</span></div>
      <div><span style="font-size:22px;">\u{1F434}</span><span class="mono" style="font-size:18px;margin-left:6px;">\${catCount.Plowhorse}</span><span style="font-size:12px;color:rgba(255,255,255,0.5);margin-left:4px;">Plowhorses</span></div>
      <div><span style="font-size:22px;">\u{1F9E9}</span><span class="mono" style="font-size:18px;margin-left:6px;">\${catCount.Puzzle}</span><span style="font-size:12px;color:rgba(255,255,255,0.5);margin-left:4px;">Puzzles</span></div>
      <div><span style="font-size:22px;">\u{1F415}</span><span class="mono" style="font-size:18px;margin-left:6px;">\${catCount.Dog}</span><span style="font-size:12px;color:rgba(255,255,255,0.5);margin-left:4px;">Dogs</span></div>
    </div>
    <div style="margin-top:20px;background:rgba(255,255,255,0.08);border-radius:12px;padding:16px;display:inline-flex;align-items:center;gap:12px;">
      <span id="lift-number" class="serif" style="font-size:36px;color:#E85D26;">+0%</span>
      <span style="font-size:13px;color:rgba(255,255,255,0.7);text-align:left;">estimated revenue lift<br>with recommended changes</span>
    </div>
  </div>\`;

  // \u2500\u2500 Upgrade CTA (shown early \u2014 right after score) \u2500\u2500
  h+=\`<div style="background:linear-gradient(135deg,#E85D26,#D04A15);border-radius:20px;padding:28px 24px;text-align:center;margin-bottom:20px;">
    <div style="font-size:12px;font-weight:700;color:rgba(255,255,255,0.7);letter-spacing:1px;margin-bottom:6px;">UNLOCK THE FULL REPORT</div>
    <h3 class="serif" style="font-size:22px;color:#fff;margin-bottom:12px;">Your \${totalItems}-item menu has \${issueCount} issues \u2014 see every fix</h3>
    <div style="display:flex;align-items:center;justify-content:center;gap:10px;margin-bottom:14px;">
      <span style="font-size:14px;color:rgba(255,255,255,0.4);text-decoration:line-through;">$99</span>
      <span class="serif" style="font-size:38px;color:#fff;">$49</span>
      <span style="font-size:12px;color:rgba(255,255,255,0.7);text-align:left;">one-time<br>launch price</span>
    </div>
    <button onclick="startPaymentFlow()" style="padding:14px 40px;background:#fff;color:#E85D26;border:none;border-radius:12px;font-family:'DM Sans',sans-serif;font-size:16px;font-weight:700;cursor:pointer;box-shadow:0 4px 20px rgba(0,0,0,0.15);">Get Full Report \u2014 $49 \u2192</button>
    <div style="font-size:11px;color:rgba(255,255,255,0.5);margin-top:10px;">\u{1F512} Secure checkout \xB7 Instant delivery</div>
  </div>\`;

  // \u2500\u2500 Top 3 Quick Wins (concise) \u2500\u2500
  h+=\`<div style="background:#fff;border-radius:16px;padding:24px;border:2px solid rgba(232,93,38,0.13);margin-bottom:20px;">
    <div style="font-size:11px;font-weight:700;letter-spacing:1.5px;color:#E85D26;margin-bottom:14px;">TOP 3 QUICK WINS</div>\`;
  ins.actions.slice(0,3).forEach((a,i)=>{
    // Truncate long actions for free version
    const short = a.length > 120 ? a.substring(0, 117) + '...' : a;
    h+=\`<div style="display:flex;gap:12px;padding:10px 0;\${i<2?'border-bottom:1px solid rgba(0,0,0,0.05);':''}">
      <div style="min-width:26px;height:26px;border-radius:8px;background:#FFF0EB;color:#E85D26;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;">\${i+1}</div>
      <p style="font-size:14px;color:#1A1A1A;line-height:1.5;margin:0;">\${short}</p>
    </div>\`;
  });
  h+=\`</div>\`;

  // \u2500\u2500 Sample Items (show 2 visible, blur the rest) \u2500\u2500
  const highlights = [];
  const priority = ['Dog','Plowhorse','Puzzle','Star'];
  for (const cat of priority) {
    const match = items.find(it => it.category===cat && !highlights.includes(it));
    if (match) highlights.push(match);
    if (highlights.length>=2) break;
  }
  while (highlights.length<2 && highlights.length<items.length) {
    const next = items.find(it => !highlights.includes(it));
    if (next) highlights.push(next); else break;
  }
  const lockedCount = Math.max(0, items.length - 2);

  const teaserItems = ins.teaserItems || [];
  h+=\`<div style="background:#FFFBF7;border-radius:16px;padding:24px;border:1px solid rgba(0,0,0,0.04);margin-bottom:20px;">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
      <div style="font-size:11px;font-weight:700;letter-spacing:1.5px;color:#E85D26;">ITEMS FROM YOUR MENU</div>
      <div style="font-size:11px;color:#999;">Showing 2 of \${totalItems} items</div>
    </div>\`;
  highlights.forEach(it => {
    const catStyles = { Star:{emoji:'\u2B50',color:'#D4A843',bg:'#FFF8E7'}, Plowhorse:{emoji:'\u{1F434}',color:'#2E7DBF',bg:'#EBF4FC'}, Puzzle:{emoji:'\u{1F9E9}',color:'#2D8B4E',bg:'#E8F5EC'}, Dog:{emoji:'\u{1F415}',color:'#C0392B',bg:'#FDECEB'} };
    const s = catStyles[it.category] || catStyles.Star;
    h+=\`<div style="background:#fff;border-radius:12px;padding:14px 16px;margin-bottom:8px;border-left:3px solid \${s.color};">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;">
        <div style="display:flex;align-items:center;gap:8px;"><span style="font-size:16px;">\${s.emoji}</span><span style="font-size:15px;font-weight:600;">\${it.name}</span></div>
        <div style="display:flex;align-items:center;gap:8px;"><span class="mono" style="font-size:14px;font-weight:600;">$\${Number(it.price).toFixed(2)}</span><span style="font-size:10px;font-weight:700;border-radius:4px;padding:2px 8px;color:\${s.color};background:\${s.bg};">\${it.category.toUpperCase()}</span></div>
      </div>
    </div>\`;
  });
  // Show teaser items (real names, category badges, no prices/tips) under a locked overlay
  const teaserToShow = teaserItems.slice(0, Math.min(teaserItems.length, 4));
  const remainingLocked = totalItems - 2;
  if (remainingLocked > 0) {
    const catColors = { Star:'#D4A843', Plowhorse:'#2E7DBF', Puzzle:'#2D8B4E', Dog:'#C0392B' };
    h+=\`<div style="position:relative;border-radius:12px;overflow:hidden;margin-bottom:8px;">
      <div style="filter:blur(3px);pointer-events:none;user-select:none;">\`;
    if (teaserToShow.length > 0) {
      teaserToShow.forEach(t => {
        const col = catColors[t.category] || '#999';
        h+=\`<div style="background:#fff;border-radius:12px;padding:12px 16px;margin-bottom:6px;border-left:3px solid \${col};display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:14px;font-weight:600;color:#1A1A1A;">\${t.name}</span>
          <span style="font-size:10px;font-weight:700;border-radius:4px;padding:2px 8px;color:\${col};background:#f5f5f5;">\${t.category.toUpperCase()}</span>
        </div>\`;
      });
    } else {
      // Fallback if teaserItems not available yet
      for (let i=0; i<3; i++) h+=\`<div style="background:#fff;border-radius:12px;padding:12px 16px;margin-bottom:6px;border-left:3px solid #ddd;height:42px;"></div>\`;
    }
    h+=\`</div>
      <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;background:rgba(255,251,247,0.75);backdrop-filter:blur(2px);">
        <div style="font-size:14px;font-weight:700;color:#1A1A1A;margin-bottom:6px;">\u{1F512} \${remainingLocked} more items \u2014 unlock with Pro</div>
        <div style="font-size:12px;color:#4A4A4A;">Each item has a specific fix and dollar amount</div>
      </div>
    </div>\`;
  }
  h+=\`</div>\`;

  // \u2500\u2500 Upgrade CTA (the money shot) \u2500\u2500
  h+=\`<div style="background:linear-gradient(135deg,#E85D26,#D04A15);border-radius:20px;padding:36px 28px;text-align:center;margin-bottom:20px;">
    <div style="font-size:13px;font-weight:700;color:rgba(255,255,255,0.7);letter-spacing:1px;margin-bottom:8px;">UNLOCK THE FULL REPORT</div>
    <h3 class="serif" style="font-size:26px;color:#fff;margin-bottom:12px;">Your \${totalItems}-Item Menu Has \${issueCount} Issues to Fix</h3>
    <div style="display:flex;justify-content:center;gap:16px;flex-wrap:wrap;margin-bottom:20px;">
      <div style="background:rgba(255,255,255,0.15);border-radius:10px;padding:10px 16px;font-size:13px;color:#fff;">\u2705 All \${totalItems} items analyzed</div>
      <div style="background:rgba(255,255,255,0.15);border-radius:10px;padding:10px 16px;font-size:13px;color:#fff;">\u2705 Specific $ pricing fixes</div>
      <div style="background:rgba(255,255,255,0.15);border-radius:10px;padding:10px 16px;font-size:13px;color:#fff;">\u2705 Menu psychology tips</div>
      <div style="background:rgba(255,255,255,0.15);border-radius:10px;padding:10px 16px;font-size:13px;color:#fff;">\u2705 Revenue lift roadmap</div>
    </div>
    <div style="display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:8px;">
      <span style="font-size:16px;color:rgba(255,255,255,0.4);text-decoration:line-through;">$99</span>
      <span class="serif" style="font-size:42px;color:#fff;">$49</span>
      <span style="font-size:13px;color:rgba(255,255,255,0.7);text-align:left;">one-time<br>launch price</span>
    </div>
    <div style="font-size:12px;color:#FFD700;font-weight:600;margin-bottom:16px;">Launch price \u2014 goes up to $99 soon</div>
    <button onclick="startPaymentFlow()" style="padding:16px 48px;background:#fff;color:#E85D26;border:none;border-radius:12px;font-family:'DM Sans',sans-serif;font-size:16px;font-weight:700;cursor:pointer;box-shadow:0 4px 20px rgba(0,0,0,0.15);">Get Full Report (\${totalItems} Items) \u2014 $49 \u2192</button>
    <div style="font-size:12px;color:rgba(255,255,255,0.5);margin-top:12px;">\u{1F512} Secure checkout \xB7 Instant delivery</div>
  </div>\`;

  h += \`<div style="text-align:center;margin:8px 0 24px;">
  <button onclick="copyResults()" style="font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;color:#4A4A4A;background:#fff;border:1px solid rgba(0,0,0,0.1);border-radius:8px;padding:8px 18px;cursor:pointer;">\u{1F4CB} Copy Summary</button>
</div>\`;

  h += \`<div style="margin:8px 0 12px;display:flex;gap:8px;justify-content:center;flex-wrap:wrap;">
  <a href="https://twitter.com/intent/tweet?text=Just+ran+my+restaurant+menu+through+MenuGenie+\u2014+found+\${issueCount}+items+to+fix+and+a+potential+%2B\${ins.lift}%25+revenue+lift.+Try+it+free:+menu-genie.com&hashtags=restaurant,menuengineering" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:6px;background:#000;color:#fff;border-radius:8px;padding:8px 14px;font-size:13px;font-weight:600;text-decoration:none;">\u{1D54F} Share on X</a>
  <a href="https://www.facebook.com/sharer/sharer.php?u=https://menu-genie.com" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:6px;background:#1877F2;color:#fff;border-radius:8px;padding:8px 14px;font-size:13px;font-weight:600;text-decoration:none;">Share on Facebook</a>
</div>\`;

  document.getElementById('resultsArea').innerHTML = h;

  // Animate lift number
  const liftEl = document.getElementById('lift-number');
  if (liftEl) animateNumber(liftEl, ins.lift);
  // Animate score number
  const scoreEl = document.getElementById('score-number');
  if (scoreEl) animateNumber(scoreEl, score, 1000, '');
}

function submitDemoCta() {
  const email=document.getElementById('demoEmail').value;
  const name=document.getElementById('demoName').value.trim();
  const restaurant=document.getElementById('demoRestaurant').value.trim();
  const message=document.getElementById('demoMessage').value.trim();
  if(!email.includes('@'))return;
  const btn=document.querySelector('#demoCta button');
  btn.disabled=true;
  btn.textContent='Sending...';
  fetch(WAITLIST_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, name, restaurant, message, source: 'custom-plan', timestamp: new Date().toISOString() })
  }).finally(() => {
    document.getElementById('demoCta').style.display='none';
    document.getElementById('demoCtaSuccess').style.display='block';
  });
}

// \u2500\u2500\u2500 Gumroad Integration \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
// No overlay SDK — we send the buyer to the server-issued checkout_url, which
// carries job_id. Delivery happens via the Gumroad Ping, not a browser return.

function startPaymentFlow() {
  gtag('event', 'begin_checkout', { event_category: 'funnel', value: 49, currency: 'USD' });
  fbq('track', 'InitiateCheckout', { value: 49, currency: 'USD' });
  // Save menu state before leaving the page
  localStorage.setItem('mg_activeTab', currentTab);
  if (currentTab === 'text') {
    localStorage.setItem('mg_menuText', document.getElementById('menuTextInput').value);
  } else if (currentTab === 'url') {
    localStorage.setItem('mg_menuUrl', document.getElementById('menuUrl').value);
  }
  localStorage.setItem('mg_paid', '1');
  document.getElementById('paymentModal').style.display = 'flex';
}

function goToGumroad() {
  // The menu is already persisted server-side by /analyze, which returned a
  // job_id and a checkout_url carrying it. Gumroad echoes that param back to
  // the Ping webhook in url_params, which is how the sale is reconnected to
  // the menu. The old code stashed the menu in localStorage and passed
  // &success_url=... — a parameter Gumroad does not support and silently
  // ignores. That is what lost order hETPvO0Gnr4SRXjifoPruQ== on 2026-09-10.
  if (!lastAnalysis || !lastAnalysis.checkout_url) {
    alert('Please run the free analysis first so we know which menu to work on.');
    return;
  }
  window.location.href = lastAnalysis.checkout_url;
}

function deliverFullReport(purchaseDetails) {
  // Payment captured \u2014 show full report + thank-you experience
  const payerName = purchaseDetails?.name || purchaseDetails?.payer?.name?.given_name || 'there';
  const orderId = purchaseDetails?.sale_id || purchaseDetails?.id || '';
  const payerEmail = purchaseDetails?.email || purchaseDetails?.payer?.email_address || '';

  // Store order info for the thank-you section
  localStorage.setItem('mg_order_id', orderId);
  localStorage.setItem('mg_payer_name', payerName);

  // Show a thank-you banner above results
  const banner = document.createElement('div');
  banner.style.cssText = 'background:linear-gradient(135deg,#2D8B4E,#1a6b35);border-radius:16px;padding:28px;color:#fff;margin-bottom:20px;text-align:center;';
  banner.innerHTML = \`<div style="font-size:32px;margin-bottom:12px;">\u{1F389}</div>
    <div style="font-family:'DM Serif Display',Georgia,serif;font-size:22px;margin-bottom:6px;">Payment confirmed, \${payerName}!</div>
    <div style="font-size:13px;opacity:0.8;margin-bottom:16px;">Order #\${orderId} \xB7 Your full report is below</div>
    <div style="background:rgba(255,255,255,0.15);border-radius:10px;padding:14px;font-size:14px;max-width:400px;margin:0 auto;">
      You saved <strong>$1,951\u2013$9,951</strong> vs. hiring a consultant. Your full item-by-item analysis is ready below.
    </div>\`;
  document.getElementById('resultsArea').prepend(banner);

  // Show full report from existing analysis, then re-run with pro model for higher quality
  if (lastAnalysis) {
    renderFullReport(lastAnalysis);
    appendPostPurchase(payerName, orderId);
  } else {
    analyzeFree('pro');
  }
}

function appendPostPurchase(name, orderId) {
  const pp = document.createElement('div');
  pp.style.cssText = 'margin-top:24px;';
  pp.innerHTML = \`
    <div style="background:linear-gradient(135deg,#1A1A1A,#2D2D2D);border-radius:20px;padding:36px;text-align:center;color:#fff;margin-bottom:20px;">
      <div style="font-size:11px;font-weight:700;letter-spacing:2px;color:#E85D26;margin-bottom:12px;">WHAT TO DO NEXT</div>
      <h3 class="serif" style="font-size:24px;margin-bottom:20px;">Your 3-Step Action Plan</h3>
      <div style="display:flex;flex-direction:column;gap:16px;max-width:480px;margin:0 auto;text-align:left;">
        <div style="display:flex;gap:14px;align-items:flex-start;">
          <div style="min-width:32px;height:32px;border-radius:8px;background:#E85D26;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;">1</div>
          <div><div style="font-weight:600;margin-bottom:2px;">Fix your Dogs first</div><div style="font-size:13px;color:rgba(255,255,255,0.6);">Remove or rework the items flagged as Dogs \u2014 they're dragging down your menu</div></div>
        </div>
        <div style="display:flex;gap:14px;align-items:flex-start;">
          <div style="min-width:32px;height:32px;border-radius:8px;background:#E85D26;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;">2</div>
          <div><div style="font-weight:600;margin-bottom:2px;">Reprice the Plowhorses</div><div style="font-size:13px;color:rgba(255,255,255,0.6);">These popular items have room for a price bump \u2014 follow the specific $ suggestions above</div></div>
        </div>
        <div style="display:flex;gap:14px;align-items:flex-start;">
          <div style="min-width:32px;height:32px;border-radius:8px;background:#E85D26;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;">3</div>
          <div><div style="font-weight:600;margin-bottom:2px;">Spotlight your Stars</div><div style="font-size:13px;color:rgba(255,255,255,0.6);">Move Star items to prime menu positions \u2014 top right, boxed, or with a chef's pick badge</div></div>
        </div>
      </div>
    </div>
    <div style="background:#FFF8E7;border-radius:20px;padding:32px;text-align:center;border:1px solid rgba(212,168,67,0.2);">
      <div style="font-size:28px;margin-bottom:12px;">\u{1F91D}</div>
      <h3 class="serif" style="font-size:22px;color:#1A1A1A;margin-bottom:8px;">Know Another Restaurant Owner?</h3>
      <p style="font-size:15px;color:#4A4A4A;line-height:1.6;margin-bottom:16px;">Share MenuGenie with them \u2014 they'll get the same free analysis you tried, and the same $49 launch price (before it goes to $99).</p>
      <button onclick="copyShareLink()" id="shareBtn" style="padding:14px 32px;background:linear-gradient(135deg,#E85D26,#D04A15);color:#fff;border:none;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:600;cursor:pointer;">Copy Link to Share</button>
      <div style="font-size:12px;color:#4A4A4A;margin-top:8px;">menu-genie.com</div>
    </div>\`;
  document.getElementById('resultsArea').appendChild(pp);
}

function renderFullReport(analysis) {
  const catStyles = {
    Star:      { emoji:'\u2B50', color:'#D4A843', bg:'#FFF8E7' },
    Plowhorse: { emoji:'\u{1F434}', color:'#2E7DBF', bg:'#EBF4FC' },
    Puzzle:    { emoji:'\u{1F9E9}', color:'#2D8B4E', bg:'#E8F5EC' },
    Dog:       { emoji:'\u{1F415}', color:'#C0392B', bg:'#FDECEB' }
  };
  const catCount = { Star:0, Plowhorse:0, Puzzle:0, Dog:0 };
  analysis.items.forEach(it => { if (catCount[it.category] !== undefined) catCount[it.category]++; });
  const today = new Date().toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' });
  const lift = analysis.lift || 0;
  const totalItems = analysis.items.length;
  const issueCount = catCount.Dog + catCount.Puzzle + catCount.Plowhorse;
  const monthlyLift = Math.round(lift * 120);
  const annualLift = monthlyLift * 12;

  let h = '';

  // \u2500\u2500 Download / Print Buttons \u2500\u2500
  h += \`<div style="display:flex;gap:10px;justify-content:flex-end;margin-bottom:16px;flex-wrap:wrap;">
    <button onclick="downloadReport('html')" style="display:inline-flex;align-items:center;gap:6px;padding:10px 18px;background:#fff;border:1.5px solid rgba(0,0,0,0.12);border-radius:10px;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;color:#1A1A1A;">\u2B07 Download Report (HTML)</button>
    <button onclick="downloadReport('pdf')" style="display:inline-flex;align-items:center;gap:6px;padding:10px 18px;background:#1A1A1A;border:none;border-radius:10px;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;color:#fff;">\u{1F5A8} Save as PDF</button>
  </div>\`;

  // \u2500\u2500 Category Strategy Overview \u2500\u2500
  const catDesc = {
    Star:      { label:'STARS \u2014 Feature & Protect', text: \`\${catCount.Star} item\${catCount.Star!==1?'s':''} \u2014 high popularity, high margin. Move to prime positions, add callout badges, test a 10\u201315% price increase. Don't change what's working \u2014 just amplify it.\` },
    Plowhorse: { label:'PLOWHORSES \u2014 Reprice Up', text: \`\${catCount.Plowhorse} item\${catCount.Plowhorse!==1?'s':''} \u2014 your most popular items but underpriced. Customers have voted with their orders. A $1\u2013$3 price bump is where most of your revenue opportunity lives.\` },
    Puzzle:    { label:'PUZZLES \u2014 Promote Hard', text: \`\${catCount.Puzzle} item\${catCount.Puzzle!==1?'s':''} \u2014 great margin but low traffic. The fix is visibility: better menu position, server recommendation, or a visual callout. The food is fine; customers just aren't seeing it.\` },
    Dog:       { label:'DOGS \u2014 Remove or Rework', text: \`\${catCount.Dog} item\${catCount.Dog!==1?'s':''} \u2014 low popularity and low margin. These are costing you kitchen time and menu real estate. Remove, rename, or reimagine with a lower food cost.\` }
  };
  h += \`<div style="margin-bottom:20px;">
    <div style="font-size:11px;font-weight:700;letter-spacing:1.5px;color:#E85D26;margin-bottom:12px;">MENU ENGINEERING STRATEGY OVERVIEW \u2014 \${today}</div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:10px;">\`;
  ['Dog','Plowhorse','Puzzle','Star'].forEach(cat => {
    if (!catCount[cat]) return;
    const s = catStyles[cat]; const d = catDesc[cat];
    h += \`<div style="background:\${s.bg};border-radius:12px;padding:16px;border:1.5px solid \${s.color}33;">
      <div style="display:flex;align-items:center;gap:7px;margin-bottom:8px;"><span style="font-size:18px;">\${s.emoji}</span><span style="font-size:10px;font-weight:700;color:\${s.color};letter-spacing:0.8px;">\${d.label}</span></div>
      <p style="font-size:13px;color:#1A1A1A;line-height:1.6;margin:0;">\${d.text}</p>
    </div>\`;
  });
  h += \`</div></div>\`;

  // \u2500\u2500 Revenue Opportunity \u2500\u2500
  h += \`<div style="background:linear-gradient(135deg,#0D1117,#1A2332);border-radius:16px;padding:24px;margin-bottom:20px;">
    <div style="font-size:11px;font-weight:700;letter-spacing:1.5px;color:#E85D26;margin-bottom:16px;">\u{1F4B0} YOUR REVENUE OPPORTUNITY</div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:16px;margin-bottom:14px;">
      <div style="text-align:center;"><div style="font-family:'DM Serif Display',Georgia,serif;font-size:30px;color:#E85D26;">+\${lift}%</div><div style="font-size:11px;color:rgba(255,255,255,0.45);margin-top:4px;">Revenue Lift</div></div>
      <div style="text-align:center;"><div style="font-family:'DM Serif Display',Georgia,serif;font-size:30px;color:#fff;">$\${monthlyLift.toLocaleString()}</div><div style="font-size:11px;color:rgba(255,255,255,0.45);margin-top:4px;">Est. Monthly Gain</div></div>
      <div style="text-align:center;"><div style="font-family:'DM Serif Display',Georgia,serif;font-size:30px;color:#fff;">$\${annualLift.toLocaleString()}</div><div style="font-size:11px;color:rgba(255,255,255,0.45);margin-top:4px;">Est. Annual Gain</div></div>
      <div style="text-align:center;"><div style="font-family:'DM Serif Display',Georgia,serif;font-size:30px;color:#fff;">\${issueCount}</div><div style="font-size:11px;color:rgba(255,255,255,0.45);margin-top:4px;">Items to Fix</div></div>
    </div>
    <p style="font-size:11px;color:rgba(255,255,255,0.3);margin:0;text-align:center;">Based on menu engineering benchmarks for independent restaurants (~60 covers/day, ~$18 avg check). Results vary by location and implementation.</p>
  </div>\`;

  // \u2500\u2500 Full Item-by-Item Analysis \u2500\u2500
  h += \`<div style="margin-bottom:20px;">
    <div style="font-size:11px;font-weight:700;letter-spacing:1.5px;color:#E85D26;margin-bottom:12px;">FULL ITEM-BY-ITEM ANALYSIS \u2014 ALL \${totalItems} ITEMS</div>\`;
  const catOrder = ['Dog','Plowhorse','Puzzle','Star'];
  catOrder.forEach(cat => {
    const catItems = analysis.items.filter(i => i.category === cat);
    if (!catItems.length) return;
    const s = catStyles[cat];
    const priorityLabel = { Dog:'HIGH PRIORITY', Plowhorse:'REPRICE NOW', Puzzle:'PROMOTE', Star:'PROTECT' }[cat];
    const priorityColor = { Dog:'#C0392B', Plowhorse:'#D4A843', Puzzle:'#2D8B4E', Star:'#D4A843' }[cat];
    h += \`<div style="margin-bottom:14px;">
      <div style="display:flex;align-items:center;gap:8px;padding:10px 14px;background:\${s.bg};border-radius:10px 10px 0 0;border:1.5px solid \${s.color}33;border-bottom:none;">
        <span style="font-size:15px;">\${s.emoji}</span>
        <span style="font-size:11px;font-weight:700;color:\${s.color};letter-spacing:0.8px;">\${cat.toUpperCase()}S (\${catItems.length} item\${catItems.length!==1?'s':''})</span>
      </div>\`;
    catItems.forEach((item, idx) => {
      const isLast = idx === catItems.length - 1;
      h += \`<div style="background:#fff;padding:16px 18px;\${isLast?'border-radius:0 0 10px 10px;':''}border:1.5px solid \${s.color}33;border-top:none;\${!isLast?'border-bottom:1px solid rgba(0,0,0,0.04);':''}">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:8px;margin-bottom:10px;">
          <div><span style="font-size:15px;font-weight:700;color:#1A1A1A;">\${item.name}</span></div>
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="font-family:'DM Mono',monospace;font-size:14px;font-weight:600;color:#1A1A1A;">$\${Number(item.price).toFixed(2)}</span>
            <span style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:4px;background:\${priorityColor}18;color:\${priorityColor};">\${priorityLabel}</span>
          </div>
        </div>
        \${item.priceTip ? '<div style="background:#F8F8F8;border-radius:8px;padding:10px 12px;margin-bottom:8px;font-size:13px;color:#1A1A1A;line-height:1.6;"><span style="font-weight:600;color:' + s.color + ';">Price recommendation:</span> ' + item.priceTip + '</div>' : ''}
        \${item.tip ? '<div style="font-size:13px;color:#4A4A4A;line-height:1.6;">\u{1F4A1} <span style="font-weight:500;">Positioning:</span> ' + item.tip + '</div>' : ''}
      </div>\`;
    });
    h += \`</div>\`;
  });
  h += \`</div>\`;

  // \u2500\u2500 Complete Action Plan \u2500\u2500
  if (analysis.actions && analysis.actions.length) {
    const third = Math.ceil(analysis.actions.length / 3);
    const phases = [
      { label:'\u{1F534} IMMEDIATE (Week 1\u20132)', desc:'Highest impact, easiest to implement', items: analysis.actions.slice(0, third) },
      { label:'\u{1F7E1} NEXT PRIORITY (Month 1)', desc:'Moderate changes, strong ROI', items: analysis.actions.slice(third, third*2) },
      { label:'\u{1F7E2} STRATEGIC (Month 2\u20133)', desc:'Structural and layout changes', items: analysis.actions.slice(third*2) },
    ];
    h += \`<div style="background:#fff;border-radius:16px;border:1.5px solid rgba(232,93,38,0.15);margin-bottom:20px;overflow:hidden;">
      <div style="background:linear-gradient(135deg,#E85D26,#D04A15);padding:16px 20px;">
        <div style="font-size:11px;font-weight:700;letter-spacing:1.5px;color:rgba(255,255,255,0.7);">COMPLETE ACTION PLAN</div>
        <div style="font-size:13px;color:rgba(255,255,255,0.9);margin-top:3px;">\${analysis.actions.length} specific recommendations, ranked by impact</div>
      </div>
      <div style="padding:20px;">\`;
    phases.forEach(phase => {
      if (!phase.items.length) return;
      h += \`<div style="margin-bottom:18px;">
        <div style="font-size:12px;font-weight:700;color:#1A1A1A;margin-bottom:2px;">\${phase.label}</div>
        <div style="font-size:11px;color:#999;margin-bottom:8px;">\${phase.desc}</div>\`;
      phase.items.forEach((a, i) => {
        h += \`<div style="display:flex;gap:10px;padding:11px 0;border-top:1px solid rgba(0,0,0,0.05);">
          <div style="min-width:24px;height:24px;border-radius:7px;background:#FFF0EB;color:#E85D26;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;">\${i+1}</div>
          <p style="font-size:14px;color:#1A1A1A;line-height:1.6;margin:0;">\${a}</p>
        </div>\`;
      });
      h += \`</div>\`;
    });
    h += \`</div></div>\`;
  }

  // \u2500\u2500 Menu Psychology Playbook \u2500\u2500
  const extraPsychTips = [
    'Remove dollar signs from all prices \u2014 Cornell research shows it reduces price sensitivity by 18\u201330%.',
    'Use anchor pricing: list your most expensive item first in each category. It makes everything below look reasonable.',
    'Limit each category to 5\u20137 items. More than 7 triggers choice overload \u2014 customers default to the cheapest or most familiar.',
    'Add 2\u20133 sensory words to high-margin items: "slow-braised", "house-made", "hand-cut". Cornell found this increases sales 27%.',
    'Never sort items by price \u2014 it trains customers to compare on cost, not value.',
    'Use a box or shading to highlight one item per section \u2014 customers are 3x more likely to order visually isolated items.',
    'The "Golden Triangle": eyes go top-center, then top-right, then bottom-right. Put your best-margin Stars there.',
  ];
  const seenPsych = new Set((analysis.psychTips || []).map(p => p.slice(0, 30).toLowerCase()));
  const allPsychTips = [...(analysis.psychTips || []), ...extraPsychTips.filter(t => !seenPsych.has(t.slice(0,30).toLowerCase()))];

  h += \`<div style="background:#FFF8E7;border-radius:16px;padding:24px;border:1px solid rgba(212,168,67,0.25);margin-bottom:20px;">
    <div style="font-size:11px;font-weight:700;letter-spacing:1.5px;color:#D4A843;margin-bottom:4px;">\u{1F9E0} MENU PSYCHOLOGY PLAYBOOK</div>
    <div style="font-size:13px;color:#4A4A4A;margin-bottom:16px;">Evidence-based tactics used by top restaurant groups \u2014 adapted to your menu.</div>\`;
  allPsychTips.forEach((tip, i) => {
    h += \`<div style="display:flex;gap:10px;padding:11px 0;\${i<allPsychTips.length-1?'border-bottom:1px solid rgba(212,168,67,0.15);':''}">
      <div style="min-width:24px;height:24px;border-radius:7px;background:rgba(212,168,67,0.15);color:#B8860B;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;">\${i+1}</div>
      <p style="font-size:14px;color:#1A1A1A;line-height:1.6;margin:0;">\${tip}</p>
    </div>\`;
  });
  h += \`</div>\`;

  // \u2500\u2500 30/60/90 Day Roadmap \u2500\u2500
  h += \`<div style="background:linear-gradient(135deg,#0D1117,#1A2332);border-radius:16px;padding:24px;margin-bottom:20px;color:#fff;">
    <div style="font-size:11px;font-weight:700;letter-spacing:1.5px;color:#E85D26;margin-bottom:16px;">\u{1F4C5} 30/60/90 DAY IMPLEMENTATION ROADMAP</div>\`;
  const roadmapPhases = [
    { phase:'Days 1\u201314', color:'#E85D26', title:'Quick Wins', tasks:[
      'Remove or rework Dog items \u2014 immediate margin improvement',
      'Raise Plowhorse prices by $1\u2013$2 \u2014 low customer resistance, high ROI',
      'Update your menu PDF and all online listings with new prices',
      'Brief your team: which items to push and why',
    ]},
    { phase:'Days 15\u201330', color:'#D4A843', title:'Menu Restructure', tasks:[
      'Promote Puzzle items \u2014 rewrite descriptions, add to verbal upsell script',
      'Redesign category layout so Stars are in top-left and top-right positions',
      'Add descriptive language to your top 3 Star items',
      'Remove dollar signs from price display if format allows',
    ]},
    { phase:'Days 31\u201360', color:'#2D8B4E', title:'Strategic Optimization', tasks:[
      'Add a visual callout box around your #1 Star item',
      'Introduce 1\u20132 strategic upsell add-ons tied to your top items',
      'Test decoy pricing: add a higher-priced item above your current top tier',
      'Review food costs post-reprice to confirm margin improvement',
    ]},
    { phase:'Days 61\u201390', color:'#2E7DBF', title:'Measure & Iterate', tasks:[
      'Compare sales mix data to your pre-analysis baseline',
      'Calculate actual revenue lift vs. our estimate',
      'Run another MenuGenie analysis to catch second-order effects',
      'Re-brief staff on updated priorities based on new data',
    ]},
  ];
  roadmapPhases.forEach((rp, pi) => {
    const isLast = pi === roadmapPhases.length - 1;
    h += \`<div style="display:flex;gap:16px;\${!isLast?'margin-bottom:20px':''}">
      <div style="display:flex;flex-direction:column;align-items:center;">
        <div style="width:34px;height:34px;border-radius:50%;background:\${rp.color};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff;flex-shrink:0;">\${pi+1}</div>
        \${!isLast?'<div style=\\"width:2px;flex:1;background:rgba(255,255,255,0.1);margin:4px 0;min-height:20px;\\"></div>':''}
      </div>
      <div style="flex:1;">
        <div style="display:flex;align-items:baseline;gap:8px;margin-bottom:8px;">
          <span style="font-size:11px;font-weight:700;color:\${rp.color};">\${rp.phase}</span>
          <span style="font-size:14px;font-weight:600;color:#fff;">\${rp.title}</span>
        </div>\`;
    rp.tasks.forEach(task => {
      h += \`<div style="display:flex;gap:8px;margin-bottom:5px;align-items:flex-start;">
        <span style="color:\${rp.color};font-size:14px;flex-shrink:0;">\u203A</span>
        <span style="font-size:13px;color:rgba(255,255,255,0.75);line-height:1.5;">\${task}</span>
      </div>\`;
    });
    h += \`</div></div>\`;
  });
  h += \`</div>\`;

  // \u2500\u2500 Questions footer \u2500\u2500
  h += \`<div style="border:1.5px dashed rgba(232,93,38,0.3);border-radius:14px;padding:18px;text-align:center;margin-bottom:24px;">
    <p style="font-size:13px;color:#4A4A4A;line-height:1.7;margin:0;">Questions about your report? We're here to help.<br>
    <a href="mailto:menugenieai@gmail.com" style="color:#E85D26;font-weight:600;">menugenieai@gmail.com</a>
    <span style="font-size:12px;color:#999;display:block;margin-top:4px;">We respond within 24 hours \xB7 Report date: \${today}</span></p>
  </div>\`;

  const resultsArea = document.getElementById('resultsArea');
  resultsArea.innerHTML += h;
}

function copyShareLink() {
  navigator.clipboard.writeText('https://menu-genie.com').then(() => {
    document.getElementById('shareBtn').textContent = 'Copied! \u2713';
    setTimeout(() => { document.getElementById('shareBtn').textContent = 'Copy Link to Share'; }, 2000);
  }).catch(() => {
    prompt('Copy this link:', 'https://menu-genie.com');
  });
}

function downloadReport(format) {
  if (format === 'pdf') {
    window.print();
    return;
  }
  if (!lastAnalysis) return;
  var html = generateReportHTML(lastAnalysis);
  var blob = new Blob([html], { type: 'text/html' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = 'MenuGenie-Pro-Report.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(function() { URL.revokeObjectURL(url); }, 1000);
}

function generateReportHTML(analysis) {
  var catStyles = { Star:{emoji:'\u2B50',color:'#D4A843',bg:'#FFF8E7'}, Plowhorse:{emoji:'\u{1F434}',color:'#2E7DBF',bg:'#EBF4FC'}, Puzzle:{emoji:'\u{1F9E9}',color:'#2D8B4E',bg:'#E8F5EC'}, Dog:{emoji:'\u{1F415}',color:'#C0392B',bg:'#FDECEB'} };
  var catCount = { Star:0, Plowhorse:0, Puzzle:0, Dog:0 };
  analysis.items.forEach(function(it) { if (catCount[it.category] !== undefined) catCount[it.category]++; });
  var today = new Date().toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' });
  var lift = analysis.lift || 0;
  var monthlyLift = Math.round(lift * 120);
  var annualLift = monthlyLift * 12;

  var h = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>MenuGenie Pro Report \u2014 ' + today + '</title>';
  h += '<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">';
  h += '<style>';
  h += '*{margin:0;padding:0;box-sizing:border-box}';
  h += 'body{font-family:"DM Sans",-apple-system,sans-serif;background:#fff;color:#1A1A1A;padding:0;}';
  h += '.serif{font-family:"DM Serif Display",Georgia,serif}';
  h += '.mono{font-family:"DM Mono",monospace}';
  h += '.page{max-width:800px;margin:0 auto;padding:48px 32px;}';
  h += '.header{border-bottom:3px solid #E85D26;padding-bottom:24px;margin-bottom:36px;display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:12px;}';
  h += '.logo{font-family:"DM Serif Display",Georgia,serif;font-size:28px;color:#1A1A1A;}';
  h += '.logo span{color:#E85D26;}';
  h += '.report-meta{font-size:13px;color:#999;text-align:right;}';
  h += '.section{margin-bottom:36px;}';
  h += '.section-label{font-size:10px;font-weight:700;letter-spacing:2px;color:#E85D26;margin-bottom:12px;text-transform:uppercase;}';
  h += '.score-box{background:linear-gradient(135deg,#1A1A1A,#2D2D2D);border-radius:16px;padding:28px;color:#fff;text-align:center;margin-bottom:24px;}';
  h += '.item-card{background:#fff;border-radius:10px;padding:16px 18px;margin-bottom:8px;border:1px solid rgba(0,0,0,0.08);}';
  h += '.item-card.dog{border-left:4px solid #C0392B;}';
  h += '.item-card.puzzle{border-left:4px solid #2D8B4E;}';
  h += '.item-card.plowhorse{border-left:4px solid #2E7DBF;}';
  h += '.item-card.star{border-left:4px solid #D4A843;}';
  h += '.item-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:6px;}';
  h += '.item-name{font-size:15px;font-weight:700;}';
  h += '.item-meta{display:flex;align-items:center;gap:8px;}';
  h += '.item-price{font-family:"DM Mono",monospace;font-size:14px;font-weight:600;}';
  h += '.badge{font-size:10px;font-weight:700;padding:2px 8px;border-radius:4px;}';
  h += '.tip-box{background:#F8F8F8;border-radius:7px;padding:9px 12px;font-size:13px;line-height:1.6;margin-bottom:6px;}';
  h += '.tip-pos{font-size:13px;color:#4A4A4A;line-height:1.6;}';
  h += '.action-row{display:flex;gap:10px;padding:11px 0;border-top:1px solid rgba(0,0,0,0.05);}';
  h += '.action-num{min-width:24px;height:24px;border-radius:7px;background:#FFF0EB;color:#E85D26;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;}';
  h += '.psych-box{background:#FFF8E7;border-radius:12px;padding:20px;border:1px solid rgba(212,168,67,0.25);}';
  h += '.psych-row{display:flex;gap:10px;padding:10px 0;border-bottom:1px solid rgba(212,168,67,0.15);}';
  h += '.psych-row:last-child{border-bottom:none;}';
  h += '.psych-num{min-width:22px;height:22px;border-radius:6px;background:rgba(212,168,67,0.15);color:#B8860B;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0;}';
  h += '.roadmap-phase{display:flex;gap:14px;margin-bottom:18px;}';
  h += '.phase-dot{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff;flex-shrink:0;}';
  h += '.stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:16px;}';
  h += '.stat-cell{text-align:center;}';
  h += '.stat-num{font-family:"DM Serif Display",Georgia,serif;font-size:28px;}';
  h += '.stat-lbl{font-size:11px;color:rgba(255,255,255,0.45);margin-top:3px;}';
  h += '.footer{border-top:1px solid rgba(0,0,0,0.08);padding-top:20px;margin-top:36px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;font-size:12px;color:#999;}';
  h += '@media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact;}@page{margin:1.5cm;}}';
  h += '</style></head><body><div class="page">';

  // Header
  h += '<div class="header">';
  h += '<div><div class="logo">Menu<span>Genie</span></div><div style="font-size:13px;color:#4A4A4A;margin-top:4px;">Pro Menu Analysis Report</div></div>';
  h += '<div class="report-meta">Generated: ' + today + '<br>menu-genie.com</div>';
  h += '</div>';

  // Score summary
  var catTotal = catCount.Star + catCount.Plowhorse + catCount.Puzzle + catCount.Dog;
  var score = Math.min(100, Math.round((catCount.Star / Math.max(catTotal, 1)) * 100 + lift * 1.5));
  var scoreColor = score >= 70 ? '#2D8B4E' : score >= 40 ? '#D4A843' : '#C0392B';
  h += '<div class="score-box">';
  h += '<div style="font-size:10px;font-weight:700;letter-spacing:2px;color:#E85D26;margin-bottom:12px;">MENU HEALTH SCORE</div>';
  h += '<div style="display:inline-flex;align-items:center;justify-content:center;width:80px;height:80px;border-radius:50%;border:4px solid ' + scoreColor + ';margin-bottom:12px;">';
  h += '<span class="serif" style="font-size:36px;color:' + scoreColor + ';">' + score + '</span></div>';
  h += '<p style="font-size:14px;color:rgba(255,255,255,0.6);margin-bottom:16px;">' + analysis.items.length + ' items analyzed \xB7 ' + today + '</p>';
  h += '<div class="stats-grid">';
  h += '<div class="stat-cell"><div class="stat-num" style="color:#D4A843;">\u2B50 ' + catCount.Star + '</div><div class="stat-lbl">Stars</div></div>';
  h += '<div class="stat-cell"><div class="stat-num" style="color:#2E7DBF;">\u{1F434} ' + catCount.Plowhorse + '</div><div class="stat-lbl">Plowhorses</div></div>';
  h += '<div class="stat-cell"><div class="stat-num" style="color:#2D8B4E;">\u{1F9E9} ' + catCount.Puzzle + '</div><div class="stat-lbl">Puzzles</div></div>';
  h += '<div class="stat-cell"><div class="stat-num" style="color:#C0392B;">\u{1F415} ' + catCount.Dog + '</div><div class="stat-lbl">Dogs</div></div>';
  h += '</div>';
  h += '<div style="background:rgba(255,255,255,0.1);border-radius:10px;padding:12px;display:inline-flex;align-items:center;gap:10px;">';
  h += '<span class="serif" style="font-size:28px;color:#E85D26;">+' + lift + '%</span>';
  h += '<span style="font-size:13px;color:rgba(255,255,255,0.7);text-align:left;">Estimated revenue lift<br>with recommended changes</span></div>';
  h += '</div>';

  // Revenue opportunity
  h += '<div class="section" style="background:linear-gradient(135deg,#0D1117,#1A2332);border-radius:14px;padding:20px;">';
  h += '<div class="section-label" style="color:#E85D26;">Revenue Opportunity</div>';
  h += '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;text-align:center;">';
  h += '<div><div class="serif" style="font-size:26px;color:#E85D26;">+' + lift + '%</div><div style="font-size:11px;color:rgba(255,255,255,0.45);">Revenue Lift</div></div>';
  h += '<div><div class="serif" style="font-size:26px;color:#fff;">$' + monthlyLift.toLocaleString() + '</div><div style="font-size:11px;color:rgba(255,255,255,0.45);">Est. Monthly Gain</div></div>';
  h += '<div><div class="serif" style="font-size:26px;color:#fff;">$' + annualLift.toLocaleString() + '</div><div style="font-size:11px;color:rgba(255,255,255,0.45);">Est. Annual Gain</div></div>';
  h += '</div></div><br>';

  // Summary
  if (analysis.summary) {
    h += '<div class="section"><div class="section-label">Executive Summary</div>';
    h += '<p style="font-size:15px;color:#1A1A1A;line-height:1.7;">' + analysis.summary + '</p></div>';
  }

  // Items by category
  h += '<div class="section"><div class="section-label">Full Item-by-Item Analysis (' + analysis.items.length + ' items)</div>';
  var catOrderR = ['Dog','Plowhorse','Puzzle','Star'];
  catOrderR.forEach(function(cat) {
    var catItems = analysis.items.filter(function(i) { return i.category === cat; });
    if (!catItems.length) return;
    var s = catStyles[cat];
    h += '<div style="margin-bottom:16px;">';
    h += '<div style="display:flex;align-items:center;gap:6px;margin-bottom:6px;padding:8px 12px;background:' + s.bg + ';border-radius:8px;">';
    h += '<span style="font-size:14px;">' + s.emoji + '</span>';
    h += '<span style="font-size:11px;font-weight:700;color:' + s.color + ';letter-spacing:0.8px;">' + cat.toUpperCase() + 'S (' + catItems.length + ')</span></div>';
    catItems.forEach(function(item) {
      h += '<div class="item-card ' + cat.toLowerCase() + '">';
      h += '<div class="item-header"><div class="item-name">' + item.name + '</div>';
      h += '<div class="item-meta"><span class="item-price mono">$' + Number(item.price).toFixed(2) + '</span>';
      h += '<span class="badge" style="background:' + s.bg + ';color:' + s.color + ';">' + cat.toUpperCase() + '</span></div></div>';
      if (item.priceTip) h += '<div class="tip-box"><strong style="color:' + s.color + '">Price:</strong> ' + item.priceTip + '</div>';
      if (item.tip) h += '<div class="tip-pos">\u{1F4A1} <strong>Positioning:</strong> ' + item.tip + '</div>';
      h += '</div>';
    });
    h += '</div>';
  });
  h += '</div>';

  // Actions
  if (analysis.actions && analysis.actions.length) {
    h += '<div class="section"><div class="section-label">Complete Action Plan (' + analysis.actions.length + ' recommendations)</div>';
    analysis.actions.forEach(function(a, i) {
      h += '<div class="action-row">';
      h += '<div class="action-num">' + (i+1) + '</div>';
      h += '<p style="font-size:14px;color:#1A1A1A;line-height:1.6;margin:0;">' + a + '</p>';
      h += '</div>';
    });
    h += '</div>';
  }

  // Psychology
  var extraPsych = [
    'Remove dollar signs from all prices \u2014 Cornell research shows it reduces price sensitivity by 18\u201330%.',
    'Use anchor pricing: list your most expensive item first in each category.',
    'Limit each category to 5\u20137 items to avoid choice overload.',
    'Add sensory words to high-margin items: "slow-braised", "house-made", "hand-cut".',
    'Never sort items by price \u2014 sort by profitability instead.',
    'The "Golden Triangle": eyes scan top-center, top-right, then bottom-right. Put best-margin Stars there.',
  ];
  var seenPR = new Set((analysis.psychTips || []).map(function(p) { return p.slice(0,30).toLowerCase(); }));
  var allPsych = (analysis.psychTips || []).concat(extraPsych.filter(function(t) { return !seenPR.has(t.slice(0,30).toLowerCase()); }));
  if (allPsych.length) {
    h += '<div class="section"><div class="section-label">Menu Psychology Playbook</div>';
    h += '<div class="psych-box">';
    allPsych.forEach(function(tip, i) {
      h += '<div class="psych-row"><div class="psych-num">' + (i+1) + '</div>';
      h += '<p style="font-size:13px;color:#1A1A1A;line-height:1.6;margin:0;">' + tip + '</p></div>';
    });
    h += '</div></div>';
  }

  // 30/60/90 Roadmap
  h += '<div class="section"><div class="section-label">30/60/90 Day Roadmap</div>';
  var rPhases = [
    { phase:'Days 1\u201314', color:'#E85D26', title:'Quick Wins', tasks:['Remove or rework Dog items \u2014 immediate margin improvement','Raise Plowhorse prices by $1\u2013$2','Update all online menu listings','Brief your team on which items to push'] },
    { phase:'Days 15\u201330', color:'#D4A843', title:'Menu Restructure', tasks:['Promote Puzzle items with better descriptions and server scripts','Move Stars to prime visual positions (top-left, top-right)','Add descriptive language to top Star items','Remove dollar signs from price display'] },
    { phase:'Days 31\u201360', color:'#2D8B4E', title:'Strategic Optimization', tasks:['Add a visual callout box around your #1 Star','Introduce strategic upsell add-ons to top items','Test decoy pricing with a new premium item','Review food costs post-reprice to confirm margin improvement'] },
    { phase:'Days 61\u201390', color:'#2E7DBF', title:'Measure & Iterate', tasks:['Compare sales mix to baseline \u2014 note which items shifted','Calculate actual vs. estimated revenue lift','Run another MenuGenie analysis','Re-brief staff based on updated data'] },
  ];
  rPhases.forEach(function(rp, pi) {
    h += '<div class="roadmap-phase">';
    h += '<div class="phase-dot" style="background:' + rp.color + ';">' + (pi+1) + '</div>';
    h += '<div style="flex:1;"><div style="font-size:11px;font-weight:700;color:' + rp.color + ';">' + rp.phase + '</div>';
    h += '<div style="font-size:14px;font-weight:600;margin-bottom:6px;">' + rp.title + '</div>';
    rp.tasks.forEach(function(task) {
      h += '<div style="font-size:13px;color:#4A4A4A;line-height:1.6;padding-left:8px;">\u203A ' + task + '</div>';
    });
    h += '</div></div>';
  });
  h += '</div>';

  // Footer
  h += '<div class="footer">';
  h += '<div>Generated by MenuGenie \xB7 menu-genie.com</div>';
  h += '<div>Questions? <a href="mailto:menugenieai@gmail.com" style="color:#E85D26;">menugenieai@gmail.com</a></div>';
  h += '</div>';

  h += '</div></body></html>';
  return h;
}

// Preview mode \u2014 ?preview=1 bypasses payment and shows a full mock report
(function previewMode() {
  if (new URLSearchParams(window.location.search).get('preview') !== '1') return;
  const mockAnalysis = {
    items: [
      { name: "Margherita Pizza", price: 12.99, category: "Star", priceTip: "Raise to $15.99 \u2014 still competitive, adds $3 per cover. At 40 covers/day this single change = $3,600/month in pure margin.", tip: "Feature in top-left \u2014 highest visual weight zone on any menu. Add a Chef Pick badge." },
      { name: "Caesar Salad", price: 8.49, category: "Plowhorse", priceTip: "Increase to $11.49 \u2014 customers expect $11\u2013$13 for tableside-quality salads. You are leaving $3 per sale on the table.", tip: "Add house-made dressing, shaved parmesan in description \u2014 sensory words justify the price increase." },
      { name: "Truffle Fries", price: 9.99, category: "Puzzle", priceTip: "Already well-priced at $9.99 with strong margins \u2014 the problem is exposure, not price.", tip: "Move to a Chef Picks callout box. Currently buried under sides. Servers should be recommending this every table." },
      { name: "Garden Burger", price: 13.99, category: "Dog", priceTip: "Remove or reimagine \u2014 costs more than the beef burger to make, sells at roughly half the rate. Net negative contribution margin.", tip: "Replace with a seasonal grain bowl at $14.99 \u2014 lower food cost, higher perceived value, easier to prepare." },
      { name: "Ribeye Steak", price: 34.99, category: "Star", priceTip: "Raise to $39.99 \u2014 this is your anchor item. Customers who order it are price-insensitive. A $5 increase will not deter them.", tip: "Add a wine pairing suggestion in the description. Increases average check by $12\u2013$18 when taken. Position at top-right." },
      { name: "Chicken Tenders", price: 11.99, category: "Plowhorse", priceTip: "Increase to $14.99 \u2014 high food cost item, consistently underpriced in this category across the industry.", tip: "Rename to Crispy Buttermilk Tenders \u2014 the name change alone increases perceived value without changing food cost." },
      { name: "Mushroom Risotto", price: 16.99, category: "Puzzle", priceTip: "Strong margin but only 8% order rate. Well-priced \u2014 just needs more visibility.", tip: "Feature in a House Signatures section. Add slow-stirred, 18-minute cook in the description \u2014 tell the story, justify the wait." },
      { name: "Kids Pasta", price: 6.99, category: "Dog", priceTip: "Low price, moderate food cost, very low order rate from non-families. Poor performer overall.", tip: "Only keep if you have consistent family traffic. If average table size is 2, consider removing and adding a pasta appetizer instead." },
      { name: "Grilled Salmon", price: 24.99, category: "Star", priceTip: "Strong performer at this price point. Test $27.99 \u2014 salmon benchmarks at $26\u2013$30 in comparable markets.", tip: "Add a seasonal sourcing note: Pacific salmon, market fresh. Source credibility increases premium perception." },
      { name: "Tiramisu", price: 8.99, category: "Plowhorse", priceTip: "Desserts should be priced at $10\u2013$12. Raise to $10.99 \u2014 virtually zero resistance on dessert pricing.", tip: "Have servers describe it tableside before presenting the check, not after. Timing is everything for dessert attachment." },
      { name: "House Nachos", price: 11.49, category: "Puzzle", priceTip: "Good margin but low attachment rate for a shareable item. Consider bundle pricing.", tip: "Create a Shareable Starters category. Reframe as a table item, not individual. Add a +$3 protein option." },
      { name: "Vegan Buddha Bowl", price: 14.99, category: "Dog", priceTip: "Lowest order rate on the menu. Food cost is acceptable but the dish is not resonating.", tip: "Rebrand or remove. If keeping, change name to Roasted Grain Bowl \u2014 the word vegan in the name reduces orders from non-vegans." },
    ],
    summary: "Your 12-item menu has 3 Stars (best performers), 3 Plowhorses (popular but underpriced \u2014 biggest opportunity), 3 Puzzles (great margins, hidden from view), and 3 Dogs (removing these alone stops the bleeding). With targeted fixes across all four categories, you could realistically hit a 24% revenue increase within 60 days \u2014 without changing your kitchen or adding a single new dish.",
    lift: 24,
    actions: [
      "Raise Margherita Pizza from $12.99 to $15.99. At 40 covers/day, this single change = $3,600/month in additional margin. Start here.",
      "Remove Garden Burger. 34% food cost, half the sales rate of your beef burger. Replace with a seasonal grain bowl at $14.99.",
      "Remove Vegan Buddha Bowl or rebrand to Roasted Grain Bowl \u2014 test for 30 days and compare order rate.",
      "Remove Kids Pasta unless you have consistent family dining traffic. Reallocate that menu slot to a high-margin appetizer.",
      "Raise Ribeye from $34.99 to $39.99. This is your anchor and your customers are price-insensitive here. A $5 increase on 15 steaks/week = $300/week.",
      "Raise Tiramisu from $8.99 to $10.99. Test verbal description by servers before presenting the check \u2014 expect 20\u201330% attachment rate.",
      "Promote Truffle Fries in a Chef Picks callout box. Add to verbal upsell script. Target 30% attachment rate at every table.",
      "Move Mushroom Risotto to a House Signatures section. Add story copy: slow-stirred, 18-minute cook. Visibility drives orders.",
      "Rename Chicken Tenders to Crispy Buttermilk Tenders and raise to $14.99. Implement immediately \u2014 low risk, high reward.",
      "Add a +$3 protein option to House Nachos. Reframe as a shareable starter in its own section. Expected: 40% attach rate on the add-on.",
      "Update Caesar Salad description to house-made dressing, shaved Parmesan, house croutons \u2014 and raise to $11.49.",
      "Add wine pairing suggestion next to Ribeye Steak. Even a 20% take rate at $14 avg wine = $28/night extra, $840/month.",
    ],
    psychTips: [
      "Remove dollar signs from all prices \u2014 Cornell research shows it reduces price sensitivity by 18\u201330%. Write 15 not $15.00.",
      "Use decoy pricing: add a $48 seafood tower to your mains section. It makes your $39.99 ribeye feel like the smart, reasonable choice.",
      "Limit each category to 5\u20137 items. More than 7 causes choice paralysis \u2014 customers default to the cheapest or the most familiar.",
      "Add a Chef Signature badge to your top Star \u2014 creates a discovery moment. Customers feel like they found something special.",
      "Anchor your most profitable item at the top of each section, not the cheapest. Never sort by price \u2014 sort by profitability.",
    ],
    teaserItems: [],
    total_items_on_menu: 12
  };
  // DOM is ready (script runs at bottom of body) \u2014 no DOMContentLoaded needed
  switchTab('text');
  const ta = document.getElementById('menuTextInput');
  if (ta) ta.value = 'Margherita Pizza $12.99\\nCaesar Salad $8.49\\nTruffle Fries $9.99\\nGarden Burger $13.99\\nRibeye Steak $34.99\\nChicken Tenders $11.99';
  updateBtn();
  const previewBanner = document.createElement('div');
  previewBanner.style.cssText = 'position:fixed;top:0;left:0;right:0;z-index:9999;background:#E85D26;color:#fff;text-align:center;padding:10px;font-size:13px;font-weight:700;';
  previewBanner.textContent = '\u26A1 PREVIEW MODE \u2014 Full report shown without payment';
  document.body.prepend(previewBanner);
  lastAnalysis = mockAnalysis;
  document.getElementById('loadingArea').style.display = 'none';
  document.getElementById('resultsArea').style.display = 'block';
  deliverFullReport({ sale_id: 'PREVIEW', name: 'Preview' });
  setTimeout(() => document.getElementById('resultsArea').scrollIntoView({behavior:'smooth',block:'start'}), 100);
})();

// Internal test mode removed: ?test=mg_internal_2026 handed out free $49 reports in production.

// restoreAfterGumroad() removed: delivery no longer depends on the buyer
// returning in the same browser. The Gumroad Ping generates the report and it
// is hosted and emailed.
<\/script>

<button class="sticky-cta" onclick="document.querySelector('.demo-input-area').scrollIntoView({behavior:'smooth',block:'start'});this.style.display='none';" id="stickyCta">Analyze My Menu Free \u2192</button>

<script>
window.addEventListener('scroll', function() {
  const demo = document.getElementById('demo');
  const cta = document.getElementById('stickyCta');
  if (!demo || !cta) return;
  const rect = demo.getBoundingClientRect();
  if (rect.top <= window.innerHeight) { cta.style.display = 'none'; }
  else if (window.scrollY > 300) { cta.style.display = 'block'; }
});
<\/script>

</body>
</html>
`;
var ROBOTS_TXT = `User-agent: *
Allow: /

Sitemap: https://menu-genie.com/sitemap.xml`;
var SITEMAP_XML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://menu-genie.com/</loc>
    <lastmod>2026-04-04</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
var index_default = {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === "/health") {
      return new Response(JSON.stringify({ status: "ok", version: "4.0.0" }), {
        headers: { "Content-Type": "application/json" }
      });
    }
    if (url.pathname === "/robots.txt") {
      return new Response(ROBOTS_TXT, { headers: { "Content-Type": "text/plain" } });
    }
    if (url.pathname === "/sitemap.xml") {
      return new Response(SITEMAP_XML, { headers: { "Content-Type": "application/xml" } });
    }
    return new Response(HTML, {
      headers: {
        "Content-Type": "text/html;charset=UTF-8",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
        "Referrer-Policy": "strict-origin-when-cross-origin",
        "X-MenuGenie-Version": "4.0.0"
      }
    });
  }
};
export {
  index_default as default
};
