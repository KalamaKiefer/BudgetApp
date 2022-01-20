// number fotmatter used for currency such as adding dollar sign and commas
// create new Internationalization , pass in undefined to default to current users locale
// make us dollars as currency and dont allow decimals to show up by putting minfraction to 0

export const currencyFormatter = new Intl.NumberFormat(undefined, {
    currency: "usd",
    style: "currency",
    minimumFractionDigits: 0
})