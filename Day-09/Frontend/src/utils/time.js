/**
 * Formats a Date object or ISO string into a human-readable relative time string.
 * @param {Date|string} createdAt 
 * @returns {string} Formatted relative time
 */
export const formatPostTime = (createdAt) => {
    if (!createdAt) return 'Just now';
    try {
        const created = new Date(createdAt);
        const now = new Date();
        const diffMs = now - created;
        const diffMins = Math.floor(diffMs / 60000);
        
        if (diffMins < 1) return 'Just now';
        
        if (diffMins < 60) {
            return `${diffMins} min ago`;
        }
        
        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) {
            return `${diffHours} hr ago`;
        }
        
        const diffDays = Math.floor(diffHours / 24);
        if (diffDays === 1) return 'Yesterday';
        
        return `${diffDays} days ago`;
    } catch (err) {
        console.error("Error formatting time:", err);
        return 'Just now';
    }
};
