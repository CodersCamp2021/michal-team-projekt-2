export const scrollToSection = (ref) => {
  ref.current.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest',
  });
};
