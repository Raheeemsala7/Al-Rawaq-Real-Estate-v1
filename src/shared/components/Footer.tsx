import { Link } from '@/i18n/navigation'
import { ArrowUp } from 'lucide-react'
import React from 'react'

const Footer = () => {
    return (
        <footer className="py-12" >
            <div className="max-w-7xl mx-auto px-4 ">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">


                    {/* Column 2: Our Services */}
                    <div>
                        <h6 className="font-semibold mb-4 text-[#8B8D98]">خدماتنا</h6>
                        <ul className="space-y-3 text-[#302D2B] font-medium">
                            <li><Link href="#" className="hover:text-gray-900 transition-colors">الوساطة العقارية</Link></li>
                            <li><Link href="#" className="hover:text-gray-900 transition-colors">التسيير العقاري</Link></li>
                            <li><Link href="#" className="hover:text-gray-900 transition-colors">الاصلاح والأعمال الرقمية</Link></li>
                            <li><Link href="#" className="hover:text-gray-900 transition-colors">الاستشارات العقارية</Link></li>
                            <li><Link href="#" className="hover:text-gray-900 transition-colors">أعمال البناء</Link></li>
                            <li><Link href="#" className="hover:text-gray-900 transition-colors">الإيجار العقاري</Link></li>
                            <li><Link href="#" className="hover:text-gray-900 transition-colors">البيع والوكالة</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Important Links */}
                    <div>
                        <h6 className="font-semibold mb-4 text-[#8B8D98]">روابط مهمة</h6>
                        <ul className="space-y-3 text-[#302D2B] font-medium">
                            <li><Link href="#" className="hover:text-gray-900 transition-colors">الصفحة الرئيسية</Link></li>
                            <li><Link href="#" className="hover:text-gray-900 transition-colors">من نحن</Link></li>
                            <li><Link href="#" className="hover:text-gray-900 transition-colors">خدماتنا</Link></li>
                            <li><Link href="#" className="hover:text-gray-900 transition-colors">الاستشارات</Link></li>
                            <li><Link href="#" className="hover:text-gray-900 transition-colors">مستشارونا</Link></li>
                            <li><Link href="#" className="hover:text-gray-900 transition-colors">سياسة الخصوصية</Link></li>
                            <li><Link href="#" className="hover:text-gray-900 transition-colors">اتصل بنا</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Contact Us */}
                    <div>
                        <h6 className="font-semibold mb-4 text-[#8B8D98]">تواصل معنا</h6>
                        <div className="space-y-3 text-[#302D2B] font-medium">
                            <p>ساحة الدمام، 169، الدوحة، قطر</p>
                            <p>+ 967 859 66 55</p>
                            <p>+ 967 859 446 9</p>
                            <p>support@agency.com</p>
                            <p>واتساب: +967 885 967 226</p>
                        </div>
                    </div>

                    {/* Column 4: Back to Top */}
                    <div className="flex items-start justify-end">
                        <button aria-label="Back to top" className="w-14 h-14 flex items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 hover:bg-gray-200 transition-colors duration-300">
                            <ArrowUp />
                        </button>
                    </div>
                </div>

                <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row-reverse justify-between items-center">
                    <div className="flex space-x-4  order-1 md:order-1">
                        {/* <Link href="#" className="text-gray-400 hover:text-[#8B8D98] transition-colors">
                            <Facebook />
                        </Link>
                        <Link href="#" className="text-gray-400 hover:text-[#8B8D98] transition-colors">
                            <Instagram />
                        </Link>
                        <Link href="#" className="text-gray-400 hover:text-[#8B8D98] transition-colors">
                            <Linkedin />
                        </Link> */}
                    </div>
                    <p className="text-gray-500 text-sm order-2 md:order-2 mt-4 md:mt-0 font-medium">
                        الرواق العقارية 2025 - جميع الحقوق محفوظة
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer