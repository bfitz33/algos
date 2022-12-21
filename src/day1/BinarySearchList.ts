export default function bs_list(haystack: number[], needle: number): boolean {
    let low = 0;
    let high = haystack.length;
    
    while(low < high) {
        const middle = Math.floor(low + (high-low)/2);
        if(needle === haystack[middle]) {
            return true;
        } else if(needle > haystack[middle]) {
            low = middle + 1;
        } else {
            high = middle;
        }
    }

    return false;
}