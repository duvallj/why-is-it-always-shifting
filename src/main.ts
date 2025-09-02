import "./style.css";
import { setupAnalyzeButton } from "./analyzeButton.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <h1>Run Analysis</h1>
  <div class="card">
    <button id="analyze" type="button">again</button>
  </div>
`;

setupAnalyzeButton(document.querySelector<HTMLButtonElement>("#analyze")!);
