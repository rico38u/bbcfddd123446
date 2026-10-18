# Black 1

موقع ثابت (HTML + CSS + JS) جاهز للنشر على GitHub Pages.

## النشر على GitHub Pages
1. أنشئ مستودعًا جديدًا على GitHub (مثلًا `black1`).
2. ارفع **محتويات** هذا المجلد كما هي (index.html و css و js و assets و .nojekyll).
3. من المستودع: Settings ← Pages ← Source: `Deploy from a branch` ← Branch: `main` / `(root)` ← Save.
4. بعد دقيقة يعمل الموقع على: `https://USERNAME.github.io/REPO/`

## الهيكل
- `index.html`: هيكل الصفحة فقط
- `css/`: ملفات التنسيق بترتيب التحميل (لا تغيّر الترقيم)
- `js/`: ملفات الجافاسكربت بترتيب التحميل (لا تغيّر الترقيم)
- `assets/`: الصور والفيديو

## ملاحظة
الحسابات والرسائل والمنشورات تُحفظ حاليًا في متصفح كل مستخدم (localStorage) ولا تُشارَك بين المستخدمين.
لمشاركتها بين الجميع يلزم خادم/قاعدة بيانات (مثل Supabase أو Firebase).
