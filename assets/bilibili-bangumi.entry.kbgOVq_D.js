import{n as e,t}from"./loader.BES2edv1.js";function n(e){return Object.entries(e).filter(([,e])=>!!e).map(([e,t])=>`${e}=${t}`).join(`&`)}function r(e){if(!e.startsWith(`http`))return e;let t=new URL(e),n=t.pathname===`/`?``:t.pathname;return`${t.origin}${n}`}function i(e,t){let n;return function(...r){n||=setTimeout(()=>{n=null,e.apply(this,r)},t)}}var a={全部:`0`,想看:`1`,在看:`2`,看过:`3`,搁置:`4`,抛弃:`5`},o={全部:`0`,想玩:`1`,在玩:`2`,玩过:`3`,搁置:`4`,抛弃:`5`},s={全部:`0`,想读:`1`,在读:`2`,读过:`3`,搁置:`4`,抛弃:`5`},c={动画:a,游戏:o,书籍:s,音乐:s,三次元:a},l={动画:`1`,游戏:`2`,书籍:`3`,音乐:`4`,三次元:`5`},u={动画:[`全部`,`想看`,`在看`,`看过`,`搁置`,`抛弃`],游戏:[`全部`,`想玩`,`在玩`,`玩过`,`搁置`,`抛弃`],书籍:[`全部`,`想读`,`在读`,`读过`,`搁置`,`抛弃`],音乐:[`全部`,`想听`,`在听`,`听过`,`搁置`,`抛弃`],三次元:[`全部`,`想看`,`在看`,`看过`,`搁置`,`抛弃`]};async function d(e,t){let i=Object.assign(Object.assign({},t),{collectionType:a[t.collectionType]});return await(await fetch(`${r(e)}/bilibili?${n(i)}`)).json()}async function f(e,t){let{subjectType:i}=t,a=Object.assign(Object.assign({},t),{collectionType:c[i][t.collectionType],subjectType:l[t.subjectType]});return await(await fetch(`${r(e)}/bgm?${n(a)}`)).json()}async function p(e,t){let{subjectType:i}=t,a=Object.assign(Object.assign({},t),{collectionType:c[i][t.collectionType],subjectType:l[t.subjectType]});return await(await fetch(`${r(e)}/custom?${n(a)}`)).json()}function m({activeLabel:e,labels:n,containerState:r,onChange:i}){let a=t=>{e!==t&&i(t)};return t(`div`,{class:`bbc-tabs`},n.map(n=>t(`div`,{class:{"bbc-tab-item":!0,"bbc-tab-item-active":n===e,"bbc-md-tab-item":r!==`large`},key:n,onClick:()=>a(n)},n)))}function h(){return t(`div`,{class:`bbc-skeleton-container bbc-bangumi-item`},t(`div`,{class:`bbc-skeleton-avatar`}),t(`div`,{class:`bbc-skeleton-content bbc-bangumi-content`},t(`div`,{class:`bbc-skeleton-row`,style:{width:`30%`}}),t(`div`,{class:`bbc-skeleton-row`,style:{width:`60%`,height:`40px`}}),t(`div`,{class:`bbc-skeleton-row`,style:{width:`90%`,height:`32px`}})))}var g=({containerState:e,labels:n})=>{let r=[...n];return e===`middle`&&(r=r.slice(0,4)),e===`small`&&(r=r.slice(0,3)),t(`div`,{class:`bbc-bangumi-labels`},r.map(n=>t(`div`,{class:{"bbc-bangumi-label":!0,"bbc-md-label-text":e!==`large`}},t(`p`,{class:`bbc-bangumi-label-title`},n.label),n.value&&t(`p`,null,n.value))))},_=({list:e,loading:n,containerState:r})=>t(`div`,{class:`bbc-bangumi`},e.map(e=>t(`div`,null,n?t(h,null):t(`div`,{class:`bbc-bangumi-item`},t(`a`,{href:e.url,target:`_blank`,rel:`noreferrer`},t(`img`,{src:e.cover,alt:`cover`,loading:`lazy`,referrerpolicy:`no-referrer`})),t(`div`,{class:`bbc-bangumi-content`},t(`h3`,{class:`bbc-bangumi-title`},t(`a`,{href:e.url,target:`_blank`,rel:`noreferrer`,innerHTML:e.name?e.name:e.nameCN}),e.name&&t(`small`,{innerHTML:e.nameCN})),t(g,{containerState:r,labels:e.labels}),t(`p`,{class:`bbc-bangumi-summary`,innerHTML:e.summary}))))));function v({pageNumber:e,totalPages:n,onChange:r,onInputChange:i}){return t(`div`,{class:`bbc-pagination`},t(`a`,{class:`bbc-pagination-button`,onClick:()=>r(`head`)},`首页`),t(`a`,{class:`bbc-pagination-button`,onClick:()=>r(`prev`)},`上一页`),t(`span`,{class:`bbc-pagination-pagenum`},`${e} / ${n}`),t(`a`,{class:`bbc-pagination-button`,onClick:()=>r(`next`)},`下一页`),t(`a`,{class:`bbc-pagination-button`,onClick:()=>r(`tail`)},`尾页`),t(`div`,{class:`bbc-pagination-input`},t(`span`,null,`跳至`),t(`input`,{type:`text`,maxLength:4,onChange:i}),t(`span`,null,`页`)))}function y(){return t(`div`,{class:`bbc-empty`},t(`img`,{src:`https://s1.hdslb.com/bfs/static/webssr/article/empty.png`,alt:`empty`,referrerpolicy:`no-referrer`}))}function b({error:e}){return t(`div`,{class:`bbc-error`},t(`img`,{src:`https://s1.hdslb.com/bfs/static/jinkela/long/bitmap/error_01.png`,alt:`parse failed`,referrerpolicy:`no-referrer`}),t(`p`,null,`Σ(oﾟдﾟoﾉ) 发生了一些错误`),t(`p`,null,`message: ${e.message}`))}var x=`@layer bilibili-bangumi-component {
  :host {
    display: block;
    /* 基础文本颜色 */
    --bbc-text-base-color: #4c4948;
    /* 标签颜色 */
    --bbc-label-color: #FF9843;
    /* 下划线、背景之类的颜色 */
    --bbc-primary-color: #425aef;
  }

  * {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
  }

  .bbc-tabs {
    display: flex;
    gap: 8px;
  }

  .bbc-tab-item {
    padding: 4px 16px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: bold;
    color: var(--bbc-text-base-color);
    cursor: pointer;
  }

  .bbc-md-tab-item {
    padding: 4px 12px;
  }

  .bbc-tab-item:hover {
    background-color: var(--bbc-primary-color);
    color: white;
  }

  .bbc-tab-item-active {
    color: white;
    background-color: var(--bbc-primary-color);
  }

  .bbc-header-platform {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 16px;
  }

  .bbc-header-platform .divider {
    width: 3px;
    border-radius: 2px;
    height: 32px;
    background-color: var(--bbc-primary-color);
  }

  .bbc-bangumi:last-child {
    border-bottom: none;
  }

  .bbc-bangumi-item {
    display: flex;
    margin: 12px 0;
    gap: 16px;
    padding: 16px;
    border-bottom: 1px solid #ddd;
  }

  .bbc-bangumi-item img {
    border-radius: 8px;
    cursor: pointer;
    height: 140px;
    object-fit: cover;
    aspect-ratio: 3 / 4;
  }

  .bbc-bangumi-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .bbc-bangumi-title {
    margin: 0;
    margin-bottom: 8px;
  }

  .bbc-bangumi-title a {
    color: var(--bbc-text-base-color);
  }

  .bbc-bangumi-title a:hover {
    border-bottom: 2px solid var(--bbc-primary-color);
  }

  .bbc-bangumi-title small {
    margin-left: 8px;
    font-weight: normal;
    font-size: 14px;
    color: var(--bbc-text-base-color);
    height: 24px;
  }

  .bbc-bangumi-labels {
    color: var(--bbc-label-color);
    display: flex;
  }

  .bbc-bangumi-label {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px;
    height: 36px;
    font-size: 14px;
    border-right: 1px solid var(--bbc-label-color);
  }

  .bbc-bangumi-label:last-child {
    border-right: none;
  }

  .bbc-bangumi-label p {
    margin: 0;
    padding: 0 4px;
  }

  .bbc-bangumi-label:not(.bbc-bangumi-label > .bbc-bangumi-label-title) {
    justify-content: center;
  }

  .bbc-md-label-text {
    font-size: 12px;
  }

  .bbc-bangumi-summary {
    margin-bottom: 0;
    font-size: 12px;
    color: var(--bbc-text-base-color);

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .bbc-pagination {
    height: 40px;
    text-align: center;
    padding-right: 20px;
  }

  .bbc-pagination-button {
    border-radius: 4px;
    font-size: 14px;
    padding: 4px 8px;
    margin: 0 4px;
    color: #bbb;
    cursor: pointer;
  }

  .bbc-pagination-button:hover {
    background-color: var(--bbc-primary-color);
    color: white;
  }

  .bbc-pagination-pagenum {
    color: #bbb;
    font-size: 14px;
  }
  
  .bbc-pagination-input {
    display: inline-block;
    color: #bbb;
    font-size: 12px;
  }

  .bbc-pagination-input input {
    display: inline-block;
    margin: 0 8px;
    font-size: 12px;
    color: #bbb;
    width: 30px;
    height: 24px;
    line-height: 24px;
    border-radius: 4px;
    border: 1px solid #bbb;
    text-align: center;
    outline: none;
    transition: border .2s ease;
  }

  .bbc-skeleton-container {
    animation: skeleton-blink 1.2s ease-in-out infinite;
  }

  @keyframes skeleton-blink {
    50% {
      opacity: 0.6;
    }
  }

  .bbc-skeleton-avatar {
    height: 140px;
    border-radius: 12px;
    background-color: #f2f3f5;
    aspect-ratio: 3 / 4;
  }

  .bbc-skeleton-row {
    height: 24px;
    border-radius: 8px;
    background-color: #f2f3f5;
  }

  .bbc-empty {
    display: flex;
    padding: 40px 0;
    justify-content: center;
    align-items: center;
  }

  .bbc-empty img {
    height: 140px;
    object-fit: cover;
  }

  .bbc-error {
    margin: 20px 0;
    display: flex;
    gap: 12px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .bbc-error img {
    display: block;
    width: 260px;
  }

  .bbc-error p {
    margin: 0;
    color: var(--bbc-text-base-color);
    font-size: 18px;
  }
}`,S=class{constructor(t){e(this,t),this.platformLabels=[`Bilibili`,`Bangumi`],this.subjectLabels=[`动画`,`游戏`,`书籍`,`音乐`,`三次元`],this.fetchData=async()=>{try{this.loading=!0,this.error=null;let e,t={uid:this.bilibiliUid,collectionType:this.activeCollection,pageSize:this.pageSize,pageNumber:this.pageNumber};e=this.activePlatform===`Bilibili`?await d(this.api,t):this.activePlatform===`Bangumi`?await f(this.api,Object.assign(Object.assign({},t),{uid:this.bgmUid,subjectType:this.activeSubject})):await p(this.api,Object.assign(Object.assign({},t),{subjectType:this.activeSubject})),e.code===200?this.responseData=e.data:(this.error=e,this.responseData=null)}catch(e){this.error=e,this.responseData=null}this.loading=!1},this.handlePlatformChange=e=>{this.collectionLabels=e===`Bilibili`?[`全部`,`想看`,`在看`,`看过`]:u.动画,this.activePlatform=e,this.pageNumber=1,this.activeSubject=`动画`,this.activeCollection=`全部`,this.fetchData()},this.handleSubjectChange=e=>{this.collectionLabels=this.activePlatform===`Bilibili`?[`全部`,`想看`,`在看`,`看过`]:u[e],this.activeSubject=e,this.pageNumber=1,this.activeCollection=`全部`,this.fetchData()},this.handleCollectionChange=e=>{this.activeCollection=e,this.pageNumber=1,this.fetchData()},this.scrollToTop=()=>{document.documentElement.scrollTo({top:0,behavior:`smooth`})},this.handlePageChange=e=>{let{totalPages:t}=this.responseData;switch(e){case`head`:this.pageNumber=1;break;case`prev`:if(this.pageNumber===1)return;this.pageNumber--;break;case`next`:if(this.pageNumber===t)return;this.pageNumber++;break;case`tail`:this.pageNumber=t}this.scrollToTop(),this.fetchData()},this.handleInputChange=e=>{let t=Number.parseInt(e.target.value);if(Object.is(t,NaN))return;let{totalPages:n}=this.responseData;this.pageNumber=t<1?1:t>n?n:t,this.scrollToTop(),this.fetchData()},this.api=void 0,this.bilibiliUid=void 0,this.bgmUid=void 0,this.bilibiliEnabled=!0,this.bgmEnabled=!0,this.pageSize=15,this.customEnabled=!1,this.customLabel=`自定义`,this.loading=!1,this.error=void 0,this.pageNumber=1,this.responseData=void 0,this.activePlatform=`Bilibili`,this.activeSubject=`动画`,this.collectionLabels=[`全部`,`想看`,`在看`,`看过`],this.activeCollection=`全部`,this.containerRef=null,this.containerState=`large`}componentWillLoad(){let e=[...this.platformLabels];this.customEnabled&&e.push(this.customLabel);let t=[this.bilibiliEnabled,this.bgmEnabled,this.customEnabled];this.platformLabels=e.filter((e,n)=>t[n]),this.activePlatform=this.platformLabels[0],this.fetchData()}componentDidLoad(){let e=i(e=>{let t=`large`;e<=640&&(t=`middle`),e<=465&&(t=`small`),this.containerState=t},100).bind(this);new ResizeObserver(t=>{for(let n of t)e(n.contentRect.width)}).observe(this.containerRef)}render(){return t(`div`,{ref:e=>this.containerRef=e},t(`div`,{class:`bbc-header-platform`},t(m,{containerState:this.containerState,activeLabel:this.activePlatform,labels:this.platformLabels,onChange:this.handlePlatformChange}),this.activePlatform!==`Bilibili`&&t(`div`,{class:`divider`}),this.activePlatform!==`Bilibili`&&t(m,{containerState:this.containerState,activeLabel:this.activeSubject,labels:this.subjectLabels,onChange:this.handleSubjectChange})),t(`div`,null,t(m,{containerState:this.containerState,activeLabel:this.activeCollection,labels:this.collectionLabels,onChange:this.handleCollectionChange})),this.loading&&t(h,null),this.error&&t(b,{error:this.error}),this.responseData&&t(_,{containerState:this.containerState,loading:this.loading,list:this.responseData.list}),this.responseData&&this.responseData.total===0&&t(y,null),this.responseData&&t(v,{pageNumber:this.pageNumber,totalPages:this.responseData.totalPages,onChange:this.handlePageChange,onInputChange:this.handleInputChange}))}};S.style=x;export{S as bilibili_bangumi};