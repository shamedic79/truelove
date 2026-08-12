// Wishlist support kept separate from collection ownership and True Love scoring.
const WISHLIST_KEY="mrBoneTrueLoveWishlist_v1";
let wishlistState=JSON.parse(localStorage.getItem(WISHLIST_KEY)||"{}");
function wishlistKey(item,n){return `${item.id}::${n}`}
function isWishlisted(item,n){return !!wishlistState[wishlistKey(item,n)]}
function setWishlisted(item,n,value){
  const key=wishlistKey(item,n);
  if(value) wishlistState[key]=true; else delete wishlistState[key];
  localStorage.setItem(WISHLIST_KEY,JSON.stringify(wishlistState));
  render();
}
function wishlistedPieces(item){let total=0;for(let n=1;n<=item.count;n++)if(isWishlisted(item,n))total++;return total}
window.setWishlistedById=(id,n,value)=>{const item=ITEMS.find(x=>x.id===id);if(item)setWishlisted(item,n,value)};

const _baseCard=card;
card=function(item){
  let html=_baseCard(item);
  if(item.count>1){
    let n=0;
    html=html.replace(/<div class="subitem">/g,match=>{
      n++;
      return `${match}<label class="wish-row" title="Add this piece to your wishlist"><input type="checkbox" ${isWishlisted(item,n)?"checked":""} onchange="setWishlistedById('${item.id}',${n},this.checked)"> Wishlist</label>`;
    });
  }else{
    const wish=`<label class="wish-row"><input type="checkbox" ${isWishlisted(item,1)?"checked":""} onchange="setWishlistedById('${item.id}',1,this.checked)"> Wishlist</label>`;
    html=html.replace('</div></article>',`${wish}</div></article>`);
  }
  return html;
};

const _baseItemVisible=itemVisible;
itemVisible=function(item){
  if(activeFilter==="wishlist"){
    const saved=activeFilter; activeFilter="all";
    const baseVisible=_baseItemVisible(item);
    activeFilter=saved;
    return baseVisible&&wishlistedPieces(item)>0;
  }
  return _baseItemVisible(item);
};

render();
