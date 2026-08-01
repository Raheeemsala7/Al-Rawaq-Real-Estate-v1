"use client"
// import { fadeInUp } from '@/src/shared/lib/constanst'
import { motion } from 'framer-motion'
import Image from 'next/image'
import React from 'react'

// import serivceBg from "/assets/imgs/services-bg.png";
// import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
// import teamMember1 from "/assets/imgs/photo-1.jpg";
// import teamMember2 from "/assets/imgs/photo-2.jpg";
// import teamMember3 from "/assets/imgs/photo-3.jpg";
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { fadeInUp } from '../lib/constant/anmation';


const ServicesSec = () => {
    return (
        <>
            <section className='py-20 bg-[#FBF9F7]'>
                <div className="max-w-7xl mx-auto px-4">

                    <div className='flex justify-between items-center gap-6'>
                        <motion.div className='flex-1 hidden md:block' {...fadeInUp}>
                            <Image src={"/assets/imgs/services-bg.png"} width={864} height={550} alt='service' className='size-full object-contain max-h-[550px] max-w-[864.352294921875px]' />
                        </motion.div>
                        <motion.div className='flex flex-1 flex-col' {...fadeInUp}>
                            <div className="flex gap-3">
                                <div className="flex items-center gap-3">
                                    <div className="border-2 border-[#817263] w-14"></div>
                                    <h3 className="text-lg text-[#817263] font-semibold">أكثر من 15 خبير</h3>
                                </div>
                                <div className="flex gap-1">
                                    <Avatar>
                                        <AvatarImage src={'/assets/imgs/photo-1.jpg'} alt="@shadcn" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <Avatar>
                                        <AvatarImage src={"/assets/imgs/photo-2.jpg"} alt="@shadcn" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <Avatar>
                                        <AvatarImage src={"/assets/imgs/photo-3.jpg"} alt="@shadcn" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </div>
                            </div>
                            <div className='space-y-6'>
                                <h4 className='text-5xl leading-16'>أفضل الخدمات العقارية بين يديك،  <span className='font-semibold'>لاتتردد وخلينا نساعدك!</span></h4>
                                <p className="text-lg font-medium">من بيع وشراء إلى الإيجار وإدارة الممتلكات، الرِّواق للعقّار هو شريكك الموثوق في كل ما يخصّ العقارات، بخبرة محلية وخدمة ترافقك في كل خطوة، اتصل بنا اليوم ودعنا نساعدك في رحلتك العقارية.</p>
                                <Link href={"/contact"} className='w-fit flex gap-3 items-center py-4 px-8 rounded-full bg-gradient-to-b from-[#A89989] to-[#7D6D5E] text-white'>
                                    <span>جميع المستشارين</span>
                                    <ArrowLeft className='size-4' />
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </section>


            <section className='py-20 bg-services h-[80vh] relative'>
                <div className='absolute size-full inset-0 bg-black/30 '></div>
                <div className="max-w-7xl relative h-full mx-auto px-4">
                    <div className='h-full flex flex-col gap-5  sm:flex-row justify-between  '>
                        <div className='space-y-6'>
                            <h5 className='text-white text-3xl leading-12'>عشــان وقتــك مهم،</h5>
                            <h4 className='text-white text-3xl leading-12 font-bold'>ما تضيع ولا دقيـــــــــقة.</h4>
                            <Link href={"/contact"} className='w-fit flex gap-3 items-center py-4 px-8 rounded-full bg-gradient-to-b from-[#A89989] to-[#7D6D5E] text-white'>
                                <span>جميع المستشارين</span>
                                <ArrowLeft className='size-4' />
                            </Link>
                        </div>
                        <div className='bg-[#41414126] backdrop-blur-2xl py-4 px-6 sm:self-end h-fit space-y-6 rounded-2xl'>
                            <span className='text-sm text-white'>أزيد من</span>
                            <div className='space-x-2'>
                                <span className='text-3xl font-semibold text-white '>500</span>
                                <span className='text-white '>استشارة</span>
                            </div>
                            <div className="border-t border-white"></div>
                            <p className="text-white text-base max-w-64">
                                الاستشارات الاحترافية تقلل من الوقت المستهلك في الاجراءات العقارية.
                            </p>
                        </div>
                    </div>
                </div>

            </section>


        </>
    )
}

export default ServicesSec