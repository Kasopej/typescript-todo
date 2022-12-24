export default function debounce(
  fn: (...args: [unknown]) => unknown,
  time: number,
): (...args: [unknown]) => unknown {
  let timer: NodeJS.Timeout;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(fn.bind(this, ...args), time);
  };
}
