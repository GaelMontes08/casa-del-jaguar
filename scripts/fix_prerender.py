from pathlib import Path

root = Path(r"d:\Código\Casa del Jaguar\casa-del-jaguar\src\pages\[lang]")

for page in root.glob('*.astro'):
    text = page.read_text(encoding='utf-8')
    if 'export const prerender = true;' in text:
        continue

    if 'export { getStaticPaths };' in text:
        text = text.replace(
            'export { getStaticPaths };',
            'export { getStaticPaths };\n\nexport const prerender = true;'
        )
    elif 'const { lang } = Astro.params' in text:
        text = text.replace(
            'const { lang } = Astro.params',
            'export const prerender = true;\n\nconst { lang } = Astro.params',
            1,
        )
    elif 'const { lang } = Astro.params as' in text:
        text = text.replace(
            'const { lang } = Astro.params as',
            'export const prerender = true;\n\nconst { lang } = Astro.params as',
            1,
        )
    elif 'const t = useTranslations' in text:
        text = text.replace(
            'const t = useTranslations',
            'export const prerender = true;\n\nconst t = useTranslations',
            1,
        )

    page.write_text(text, encoding='utf-8')

print('localized prerender fix applied')
