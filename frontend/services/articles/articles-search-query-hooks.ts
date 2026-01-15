import { BooleanEnum } from '@/entities/shared/boolean-enum'
import { useSearchParams } from 'next/navigation'

interface UseArticlesSearchQuery {
  readonly initialQ: string
  readonly initialIsAiSearch: boolean
  readonly page: number
  readonly sort: string
}

export function useArticlesSearchQuery(): UseArticlesSearchQuery {
  const searchParams = useSearchParams()
  const initialQ = searchParams.get('q')
  const initialIsAiSearch = searchParams.get('ai')
  const page = searchParams.get('page')
  const sort = searchParams.get('sort')

  return {
    initialQ: initialQ ? initialQ : '',
    initialIsAiSearch: initialIsAiSearch === BooleanEnum.True,
    page: page ? parseInt(page) : 1,
    sort: sort ? sort.trim() : '',
  }
}
