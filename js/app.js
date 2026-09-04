// FounderLedger Application Logic
// State Management, Reactive Filters, Dynamic SVG Charts, Interactive Simulator, and Modals

(function () {
  'use strict';

  // Application State
  const state = {
    currency: 'INR', // 'INR' or 'USD'
    usdRate: 83.5, // 1 USD = 83.5 INR
    theme: 'light',
    activeCategory: 'all',
    searchQuery: '',
    dealFilter: 'all',
    mrrFilter: 'all',
    sortBy: 'arr_desc',
    selectedStartup: null,
    wizardStep: 1,
    wizardGateway: 'razorpay',
    calcARR: 24000000, // ₹2.4 Cr ARR
    calcGrowth: 20, // 20% MoM
    calcMargin: 65, // 65% Net Margin
    calcChurn: 1.5, // 1.5% Churn
    calcCategoryMultiplier: 4.5
  };

  // Utility: Currency Formatter (Indian Lakhs/Crores vs USD)
  function formatCurrency(amountInINR, isPerMonth = false) {
    if (!amountInINR && amountInINR !== 0) return '—';

    if (state.currency === 'USD') {
      const usdAmount = amountInINR / state.usdRate;
      if (usdAmount >= 1000000) {
        return `$${(usdAmount / 1000000).toFixed(2)}M${isPerMonth ? '/mo' : ''}`;
      } else if (usdAmount >= 1000) {
        return `$${(usdAmount / 1000).toFixed(1)}k${isPerMonth ? '/mo' : ''}`;
      }
      return `$${Math.round(usdAmount).toLocaleString()}${isPerMonth ? '/mo' : ''}`;
    }

    // Default INR (Lakhs and Crores)
    if (amountInINR >= 10000000) {
      const cr = (amountInINR / 10000000).toFixed(2);
      return `₹${cr} Cr${isPerMonth ? '/mo' : ''}`;
    } else if (amountInINR >= 100000) {
      const lakh = (amountInINR / 100000).toFixed(1);
      return `₹${lakh}L${isPerMonth ? '/mo' : ''}`;
    } else if (amountInINR >= 1000) {
      return `₹${(amountInINR / 1000).toFixed(0)}k${isPerMonth ? '/mo' : ''}`;
    }
    return `₹${amountInINR.toLocaleString('en-IN')}${isPerMonth ? '/mo' : ''}`;
  }

  // Format Exact Currency for Dialogs
  function formatExactCurrency(amountInINR) {
    if (state.currency === 'USD') {
      const usd = Math.round(amountInINR / state.usdRate);
      return `$${usd.toLocaleString('en-US')}`;
    }
    return `₹${amountInINR.toLocaleString('en-IN')}`;
  }

  // SVG Line/Area Chart Generator
  function renderAreaChartSVG(dataPoints, width = 600, height = 180, strokeColor = '#2563EB', fillColor = 'url(#chartGradient)') {
    if (!dataPoints || dataPoints.length === 0) return '';

    const maxVal = Math.max(...dataPoints.map(d => d.revenue)) * 1.15;
    const minVal = Math.min(...dataPoints.map(d => d.revenue)) * 0.85;
    const paddingX = 30;
    const paddingY = 20;
    const chartW = width - paddingX * 2;
    const chartH = height - paddingY * 2;

    const points = dataPoints.map((d, index) => {
      const x = paddingX + (index / (dataPoints.length - 1)) * chartW;
      const y = height - paddingY - ((d.revenue - minVal) / (maxVal - minVal)) * chartH;
      return { x, y, ...d };
    });

    // Generate smooth bezier path
    let pathD = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cpX = (p0.x + p1.x) / 2;
      pathD += ` C ${cpX} ${p0.y}, ${cpX} ${p1.y}, ${p1.x} ${p1.y}`;
    }

    const areaD = `${pathD} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`;

    // Generate labels and dots
    const dotsAndLabels = points.map((p, i) => {
      const showLabel = i % 2 === 0 || i === points.length - 1;
      return `
        <circle cx="${p.x}" cy="${p.y}" r="4" fill="${strokeColor}" stroke="#FFFFFF" stroke-width="2" class="chart-point" data-revenue="${p.revenue}" data-month="${p.month}" />
        ${showLabel ? `<text x="${p.x}" y="${height - 4}" font-size="10" fill="#94A3B8" font-family="'JetBrains Mono', monospace" text-anchor="middle">${p.month}</text>` : ''}
      `;
    }).join('');

    return `
      <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#2563EB" stop-opacity="0.3" />
            <stop offset="100%" stop-color="#2563EB" stop-opacity="0.0" />
          </linearGradient>
        </defs>
        <!-- Horizontal Grid Lines -->
        <line x1="${paddingX}" y1="${paddingY}" x2="${width - paddingX}" y2="${paddingY}" stroke="rgba(226, 232, 240, 0.4)" stroke-dasharray="3 3" />
        <line x1="${paddingX}" y1="${paddingY + chartH / 2}" x2="${width - paddingX}" y2="${paddingY + chartH / 2}" stroke="rgba(226, 232, 240, 0.4)" stroke-dasharray="3 3" />
        <line x1="${paddingX}" y1="${height - paddingY}" x2="${width - paddingX}" y2="${height - paddingY}" stroke="rgba(226, 232, 240, 0.6)" />
        
        <path d="${areaD}" fill="${fillColor}" />
        <path d="${pathD}" fill="none" stroke="${strokeColor}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
        ${dotsAndLabels}
      </svg>
    `;
  }

  // Gateway Breakdown Donut Generator
  function renderGatewayDonutSVG(breakdown) {
    // breakdown: { razorpay: 68, upiAutoPay: 22, stripe: 10, bankWire: 0 }
    const size = 120;
    const strokeWidth = 18;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    const segments = [
      { key: 'Razorpay', pct: breakdown.razorpay || 0, color: '#2563EB' },
      { key: 'UPI AutoPay', pct: breakdown.upiAutoPay || 0, color: '#10B981' },
      { key: 'Stripe', pct: breakdown.stripe || 0, color: '#6366F1' },
      { key: 'Bank Wire', pct: breakdown.bankWire || 0, color: '#F59E0B' }
    ].filter(s => s.pct > 0);

    let offset = 0;
    const circles = segments.map(seg => {
      const dashLength = (seg.pct / 100) * circumference;
      const strokeDasharray = `${dashLength} ${circumference - dashLength}`;
      const strokeDashoffset = -offset;
      offset += dashLength;

      return `<circle cx="${size / 2}" cy="${size / 2}" r="${radius}" fill="none" stroke="${seg.color}" stroke-width="${strokeWidth}" stroke-dasharray="${strokeDasharray}" stroke-dashoffset="${strokeDashoffset}" stroke-linecap="round" />`;
    }).join('');

    return `
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="transform: rotate(-90deg);">
        ${circles}
      </svg>
    `;
  }

  // DOM Elements
  const el = {
    currencyINR: document.getElementById('curr-inr'),
    currencyUSD: document.getElementById('curr-usd'),
    themeToggle: document.getElementById('theme-toggle'),
    themeIcon: document.getElementById('theme-icon'),
    heroStatARR: document.getElementById('hero-stat-arr'),
    heroStatEscrow: document.getElementById('hero-stat-escrow'),
    heroChartContainer: document.getElementById('hero-chart-container'),
    heroStartupName: document.getElementById('hero-startup-name'),
    heroStartupMrr: document.getElementById('hero-startup-mrr'),
    heroStartupArr: document.getElementById('hero-startup-arr'),
    heroStartupGrowth: document.getElementById('hero-startup-growth'),
    heroGstin: document.getElementById('hero-gstin'),
    heroAuditHash: document.getElementById('hero-audit-hash'),
    heroAuditDate: document.getElementById('hero-audit-date'),
    tickerText: document.getElementById('top-ticker-text'),
    // Leaderboard
    categoryPills: document.getElementById('category-pills'),
    searchInput: document.getElementById('startup-search-input'),
    dealFilterSelect: document.getElementById('deal-filter-select'),
    mrrFilterSelect: document.getElementById('mrr-filter-select'),
    sortSelect: document.getElementById('sort-select'),
    startupsGrid: document.getElementById('startups-grid'),
    startupsCountText: document.getElementById('startups-count-text'),
    // Marketplace
    marketplaceGrid: document.getElementById('marketplace-grid'),
    // Calculator
    calcArrSlider: document.getElementById('calc-arr-slider'),
    calcGrowthSlider: document.getElementById('calc-growth-slider'),
    calcMarginSlider: document.getElementById('calc-margin-slider'),
    calcChurnSlider: document.getElementById('calc-churn-slider'),
    calcCategorySelect: document.getElementById('calc-category-select'),
    calcArrDisplay: document.getElementById('calc-arr-display'),
    calcGrowthDisplay: document.getElementById('calc-growth-display'),
    calcMarginDisplay: document.getElementById('calc-margin-display'),
    calcChurnDisplay: document.getElementById('calc-churn-display'),
    calcValuationMain: document.getElementById('calc-valuation-main'),
    calcValuationMultiple: document.getElementById('calc-valuation-multiple'),
    calcTtmRevenue: document.getElementById('calc-ttm-revenue'),
    calcEstimatedProfit: document.getElementById('calc-estimated-profit'),
    calcRangeLow: document.getElementById('calc-range-low'),
    calcRangeHigh: document.getElementById('calc-range-high'),
    // Simulator Wizard
    wizardStepTabs: document.querySelectorAll('.wizard-step-tab'),
    wizardStep1: document.getElementById('wizard-step-1'),
    wizardStep2: document.getElementById('wizard-step-2'),
    wizardStep3: document.getElementById('wizard-step-3'),
    gatewayCards: document.querySelectorAll('.gateway-card-option'),
    btnStartVerify: document.getElementById('btn-start-verify'),
    engineConsole: document.getElementById('engine-console'),
    engineProgressBar: document.getElementById('engine-progress-bar'),
    generatedBadgeEmbed: document.getElementById('generated-badge-embed'),
    generatedHashPill: document.getElementById('generated-hash-pill'),
    btnCopyEmbed: document.getElementById('btn-copy-embed'),
    btnResetVerify: document.getElementById('btn-reset-verify'),
    // Modals
    startupModal: document.getElementById('startup-modal'),
    modalCloseBtn: document.getElementById('modal-close-btn'),
    startupModalBody: document.getElementById('startup-modal-body'),
    dealModal: document.getElementById('deal-modal'),
    dealModalCloseBtn: document.getElementById('deal-modal-close-btn'),
    dealModalBody: document.getElementById('deal-modal-body'),
    cmdModal: document.getElementById('cmd-modal'),
    cmdSearchInput: document.getElementById('cmd-search-input'),
    cmdResultsList: document.getElementById('cmd-results-list'),
    btnOpenCmd: document.getElementById('btn-open-cmd'),
    toastContainer: document.getElementById('toast-container'),
    btnOpenVerifyModal: document.getElementById('btn-open-verify-modal')
  };

  // Initialize UI
  function init() {
    setupTheme();
    setupCurrency();
    renderHeroVisualizer();
    renderCategoryPills();
    renderLeaderboard();
    renderMarketplace();
    setupCalculator();
    setupSimulator();
    setupModals();
    setupCommandPalette();
    setupTicker();
    setupFaqAccordion();
    startLiveToastStream();
  }

  // Theme Toggle
  function setupTheme() {
    const savedTheme = localStorage.getItem('fl_theme') || 'light';
    setTheme(savedTheme);

    if (el.themeToggle) {
      el.themeToggle.addEventListener('click', () => {
        const newTheme = state.theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
      });
    }
  }

  function setTheme(theme) {
    state.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('fl_theme', theme);

    if (el.themeIcon) {
      el.themeIcon.innerHTML = theme === 'dark'
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    }
    // Re-render hero chart with updated theme colors
    renderHeroVisualizer();
  }

  // Currency Switcher
  function setupCurrency() {
    if (el.currencyINR && el.currencyUSD) {
      el.currencyINR.addEventListener('click', () => {
        state.currency = 'INR';
        el.currencyINR.classList.add('active');
        el.currencyUSD.classList.remove('active');
        updateAllCurrencyDisplays();
      });

      el.currencyUSD.addEventListener('click', () => {
        state.currency = 'USD';
        el.currencyUSD.classList.add('active');
        el.currencyINR.classList.remove('active');
        updateAllCurrencyDisplays();
      });
    }
    updateAllCurrencyDisplays();
  }

  function updateAllCurrencyDisplays() {
    if (el.heroStatARR) el.heroStatARR.textContent = formatCurrency(window.FL_DATA.stats.totalVerifiedARR);
    if (el.heroStatEscrow) el.heroStatEscrow.textContent = formatCurrency(window.FL_DATA.stats.totalEscrowVolume);
    renderHeroVisualizer();
    renderLeaderboard();
    renderMarketplace();
    recalculateValuation();
  }

  // Hero Live Visualizer
  function renderHeroVisualizer() {
    const defaultStartup = window.FL_DATA.startups[0]; // DocuPulse AI
    if (!defaultStartup) return;

    if (el.heroStartupName) el.heroStartupName.textContent = defaultStartup.name;
    if (el.heroStartupMrr) el.heroStartupMrr.textContent = formatCurrency(defaultStartup.mrr, true);
    if (el.heroStartupArr) el.heroStartupArr.textContent = formatCurrency(defaultStartup.arr);
    if (el.heroStartupGrowth) el.heroStartupGrowth.textContent = `+${defaultStartup.growthMoM}% MoM`;
    if (el.heroGstin) el.heroGstin.textContent = `${defaultStartup.gstin} (${defaultStartup.gstStatus})`;
    if (el.heroAuditHash) el.heroAuditHash.textContent = defaultStartup.ledgerHash;
    if (el.heroAuditDate) el.heroAuditDate.textContent = `Audited ${defaultStartup.auditDate}`;

    if (el.heroChartContainer) {
      el.heroChartContainer.innerHTML = renderAreaChartSVG(defaultStartup.monthlyHistory, 620, 180);
    }
  }

  // Category Pills
  function renderCategoryPills() {
    if (!el.categoryPills) return;
    el.categoryPills.innerHTML = window.FL_DATA.categories.map(cat => `
      <button class="category-pill ${cat.id === state.activeCategory ? 'active' : ''}" data-cat="${cat.id}">
        ${cat.label} (${cat.count})
      </button>
    `).join('');

    el.categoryPills.querySelectorAll('.category-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        state.activeCategory = btn.getAttribute('data-cat');
        el.categoryPills.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        renderLeaderboard();
      });
    });
  }

  // Render Startup Leaderboard
  function renderLeaderboard() {
    if (!el.startupsGrid) return;

    let list = [...window.FL_DATA.startups];

    // Filter Category
    if (state.activeCategory !== 'all') {
      list = list.filter(s => s.category === state.activeCategory);
    }

    // Filter Search
    if (state.searchQuery.trim()) {
      const q = state.searchQuery.toLowerCase().trim();
      list = list.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.tagline.toLowerCase().includes(q) ||
        s.location.toLowerCase().includes(q) ||
        s.founder.name.toLowerCase().includes(q) ||
        s.techStack.some(t => t.toLowerCase().includes(q))
      );
    }

    // Filter Deal Status
    if (state.dealFilter !== 'all') {
      list = list.filter(s => s.dealStatus === state.dealFilter);
    }

    // Filter MRR
    if (state.mrrFilter === 'under_10l') {
      list = list.filter(s => s.mrr < 1000000);
    } else if (state.mrrFilter === '10l_25l') {
      list = list.filter(s => s.mrr >= 1000000 && s.mrr <= 2500000);
    } else if (state.mrrFilter === 'above_25l') {
      list = list.filter(s => s.mrr > 2500000);
    }

    // Sort
    if (state.sortBy === 'arr_desc') {
      list.sort((a, b) => b.arr - a.arr);
    } else if (state.sortBy === 'arr_asc') {
      list.sort((a, b) => a.arr - b.arr);
    } else if (state.sortBy === 'growth_desc') {
      list.sort((a, b) => b.growthMoM - a.growthMoM);
    } else if (state.sortBy === 'margin_desc') {
      list.sort((a, b) => b.netMargin - a.netMargin);
    }

    if (el.startupsCountText) {
      el.startupsCountText.textContent = `Showing ${list.length} verified Indian startup${list.length === 1 ? '' : 's'}`;
    }

    if (list.length === 0) {
      el.startupsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: 1rem; opacity: 0.5;">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <h3 style="font-size: 1.2rem; color: var(--text-primary); margin-bottom: 0.5rem;">No startups match your filters</h3>
          <p style="font-size: 0.9rem;">Try adjusting your search terms, category, or revenue range.</p>
        </div>
      `;
      return;
    }

    el.startupsGrid.innerHTML = list.map(startup => {
      const dealBadgeClass = startup.dealStatus === 'open_acquisition' ? 'badge-deal-open' :
                             startup.dealStatus === 'fundraising' ? 'badge-deal-fundraising' : 'badge-deal-closed';

      return `
        <div class="startup-card" data-id="${startup.id}">
          <div>
            <div class="card-top-row">
              <div class="card-identity">
                <div class="card-avatar">${startup.founder.avatar}</div>
                <div class="card-name-block">
                  <h3>${startup.name}</h3>
                  <div class="card-location">${startup.categoryLabel} • ${startup.location}</div>
                </div>
              </div>
              <span class="badge ${dealBadgeClass}">
                ${startup.dealLabel}
              </span>
            </div>

            <p class="card-tagline">${startup.tagline}</p>

            <div class="card-metrics-row">
              <div class="card-metric-block">
                <span class="cm-label">Verified ARR</span>
                <span class="cm-value">${formatCurrency(startup.arr)}</span>
              </div>
              <div class="card-metric-block">
                <span class="cm-label">MoM Growth</span>
                <span class="cm-growth">+${startup.growthMoM}%</span>
              </div>
            </div>

            <div class="card-metrics-row" style="margin-top: -0.25rem; margin-bottom: 1rem; background: transparent; padding: 0;">
              <div class="card-metric-block">
                <span class="cm-label">Monthly Run-rate</span>
                <span style="font-family: var(--font-mono); font-size: 0.95rem; font-weight: 600; color: var(--text-secondary);">${formatCurrency(startup.mrr, true)}</span>
              </div>
              <div class="card-metric-block">
                <span class="cm-label">Net Profit Margin</span>
                <span style="font-family: var(--font-mono); font-size: 0.95rem; font-weight: 600; color: var(--success-dark);">${startup.netMargin}%</span>
              </div>
            </div>
          </div>

          <div class="card-footer-bar">
            <span class="card-audit-hash">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              ${startup.ledgerHash}
            </span>
            <span class="card-view-link">
              View Audit Data Room
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
            </span>
          </div>
        </div>
      `;
    }).join('');

    // Attach click listeners to cards
    el.startupsGrid.querySelectorAll('.startup-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        openStartupDrawer(id);
      });
    });
  }

  // Search & Filter Listeners
  if (el.searchInput) {
    el.searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderLeaderboard();
    });
  }

  if (el.dealFilterSelect) {
    el.dealFilterSelect.addEventListener('change', (e) => {
      state.dealFilter = e.target.value;
      renderLeaderboard();
    });
  }

  if (el.mrrFilterSelect) {
    el.mrrFilterSelect.addEventListener('change', (e) => {
      state.mrrFilter = e.target.value;
      renderLeaderboard();
    });
  }

  if (el.sortSelect) {
    el.sortSelect.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      renderLeaderboard();
    });
  }

  // Open Startup Financials Drawer / Modal
  function openStartupDrawer(startupId) {
    const s = window.FL_DATA.startups.find(item => item.id === startupId);
    if (!s) return;

    state.selectedStartup = s;

    if (el.startupModalBody) {
      el.startupModalBody.innerHTML = `
        <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 1.5rem; flex-wrap: wrap; margin-bottom: 2rem;">
          <div style="display: flex; align-items: center; gap: 1rem;">
            <div style="width: 56px; height: 56px; border-radius: var(--radius-lg); background: var(--brand-gradient); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 1.3rem; font-weight: 800;">
              ${s.founder.avatar}
            </div>
            <div>
              <h2 style="font-size: 1.6rem; font-weight: 800; margin-bottom: 3px;">${s.name}</h2>
              <p style="font-size: 0.9rem; color: var(--text-muted);">${s.categoryLabel} • Founded ${s.founded} • ${s.location}</p>
            </div>
          </div>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <span class="badge badge-verified-platinum">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              ${s.tier} Verified
            </span>
            <span class="badge ${s.dealStatus === 'open_acquisition' ? 'badge-deal-open' : 'badge-deal-closed'}">
              ${s.dealLabel}
            </span>
          </div>
        </div>

        <p style="font-size: 1.05rem; line-height: 1.6; color: var(--text-secondary); margin-bottom: 1.75rem;">
          ${s.tagline}
        </p>

        <!-- Key Financial Grid -->
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem; margin-bottom: 2rem;" class="financial-grid-modal">
          <div style="background: var(--bg-subtle); padding: 1.1rem; border-radius: var(--radius-lg); border: 1px solid var(--border-light);">
            <div style="font-size: 0.75rem; font-weight: 600; color: var(--text-muted); text-transform: uppercase;">Verified ARR</div>
            <div style="font-family: var(--font-mono); font-size: 1.4rem; font-weight: 800; color: var(--brand-primary);">${formatCurrency(s.arr)}</div>
            <div style="font-size: 0.75rem; color: var(--success-dark); font-weight: 600;">+${s.growthMoM}% MoM</div>
          </div>
          <div style="background: var(--bg-subtle); padding: 1.1rem; border-radius: var(--radius-lg); border: 1px solid var(--border-light);">
            <div style="font-size: 0.75rem; font-weight: 600; color: var(--text-muted); text-transform: uppercase;">Monthly Run-rate</div>
            <div style="font-family: var(--font-mono); font-size: 1.4rem; font-weight: 800; color: var(--text-primary);">${formatCurrency(s.mrr, true)}</div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">Current Active</div>
          </div>
          <div style="background: var(--bg-subtle); padding: 1.1rem; border-radius: var(--radius-lg); border: 1px solid var(--border-light);">
            <div style="font-size: 0.75rem; font-weight: 600; color: var(--text-muted); text-transform: uppercase;">Net Profit Margin</div>
            <div style="font-family: var(--font-mono); font-size: 1.4rem; font-weight: 800; color: var(--success-dark);">${s.netMargin}%</div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">After Hosting & Taxes</div>
          </div>
          <div style="background: var(--bg-subtle); padding: 1.1rem; border-radius: var(--radius-lg); border: 1px solid var(--border-light);">
            <div style="font-size: 0.75rem; font-weight: 600; color: var(--text-muted); text-transform: uppercase;">Annual Churn</div>
            <div style="font-family: var(--font-mono); font-size: 1.4rem; font-weight: 800; color: var(--text-primary);">${s.churnRate}%</div>
            <div style="font-size: 0.75rem; color: var(--success-dark); font-weight: 600;">Low Churn Benchmark</div>
          </div>
        </div>

        <!-- 12-Month Historical Chart -->
        <div style="background: var(--bg-card); border: 1px solid var(--border-light); border-radius: var(--radius-xl); padding: 1.5rem; margin-bottom: 2rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
            <h4 style="font-size: 0.95rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em;">12-Month Verified Revenue Trajectory</h4>
            <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted);">Source: Razorpay Webhooks + GST Returns</span>
          </div>
          <div style="width: 100%; height: 200px;">
            ${renderAreaChartSVG(s.monthlyHistory, 700, 200)}
          </div>
        </div>

        <!-- Gateway Breakdown & Compliance Proof Grid -->
        <div style="display: grid; grid-template-columns: 1fr 1.2fr; gap: 1.5rem; margin-bottom: 2rem;">
          <div style="background: var(--bg-subtle); border: 1px solid var(--border-light); border-radius: var(--radius-xl); padding: 1.5rem;">
            <h4 style="font-size: 0.9rem; font-weight: 700; margin-bottom: 1rem; text-transform: uppercase;">Payment Gateway Breakdown</h4>
            <div style="display: flex; align-items: center; gap: 1.5rem;">
              <div>${renderGatewayDonutSVG(s.revenueBreakdown)}</div>
              <div style="display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.8rem;">
                <div style="display: flex; align-items: center; gap: 6px;"><span style="width: 10px; height: 10px; background: #2563EB; border-radius: 2px;"></span> Razorpay: <strong>${s.revenueBreakdown.razorpay}%</strong></div>
                <div style="display: flex; align-items: center; gap: 6px;"><span style="width: 10px; height: 10px; background: #10B981; border-radius: 2px;"></span> UPI AutoPay: <strong>${s.revenueBreakdown.upiAutoPay}%</strong></div>
                ${s.revenueBreakdown.stripe ? `<div style="display: flex; align-items: center; gap: 6px;"><span style="width: 10px; height: 10px; background: #6366F1; border-radius: 2px;"></span> Stripe: <strong>${s.revenueBreakdown.stripe}%</strong></div>` : ''}
                ${s.revenueBreakdown.bankWire ? `<div style="display: flex; align-items: center; gap: 6px;"><span style="width: 10px; height: 10px; background: #F59E0B; border-radius: 2px;"></span> Bank NEFT/RTGS: <strong>${s.revenueBreakdown.bankWire}%</strong></div>` : ''}
              </div>
            </div>
          </div>

          <div style="background: var(--bg-subtle); border: 1px solid var(--border-light); border-radius: var(--radius-xl); padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <h4 style="font-size: 0.9rem; font-weight: 700; margin-bottom: 0.75rem; text-transform: uppercase;">Cryptographic Audit Record</h4>
              <div style="font-size: 0.8rem; display: flex; flex-direction: column; gap: 0.5rem;">
                <div style="display: flex; justify-content: space-between;"><span style="color: var(--text-muted);">GSTIN:</span> <strong style="font-family: var(--font-mono);">${s.gstin}</strong></div>
                <div style="display: flex; justify-content: space-between;"><span style="color: var(--text-muted);">MCA CIN:</span> <strong style="font-family: var(--font-mono);">${s.mcaCin}</strong></div>
                <div style="display: flex; justify-content: space-between;"><span style="color: var(--text-muted);">Ledger Hash:</span> <strong style="font-family: var(--font-mono); color: var(--brand-primary);">${s.ledgerHash}</strong></div>
              </div>
            </div>
            <div style="margin-top: 1rem; padding-top: 0.75rem; border-top: 1px dashed var(--border-light); font-size: 0.75rem; color: var(--success-dark); font-weight: 600; display: flex; align-items: center; gap: 0.35rem;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg>
              Triple-Lock Verified by FounderLedger Node #42 (Sahamati AA + GST Portal)
            </div>
          </div>
        </div>

        <!-- Founder Quote -->
        <div style="background: var(--bg-accent-soft); border-left: 4px solid var(--brand-primary); padding: 1.25rem 1.5rem; border-radius: 0 var(--radius-lg) var(--radius-lg) 0; margin-bottom: 2rem;">
          <p style="font-size: 0.95rem; font-style: italic; color: var(--text-primary); margin-bottom: 0.5rem;">"${s.founder.quote}"</p>
          <div style="font-size: 0.8rem; font-weight: 600; color: var(--brand-primary);">${s.founder.name} — ${s.founder.role} (${s.founder.twitter})</div>
        </div>

        <!-- Action CTAs -->
        <div style="display: flex; justify-content: flex-end; gap: 1rem; border-top: 1px solid var(--border-light); padding-top: 1.5rem; flex-wrap: wrap;">
          <button class="btn btn-secondary" onclick="navigator.clipboard.writeText(window.location.origin + '/v/${s.slug}'); alert('Copied verified ledger URL to clipboard!');">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            Share Ledger Profile
          </button>
          ${s.dealStatus === 'open_acquisition' ? `
            <button class="btn btn-primary" id="btn-modal-open-deal" data-id="${s.id}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              Make Acquisition Offer (${formatCurrency(s.askingPrice)})
            </button>
          ` : `
            <button class="btn btn-primary" onclick="alert('Investor data room request submitted for ${s.name}! Our team will connect you after founder approval.');">
              Request Investor Data Room Access
            </button>
          `}
        </div>
      `;

      // Attach acquisition button if present
      const dealBtn = document.getElementById('btn-modal-open-deal');
      if (dealBtn) {
        dealBtn.addEventListener('click', () => {
          closeStartupModal();
          openDealModal(s.id);
        });
      }
    }

    if (el.startupModal) el.startupModal.classList.add('active');
  }

  function closeStartupModal() {
    if (el.startupModal) el.startupModal.classList.remove('active');
  }

  // Render Marketplace
  function renderMarketplace() {
    if (!el.marketplaceGrid) return;

    el.marketplaceGrid.innerHTML = window.FL_DATA.marketplaceListings.map(deal => {
      return `
        <div class="deal-card">
          <div>
            <div class="deal-card-header">
              <div class="deal-title-group">
                <h3>${deal.title}</h3>
                <span class="deal-category-tag">${deal.category} • ${deal.location}</span>
              </div>
              <span class="badge badge-success">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Escrow Verified
              </span>
            </div>

            <div class="deal-financials-box">
              <div>
                <span class="df-label">TTM Revenue</span>
                <div class="df-value">${formatCurrency(deal.ttmRevenue)}</div>
              </div>
              <div>
                <span class="df-label">TTM Net Profit</span>
                <div class="df-value" style="color: var(--success-dark);">${formatCurrency(deal.ttmProfit)}</div>
              </div>
              <div>
                <span class="df-label">Asking Price</span>
                <div class="df-value" style="color: var(--brand-primary);">${formatCurrency(deal.askingPrice)}</div>
              </div>
            </div>

            <div style="margin-bottom: 1rem; font-size: 0.825rem; color: var(--text-muted);">
              <strong>Multiple:</strong> ${deal.multiple} • <strong>Customers:</strong> ${deal.subscribers} paying • <strong>Churn:</strong> ${deal.churnRate}%
            </div>

            <ul class="deal-highlights-list">
              ${deal.highlights.map(h => `
                <li>
                  <svg class="deal-check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  ${h}
                </li>
              `).join('')}
            </ul>
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between; padding-top: 1.25rem; border-top: 1px solid var(--border-light); margin-top: 1rem;">
            <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted);">
              Hash: ${deal.verifiedHash}
            </div>
            <button class="btn btn-primary btn-sm btn-open-deal-room" data-startup="${deal.startupId}">
              Enter Private Deal Room
            </button>
          </div>
        </div>
      `;
    }).join('');

    el.marketplaceGrid.querySelectorAll('.btn-open-deal-room').forEach(btn => {
      btn.addEventListener('click', () => {
        const sid = btn.getAttribute('data-startup');
        openDealModal(sid);
      });
    });
  }

  // Acquisition Deal Room Modal Flow
  function openDealModal(startupId) {
    const s = window.FL_DATA.startups.find(x => x.id === startupId) || window.FL_DATA.startups[0];
    const deal = window.FL_DATA.marketplaceListings.find(x => x.startupId === startupId) || window.FL_DATA.marketplaceListings[0];

    if (!el.dealModalBody) return;

    el.dealModalBody.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <span class="badge badge-verified-platinum" style="margin-bottom: 0.5rem;">ICICI Escrow Protected Deal Room</span>
        <h2 style="font-size: 1.4rem; font-weight: 800; margin-bottom: 0.25rem;">Acquisition Room: ${s.name}</h2>
        <p style="font-size: 0.875rem; color: var(--text-secondary);">Sign the mutual NDA to access audited GST e-invoices, AWS cost breakdown, code repository audit, and submit a binding Letter of Intent (LOI).</p>
      </div>

      <div style="background: var(--bg-subtle); border-radius: var(--radius-lg); padding: 1.25rem; margin-bottom: 1.5rem; font-size: 0.85rem; border: 1px solid var(--border-light);">
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 0.75rem;">
          <div><span style="color: var(--text-muted); font-size: 0.75rem;">Asking Price:</span><br><strong style="font-size: 1.1rem; color: var(--brand-primary);">${formatCurrency(s.askingPrice)}</strong></div>
          <div><span style="color: var(--text-muted); font-size: 0.75rem;">TTM Revenue:</span><br><strong style="font-size: 1.1rem;">${formatCurrency(deal ? deal.ttmRevenue : s.arr)}</strong></div>
          <div><span style="color: var(--text-muted); font-size: 0.75rem;">Escrow Fee:</span><br><strong style="font-size: 1.1rem; color: var(--success-dark);">1.5% (Closing only)</strong></div>
        </div>
      </div>

      <form id="deal-room-form" onsubmit="event.preventDefault(); document.getElementById('deal-room-success').classList.remove('hidden'); document.getElementById('deal-room-form').classList.add('hidden');">
        <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem;">
          <div>
            <label style="display: block; font-size: 0.8rem; font-weight: 600; margin-bottom: 4px;">Buyer Name / Entity</label>
            <input type="text" required placeholder="e.g. Acme Capital Ventures / Solo Operator" style="width: 100%; padding: 0.65rem 0.85rem; border: 1px solid var(--border-light); border-radius: var(--radius-md); background: var(--bg-card); color: var(--text-primary);">
          </div>
          <div>
            <label style="display: block; font-size: 0.8rem; font-weight: 600; margin-bottom: 4px;">Work Email</label>
            <input type="email" required placeholder="buyer@fund.in" style="width: 100%; padding: 0.65rem 0.85rem; border: 1px solid var(--border-light); border-radius: var(--radius-md); background: var(--bg-card); color: var(--text-primary);">
          </div>
          <div>
            <label style="display: block; font-size: 0.8rem; font-weight: 600; margin-bottom: 4px;">Initial Indicative Offer (${state.currency})</label>
            <input type="text" value="${formatExactCurrency(s.askingPrice)}" style="width: 100%; padding: 0.65rem 0.85rem; border: 1px solid var(--border-light); border-radius: var(--radius-md); background: var(--bg-card); color: var(--text-primary); font-family: var(--font-mono);">
          </div>
          <div style="display: flex; align-items: flex-start; gap: 0.5rem; font-size: 0.8rem; color: var(--text-muted);">
            <input type="checkbox" required id="nda-check" style="margin-top: 3px;">
            <label for="nda-check">I agree to the Standard Indian Tech M&A Non-Disclosure Agreement (NDA) and understand all financial metrics are verified under Indian Contract Act 1872.</label>
          </div>
        </div>

        <button type="submit" class="btn btn-primary w-full">
          Sign NDA & Unlock Private Data Room
        </button>
      </form>

      <div id="deal-room-success" class="hidden" style="text-align: center; padding: 2rem 1rem;">
        <div style="width: 52px; height: 52px; border-radius: 50%; background: var(--bg-emerald-soft); color: var(--success-dark); display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto;">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg>
        </div>
        <h3 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 0.5rem;">Mutual NDA Signed!</h3>
        <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 1.5rem;">Your private access token for <strong>${s.name}</strong> data room has been dispatched. FounderLedger Escrow representative will initiate the introduction on WhatsApp/Email within 2 business hours.</p>
        <button class="btn btn-secondary" onclick="document.getElementById('deal-modal').classList.remove('active');">Close</button>
      </div>
    `;

    if (el.dealModal) el.dealModal.classList.add('active');
  }

  // Startup Valuation Calculator Logic
  function setupCalculator() {
    if (!el.calcArrSlider) return;

    el.calcArrSlider.addEventListener('input', (e) => {
      state.calcARR = Number(e.target.value);
      recalculateValuation();
    });

    el.calcGrowthSlider.addEventListener('input', (e) => {
      state.calcGrowth = Number(e.target.value);
      recalculateValuation();
    });

    el.calcMarginSlider.addEventListener('input', (e) => {
      state.calcMargin = Number(e.target.value);
      recalculateValuation();
    });

    el.calcChurnSlider.addEventListener('input', (e) => {
      state.calcChurn = Number(e.target.value);
      recalculateValuation();
    });

    el.calcCategorySelect.addEventListener('change', (e) => {
      state.calcCategoryMultiplier = Number(e.target.value);
      recalculateValuation();
    });

    recalculateValuation();
  }

  function recalculateValuation() {
    if (!el.calcArrDisplay) return;

    el.calcArrDisplay.textContent = formatCurrency(state.calcARR);
    el.calcGrowthDisplay.textContent = `+${state.calcGrowth}% MoM`;
    el.calcMarginDisplay.textContent = `${state.calcMargin}%`;
    el.calcChurnDisplay.textContent = `${state.calcChurn}% /mo`;

    // Multiple computation based on Indian SaaS comps:
    // Base multiple from category
    let multiple = state.calcCategoryMultiplier;

    // Growth multiplier adjustment
    if (state.calcGrowth >= 25) multiple += 1.5;
    else if (state.calcGrowth >= 15) multiple += 0.8;
    else if (state.calcGrowth < 5) multiple -= 0.5;

    // Margin adjustment
    if (state.calcMargin >= 70) multiple += 0.6;
    else if (state.calcMargin < 40) multiple -= 0.6;

    // Churn penalty
    if (state.calcChurn > 3) multiple -= 0.7;
    else if (state.calcChurn <= 1.5) multiple += 0.4;

    multiple = Math.max(1.8, Math.round(multiple * 10) / 10);

    const midValuation = state.calcARR * multiple;
    const lowValuation = midValuation * 0.85;
    const highValuation = midValuation * 1.2;
    const estProfit = state.calcARR * (state.calcMargin / 100);

    if (el.calcValuationMain) el.calcValuationMain.textContent = formatCurrency(midValuation);
    if (el.calcValuationMultiple) el.calcValuationMultiple.textContent = `${multiple.toFixed(1)}x ARR Multiple`;
    if (el.calcTtmRevenue) el.calcTtmRevenue.textContent = formatCurrency(state.calcARR);
    if (el.calcEstimatedProfit) el.calcEstimatedProfit.textContent = formatCurrency(estProfit);
    if (el.calcRangeLow) el.calcRangeLow.textContent = formatCurrency(lowValuation);
    if (el.calcRangeHigh) el.calcRangeHigh.textContent = formatCurrency(highValuation);
  }

  // Verification Simulator Wizard
  function setupSimulator() {
    if (!el.btnStartVerify) return;

    el.gatewayCards.forEach(card => {
      card.addEventListener('click', () => {
        el.gatewayCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        state.wizardGateway = card.getAttribute('data-gateway');
      });
    });

    el.btnStartVerify.addEventListener('click', () => {
      goToWizardStep(2);
      runVerificationEngineSimulation();
    });

    if (el.btnCopyEmbed) {
      el.btnCopyEmbed.addEventListener('click', () => {
        navigator.clipboard.writeText(el.generatedBadgeEmbed.value);
        alert('Badge embed HTML snippet copied to clipboard! Paste it into your website header or footer.');
      });
    }

    if (el.btnResetVerify) {
      el.btnResetVerify.addEventListener('click', () => {
        goToWizardStep(1);
      });
    }

    if (el.btnOpenVerifyModal) {
      el.btnOpenVerifyModal.addEventListener('click', () => {
        const verifySection = document.getElementById('verify-section');
        if (verifySection) {
          verifySection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  }

  function goToWizardStep(step) {
    state.wizardStep = step;

    el.wizardStepTabs.forEach((tab, index) => {
      tab.classList.remove('active', 'completed');
      if (index + 1 === step) {
        tab.classList.add('active');
      } else if (index + 1 < step) {
        tab.classList.add('completed');
      }
    });

    if (el.wizardStep1) el.wizardStep1.classList.toggle('hidden', step !== 1);
    if (el.wizardStep2) el.wizardStep2.classList.toggle('hidden', step !== 2);
    if (el.wizardStep3) el.wizardStep3.classList.toggle('hidden', step !== 3);
  }

  function runVerificationEngineSimulation() {
    if (!el.engineConsole || !el.engineProgressBar) return;

    el.engineConsole.innerHTML = '';
    el.engineProgressBar.style.width = '0%';

    const logs = [
      { text: "Connecting to Razorpay Webhook OAuth 2.0 endpoint...", time: "0.2s", pct: 20 },
      { text: "Ingesting 1,240 subscription invoice receipts across 12 months...", time: "0.8s", pct: 40 },
      { text: "Scrubbing test mode transactions, chargebacks, and refund entries...", time: "1.4s", pct: 60 },
      { text: "Validating GSTR-1 GSTIN electronic filing match (Reconciliation: 100%)...", time: "2.1s", pct: 85 },
      { text: "Generating SHA-256 Ledger Block #FL-2026-IN-99B4...", time: "2.8s", pct: 100 },
      { text: "SUCCESS: Triple-Lock Verification Complete. Certified ARR: ₹18.5 Lakhs/mo", time: "3.2s", pct: 100 }
    ];

    logs.forEach((log, index) => {
      setTimeout(() => {
        const line = document.createElement('div');
        line.className = 'console-line';
        line.innerHTML = `<span class="console-time">[+${log.time}]</span> <span>${log.text}</span>`;
        el.engineConsole.appendChild(line);
        el.engineConsole.scrollTop = el.engineConsole.scrollHeight;
        el.engineProgressBar.style.width = `${log.pct}%`;

        if (index === logs.length - 1) {
          setTimeout(() => {
            const randomHash = `FL-2026-IN-${Math.floor(1000 + Math.random() * 9000).toString(16).toUpperCase()}`;
            if (el.generatedHashPill) el.generatedHashPill.textContent = randomHash;
            if (el.generatedBadgeEmbed) {
              el.generatedBadgeEmbed.value = `<a href="https://founderledger.in/verify/${randomHash}" target="_blank">\n  <img src="https://img.founderledger.in/badge/${randomHash}.svg" alt="FounderLedger Verified Revenue" width="180" />\n</a>`;
            }
            goToWizardStep(3);
          }, 800);
        }
      }, index * 600);
    });
  }

  // Modals Overlay Helpers
  function setupModals() {
    if (el.modalCloseBtn) {
      el.modalCloseBtn.addEventListener('click', closeStartupModal);
    }
    if (el.dealModalCloseBtn) {
      el.dealModalCloseBtn.addEventListener('click', () => {
        if (el.dealModal) el.dealModal.classList.remove('active');
      });
    }

    // Close on backdrop click
    window.addEventListener('click', (e) => {
      if (e.target === el.startupModal) closeStartupModal();
      if (e.target === el.dealModal) el.dealModal.classList.remove('active');
      if (e.target === el.cmdModal) el.cmdModal.classList.remove('active');
    });

    // Close on ESC key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeStartupModal();
        if (el.dealModal) el.dealModal.classList.remove('active');
        if (el.cmdModal) el.cmdModal.classList.remove('active');
      }
    });
  }

  // Command Palette (Cmd + K)
  function setupCommandPalette() {
    if (el.btnOpenCmd) {
      el.btnOpenCmd.addEventListener('click', openCmdModal);
    }

    window.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openCmdModal();
      }
    });

    if (el.cmdSearchInput) {
      el.cmdSearchInput.addEventListener('input', (e) => {
        renderCmdResults(e.target.value);
      });
    }
  }

  function openCmdModal() {
    if (!el.cmdModal) return;
    el.cmdModal.classList.add('active');
    if (el.cmdSearchInput) {
      el.cmdSearchInput.value = '';
      el.cmdSearchInput.focus();
      renderCmdResults('');
    }
  }

  function renderCmdResults(query) {
    if (!el.cmdResultsList) return;

    const q = query.toLowerCase().trim();
    let results = window.FL_DATA.startups.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.categoryLabel.toLowerCase().includes(q) ||
      s.founder.name.toLowerCase().includes(q)
    );

    if (results.length === 0) {
      el.cmdResultsList.innerHTML = `
        <div style="padding: 1.5rem; text-align: center; color: var(--text-muted); font-size: 0.9rem;">
          No matching startups or tools found.
        </div>
      `;
      return;
    }

    el.cmdResultsList.innerHTML = results.map(s => `
      <div class="cmd-item" data-id="${s.id}">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <div style="width: 28px; height: 28px; border-radius: var(--radius-sm); background: var(--brand-gradient); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 0.75rem; font-weight: 700;">
            ${s.founder.avatar}
          </div>
          <div>
            <strong style="font-size: 0.9rem; color: var(--text-primary);">${s.name}</strong>
            <span style="font-size: 0.75rem; color: var(--text-muted); margin-left: 6px;">${s.categoryLabel}</span>
          </div>
        </div>
        <div style="font-family: var(--font-mono); font-weight: 700; font-size: 0.85rem; color: var(--brand-primary);">
          ${formatCurrency(s.arr)}
        </div>
      </div>
    `).join('');

    el.cmdResultsList.querySelectorAll('.cmd-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = item.getAttribute('data-id');
        if (el.cmdModal) el.cmdModal.classList.remove('active');
        openStartupDrawer(id);
      });
    });
  }

  // Live Top Ticker
  function setupTicker() {
    if (!el.tickerText) return;
    let tickerIndex = 0;
    setInterval(() => {
      tickerIndex = (tickerIndex + 1) % window.FL_DATA.tickerEvents.length;
      const ev = window.FL_DATA.tickerEvents[tickerIndex];
      el.tickerText.style.opacity = '0';
      setTimeout(() => {
        el.tickerText.textContent = `${ev.text} • ${ev.time}`;
        el.tickerText.style.opacity = '1';
      }, 200);
    }, 4500);
  }

  // FAQ Accordion
  function setupFaqAccordion() {
    document.querySelectorAll('.faq-item').forEach(item => {
      const btn = item.querySelector('.faq-question-btn');
      if (btn) {
        btn.addEventListener('click', () => {
          const isOpen = item.classList.contains('open');
          document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
          if (!isOpen) {
            item.classList.add('open');
          }
        });
      }
    });
  }

  // Live Toast Stream Generator
  function startLiveToastStream() {
    if (!el.toastContainer) return;

    let toastIdx = 0;
    const toastTemplates = [
      { name: "DevPulse AI", amount: "₹18.5L", gateway: "Razorpay" },
      { name: "HireStack India", amount: "₹14.2L", gateway: "Cashfree" },
      { name: "InvoiceWali", amount: "₹7.5L", gateway: "PhonePe UPI" },
      { name: "CodeBharat IDE", amount: "₹9.2L", gateway: "Stripe India" },
      { name: "LeadChakra", amount: "₹26.0L", gateway: "Razorpay" }
    ];

    setInterval(() => {
      toastIdx = (toastIdx + 1) % toastTemplates.length;
      const t = toastTemplates[toastIdx];

      const toast = document.createElement('div');
      toast.className = 'toast-item';
      toast.innerHTML = `
        <div style="width: 28px; height: 28px; border-radius: 50%; background: var(--bg-emerald-soft); color: var(--success-dark); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <div>
          <div style="font-weight: 700; font-size: 0.825rem;">${t.name} Verified</div>
          <div style="font-size: 0.75rem; color: var(--text-muted);">${t.amount} MRR reconciled via ${t.gateway} • Just now</div>
        </div>
      `;

      el.toastContainer.appendChild(toast);

      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-20px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
      }, 4000);
    }, 12000);
  }

  // Execute on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
