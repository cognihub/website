import { useRef, useEffect, useState } from 'react';

function useWindowSize() {
    const [width, setWidth] = useState(9999)
    const [height, setHeight] = useState(9999)

    const handleWindowResize = () => {
        setWidth(window.innerWidth)
        setHeight(window.innerHeight)
    }

    useEffect(() => {
        handleWindowResize()
        window.addEventListener('resize', handleWindowResize)
        return () => window.removeEventListener('resize', handleWindowResize)
    }, [])

    return { width, height }
}

export function useScaleSvg(initialSize) {
    const screenSize = useWindowSize()

    let scaledWidth

    if (screenSize.width > 1400) scaledWidth = initialSize
    else if (screenSize.width > 500) scaledWidth = initialSize * 1.5
    else scaledWidth = initialSize * 1.5

    return scaledWidth
}

export function useScaleSvgPathToSvgWidth() {
    const svgRef = useRef(null);
    const [viewBox, setViewBox] = useState('0 0 0 0');

    useEffect(() => {
        const svgElement = svgRef.current;
        if (svgElement) {
            const bbox = svgElement.getBBox();
            setViewBox(`${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`);
        }
    }, []);

    return { svgRef, viewBox }
}

export function useNumberOfParticles() {
    const screenSize = useWindowSize()

    if (screenSize.width > 1700) return 48
    if (screenSize.width > 1100) return 30
    if (screenSize.width > 600) return 20
    return 15
}
