import { ArrowLeft } from 'lucide-react'
import React from 'react'
import ShapeIogo from '../../../public/assets/icons/ShapeIogo'
import { Link } from '@/i18n/navigation'

const ConsultationSec = () => {
    return (
        <section className='py-20 '>
            <div className="max-w-7xl relative h-full mx-auto px-4">
                <div className="flex items-start justify-between gap-5 flex-col sm:flex-row">
                    <div className='space-y-6'>
                        <h6 className='text-3xl'>دعنا نساعدك عن طريق استشارة أحد خبرائنا!</h6>
                        <Link href={"/contact"} className='w-fit flex gap-3 items-center py-4 px-8 rounded-full bg-gradient-to-b from-[#A89989] to-[#7D6D5E] text-white'>
                            <span>جميع المستشارين</span>
                            <ArrowLeft className='size-4' />
                        </Link>
                    </div>
                    <p className='text-[#8B8D98] font-medium text-lg'>من بيع وشراء إلى الإيجار وإدارة الممتلكات، الرِّواق للعقّار هو شريكك الموثوق في كل ما يخصّ العقارات، بخبرة محلية وخدمة ترافقك في كل خطوة.</p>

                    <div>
                        <ShapeIogo />
                    </div>
                </div>
            </div>
        </section>

    )
}

export default ConsultationSec