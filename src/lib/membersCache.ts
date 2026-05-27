/**
 * Shared in-memory cache for the members list.
 * Lives for the lifetime of the browser session (resets on page reload).
 * No size limit — avoids localStorage QuotaExceededError.
 */

let _cache: any[] | null = null;

export function getMembersCache(): any[] | null {
    return _cache;
}

export function setMembersCache(data: any[]): void {
    _cache = data;
}

export function updateMemberInCache(id: string, patch: Record<string, any>): void {
    if (_cache) {
        _cache = _cache.map((m) => (m.id === id ? { ...m, ...patch } : m));
    }
}

export function invalidateMembersCache(): void {
    _cache = null;
}
