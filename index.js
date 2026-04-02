let cardSummary = document.querySelector(".card__summary");
let averageResult = document.querySelector(".card__result-average");

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
  let resultsDataHTML = ``;
  let totalScore = 0;
  for (let i = 0; i < resultsData.length; i++) {
    let category = resultsData[i].category;
    let icon = resultsData[i].icon;
    let score = resultsData[i].score;
    totalScore += score;
    resultsDataHTML += `<li class="card__data">
        <div class="card__data-category">
            <img src="${icon}" class="card__data-category-img">
            <p class="card__data-category-text">${category}</p>
        </div>
        <p class="card__data-numbers"><span class="card__data-score">${score} </span><span class="card__data-score-base"> / 100</span></p>
    </li>`;
  }
  let averageScore = Math.trunc(totalScore / resultsData.length);
  averageResult.innerText = averageScore;
  cardSummary.innerHTML = resultsDataHTML;
}
