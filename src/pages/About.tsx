import { useState, useEffect } from "react";
import "react-medium-image-zoom/dist/styles.css";

import GitHubChart from "../components/Git";
const currentProjectIds = [
  "voxed",
  "illini-plan",
  "manim-video-agent",
  "illini-spots",
];

export default function About() {
  return(
    <GitHubChart username="samuelbonifacio015" />
  );
}