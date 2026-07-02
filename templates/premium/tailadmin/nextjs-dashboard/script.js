// TailAdmin Next.js Dashboard Clone - Shared JavaScript

(function () {
  'use strict';

  // ========== DARK MODE ==========
  function initDarkMode() {
    const html = document.documentElement;
    const stored = localStorage.getItem('tailadmin-theme');
    if (stored === 'dark') {
      html.classList.add('dark');
    }

    const toggleBtns = document.querySelectorAll('.dark-toggle');
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        html.classList.toggle('dark');
        const isDark = html.classList.contains('dark');
        localStorage.setItem('tailadmin-theme', isDark ? 'dark' : 'light');
        updateDarkIcons(isDark);
      });
    });

    updateDarkIcons(html.classList.contains('dark'));
  }

  function updateDarkIcons(isDark) {
    const sunIcons = document.querySelectorAll('.icon-sun');
    const moonIcons = document.querySelectorAll('.icon-moon');
    sunIcons.forEach(el => el.style.display = isDark ? 'block' : 'none');
    moonIcons.forEach(el => el.style.display = isDark ? 'none' : 'block');
  }

  // ========== SIDEBAR ==========
  function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainArea = document.getElementById('mainArea');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    if (!sidebar) return;

    // Desktop collapse/expand
    const desktopCollapsed = localStorage.getItem('sidebar-collapsed') === 'true';
    if (desktopCollapsed && window.innerWidth > 1024) {
      sidebar.classList.add('collapsed');
      if (mainArea) mainArea.classList.add('collapsed');
    }

    if (sidebarToggle) {
      sidebarToggle.addEventListener('click', () => {
        if (window.innerWidth <= 1024) {
          // Mobile: show/hide overlay
          sidebar.classList.toggle('mobile-open');
          if (sidebarOverlay) sidebarOverlay.classList.toggle('active');
          document.body.style.overflow = sidebar.classList.contains('mobile-open') ? 'hidden' : '';
        } else {
          // Desktop: collapse
          sidebar.classList.toggle('collapsed');
          if (mainArea) mainArea.classList.toggle('collapsed');
          localStorage.setItem('sidebar-collapsed', sidebar.classList.contains('collapsed'));
        }
      });
    }

    if (sidebarOverlay) {
      sidebarOverlay.addEventListener('click', () => {
        sidebar.classList.remove('mobile-open');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    // Submenu toggles
    const navItems = document.querySelectorAll('.nav-item[data-submenu]');
    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const wasOpen = item.classList.contains('open');
        // Close all
        document.querySelectorAll('.nav-item.open').forEach(i => i.classList.remove('open'));
        if (!wasOpen) item.classList.add('open');
      });
    });

    // Mark active item
    const currentPath = window.location.pathname;
    const allLinks = document.querySelectorAll('.nav-item[href], .nav-submenu a');
    allLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && currentPath.endsWith(href.replace('../', '').replace('./', ''))) {
        link.classList.add('active');
        const submenu = link.closest('.nav-submenu');
        if (submenu) {
          const parentItem = submenu.previousElementSibling;
          if (parentItem) parentItem.classList.add('open');
        }
      }
    });
  }

  // ========== DROPDOWN ==========
  function initDropdowns() {
    document.querySelectorAll('.dropdown').forEach(dropdown => {
      const trigger = dropdown.querySelector('.dropdown-trigger');
      if (trigger) {
        trigger.addEventListener('click', (e) => {
          e.stopPropagation();
          document.querySelectorAll('.dropdown.open').forEach(d => {
            if (d !== dropdown) d.classList.remove('open');
          });
          dropdown.classList.toggle('open');
        });
      }
    });

    document.addEventListener('click', () => {
      document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
    });
  }

  // ========== TABS ==========
  function initTabs() {
    document.querySelectorAll('.tab-nav').forEach(nav => {
      const btns = nav.querySelectorAll('.tab-btn');
      btns.forEach(btn => {
        btn.addEventListener('click', () => {
          const target = btn.dataset.tab;
          btns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const panel = document.getElementById(target);
          if (panel) {
            panel.closest('.tab-wrapper')?.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            panel.classList.add('active');
          }
        });
      });
    });
  }

  // ========== MODALS ==========
  function initModals() {
    document.querySelectorAll('[data-modal]').forEach(trigger => {
      trigger.addEventListener('click', () => {
        const modal = document.getElementById(trigger.dataset.modal);
        if (modal) modal.classList.add('open');
      });
    });

    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.classList.remove('open');
      });

      const closeBtn = overlay.querySelector('.modal-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => overlay.classList.remove('open'));
      }
    });

    document.querySelectorAll('[data-modal-close]').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.closest('.modal-overlay')?.classList.remove('open');
      });
    });
  }

  // ========== CHARTS (ApexCharts) ==========
  function initCharts() {
    if (typeof ApexCharts === 'undefined') return;

    const isDark = document.documentElement.classList.contains('dark');
    const textColor = isDark ? '#98a2b3' : '#667085';
    const gridColor = isDark ? '#2d3748' : '#e4e7ec';
    const brandColor = '#465fff';
    const brand2 = '#7592ff';

    // Revenue Chart
    const revenueEl = document.getElementById('revenueChart');
    if (revenueEl) {
      new ApexCharts(revenueEl, {
        series: [
          { name: 'Revenue', data: [31000, 40000, 28000, 51000, 42000, 109000, 100000, 120000, 95000, 78000, 88000, 140000] },
          { name: 'Expense', data: [11000, 32000, 45000, 32000, 34000, 52000, 41000, 32000, 57000, 43000, 67000, 98000] }
        ],
        chart: { type: 'area', height: 310, toolbar: { show: false }, zoom: { enabled: false } },
        colors: [brandColor, '#e4e7ec'],
        fill: {
          type: 'gradient',
          gradient: { shadeIntensity: 1, type: 'vertical', stops: [0, 100],
            colorStops: [
              [{ offset: 0, color: brandColor, opacity: 0.2 }, { offset: 100, color: brandColor, opacity: 0.01 }],
              [{ offset: 0, color: '#e4e7ec', opacity: 0.2 }, { offset: 100, color: '#e4e7ec', opacity: 0.01 }]
            ]
          }
        },
        dataLabels: { enabled: false },
        stroke: { curve: 'smooth', width: 2 },
        xaxis: {
          categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
          labels: { style: { colors: textColor, fontSize: '12px' } },
          axisBorder: { show: false },
          axisTicks: { show: false }
        },
        yaxis: {
          labels: {
            style: { colors: textColor, fontSize: '12px' },
            formatter: v => '$' + (v / 1000).toFixed(0) + 'k'
          }
        },
        grid: { borderColor: gridColor, strokeDashArray: 4 },
        tooltip: { shared: true, intersect: false, y: { formatter: v => '$' + v.toLocaleString() } },
        legend: { position: 'top', horizontalAlign: 'right', labels: { colors: textColor } }
      }).render();
    }

    // Traffic Chart (Donut)
    const trafficEl = document.getElementById('trafficChart');
    if (trafficEl) {
      new ApexCharts(trafficEl, {
        series: [68.1, 14.2, 7.9, 5.4, 4.4],
        chart: { type: 'donut', height: 260, toolbar: { show: false } },
        labels: ['Google', 'Direct', 'Twitter', 'LinkedIn', 'Others'],
        colors: [brandColor, '#12b76a', '#f79009', '#ac4bff', '#98a2b3'],
        dataLabels: { enabled: false },
        legend: { show: false },
        plotOptions: { pie: { donut: { size: '70%', labels: {
          show: true,
          total: { show: true, label: 'Total', color: textColor, formatter: () => '100%' }
        } } } }
      }).render();
    }

    // Analytics Chart
    const analyticsEl = document.getElementById('analyticsChart');
    if (analyticsEl) {
      new ApexCharts(analyticsEl, {
        series: [
          { name: 'Sessions', data: [120, 180, 150, 200, 170, 220, 190, 250, 210, 280, 240, 300] },
          { name: 'Users', data: [90, 140, 110, 160, 130, 175, 150, 200, 165, 220, 190, 250] }
        ],
        chart: { type: 'bar', height: 280, toolbar: { show: false }, stacked: false },
        colors: [brandColor, '#7592ff'],
        dataLabels: { enabled: false },
        plotOptions: { bar: { columnWidth: '55%', borderRadius: 4 } },
        xaxis: {
          categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
          labels: { style: { colors: textColor, fontSize: '12px' } },
          axisBorder: { show: false }, axisTicks: { show: false }
        },
        yaxis: { labels: { style: { colors: textColor, fontSize: '12px' } } },
        grid: { borderColor: gridColor, strokeDashArray: 4 },
        legend: { labels: { colors: textColor } }
      }).render();
    }

    // Sales Donut
    const salesDonutEl = document.getElementById('salesDonutChart');
    if (salesDonutEl) {
      new ApexCharts(salesDonutEl, {
        series: [52.8, 26.4, 12.3, 8.5],
        chart: { type: 'donut', height: 200, toolbar: { show: false } },
        labels: ['Online', 'In-store', 'Wholesale', 'Other'],
        colors: [brandColor, '#12b76a', '#f79009', '#ac4bff'],
        dataLabels: { enabled: false },
        legend: { position: 'bottom', labels: { colors: textColor }, fontSize: '12px' },
        plotOptions: { pie: { donut: { size: '65%' } } }
      }).render();
    }

    // Line chart for profile page
    const profileChartEl = document.getElementById('profileStatsChart');
    if (profileChartEl) {
      new ApexCharts(profileChartEl, {
        series: [{ name: 'Followers', data: [1200, 1800, 1600, 2100, 1900, 2500, 2300, 2800] }],
        chart: { type: 'line', height: 120, sparkline: { enabled: true } },
        stroke: { curve: 'smooth', width: 2 },
        colors: [brandColor],
        tooltip: { fixed: { enabled: false }, x: { show: false } }
      }).render();
    }
  }

  // ========== TABLE SORTING ==========
  function initTables() {
    document.querySelectorAll('table.sortable').forEach(table => {
      const headers = table.querySelectorAll('th[data-sort]');
      headers.forEach(th => {
        th.style.cursor = 'pointer';
        th.addEventListener('click', () => {
          const col = Array.from(th.parentElement.children).indexOf(th);
          const tbody = table.querySelector('tbody');
          const rows = Array.from(tbody.querySelectorAll('tr'));
          const ascending = th.dataset.sortDir !== 'asc';
          headers.forEach(h => { h.dataset.sortDir = ''; });
          th.dataset.sortDir = ascending ? 'asc' : 'desc';

          rows.sort((a, b) => {
            const aText = a.cells[col]?.textContent.trim() || '';
            const bText = b.cells[col]?.textContent.trim() || '';
            const aNum = parseFloat(aText.replace(/[^0-9.-]/g, ''));
            const bNum = parseFloat(bText.replace(/[^0-9.-]/g, ''));
            if (!isNaN(aNum) && !isNaN(bNum)) {
              return ascending ? aNum - bNum : bNum - aNum;
            }
            return ascending ? aText.localeCompare(bText) : bText.localeCompare(aText);
          });

          rows.forEach(row => tbody.appendChild(row));
        });
      });
    });
  }

  // ========== CALENDAR ==========
  function initCalendar() {
    const calGrid = document.getElementById('calendarGrid');
    const calTitle = document.getElementById('calendarTitle');
    if (!calGrid) return;

    let currentDate = new Date();

    function renderCalendar(date) {
      const year = date.getFullYear();
      const month = date.getMonth();
      const today = new Date();

      if (calTitle) {
        calTitle.textContent = date.toLocaleString('default', { month: 'long', year: 'numeric' });
      }

      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const daysInPrev = new Date(year, month, 0).getDate();

      calGrid.innerHTML = '';

      const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
      dayNames.forEach(name => {
        const el = document.createElement('div');
        el.className = 'cal-day-name';
        el.textContent = name;
        calGrid.appendChild(el);
      });

      // Prev month days
      for (let i = firstDay - 1; i >= 0; i--) {
        const el = document.createElement('div');
        el.className = 'cal-day other-month';
        el.textContent = daysInPrev - i;
        calGrid.appendChild(el);
      }

      // Events (example)
      const events = [5, 12, 18, 25];

      // Current month days
      for (let d = 1; d <= daysInMonth; d++) {
        const el = document.createElement('div');
        el.className = 'cal-day';
        if (d === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
          el.classList.add('today');
        }
        if (events.includes(d)) el.classList.add('has-event');
        el.textContent = d;
        calGrid.appendChild(el);
      }

      // Next month days
      const totalCells = calGrid.children.length - 7; // minus day names
      const remaining = 42 - totalCells;
      for (let d = 1; d <= remaining; d++) {
        const el = document.createElement('div');
        el.className = 'cal-day other-month';
        el.textContent = d;
        calGrid.appendChild(el);
      }
    }

    renderCalendar(currentDate);

    const prevBtn = document.getElementById('calPrev');
    const nextBtn = document.getElementById('calNext');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
        renderCalendar(currentDate);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
        renderCalendar(currentDate);
      });
    }
  }

  // ========== SEARCH ==========
  function initSearch() {
    const searchInput = document.querySelector('.topbar-search input');
    if (searchInput) {
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') searchInput.blur();
      });
    }
  }

  // ========== NOTIFICATION DROPDOWN ==========
  function initNotifications() {
    const notifBtn = document.getElementById('notifBtn');
    const notifDropdown = document.getElementById('notifDropdown');
    if (notifBtn && notifDropdown) {
      notifBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        notifDropdown.classList.toggle('open');
      });
      document.addEventListener('click', () => {
        notifDropdown.classList.remove('open');
      });
    }
  }

  // ========== USER MENU ==========
  function initUserMenu() {
    const userMenu = document.getElementById('userMenuBtn');
    const userDropdown = document.getElementById('userDropdown');
    if (userMenu && userDropdown) {
      userMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        userDropdown.classList.toggle('open');
      });
      document.addEventListener('click', () => {
        userDropdown.classList.remove('open');
      });
    }
  }

  // ========== KANBAN DRAG ==========
  function initKanban() {
    let dragging = null;
    document.querySelectorAll('.kanban-card').forEach(card => {
      card.setAttribute('draggable', 'true');
      card.addEventListener('dragstart', () => {
        dragging = card;
        card.style.opacity = '0.5';
      });
      card.addEventListener('dragend', () => {
        card.style.opacity = '1';
        dragging = null;
      });
    });

    document.querySelectorAll('.kanban-col').forEach(col => {
      col.addEventListener('dragover', e => e.preventDefault());
      col.addEventListener('drop', () => {
        if (dragging) col.appendChild(dragging);
      });
    });
  }

  // ========== SIDEBAR OVERLAY STYLE ==========
  function addOverlayStyle() {
    const style = document.createElement('style');
    style.textContent = `
      #sidebarOverlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 997; }
      #sidebarOverlay.active { display: block; }
    `;
    document.head.appendChild(style);
  }

  // ========== INIT ==========
  function init() {
    addOverlayStyle();
    initDarkMode();
    initSidebar();
    initDropdowns();
    initTabs();
    initModals();
    initSearch();
    initNotifications();
    initUserMenu();
    initTables();
    initCalendar();
    initKanban();

    // Charts after a tick so DOM is ready
    requestAnimationFrame(() => {
      setTimeout(initCharts, 100);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
