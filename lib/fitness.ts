export type Gender = "male" | "female";
export function bmr({ gender, weight, height, age }: { gender: Gender; weight: number; height: number; age: number }) {
  const base = 10 * weight + 6.25 * height - 5 * age;
  return Math.round(gender === "male" ? base + 5 : base - 161);
}
export function tdee(bmrValue: number, activity = 1.55) { return Math.round(bmrValue * activity); }
export function macros(calories: number, weight: number, goal: string) {
  const protein = Math.round(weight * (goal.includes("Fat") || goal.includes("تنشيف") ? 2.2 : 2));
  const fats = Math.round((calories * 0.25) / 9);
  const carbs = Math.round((calories - protein * 4 - fats * 9) / 4);
  return { calories, protein, carbs, fats };
}
