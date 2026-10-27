# Extract the existing lettering, without retyping/tracing/resampling it.
# The original SVG and its embedded raster remain intact. Windows / .NET only.
# See docs/header-logo.md for source limitations and the discarded AI extraction.
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$projectRoot = Split-Path $PSScriptRoot -Parent
[xml]$svg = Get-Content -Raw -Encoding utf8 -LiteralPath (Join-Path $projectRoot 'public/images/vem-comigo-logo.svg')
# This is the displayed image; the other embedded PNG is its luminance mask.
$image = $svg.SelectSingleNode('/*[local-name()="svg"]/*[local-name()="g"]//*[local-name()="image"]')
$href = $image.GetAttribute('href', 'http://www.w3.org/1999/xlink')
$stream = [IO.MemoryStream]::new([Convert]::FromBase64String(($href -split ',')[1]))
$source = [Drawing.Bitmap]::new($stream)
$output = [Drawing.Bitmap]::new(225, 110, [Drawing.Imaging.PixelFormat]::Format32bppArgb)
try {
  if ($source.Width -ne 285 -or $source.Height -ne 271) {
    throw 'The source logo has changed; inspect its lettering before preparing a new copy.'
  }
  for ($y = 68; $y -lt 178; $y++) {
    for ($x = 30; $x -lt 255; $x++) {
      # Ink regions of the two original lines, including padding. Exclude the
      # source ornaments covered by yellow overlay shapes in the original SVG.
      $firstLine = $y -le 117 -and $x -ge 80 -and $x -le 214
      $secondLine = $y -ge 130
      if ($firstLine -or $secondLine) {
        $pixel = $source.GetPixel($x, $y)
        # Recover coverage from the original purple (100,54,140) over the baked
        # yellow (251,185,0). Store real alpha, with an unmatted purple edge.
        # This runs only when preparing the asset; no browser filters/blending.
        $coverage = [Math]::Max(0.0, [Math]::Min(1.0, (251 - $pixel.R) / 151.0))
        if ($coverage -gt 0.04) {
          $alpha = [int][Math]::Round(255 * $coverage)
          $output.SetPixel($x - 30, $y - 68, [Drawing.Color]::FromArgb($alpha, 100, 54, 140))
        }
      }
    }
  }
  $output.Save((Join-Path $projectRoot 'public/images/vem-comigo-wordmark.png'), [Drawing.Imaging.ImageFormat]::Png)
} finally {
  $output.Dispose()
  $source.Dispose()
  $stream.Dispose()
}
