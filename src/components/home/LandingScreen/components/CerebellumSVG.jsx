import { useScaleSvgPathToSvgWidth } from '../hooks';

export default function CerebellumLobeSVG() {
    const { svgRef, viewBox } = useScaleSvgPathToSvgWidth()

    return (
        <svg
            ref={svgRef}
            xmlns='http://www.w3.org/2000/svg'
            viewBox={viewBox}
        >
            <path d='M113.8,157.91c12.66-4.17,35.25-16.66,59.15-46.48,24.13-30.11,32.25-56.24,35.21-67.61,4-15.51,8.74-27.87.68-35.57C202.42,2.13,191.69-1.46,164.5,3c-19.42,3.17-23.72,6.37-36.62,0-9.8-4.84-18.54,4.8-28.17,8.45-25.49,9.68-16.73,7.29-38,16.9-15.87,7.16-20.89,3.28-38,.86-6-.85-17.25,6.69-22,14.49-2.83,4.63,4,6.31,13.56,15.64,10.35,10.05,14.64,21.33,18.31,31,7.08,18.63,2.81,23,8.45,35.21,8.2,17.75,24.74,25.66,29.58,28.17,5.1,2.65,13,6.65,23.94,7A50.93,50.93,0,0,0,113.8,157.91Z' />
        </svg>
    )
}
