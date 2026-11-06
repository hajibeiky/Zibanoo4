import { Salon, BookingRequest } from '../types';

export const INITIAL_SALONS: Salon[] = [
  {
    id: 'salon-1',
    name: 'سالن زیبایی ماهور',
    ownerName: 'محبوبه شریفی',
    ownerAvatar: '/src/assets/images/women_beauty_services_1793464702979.jpg',
    slogan: 'زیبایی طبیعی و اصالت هنر در قلب یزد',
    gender: 'women',
    city: 'یزد',
    district: 'صفائیه',
    address: 'یزد، صفائیه، خیابان ملاصدرا، نبش کوچه یاس ۱۲',
    phone: '۰۳۵۳۸۲۴۵۰۹۰',
    latitude: 31.8485,
    longitude: 54.3520,
    rating: 4.9,
    reviewsCount: 38,
    priceLevel: 'لوکس',
    priceRangeText: '۳۸۰,۰۰۰ الی ۲,۸۰۰,۰۰۰ تومان',
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
    openingHour: '09:00',
    closingHour: '21:00',
    workingDays: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه'],
    featuredServices: ['رنگ و لایت بالیاژ', 'کراتین و احیای نانو', 'میکاپ و شینیون مجلسی', 'خدمات در منزل'],
    services: [
      {
        id: 'srv-101',
        name: 'کوتاهی ژورنالی و فرم‌دهی مو',
        category: 'کوتاهی و اصلاح مو',
        price: 380000,
        priceFormatted: '۳۸۰,۰۰۰ تومان',
        durationMinutes: 45,
        homeServiceAvailable: true,
        homeServiceFeeExtra: 150000,
        description: 'کوتاهی تخصصی متناسب با فرم صورت همراه با براشینگ حرفه‌ای',
        portfolioImages: ['/src/assets/images/women_beauty_services_1793464702979.jpg']
      },
      {
        id: 'srv-102',
        name: 'رنگ و لایت تخصصی بالیاژ روسی',
        category: 'رنگ، مش و لایت',
        price: 1850000,
        priceFormatted: '۱,۸۵۰,۰۰۰ تومان',
        durationMinutes: 180,
        homeServiceAvailable: false,
        description: 'استفاده از مواد بدون آمونیاک ایتالیایی همراه با پلکس‌تراپی رایگان',
        portfolioImages: ['/src/assets/images/hero_salon_luxury_1793464702288.jpg']
      },
      {
        id: 'srv-103',
        name: 'کراتین و پروتئین‌تراپی احیاکننده',
        category: 'خدمات تخصصی مو',
        price: 2200000,
        priceFormatted: '۲,۲۰۰,۰۰۰ تومان',
        durationMinutes: 150,
        homeServiceAvailable: true,
        homeServiceFeeExtra: 150000,
        description: 'صافی ۹۰ درصد و احیای ۱۰۰ درصد با ماندگاری ۸ ماه'
      },
      {
        id: 'srv-104',
        name: 'میکاپ VIP و شینیون ماندگار',
        category: 'میکاپ',
        price: 1400000,
        priceFormatted: '۱,۴۰۰,۰۰۰ تومان',
        durationMinutes: 90,
        homeServiceAvailable: true,
        homeServiceFeeExtra: 200000,
        description: 'زیرسازی ضدتعریق با برندهای هدی‌بیوتی و استی‌لادر'
      },
      {
        id: 'srv-105',
        name: 'کاشت و ژلیش تخصصی ناخن',
        category: 'خدمات ناخن',
        price: 450000,
        priceFormatted: '۴۵۰,۰۰۰ تومان',
        durationMinutes: 75,
        homeServiceAvailable: true,
        homeServiceFeeExtra: 120000,
        description: 'طراحی با ژل‌های ضدحساسیت و ماندگاری ۵ هفته'
      },
      {
        id: 'srv-106',
        name: 'لیفت و لمینت مژه و ابرو',
        category: 'ابرو و مژه',
        price: 390000,
        priceFormatted: '۳۹۰,۰۰۰ تومان',
        durationMinutes: 60,
        homeServiceAvailable: true,
        homeServiceFeeExtra: 100000,
        description: 'تقویت ریشه مژه با مواد بوتاکس‌تراپی ارگانیک'
      },
      {
        id: 'srv-107',
        name: 'پاکسازی عمقی و آبرسانی پوست',
        category: 'خدمات مراقبت و زیبایی پوست',
        price: 680000,
        priceFormatted: '۶۸۰,۰۰۰ تومان',
        durationMinutes: 60,
        homeServiceAvailable: true,
        homeServiceFeeExtra: 150000,
        description: 'فیشیال هفت‌مرحله‌ای با ماسک طلای کلاژن‌ساز'
      }
    ],
    portfolio: [
      {
        id: 'port-101',
        title: 'بالیاژ روسی روی موی طبیعی',
        category: 'رنگ، مش و لایت',
        imageUrl: '/src/assets/images/women_beauty_services_1793464702979.jpg',
        description: 'تکنیک بدون رد و خط با پایه‌ی ۹ بدون آسیب',
        serviceId: 'srv-102'
      },
      {
        id: 'port-102',
        title: 'احیا و ابریشم‌سازی موهای آسیب‌دیده',
        category: 'خدمات تخصصی مو',
        imageUrl: '/src/assets/images/hero_salon_luxury_1793464702288.jpg',
        description: 'درمان کامل خشکی ناشی از دکلره با پروتئین‌تراپی',
        serviceId: 'srv-103'
      },
      {
        id: 'port-103',
        title: 'میکاپ لایت اروپایی',
        category: 'میکاپ',
        imageUrl: '/src/assets/images/home_service_beauty_1793464703481.jpg',
        description: 'شینیون بافت باز همراه با مژه‌گذاری دانه‌ای طبیعی',
        serviceId: 'srv-104'
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
    ownerName: 'کامران دهقان',
    ownerAvatar: '/src/assets/images/men_grooming_services_1793464703155.jpg',
    slogan: 'آراستگی مدرن، استایل پایدار',
    gender: 'men',
    city: 'یزد',
    district: 'کاشانی',
    address: 'یزد، خیابان آیت‌الله کاشانی، بعد از بیمارستان مرتاض، ساختمان خاتم',
    phone: '۰۳۵۳۸۲۴۲۲۱۱',
    latitude: 31.8740,
    longitude: 54.3685,
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
    openingHour: '10:00',
    closingHour: '22:00',
    workingDays: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'],
    featuredServices: ['پیرایش و فید تخصصی', 'اصلاح ریش با حوله داغ', 'پاکسازی پوست VIP', 'پیرایش در منزل'],
    services: [
      {
        id: 'srv-201',
        name: 'کوتاهی مو و هیرکات مدرن',
        category: 'کوتاهی مو',
        price: 190000,
        priceFormatted: '۱۹۰,۰۰۰ تومان',
        durationMinutes: 30,
        homeServiceAvailable: true,
        homeServiceFeeExtra: 100000,
        description: 'کوتاهی مو با قیچی و ماشین، فرم‌دهی و شستشوی سر',
        portfolioImages: ['/src/assets/images/men_grooming_services_1793464703155.jpg']
      },
      {
        id: 'srv-202',
        name: 'اصلاح و مرتب‌سازی تخصصی ریش',
        category: 'اصلاح و مرتب‌سازی ریش',
        price: 120000,
        priceFormatted: '۱۲۰,۰۰۰ تومان',
        durationMinutes: 25,
        homeServiceAvailable: true,
        homeServiceFeeExtra: 100000,
        description: 'خط‌گیری دقیق با تیغ یکبارمصرف و ماساژ روغن آرگان'
      },
      {
        id: 'srv-203',
        name: 'پکیج اصلاح کامل مو و ریش با حوله داغ',
        category: 'اصلاح مو و ریش',
        price: 290000,
        priceFormatted: '۲۹۰,۰۰۰ تومان',
        durationMinutes: 50,
        homeServiceAvailable: true,
        homeServiceFeeExtra: 100000,
        description: 'اصلاح سر و صورت به همراه بخور سرد و حوله معطر'
      },
      {
        id: 'srv-204',
        name: 'پاکسازی و هیدروفیشیال ۵ مرحله‌ای پوست',
        category: 'پاکسازی و مراقبت پوست',
        price: 450000,
        priceFormatted: '۴۵۰,۰۰۰ تومان',
        durationMinutes: 45,
        homeServiceAvailable: false,
        description: 'تخلیه جوش‌های سرسیاه، میکرودرم و ماسک طلا برای شادابی پوست'
      },
      {
        id: 'srv-205',
        name: 'پکیج گریم و استایل داماد VIP',
        category: 'خدمات داماد',
        price: 1800000,
        priceFormatted: '۱,۸۰۰,۰۰۰ تومان',
        durationMinutes: 120,
        homeServiceAvailable: true,
        homeServiceFeeExtra: 250000,
        description: 'پکیج کامل شامل پاکسازی پوست، کوتاهی، استایل مو، گریم متعادل‌سازی چهره'
      },
      {
        id: 'srv-206',
        name: 'رنگ و جوانسازی طبیعی مو و ریش',
        category: 'رنگ مو',
        price: 320000,
        priceFormatted: '۳۲۰,۰۰۰ تومان',
        durationMinutes: 40,
        homeServiceAvailable: true,
        homeServiceFeeExtra: 100000,
        description: 'پوشش کامل تارهای سفید با تناژ طبیعی بدون اثر قرمزی'
      }
    ],
    portfolio: [
      {
        id: 'port-201',
        title: 'اسکین فید میانی (Mid Skin Fade)',
        category: 'کوتاهی مو',
        imageUrl: '/src/assets/images/men_grooming_services_1793464703155.jpg',
        description: 'محو دقیق با صفر ماشین و استایل با واکس مات',
        serviceId: 'srv-201'
      },
      {
        id: 'port-202',
        title: 'طراحی خط ریش و فرم‌دهی چهره',
        category: 'اصلاح و مرتب‌سازی ریش',
        imageUrl: '/src/assets/images/men_grooming_services_1793464703155.jpg',
        description: 'ایجاد زاویه فک طبیعی و اصلاح دقیق گونه‌ها',
        serviceId: 'srv-202'
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
        rating: 4.8,
        comment: 'آرایشگر برای پدر سالمندم اومد منزل. فوق‌العاده با حوصله و محترم بودند. واقعا این سرویس توی یزد لازم بود.',
        serviceName: 'پیرایش در منزل',
        isVerifiedTest: true
      }
    ]
  },
  {
    id: 'salon-3',
    name: 'مرکز تخصصی زیبایی رز سفید',
    ownerName: 'پریناز افشار',
    ownerAvatar: '/src/assets/images/women_beauty_services_1793464702979.jpg',
    slogan: 'شکوه، ظرافت و درخشش در زیباترین روزهای زندگی',
    gender: 'women',
    city: 'تهران',
    district: 'سعادت‌آباد',
    address: 'تهران، سعادت‌آباد، میدان کاج، خیابان سرو شرقی، پلاک ۴۴',
    phone: '۰۲۱۲۲۳۸۵۰۰۰',
    latitude: 35.7820,
    longitude: 51.3730,
    rating: 4.9,
    reviewsCount: 89,
    priceLevel: 'لوکس',
    priceRangeText: '۵۵۰,۰۰۰ الی ۴,۵۰۰,۰۰۰ تومان',
    hasHomeService: true,
    homeServiceFee: 250000,
    imageUrl: '/src/assets/images/hero_salon_luxury_1793464702288.jpg',
    galleryImages: [
      '/src/assets/images/hero_salon_luxury_1793464702288.jpg',
      '/src/assets/images/women_beauty_services_1793464702979.jpg'
    ],
    description: 'سالن زیبایی سطح یک با کادر بین‌المللی. ارائه‌دهنده تکنیک‌های روز میکاپ عروس، بالیاژ تلفیقی و اکستنشن طبیعی مو.',
    workingHours: 'همه روزه ۱۰:۰۰ الی ۲۰:۰۰ (جمعه‌ها با هماهنگی قبلی)',
    openingHour: '10:00',
    closingHour: '20:00',
    workingDays: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه'],
    featuredServices: ['میکاپ عروس VIP', 'رنگ و آمبره مو', 'اکستنشن لیزری', 'خدمات زیبایی در منزل'],
    services: [
      {
        id: 'srv-301',
        name: 'کوتاهی مدرن لیر و استایلینگ',
        category: 'کوتاهی و اصلاح مو',
        price: 550000,
        priceFormatted: '۵۵۰,۰۰۰ تومان',
        durationMinutes: 45,
        homeServiceAvailable: true,
        homeServiceFeeExtra: 250000,
        description: 'کوتاهی بر اساس ساختار جمجمه و تار مو'
      },
      {
        id: 'srv-302',
        name: 'آمبره و کالرمِلتینگ فرانسوی',
        category: 'رنگ، مش و لایت',
        price: 3200000,
        priceFormatted: '۳,۲۰۰,۰۰۰ تومان',
        durationMinutes: 210,
        homeServiceAvailable: false,
        description: 'سایه‌روشن ظریف با رنگ‌های ارگانیک لورآل'
      },
      {
        id: 'srv-303',
        name: 'میکاپ مجلسی لوکس با متریال شارلوت تیلبری',
        category: 'میکاپ',
        price: 2100000,
        priceFormatted: '۲,۱۰۰,۰۰۰ تومان',
        durationMinutes: 75,
        homeServiceAvailable: true,
        homeServiceFeeExtra: 300000,
        description: 'ماندگاری ۴۸ ساعته با مژه‌سازی تخصصی'
      }
    ],
    portfolio: [
      {
        id: 'port-301',
        title: 'آمبره مو روی موی بلوند دودی',
        category: 'رنگ، مش و لایت',
        imageUrl: '/src/assets/images/hero_salon_luxury_1793464702288.jpg',
        description: 'ترکیب دودی زیتونی با تناژ خنثی',
        serviceId: 'srv-302'
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
    ownerName: 'آرتین یغمایی',
    ownerAvatar: '/src/assets/images/men_grooming_services_1793464703155.jpg',
    slogan: 'استاندارد جهانی پیرایش در شمال تهران',
    gender: 'men',
    city: 'تهران',
    district: 'جردن',
    address: 'تهران، جردن (نلسون ماندلا)، بالاتر از پل میرداماد، برج سایه',
    phone: '۰۲۱۸۸۶۷۹۹۴۰',
    latitude: 35.7650,
    longitude: 51.4210,
    rating: 4.7,
    reviewsCount: 54,
    priceLevel: 'لوکس',
    priceRangeText: '۲۸۰,۰۰۰ الی ۱,۵۰۰,۰۰۰ تومان',
    hasHomeService: true,
    homeServiceFee: 200000,
    imageUrl: '/src/assets/images/men_grooming_services_1793464703155.jpg',
    galleryImages: [
      '/src/assets/images/men_grooming_services_1793464703155.jpg',
      '/src/assets/images/hero_salon_luxury_1793464702288.jpg'
    ],
    description: 'آرایشگاه مدرن مردانه با فضای اختصاصی، خدمات هیرکات به سبک لندنی، فیشیال پوست با اسکین‌اسکرابر و نوبت‌دهی منظم.',
    workingHours: 'شنبه تا پنجشنبه ۹:۳۰ الی ۲۱:۳۰',
    openingHour: '09:30',
    closingHour: '21:30',
    workingDays: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه'],
    featuredServices: ['هیرکات فرمول وان', 'فیشیال پاکسازی تخصصی', 'فرم‌دهی ریش ایتالیایی', 'اعزام به محل'],
    services: [
      {
        id: 'srv-401',
        name: 'هیرکات اختصاصی و استایلینگ سر',
        category: 'کوتاهی مو',
        price: 280000,
        priceFormatted: '۲۸۰,۰۰۰ تومان',
        durationMinutes: 40,
        homeServiceAvailable: true,
        homeServiceFeeExtra: 200000,
        description: 'اصلاح با تفکیک زاویه و شستشو با شامپوی تقویتی'
      },
      {
        id: 'srv-402',
        name: 'پاکسازی و لایه‌برداری پوست صورت',
        category: 'پاکسازی و مراقبت پوست',
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
        category: 'کوتاهی مو',
        imageUrl: '/src/assets/images/men_grooming_services_1793464703155.jpg',
        description: 'مدل موی ترند متناسب چهره‌های مربعی',
        serviceId: 'srv-401'
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
    ownerName: 'نگار فتاحی',
    ownerAvatar: '/src/assets/images/women_beauty_services_1793464702979.jpg',
    slogan: 'ظرافت نصف جهان در تلفیق مدرنیته و سنت',
    gender: 'women',
    city: 'اصفهان',
    district: 'مرداویج',
    address: 'اصفهان، مرداویج، خیابان شیخ کلینی، نبش کوچه رسالت',
    phone: '۰۳۱۳۶۶۹۱۱۰۰',
    latitude: 32.6180,
    longitude: 51.6680,
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
    openingHour: '09:00',
    closingHour: '19:30',
    workingDays: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه'],
    featuredServices: ['رنگ و مش کلاهی و فویلی', 'میکاپ لایت', 'کوتاهی مو با موزر و قیچی', 'خدمات در منزل'],
    services: [
      {
        id: 'srv-501',
        name: 'کوپ تخصصی و براشینگ مجلسی',
        category: 'کوتاهی و اصلاح مو',
        price: 320000,
        priceFormatted: '۳۲۰,۰۰۰ تومان',
        durationMinutes: 40,
        homeServiceAvailable: true,
        homeServiceFeeExtra: 120000,
        description: 'کوپ‌های فانتزی و کلاسیک با قیچی‌های الماسی'
      },
      {
        id: 'srv-502',
        name: 'رنگساژ و تکنیک فیس‌فریم مو',
        category: 'رنگ، مش و لایت',
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
        category: 'رنگ، مش و لایت',
        imageUrl: '/src/assets/images/women_beauty_services_1793464702979.jpg',
        description: 'تکنیک ملایم بدون آسیب به ریشه مو',
        serviceId: 'srv-502'
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
    ownerName: 'پژمان رضایی',
    ownerAvatar: '/src/assets/images/men_grooming_services_1793464703155.jpg',
    slogan: 'کیفیت بالا، نرخ منصفانه و اصالت',
    gender: 'men',
    city: 'شیراز',
    district: 'قصردشت',
    address: 'شیراز، خیابان قصردشت، نبش کوچه ۵۴، مجتمع پلاتین',
    phone: '۰۷۱۳۶۲۸۹۴۲۰',
    latitude: 29.6380,
    longitude: 52.5110,
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
    openingHour: '09:00',
    closingHour: '22:00',
    workingDays: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'],
    featuredServices: ['اصلاح سر استاندارد', 'اصلاح ریش با ژیلت و فوم', 'کراتینه و نرم‌کنندگی مو'],
    services: [
      {
        id: 'srv-601',
        name: 'اصلاح سر و سشوار فرم‌دهی',
        category: 'کوتاهی مو',
        price: 130000,
        priceFormatted: '۱۳۰,۰۰۰ تومان',
        durationMinutes: 30,
        homeServiceAvailable: false,
        description: 'کوتاهی ساده، کلاسیک یا اداری به همراه فرم‌دهی'
      },
      {
        id: 'srv-602',
        name: 'اصلاح و آنکادر ریش با روغن خنک‌کننده',
        category: 'اصلاح و مرتب‌سازی ریش',
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
        category: 'کوتاهی مو',
        imageUrl: '/src/assets/images/men_grooming_services_1793464703155.jpg',
        description: 'مدل تمیز، مرتب و متناسب جلسات رسمی',
        serviceId: 'srv-601'
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
    ownerName: 'پرنیان حسینی',
    ownerAvatar: '/src/assets/images/women_beauty_services_1793464702979.jpg',
    slogan: 'درخشش شما، تخصص بی‌پایان ماست',
    gender: 'women',
    city: 'مشهد',
    district: 'احمدآباد',
    address: 'مشهد، احمدآباد، بلوار بعثت، نبش بعثت ۶',
    phone: '۰۵۱۳۸۴۱۷۰۰۲',
    latitude: 36.3050,
    longitude: 59.5780,
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
    openingHour: '09:30',
    closingHour: '20:00',
    workingDays: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه'],
    featuredServices: ['شینیون و استایل مواج', 'پاکسازی پوست درمااف', 'بافت مو فانتزی', 'خدمات در منزل'],
    services: [
      {
        id: 'srv-701',
        name: 'شینیون خطی و کلاسیک مجلسی',
        category: 'شینیون و براشینگ',
        price: 650000,
        priceFormatted: '۶۵۰,۰۰۰ تومان',
        durationMinutes: 60,
        homeServiceAvailable: true,
        homeServiceFeeExtra: 140000,
        description: 'شینیون بادوام و مقاوم در برابر رطوبت و تعریق'
      },
      {
        id: 'srv-702',
        name: 'بافت مکزیکی و بافت فرانسوی با موی اضافه',
        category: 'کوتاهی و اصلاح مو',
        price: 450000,
        priceFormatted: '۴۵۰,۰۰۰ تومان',
        durationMinutes: 90,
        homeServiceAvailable: true,
        homeServiceFeeExtra: 140000,
        description: 'بافت یکدست بدون کشیدگی پوست سر'
      }
    ],
    portfolio: [
      {
        id: 'port-701',
        title: 'شینیون مواج شیک',
        category: 'شینیون و براشینگ',
        imageUrl: '/src/assets/images/women_beauty_services_1793464702979.jpg',
        description: 'استایل پرطرفدار همراه با سنجاق‌های مرواریدی',
        serviceId: 'srv-701'
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
    ownerName: 'آیدین نوبری',
    ownerAvatar: '/src/assets/images/men_grooming_services_1793464703155.jpg',
    slogan: 'هنر هیرکات اروپایی با دقت خطوط تبریزی',
    gender: 'men',
    city: 'تبریز',
    district: 'ولیعصر',
    address: 'تبریز، کوی ولیعصر، خیابان فروغی، مجتمع آیدین',
    phone: '۰۴۱۳۳۳۲۱۱۸۰',
    latitude: 38.0750,
    longitude: 46.3620,
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
    openingHour: '10:00',
    closingHour: '22:00',
    workingDays: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه'],
    featuredServices: ['کوتاهی مو با متد روز', 'پاکسازی پوست گیاهی', 'اصلاح ریش فرم‌دار', 'پیرایش در منزل'],
    services: [
      {
        id: 'srv-801',
        name: 'کوتاهی مو و لایه‌برداری ملایم پوست',
        category: 'کوتاهی مو',
        price: 220000,
        priceFormatted: '۲۲۰,۰۰۰ تومان',
        durationMinutes: 40,
        homeServiceAvailable: true,
        homeServiceFeeExtra: 110000,
        description: 'اصلاح با تجهیزات ضدعفونی‌شده و اسکراب پوست'
      }
    ],
    portfolio: [
      {
        id: 'port-801',
        title: 'فید مخملی تبریزی',
        category: 'کوتاهی مو',
        imageUrl: '/src/assets/images/men_grooming_services_1793464703155.jpg',
        description: 'خطوط تمیز و محو متناسب با فیس آقایان',
        serviceId: 'srv-801'
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
    date: '2026-11-10',
    timeSlot: '16:00 - 17:00',
    durationMinutes: 45,
    notes: 'نوبت عصر ترجیحا',
    status: 'pending',
    createdAt: '۱۴۰۳/۰۸/۲۹',
    reminderEnabled: true
  },
  {
    id: 'book-2',
    trackingCode: 'ZB-92104',
    salonId: 'salon-2',
    salonName: 'استودیو پیرایش آقایان نوبل',
    serviceId: 'srv-201',
    serviceName: 'کوتاهی مو و هیرکات مدرن',
    price: 290000,
    homeFee: 100000,
    serviceType: 'at_home',
    customerName: 'رضا میرجلیلی',
    customerPhone: '09139876543',
    customerAddress: 'یزد، صفائیه، میدان اطلسی، کوچه شهید مطهری، پلاک ۱۸',
    addressDetail: {
      province: 'یزد',
      city: 'یزد',
      address: 'صفائیه، میدان اطلسی، کوچه شهید مطهری',
      plaque: '۱۸',
      unit: '۲',
      notes: 'درب سفید رنگ، زنگ دوم',
      lat: 31.845,
      lng: 54.358
    },
    date: '2026-11-12',
    timeSlot: '11:00 - 12:00',
    durationMinutes: 30,
    notes: 'برای پدربزرگ با سابقه جراحی زانو',
    status: 'approved',
    createdAt: '۱۴۰۳/۰۸/۲۸',
    reminderEnabled: true
  },
  // Additional past booking to enable revisit suggestion calculation:
  {
    id: 'book-3',
    trackingCode: 'ZB-73110',
    salonId: 'salon-2',
    salonName: 'استودیو پیرایش آقایان نوبل',
    serviceId: 'srv-201',
    serviceName: 'کوتاهی مو و هیرکات مدرن',
    price: 190000,
    serviceType: 'in_salon',
    customerName: 'رضا میرجلیلی',
    customerPhone: '09139876543',
    date: '2026-10-25',
    timeSlot: '18:00 - 19:00',
    durationMinutes: 30,
    status: 'completed',
    createdAt: '۱۴۰۳/۰۸/۰۴',
    reminderEnabled: false
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

export const WOMEN_SERVICE_CATEGORIES = [
  'همه خدمات',
  'کوتاهی و اصلاح مو',
  'رنگ، مش و لایت',
  'شینیون و براشینگ',
  'میکاپ',
  'خدمات ناخن',
  'ابرو و مژه',
  'خدمات مراقبت و زیبایی پوست'
];

export const MEN_SERVICE_CATEGORIES = [
  'همه خدمات',
  'کوتاهی مو',
  'اصلاح و مرتب‌سازی ریش',
  'اصلاح مو و ریش',
  'رنگ مو',
  'پاکسازی و مراقبت پوست',
  'خدمات تخصصی مو',
  'خدمات داماد'
];

export const SERVICE_CATEGORIES = [
  'همه خدمات',
  'کوتاهی و استایل',
  'کوتاهی و اصلاح مو',
  'کوتاهی مو',
  'رنگ، مش و لایت',
  'رنگ مو',
  'میکاپ',
  'شینیون و براشینگ',
  'اصلاح و مرتب‌سازی ریش',
  'اصلاح مو و ریش',
  'خدمات ناخن',
  'ابرو و مژه',
  'پاکسازی و مراقبت پوست',
  'خدمات تخصصی مو',
  'خدمات داماد'
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

// User default simulated position (e.g. Center of Yazd/Safaiyeh)
export const DEFAULT_USER_LOCATION = {
  lat: 31.8600,
  lng: 54.3600,
  city: 'یزد',
  district: 'صفائیه'
};

// Haversine distance calculator in KM
export function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

// Estimate travel times
export function estimateTravelTimes(distanceKm: number): { carMinutes: number; walkMinutes: number } {
  // Average urban car speed ~25 km/h
  const carMinutes = Math.max(3, Math.round((distanceKm / 25) * 60));
  // Average walking speed ~4.5 km/h
  const walkMinutes = Math.max(5, Math.round((distanceKm / 4.5) * 60));
  return { carMinutes, walkMinutes };
}
