import { create } from 'zustand';

type ViewProps = {
  isMobile: boolean;
  setIsMobile: (value: boolean) => void;
};

export const useMobileStore = create<ViewProps>((set) => {
  const setIsMobile = (value: boolean) => set(() => ({ isMobile: value }));

  const checkIsMobile = () => {
    const width = window.innerWidth;

    let mobile = false;

    if (width <= 980) {
      mobile = true;
    } else if (width > 980) {
      mobile = false;
    }
    setIsMobile(mobile);
  };

  checkIsMobile();

  window.addEventListener('resize', checkIsMobile);

  return {
    isMobile: window.innerWidth <= 820,
    setIsMobile,
    removeListener: () => window.removeEventListener('resize', checkIsMobile),
  };
});