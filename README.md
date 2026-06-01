# AI Fitness Trainer SaaS

منصة SaaS عربية أولًا لمدرب لياقة وكمال أجسام بالذكاء الاصطناعي، مع لوحة تحكم، Onboarding، خطط تمرين وتغذية، دردشة AI، اشتراكات Stripe، وإدارة.

## التشغيل المحلي

```bash
cp .env.example .env
npm install
npm run db:push
npm run db:seed
npm run dev
```

افتح: `http://localhost:3000`

## المتطلبات

- Node.js 20+
- PostgreSQL
- حساب Clerk للمصادقة
- Stripe للمدفوعات
- OpenAI API

## أهم المسارات

- `/` الصفحة الرئيسية
- `/onboarding` إدخال بيانات المستخدم
- `/dashboard` لوحة المستخدم
- `/chat` المدرب الذكي
- `/calculator` حاسبات السعرات والماكروز
- `/admin` لوحة الإدارة

## ملاحظات إنتاجية

- لا تضع مفاتيح API داخل الكود.
- اربط Stripe webhook على `/api/stripe/webhook`.
- استخدم rate limiting خارجيًا مثل Upstash أو Cloudflare في الإنتاج.
