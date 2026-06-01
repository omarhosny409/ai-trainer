"use client";
import { useMemo, useState } from "react";
import { Nav } from "@/components/Nav";
import { bmr, tdee, macros } from "@/lib/fitness";
export default function CalculatorPage(){ const [v,setV]=useState({gender:"male",weight:80,height:180,age:28,activity:1.55,goal:"تضخيم"}); const result=useMemo(()=>{const b=bmr(v as any); const t=tdee(b,Number(v.activity)); const c=v.goal.includes("تنشيف")?t-400:t+250; return {b,t,...macros(c,Number(v.weight),v.goal)}},[v]);
return <main><Nav/><section className="mx-auto max-w-5xl px-4 py-10"><h1 className="text-4xl font-black">حاسبة السعرات والماكروز</h1><div className="mt-8 grid gap-6 md:grid-cols-2"><div className="card grid gap-4 p-6">{Object.entries(v).map(([k,val])=><label key={k} className="text-white/70">{k}<input className="input mt-2" value={val} onChange={e=>setV({...v,[k]: isNaN(Number(e.target.value))?e.target.value:Number(e.target.value)})}/></label>)}</div><div className="card p-6 text-2xl leading-loose"><p>BMR: {result.b}</p><p>TDEE: {result.t}</p><p>السعرات: {result.calories}</p><p>بروتين: {result.protein}g</p><p>كارب: {result.carbs}g</p><p>دهون: {result.fats}g</p></div></div></section></main> }
