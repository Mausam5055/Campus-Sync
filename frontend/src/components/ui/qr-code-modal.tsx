import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Download, Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import QRCode from "qrcode"

interface QRCodeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  data: Record<string, any>
  title: string
}

export function QRCodeModal({ open, onOpenChange, data, title }: QRCodeModalProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("")
  const { toast } = useToast()

  useEffect(() => {
    if (open && data) {
      const qrData = JSON.stringify(data)
      QRCode.toDataURL(qrData, {
        width: 300,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF"
        }
      }).then(setQrCodeUrl)
    }
  }, [open, data])

  const handleDownload = () => {
    if (qrCodeUrl) {
      const link = document.createElement("a")
      link.download = `${title}-qr-code.png`
      link.href = qrCodeUrl
      link.click()
      toast({
        title: "QR Code Downloaded",
        description: "QR code has been saved to your device."
      })
    }
  }

  const handleCopyData = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2))
    toast({
      title: "Data Copied",
      description: "Student data has been copied to clipboard."
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title} QR Code</DialogTitle>
          <DialogDescription>
            Scan this QR code to access student information quickly
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-4">
          {qrCodeUrl && (
            <div className="p-4 bg-white rounded-lg">
              <img src={qrCodeUrl} alt="QR Code" className="w-64 h-64" />
            </div>
          )}
          
          <div className="flex gap-2 w-full">
            <Button onClick={handleDownload} className="flex-1">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button onClick={handleCopyData} variant="outline" className="flex-1">
              <Copy className="mr-2 h-4 w-4" />
              Copy Data
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}