(function () {
  const key = 'globaled_application_draft_v1';
  const form = document.querySelector('[data-application-form]');
  const statusEl = document.querySelector('[data-save-status]');

  if (form) {
    try {
      const draft = JSON.parse(localStorage.getItem(key) || '{}');
      Object.entries(draft).forEach(([name, value]) => {
        const field = form.elements.namedItem(name);
        if (field && typeof field.value !== 'undefined') field.value = value;
      });
      if (statusEl) statusEl.textContent = 'Draft restored.';
    } catch (_) {}

    const saveDraft = () => {
      const payload = {};
      Array.from(form.elements).forEach((el) => {
        if (el.name) payload[el.name] = el.value;
      });
      localStorage.setItem(key, JSON.stringify(payload));
      if (statusEl) statusEl.textContent = `Saved at ${new Date().toLocaleTimeString()}`;
    };

    let timer;
    form.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(saveDraft, 600);
    });

    const saveBtn = document.querySelector('[data-save-draft]');
    const clearBtn = document.querySelector('[data-clear-draft]');

    if (saveBtn) saveBtn.addEventListener('click', saveDraft);
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        localStorage.removeItem(key);
        form.reset();
        if (statusEl) statusEl.textContent = 'Draft cleared.';
      });
    }
  }

  const filterForm = document.querySelector('[data-scholarship-filters]');
  if (filterForm) {
    const cards = Array.from(document.querySelectorAll('[data-scholarship-card]'));
    const applyFilters = () => {
      const country = filterForm.country.value;
      const field = filterForm.field.value;
      const degree = filterForm.degree.value;
      cards.forEach((card) => {
        const okCountry = country === 'Any' || card.dataset.country === country;
        const okField = field === 'Any' || card.dataset.field === field;
        const okDegree = degree === 'Any' || card.dataset.degree === degree;
        card.style.display = okCountry && okField && okDegree ? 'block' : 'none';
      });
    };
    filterForm.addEventListener('change', applyFilters);
    applyFilters();
  }
})();
