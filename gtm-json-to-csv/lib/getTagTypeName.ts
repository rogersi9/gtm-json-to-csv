/**
 * A mapping from GTM tag type -> friendly display name.
 */
const TYPE_MAP: Record<string, string> = {
    html: "Custom HTML Tag",
    awct: "Google Ads Conversion Tracking",
    sp: "Google Ads Remarketing Tag",
    flc: "Floodlight Tag",
    hjtc: "Hotjar Tracking Code",
    gclidw: "Conversion Linker",
    pntr: "Pinterest Tag",
    gaawe: "GA4 Event Tag",
    googtag: "GA4 Configuration Tag",
    // Add any others you commonly see
  };
  
  /**
   * Returns a user-friendly label for the given tagType.
   * If no direct match is found, we fall back to the raw type string.
   */
  export function getTagTypeName(tagType: string): string {
    // If it's in our map, return the friendly name
    if (TYPE_MAP[tagType]) {
      return TYPE_MAP[tagType];
    }
  
    // Check for custom template tag prefix (e.g., 'cvt_123_45')
    if (tagType.startsWith("cvt_")) {
      // In your GTM export, you might see parameters that reveal
      // it's a Facebook Pixel, Snapchat Pixel, etc.
      // For now, we'll just say "Custom Template Tag."
      return "Custom Template Tag";
    }
  
    // No match found, just return the original
    return tagType;
  }
  