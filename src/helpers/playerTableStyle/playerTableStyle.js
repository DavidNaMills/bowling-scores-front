export const playerTableStyle = (color) => ({
    background: `rgba(${color}, 0.3)`,
    background: `-moz-linear-gradient(180deg, rgba(255,255,255,1) 37%, rgba(${color},1) 100%)`,
    background: `-webkit-linear-gradient(180deg, rgba(255,255,255,1) 37%, rgba(${color},1) 100%)`,
    background: `linear-gradient(180deg, rgba(255,255,255,1) 37%, rgba(${color},1) 100%)`
})