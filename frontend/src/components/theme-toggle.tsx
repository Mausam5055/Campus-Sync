import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = (e: React.MouseEvent) => {
    const newTheme = theme === "light" ? "dark" : "light"
    
    // Get click position for ripple effect
    const rect = e.currentTarget.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    
    // Create overlay that completely hides content
    const overlay = document.createElement('div')
    
    // Prevent body scroll and get dimensions
    const originalBodyStyle = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      width: document.body.style.width,
      height: document.body.style.height
    }
    
    // Lock body and get real dimensions
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.width = '100%'
    document.body.style.height = '100%'
    
    // Get actual viewport dimensions
    const viewportWidth = Math.max(window.innerWidth, document.documentElement.clientWidth)
    const viewportHeight = Math.max(window.innerHeight, document.documentElement.clientHeight)
    
    overlay.style.cssText = `
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      width: ${viewportWidth}px !important;
      height: ${viewportHeight}px !important;
      background: ${theme === "light" ? "#000000" : "#ffffff"} !important;
      z-index: 2147483647 !important;
      pointer-events: none !important;
      opacity: 0 !important;
      transition: opacity 0.3s ease-out !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      overflow: hidden !important;
      margin: 0 !important;
      padding: 0 !important;
      border: none !important;
      box-sizing: border-box !important;
    `
    
    // Create loader spinner
    const loader = document.createElement('div')
    loader.style.cssText = `
      width: 32px;
      height: 32px;
      border: 3px solid ${theme === "light" ? "#333333" : "#cccccc"};
      border-top: 3px solid ${theme === "light" ? "#ffffff" : "#000000"};
      border-radius: 50%;
      animation: spin 1s linear infinite;
    `
    
    // Add keyframe animation for spinner
    if (!document.querySelector('#theme-loader-styles')) {
      const style = document.createElement('style')
      style.id = 'theme-loader-styles'
      style.textContent = `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `
      document.head.appendChild(style)
    }
    
    overlay.appendChild(loader)
    
    document.body.appendChild(overlay)
    
    // Fade in overlay to hide content
    requestAnimationFrame(() => {
      overlay.style.opacity = '1'
    })
    
    // Change theme when overlay is fully visible
    setTimeout(() => {
      setTheme(newTheme)
      
      // Wait a bit then fade out overlay
      setTimeout(() => {
        overlay.style.opacity = '0'
        
        // Remove overlay after fade out
        setTimeout(() => {
          if (document.body.contains(overlay)) {
            document.body.removeChild(overlay)
          }
          // Restore body styles
          document.body.style.overflow = originalBodyStyle.overflow
          document.body.style.position = originalBodyStyle.position
          document.body.style.width = originalBodyStyle.width
          document.body.style.height = originalBodyStyle.height
        }, 300)
      }, 150)
    }, 300)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="h-9 w-9"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}