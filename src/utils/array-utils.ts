// https://stackoverflow.com/questions/16801687/javascript-random-ordering-with-seed
const shuffle = <TType>(array: TType[], seed: number): TType[] => {
  const copy = [...array];
  let m = copy.length,
    t,
    i;

  while (m) {
    i = Math.floor(random(seed) * m--);

    t = copy[m];
    copy[m] = copy[i];
    copy[i] = t;
    ++seed;
  }

  return copy;
};

const random = (seed: number): number => {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};

export {shuffle};
