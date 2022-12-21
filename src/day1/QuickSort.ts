export default function quick_sort(arr: number[]): void {
    qs(arr, 0, arr.length - 1);
}

export function qs(arr: number [], lo: number, high: number): void {
    if(lo >= high) {
        return;
    }

    const pivotIdx = partition(arr, lo, high);

    qs(arr, lo, pivotIdx - 1);
    qs(arr, pivotIdx + 1, high);
}

export function partition(arr: number[], lo: number, high: number): number {
    const pivot = arr[high];
    let idx = lo - 1;

    for(let i = lo; i < high; ++i) {
        if(arr[i] <= pivot) {
            idx++;
            const tmp = arr[i];
            arr[i] = arr[idx];
            arr[idx] = tmp;
        }
    }

    idx++;
    arr[high] = arr[idx];
    arr[idx] = pivot;

    return idx;
}