import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // هذا الجزء حيوي جداً: هو يخبر Next.js بالمسارات التي يجب أن يعمل عليها الميدلوير
  // ويستثني ملفات النظام والصور لضمان السرعة ومنع حلقات التوجيه
  matcher: [
    // المسار الرئيسي واللغات
    '/', 
    '/(ar|en)/:path*',
    
    // استثناء الملفات التقنية (العلامة ! تعني استثناء)
    '/((?!api|_next/static|_next/image|favicon.ico|apple-touch-icon.png|og-image.jpg|logo.png|.*\\..*).*)'
  ]
};