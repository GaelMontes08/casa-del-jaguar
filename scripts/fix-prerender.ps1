$root = Join-Path $PSScriptRoot '..\src\pages\[lang]'
Get-ChildItem -LiteralPath $root -Filter *.astro | ForEach-Object {
  $content = Get-Content -Path $_.FullName -Raw

  if ($content -match 'export\s+const\s+prerender\s*=\s*true;') { return }

  if ($content -match 'export\s+\{\s*getStaticPaths\s*\}\s*;') {
    $content = $content -replace 'export\s+\{\s*getStaticPaths\s*\}\s*;', "export { getStaticPaths };`r`n`r`nexport const prerender = true;"
  } else {
    $patterns = @(
      @('}\r\n\r\nconst { lang } = Astro.params;', "}\r\n\r\nexport const prerender = true;\r\n\r\nconst { lang } = Astro.params;"),
      @('}\r\n\r\nconst { lang } = Astro.params as { lang: ''es'' | ''en'' };', "}\r\n\r\nexport const prerender = true;\r\n\r\nconst { lang } = Astro.params as { lang: 'es' | 'en' };"),
      @('}\r\n\r\nconst t = useTranslations(lang);', "}\r\n\r\nexport const prerender = true;\r\n\r\nconst t = useTranslations(lang);"),
      @('}\r\n\r\nconst t = useTranslations(lang as ''es'' | ''en'');', "}\r\n\r\nexport const prerender = true;\r\n\r\nconst t = useTranslations(lang as 'es' | 'en');")
    )

    foreach ($pair in $patterns) {
      if ($content -match [regex]::Escape($pair[0])) {
        $content = $content -replace [regex]::Escape($pair[0]), $pair[1]
        break
      }
    }
  }

  Set-Content -Path $_.FullName -Value $content -NoNewline
}
