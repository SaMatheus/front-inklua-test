import create from 'zustand';

type State = {
  isMobile: boolean;
  setIsMobile: (value: boolean) => void;
};

export const useMobileStore = create<State>((set) => ({
  isMobile: false,
  setIsMobile: (value: boolean) => set(() => ({ isMobile: value })),
}));

if (typeof window !== 'undefined') {
  const userAgent = window.navigator.userAgent;
  const mobile = Boolean(/android|blackberry|iphone|ipod|opera mini|iemobile|wpdesktop/i.test(userAgent));
  useMobileStore.getState().setIsMobile(mobile);
}