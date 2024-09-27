'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/use-debounce'

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const debouncedSearchTerm = useDebounce(searchTerm, 300) // 300ms delay
  const router = useRouter()
  const pathname = usePathname()
  const inputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (debouncedSearchTerm) {
      router.push(`/search?q=${encodeURIComponent(debouncedSearchTerm.trim())}`)
    }
  }, [debouncedSearchTerm, router])

  useEffect(() => {
    if (!pathname.startsWith('/search')) {
      setSearchTerm('')
      setIsExpanded(false)
    }
  }, [pathname])

  useEffect(() => {
    if (pathname.startsWith('/search')) {
      const params = new URLSearchParams(window.location.search)
      const queryParam = params.get('q')
      if (queryParam) {
        setSearchTerm(decodeURIComponent(queryParam))
        setIsExpanded(true)
      }
    }
  }, [pathname])

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isExpanded])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setIsExpanded(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [formRef])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`)
    }
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <form onSubmit={handleSearch} className="relative" ref={formRef}>
      <Button 
        type="button"
        variant="ghost" 
        size="icon"
        onClick={toggleExpand}
        className="relative z-10"
      >
        <Search className="h-4 w-4" />
      </Button>
      {isExpanded && (
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 bg-white shadow-md rounded-md">
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
          <Button 
            type="submit"
            variant="ghost" 
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 h-full"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      )}
    </form>
  )
}