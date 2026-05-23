import CarouselProperties from "../CarouselProperties"
import { fadeInUp } from "../lib/constant/anmation"
import Animated from "./Animated"

const FeatureProperties = () => {
    return (
        <section className='py-20'>
            <div className="max-w-7xl mx-auto px-4">
                <Animated {...fadeInUp}>
                    <div className='flex flex-col gap-4'>
                        <div className='flex items-center gap-3'>
                            <div className="border-2 border-[#817263] w-14"></div>
                            <h3 className='text-lg text-[#817263] font-semibold'>العقارات</h3>
                        </div>
                        <div className='flex flex-col sm:flex-row  gap-3'>
                            <h4 className='text-4xl text-[#302D2B]'>العقارات المتاحة</h4>
                            <h3 className='text-5xl text-[#302D2B] font-bold'> للبيــع والإيـــجـار</h3>
                        </div>
                    </div>
                </Animated>

                <Animated {...fadeInUp}>
                    <CarouselProperties />
                </Animated>
            </div>
        </section>
    )
}

export default FeatureProperties