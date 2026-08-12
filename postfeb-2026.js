// Confirmed by collector source: Limited releases after February 2026.
const POST_FEB_2026_IDS = new Set([
  "200-limited-mr-bone-midnight-musashi",
  "200-limited-mr-bone-shadow-ghoul",
  "200-limited-mr-bone-oni-musashi",
  "200-limited-mr-bone-the-aeon-watch",
  "200-limited-mr-bone-zhong-kui",
  "200-limited-mr-bone-liberty-torch",
  "200-limited-mr-bone-iori-yagami-200",
  "200-limited-mr-bone-iori-yagami-200-duplicate-source-entry",
  "200-limited-mr-bone-haohmaru-200",
  "200-limited-mr-bone-ukyo-tachibana-200",
  "babybone-limited-ba-fang-lai-cai",
  "babybone-limited-thai-legend-exclusive-chroma-edition",
  "400-limited-golden-dragon-rider-400-dragon",
  "100-limited-mr-bone-2026-football-star-limited-gift-box"
]);

ITEMS.forEach(item => {
  if (POST_FEB_2026_IDS.has(item.id)) item.postFeb2026 = true;
});

// The Chroma Edition record contains eight separately trackable pieces; each owned
// piece counts toward the post-February Limited Edition minimum.
function postFebOwnedCount(){
  return ITEMS.filter(item => item.postFeb2026).reduce((n,item) => n + ownedPieces(item), 0);
}

qualification = function(){
  const score=trueLoveScore(),
    b100=countCat(["blind-100"]),
    mini=countCat(["blind-mini","blind-jr"]),
    baby=countCat(["blind-babybone"]),
    plush=countCat(["plush"]),
    l100=ITEMS.filter(e=>e.category==="limited-100"&&designOwned(e)).length,
    l200=ITEMS.filter(e=>e.category==="limited-200"&&designOwned(e)).length,
    large=ITEMS.filter(e=>e.category==="limited-300"||e.category==="limited-400").reduce((n,e)=>n+ownedPieces(e),0),
    postFeb=postFebOwnedCount();
  return {score,b100,mini,baby,plush,l100,l200,large,postFeb,
    structural:score>=450&&b100>=2&&mini>=2&&baby>=2&&plush>=2&&l100>=10&&l200>=10&&large>=2&&postFeb>=4};
};

renderRules = function(q){
  markRule("#ruleScore",q.score>=450,`${q.score.toFixed(q.score%1?1:0)} / 450`);
  markRule("#rule100Blind",q.b100>=2,`${q.b100} / 2`);
  markRule("#ruleMini",q.mini>=2,`${q.mini} / 2`);
  markRule("#ruleBaby",q.baby>=2,`${q.baby} / 2`);
  markRule("#rulePlush",q.plush>=2,`${q.plush} / 2`);
  markRule("#ruleL100",q.l100>=10,`${q.l100} / 10`);
  markRule("#ruleL200",q.l200>=10,`${q.l200} / 10`);
  markRule("#ruleLarge",q.large>=2,`${q.large} / 2`);
  markRule("#rulePostFeb",q.postFeb>=4,`${q.postFeb} / 4`);
};

renderDashboard = function(){
  const e=qualification(),t=collectionPoints(),i=blindPointsRaw();
  document.querySelector("#trueLoveScore").textContent=e.score.toFixed(e.score%1?1:0);
  document.querySelector("#collectionScore").textContent=t.toFixed(t%1?1:0);
  document.querySelector("#ownedCount").textContent=ITEMS.reduce((n,x)=>n+ownedPieces(x),0);
  document.querySelector("#blindScore").textContent=`${Math.min(200,i).toFixed(i%1?1:0)} / 200`;
  document.querySelector("#limited100").textContent=`${e.l100} / 10`;
  document.querySelector("#limited200").textContent=`${e.l200} / 10`;
  document.querySelector("#largeLimited").textContent=`${e.large} / 2`;
  document.querySelector("#progressBar").style.width=Math.min(100,e.score/450*100)+"%";
  document.querySelector("#qualificationTitle").textContent=e.structural?"Qualification requirements met*":"In progress";
  document.querySelector("#qualificationNote").textContent=e.structural
    ?"All tracked 2026 score and category requirements are met. *Official MR.BONE verification still determines eligibility."
    :`450 points plus all category minimums are required, including 4 Limited Editions released after February 2026 (${e.postFeb}/4 currently owned).`;
  renderRules(e);
};

// Re-render once the confirmed release data and updated qualification logic are loaded.
render();
