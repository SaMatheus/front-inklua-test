interface ScrollToProps {
  element: HTMLElement | null;
  position: ScrollLogicalPosition;
  behavior?: ScrollBehavior;
}

export function scrollTo({ element, position, behavior = 'smooth' }: ScrollToProps) {
  if (!element) return;

  const scrollOptions = {
    block: position,
    behavior
  };

  element.scrollIntoView(scrollOptions);
}