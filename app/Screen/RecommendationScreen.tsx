'use client';
import Image from "next/image";
import React, { useState } from "react";
import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
//import { Viewer, Worker, ScrollMode } from '@react-pdf-viewer/core';
// import '@react-pdf-viewer/core/lib/styles/index.css';


const RecommendationScreen = () => {
   const [isOpen, setIsOpen] = useState(false);
   
   const open = () => {
      setIsOpen(true);
   }

   const close = () =>{
      setIsOpen(false)
   }
   
   return(
        <div className=" pb-20">
             <h2 className="text-white uppercase text-3xl mt-20 mb-12 font-bold drop-shadow-lg text-center">
                What My Colleagues Say
             </h2>
             <div>
                <div className=" container px-6 text-justify w-10/12 rounded-xl text-slate-200 bg-slate-800 bg-opacity-30 drop-shadow-2xl shadow-lg ring-1 ring-white py-6 hover:ring-8 hover:ring-blue-900/[0.8] duration-700 transition">
                 <article className=" border-b-2 border-slate-200 pb-6 flex flex-col">
                   <Image 
                     src="/quotes.png"
                     width={40}
                     height={40}
                     className=" object-cover"
                     alt="quotes"/>
                     <span className="italic tracking-wider indent-16 text-sm">
                     I had the pleasure of working with Ju Ju @ Kumari in the Business Development Department at Nordic Group Ltd for nearly two years.
                    During our time together, One of the Nordic Group youngest team members with a strong passion. She is always interested in learning new things, Never be afraid to set high standards for herself and others, 
                    and to encourage others to achieve good results. 
                    Ju Ju @ Kumari was a successful, easy-to-manage associate who always went above and beyond to meet deadlines with a positive attitude.
                    She leans toward participating in prospective opportunities with various parties. She is also a highly responsible and accountable person for her own and others. 
                    Always willing to take opinions and advice from superiors. She was promoted as permanent staff after the probation period, and successfully managed more than 20+ international and domestic vendors such as MAERSK, EVERGREEN, ONE, K+N, Rhenus Logistics, DB Schenker 
                    Bollore Logistics etc. Aside from her daily procurement duties, she also assists in Freight Sales with both international and domestic clients G-Link Freight, Pho La Min Group, Pioneer Logistics, SCAN Logistics, etc... 
                    With her dedication and hard work, our Freight Service monthly sales revenue increased to $250,000 USD during the COVID19 and Military coup.
                     </span>
                     
                 </article>
                 <div className=" flex flex-row justify-end text-right pt-3">
                
                    <a href="https://www.linkedin.com/in/zay-yar-myo-simon/">
                    <div className=" text-lg font-semibold"> ZAY YAR MYO SIMON </div>
                    <small className=" text-sm"> Business Development Manager at Nordic Group Ltd. Co-Founder at Shwe Wala Business Group. </small>
                    </a>
                 </div>
                    
                </div>
             </div>
             <div className="mt-10">
             <div>
                <div className=" container px-6 text-justify w-10/12 rounded-xl text-slate-200 bg-slate-800 bg-opacity-30 drop-shadow-2xl shadow-lg ring-1 ring-white py-6 hover:ring-8 hover:ring-blue-900/[0.8] duration-700 transition">
                 <article className=" border-b-2 border-slate-200 pb-6 flex flex-col">
                   <Image 
                     src="/quotes.png"
                     width={40}
                     height={40}
                     className=" object-cover"
                     alt="quotes"/>
                     <span className="italic tracking-wider indent-16 text-sm">
                     I am writing to highly recommend Ms. Kumari Kadial @Juju, who has been an exceptional member of our
team at NORDIC Group Limited for the past three and a half years. During her tenure with us, she has
consistently demonstrated a remarkable level of proactivity, dedication, and professional growth.
Ms. Kumari Kadial began her career with us as a Procurement Associate. In this role, she displayed an
excellent eye for detail and a thorough understanding of document management processes. Her
organizational skills and precision were instrumental in ensuring the accuracy and compliance of our
documentation .....
                     </span>
                     <div className="flex justify-end">
                     <Button  onClick={()=>open()}className="px-3 py-2 text-sm rounded-2xl bg-slate-100 text-slate-800 w-fit mt-2">
                        View Detail
                    </Button>
                     </div>
                   
                 </article>
                 <div className=" flex flex-row justify-end text-right pt-3">
                
                    <a href="https://www.linkedin.com/in/zay-yar-myo-simon/">
                    <div className=" text-lg font-semibold"> Phyoe Wai Khant </div>
                    <small className=" text-sm"> Business Development Manager at Nordic Group Ltd.</small>
                    </a>
                 </div>
                    
                </div>
             </div>
              
             </div>

             <Dialog open={isOpen} as="div" className="relative  z-50 focus:outline-none " onClose={close}>
                     <div className="fixed inset-0 z-10 overflow-y-auto">
                       <div className="flex min-h-full items-center justify-center p-4">
                         <DialogPanel
                           transition
                           className="w-full max-w-xl ring-2 ring-white rounded-xl bg-white/10  backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                         >
                       
                               <>
                               {/* <DialogTitle as="h3" className="text-base/7 px-6 py-3 font-medium text-white">
                                 Ko Phyoe's Recommendation
                               </DialogTitle> */}
                              
                               <div style={{ height: '550px',  }}>
                                 {/* <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                                   <Viewer fileUrl="/recommend.pdf" scrollMode={ScrollMode.Vertical}/>
                                 </Worker> */}
                               </div>
                               </>
                              
                       
                         
                         </DialogPanel>
                       </div>
                     </div>
                   </Dialog>
        </div>
    )
}

export default RecommendationScreen;