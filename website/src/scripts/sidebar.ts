const sidebarStorageKey = 'zz-sidebar-state';
const sidebarTreeStorageKey = 'zz-sidebar-tree-state';
const sidebarStates = ['visible', 'hidden'] as const;
const sidebarTreeStates = ['expanded', 'collapsed'] as const;

type SidebarState = (typeof sidebarStates)[number];
type SidebarTreeState = (typeof sidebarTreeStates)[number];

const getStoredValue = <T extends string>(
  key: string,
  values: readonly T[],
  fallback: T,
): T => {
  const storedValue = localStorage.getItem(key);

  return values.includes(storedValue as T) ? (storedValue as T) : fallback;
};

const setSidebarState = (state: SidebarState) => {
  document.querySelectorAll<HTMLElement>('[data-sidebar-root]').forEach((root) => {
    root.dataset.sidebarState = state;
  });

  localStorage.setItem(sidebarStorageKey, state);
};

const setTreeState = (state: SidebarTreeState) => {
  document.querySelectorAll<HTMLDetailsElement>('[data-category-node]').forEach((details) => {
    details.open = state === 'expanded';
  });

  localStorage.setItem(sidebarTreeStorageKey, state);
};

const initSidebar = () => {
  const sidebarState = getStoredValue(sidebarStorageKey, sidebarStates, 'visible');
  const treeState = getStoredValue(sidebarTreeStorageKey, sidebarTreeStates, 'expanded');

  setSidebarState(sidebarState);
  setTreeState(treeState);

  document.querySelectorAll<HTMLButtonElement>('[data-sidebar-toggle]').forEach((button) => {
    button.addEventListener('click', () => setSidebarState('hidden'));
  });

  document.querySelectorAll<HTMLButtonElement>('[data-sidebar-open]').forEach((button) => {
    button.addEventListener('click', () => setSidebarState('visible'));
  });

  document.querySelectorAll<HTMLButtonElement>('[data-category-expand-all]').forEach((button) => {
    button.addEventListener('click', () => setTreeState('expanded'));
  });

  document.querySelectorAll<HTMLButtonElement>('[data-category-collapse-all]').forEach((button) => {
    button.addEventListener('click', () => setTreeState('collapsed'));
  });
};

initSidebar();
