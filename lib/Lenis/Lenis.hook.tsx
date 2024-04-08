
import { useContext, useEffect } from 'react';
import { LenisContext, LenisInstance } from './Lenis.context';
import { useRoot } from './Lenis.context';

function useCurrentLenis() {
    const local = useContext(LenisContext);
    const root = useRoot();

    return local ?? root;
}

export function useLenis(callback?: (lenis: LenisInstance) => void, deps = [], priority = 0) {
    const { lenis, addCallback, removeCallback } = useCurrentLenis();
    const depsJson = JSON.stringify(deps);
    useEffect(() => {
        if(!callback || !addCallback || !removeCallback || !lenis) return;

        addCallback(callback, priority);
        callback(lenis);

        return () => {
            removeCallback(callback);
        }
    }, [lenis, addCallback, removeCallback, priority, callback, depsJson]);

    return lenis;
}

useCurrentLenis.displayName = 'useCurrentLenis';
useLenis.displayName = 'useLenis';