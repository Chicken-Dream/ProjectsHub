/*
 * Project list for the Dream Team Hub home page.
 *
 * To add a project, append an object to this array:
 *   title       – shown at the bottom of the card
 *   description – shown when hovering over the card (keep it to 1–3 sentences)
 *   subdomain   – the card links to https://<subdomain>.dreamteamhub.ca
 *                 (use `url` instead to link somewhere else entirely)
 *   image       – path to an image in images/projects/ (a 16:10 image works best)
 */
window.PROJECTS = [
  {
    title: "Turtle",
    description: "A sample project. Replace this with a short description of what Turtle does.",
    subdomain: "turtle",
    image: "images/projects/turtle.svg",
    author: "Sean",
  },
  {
    title: "1v1 Tanks",
    description: "1 verus 1 tank game",
    subdomain: "tanks",
    image: "images/projects/tankGameImage.png",
    author: "Sean",
  },
  {
    title: "Project Two",
    description: "Another placeholder project. Edit js/projects.js to change or remove it.",
    subdomain: "project-two",
    image: "images/projects/placeholder.svg",
    author: "N/A",
  },
  {
    title: "Project Three",
    description: "Cards without a working image fall back to a coloured background.",
    subdomain: "project-three",
    image: "",
    author: "N/A",
  },
];
