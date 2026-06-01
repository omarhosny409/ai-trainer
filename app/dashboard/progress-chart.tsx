"use client";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
export default function DashboardChart({ data }: { data: any[] }) { return <div className="h-80"><ResponsiveContainer width="100%" height="100%"><LineChart data={data}><CartesianGrid strokeDasharray="3 3" opacity={0.2}/><XAxis dataKey="date"/><YAxis/><Tooltip/><Line type="monotone" dataKey="weight" strokeWidth={3}/></LineChart></ResponsiveContainer></div>; }
