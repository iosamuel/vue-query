import { computed, ComputedRef, defineComponent, Fragment, h, inject, InjectionKey, provide, ref } from 'vue';

interface QueryErrorResetBoundaryValue {
  clearReset: () => void;
  isReset: () => boolean;
  reset: () => void;
  isReseted: ComputedRef<boolean>;
}

const QueryErrorResetBoundarySymbol = Symbol('Query error reset') as InjectionKey<QueryErrorResetBoundaryValue>;

export const useQueryErrorResetBoundary = () => inject(QueryErrorResetBoundarySymbol);

export const useQueryErrorResetBoundaryProvider = () => {
  const isResetRef = ref(false);

  const api = {
    clearReset: () => { isResetRef.value = false; },
    reset: () => { isResetRef.value = true; },
    isReset: () => isResetRef.value,
    isReseted: computed(() => isResetRef.value)
  };

  provide(QueryErrorResetBoundarySymbol, api);
}

export const QueryErrorResetBoundary = defineComponent({
  setup(_, { slots }) {
    useQueryErrorResetBoundaryProvider();

    return () => h(Fragment, slots.default?.());
  }
});
