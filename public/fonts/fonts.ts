import localFont from 'next/font/local'

const timesNewRoman = localFont({
    src: './TimesNewRoman.ttf',
    display: 'swap',
})
const Inter = localFont({
    src: './Inter.ttf',
    display: 'swap',
})

export { timesNewRoman, Inter }