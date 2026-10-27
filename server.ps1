# PhishProof Campus - Robust Lightweight Local HTTP Server (Socket-based)
# Works on any Windows machine without requiring admin rights or http.sys registration.
param(
    [int]$Port = 8080
)

$listener = New-Object System.Net.Sockets.TcpListener([System.Net.IPAddress]::Loopback, $Port)

$mimeMap = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
}

$baseDir = $PSScriptRoot

try {
    $listener.Start()
    Write-Host "==========================================================" -ForegroundColor Cyan
    Write-Host " PhishProof Campus - Local Server Running" -ForegroundColor Green
    Write-Host " URL: http://localhost:$Port/" -ForegroundColor Yellow
    Write-Host " Serving directory: $baseDir" -ForegroundColor Gray
    Write-Host " Press Ctrl+C in terminal to stop." -ForegroundColor Gray
    Write-Host "==========================================================" -ForegroundColor Cyan

    while ($true) {
        $client = $listener.AcceptTcpClient()
        $stream = $client.GetStream()
        $reader = New-Object System.IO.StreamReader($stream, [System.Text.Encoding]::UTF8)
        $writer = New-Object System.IO.StreamWriter($stream, [System.Text.Encoding]::UTF8)
        
        $requestLine = $reader.ReadLine()
        if (-not [string]::IsNullOrEmpty($requestLine)) {
            $tokens = $requestLine.Split(' ')
            $path = $tokens[1].Split('?')[0]
            if ($path -eq "/" -or [string]::IsNullOrWhiteSpace($path)) {
                $path = "/index.html"
            }

            # Drain remaining request headers
            while (-not [string]::IsNullOrEmpty($reader.ReadLine())) {}

            $localFile = Join-Path $baseDir ($path.TrimStart('/').Replace('/', '\'))
            if (Test-Path $localFile -PathType Leaf) {
                $ext = [System.IO.Path]::GetExtension($localFile).ToLower()
                $mime = if ($mimeMap.ContainsKey($ext)) { $mimeMap[$ext] } else { "application/octet-stream" }
                $bytes = [System.IO.File]::ReadAllBytes($localFile)

                $writer.WriteLine("HTTP/1.1 200 OK")
                $writer.WriteLine("Content-Type: $mime")
                $writer.WriteLine("Content-Length: $($bytes.Length)")
                $writer.WriteLine("Connection: close")
                $writer.WriteLine()
                $writer.Flush()

                $stream.Write($bytes, 0, $bytes.Length)
            } else {
                $notFound = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
                $writer.WriteLine("HTTP/1.1 404 Not Found")
                $writer.WriteLine("Content-Type: text/plain")
                $writer.WriteLine("Content-Length: $($notFound.Length)")
                $writer.WriteLine("Connection: close")
                $writer.WriteLine()
                $writer.Flush()
                $stream.Write($notFound, 0, $notFound.Length)
            }
        }
        $writer.Flush()
        $client.Close()
    }
} catch {
    Write-Error $_
} finally {
    $listener.Stop()
}
