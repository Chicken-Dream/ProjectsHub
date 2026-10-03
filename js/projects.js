/*
 * Project list for the Dream Team Hub home page.
 *
 * To add a project, append an object to this array:
 *   title       – shown at the bottom of the card
 *   description – shown when hovering over the card (keep it to 1–3 sentences)
 *   subdomain   – the card links to https://<subdomain>.dreamteamhub.ca
 *                 (use `url` instead to link somewhere else entirely)
 *   image       – path to an image in images/projects/ (a square image works best)
 *   featured    – optional; true makes the card span the full width at the top
 */
window.PROJECTS = [
  {
    title: "Bomberman",
    description: "place bombs and survive",
    subdomain: "bomberman",
    image: "images/projects/bomberman_picture.png",
    author: "Sean",
    featured: true,
  },
  {
    title: "Can Your Pet",
    description: "take care of your pet chicken",
    subdomain: "canyourpet",
    image: "images/projects/can-your-pet.png",
    author: "Jordan",
  },
  {
    title: "1v1 Tanks",
    description: "1 verus 1 tank game",
    subdomain: "tanks",
    image: "images/projects/tankGameImage.png",
    author: "Sean",
  },
  {
    title: "Turtle",
    description: "A sample project. Replace this with a short description of what Turtle does.",
    subdomain: "turtle",
    image: "images/projects/turtle.svg",
    author: "Sean",
  },
  {
    title: "Tsumego",
    description: "play japanese go with your friends/enemies",
    subdomain: "tsumego",
    image: "images/projects/tsumego.png",
    author: "Jordan",
  },
];
