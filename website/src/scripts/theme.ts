const themeStorageKey = 'zz-theme';
const themeValues = ['light', 'dark', 'system'] as const;

type ThemeValue = (typeof themeValues)[number];

const isThemeValue = (value: string | null): value is ThemeValue =>
  value !== null && themeValues.includes(value as ThemeValue);

const getStoredTheme = (): ThemeValue => {
  const storedTheme = localStorage.getItem(themeStorageKey);

  return isThemeValue(storedTheme) ? storedTheme : 'system';
};

const resolveTheme = (theme: ThemeValue) => {
  if (theme !== 'system') {
    return theme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

const updateThemeButtons = (theme: ThemeValue) => {
  document.querySelectorAll<HTMLButtonElement>('[data-theme-value]').forEach((button) => {
    button.setAttribute(
      'aria-pressed',
      button.dataset.themeValue === theme ? 'true' : 'false',
    );
  });
};

const applyTheme = (theme: ThemeValue) => {
  document.documentElement.dataset.themeChoice = theme;
  document.documentElement.dataset.theme = resolveTheme(theme);
  updateThemeButtons(theme);
};

const initTheme = () => {
  const savedTheme = getStoredTheme();

  applyTheme(savedTheme);

  document.querySelectorAll<HTMLButtonElement>('[data-theme-value]').forEach((button) => {
    button.addEventListener('click', () => {
      const theme = button.dataset.themeValue ?? null;

      if (!isThemeValue(theme)) {
        return;
      }

      localStorage.setItem(themeStorageKey, theme);
      applyTheme(theme);
    });
  });

  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', () => {
      if (getStoredTheme() === 'system') {
        applyTheme('system');
      }
    });
};

initTheme();
