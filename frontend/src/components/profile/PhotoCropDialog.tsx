import { useState, useRef, useCallback } from "react"
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Crop as CropIcon, RotateCcw } from "lucide-react"
import 'react-image-crop/dist/ReactCrop.css'
import { useIsMobile } from "@/hooks/use-mobile"

interface PhotoCropDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  imageSrc: string
  onCropComplete: (croppedImageUrl: string) => void
}

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

export function PhotoCropDialog({ open, onOpenChange, imageSrc, onCropComplete }: PhotoCropDialogProps) {
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const imgRef = useRef<HTMLImageElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { toast } = useToast()
  const isMobile = useIsMobile()

  const onImageLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget
    setCrop(centerAspectCrop(width, height, 1))
  }, [])

  const getCroppedImg = useCallback(async () => {
    if (!completedCrop || !imgRef.current || !canvasRef.current) {
      toast({
        title: "Error",
        description: "Please select a crop area",
        variant: "destructive"
      })
      return
    }

    const image = imgRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      toast({
        title: "Error", 
        description: "Failed to get canvas context",
        variant: "destructive"
      })
      return
    }

    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height

    const pixelRatio = window.devicePixelRatio
    canvas.width = Math.floor(completedCrop.width * scaleX * pixelRatio)
    canvas.height = Math.floor(completedCrop.height * scaleY * pixelRatio)

    ctx.scale(pixelRatio, pixelRatio)
    ctx.imageSmoothingQuality = 'high'

    const cropX = completedCrop.x * scaleX
    const cropY = completedCrop.y * scaleY

    ctx.drawImage(
      image,
      cropX,
      cropY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY
    )

    return new Promise<string>((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          toast({
            title: "Error",
            description: "Failed to create image blob",
            variant: "destructive"
          })
          return
        }
        const url = URL.createObjectURL(blob)
        resolve(url)
      }, 'image/jpeg', 0.95)
    })
  }, [completedCrop, toast])

  const handleCropComplete = async () => {
    try {
      const croppedImageUrl = await getCroppedImg()
      if (croppedImageUrl) {
        onCropComplete(croppedImageUrl)
        onOpenChange(false)
        toast({
          title: "Success",
          description: "Photo cropped successfully"
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to crop photo",
        variant: "destructive"
      })
    }
  }

  const resetCrop = () => {
    if (imgRef.current) {
      const { width, height } = imgRef.current
      setCrop(centerAspectCrop(width, height, 1))
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`${isMobile ? 'sm:max-w-[95vw] max-h-[95vh]' : 'sm:max-w-[600px] max-h-[90vh]'} overflow-hidden`}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CropIcon className="h-5 w-5" />
            Crop Photo
          </DialogTitle>
          <DialogDescription>
            Adjust the crop area to frame your photo perfectly
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className={`${isMobile ? 'max-h-[60vh]' : 'max-h-[400px]'} overflow-auto flex justify-center`}>
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={1}
              circularCrop
              className="max-w-full"
            >
              <img
                ref={imgRef}
                alt="Crop preview"
                src={imageSrc}
                onLoad={onImageLoad}
                className="max-w-full h-auto"
                style={{ maxHeight: isMobile ? '50vh' : '400px' }}
              />
            </ReactCrop>
          </div>

          <div className="flex justify-center">
            <Button variant="outline" size="sm" onClick={resetCrop}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset Crop
            </Button>
          </div>
        </div>

        {/* Hidden canvas for cropping */}
        <canvas ref={canvasRef} className="hidden" />

        <DialogFooter className={`${isMobile ? 'flex-col' : 'flex-row'} gap-2`}>
          <Button variant="outline" onClick={() => onOpenChange(false)} className={isMobile ? 'w-full' : 'w-auto'}>
            Cancel
          </Button>
          <Button onClick={handleCropComplete} className={isMobile ? 'w-full' : 'w-auto'}>
            Apply Crop
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}