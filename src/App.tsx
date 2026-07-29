import { useEffect, useRef, useState } from "react";
import { ArrowRight, Boxes, ChartNoAxesCombined, Check, ChevronLeft, CircleGauge, Download, FlaskConical, Layers3, PackageCheck, Play, Plus, Radar, ScanLine, Share2, Sparkles, Upload, UsersRound, X } from "lucide-react";

type Stage = 0 | 1 | 2 | 3 | 4;
type Sku = { id:string; color:string; hex:string; type:string; image?:string };
const steps = [["HYPOTHESIS","Choose the decision"],["TWINS","Define the market"],["STRESS TEST","Run counterfactuals"],["CONFLICTS","Detect failure"],["REPORT","Approve or reject"]];
const baseSkus:Sku[] = [
  {id:"sage",color:"ION SAGE",hex:"#c9ff32",type:"ASYMMETRIC MINI"},{id:"black",color:"VOID BLACK",hex:"#202027",type:"ASYMMETRIC MINI"},
  {id:"sand",color:"CHROME SAND",hex:"#beb8a8",type:"ASYMMETRIC MINI"},{id:"violet",color:"UV VIOLET",hex:"#7c5cff",type:"CARGO SKIRT"},
  {id:"silver",color:"LIQUID SILVER",hex:"#dce5e8",type:"SCULPTURAL DRESS"},{id:"coral",color:"SIGNAL CORAL",hex:"#ff615a",type:"SCULPTURAL DRESS"},
];
const segments = [
  {city:"SEOUL",name:"Trend Accelerators",tone:"Neutral / cool",trend:"Tech-romantic",n:118,signal:94},
  {city:"TOKYO",name:"Subculture Mixers",tone:"Broad spectrum",trend:"Neo-Y2K",n:96,signal:87},
  {city:"TAIPEI",name:"Social Shoppers",tone:"Warm / neutral",trend:"Cyber-soft",n:86,signal:91},
];
const scores = [[91,79,48,84,76,68],[86,82,43,94,80,71],[96,74,52,81,88,77]];
const nav = (setStage:(s:Stage)=>void, next:Stage, back?:Stage, label="CONTINUE", disabled=false) =>
  <div className="bottom">{back!==undefined&&<button className="back" onClick={()=>setStage(back)}><ChevronLeft/> BACK</button>}<span><i/>LIVE EXPERIMENT / TT-0729</span><button disabled={disabled} className="primary" onClick={()=>setStage(next)}>{label}<ArrowRight/></button></div>;

function Brand(){return <div className="brand"><b>T//T</b><span><strong>TREND<em>TWIN</em></strong><small>AI FASHION DECISION STRESS TEST</small></span></div>}
function Heading({eyebrow,title,copy,side}:{eyebrow:string;title:React.ReactNode;copy:string;side?:React.ReactNode}){return <div className="heading"><div><p>{eyebrow}</p><h1>{title}</h1><span>{copy}</span></div>{side}</div>}

function ProofOpening({close}:{close:()=>void}){
  return <section className="proof-opening">
    <header><Brand/><span>POWERED BY <b>YOUCAM APPAREL VTO</b></span><button onClick={close}>SKIP INTRO <X/></button></header>
    <div className="proof-stage">
      <img src="/trendtwin-simulation-wall.png" alt="Virtual customer twins generated for market simulation"/>
      <div className="proof-grid">{Array.from({length:12},(_,i)=><i key={i} style={{"--i":i} as React.CSSProperties}/>)}</div>
      <div className="proof-copy one"><small>01 / COUNTERFACTUAL VTO</small><h1>What if<br/><em>Sand stays?</em></h1><span>YouCam Apparel VTO · 1,800 market futures</span></div>
      <div className="proof-copy two"><small>02 / FAILURE DETECTED</small><h1>Deadstock risk<br/><em>+18%.</em></h1><span>Same collection · one changed decision</span></div>
      <div className="proof-copy three"><small>03 / DECISION REPORT</small><h1>Reject Sand.<br/><em>Approve Taipei.</em></h1><span>Failure found before manufacturing</span></div>
      <div className="city-pulse"><b>SEOUL <i>+22%</i></b><b>TOKYO <i>+18%</i></b><b>TAIPEI <i>+25%</i></b></div>
    </div>
    <footer><span><i/>YOUCAM CLOTHES V3 / COUNTERFACTUAL EXPERIMENT</span><button className="primary" onClick={close}>ENTER STRESS TEST <ArrowRight/></button></footer>
  </section>
}

function Campaign({setStage}:{setStage:(s:Stage)=>void}){
  const [skus,setSkus]=useState(baseSkus); const ref=useRef<HTMLInputElement>(null);
  const [hypothesis,setHypothesis]=useState(0);
  const hypotheses=["WHAT IF SAND STAYS?","WHAT IF SEOUL LAUNCHES FIRST?","WHAT IF NEO-Y2K REPLACES MINIMAL?","WHAT IF SAGE IS REDUCED 20%?"];
  const add=(files?:FileList|null)=>{if(!files)return;setSkus(v=>[...v,...Array.from(files).slice(0,3).map((f,i)=>({id:`u${Date.now()}${i}`,color:f.name.split(".")[0].toUpperCase(),hex:["#c9ff32","#7c5cff","#ff615a"][i],type:"UPLOADED SAMPLE",image:URL.createObjectURL(f)}))])};
  return <><Heading eyebrow="01 / DECISION HYPOTHESIS" title={<>Choose the decision<br/><em>you cannot afford to get wrong.</em></>} copy="Upload the collection, then change one assumption. TrendTwin compares the baseline against that counterfactual."/>
    <div className="hypothesis-bar"><span>STRESS TEST</span>{hypotheses.map((h,i)=><button className={hypothesis===i?"active":""} onClick={()=>setHypothesis(i)} key={h}><small>0{i+1}</small>{h}</button>)}</div>
    <div className="campaign">
      <button className="drop" onClick={()=>ref.current?.click()}><input ref={ref} hidden multiple type="file" accept="image/png,image/jpeg" onChange={e=>add(e.target.files)}/><span className="orbit"><Upload/><i/><i/><i/></span><b>DROP PRODUCT SAMPLES</b><small>Flat-lay, ghost mannequin, or model image</small><em><Plus/> ADD COLORWAYS</em></button>
      <div className="sku-board"><header><span>SS27 / SIGNAL DROP</span><b>{skus.length} SKU VARIANTS</b></header><div>{skus.map((s,i)=><article key={s.id}><button onClick={()=>setSkus(v=>v.filter(x=>x.id!==s.id))}><X/></button><figure style={{"--sku":s.hex} as React.CSSProperties}>{s.image?<img src={s.image}/>:<i className={`shape s${i%3}`}/>}</figure><small>SKU 0{i+1}</small><b>{s.color}</b><span>{s.type}</span></article>)}</div></div>
    </div>{nav(setStage,1,undefined,"BUILD CUSTOMER TWINS")}</>;
}

function Twins({setStage}:{setStage:(s:Stage)=>void}){
  return <><Heading eyebrow="02 / AUDIENCE SYNTHESIS" title={<>Build the market<br/><em>you want to test.</em></>} copy="Culturally specific customer twins replace the generic average shopper." side={<div className="count"><UsersRound/><b>300</b><span>VIRTUAL<br/>SHOPPERS</span></div>}/>
    <div className="twins"><div className="twin-wall"><img src="/trendtwin-simulation-wall.png" alt="East Asian virtual shoppers in experimental street fashion"/><i className="scanner"/><label className="tag a">BODY DIVERSITY / BALANCED</label><label className="tag b">SKIN TONE COVERAGE / 92%</label><label className="tag c">TREND RANGE / 96%</label></div>
      <div className="segments"><p>ACTIVE MARKET CELLS</p>{segments.map((s,i)=><article key={s.city}><span>0{i+1}</span><div><b>{s.city}</b><strong>{s.name}</strong><small>{s.n} twins · {s.tone}</small><em>{s.trend}</em></div><label>{s.signal}%<small>SIGNAL</small></label></article>)}
        <div className="coverage">{["BODY SHAPE 88%","SKIN TONE 92%","TREND RANGE 96%"].map(x=><div key={x}><span>{x}</span><i><b/></i></div>)}</div></div>
    </div>{nav(setStage,2,0,"RUN 1,800 VIRTUAL TRY-ONS")}</>;
}

function Simulation({setStage}:{setStage:(s:Stage)=>void}){
  const [p,setP]=useState(0);useEffect(()=>{const t=setInterval(()=>setP(v=>v>=100?100:v+2),50);return()=>clearInterval(t)},[]);
  return <><Heading eyebrow="03 / COUNTERFACTUAL VTO STRESS TEST" title={<>Two decisions enter.<br/><em>One fails before launch.</em></>} copy="YouCam Apparel VTO supplies the visual evidence while TrendTwin changes one decision at a time." side={<div className="count"><CircleGauge/><b>{p}%</b><span>{p<100?"STRESS TESTING":"COMPLETE"}</span></div>}/>
    <div className="scenario-ribbon"><article><small>CONTROL / A0</small><b>SAND REMOVED</b><span>Baseline plan</span></article><i>VS</i><article className="danger"><small>COUNTERFACTUAL / A1</small><b>SAND STAYS</b><span>Decision under test</span></article><strong>1 VARIABLE CHANGED</strong></div>
    <div className="simulation"><div className="sim-grid">{Array.from({length:24},(_,i)=>{const seg=segments[i%3];const affinity=61+(i*13)%38;return <article key={i} className={i%7===0?"hot":""} style={{"--delay":`${i*35}ms`} as React.CSSProperties}><img src="/trendtwin-simulation-wall.png" style={{objectPosition:`${(i%6)*20}% ${i%2?"100%":"0%"}`}}/><header><span>{seg.city}</span><b>TT-{String(i+1).padStart(3,"0")}</b></header><div className="cell-data"><span>SKIN <b>{i%2?"W-N":"N-C"}</b></span><span>TREND <b>{i%3===0?"TR":"Y2K"}</b></span><span>CVR <b>+{Math.round((affinity-55)*.6)}%</b></span><span>RETURN <b>{Math.max(6,27-Math.round(affinity/5))}%</b></span></div></article>})}</div>
      <aside className="sim-rail"><div><ScanLine/><span><b>VTO TASKS</b><strong>{Math.round(p*18).toLocaleString()} / 1,800</strong></span></div><div><Layers3/><span><b>LIVE CLUSTER</b><strong>WARM TONE × SAGE</strong></span></div><div><Radar/><span><b>TREND OUTLIER</b><strong>NEO-Y2K × TOKYO</strong></span></div><section>{["Generating garment masks","Preserving identity & pose","Reading skin-tone affinity","Clustering city signals"].map((x,i)=><span className={p>i*22?"done":""} key={x}><i/>{x}</span>)}</section></aside>
    </div>{nav(setStage,3,1,"INSPECT FAILURE",p<100)}</>;
}

function Signals({setStage}:{setStage:(s:Stage)=>void}){
  const [metric,setMetric]=useState<"conversion"|"return">("conversion");
  return <><Heading eyebrow="04 / DECISION CONFLICT MAP" title={<>Find the failure<br/><em>hidden inside the plan.</em></>} copy="City × skin tone × trend × SKU cells reveal where the counterfactual breaks." side={<div className="toggle"><button className={metric==="conversion"?"active":""} onClick={()=>setMetric("conversion")}>CONVERSION</button><button className={metric==="return"?"active":""} onClick={()=>setMetric("return")}>VISUAL RETURN RISK</button></div>}/>
    <div className="signals"><div className="matrix"><header><span/><b>SAGE</b><b>BLACK</b><b>SAND</b><b>VIOLET</b><b>SILVER</b><b>CORAL</b></header>{segments.map((s,r)=><section key={s.city}><label><b>{s.city}</b><span>{s.tone}</span><em>{s.trend}</em></label>{scores[r].map((v,c)=>{const n=metric==="conversion"?v:112-v;return <button key={c} style={{"--heat":`${n}%`} as React.CSSProperties}><strong>{metric==="conversion"?`+${Math.round((v-60)*.7)}%`:`${n}%`}</strong><small>{v>=90?"SURGE":v<55?"DROP":"STABLE"}</small></button>})}</section>)}</div>
      <aside className="signal-notes"><article><p>DECISION B / LOW CONFLICT</p><h2>Taipei-first<br/>survives the test.</h2><b>+9<small>%</small></b><span>Conversion lift holds across warm-neutral and cyber-soft cells</span><ul><li>Campaign efficiency +12%</li><li>Visual return risk −7%</li><li>High confidence across segments</li></ul><em><Check/>APPROVE TAIPEI FIRST</em></article><article className="alert"><p>FAILURE DETECTED / DECISION A</p><h2>Sand has no<br/>defensible market.</h2><b>+18<small>%</small></b><span>Deadstock exposure rises in every launch city</span><em><X/>REJECT: SAND STAYS</em></article></aside>
    </div>{nav(setStage,4,2,"ISSUE DECISION REPORT")}</>;
}

function Decision({setStage}:{setStage:(s:Stage)=>void}){
  const [closing,setClosing]=useState(false);
  const decisions=[["A","SAND STAYS","Deadstock +18% · Campaign efficiency −12%","REJECT"],["B","TAIPEI FIRST","Conversion +9% · Visual return risk −7%","APPROVE"],["C","SAGE +18%","Deadstock −31% · Campaign ROI +18%","APPROVE"]];
  return <><Heading eyebrow="05 / DECISION REPORT" title={<>The decision failed.<br/><em>Before production.</em></>} copy="A controlled counterfactual report based on sampled YouCam VTO evidence and simulated market responses." side={<div className="confidence"><b>94%</b><span>DECISION<br/>CONFIDENCE</span></div>}/>
    <div className="decision"><article className="verdict failure"><p>FAILURE DETECTED / DECISION A</p><span className="reject-stamp">REJECT</span><h2 className="failure-title">SAND<br/>STAYS</h2><dl><div><dt>DEADSTOCK RISK</dt><dd>+18%</dd></div><div><dt>CAMPAIGN EFFICIENCY</dt><dd>−12%</dd></div><div><dt>VISUAL RETURN RISK</dt><dd>+11%</dd></div></dl><blockquote>“Sand creates the highest visual return risk and no city-specific upside.”</blockquote><small>DECISION CHANGED BEFORE MANUFACTURING</small></article>
      <section className="buy-plan"><article><p>COUNTERFACTUAL OUTCOMES / ONE VARIABLE AT A TIME</p><div className="decision-list">{decisions.map(x=><div className={x[3]==="REJECT"?"rejected":""} key={x[0]}><small>DECISION {x[0]}</small><b>{x[1]}</b><span>{x[2]}</span><strong>{x[3]}</strong></div>)}</div></article>
        <div className="impact">{([[ChartNoAxesCombined,"CONVERSION","+9%"],[PackageCheck,"VISUAL RETURN RISK","−7%"],[Boxes,"DEADSTOCK","−31%"],[FlaskConical,"VTO EVIDENCE","1,800"]] as const).map(([Icon,label,value])=><article key={label}><Icon/><span><small>{label}</small><b>{value}</b></span></article>)}</div>
        <article className="position"><p>APPROVED ACTIONS / SS27</p><div><b>01</b><span>Move 18% of the production budget from Sand to Sage.</span><strong>APPROVE</strong></div><div><b>02</b><span>Launch Taipei first with the cyber-soft Sage campaign.</span><strong>APPROVE</strong></div><div><b>03</b><span>Stop Sand before physical sampling and manufacturing.</span><strong className="risk">REJECT</strong></div></article></section>
    </div><section className="operating-loop stress-report"><header><div><p>DECISION STRESS TEST</p><h2>One simulation prevented one expensive mistake.</h2></div><span><i/>3 COUNTERFACTUALS RESOLVED</span></header><div className="today">{decisions.map(x=><article className={x[3]==="REJECT"?"rejected":""} key={x[0]}><small>{x[0]}</small><b>{x[1]}</b><span>{x[2]}</span><strong>{x[3]}</strong></article>)}</div></section><div className="actions"><button className="back" onClick={()=>setStage(3)}><ChevronLeft/> BACK TO CONFLICTS</button><button><Download/> EXPORT DECISION REPORT</button><button className="primary" onClick={()=>setClosing(true)}><Play/> PRESENT VERDICT</button></div>{closing&&<section className="closing-card closing-reject"><button onClick={()=>setClosing(false)}><X/></button><div><Brand/><p>FAILURE DETECTED / BEFORE LAUNCH</p><h2>REJECT SAND</h2><h1><span><X/>Sand fails before launch.</span><span><Check/>Approve Taipei first.</span><span><Check/>Move 18% to Sage.</span></h1><blockquote>“One simulation prevented one expensive mistake.”</blockquote><small>DECISION CHANGED BEFORE MANUFACTURING</small></div></section>}</>;
}

export default function App(){
  const [stage,setStage]=useState<Stage>(0);
  const [intro,setIntro]=useState(true);
  return <>{intro&&<ProofOpening close={()=>setIntro(false)}/>}<main className="shell"><header><Brand/><div className="live"><i/>LIVE SIMULATION <b>TT-0729</b></div><button><Share2/></button></header><aside><p>EXPERIMENT FLOW</p>{steps.map((x,i)=><button className={stage===i?"active":stage>i?"done":""} onClick={()=>setStage(i as Stage)} key={x[0]}><span>{stage>i?<Check/>:`0${i+1}`}</span><label><b>{x[0]}</b><small>{x[1]}</small></label></button>)}<div className="api"><Sparkles/><b>YOUCAM ENGINE</b><small>APPAREL VTO / CONNECTED</small></div></aside><section className="workspace">{stage===0?<Campaign setStage={setStage}/>:stage===1?<Twins setStage={setStage}/>:stage===2?<Simulation setStage={setStage}/>:stage===3?<Signals setStage={setStage}/>:<Decision setStage={setStage}/>}</section></main></>
}
