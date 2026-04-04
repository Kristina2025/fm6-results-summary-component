const cardSummary = expect(".card__summary");
const averageResult = expect(".card__result-average");

async function getResultsData() {
  try {
    const response = await fetch("./data.json");
    if (response.ok) {
      const data = await response.json();
      renderResults(data);
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    console.log("Error", error);
  }
}

getResultsData();

function renderResults(resultsData) {
  if (resultsData.length === 0) {
    cardSummary.innerHTML = `<li class="error__no-results-data">No data available.</li>`;
    averageResult.innerText = "N/A";
    return;
  }
  let resultsDataHTML = ``;
  let totalScore = 0;
  for (let i = 0; i < resultsData.length; i++) {
    let { category, icon, score } = resultsData[i];
    totalScore += score;
    resultsDataHTML += `<li class="card__data">
        <div class="card__data-category">
            <img alt="" src="${icon}" class="card__data-category-img">
            <p class="card__data-category-text">${category}</p>
        </div>
        <p class="card__data-numbers"><span class="card__data-score">${score} </span><span class="card__data-score-base"> / 100</span></p>
    </li>`;
  }
  cardSummary.innerHTML = resultsDataHTML;
  averageResult.innerText = Math.trunc(totalScore / resultsData.length);
}

function expect(selector) {
  const el = document.querySelector(selector);
  if (!el) throw new Error(`Expected element "${selector}" not found.`);
  return el;
}
