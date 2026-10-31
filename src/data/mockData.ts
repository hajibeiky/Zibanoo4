import { Salon, BookingRequest } from '../types';

export const INITIAL_SALONS: Salon[] = [
  {
    id: 'salon-1',
    name: 'سالن زیبایی ماهور',
    gender: 'women',
    city: 'یزد',
    district: 'صفائیه',
    address: 'یزد، صفائیه، خیابان ملاصدرا، نبش کوچه یاس ۱۲',
    phone: '۰۳۵۳۸۲۴۵۰۹۰',
    rating: 4.9,
    reviewsCount: 38,
    priceLevel: 'لوکس',
    priceRangeText: '۴۵۰,۰۰۰ الی ۲,۸۰۰,۰۰۰ تومان',
    hasHomeService: true,
    homeServiceFee: 150000,
    imageUrl: '/src/assets/images/women_beauty_services_1793464702979.jpg',
    galleryImages: [
      '/src/assets/images/women_beauty_services_1793464702979.jpg',
      '/src/assets/images/hero_salon_luxury_1793464702288.jpg',
      '/src/assets/images/home_service_beauty_1793464703481.jpg'
    ],
    description: 'مرکز تخصصی رنگ، لایت‌های ترکیبی و احیای نانوپروتئین در یزد. دارای لاین اختصاصی خدمات در منزل ویژه سالمندان، مادران باردار و مراسم.',
    workingHours: 'همه روزه از ساعت ۹:۰۰ الی ۲۱:۰۰ (پنجشنبه‌ها تا ۱۹:۰۰)',
    featuredServices: ['رنگ و لایت بالیاژ', 'کراتین و احیای نانو', 'میکاپ و شینیون مجلسی', 'خدمات در منزل'],
    services: [
      {
        id: 'srv-101',
        name: 'کوتاهی ژورنالی و فرم‌دهی مو',
        category: 'کوتاهی و استایل',
        price: 380000,
        priceFormatted: '۳۸۰,۰۰۰ تومان',
        durationMinutes: 45,
        homeServiceAvailable: true,
        description: 'کوتاهی تخصصی متناسب با فرم صورت همراه با براشینگ حرفه‌ای'
      },
      {
        id: 'srv-102',
        name: 'رنگ و لایت تخصصی بالیاژ (مو متوسط)',
        category: 'رنگ و لایت',
        price: 1850000,
        priceFormatted: '۱,۸۵۰,۰۰۰ تومان',
        durationMinutes: 180,
        homeServiceAvailable: false,
        description: 'استفاده از مواد بدون آمونیاک ایتالیایی همراه با پلکس‌تراپی رایگان'
      },
      {
        id: 'srv-103',
        name: 'کراتین و پروتئین‌تراپی احیاکننده',
        category: 'کراتین و احیا',
        price: 2200000,
        priceFormatted: '۲,۲۰۰,۰۰۰ تومان',
        durationMinutes: 150,
        homeServiceAvailable: true,
        description: 'صافی ۹۰ درصد و احیای ۱۰۰ درصد با ماندگاری ۸ ماه'
      },
      {
        id: 'srv-104',
        name: 'میکاپ VIP و شینیون ماندگار',
        category: 'میکاپ و شینیون',
        price: 1400000,
        priceFormatted: '۱,۴۰۰,۰۰۰ تومان',
        durationMinutes: 90,
        homeServiceAvailable: true,
        description: 'زیرسازی ضدتعریق با برندهای هدی‌بیوتی و استی‌لادر'
      },
      {
        id: 'srv-105',
        name: 'خدمات کامل زیبایی در محل مشتری',
        category: 'خدمات در محل',
        price: 950000,
        priceFormatted: '۹۵۰,۰۰۰ تومان',
        durationMinutes: 90,
        homeServiceAvailable: true,
        description: 'اعزام آرایشگر مجرب با تجهیزات استریل پرتابل درب منزل مشتری'
      }
    ],
    portfolio: [
      {
        id: 'port-101',
        title: 'بالیاژ روسی روی موی طبیعی',
        category: 'رنگ و لایت',
        imageUrl: '/src/assets/images/women_beauty_services_1793464702979.jpg',
        description: 'تکنیک بدون رد و خط با پایه‌ی ۹ بدون آسیب'
      },
      {
        id: 'port-102',
        title: 'احیا و ابریشم‌سازی موهای آسیب‌دیده',
        category: 'کراتین و احیا',
        imageUrl: '/src/assets/images/hero_salon_luxury_1793464702288.jpg',
        description: 'درمان کامل خشکی ناشی از دکلره با پروتئین‌تراپی'
      },
      {
        id: 'port-103',
        title: 'میکاپ لایت اروپایی',
        category: 'میکاپ و شینیون',
        imageUrl: '/src/assets/images/home_service_beauty_1793464703481.jpg',
        description: 'شینیون بافت باز همراه با مژه‌گذاری دانه‌ای طبیعی'
      }
    ],
    reviews: [
      {
        id: 'rev-1',
        userName: 'مریم س.',
        date: '۱۴۰۳/۰۸/۱۵',
        rating: 5,
        comment: 'قیمت اعلام‌شده در زیبانو دقیقا با مبلغ دریافتی یکسان بود و هیچ هزینه اضافی نگرفتند. محیط سالن هم بسیار بهداشتی بود.',
        serviceName: 'کوتاهی ژورنالی',
        isVerifiedTest: true
      },
      {
        id: 'rev-2',
        userName: 'فاطمه ر.',
        date: '۱۴۰۳/۰۸/۱۰',
        rating: 5,
        comment: 'برای مادرم که به علت شکستگی پا توان مراجعه نداشت خدمات در منزل گرفتیم. آرایشگر با کلیه وسایل بهداشتی و سر وقت تشریف آوردند.',
        serviceName: 'خدمات در محل',
        isVerifiedTest: true
      }
    ]
  },
  {
    id: 'salon-2',
    name: 'استودیو پیرایش آقایان نوبل',
    gender: 'men',
    city: 'یزد',
    district: 'کاشانی',
    address: 'یزد، خیابان آیت‌الله کاشانی، بعد از بیمارستان مرتاض، ساختمان خاتم',
    phone: '۰۳۵۳۸۲۴۲۲۱۱',
    rating: 4.8,
    reviewsCount: 42,
    priceLevel: 'متوسط',
    priceRangeText: '۱۵۰,۰۰۰ الی ۹۰۰,۰۰۰ تومان',
    hasHomeService: true,
    homeServiceFee: 100000,
    imageUrl: '/src/assets/images/men_grooming_services_1793464703155.jpg',
    galleryImages: [
      '/src/assets/images/men_grooming_services_1793464703155.jpg',
      '/src/assets/images/hero_salon_luxury_1793464702288.jpg'
    ],
    description: 'گرومینگ تخصصی آقایان، فید حرفه‌ای، طراحی خط ریش، پاکسازی پوست با دستگاه هیدروفیشیال و خدمات اعزام آرایشگر به محل.',
    workingHours: 'شنبه تا چهارشنبه ۱۰:۰۰ الی ۲۲:۰۰، جمعه‌ها ۱۶:۰۰ الی ۲۲:۰۰',
    featuredServices: ['پیرایش و فید تخصصی', 'اصلاح ریش با حوله داغ', 'پاکسازی پوست VIP', 'پیرایش در منزل'],
    services: [
      {
        id: 'srv-201',
        name: 'اصلاح کلاسیک و هیرکات مدرن',
        category: 'کوتاهی و استایل',
        price: 190000,
        priceFormatted: '۱۹۰,۰۰۰ تومان',
        durationMinutes: 30,
        homeServiceAvailable: true,
        description: 'کوتاهی مو با قیچی و ماشین، فرم‌دهی و شستشوی سر'
      },
      {
        id: 'srv-202',
        name: 'پیرایش و استایل داماد VIP',
        category: 'گریم و داماد',
        price: 1800000,
        priceFormatted: '۱,۸۰۰,۰۰۰ تومان',
        durationMinutes: 120,
        homeServiceAvailable: true,
        description: 'پکیج کامل شامل پاکسازی پوست، کوتاهی، استایل مو، گریم متعادل‌سازی'
      },
      {
        id: 'srv-203',
        name: 'اصلاح تخصصی ریش با حوله گرم و تیغ سنتی',
        category: 'اصلاح ریش',
        price: 120000,
        priceFormatted: '۱۲۰,۰۰۰ تومان',
        durationMinutes: 25,
        homeServiceAvailable: true,
        description: 'خط‌گیری دقیق با تیغ یکبارمصرف و ماساژ روغن آرگان'
      },
      {
        id: 'srv-204',
        name: 'پاکسازی و هیدروفیشیال ۵ مرحله‌ای',
        category: 'پاکسازی پوست',
        price: 450000,
        priceFormatted: '۴۵۰,۰۰۰ تومان',
        durationMinutes: 45,
        homeServiceAvailable: false,
        description: 'تخلیه جوش‌های سرسیاه، میکرودرم و ماسک طلا برای شادابی پوست'
      },
      {
        id: 'srv-205',
        name: 'پیرایش در منزل ویژه سالمندان و افراد کم‌توان',
        category: 'خدمات در محل',
        price: 350000,
        priceFormatted: '۳۵۰,۰۰۰ تومان',
        durationMinutes: 45,
        homeServiceAvailable: true,
        description: 'خدمت کامل پیرایش سر و صورت با رعایت کامل پروتکل‌های بهداشتی در محل مشتری'
      }
    ],
    portfolio: [
      {
        id: 'port-201',
        title: 'اسکین فید میانی (Mid Skin Fade)',
        category: 'کوتاهی و استایل',
        imageUrl: '/src/assets/images/men_grooming_services_1793464703155.jpg',
        description: 'محو دقیق با صفر ماشین و استایل با واکس مات'
      },
      {
        id: 'port-202',
        title: 'طراحی خط ریش و فرم‌دهی چهره',
        category: 'اصلاح ریش',
        imageUrl: '/src/assets/images/men_grooming_services_1793464703155.jpg',
        description: 'ایجاد زاویه فک طبیعی و اصلاح دقیق گونه‌ها'
      }
    ],
    reviews: [
      {
        id: 'rev-201',
        userName: 'امیرحسین م.',
        date: '۱۴۰۳/۰۸/۱۲',
        rating: 5,
        comment: 'بدون معطلی سر همون ساعتی که توی زیبانو ثبت کرده بودم نوبتم شد. برخورد عالی و کار بسیار تمیز.',
        serviceName: 'اصلاح کلاسیک',
        isVerifiedTest: true
      },
      {
        id: 'rev-202',
        userName: 'محمدرضا د.',
        date: '۱۴۰۳/۰۸/۰۴',
        rating: 4.5,
        comment: 'آرایشگر برای پدر سالمندم اومد منزل. فوق‌العاده با حوصله و محترم بودند. واقعا این سرویس توی یزد لازم بود.',
        serviceName: 'پیرایش در منزل',
        isVerifiedTest: true
      }
    ]
  },
  {
    id: 'salon-3',
    name: 'مرکز تخصصی زیبایی رز سفید',
    gender: 'women',
    city: 'تهران',
    district: 'سعادت‌آباد',
    address: 'تهران، سعادت‌آباد، میدان کاج، خیابان سرو شرقی، پلاک ۴۴',
    phone: '۰۲۱۲۲۳۸۵۰۰۰',
    rating: 4.9,
    reviewsCount: 89,
    priceLevel: 'لوکس',
    priceRangeText: '۶۰۰,۰۰۰ الی ۴,۵۰۰,۰۰۰ تومان',
    hasHomeService: true,
    homeServiceFee: 250000,
    imageUrl: '/src/assets/images/hero_salon_luxury_1793464702288.jpg',
    galleryImages: [
      '/src/assets/images/hero_salon_luxury_1793464702288.jpg',
      '/src/assets/images/women_beauty_services_1793464702979.jpg'
    ],
    description: 'سالن زیبایی سطح یک با کادر بین‌المللی. ارائه‌دهنده تکنیک‌های روز میکاپ عروس، بالیاژ تلفیقی و اکستنشن طبیعی مو.',
    workingHours: 'همه روزه ۱۰:۰۰ الی ۲۰:۰۰ (جمعه‌ها با هماهنگی قبلی)',
    featuredServices: ['میکاپ عروس VIP', 'رنگ و آمبره مو', 'اکستنشن لیزری', 'خدمات زیبایی در منزل'],
    services: [
      {
        id: 'srv-301',
        name: 'کوتاهی مدرن لیر و استایلینگ',
        category: 'کوتاهی و استایل',
        price: 550000,
        priceFormatted: '۵۵۰,۰۰۰ تومان',
        durationMinutes: 45,
        homeServiceAvailable: true,
        description: 'کوتاهی بر اساس ساختار جمجمه و تار مو'
      },
      {
        id: 'srv-302',
        name: 'آمبره و کالرمِلتینگ فرانسوی',
        category: 'رنگ و لایت',
        price: 3200000,
        priceFormatted: '۳,۲۰۰,۰۰۰ تومان',
        durationMinutes: 210,
        homeServiceAvailable: false,
        description: 'سایه‌روشن ظریف با رنگ‌های ارگانیک لورآل'
      },
      {
        id: 'srv-303',
        name: 'میکاپ مجلسی لوکس با متریال شارلوت تیلبری',
        category: 'میکاپ و شینیون',
        price: 2100000,
        priceFormatted: '۲,۱۰۰,۰۰۰ تومان',
        durationMinutes: 75,
        homeServiceAvailable: true,
        description: 'ماندگاری ۴۸ ساعته با مژه‌سازی تخصصی'
      }
    ],
    portfolio: [
      {
        id: 'port-301',
        title: 'آمبره مو روی موی بلوند دودی',
        category: 'رنگ و لایت',
        imageUrl: '/src/assets/images/hero_salon_luxury_1793464702288.jpg',
        description: 'ترکیب دودی زیتونی با تناژ خنثی'
      }
    ],
    reviews: [
      {
        id: 'rev-301',
        userName: 'سارا ک.',
        date: '۱۴۰۳/۰۸/۲۲',
        rating: 5,
        comment: 'عالی از هر نظر. رزرو آنلاین از طریق زیبانو خیلی سریع تایید شد و پیامک یادآوری هم ارسال شد.',
        serviceName: 'کوتاهی مدرن لیر',
        isVerifiedTest: true
      }
    ]
  },
  {
    id: 'salon-4',
    name: 'باربرشاپ و گرومینگ آرتین',
    gender: 'men',
    city: 'تهران',
    district: 'جردن',
    address: 'تهران، جردن (نلسون ماندلا)، بالاتر از پل میرداماد، برج سایه',
    phone: '۰۲۱۸۸۶۷۹۹۴۰',
    rating: 4.7,
    reviewsCount: 54,
    priceLevel: 'لوکس',
    priceRangeText: '۲۵۰,۰۰۰ الی ۱,۵۰۰,۰۰۰ تومان',
    hasHomeService: true,
    homeServiceFee: 200000,
    imageUrl: '/src/assets/images/men_grooming_services_1793464703155.jpg',
    galleryImages: [
      '/src/assets/images/men_grooming_services_1793464703155.jpg',
      '/src/assets/images/hero_salon_luxury_1793464702288.jpg'
    ],
    description: 'آرایشگاه مدرن مردانه با فضای اختصاصی، خدمات هیرکات به سبک لندنی، فیشیال پوست با اسکین‌اسکرابر و نوبت‌دهی منظم.',
    workingHours: 'شنبه تا پنجشنبه ۹:۳۰ الی ۲۱:۳۰',
    featuredServices: ['هیرکات فرمول وان', 'فیشیال پاکسازی تخصصی', 'فرم‌دهی ریش ایتالیایی', 'اعزام به محل'],
    services: [
      {
        id: 'srv-401',
        name: 'هیرکات اختصاصی و استایلینگ سر',
        category: 'کوتاهی و استایل',
        price: 280000,
        priceFormatted: '۲۸۰,۰۰۰ تومان',
        durationMinutes: 40,
        homeServiceAvailable: true,
        description: 'اصلاح با تفکیک زاویه و شستشو با شامپوی تقویتی'
      },
      {
        id: 'srv-402',
        name: 'پاکسازی و لایه‌برداری پوست صورت',
        category: 'پاکسازی پوست',
        price: 650000,
        priceFormatted: '۶۵۰,۰۰۰ تومان',
        durationMinutes: 60,
        homeServiceAvailable: false,
        description: 'پاکسازی عمیق منافذ با بخور سرد و ماسک جلبک دریایی'
      }
    ],
    portfolio: [
      {
        id: 'port-401',
        title: 'فید تکسچر با قیچی تیغ‌دار',
        category: 'کوتاهی و استایل',
        imageUrl: '/src/assets/images/men_grooming_services_1793464703155.jpg',
        description: 'مدل موی ترند ۲۰۲۴ مناسب چهره‌های مربعی'
      }
    ],
    reviews: [
      {
        id: 'rev-401',
        userName: 'کیوان ن.',
        date: '۱۴۰۳/۰۸/۱۸',
        rating: 4.8,
        comment: 'بهترین تجربه آرایشگاهی در جردن. وقت‌شناسی فوق‌العاده و مقایسه امکانات در سایت عالی بود.',
        serviceName: 'هیرکات اختصاصی',
        isVerifiedTest: true
      }
    ]
  },
  {
    id: 'salon-5',
    name: 'سالن زیبایی و عروس نگارین',
    gender: 'women',
    city: 'اصفهان',
    district: 'مرداویج',
    address: 'اصفهان، مرداویج، خیابان شیخ کلینی، نبش کوچه رسالت',
    phone: '۰۳۱۳۶۶۹۱۱۰۰',
    rating: 4.8,
    reviewsCount: 31,
    priceLevel: 'متوسط',
    priceRangeText: '۳۰۰,۰۰۰ الی ۲,۱۰۰,۰۰۰ تومان',
    hasHomeService: true,
    homeServiceFee: 120000,
    imageUrl: '/src/assets/images/women_beauty_services_1793464702979.jpg',
    galleryImages: [
      '/src/assets/images/women_beauty_services_1793464702979.jpg',
      '/src/assets/images/home_service_beauty_1793464703481.jpg'
    ],
    description: 'ارائه کلیه خدمات تخصصی رنگ و مش، کوپ‌های مدرن، میکاپ اروپایی و شینیون با سال‌ها سابقه درخشان در اصفهان.',
    workingHours: 'شنبه تا چهارشنبه ۹:۰۰ الی ۱۹:۳۰',
    featuredServices: ['رنگ و مش کلاهی و فویلی', 'میکاپ لایت', 'کوتاهی مو با موزر و قیچی', 'خدمات در منزل'],
    services: [
      {
        id: 'srv-501',
        name: 'کوپ تخصصی و براشینگ مجلسی',
        category: 'کوتاهی و استایل',
        price: 320000,
        priceFormatted: '۳۲۰,۰۰۰ تومان',
        durationMinutes: 40,
        homeServiceAvailable: true,
        description: 'کوپ‌های فانتزی و کلاسیک با قیچی‌های الماسی'
      },
      {
        id: 'srv-502',
        name: 'رنگساژ و تکنیک فیس‌فریم مو',
        category: 'رنگ و لایت',
        price: 1100000,
        priceFormatted: '۱,۱۰۰,۰۰۰ تومان',
        durationMinutes: 120,
        homeServiceAvailable: false,
        description: 'روشن‌سازی دو طرف صورت جهت جذابیت فرم چهره'
      }
    ],
    portfolio: [
      {
        id: 'port-501',
        title: 'فیس‌فریم شنی کاراملی',
        category: 'رنگ و لایت',
        imageUrl: '/src/assets/images/women_beauty_services_1793464702979.jpg',
        description: 'تکنیک ملایم بدون آسیب به ریشه مو'
      }
    ],
    reviews: [
      {
        id: 'rev-501',
        userName: 'الهام ق.',
        date: '۱۴۰۳/۰۸/۰۸',
        rating: 4.7,
        comment: 'شفاف بودن قیمت‌ها باعث شد با خیال راحت انتخاب کنم و راضی بودم.',
        serviceName: 'کوپ تخصصی',
        isVerifiedTest: true
      }
    ]
  },
  {
    id: 'salon-6',
    name: 'مجموعه مراقبت و پیرایش کلاسیک',
    gender: 'men',
    city: 'شیراز',
    district: 'قصردشت',
    address: 'شیراز، خیابان قصردشت، نبش کوچه ۵۴، مجتمع پلاتین',
    phone: '۰۷۱۳۶۲۸۹۴۲۰',
    rating: 4.6,
    reviewsCount: 26,
    priceLevel: 'اقتصادی',
    priceRangeText: '۱۰۰,۰۰۰ الی ۵۰۰,۰۰۰ تومان',
    hasHomeService: false,
    homeServiceFee: 0,
    imageUrl: '/src/assets/images/men_grooming_services_1793464703155.jpg',
    galleryImages: [
      '/src/assets/images/men_grooming_services_1793464703155.jpg'
    ],
    description: 'پیرایش صمیمی و حرفه‌ای با قیمت‌های مصوب و منصفانه. نوبت‌دهی سریع و بدون معطلی در دل منطقه قصردشت شیراز.',
    workingHours: 'همه روزه ۹:۰۰ الی ۲۲:۰۰',
    featuredServices: ['اصلاح سر استاندارد', 'اصلاح ریش با ژیلت و فوم', 'کراتینه و نرم‌کنندگی مو'],
    services: [
      {
        id: 'srv-601',
        name: 'اصلاح سر و سشوار فرم‌دهی',
        category: 'کوتاهی و استایل',
        price: 130000,
        priceFormatted: '۱۳۰,۰۰۰ تومان',
        durationMinutes: 30,
        homeServiceAvailable: false,
        description: 'کوتاهی ساده، کلاسیک یا اداری به همراه فرم‌دهی'
      },
      {
        id: 'srv-602',
        name: 'اصلاح و آنکادر ریش با روغن خنک‌کننده',
        category: 'اصلاح ریش',
        price: 80000,
        priceFormatted: '۸۰,۰۰۰ تومان',
        durationMinutes: 20,
        homeServiceAvailable: false,
        description: 'خط ریش تمیز با حفظ حالت طبیعی صورت'
      }
    ],
    portfolio: [
      {
        id: 'port-601',
        title: 'استایل کلاسیک اداری',
        category: 'کوتاهی و استایل',
        imageUrl: '/src/assets/images/men_grooming_services_1793464703155.jpg',
        description: 'مدل تمیز، مرتب و متناسب جلسات رسمی'
      }
    ],
    reviews: [
      {
        id: 'rev-601',
        userName: 'پژمان ط.',
        date: '۱۴۰۳/۰۸/۱۴',
        rating: 4.5,
        comment: 'قیمت اقتصادی و مناسب و کار با کیفیت بالا. دسترسی راحت در قصردشت.',
        serviceName: 'اصلاح سر و سشوار',
        isVerifiedTest: true
      }
    ]
  },
  {
    id: 'salon-7',
    name: 'سالن تخصصی زیبایی پرنیان',
    gender: 'women',
    city: 'مشهد',
    district: 'احمدآباد',
    address: 'مشهد، احمدآباد، بلوار بعثت، نبش بعثت ۶',
    phone: '۰۵۱۳۸۴۱۷۰۰۲',
    rating: 4.9,
    reviewsCount: 47,
    priceLevel: 'متوسط',
    priceRangeText: '۳۵۰,۰۰۰ الی ۲,۳۰۰,۰۰۰ تومان',
    hasHomeService: true,
    homeServiceFee: 140000,
    imageUrl: '/src/assets/images/women_beauty_services_1793464702979.jpg',
    galleryImages: [
      '/src/assets/images/women_beauty_services_1793464702979.jpg',
      '/src/assets/images/home_service_beauty_1793464703481.jpg'
    ],
    description: 'ارائه‌دهنده پکیج‌های کامل شینیون، بافت‌های آفریقایی و مکزیکی، فیشیال پوست و اعزام آرایشگر به محل جهت مجالس و مراسم.',
    workingHours: 'همه روزه ۹:۳۰ الی ۲۰:۰۰',
    featuredServices: ['شینیون و استایل مواج', 'پاکسازی پوست درمااف', 'بافت مو فانتزی', 'خدمات در منزل'],
    services: [
      {
        id: 'srv-701',
        name: 'شینیون خطی و کلاسیک مجلسی',
        category: 'میکاپ و شینیون',
        price: 650000,
        priceFormatted: '۶۵۰,۰۰۰ تومان',
        durationMinutes: 60,
        homeServiceAvailable: true,
        description: 'شینیون بادوام و مقاوم در برابر رطوبت و تعریق'
      },
      {
        id: 'srv-702',
        name: 'بافت مکزیکی و بافت فرانسوی با موی اضافه',
        category: 'کوتاهی و استایل',
        price: 450000,
        priceFormatted: '۴۵۰,۰۰۰ تومان',
        durationMinutes: 90,
        homeServiceAvailable: true,
        description: 'بافت یکدست بدون کشیدگی پوست سر'
      }
    ],
    portfolio: [
      {
        id: 'port-701',
        title: 'شینیون مواج شیک',
        category: 'میکاپ و شینیون',
        imageUrl: '/src/assets/images/women_beauty_services_1793464702979.jpg',
        description: 'استایل پرطرفدار همراه با سنجاق‌های مرواریدی'
      }
    ],
    reviews: [
      {
        id: 'rev-701',
        userName: 'نگین ح.',
        date: '۱۴۰۳/۰۸/۲۵',
        rating: 5,
        comment: 'نمونه‌کارها کاملا واقعی بود و نتیجه دقیقا شبیه عکسی شد که انتخاب کرده بودم.',
        serviceName: 'شینیون خطی',
        isVerifiedTest: true
      }
    ]
  },
  {
    id: 'salon-8',
    name: 'پیرایش مدرن تبریز',
    gender: 'men',
    city: 'تبریز',
    district: 'ولیعصر',
    address: 'تبریز، کوی ولیعصر، خیابان فروغی، مجتمع آیدین',
    phone: '۰۴۱۳۳۳۲۱۱۸۰',
    rating: 4.8,
    reviewsCount: 35,
    priceLevel: 'متوسط',
    priceRangeText: '۱۸۰,۰۰۰ الی ۸۰۰,۰۰۰ تومان',
    hasHomeService: true,
    homeServiceFee: 110000,
    imageUrl: '/src/assets/images/men_grooming_services_1793464703155.jpg',
    galleryImages: [
      '/src/assets/images/men_grooming_services_1793464703155.jpg'
    ],
    description: 'مرکز تخصصی کوتاهی مو، سایه‌کاری، پاکسازی صورت با بخور و ماسک‌های گیاهی و پشتیبانی از خدمات در محل در تمام مناطق تبریز.',
    workingHours: '۱۰:۰۰ الی ۲۲:۰۰',
    featuredServices: ['کوتاهی مو با متد روز', 'پاکسازی پوست گیاهی', 'اصلاح ریش فرم‌دار', 'پیرایش در منزل'],
    services: [
      {
        id: 'srv-801',
        name: 'کوتاهی مو و لایه‌برداری ملایم پوست',
        category: 'کوتاهی و استایل',
        price: 220000,
        priceFormatted: '۲۲۰,۰۰۰ تومان',
        durationMinutes: 40,
        homeServiceAvailable: true,
        description: 'اصلاح با تجهیزات ضدعفونی‌شده و اسکراب پوست'
      }
    ],
    portfolio: [
      {
        id: 'port-801',
        title: 'فید مخملی تبریزی',
        category: 'کوتاهی و استایل',
        imageUrl: '/src/assets/images/men_grooming_services_1793464703155.jpg',
        description: 'خطوط تمیز و محو متناسب با فیس آقایان'
      }
    ],
    reviews: [
      {
        id: 'rev-801',
        userName: 'آیدین ت.',
        date: '۱۴۰۳/۰۸/۲۷',
        rating: 4.9,
        comment: 'امکان مقایسه قیمت با سالن‌های دیگر در زیبانو باعث شد اینجا را انتخاب کنم و کاملا راضی هستم.',
        serviceName: 'کوتاهی مو',
        isVerifiedTest: true
      }
    ]
  }
];

export const INITIAL_BOOKINGS: BookingRequest[] = [
  {
    id: 'book-1',
    trackingCode: 'ZB-84291',
    salonId: 'salon-1',
    salonName: 'سالن زیبایی ماهور',
    serviceId: 'srv-101',
    serviceName: 'کوتاهی ژورنالی و فرم‌دهی مو',
    price: 380000,
    serviceType: 'in_salon',
    customerName: 'سپیده اسدی',
    customerPhone: '09131234567',
    date: '1403/09/05',
    timeSlot: '16:00 - 17:00',
    notes: 'نوبت عصر ترجیحا',
    status: 'pending',
    createdAt: '1403/08/29'
  },
  {
    id: 'book-2',
    trackingCode: 'ZB-92104',
    salonId: 'salon-2',
    salonName: 'استودیو پیرایش آقایان نوبل',
    serviceId: 'srv-205',
    serviceName: 'پیرایش در منزل ویژه سالمندان و افراد کم‌توان',
    price: 350000,
    serviceType: 'at_home',
    customerName: 'رضا میرجلیلی',
    customerPhone: '09139876543',
    customerAddress: 'یزد، صفائیه، میدان اطلسی، کوچه شهید مطهری، پلاک ۱۸',
    date: '1403/09/06',
    timeSlot: '11:00 - 12:00',
    notes: 'برای پدربزرگ با سابقه جراحی زانو',
    status: 'approved',
    createdAt: '1403/08/28'
  }
];

export const IRAN_CITIES = [
  'همه شهرها',
  'یزد',
  'تهران',
  'اصفهان',
  'شیراز',
  'مشهد',
  'تبریز',
  'کرمان'
];

export const SERVICE_CATEGORIES = [
  'همه خدمات',
  'کوتاهی و استایل',
  'رنگ و لایت',
  'میکاپ و شینیون',
  'کراتین و احیا',
  'اصلاح ریش',
  'پاکسازی پوست',
  'خدمات در محل'
];

export const TIME_SLOTS = [
  '09:00 - 10:00',
  '10:30 - 11:30',
  '12:00 - 13:00',
  '15:00 - 16:00',
  '16:30 - 17:30',
  '18:00 - 19:00',
  '19:30 - 20:30'
];
