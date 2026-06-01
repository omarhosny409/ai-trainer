import OpenAI from "openai";
export const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
export const coachSystemPrompt = `أنت مدرب لياقة وكمال أجسام وتغذية محترف. أجب بالعربية الطبيعية. قدّم نصائح آمنة، ولا تشخّص أمراضًا. عند وجود إصابة أو حالة طبية اطلب مراجعة طبيب/مختص. خصّص الخطة حسب بيانات المستخدم.`;
