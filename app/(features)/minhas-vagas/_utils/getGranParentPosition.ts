const getOffsetTop = (element: HTMLElement | null): number => {
  let offsetTop = 0;
  while(element) {
    offsetTop += element.offsetTop;
    element = element.offsetParent as HTMLElement | null;
  }
  return offsetTop;
}

const getGranParentPosition = (element: HTMLElement) => {
  const parentElement = element.parentElement?.parentElement?.parentElement;
  if (parentElement) {
    const offsetTop = getOffsetTop(element);
    return offsetTop - parentElement.getBoundingClientRect().height;
  }
}

export default getGranParentPosition;