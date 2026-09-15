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


    return (
        <div className="relative w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-2 h-64 md:h-[36rem]">
                <div className="relative col-span-1 md:col-span-2 md:row-span-2 size-full" >
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
                    <div className="relative size-full hidden md:block">
                        <Image
                            src={images[1].path}
                            alt=""
                            fill
                            className="object-cover rounded-lg"
                            onClick={() => openModal(1)}
                        />
                    </div>
                )}
                {images[2] && (
                    <div className="relative size-full hidden md:block">
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
                <DialogContent className="max-w-full w-full h-full sm:h-[95vh] p-0 bg-black/95 border-none flex flex-col" style={{ maxWidth: '100%' }}>
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
                    <div className="flex-1 relative w-full min-h-0 flex items-center justify-center p-0 sm:p-8 mt-16 sm:mt-0">
                        <img
                            src={images[modalIndex]?.path}
                            alt={`Property view ${modalIndex + 1}`}
                            className="max-w-full max-h-full object-contain"
                        />

                        {/* Navigation Arrows */}
                        {images.length > 1 && (
                            <>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 rounded-full z-10"
                                    onClick={prevModalImage}
                                >
                                    <ChevronLeft className="h-8 w-8" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 rounded-full z-10"
                                    onClick={nextModalImage}
                                >
                                    <ChevronRight className="h-8 w-8" />
                                </Button>
                            </>
                        )}
                    </div>

                    {/* Image Counter */}
                    <div className="text-center py-2 shrink-0">
                        <span className="text-white text-base sm:text-lg font-medium">
                            {modalIndex + 1} / {images.length}
                        </span>
                    </div>

                    {/* Thumbnails Strip */}
                    {images.length > 1 && (
                        <div className="relative bg-black/60 px-4 py-4 shrink-0 pb-8 sm:pb-4">
                            <div className="flex items-center justify-center gap-3 overflow-x-auto scrollbar-hide max-w-6xl mx-auto">
                                {/* Left Arrow for Thumbnails */}
                                {images.length > 8 && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="flex-shrink-0 text-white bg-white/10 hover:bg-white/20 rounded-full hidden sm:flex"
                                        onClick={prevModalImage}
                                    >
                                        <ChevronLeft className="h-5 w-5" />
                                    </Button>
                                )}

                                {/* Thumbnails */}
                                <div className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide">
                                    {images.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setModalIndex(index)}
                                            className={`relative flex-shrink-0 w-16 h-12 sm:w-24 sm:h-16 overflow-hidden rounded-lg transition-all ${index === modalIndex
                                                ? "ring-2 ring-primary ring-offset-1 ring-offset-black opacity-100"
                                                : "opacity-40 hover:opacity-100"
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
                                        className="flex-shrink-0 text-white bg-white/10 hover:bg-white/20 rounded-full hidden sm:flex"
                                        onClick={nextModalImage}
                                    >
                                        <ChevronRight className="h-5 w-5" />
                                    </Button>
                                )}
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};
