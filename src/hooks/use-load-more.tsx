import { useState, useMemo, useLayoutEffect, useCallback } from 'react'

import useAxios from '~/hooks/use-axios'

import { defaultResponses } from '~/constants'
import { ServiceFunction, ItemsWithCount } from '~/types'

interface UseLoadMoreProps<Data, Params> {
  service: ServiceFunction<ItemsWithCount<Data>, Params>
  limit: number
  params?: Params
}

const useLoadMore = <Data, Params>({
  service,
  limit,
  params
}: UseLoadMoreProps<Data, Params>) => {
  const searchName = (params as any)?.name?.trim?.().toLowerCase?.() || ''
  const [skip, setSkip] = useState<number>(0)
  const [data, setData] = useState<Data[]>([])
  const [previousLimit, setPreviousLimit] = useState<number>(limit)

  let isFetched = false

  const loadMore = useCallback(
    () => setSkip((prevState) => prevState + limit),
    [limit]
  )

  const handleResponse = useCallback(
    (responseData: ItemsWithCount<Data>) => {
      setData((prevState) => {
        if (searchName) {
          const found = responseData.find(
            (item: any) => item.name?.toLowerCase() === searchName
          )
          return found ? [found] : []
        }
        const startIndex = prevState.length
        const endIndex = startIndex + limit
        return [...prevState, ...responseData.slice(startIndex, endIndex)]
      })
    },
    [params, limit]
  )

  const resetData = useCallback(() => {
    setSkip(0)
    setData([])
  }, [])

  const { response, loading, fetchData } = useAxios<
    ItemsWithCount<Data>,
    Params
  >({
    service,
    defaultResponse: defaultResponses.itemsWithCount,
    fetchOnMount: false,
    onResponse: handleResponse
  })

  useLayoutEffect(() => {
    if (previousLimit === limit && !isFetched) {
      void fetchData({ ...params, limit, skip } as Params)
    } else {
      resetData()
      setPreviousLimit(limit)
    }

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      isFetched = true
    }
  }, [fetchData, limit, previousLimit, resetData, skip, params])

  const isExpandable = useMemo(() => {
    if (searchName) {
      return false
    }
    return data.length < response.length && data.length > 0
  }, [data, response])

  return {
    data,
    loading,
    resetData,
    loadMore,
    isExpandable
  }
}

export default useLoadMore
