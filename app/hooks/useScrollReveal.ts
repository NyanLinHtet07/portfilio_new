"use client";

import { useEffect, useRef } from 'react';

export const useScrollReveal = (threshold = 0.1) => {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    element.classList.add('revealed');
                }
            },
            {
                threshold,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        observer.observe(element);

        return () => {
            observer.unobserve(element);
        };
    }, [threshold]);

    return ref;
};

