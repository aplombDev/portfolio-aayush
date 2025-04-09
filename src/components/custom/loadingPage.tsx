"use client";
import React, { forwardRef, useImperativeHandle } from 'react';

type LoadingPageProps = {
    wrapperRef?: React.RefObject<HTMLDivElement | null>;
    containerRef?: React.RefObject<HTMLDivElement | null>;
}

const LoadingPage = forwardRef<HTMLDivElement[], LoadingPageProps>(({ wrapperRef, containerRef }, ref) => {
    const boxesRef = React.useRef<(HTMLDivElement | null)[]>([]);

    useImperativeHandle(ref, () => {
        return boxesRef.current.filter(Boolean) as HTMLDivElement[];
    }, []);

    return (
        <div className='wrapper bg-[#020618]absolute top-0 left-0 w-screen h-screen flex items-center justify-center'
            ref={wrapperRef as React.RefObject<HTMLDivElement>}>
            <div className="container rotate-45 w-23 grid grid-cols-3 gap-x-1 gap-y-1"
                ref={containerRef as React.RefObject<HTMLDivElement>}>
                {new Array(9).fill(undefined).map((_, index) => {
                    return (
                        <div
                            key={index}
                            className='box w-7 h-7 bg-[#65cdef]'
                            ref={(el) => {
                                boxesRef.current[index] = el;
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
});

LoadingPage.displayName = 'LoadingPage';

export default LoadingPage;