const navbar = document.querySelector("#navbar");

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  const scrollPercentage = scrollTop / (scrollHeight - clientHeight);
  const opacity = Math.min(scrollPercentage * 12, 1);

  navbar.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
});
