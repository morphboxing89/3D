const phoenixModel = document.getElementById("phoenix-model");

const sections = Array.from(document.querySelectorAll("section"));

const shiftPositions = [0, -20, 0, 25];
const cameraOrbits = [
  [0, 30], // спереди, чуть сверху
  [90, 45], // справа, чуть сверху
  [270, 0], // сзади, чуть сверху
  [180, 90],
];

const sectionOffsets = sections.map((section) => section.offsetTop);

const lastSectionIndex = sections.length - 1;

const interpolate = (start, end, progress) => start + (end - start) * progress;

const getScrollProgress = (scrollY) => {
  for (let i = 0; i < lastSectionIndex; i++) {
    if (scrollY >= sectionOffsets[i] && scrollY < sectionOffsets[i + 1]) {
      return (
        i +
        (scrollY - sectionOffsets[i]) /
          (sectionOffsets[i + 1] - sectionOffsets[i])
      );
    }
  }

  return lastSectionIndex;
};

window.addEventListener("scroll", () => {
  const scrollProgress = getScrollProgress(window.scrollY);
  const sectionIndex = Math.floor(scrollProgress);
  const sectionProgress = scrollProgress - sectionIndex;

  const currentShift = interpolate(
    shiftPositions[sectionIndex],
    shiftPositions[sectionIndex + 1] ?? shiftPositions[sectionIndex],
    sectionProgress
  );
  //   console.log(sectionIndex);
  //   console.log(sectionProgress);

  const currentOrbit = cameraOrbits[sectionIndex].map((val, i) =>
    interpolate(
      val,
      cameraOrbits[sectionIndex + 1]?.[i] ?? val,
      sectionProgress
    )
  );

  phoenixModel.style.transform = `translateX(${currentShift}%)`;
  phoenixModel.setAttribute(
    "camera-orbit",
    `${currentOrbit[0]}deg ${currentOrbit[1]}deg`
  );
});
