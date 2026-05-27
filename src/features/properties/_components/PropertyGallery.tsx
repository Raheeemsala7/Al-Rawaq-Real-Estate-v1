"use client"
import { useState } from "react";
import { CameraIcon, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Dialog, DialogContent } from "@/shared/components/ui/dialog";
import Image from "next/image";

interface PropertyImage {
    path: string;
    relativePath: string;
}

interface PropertyGalleryProps {
    images: PropertyImage[];
}

export const PropertyGallery = ({ images }: PropertyGalleryProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalIndex, setModalIndex] = useState(0);


    const nextModalImage = () => {
        setModalIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const prevModalImage = () => {
        setModalIndex((prev) => (prev + 1) % images.length);
    };

    const openModal = (index: number) => {
        setModalIndex(index);
        setIsModalOpen(true);
    };

    console.log("IIIIIII", images)

    return (
        <div className="relative w-full">


            <div className="grid grid-cols-3 grid-rows-2 gap-2 h-[36rem]">
                <div className="relative col-span-2 row-span-2 size-full" >
                    <Image
                        src={images[0].path}
                        alt=""
                        fill
                        className="object-cover rounded-lg h-full"
                        onClick={() => openModal(0)}
                    />
                    <span className="absolute left-4 bottom-2 bg-white py-1 px-2 rounded-lg flex gap-0.5 items-center">
                        <CameraIcon className="size-4" />
                        <span className="font-semibold">{images.length}</span>
                    </span>
                </div>

                {images[1] && (
                    <div className="relative size-full ">
                        <Image
                            src={images[1].path}
                            alt=""
                            fill
                            className="object-cover rounded-lg"
                            onClick={() => openModal(1)}
                        />
                    </div>
                )}
                {images[1] && (
                    <div className="relative size-full ">
                        <Image
                            src={images[2].path}
                            alt=""
                            fill
                            className="object-cover rounded-lg"
                            onClick={() => openModal(2)}
                        />
                    </div>
                )}
            </div>


            {/* Image Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="max-w-full !w-full h-[95vh] p-0 bg-black/95 border-none" style={{ maxWidth: '100%' }}>
                    <div className="relative w-full h-full flex flex-col">
                        {/* Close Button */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-4 left-4 z-50 text-white hover:bg-white/20 rounded-full"
                            onClick={() => setIsModalOpen(false)}
                        >
                            <X className="h-6 w-6" />
                        </Button>

                        {/* Main Image Container */}
                        <div className="flex-1 flex items-center justify-center p-4 pb-0">
                            <div className="relative w-full h-full  max-h-[calc(100vh-250px)]">
                                <img
                                    src={images[modalIndex]?.path}
                                    alt={`Property view ${modalIndex + 1}`}
                                    className="w-full h-full object-contain"
                                />

                                {/* Navigation Arrows */}
                                {images.length > 1 && (
                                    <>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 rounded-full"
                                            onClick={prevModalImage}
                                        >
                                            <ChevronLeft className="h-6 w-6" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 rounded-full"
                                            onClick={nextModalImage}
                                        >
                                            <ChevronRight className="h-6 w-6" />
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Image Counter */}
                        <div className="text-center py-4">
                            <span className="text-white text-lg font-medium">
                                {modalIndex + 1}/{images.length}
                            </span>
                        </div>

                        {/* Thumbnails Strip */}
                        {images.length > 1 && (
                            <div className="relative bg-black/50 px-4 py-6">
                                <div className="flex items-center justify-center gap-3 overflow-x-auto scrollbar-hide max-w-6xl mx-auto">
                                    {/* Left Arrow for Thumbnails */}
                                    {images.length > 8 && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="flex-shrink-0 text-white bg-white/10 hover:bg-white/20 rounded-full"
                                            onClick={prevModalImage}
                                        >
                                            <ChevronLeft className="h-5 w-5" />
                                        </Button>
                                    )}

                                    {/* Thumbnails */}
                                    <div className="flex gap-3 overflow-x-auto scrollbar-hide">
                                        {images.map((image, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setModalIndex(index)}
                                                className={`relative flex-shrink-0 w-24 h-16 overflow-hidden rounded-lg transition-all ${index === modalIndex
                                                    ? "ring-2 ring-primary ring-offset-2 ring-offset-black opacity-100"
                                                    : "opacity-50 hover:opacity-80"
                                                    }`}
                                            >
                                                <img
                                                    src={image.path}
                                                    alt={`Thumbnail ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>

                                    {/* Right Arrow for Thumbnails */}
                                    {images.length > 8 && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="flex-shrink-0 text-white bg-white/10 hover:bg-white/20 rounded-full"
                                            onClick={nextModalImage}
                                        >
                                            <ChevronRight className="h-5 w-5" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};
