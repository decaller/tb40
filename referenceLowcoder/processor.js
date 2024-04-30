// helper
const calcAvgChildren = (childrens,prevCalc) => childrens
  .map(id=>prevCalc.find(bakat=>bakat.id==id).score)
  .reduce((a,b)=>a+b)
  /childrens.length



const scores = [60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60,60]

// calc 40
var calcBakat40 = base.map(
  (
    bakat // get score of 40 bakat
  ) =>
    bakat.id.includes(".")
      ? bakat
      : {
          ...bakat,
          score: scores[parseInt(bakat.id) - 1],
        }
);

// calc 18
var calcBakat18 = calcBakat40.map((bakat) =>
  bakat.id.includes("18.")
    ? {
        ...bakat,
        score: calcAvgChildren(bakat.data.DirectChild, calcBakat18),
      }
    : bakat
);


// calc 6
var calcBakat6 = calcBakat18.map((bakat) =>
  bakat.id.includes("6.")
    ? {
        ...bakat,
        score: calcAvgChildren(bakat.data.DirectChild, calcBakat6),
      }
    : bakat
);


// calc 3 & 2
var calcBakat3And2 = calcBakat6.map((bakat) =>
  bakat.id.includes("3.") || bakat.id.includes("2.")
    ? {
        ...bakat,
        score: calcAvgChildren(bakat.data.DirectChild, calcBakat3And2),
      }
    : bakat
);

// coloring
var coloring = calcBakat3And2.value.map((b) =>
  b.score > 80
    ? { ...b, kekuatan: "Sangat Kuat", color: "rgb(255, 100, 100)" }
    : b.score > 60
    ? { ...b, kekuatan: "Kuat", color: "rgb(255, 225, 98)" }
    : b.score > 40
    ? { ...b, kekuatan: "Sedang", color: "rgb(145, 196, 131)" }
    : b.score > 20
    ? { ...b, kekuatan: "Lemah", color: "rgb(187, 187, 187)" }
    : { ...b, kekuatan: "Sangat Lemah", color: "rgb(136, 136, 136)" }
);

// sorting
const sortB = (items) => items.sort((a, b) => b.score - a.score);

const filterB = (catInd) =>
  coloring.value.filter((bakat) => bakat.id.includes(catInd));

return {
  2: sortB(filterB("2.")),
  3: sortB(filterB("3.")),
  6: sortB(filterB("6.")),
  18: sortB(filterB("18.")),
  40: sortB(coloring.value.filter((bakat) => !bakat.id.includes("."))),
};
