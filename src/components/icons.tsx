import { CSSProperties } from "react"

export const LogoIcon = () => {
    return <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 4v10m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0 0v2m6-16v2m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0 0v10m6-16v10m0 0a2 2 0 1 0 0 4m0-4a2 2 0 1 1 0 4m0 0v2"/>
    </svg>
}

export const SELECT = ({ style }: { style?: CSSProperties | undefined }) => {
    return <svg style={style} width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
        <rect width="32" height="32" fill="none" />
        <path d="m7.33,8.67c-4.05,0-7.33,3.28-7.33,7.33s3.28,7.33,7.33,7.33h17.33c4.05,0,7.33-3.28,7.33-7.33s-3.28-7.33-7.33-7.33H7.33Zm.27,3.06h10.27v1.71h-8.4v3.42h3.73v1.71h-5.6v-6.84Zm7.47,3.42h9.33v5.13h-9.33v-5.13Z" fill-rule="evenodd" clip-rule="evenodd" fill="currentColor" />
    </svg>
}

export const START = ({ style }: { style?: CSSProperties | undefined }) => {
    return <svg style={style} width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
        <rect width="32" height="32" fill="none" />
        <path fill-rule="evenodd" clip-rule="evenodd" fill="currentColor" d="M7.33333 8.66663C3.28324 8.66663 0 11.9499 0 16C0 20.05 3.28325 23.3333 7.33333 23.3333H24.6667C28.7168 23.3333 32 20.05 32 16C32 11.9499 28.7168 8.66663 24.6667 8.66663H7.33333ZM20.6667 11.7222H11.3333V13.4333H20.6667V11.7222ZM11.3333 18.5667H20.6667V20.2778H11.3333V18.5667ZM20.6667 15.1444H11.3333V16.8555H20.6667V15.1444Z" />
    </svg>
}