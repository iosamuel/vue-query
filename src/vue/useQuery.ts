import {
  QueryObserverResult,
  QueryCache,
  QueryClient,
  QueryKey,
  QueryFunction,
  QueryObserverOptions,
  QueryOptions,
} from '/@vue-query/core'
import { ref, Ref, isRef, watch } from 'vue'
import { QueryObserver } from '/@vue-query/core/queryObserver'
import { parseQueryArgs } from '/@vue-query/core/utils'

export interface UseQueryObjectConfig<TResult, TError> {
  queryKey: QueryKey
  queryFn?: QueryFunction<TResult>
  config?: QueryOptions<TResult, TError>
}

interface QueryResult<TResult, TError> {
  results: Ref<QueryObserverResult<TResult, TError>>
}

// Parameter syntax with optional config
export function useQuery<TResult = unknown, TError = unknown>(
  queryKey: QueryKey,
  queryConfig?: QueryOptions<TResult, TError>
): QueryResult<TResult, TError>

export function useQuery<TResult = unknown, TError = unknown>(
  queryKey: QueryKey,
  queryFn?: QueryFunction,
  queryConfig?: QueryOptions<TResult, TError>
): QueryResult<TResult, TError>

// Object syntax
export function useQuery<TResult = unknown, TError = unknown>(
  config: UseQueryObjectConfig<TResult, TError>
): QueryResult<TResult, TError>

export function useQuery<TResult, TError>(
  arg1: any,
  arg2?: any,
  arg3?: any
): QueryResult<TResult, TError> {
  const results = ref()

  const resolvedConfig = parseQueryArgs(arg1, arg2, arg3)
  console.log(resolvedConfig)

  const cache = new QueryCache()
  const client = new QueryClient({ cache })

  const observer = new QueryObserver({
    client,
    options: resolvedConfig,
  })

  const queryKeys = getQueryKeysRef(resolvedConfig.queryKey)
  watch(queryKeys, () => {
    const query = observer.getCurrentQuery()
    query.fetch()
  })

  observer.subscribe(data => {
    results.value = data
  })

  return {
    results,
  }
}

function getQueryKeysRef(queryKey: QueryKey) {
  const queryKeysRef: Ref[] = []
  if (typeof queryKey === 'object') {
    queryKey.forEach(key => {
      if (isRef(key)) {
        queryKeysRef.push(key)
      }
    })
  }
  return queryKeysRef
}
