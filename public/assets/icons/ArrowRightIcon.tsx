import * as React from "react"
const ArrowRightIcon = (props : React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={34}
        height={25}
        fill="none"
        {...props}
    >
        <path
            stroke="#302D2B"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M1 12.664h31.964M23.375 1.363l8.247 7.991a4.397 4.397 0 0 1 0 6.393l-8.247 7.991"
        />
    </svg>
)
export default ArrowRightIcon
