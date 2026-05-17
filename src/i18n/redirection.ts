export function langDirection(locale: string): "ltr" | "rtl" {
  const rtlLocales = ["ar"];
  return rtlLocales.includes(locale.toLocaleLowerCase()) ? "rtl" : "ltr";
}
