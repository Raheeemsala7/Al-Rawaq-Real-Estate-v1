import { ArrowLeft, Quote } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';





interface ReviewItem {
    id: number;
    name: string;
    description: string;
    jobTitle: string;
    image: string;
}

const reviewClients: ReviewItem[] = [
    {
        id: 1,
        name: "وسيم ياسر",
        description: "تجربتي مع وكالة الرواق كانت استثنائية بكل المقاييس. منذ أول اتصال، وجدت فريقًا محترفًا يستمع بدقة لاحتياجاتي ويقدم لي خيارات مدروسة بعناية دون أي ضغط لاتخاذ قرار. شرحوا لي كل التفاصيل عن العقارات المعروضة، من الموقع والخدمات المحيطة وحتى الأسعار المتوقعة في المستقبل، مما ساعدني على اختيار منزل أحلامي في حي هادئ وبسعر منافس. حتى بعد إتمام الصفقة، استمروا في المتابعة والتأكد من أن كل شيء يسير بسلاسة. أنصح أي شخص يبحث عن المصداقية، الأمانة، والخبرة أن يتعامل مع وكالة الرواق.",
        jobTitle: "صاحب عقار",
        image: "assets/imgs/photo-1.jpg",
    },
    {
        id: 2,
        name: "د.أحمد كامل",
        description: "تجربتي مع وكالة الرواق كانت استثنائية بكل المقاييس. منذ أول اتصال، وجدت فريقًا محترفًا يستمع بدقة لاحتياجاتي ويقدم لي خيارات مدروسة بعناية دون أي ضغط لاتخاذ قرار. شرحوا لي كل التفاصيل عن العقارات المعروضة، من الموقع والخدمات المحيطة وحتى الأسعار المتوقعة في المستقبل، مما ساعدني على اختيار منزل أحلامي في حي هادئ وبسعر منافس. حتى بعد إتمام الصفقة، استمروا في المتابعة والتأكد من أن كل شيء يسير بسلاسة. أنصح أي شخص يبحث عن المصداقية، الأمانة، والخبرة أن يتعامل مع وكالة الرواق.",
        jobTitle: "صاحب عقار",
        image: "assets/imgs/photo-2.jpg",
    },
    {
        id: 3,
        name: "كريم عبد الله",
        description: "تجربتي مع وكالة الرواق كانت استثنائية بكل المقاييس. منذ أول اتصال، وجدت فريقًا محترفًا يستمع بدقة لاحتياجاتي ويقدم لي خيارات مدروسة بعناية دون أي ضغط لاتخاذ قرار. شرحوا لي كل التفاصيل عن العقارات المعروضة، من الموقع والخدمات المحيطة وحتى الأسعار المتوقعة في المستقبل، مما ساعدني على اختيار منزل أحلامي في حي هادئ وبسعر منافس. حتى بعد إتمام الصفقة، استمروا في المتابعة والتأكد من أن كل شيء يسير بسلاسة. أنصح أي شخص يبحث عن المصداقية، الأمانة، والخبرة أن يتعامل مع وكالة الرواق.",
        jobTitle: "صاحب عقار",
        image: "assets/imgs/photo-3.jpg",
    },
];

const ReviewsSec = () => {
    return (
        <section className='py-20'>
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col gap-8 md:flex-row md:justify-between">
                    <div className='flex flex-col justify-between flex-1 gap-6'>
                        <div className='space-y-6'>
                            <div className="flex items-center gap-3">
                                <div className="border-2 border-[#817263] w-14"></div>
                                <h3 className="text-lg text-[#817263] font-semibold">أكثر من 15 خبير</h3>
                            </div>
                            <h5 className='text-4xl leading-12 max-w-[345px]'>
                                آراء وتقييمات عملائنا،
                                <span className='font-semibold'> تعكس الاحترافيــة التـــامة.</span>
                            </h5>
                        </div>
                        <Link href={"/contact"} className='w-fit flex gap-3 items-center py-4 px-8 rounded-full bg-gradient-to-b from-[#A89989] to-[#7D6D5E] text-white'>
                            <span>جميع المستشارين</span>
                            <ArrowLeft className='size-4' />
                        </Link>

                    </div>

                    <div className='flex-1'>
                        <Carousel
                            className="relative w-full flex  gap-4 rtl:[direction:ltr] "
                            opts={{
                                align: "start",        // يخلي العناصر تبدأ من اليسار
                                slidesToScroll: 1,     // كام عنصر يتحرك مع كل ضغطة
                            }
                            }
                        >
                            <CarouselContent className='relative !ml-0'>
                                {reviewClients.map((review, index) => (
                                    <CarouselItem key={index} className="basis-1/1">
                                        <ReviewClientCard key={index} review={review} />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <div className='absolute bottom-[27px] left-[36px] flex gap-4 w-36 h-12'>
                                <CarouselPrevious className="static w-12 h-8 p-6 rounded-full border border-[#302D2B] bg-transparent" />
                                <CarouselNext className="static w-12 h-8 p-6 rounded-full border border-[#302D2B] bg-transparent" />
                            </div>
                        </Carousel >
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ReviewsSec



const ReviewClientCard = ({ review: review }: { review: ReviewItem }) => {
    return (
        <Card className='rtl:[direction:rtl] p-0 bg-[#FBF9F7]'>
            <CardContent className='p-4'>
                <span className='p-4'><Quote /></span>

                <div className='space-y-6'>
                    <p className='text-[#8B8D98]'>{review.description}</p>

                    <div className="border-t border-[#8B8D9826]"></div>

                    <div className="flex gap-2 items-center">
                        <Avatar className='size-14'>
                            <AvatarImage src={review.image} alt="@shadcn" />
                            <AvatarFallback>{review.name.split(" ")[0].slice(0, 1) + " " + review.name.split(" ")[1].slice(0, 1)}</AvatarFallback>
                        </Avatar>
                        <div className='space-y-1'>
                            <h6>{review.name}</h6>
                            <p className='text-sm text-[#8B8D98]'>{review.jobTitle}</p >
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}