"use client";

import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-cards';

import { EffectCards } from "swiper/modules";

import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { IconBuildingBank, IconClock, IconAward, IconArrowGuide } from "@tabler/icons-react";



interface bookItem {
    id: number,
    dip: string,
    dipDetail: string,
    university: string,
    duration: string,
    note: null | string,
    img: string
}

const EduScreen = () => {
    const [openImg, setImg] = useState('');
    let [isOpen, setIsOpen] = useState(false);
    let [item, setItem] = useState('');

    let [bookItemData, setBookItem] = useState<bookItem | null>(null);
    let [flippedPages, setFlippedPages] = useState<number[]>([]);
    let [isBookOpen, setBookOpen] = useState(false);

    const togglePageFlip = (pageIndex: number) => {
        setFlippedPages((prevFlipped) =>
            prevFlipped.includes(pageIndex)
                ? prevFlipped.filter((index) => index !== pageIndex)
                : [...prevFlipped, pageIndex]
        )
    }

    function openBook(item: bookItem) {
        setBookOpen(true);
        setBookItem(item);
        setFlippedPages([1]);
    }

    function closeBook() {
        setBookOpen(false)
        setFlippedPages([]);
    }



    function close() {
        setIsOpen(false);
    }

    const isPageFlipped = (pageIndex: number) => flippedPages.includes(pageIndex);



    const eduList = [
        { id: 1, dip: "Bachelor of Science", dipDetail: "B.Sc.(Botany)", university: "Taunggyi University", duration: "2014 - 2019", note: null, img: "/certificate.png" },
        { id: 2, dip: "Diploma (US, OSG)", dipDetail: "International Business Management ", university: "Mimber Institute of Management Study", duration: "2020 February - 2020 December", note: null, img: "/certificate.png" },
        { id: 3, dip: "Diploma (UK, NCFE)", dipDetail: "Logistics Materials & Supply Chain Management", university: "Mimber Institute of Management Study", duration: "2022 June - 2022 October", note: "Distinction", img: "/certificate.png" },
        { id: 4, dip: "German Language", dipDetail: "A1, A2 & B1", university: "Gothe Institude", duration: "2022 December - 2024 Present", note: null, img: "/certificate.png" },
        { id: 5, dip: "Certificate", dipDetail: "Cabin Crew Language and Operation", university: "Myanmar Flight Attendent School", duration: "2019", note: null, img: "/certificate.png" },
        { id: 6, dip: "Certificate", dipDetail: "Airline Ticket Reversation", university: "Trust Vocational Institute", duration: "2019", note: null, img: "/certificate.png" },

    ]

    return (
        <>
            <div className=" min-w-0 w-10/12 bg-white drop-shadow-2xl rounded-2xl">
                {/* <Image src='/book.png' width={100} height={100} alt="edu" className=" flex mx-auto mb-5" /> */}



                <div className=" grid grid-cols-6 gap-4 ">
                    <div className=" col-span-2">
                        <Image src='/juju_edu.png' width={350} height={600} alt="edu" className=" mt-20 flex mx-auto items-center justify-center" />

                    </div>
                    <div className=" col-span-4">

                        <Swiper
                            effect={'cards'}
                            grabCursor={true}
                            modules={[EffectCards]}
                            className="mySwiper mt-36"
                            cardsEffect={{
                                perSlideRotate: 18,
                                perSlideOffset: 8,
                                slideShadows: false
                            }}
                        >
                            {
                                eduList?.map((edu, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="flex flex-col justify-between p-2 mb-1 rounded-r-xl border-r-4 border-slate-100 bg-slate-700 text-white h-64 w-44"
                                            key={index}
                                            onClick={() => openBook(edu)}>
                                            <Image
                                                src="/education.png"
                                                alt="Book Cover"
                                                width={50}
                                                height={50}
                                                className="flex mx-auto mt-6"
                                            />
                                            <p className="tracking-tight drop-shadow-xl -mt-10">
                                                <span className="font-semibold italic font-serif text-lg">{edu.dip}</span> <br />
                                                {/* <div dangerouslySetInnerHTML={{ __html: edu.dip }} className="font-semibold italic font-serif text-xl"/> */}
                                                <span className=" italic text-sm font-serif tracking-wider">{edu?.dipDetail}</span>
                                            </p>

                                            <div
                                                className="w-full rounded-lg text-center mx-auto bg-slate-800 py-1 px-3 text-sm font-medium text-slate-100 focus:outline-none hover:text-black data-[hover]:bg-white/70 data-[focus]:outline-1 data-[focus]:outline-white"
                                            >
                                                <IconArrowGuide className=" w-24 text-white flex mx-auto font-bold" />
                                            </div>
                                        </div>

                                    </SwiperSlide>

                                ))
                            }

                        </Swiper>


                        <Dialog open={isBookOpen} as="div" className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClose={close}>
                            <div className="fixed inset-0 z-10 overflow-y-auto" onClick={closeBook} /> {/* This div captures clicks to close the modal */}

                            <DialogPanel className="flex items-center justify-center min-h-screen p-4">
                                {/* Page 1 */}
                                <div
                                    className={`page absolute flex origin-left w-80 h-2/3 transform mx-auto ${isPageFlipped(1) ? 'turn z-10' : 'z-20'
                                        }`}
                                    onClick={() => togglePageFlip(1)}
                                >
                                    <div className={`front flex flex-col justify-between p-2 my-1 rounded-r-xl border-r-4 border-slate-100 bg-slate-700 text-white  h-full absolute right-0 w-full ${isPageFlipped(1) ? 'border-l-4 border-white rounded-l-xl' : 'border-r-4 border-white rounded-r-xl'}`}>

                                        <Image
                                            src="/education.png"
                                            alt="Book Cover"
                                            width={70}
                                            height={70}
                                            className="flex mx-auto mt-6"
                                        />
                                        <p className="tracking-tight drop-shadow-xl -mt-10">
                                            <span className="font-semibold italic font-serif text-xl">{bookItemData?.dip}</span> <br />
                                            <span className=" italic text-lg font-serif tracking-wider">{bookItemData?.dipDetail}</span>
                                        </p>

                                        <div
                                            className="w-full rounded-lg text-center mx-auto bg-slate-800 py-4 px-3 text-sm font-medium text-slate-100 focus:outline-none hover:text-black data-[hover]:bg-white/70 data-[focus]:outline-1 data-[focus]:outline-white"
                                        >
                                            <IconArrowGuide className=" w-24 text-white flex mx-auto font-bold" />
                                        </div>
                                    </div>

                                    <div className={`back font-bold flex flex-col items-start justify-center px-2  bg-gray-800 text-slate-200 h-full absolute w-full ${isPageFlipped(1) ? 'border-l-4 border-white rounded-l-xl' : 'border-r-4 border-white rounded-r-xl'}`}>
                                        <div className="flex items-start">
                                            <IconBuildingBank className="mr-2 " />
                                            <p>{bookItemData?.university}</p>
                                        </div>
                                        <div className="flex  my-3">
                                            < IconClock className=" mr-2" />
                                            <p>{bookItemData?.duration}</p>
                                        </div>
                                        {
                                            bookItemData?.note && (
                                                <div className="flex my-3 ">
                                                    <IconAward className="mr-2" />
                                                    <p>{bookItemData?.note}</p>
                                                </div>
                                            )}
                                    </div>
                                </div>

                                {/* Page 2 */}
                                <div
                                    className={`page absolute flex origin-left w-80 h-2/3 transform ${isPageFlipped(2) ? 'turn z-20' : 'z-10'
                                        }`} // z-20 when flipped, z-10 when not flipped
                                    onClick={() => togglePageFlip(2)}
                                >
                                    <div className={`front text-xl sm:text-3xl md:text-5xl flex items-center justify-start p-3 font-bold bg-gray-900 h-full absolute right-0 w-full ${isPageFlipped(2) ? 'border-l-4 border-white rounded-l-xl' : 'border-r-2 border-white rounded-r-xl'}`}>
                                        <Image src={bookItemData?.img || "/certificate.png"} width={400} height={300} alt="certificate" className="rounded-md drop-shadow-md" />
                                    </div>
                                    <div className={`back text-xl sm:text-3xl md:text-5xl font-bold flex items-center justify-start px-2 sm:px-5 md:px-20 bg-gray-800 h-full absolute w-full ${isPageFlipped(2) ? 'border-l-4 border-white rounded-l-xl' : 'border-r-2 border-white rounded-r-xl'}`}>

                                    </div>
                                </div>
                            </DialogPanel>

                        </Dialog>

                    </div>
                </div>

            </div>


        </>
    );
};

export default EduScreen;
