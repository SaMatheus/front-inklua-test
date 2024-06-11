import { create } from 'zustand';

type ViewProps = {
  isMobile: boolean;
  setIsMobile: (value: boolean) => void;
};

export const useMobileStore = create<ViewProps>((set) => {
  const setIsMobile = (value: boolean) => set(() => ({ isMobile: value }));

  const checkIsMobile = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;

      let mobile = false;

      if (width <= 980) {
        mobile = true;
      } else if (width > 980) {
        mobile = false;
      }
      setIsMobile(mobile);
    }
  };

  checkIsMobile();

  if (typeof window !== 'undefined') {
    window.addEventListener('resize', checkIsMobile);
  }

  return {
    isMobile: typeof window !== 'undefined' ? window.innerWidth <= 820 : false,
    setIsMobile,
    removeListener: () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', checkIsMobile);
      }
    },
  };
});