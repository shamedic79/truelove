// Blind-box character names cross-checked against TOYSEZ collection pages.
// Unknown/unverified slots intentionally remain as Piece N until confirmed.
const TRUELOVE_PIECE_NAMES={
"100-mr-bone-game-man-series":["NO.8","NO.16","NO.32","NO.128","Red Gragon","Blue Mach","Yellow Lightning (Secret 1/54)","Green Light (Secret 1/96)",null],
"100-mr-bone-halloween-theme-series":["Mummy","Demon","Death","Franken","Werewolf","Pumpkin Head","Dracula (Secret 1/48)","Hollow Man (Secret 1/96)"],
"100-mr-bone-bone-buddies":["Tinker","Cubby","Knighty","Whiskers","Frosty","Howdy","Buzz (Secret 1/96)"],
"70-mini-mini-series-generation-times-travel-series":["Stone Age","Bronze Age","Roman Age","Medieval Age","Renaissance Age","Steam Age","Stom Age","Information Age","Ice Age","Warfare Age (Secret 1/108)","Waste Soil Age (Secret 1/216)"],
"70-jr-junior-first-day-blind-box-series":["MR.BONE","CHEF","POLICE","WORKER","ZOMBIES-C","Superstar 1 (Secret 1/108)","Superstar 2 (Secret 1/108)","Mr.Beel (Secret 1/216)",null,null,null,null]
};
function applyTrueLovePieceNames(){
 document.querySelectorAll('.card[data-id]').forEach(card=>{
  const names=TRUELOVE_PIECE_NAMES[card.dataset.id]; if(!names)return;
  card.querySelectorAll('.subitem').forEach((row,i)=>{const label=row.querySelector('label');if(label&&names[i])label.textContent=names[i]});
 });
}
const _tlObserver=new MutationObserver(applyTrueLovePieceNames);
const _tlCollection=document.querySelector('#collection');if(_tlCollection)_tlObserver.observe(_tlCollection,{childList:true,subtree:true});
applyTrueLovePieceNames();