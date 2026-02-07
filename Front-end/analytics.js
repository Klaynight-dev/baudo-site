// ============================ 
// CONFIGURATION 
// ============================ 
const ANALYTICS_WORKER_URL = "https://baudo-analystic.totoyopacmam.workers.dev";
const STORAGE_KEY = "baudo_last_visit";
const CACHE_KEY = "baudo_last_total";

let isFirstLoad = true;

// ============================
// FORMAT NUMBER
// ============================
function formatNumber(num) {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  return num.toString();
}

// ============================
// ANIMATE NUMBER
// ============================
function animateNumber(element, start, end, duration) {
  const startTime = performance.now();
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (end - start) * easeOut);
    element.textContent = formatNumber(current);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// ============================
// UPDATE DISPLAY
// ============================
function updateCounterDisplay(total) {
  const el = document.getElementById("siteViews");
  if (!el) return;

  const previousValue = parseInt(el.dataset.currentValue || "0", 10);

  if (isFirstLoad) {
    el.textContent = "0";
    el.dataset.currentValue = "0";
    isFirstLoad = false;
    setTimeout(() => {
      animateNumber(el, 0, total, 2000);
      el.dataset.currentValue = total.toString();
    }, 500);
    return;
  }

  animateNumber(el, previousValue, total, 1500);
  el.dataset.currentValue = total.toString();
}

// ============================
// FETCH TOTAL VISITS
// ============================
async function fetchTotalVisits() {
  try {
    const res = await fetch(`${ANALYTICS_WORKER_URL}/stats`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.success && typeof data.totalVisits === "number") {
      localStorage.setItem(CACHE_KEY, data.totalVisits.toString());
      updateCounterDisplay(data.totalVisits);
    }
  } catch (e) {
    console.warn("Impossible de récupérer le total, utilisation du cache local:", e);
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) updateCounterDisplay(Number(cached));
  }
}

// ============================
// SEND VISIT
// ============================
async function sendVisit() {
  try {
    const lastVisit = localStorage.getItem(STORAGE_KEY);
    const now = Date.now();
    if (lastVisit && now - Number(lastVisit) < 60_000) return;
    localStorage.setItem(STORAGE_KEY, now.toString());

    const res = await fetch(ANALYTICS_WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({})
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.success && typeof data.totalVisits === "number") {
      localStorage.setItem(CACHE_KEY, data.totalVisits.toString());
      updateCounterDisplay(data.totalVisits);
    }
  } catch (err) {
    console.warn("Erreur analytics, utilisation du cache local:", err);
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) updateCounterDisplay(Number(cached));
  }
}

// ============================
// INIT
// ============================
window.addEventListener("load", () => {
  setTimeout(() => {
    fetchTotalVisits();
    sendVisit();
  }, 300);
});
